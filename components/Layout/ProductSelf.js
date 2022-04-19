import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'
import NextLink from 'next/link'


export default function ProductSelf({product, addToCartFun}) {
    return (
        <Card>
        <NextLink href={`/product/${product.slug}`} passHref>
          <CardActionArea>
            <CardMedia title={product.name} component='img' image={product.image} >
            </CardMedia>

            <CardContent>
              <Typography>
                {product.name}
              </Typography>
              
              <Rating value={product.rating} readOnly ></Rating>

            </CardContent>
          </CardActionArea>
        </NextLink>

        <CardActions>
          <Typography>
            ${product.price}
          </Typography>
          <Button size='small' color='primary' onClick={() => addToCartFun(product)}>
            Add to cart
          </Button>
        </CardActions>
      </Card>
    )
}
