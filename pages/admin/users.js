import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useReducer, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { getError } from "../../utils/error/error";
import { Store } from "../../utils/store/Store";
import {
  Grid,
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
  CardContent,
  CardActions,
  Breadcrumbs,
  IconButton,
  FormControlLabel,
  Checkbox,
  TextField,
  Menu,
} from "@material-ui/core";
import useStyles from "../../utils/styles/styles";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import Leftbar from "../../components/Layout/Leftbar";

import {
  MoreVert,
  DeleteForever,
  DeleteOutline,
  Edit,
  AddBox,
  Cancel,
  ExpandMore,
  Image,
  OpenInBrowser
} from "@material-ui/icons";

import Preloader from "../../components/Layout/Preloader";
import { Pagination } from "@material-ui/lab";


import { useForm, Controller } from "react-hook-form";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, users: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    //
    // case 'CREATE_USER_REQUEST':
    //   return { ...state, loadingCreateUser: true, };
    // case 'CREATE_USER_SUCCESS':
    //   return { ...state, loadingCreateUser: false,  };
    // case 'CREATE_USER_FAIL':
    //   return { ...state, loadingCreateUser: false,  };

    //
    case "DELETE_USER_REQUEST":
      return { ...state, loadingDeleteUser: true };
    case "DELETE_USER_SUCCESS":
      return { ...state, loadingDeleteUser: false, userSuccessDelete: true };
    case "DELETE_USER_FAIL":
      return { ...state, loadingDeleteUser: false };

    case "DELETE_USER_RESET":
      return { ...state, loadingDeleteUser: false, userSuccessDelete: false };

    default:
      state;
  }
}

function AdminUser() {
  const { state } = useContext(Store);
  const router = useRouter();

  const { userInfo } = state;

  const classN = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [itemOpen, setItemOpen] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [loadingAddNew, setLoadingAddNew] = useState(false);

  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  
  const [usersDoc, setUsersDoc] = useState({});
  const [page, setPage] = useState(1)



  const [breadArray, setBreadArray] = useState([
    { name: "home", link: "/" },
    { name: "admin dashboard", link: "/admin/dashboard" },
    { name: "users", link: "/admin/users" },
  ]);

  const [
    {
      loading,
      /*loadingCreateUser,*/ loadingDeleteUser,
      userSuccessDelete,
      error,
      users,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    users: [],
    error: "",
  });

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
      router.push("/login");
    }
    
    fetchDataPage();

  }, [userSuccessDelete]);

  
  const fetchDataPage = async (pageN) => {
   
    try {
      const { data } = await axios.post(`/api/admin/users/userswithpage`, {page : pageN? pageN : 1, }, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setUsersDoc(data)
      dispatch({ type: "FETCH_SUCCESS", payload: data.users });

      // console.log('products wiwth page', data)
    } catch (err) {

      dispatch({ type: "FETCH_FAIL", payload: getError(err) });

    }
  };
  
  

  const pageChanger = (e, pageN) => {
    // console.log('page', pageN)
    setPage(pageN);
    fetchDataPage(pageN)
  };

  
  const handleClickMenu = (event, item) => {
    setAnchorEl(event.currentTarget);
    setItemOpen(item);
    // console.log('event.currentTarget', event.currentTarget)
  };

  
  const addNewUser = async ({name, email, password, phone}) => {
    
  try {
    setLoadingAddNew(true)

    const { data } = await axios.post(
      `/api/admin/users`,
      {
        name,
        email,
        password,
        phone,
        isAdmin,
        isSeller,
      },
      {
        headers: { authorization: `Bearer ${userInfo.token}` },
      }
    );

    enqueueSnackbar("User Created successfully", { variant: "success" });
    setLoadingAddNew(false)
    router.push(`/admin/user/${data.user._id}`);
  } catch (err) {
    
    setLoadingAddNew(false)
    enqueueSnackbar(getError(err), { variant: "error" });
  }

  }

  const closeOpenAddModal= () => {
    setOpenAddModal(false);
  };
 

  const deleteUserFun = async (userId) => {
    if (!window.confirm("Are you sure want te delet this item ?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_USER_REQUEST" });

      await axios.delete(
        `/api/admin/users/${userId}`,
        //{}, delete handler don't accept form body
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "DELETE_USER_SUCCESS" });
      enqueueSnackbar("User Deleted successfully", { variant: "success" });
      //router.push(`/admin/user/${data.user._id}`)
    } catch (err) {
      dispatch({ type: "DELETE_USER_FAIL" });

      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  return (
    <Layout title="Users-Dashboard" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="users" adminDashboard/>
        </Grid>

        <Grid className={classN.adminMainGrid}>

        {openAddModal ? (
            <div className={classN.sectionAddFloat}>                 
            <div //className={classN.modalMaxHeight}
            className={classN.section}
            > 
            {loadingAddNew ? 
              <div className={classN.loadFull}>
              {/* <Preloader /> */}
              <CircularProgress />
            </div>
            :null}

            <List >

            
              <div className={classN.titleHeaderIcon}>
                <IconButton 
                  variant="contained"
                  color="error"
                  // startIcon={}
                  onClick={closeOpenAddModal}
                  // className={classN.btnHeaderWithIcon}
                >
                  {/* Cancel */}
                  <Cancel />
                </IconButton >

               
              </div>
            </List>
              
              <form
                className={classN.form}
                onSubmit={handleSubmit(addNewUser)}
              >
                
                <List style={{ display: "flex", flexWrap: "wrap" }}>

                <ListItem>
                  <Typography // component="h1" variant="h1"
                    className={classN.titleHeader}
                  >
                    Add New User
                    {/* you have saved before */}
                  </Typography>
                </ListItem>

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
                            inputProps={{ type: "name" }}
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

                    {/* Paswword controller */}

                    <ListItem className={classN.listItemMin}>
                                 

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

                      



              
                
               

                <ListItem>
                  
                  <div className={classN.modalActions}>
                    <Button
                      className={classN.lastEditBtn}
                      variant="contained"
                      color="error"
                      onClick={closeOpenAddModal}
                    >
                      Cancel
                    </Button>

                    <Button
                      className={classN.firstEditBtn}
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ marginLeft: "8px" }}
                      // startIcon={<AddBox />}
                       onClick={handleSubmit(addNewUser)}
                    >
                      Add User
                    </Button>
                  </div>

                  <div className={classN.modalActionsSm}>
                    <Button
                      className={classN.lastEditBtn}
                      variant="contained"
                      color="error"
                      onClick={closeOpenAddModal}
                    >
                      Cancel
                    </Button>

                    <Button
                      className={classN.firstEditBtn}
                      variant="contained"
                      color="primary"
                      type="submit"
                      style={{ marginLeft: "8px" }}
                      // startIcon={<AddBox />}
                      onClick={handleSubmit(addNewUser)}
                    >
                      Add User
                    </Button>
                  </div>
                </ListItem>

                </List>
              </form>
            </div>


            </div>
          ) :
          null}

          <div className={classN.section}  style={{display : openAddModal ? 'none' : 'block'}}>

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
          </List>

          <List className={classN.headerTitleSb}>
              <div className={classN.titleHeaderIcon}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddBox />}
                  onClick={() => setOpenAddModal(true)}
                  className={classN.btnHeaderWithIcon}
                >
                  New User
                </Button>

                <AddBox
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenAddModal(true)}
                  className={classN.btnIconHeader}
                />
              </div>
           </List>






              <List>
                {loading ? (
                  <div className={classN.loadingContainer}>
                  <Preloader />
                  </div>
                ) : error ? (
                  <Typography className={classN.error}>{error}</Typography>
                ) : (

                <>
                  <ListItem>
                  <Typography // component="h1" variant="h1"
                    className={classN.titleHeader}
                  >
                    List of users
                  </Typography>
                </ListItem>
             
                
                  <TableContainer>
                    <Table>
                      <TableHead>
                        {/** */}
                        <TableRow>
                          <TableCell>ID</TableCell>
                          <TableCell>NAME</TableCell>
                          <TableCell>EMAIL</TableCell>
                          <TableCell>USER TYPE</TableCell>
                         
                          <TableCell>
                            {/* ACTION */}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {users.map((user, index) => (
                          <TableRow key={user._id}>
                            <TableCell>{user._id.substring(20, 24)}</TableCell>
                            <TableCell>{user.name}</TableCell>

                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              {user.isAdmin ?
                                    user.isSeller? 
                                    'Admin / Seller' : 
                                    "Admin" : 
                                user.isSeller? 
                                'Seller' : 
                                "User"
                              
                              }
                            </TableCell>
                          
                            <TableCell>
                            <IconButton
                                id="simple-menu"
                                aria-controls="simple-menu"
                                aria-haspopup="true"
                                //  aria-haspopup="true"
                                //  aria-expanded={itemOpen ? 'true' : undefined}
                                onClick={(e) => handleClickMenu(e, index)}
                              >
                                <MoreVert />
                              </IconButton>

                              <Menu
                                id="simple-menu"
                                keepMounted
                                open={itemOpen === index}
                                anchorEl={anchorEl}
                                // getContentAnchorEl={null}
                                MenuListProps={{
                                  "aria-labelledby": "basic-button",
                                }}
                                onClose={(event, reason) => {
                                  if (reason !== "backdropClick") {
                                    setAnchorEl(null);
                                    setItemOpen(null);
                                    handleClose(event, reason);
                                  } else {
                                    setAnchorEl(null);
                                  }
                                  setItemOpen(null);
                                }}
                                getContentAnchorEl={null}
                                anchorOrigin={{
                                  vertical: "center",
                                  horizontal: "left",
                                }}
                                transformOrigin={{
                                  vertical: "top",
                                  horizontal: "right",
                                }}
                                style={{ margin: 0, padding: 0 }}
                              >
                                <MenuItem
                                  className={`${classN.menuItem} ${classN.menuItemDelet}`}
                               
                                  onClick={() => deleteUserFun(user._id)}

                                >
                                  <DeleteOutline
                                    className={classN.menuItemNormalBtn}
                                  />
                                  <span>Delet</span>
                                </MenuItem>
                                <NextLink
                                  href={`/admin/user/${user._id}`}
                                  passHref
                                >
                                  <Link>
                                    <MenuItem className={`${classN.menuItem}`}>
                                      <Edit
                                        className={classN.menuItemNormalBtn}
                                      />
                                      <span>Edit</span>
                                    </MenuItem>
                                  </Link>
                                </NextLink>
                                </Menu>
                             
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <ListItem>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        margin: "1.5rem 0",
                      }}
                    >
                      <Pagination
                        className={classN.mt1}
                        defaultPage={parseInt(page || "1")}
                        count={usersDoc.pages}
                        onChange={pageChanger}
                      />
                    </div>
                    </ListItem>
                  </>
                )}
                  </List>
             
          
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}

// for rende userHistory only in front end
export default dynamic(() => Promise.resolve(AdminUser), { ssr: false });
