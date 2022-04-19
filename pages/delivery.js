import {
    Typography, Link
  } from "@material-ui/core";
  
import Layout from "../components/Layout/Layout";
 
import useStyles from "../utils/styles/styles";
  
import DataWeb from '../utils/data/site/site'




export default function DeliveryInformation() {
  
    
  const classN = useStyles();
   
  
    return (
      <Layout titleHeader='Delivery Information'>
        <div
          className={classN.GrapAL}
          style={{ backgroundImage: `url(/SignUp.png)` }}
        >
          <div className={classN.OverlayB}> </div>
  
          <div className={classN.containerSection} id="container">
            <div className={classN.form}>
                  <Typography className={classN.sectionHeader} >
                    Delivery Information
                  </Typography>

                  <Typography className={classN.sectionText} >
                 
                    <div style={{margin : '14px 0 0 0'}}> <strong> What are the delivery Tax? </strong> </div>
                   When you use our Platform {DataWeb.siteInfo.name}, Delivery charge varies with each Seller.
                    <br/> Sellers incur relatively higher shipping costs on low value items. In such cases, charging a nominal delivery charge helps them offset logistics costs. Please check your order summary to understand the delivery charges for individual products.

                   

                   <br/> <div style={{margin : '14px 0 0 0'}}> <strong>  Why the delivery date may not match the delivery schedule? </strong> </div>
                   It is possible that the Seller or our courier partners have a holiday between the day your placed your order and the date of delivery. In this case, we add a day to the estimated date. Some courier partners and Sellers do not work on fridays and this is factored in to the delivery dates.


                    <br/> <div style={{margin : '14px 0 0 0'}}> <strong> Delivery time</strong> </div>
                    Estimated delivery time depends on the following factors:

                    <br/> The Seller offering the product if we are not the one who offers it
                    <br/> Product&apos;s availability 
                    <br/> The destination to which you want the order shipped to and location of the Seller.

                  
                    <br/>
                  </Typography>
            
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  