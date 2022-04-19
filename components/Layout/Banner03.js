import { Button, Card, CardActionArea, CardActions,
    CardContent, CardMedia, Typography, Link, Grid} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'
import NextLink from 'next/link'
import useStyles from "../../utils/styles/styles";
import { useRouter } from 'next/router';
//import BannerImage from '/Img/logo/logo.png'
//import BannerImage from '../../public/Img/banner/b2.JPG'




export default function Banner03({featuredCategories}) {

const router = useRouter();

 const classN = useStyles();

   return (

    // <Grid container
    //     justifyContent="space-between"
    //     direction='row' 
    //     className={classN.banner03}
    //     container
    //     spacing={3}
    // >
    //        </Grid>

    <Grid container
        justifyContent="space-between"
        //spacing={3}
    >
        
        
         <Grid 
            container
            direction='column'
            alignItems='flex-start'
            justifyContent='center'
            md={4}
            xs={12}     
            className={classN.banner03Box}
            onClick={e=>  router.push(`/search?category=${featuredCategories[3].name}`) }
            style={{backgroundImage:`url(${featuredCategories[3].featuredImage})`, paddingRight:'10px', cursor:'pointer'}}
         >


           {/* <Typography component="h4" className={classN.bannerTitle03}>
               SEASONAL SALE
           </Typography>

           <Typography component="span" className={classN.bannerSpan03}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
           </Typography> */}
            
            
       </Grid>

       <Grid 
          container
          direction='column'
          alignItems='flex-start'
          justifyContent='center'
          md={4}
          xs={12}     
          className={classN.banner03Box}
          onClick={e=>  router.push(`/search?category=${featuredCategories[4].slug}`) }
          style={{backgroundImage:`url(${featuredCategories[4].featuredImage})`, padding:'0 10px', cursor:'pointer'}}
         >


           {/* <Typography component="h4" className={classN.bannerTitle03}>
                NEW FOOTWEAR COLLECTION
           </Typography>

          
           <Typography component="span" className={classN.bannerSpan03}>
               Sppring/ Summer 2022
           </Typography> */}
        
            
       </Grid>

       <Grid 
         container
         direction='column'
         alignItems='flex-start'
         justifyContent='center'
         md={4}
         xs={12}     
         className={classN.banner03Box}
         onClick={e=>  router.push(`/search?category=${featuredCategories[5].slug}`) }
         style={{backgroundImage:`url(${featuredCategories[5].featuredImage})`,  paddingLeft:'10px', cursor:'pointer'}}
         >

{/* 
           <Typography component="h4" className={classN.bannerTitle03}>
                Jeans
           </Typography>

          

           <Typography component="span" className={classN.bannerSpan03}>
                new Tranding
           </Typography> */}
        
            
       </Grid>


   
    </Grid>
   )
}
