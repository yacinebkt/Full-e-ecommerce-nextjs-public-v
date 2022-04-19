import { Button, Card, CardActionArea, CardActions,
    CardContent, CardMedia, Typography, Link, Grid} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'
import NextLink from 'next/link'
import useStyles from "../../utils/styles/styles";
import { useRouter } from 'next/router';
//import BannerImage from '/Img/logo/logo.png'
//import BannerImage from '../../public/Img/banner/b2.JPG'




export default function Banner02({featuredCategories}) {


 const classN = useStyles();
 const router = useRouter();


   return (

    <Grid container
        justifyContent="space-between"
        direction='row' 
        className={classN.banner02}
        
    >
        <Grid 
            container
            direction='column'
            alignItems='flex-start'
            justifyContent='center'
            md={6}
            xs={12} 
          
            onClick={e=>  router.push(`/search?category=${featuredCategories[2].slug}`) }
         className={classN.banner02Box}
         style={{backgroundImage:`url(${featuredCategories[2].featuredImage})`,  
         paddingRight:'10px', cursor:'pointer' }}
         >


           {/* <Typography component="h4" className={classN.bannerTitle02}>
           {featuredCategories[2].featuredTitle}
           </Typography>

          

           <Typography component="span" className={classN.bannerSpan02}>
           {featuredCategories[2].featuredText}
           </Typography>
            
           <Button className={classN.banner02Button}
           href={`/search?category=${featuredCategories.name}`}
           > Explore More </Button> */}
            
       </Grid>

       <Grid container
         direction='column'
         alignItems='flex-start'
         justifyContent='center'
         md={6}
         xs={12} 
            onClick={e=>  router.push(`/search?category=${featuredCategories[1].slug}`) }
         className={classN.banner02Box}
         style={{backgroundImage:`url(${featuredCategories[1].featuredImage})`, 
          paddingLeft:'10px', cursor:'pointer'}}
         >


           {/* <Typography component="h4" className={classN.bannerTitle02}>
           {featuredCategories.featuredTitle}
           </Typography>

          

           <Typography component="span" className={classN.bannerSpan02}>
               {featuredCategories[0].featuredText} 
           </Typography>
        
            <Button className={classN.banner02Button}
            href={`/search?category=${featuredCategories.name}`}
            >  Explore More</Button> */}
            
       </Grid>

    </Grid>
   )
}
