import { List, ListItem, TextField, Typography, Button, Link } from '@material-ui/core'
import React, { useContext, useState, useEffect } from 'react'

import Layout from '../components/Layout/Layout'
import useStyles from '../utils/styles/styles'
import NextLink from  'next/link'
import axios from 'axios'
import { Store } from '../utils/store/Store'
import Cookies from 'js-cookie';

import {useForm, Controller} from 'react-hook-form'
import { useSnackbar } from 'notistack'
import { getError } from '../utils/error/error';

import {useRouter} from 'next/router'

export default function Register() {
    const router = useRouter();
    
    const {handleSubmit, control, formState: {errors} } = useForm()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const {redirect} = router.query // if login redirect to shipping page
    const { state, dispatch } = useContext(Store);


    const { userInfo } = state;
    useEffect(() => {
        if (userInfo) {
            router.push('/');
      }
    }, []);

    const classN = useStyles();
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const [confirmPassword, setConfirmPassword] = useState('')



   




    const loginFun = async ({name, email, phone, password, confirmPassword}) => {
        //e.preventDefault();

        closeSnackbar();

        if (password !==confirmPassword) {

            //alert('passwords dont match')
            enqueueSnackbar("Passwords don't match", {variant : 'error'})
            return

        }
        try {
          const { data } = await axios.post('/api/users/register', {
            name,
            email,
            phone,
            password,
          });
          dispatch({ type: 'USER_LOGIN', payload: data });

        
          Cookies.set("userInfo", JSON.stringify(data));

          router.push('/profile');
        //   router.push(redirect || '/');
        } catch (err) {
          //alert(err.response.data ? err.response.data.message : err.message);
          //enqueueSnackbar(err.response.data ? err.response.data.message : err.message, {variant : 'error'})
          enqueueSnackbar(getError(err), {variant : 'error'})

        }
    };


    return (
        <Layout titleHeader='Register'>
           
           <div className={classN.GrapAL} style={{ backgroundImage:`url(/SignUp.png)` }}>
                <div className={classN.OverlayB}> </div>
              
                <div className={classN.containerSignUp} id="container">
      

                    <form className={classN.form} onSubmit={handleSubmit(loginFun)}>

                         <Typography className={classN.SignUpHeder} >
                           Register and discover great amount of new opportunities.
                        </Typography>
                        <List>
                            <ListItem>
                            <Controller
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: true,
                                        // minLength: 3,
                                        pattern: /^[a-z A-Z]{3,70}$/,


                                    }}
                                    render={({ field }) => (
                                        <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="name"
                                        label="Full Name"
                                        inputProps={{ type: 'name' }}
                                        error={Boolean(errors.name)}
                                        helperText={
                                            errors.name
                                            ? errors.name.type === 'pattern'
                                                ? 'your name must be at least 3 characters in length and contain only letters [a..z]'
                                                : 'Name is required'
                                            : ''
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
                                    defaultValue=""
                                    rules={{
                                        required: true,
                                        pattern: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        inputProps={{ type: 'email' }}
                                        error={Boolean(errors.email)}
                                        helperText={
                                            errors.email
                                            ? errors.email.type === 'pattern'
                                                ? 'Email is not valid'
                                                : 'Email is required'
                                            : ''
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
                                    name="password"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: true,
                                        minLength: 6,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        inputProps={{ type: 'password' }}
                                        error={Boolean(errors.password)}
                                        helperText={
                                            errors.password
                                            ? errors.password.type === 'minLength'
                                                ? 'The password must be at least 6 characters long'
                                                : 'Password is required'
                                            : ''
                                        }
                                        {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                            
                            </ListItem>

                            <ListItem>
                                
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: true,
                                        minLength: 6,
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="confirmPassword"
                                        label="Confirm Password"
                                        inputProps={{ type: 'password' }}
                                        error={Boolean(errors.confirmPassword)}
                                        helperText={
                                            errors.confirmPassword
                                            ? errors.confirmPassword.type === 'minLength'
                                                ? 'passwords do not match'
                                                : 'password is required'
                                            : ''
                                        }
                                        {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                            
                            </ListItem>



                        

                        
                        
                            
                            <ListItem>
                            <Button variant='contained' type='submit' color='primary' fullWidth >
                                    Register
                            </Button>
                            </ListItem>

                            <ListItem className={classN.allFlexCenter} style={{margin: '15px 0'}}>
                                Alredy have an account ? { `  ` } &nbsp;
                            <NextLink href={`/login?redirect=${redirect || '/'}`}  passHref>
                                    <strong>
                                        <Link  style={{cursor: 'pointer'}}>
                                        Sign in.
                                        </Link>
                                    </strong>
                                   
                                </NextLink>
                            
                            </ListItem>

                        </List>
                    </form>

                </div>
                
            </div>
            
        </Layout>
    )
}
