import {
  List,
  ListItem,
  TextField,
  Typography,
  Button,
  Link,
} from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";

import Layout from "../components/Layout/Layout";
import useStyles from "../utils/styles/styles";
import NextLink from "next/link";
import axios from "axios";
import { Store } from "../utils/store/Store";
import Cookies from "js-cookie";

import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error/error";

export default function Login() {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { redirect } = router.query; // if login redirect to shipping page
  const { state, dispatch } = useContext(Store);

  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const classN = useStyles();
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  // const loginFun = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const { data } = await axios.post('/api/users/login', {
  //         email,
  //         password,
  //       });
  //       dispatch({ type: 'USER_LOGIN', payload: data });
  //       Cookies.set('userInfo', data);
  //       router.push(redirect || '/');
  //     } catch (err) {
  //       alert(err.response.data ? err.response.data.message : err.message);
  //     }
  // };

  const loginFun = async ({ email, password }) => {
    // e.preventDefault();
    closeSnackbar();
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      //Cookies.set('userInfo', data);
      Cookies.set("userInfo", JSON.stringify(data));

      router.push(redirect || "/");
    } catch (err) {
      //enqueueSnackbar(err.response.data ? err.response.data.message : err.message, {variant:'error'})
      //alert(err.response.data ? err.response.data.message : err.message);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  return (
    <Layout titleHeader="Log In">
      <div
        className={classN.GrapAL}
        style={{ backgroundImage: `url(/SignUp.png)` }}
      >
        <div className={classN.OverlayB}> </div>

        <div className={classN.containerSignUp} id="container">
          <form className={classN.form} onSubmit={handleSubmit(loginFun)}>
                <Typography className={classN.SignUpHeder} >
                        Enter your email and password to SignIn.
                </Typography>
            <List>
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
                {/* <TextField variant='outlined' fullWidth id='password' label='Password' 
                                    inputProps={{type:'password'}}
                                    onChange = {e => setPassword(e.target.value)}
                                    >
                                    </TextField> */}

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
                      inputProps={{ type: "password" }}
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password
                          ? errors.password.type === "minLength"
                            ? "Password length is more than 5"
                            : "Password is required"
                          : ""
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
                  logIn
                </Button>
              </ListItem>

              <ListItem className={classN.allFlexCenter} style={{margin: '15px 0'}}>
                Don&lsquo;t have an account yet? &nbsp;
                <NextLink
                  href={`/register?redirect=${redirect || "/"}`}
                  passHref
                >
                    <Link style={{cursor: 'pointer'}}>
                      <strong> Register.</strong> 
                    </Link> 
                </NextLink>
                {/* &nbsp;for free. */}
              </ListItem>
            </List>
          </form>
        </div>
      </div>
    </Layout>
  );
}
