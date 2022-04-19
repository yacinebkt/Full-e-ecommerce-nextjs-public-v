import nc from 'next-connect'
import Category from '../../../models/Category/Category';
import db from '../../../utils/database/db';

const handler = nc()

handler.get(async(req, res) => {
    await db.connect();
    
    // const categories =  await Product.find().distinct('category')
    const categories =  await Category.find()

    await db.disconnect();


    res.send(categories);
})

export default handler;