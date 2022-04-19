import nc from 'next-connect'
import { isAuth } from '../../../../utils/auth/auth';
import Order from '../../../../models/Order/Order';
import db from '../../../../utils/database/db';
import {onError} from '../../../../utils/error/error'

const handler = nc({
    onError,
})

handler.use(isAuth)

handler.put(async(req, res) => {
    await db.connect();
    
    const order =  await Order.findById(req.query.id)
    if (order) {
        order.isDelivered =true;
        order.deliveredAt = Date.now();
        

        const deliveredOrder = await order.save();
        await db.disconnect();
        res.send({message: 'Order Delivered', order: deliveredOrder});


    } else {
        await db.disconnect();
        res.status(404).send({message: 'order not found'})
    }



})

export default handler;