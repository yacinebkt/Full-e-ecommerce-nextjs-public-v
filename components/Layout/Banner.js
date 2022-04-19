import { Button, Card, CardActionArea, CardActions,
    CardContent, CardMedia, Typography, Link, Grid} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'
import NextLink from 'next/link'
import useStyles from "../../utils/styles/styles";
//import BannerImage from '/Img/logo/logo.png'
//import BannerImage from '../../public/Img/banner/b2.JPG'




export default function Banner({featuredCategories, data}) {


 const classN = useStyles();

   return (

       <Grid container
         justifyContent="center"
         alignItems="center"
         direction='column' 
       
        //  md={12}
         className={classN.bannerSection}
     //     style={{backgroundImage:'url(/Img/banner/b2.jpg)', color:'white'}}
           style={{backgroundImage:`url(${featuredCategories.featuredImage})`}}

         >


          {data? 
          <>
          <Typography component="h4" className={classN.bannerTitle}>
                {featuredCategories.featuredTitle}
           </Typography>

           <Typography component="p" className={classN.bannerText}>
           {featuredCategories.featuredText}
         
           </Typography>
           </>
           : 
           null
          
          }
          
        
            <Button 
             href={`/search?category=${featuredCategories.slug}`}
              className={classN.bannerButton}>
               
               Explore More
              
            </Button>
            



       </Grid>

   )
}
