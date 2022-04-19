import { Typography, Link, Grid} from '@material-ui/core'
import React from 'react'
import NextLink from 'next/link'
import useStyles from "../../utils/styles/styles";
import { useRouter } from "next/router";


import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import PinterestIcon from '@material-ui/icons/Pinterest';
import YouTubeIcon from '@material-ui/icons/YouTube';
import GitHubIcon from '@material-ui/icons/GitHub';


import DataWeb from '../../utils/data/site/site'



export default function Footer() {



  const router = useRouter();


  const classN = useStyles();

    return (
      <Grid 
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            className={classN.footerScetion}
            component="footer" 

        >

        <Grid container direction='column' md={3}>
            <Grid item direction='row'>
                {/* <img
                    src='/Img/logo/logo.png'
                /> */}
                  <img className={classN.brandFooter} src='/Img/logo/fihaDark.png' alt='FIHABOX logo' />
               
            </Grid>

            <Typography component="h4" className={classN.footerSubTitle}>
                Contact
            </Typography>

            <a href = {`https://maps.google.com/maps?q=Route+El+Wiam،+Djelfa`} target="_blank" rel="noreferrer" 
                style={{margin: '4px 0'}}
            >
            <Typography component="p" >
                <strong>address</strong> {DataWeb.siteInfo.address}
            </Typography>

            </a>

          

            <a href = {`tel:${DataWeb.siteInfo.phone}`} style={{margin: '4px 0'}}>
                <Typography component="p" >
                <strong>Phone</strong>  {DataWeb.siteInfo.phone}
                </Typography>

            </a>

            
                <a href = {`mailto:${DataWeb.siteInfo.email}`} style={{margin: '4px 0'}}>
                <Typography component="p">
                    <strong>Email</strong>  {DataWeb.siteInfo.email}
                </Typography>

                </a>
          
            <Typography component="p" style={{margin: '4px 0'}}>
                <strong>W. Time </strong> {DataWeb.siteInfo.work_time}
            </Typography>


            
            <Typography component="h4" className={classN.footerSubTitle} style={{marginTop: '5px'}}>
                Follow Us 
            </Typography>

            <Grid item direction='row'>
               
               <NextLink href={DataWeb.siteSocialMedia.facebook} passHref >
                    <Link className={classN.footerLink}>
                        <FacebookIcon className={classN.footerLinkSocial}  />
                    </Link>
                </NextLink>

                <NextLink href={DataWeb.siteSocialMedia.instagram} passHref >
                    <Link className={classN.footerLink}>
                        <InstagramIcon className={classN.footerLinkSocial}/>
                    </Link>
                </NextLink>

                <NextLink href={DataWeb.siteSocialMedia.twitter} passHref >
                    <Link className={classN.footerLink}>
                       <TwitterIcon  className={classN.footerLinkSocial}/>
                    </Link>
                </NextLink>

                <NextLink href={DataWeb.siteSocialMedia.pinterest} passHref >
                    <Link className={classN.footerLink}>
                        <PinterestIcon className={classN.footerLinkSocial}/>
                    </Link>
                </NextLink>

                <NextLink href={DataWeb.siteInfo.devlopperAccount} passHref >
                    <Link className={classN.footerLink}>
                        <GitHubIcon className={classN.footerLinkSocial}/>
                    </Link>
                </NextLink>

               
            </Grid>




        </Grid>

        <Grid container direction='column' md={3}>
            <Typography component="h4" className={classN.footerSubTitle}>
                About
            </Typography>
          
            <NextLink href={`/about`} passHref >
                <Link className={classN.footerLink}>
                    About
                </Link>
            </NextLink>

            <NextLink href={`/contact`} passHref>
                <Link className={classN.footerLink}>
                    Contact Us
                </Link>
            </NextLink>

            <NextLink href={`/delivery/`} passHref>
                <Link  className={classN.footerLink}>
                    Delivery Information
                </Link>
            </NextLink>

            <NextLink href={`/privacypolicy`} passHref>
                <Link className={classN.footerLink}>
                    Privacy Policy
                </Link>
            </NextLink>

            {/* <NextLink href={`/product/`} passHref>
                <Link className={classN.footerLink}>
                    Terms & conditions
                </Link>
            </NextLink> */}

          

        </Grid>


        <Grid container direction='column' md={3}>
            <Typography component="h4" className={classN.footerSubTitle}>
                My Account
            </Typography>
           

            <NextLink href={`/login`} passHref>
                <Link className={classN.footerLink}>
                    Sign In
                </Link>
            </NextLink>

            <NextLink href={`/register`} passHref>
                <Link className={classN.footerLink}>
                    Sign Up
                </Link>
            </NextLink>

            <NextLink href={`/cart`} passHref>
                <Link className={classN.footerLink}>
                    View Cart
                </Link>
            </NextLink>

            {/* <NextLink href={`/product/`} passHref>
                <Link className={classN.footerLink}>
                    My wishlist
                </Link>
            </NextLink> */}

            <NextLink href={`/profile/order-history`} passHref>
                <Link className={classN.footerLink}>
                    Track My Orders
                </Link>
            </NextLink>

            {/* <NextLink href={`/product/`} passHref>
                <Link className={classN.footerLink}s>
                    Help
                </Link>
            </NextLink> */}

        </Grid>

        <Grid container direction='column' md={3}>
            <Typography component="h4" className={classN.footerSubTitle}>
                Install App
            </Typography>
           

            <Typography component="h4" className={classN.footerSubTitleText}>
                From App store or google play
            </Typography>

            <Grid item  className={classN.footerPayContainer}>
                <img className={classN.footerPay}
                    src='/Img/pay/app.jpg'
                />
                  <img className={classN.footerPay}
                    src='/Img/pay/play.jpg'
                />
            </Grid>

            <Typography component="h4" className={classN.footerSubTitle}>
                Secured Payment Gateways
            </Typography>

            <Grid item className={classN.footerPayCenter}>
                <img  
                    src='/Img/pay/pay.png'
                />
               
            </Grid>

        </Grid>

        <Grid   container
            direction="row"
            justifyContent="center"
            alignItems="center"
            //className={classN.productBox}
            md={12}>
            <Typography component="h4" className={classN.footerCopyright}>
              
               Copyright &copy; 2022, All Right Reserved FihaBox E-commerce.

            </Typography>
        </Grid>


      </Grid>
    )
}
