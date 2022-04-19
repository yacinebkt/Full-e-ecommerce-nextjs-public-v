import nc from 'next-connect'
import Message from '../../../models/Message/Message';
import db from '../../../utils/database/db';


const handler = nc()

handler.post( async (req, res) => {
    
    
    await db.connect();
    
    const newMeassage = new Message({
      name : req.body.fullName,
      email : req.body.email,
      phone : req.body.phone,
      subject : req.body.subject,
      message : req.body.message,
    })
    
    const meassage = await newMeassage.save()
    await db.disconnect();

    res.send(meassage);
     
})

export default handler;