import nc from 'next-connect'
import User from '../../../models/User/User';
import db from '../../../utils/database/db';
import bcrypt from 'bcryptjs'
const handler = nc()

handler.post( async (req, res) => {
    
    
    await db.connect();
    
    const user = await User.findOne({email : req.body.email})

    await db.disconnect();

    
   

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
            message : 'valid password'
        });
      } else {
        res.status(401).send({ message: 'Invalid email or password' });
      }
})

export default handler;