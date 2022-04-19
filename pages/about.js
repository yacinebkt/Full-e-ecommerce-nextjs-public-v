import React, {useContext} from 'react'
import dynamic from 'next/dynamic'

import {
      Typography, Link, Box} from '@material-ui/core';
import Layout from '../components/Layout/Layout';; 
import NextLink from 'next/link' ; 
import { useRouter } from 'next/router';
import useStyles from '../utils/styles/styles'

import DataWeb from '../utils/data/site/site'

//export default function CartScreen() {
 function AboutScreen() {
    const router = useRouter();


const classN = useStyles() 

    return (
       <Layout titleHeader='About Us'>

            <div 
               style={{display: 'flex',
                justifyContent : 'center',
                alignItems :'center',
                marginTop: '1rem'
              }}
            >
           <div className={classN.containerPers}
            style={{
                display: 'flex',
                minHeight: '70vh',
                alignItems :'center'
            }}
            // style={{border :'1px solid rgba(0, 0, 0, .096)'}}
            >
          

              <Box className={classN.aboutContainer}>

              <Box className={classN.aboutContainerImage}>
                  
                <video autoPlay="autoplay" muted loop='loop'  className={classN.aboutContainerVideo}>
                    <source src='/logoAnimate.mp4' type="video/mp4" className={classN.aboutContainerVideo} />
                
                </video>

              </Box>
              <Box className={classN.aboutContainerText}>
                  <Box>
                  <Typography component='h1' className={classN.aboutContainerTextTitle}>
                    About Us
                    </Typography>

                    <Typography className={classN.aboutContainerTextText}>
                    Welcome to FihaBox, your number one source for all products, We&apos;re dedicated to giving you the very best you want, with a focus on three characteristics: dependability, customer service and uniqueness.

                    </Typography>

                    <Typography className={classN.aboutContainerTextText}>
                    Founded in 2022 by
                    
                        <strong style={{margin:'0 5px '}}>
                         <NextLink href={DataWeb.siteInfo.devlopperAccount} passHref >
                            <Link className={`${classN.footerLink} ${classN.aboutContainerTextText}`} >
                            {DataWeb.siteInfo.devlopperName}
                            </Link>
                         </NextLink>,

                        </strong>
                     FihaBox has come a long way from its beginnings in a home office. We now serve customers all over Algeria, and are thrilled to be a part of the fair trade wing of all areas of business.
                    </Typography>

                    <Typography className={classN.aboutContainerTextText}>
                        We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don&apos;t hesitate to contact us.
                    </Typography>
                  </Box>
                
                  
              </Box>

               
           

              </Box>
           

            </div>
            </div>
       </Layout>
    )
}


export default dynamic (() => Promise.resolve(AboutScreen), {ssr: false})