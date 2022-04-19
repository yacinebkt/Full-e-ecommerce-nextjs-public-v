import { Button, Card, CardActionArea, CardActions,
    CardContent, CardMedia, Typography, Link, Grid} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import React from 'react'
import NextLink from 'next/link'
import useStyles from "../../utils/styles/styles";



export default function Newsletter() {


 const classN = useStyles();

   return (

       <Grid 
         style={{backgroundImage:'url(/Img/banner/b14.png)'}}
         className={classN.NewsletterSection}
         >
            <Grid item md={7} sm={12}>     
                <Typography component="h4" className={classN.NewsletterTitle}>
                    Sign Up for NewsLetters 
                </Typography>

                <Typography component="p" className={classN.NewsletterText}>
                    Get E-mail updates about our latest shop and <span>Special offers.</span>
                </Typography>
                    
            </Grid>


            <Grid item md={5} sm={12}
            className={classN.NewsletterForm}>
                <input type='email' placeholder="Your email address"
                className={classN.NewsletterInput} />
                <Button className={classN.NewsletterButton} >Sign Up</Button>
            </Grid>
          
        
            



       </Grid>

   )
}
