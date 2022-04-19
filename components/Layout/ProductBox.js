import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'
import NextLink from 'next/link'
import useStyles from "../../utils/styles/styles";

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';



export default function ProductBox({product, addToCartFun}) {


  const classN = useStyles();

    return (
        <Card className={classN.productBox}>
        <NextLink  href={`/product/${product.slug}`} passHref>
          <div  className={classN.CardActionAreaHover}>
            <div className={classN.productImageCardMedia}style ={{ }}>
              <CardMedia title={product.name} component='img' image={product.productPictures[0] }
              className={classN.productImage}
              objectFit =''
              style ={{ 
                maxWwidth: '100%',
                height: '100%',
                objectfit: 'contain !important',

               // maxWidth: '250px',
            }}
              >
              </CardMedia>
            </div>
           

            <div className={classN.productContent}>

          
             
              <Typography component="span" className={classN.maxLinesBrand} >
              {product.brand}
              </Typography>

              <Typography component="h3" 
              className={classN.maxLines}
               
              >
                {product.name}
              </Typography>

          

              <div className={classN.productRating}>
              <Rating className={classN.productRating} value={product.rating} readOnly  >

              </Rating>
              </div>

            </div>
          </div>
        </NextLink>

        <CardActions className={classN.flex_sb}>
          <Typography className={classN.productPrice} color='primary' >
            {`${product.price} DA`}
          </Typography>
      
            <AddShoppingCartIcon size='small' color='primary' 
              className={classN.productCart} onClick={() => addToCartFun(product)}/>
         
        </CardActions>
      </Card>
    )
}
