import nc from 'next-connect'
import User from '../../../models/User/User';
import db from '../../../utils/database/db';
import bcrypt from 'bcryptjs'
import { signToken } from '../../../utils/auth/auth';

const handler = nc()

handler.post( async (req, res) => {
    
    
    await db.connect();
    
    const user = await User.findOne({email : req.body.email})
    //console.log("user", user )


    await db.disconnect();

    
   

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = signToken(user);
        res.send({
          token,
          _id: user._id,
          name: user.name,
          phone: user.phone,
          email: user.email,
          isAdmin: user.isAdmin,
          profileImage : user.profileImage,
        });
      } else {
        res.status(401).send({ message: 'Invalid email or password' });
      }
})

export default handler;