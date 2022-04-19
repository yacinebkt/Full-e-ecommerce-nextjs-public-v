import {
    Typography, Link
  } from "@material-ui/core";
  
import NextLink from 'next/link'
  import Layout from "../components/Layout/Layout";
 
import useStyles from "../utils/styles/styles";
  
import DataWeb from '../utils/data/site/site'




export default function PrivacyPolicy() {
  
    
  const classN = useStyles();
   
  
    return (
      <Layout titleHeader='Privacy Policy'>
        <div
          className={classN.GrapAL}
          style={{ backgroundImage: `url(/SignUp.png)` }}
        >
          <div className={classN.OverlayB}> </div>
  
          <div className={classN.containerSection} id="container">
            <div className={classN.form}>
                  <Typography className={classN.sectionHeader} >
                        Privacy Policy
                  </Typography>

                  <Typography className={classN.sectionText} >
                  We value the trust you place in us and recognize the importance of secure transactions and information privacy. This Privacy Policy describes how {DataWeb.siteInfo.name}, use, share or otherwise process your personal information.

                  <br/> While you may be able to browse certain sections of the Platform without registering with us, however, please note we do not offer any product or service under this Platform outside Algeria. Your personal information will primarily be stored and processed in Algeria and may have data protection laws that are different from those that apply in the country in which you are located. By visiting this Platform, providing your information or availing out product/service, you expressly agree to be bound by the terms and conditions of this Privacy Policy, the Terms of Use and the applicable service/product terms and conditions, and agree to be governed by the laws of Algeria including but not limited to the laws applicable to data protection and privacy. If you do not agree please do not use or access our Platform.
                 
                   <br/> <div style={{margin : '14px 0 0 0'}}> <strong> Collection of Your Information</strong> </div>
                   When you use our Platform {DataWeb.siteInfo.name}, we collect and store your information which is provided by you from time to time. In general, you can browse the Platform without telling us who you are or revealing any personal information about yourself. Once you give us your personal information, you are not anonymous to us. Where possible, we indicate which fields are required and which fields are optional. You always have the option to not provide information by choosing not to use a particular service, product or feature on the Platform.
                   <br/> We may track your buying behaviour, preferences, and other information that you choose to provide on our Platform. We use this information to do internal research on our users demographics, interests, and behaviour to better understand, protect and serve our users. This information is compiled and analysed on an aggregated basis. 
                   <br/> We may collect personal information (such as email address, delivery address, name, phone number, credit card/debit card and other payment instrument details) from you when you set up an account or transact with us or participate in any event or contest. While you can browse some sections of our Platform without being a registered member, certain activitiesdo require registration. We use your contact information to send you offers based on your previous orders and your interests.
                   <br/> If you send us personal correspondence, such as emails or letters, or if other users or third parties send us correspondence about your activities or postings on the Platform, we may collect such information into a file specific to you.
                  

                   <br/> <div style={{margin : '14px 0 0 0'}}> <strong>  Children Information</strong> </div>
                    Use of our Platform is available only to persons who can form a legally binding contract under the Algerian Contract Act. We do not knowingly solicit or collect personal information from children under the age of 18 years. If you have shared any personal information of children under the age of 18 years, you represent that you have the authority to do so and permit us to use the information in accordance with this Privacy Policy.


                    <br/> <div style={{margin : '14px 0 0 0'}}> <strong> Your Rights</strong> </div>
                    We take every reasonable step to ensure that your personal information that we process is accurate and, where necessary, kept up to date, and any of your personal information that we process that you inform us is inaccurate (having regard to the purposes for which they are processed) is erased or rectified. You may access, correct, and update your personal information directly through the functionalities provided on the Platform. You may delete certain non-mandatory information by logging into our website and visiting Profile and Settings sections. You can also write to us at the contact information provided below to assist you with these requests.


                    <br/> <div style={{margin : '14px 0 0 0'}}> <strong> Your Consent</strong> </div>
                    By visiting our Platform or by providing your information, you consent to the collection, use, storage, disclosure and otherwise processing of your information (including sensitive personal information) on the Platform in accordance with this Privacy Policy. If you disclose to us any personal information relating to other people, you represent that you have the authority to do so and to permit us to use the information in accordance with this Privacy Policy.
                    <br/>You, while providing your personal information over the Platform consent to us (including our other corporate entities, affiliates, lending partners, technology partners, marketing channels, business partners and other third parties) to contact you through SMS, instant messaging apps, call and/or e-mail for the purposes specified in this Privacy Policy.


                    <br/> <div style={{margin : '14px 0 0 0'}}> <strong>  Links to Other Sites</strong> </div>
                    {DataWeb.siteInfo.name} may provide links to other websites or application that may collect personal information about you. We are not responsible for the privacy practices or the content of those linked websites.


                    <br/> <div style={{margin : '14px 0 0 0'}}> <strong>   Security Precautions</strong> </div>
                    We maintain reasonable physical, electronic and procedural safeguards to protect your information. Whenever you access your account information, we offer the use of a secure server. Once your information is in our possession, we adhere to our security guidelines to protect it against unauthorized access. However, by using the Platform, the users accept the inherent security implications of data transmission over the internet and the World Wide Web which cannot always be guaranteed as completely secure, and therefore, there would always remain certain inherent risks regarding use of the Platform. Users are responsible for ensuring the protection of login and password records for their account.

                    <br/> <div style={{margin : '14px 0 0 0'}}> <strong>   Customer Support</strong> </div>
                    You can reach our customer support team to address any of your queries or complaints related to product and services by clicking the link, selecting your order, Link : 
                    <NextLink href={`/contact`} passHref>
                        <Link className={classN.footerLink}>
                            Click here
                        </Link>
                    </NextLink>

                    <br/> <div style={{margin : '14px 0 0 0'}}> <strong> Queries related to Privacy Policy</strong> </div>
                    If you have a query, concern, or complaint in relation to collection or usage of your personal information under this Privacy Policy, please contact us at the contact information provided below.

                    <br/>address : {DataWeb.siteInfo.address}
                    <br/>Email :  {DataWeb.siteInfo.email}
                    <br/>Phone :  {DataWeb.siteInfo.phone}
                  
                    <br/> <div style={{margin : '14px 0 0 0'}}> <strong>Changes to this Privacy Policy</strong> </div>

                  
                    
                    Please check our Privacy Policy periodically for changes. We may update this Privacy Policy to reflect changes to our information practices. We will alert you to significant changes by posting the date our policy got last updated, placing a notice on our Platform, or by sending you an email when we are required to do so by applicable law.
                    <br/> Updated: 8th Jun 2022
                    <br/><br/>
                  </Typography>
            
            </div>
          </div>
        </div>
      </Layout>
    );
  }
  