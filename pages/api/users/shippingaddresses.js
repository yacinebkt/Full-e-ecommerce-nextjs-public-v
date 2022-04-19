import nc from 'next-connect'
import User from '../../../models/User/User';
import db from '../../../utils/database/db';
import { isAuth } from '../../../utils/auth/auth';
import mongoose from 'mongoose'


const handler = nc()


handler.use(isAuth)


handler.post( async (req, res) => {
    
    
    await db.connect();
    
    let user = await User.findById(req.user._id)

    let address = {}
        address.fullName = req.body.name
        address.streetAddress = req.body.streetAddress
        address.aptNumber = req.body.aptNumber
        address.country = req.body.countryName
        address.state = req.body.stateName
        address.city = req.body.cityName
        address.postalCode = req.body.postalCode
        address.phone = req.body.phone
        
        // const addObject= async (arr, obj) =>{
        //     let isExist = arr.some(o => o.name === obj.name && o.streetAddress === obj.streetAddress
        //         && o.aptNumber === obj.aptNumber && o.country === obj.country && o.state === obj.state 
        //         && o.city === obj.city  && o.postalCode === obj.postalCode  && o.phone === obj.phone  
        //         );
           
        // }

        // addObject(user.addresses, address)
        let isExist = user.addresses.some(o => o.name === address.name && o.streetAddress === address.streetAddress
            && o.aptNumber === address.aptNumber && o.country === address.country && o.state === address.state 
            && o.city === address.city  && o.postalCode === address.postalCode  && o.phone === address.phone  
        )

        if(!isExist) {
            user.addresses.push(address);
            await user.save();
            res.status(201).send(user);

            
        }else {
             res.status(401).send({ message: 'This address is already exists' });
        }

        // user.addresses.push(address)
        // console.log('user width Adreess', user)
        // console.log('new address to push Adreess', address)


    await db.disconnect();
     
})


handler.put(async (req, res) => {

    await db.connect();

    let user = await User.findById(req.user._id)
    if (req.body.action === 'update') {
        console.log('in update section')
        if (user) {
        console.log('in user section')

            
            if (user.addresses) {
              
                
                let addresses= user.addresses
                
                let addressNew = {
                    _id : req.body._id ,                          
                    fullName : req.body.name,
                    streetAddress : req.body.streetAddress,
                    aptNumber : req.body.aptNumber,
                    country : req.body.countryName,
                    state : req.body.stateName,
                    city : req.body.cityName,
                    postalCode : req.body.postalCode,
                    phone : req.body.phone,
                }
                console.log('new address before', addressNew)      


                  addresses.map((el, index) => {
                    // console.log('el._id', el._id)
                    // console.log('mongoose', mongoose.Types.ObjectId(req.body._id))
                    if(el._id.equals(mongoose.Types.ObjectId(req.body._id)) ) {
                        console.log('founded this', el._id)      
                        addresses[index]=addressNew
                        return;
                        
                    }
                 
                     }); 

                 user.addresses = addresses

                await user.save();
                res.status(201).send(user);
        
            } else {
                await db.disconnect();
                res.status(404).send({message: 'Address Not Found In DB'})
         
            }
            
    
        }else {
            
            await db.disconnect();
            res.status(404).send({message: 'User Not Found In DB'})
     
        }

    }

    if (req.body.action === 'delet') {
        console.log('in delet section')
        
        if (user) {
            if (user.addresses) {
                let newAddresses =  user.addresses.filter(function(el) { return el._id != req.body._id }); 
                user.addresses = newAddresses
                await user.save();
                res.status(201).send(user);
        
            } else {
                await db.disconnect();
                res.status(404).send({message: 'Address Not Found In DB'})
         
            }
            
    
        }else {
            
            await db.disconnect();
            res.status(404).send({message: 'User Not Found In DB'})
     
        }
    }
   

})





handler.get( async (req, res) => {
    
    
    await db.connect();
    
    let user = await User.findById(req.user._id)
    await db.disconnect();
    res.send(user.addresses);

     
})




export default handler;