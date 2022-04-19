import nc from 'next-connect'
import Order from '../../../models/Order/Order';
import { isAuth } from '../../../utils/auth/auth';
import db from '../../../utils/database/db';
import {onError} from '../../../utils/error/error'


const handler = nc({
    onError,
  });
handler.use(isAuth);
  


handler.get(async (req, res) => {
    await db.connect();
    const orders = await Order.find({ user: req.user._id });
    res.send(orders); //201 create status code
});


export default handler;