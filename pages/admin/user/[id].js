import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useReducer, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { getError } from "../../../utils/error/error";
import { Store } from "../../../utils/store/Store";
import {
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
  CircularProgress,
  ListItemText,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  InputLabel,
  FormControl,
  Breadcrumbs,
  Backdrop,
  OutlinedInput,
} from "@material-ui/core";

import {
  MoreVert,
  DeleteForever,
  DeleteOutline,
  Edit,
  AddBox,
  Cancel,
  ExpandMore,
  Image,
} from "@material-ui/icons";

import Leftbar from "../../../components/Layout/Leftbar";
import Preloader from "../../../components/Layout/Preloader";

import useStyles from "../../../utils/styles/styles";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
//import Cookies from 'js-cookie';
import moment from "moment";

import { useForm, Controller } from "react-hook-form";
import countriesData from "../../../utils/data/registration/countries";


function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, /*user: action.payload,*/ error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    //

    case "FETCH_All_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_All_SUCCESS":
      return {
        ...state,
        loading: false,
        /*users: action.payload,*/ error: "",
      };
    case "FETCH_All_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    //

    case "UPlOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPlOAD_SUCCESS":
      return { ...state, loadingUpload: false, errorUpload: "" };
    case "UPlOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      state;
  }
}

function UserEdit({ params }) {
  const userId = params.id;

  const { state /*dispatch*/ } = useContext(Store);

  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);


  const [breadArray, setBreadArray] = useState([
    { name: "home", link: "/" },
    { name: "dashboard", link: "/admin/dashboard" },
    { name: "users", link: "/admin/users" },
    { name: "edit", link: "#" },
  ]);
  const [{ loading, loadingUpdate, loadingUpload, error }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });

  const router = useRouter();

  const { userInfo } = state;

  const classN = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    } else {
      async function fetchData() {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/admin/users/${userId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          
          setValue("name", data.name);
          setValue("email", data.email);
          setValue("phone", data.phone);

          setIsAdmin(data.isAdmin)
          setIsSeller(data.isSeller)
          
          dispatch({ type: "FETCH_SUCCESS" });
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      }
      fetchData();
    }
  }, []);

  
  const updateUser = async ({ name, email, phone}) => {
    //e.preventDefault();
    closeSnackbar();


    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/admin/users/${userId}`,
        {
          name,
          email,
          phone,
          isAdmin,
          isSeller,

        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "UPDATE_SUCCESS" });
      enqueueSnackbar("User Updated successfully", { variant: "success" });
      router.push("/admin/users");
    } catch (err) {
      //alert(err.response.data ? err.response.data.message : err.message);
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });

      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

 
  return (
    <Layout title="Edit User" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="users" adminDashboard />
        </Grid>
        <Grid className={classN.adminMainGrid}>
          <div className={classN.section}>
            <List>
              <ListItem>
                <Breadcrumbs aria-label="breadcrumb">
                  {breadArray.map((e) => (
                    <Link
                      key={e.name}
                      underline="hover"
                      color="inherit"
                      style={{ fontSize: "12px" }}
                      href={e.link}
                    >
                      {e.name}
                    </Link>
                  ))}
                </Breadcrumbs>
              </ListItem>

              {loading ? (
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  style={{ backgroundColor: "#fff" }}
                  open={loading}
                >
                  {/* <CircularProgress color="primary" /> */}

                  <Preloader />
                </Backdrop>
              ) : error ? (
                <ListItem>
                  <Typography className={classN.error}>{error}</Typography>
                </ListItem>
              ) : (
                <>
                  <ListItem>
                    <Typography // component="h1" variant="h1"
                      className={classN.titleHeader}
                    >
                      Edit User N : {userId}
                    </Typography>
                  </ListItem>

                  <form
                    className={classN.form}
                    onSubmit={handleSubmit(updateUser)}
                  >
                    <List style={{ display: "flex", flexWrap: "wrap" }}>
                    
                    
                      {/* Name Controller */}
                  <ListItem className={classN.listItemMin}>
                  <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          // minLength: 3,
                          pattern: /^[a-z A-Z]{3,120}$/,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            label="Full Name"
                            placeholder="Ahmed Salim"
                            // inputProps={{ type: "name" }}
                            error={Boolean(errors.name)}
                            helperText={
                              errors.name
                                ? errors.name.type === "pattern"
                                  ? "your name must be at least 3 characters in length and contain only letters [a..z]"
                                  : "Name is required"
                                : ""
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                  </ListItem>


                  {/* Email Controller */}

                  <ListItem className={classN.listItemMin}>
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

                  {/* Phone controller */}

                    <ListItem className={classN.listItemMin}>
                      <Controller
                        name="phone"
                        control={control}
                        rules={{
                          required: true,
                          pattern: /^(00213|\+213|0)(5|6|7)[0-9]{8}$/,
                          // pattern:"[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            placeholder="07 65 77 56 56"
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

                  

                      {/* inMenu checkBox */}

                      <ListItem>
                        <FormControlLabel
                          label="Is Admin"
                          control={
                            <Checkbox
                              onClick={(e) => setIsAdmin(e.target.checked)}
                              checked={isAdmin}
                              name="isAdmin"
                            />
                          }
                        ></FormControlLabel>
                      </ListItem>

                        {/* isSeller checkBox */}

                        <ListItem>
                        <FormControlLabel
                          label="Is Seller"
                          control={
                            <Checkbox
                              onClick={(e) => setIsSeller(e.target.checked)}
                              checked={isSeller}
                              name="isSeller"
                            />
                          }
                        ></FormControlLabel>
                      </ListItem>

                    
                     
                   

                     <ListItem
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          fullWidth
                          style={{ maxWidth: "480px", margin: "12px 0" }}
                        >
                          Update
                        </Button>
                        {loadingUpdate && <CircularProgress />}
                      </ListItem>
                    </List>
                  </form>
                </>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default dynamic(() => Promise.resolve(UserEdit), { ssr: false });
