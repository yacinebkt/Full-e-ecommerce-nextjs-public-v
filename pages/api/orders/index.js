import nc from 'next-connect'
import Order from '../../../models/Order/Order';
import { isAuth } from '../../../utils/auth/auth';
import db from '../../../utils/database/db';
import {onError} from '../../../utils/error/error'


const handler = nc({
    onError,
  });
  handler.use(isAuth);
  
  handler.post(async (req, res) => {
    await db.connect();
    const newOrder = new Order({
      ...req.body,
      user: req.user._id,  //send from isAuth
    });
    const order = await newOrder.save();
    res.status(201).send(order);  //201 create status code
  });
  
  export default handler;