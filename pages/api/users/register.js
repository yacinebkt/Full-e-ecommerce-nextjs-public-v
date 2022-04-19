import nc from 'next-connect'
import User from '../../../models/User/User';
import db from '../../../utils/database/db';
import bcrypt from 'bcryptjs'
import { signToken } from '../../../utils/auth/auth';

const handler = nc()

handler.post( async (req, res) => {
    
    
    await db.connect();
    
    //const user = await User.findOne({email : req.body.email})
    const newUser = new User({
      name : req.body.name,
      email : req.body.email,
      phone : req.body.phone,
      password : bcrypt.hashSync(req.body.password),
      isAdmin : false,
    })
    

    const user = await newUser.save()


    await db.disconnect();

    
   

  
    const token = signToken(user);
        res.send({
          token,
          _id: user._id,
          name: user.name,
          email: user.email,
          phone : user.phone,
          isAdmin: user.isAdmin,
          profileImage : user.profileImage,

        });
     
})

export default handler;