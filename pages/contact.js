import React, { useContext } from "react";
import dynamic from "next/dynamic";

import {
    List,
    ListItem,
    TextField,
    Typography,
    Button,
  
    Box,
} from "@material-ui/core";
import Layout from "../components/Layout/Layout";
import { Store } from "../utils/store/Store";

import axios from "axios";
import { useRouter } from "next/router";
import useStyles from "../utils/styles/styles";

import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { getError } from '../utils/error/error';

import DataWeb from '../utils/data/site/site'


//export default function CartScreen() {
function ContactScreen() {
  const router = useRouter();

  const classN = useStyles();
  

  
  const { state, dispatch } = useContext(Store);

  const { userInfo } = state;

  console.log('userInfo', userInfo)



  
  const {
    handleSubmit,
    control,
    formState: { errors },
    resetField,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();


  const redirectionAfterSendMessage = () => {
    router.push(`/`)
  }

  const sendMessage = async ({ fullName, email, phone, subject, message }) => {

    closeSnackbar();
    try {
      const { data } = await axios.post("/api/services/contact", {
        fullName, email, phone, subject, message
      });

      enqueueSnackbar('Your Messaage Send successfully. We will respond to your enquiry as soon as possible. ', {variant : 'success'})
      console.log('data Message ', data)

      resetField('fullName')
      resetField('email')
      resetField('phone')
      resetField('subject')
      resetField('message')

      setTimeout( redirectionAfterSendMessage(), 10000)


    } catch (err) {
   
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };


  return (
    <Layout titleHeader="Contact Us">
    
    <div
        className={classN.GrapAL}
        style={{ backgroundImage: `url(/triangles.jpg)` }}
      >
        <div className={classN.OverlayB}> </div>

        <div className={classN.containerSignUp} id="container">
          <form className={classN.contactLeftSide} onSubmit={handleSubmit(sendMessage)}>
                <Typography className={classN.SignUpHeder} >
                        Send Your Request
                </Typography>
            <List>
            

              <ListItem>
                <Controller
                  name="fullName"

                   
                  control={control}
                  
                  rules={{
                    required: true,
                     pattern: /^[a-z A-Z]{3,70}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="fullName"
                      label="Full Name"
                      placeholder = 'Mohamed Yacine'

                      defaultValue= {userInfo && userInfo.name? userInfo.name : ''}
                      InputProps={{
                        readOnly: userInfo && userInfo.name? true : false,
                      }}

                      inputProps={{ type: "text" }}
                      error={Boolean(errors.fullName)}
                      helperText={
                        errors.fullName
                          ? 
                         "Full Name is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>


              <ListItem>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: true,
                    pattern:/^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
                    // pattern:"[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="phone"
                      label="Phone Number"
                      placeholder = '07 77 77 77 77'

                      defaultValue= {userInfo && userInfo.phone? userInfo.phone : ''}
                      InputProps={{
                        readOnly: userInfo && userInfo.phone? true : false,
                      }}

                      
                      inputProps={{ type: "number" }}
                      
                       className={classN.textFiledNumberArrowNone}
                      error={Boolean(errors.phone)}
                      helperText={
                       
                          errors.phone
                          ? errors.phone.type === "pattern"
                            ? "Phone Number  is not valid"
                            : "Phone Number  is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>


              <ListItem>
                <Controller
                  name="email"
                  control={control}
                
                  rules={{
                    required: true,
                    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email"
                      placeholder = 'Amine@gmail.com'

                      defaultValue= {userInfo && userInfo.email? userInfo.email : ''}
                      InputProps={{
                        readOnly: userInfo && userInfo.email? true : false,
                      }}

                      inputProps={{ type: "email" }}
                      error={Boolean(errors.email)}
                      helperText={
                        errors.email
                          ? errors.email.type === "pattern"
                            ? "Email is not valid"
                            : "Email is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>


              <ListItem>
                <Controller
                  name="subject"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="subject"
                      label="Subject"
                      
                      placeholder = 'Help with my order'

                    //   inputProps={{ type: "number" }}
                      error={Boolean(errors.subject)}
                      helperText={
                        errors.subject
                          ? 
                         "Subject is required"
                          : ""
                      }
                      {...field}
                    ></TextField>
                  )}
                ></Controller>
              </ListItem>


                    <ListItem>
                      <Controller
                              name="message"
                              control={control}
                              defaultValue=""
                              rules={{
                                  required: true,
                              }}
                              render={({ field }) => (
                                  <TextField
                                  variant="outlined"
                                  multiline
                                  rows={4}

                                  fullWidth
                                  id="message"
                                  label="Message"
                                //   inputProps={{ type: 'name' }}
                                  error={Boolean(errors.message)}
                                  helperText={
                                      errors.message
                                      ? 
                                        'Message is required'
                                      : ''
                                  }
                                  {...field}
                                  ></TextField>
                              )}
                              ></Controller>
                      </ListItem>


                      
              <ListItem>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                >
                  Send Messsage
                </Button>
              </ListItem>

             
            </List>
          </form>

          <div  className={classN.contactRightSide} >
          <List>
                <Typography className={classN.SignUpHeder} >
                       Reach Us
                </Typography>
              <ListItem className={classN.contactDetaisContainer}>
                    <div className={classN.contactIconContainer}>
                        <i className="uil uil-map-marker" />
                    </div>
                  <Box className={classN.contactInfoContainer}>
                    <Typography> Address </Typography>
                    <Typography>  {DataWeb.siteInfo.address} </Typography>               
                  </Box>
                 
              </ListItem>

              <ListItem className={classN.contactDetaisContainer}>
                     <div className={classN.contactIconContainer}>
                        <i className="uil uil-phone" />
                    </div>
                <Box className={classN.contactInfoContainer}>
                    <Typography> Phone  </Typography>
                    <Typography>   {DataWeb.siteInfo.phone} </Typography>
                </Box>
                 
              </ListItem>

              <ListItem className={classN.contactDetaisContainer}>
                    <div className={classN.contactIconContainer}>
                        <i className="uil uil-envelope" />
                    </div>
                <Box className={classN.contactInfoContainer}>
                    <Typography> Email  </Typography>
                    <Typography>   {DataWeb.siteInfo.email} </Typography>
                </Box>
                 
              </ListItem>
          </List>
              

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(ContactScreen), { ssr: false });
