// addrees api => /api/products/:id/reviews

import nc from 'next-connect'
import mongoose from 'mongoose'
import Product from '../../../../models/Product/Product';
import db from '../../../../utils/database/db';
import {onError} from '../../../../utils/error/error'
import { isAuth } from '../../../../utils/auth/auth';



const handler = nc({
    onError
})

handler.get(async(req, res) => {
    await db.connect();
    const product =  await Product.findById(req.query.id);
    await db.disconnect();
    if (product){
        res.send(product.reviews);
    }else {
        res.status(404).send({message: 'Produt Not Found'})

    }



    //res.send(product);
})






handler.use(isAuth).post(async (req, res) => {
    await db.connect();
    const product = await Product.findById(req.query.id);
   
    if (product) {
      const existReview = product.reviews.find((x) => x.user == req.user._id);
      if (existReview) {
        await Product.updateOne(
          { _id: req.query.id, 'reviews._id': existReview._id },
          {
            $set: {
              'reviews.$.comment': req.body.comment,
              'reviews.$.rating': Number(req.body.rating),
            },
          }
        );
  
        const updatedProduct = await Product.findById(req.query.id);
        updatedProduct.numReviews = updatedProduct.reviews.length;
        updatedProduct.rating =
          updatedProduct.reviews.reduce((a, c) => c.rating + a, 0) /
          updatedProduct.reviews.length;
        await updatedProduct.save();
  
        await db.disconnect();
        return res.send({ message: 'Review updated' });
      } else {


        const review = {
          user: mongoose.Types.ObjectId(req.user._id),
          name: req.user.name,
          rating: Number(req.body.rating),
          comment: req.body.comment,
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, c) => c.rating + a, 0) /
          product.reviews.length;
        await product.save();
        await db.disconnect();
        res.status(201).send({
          message: 'Review submitted',
        });
      }
    } else {
      await db.disconnect();
      res.status(404).send({ message: 'Product Not Found' });
    }
  });




export default handler;