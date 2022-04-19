import nc from 'next-connect'
import User from '../../../models/User/User';
import db from '../../../utils/database/db';
import bcrypt from 'bcryptjs'
import { isAuth, signToken } from '../../../utils/auth/auth';

const handler = nc()


handler.use(isAuth)


handler.put( async (req, res) => {
    
    
    await db.connect();
    
    //const user = await User.findOne({email : req.body.email})

    const user = await User.findById(req.user._id)

    // console.log('req.body', req.body)
    if (req.body.profileImage) {
      // console.log('user user profile Image')
      user.profileImage = req.body.profileImage;
    }else {
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;
      user.password = req.body.password? bcrypt.hashSync(req.body.password) : user.password;
      user.profileImage = user.profileImage? user.profileImage : "";
      
    }


    await user.save();

    await db.disconnect();

    
   

  
    const token = signToken(user);
        res.send({
          token,
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin,
          profileImage : user.profileImage,
        });
     
})

export default handler;