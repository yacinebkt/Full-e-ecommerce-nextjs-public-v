import nc from 'next-connect'
import Category from '../../models/Category/Category';
import Brand from '../../models/Brand/Brand';
//import Product from '../../../models/Product/Product'
//import db from '../../../utils/database/db';
import Product from '../../models/Product/Product';
import User from '../../models/User/User';
import Data from '../../utils/data/data';
import ProductsData from '../../utils/data/products/products'
import db from '../../utils/database/db';


const handler = nc()

handler.get(async(req, res) => {
    await db.connect();
    
    //const products =  await Product.find({})


    
    await User.deleteMany();
    await User.insertMany(Data.users);

    
    
    await Category.deleteMany();
    await Category.insertMany(Data.categories);

    await Brand.deleteMany();
    await Brand.insertMany(Data.brands);

    
    await Product.deleteMany();
    //await Product.insertMany(Data.products);
    await Product.insertMany(ProductsData);
   // await Product.insertMany(Data.products);


    

    await db.disconnect();


    res.send('seeded succes');
})

export default handler;