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
  Box,
  Stepper,
  Step,
  StepLabel ,
} from "@material-ui/core";
import Leftbar from "../../../components/Layout/Leftbar";
import Preloader from "../../../components/Layout/Preloader";

import {
  MoreVert,
  DeleteForever,
  DeleteOutline,
  Edit,
  AddBox,
  Cancel,
  ExpandMore,
  Image,
  PhoneAndroid, Mail,AccountBox, Save,
} from "@material-ui/icons";

import useStyles from "../../../utils/styles/styles";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import moment from "moment";
//import Cookies from 'js-cookie';

import { useForm, Controller } from "react-hook-form";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        /*order: action.payload,*/ error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    //

    case "FETCH_All_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_All_SUCCESS":
      return {
        ...state,
        loading: false,
        /*orders: action.payload,*/ error: "",
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

function OrderEdit({ params }) {
  const orderId = params.id;
  const [order, setOrder] = useState({})

  let [shippingStatus, setShippingStatus] = useState('orderd')
  const { state /*dispatch*/ } = useContext(Store);

  const [breadArray, setBreadArray] = useState([
    { name: "home", link: "/" },
    { name: "dashboard", link: "/admin/dashboard" },
    { name: "orders", link: "/admin/orders" },
    { name: "details", link: "#" },
  ]);

  const [
    { loading, loadingUpdate, loadingUpload, error /*orders ,order*/ },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    // order: {},
    error: "",
  });

  const router = useRouter();

  const { userInfo } = state;

  const classN = useStyles();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    } else {
     
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/api/admin/orders/${orderId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setOrder(data)
      
      if (data.isPacked)  setShippingStatus('packed') 
      if (data.isShipped)  setShippingStatus('shipped') 
      if (data.isDelivered)  setShippingStatus('delivered')  

      console.log('data', data )
      dispatch({ type: "FETCH_SUCCESS" });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: getError(err) });
    }
  };

  const saveShanges = async () => {
    try {
      
      await axios.put(
        `/api/admin/orders/${orderId}`,
        {
          status : shippingStatus,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      // dispatch({ type: "UPDATE_SUCCESS" });
      enqueueSnackbar("Updated shipping status successfully", {
        variant: "success",
      });
      fetchData();
    } catch (err) {
      //alert(err.response.data ? err.response.data.message : err.message);
      // dispatch({ type: "UPDATE_FAIL", payload: getError(err) });

      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  return (
    <Layout title="Order Details" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="orders" adminDashboard />
        </Grid>

        <Grid className={classN.adminMainGrid}>
          <div className={classN.section}>
            <List>
              <ListItem>
                <Breadcrumbs aria-label="breadcrumb" style={{
  wordBreak: 'break-all'}}>
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
                      Order Details N : {orderId}
                    </Typography>
                  </ListItem>

                  <Box className={classN.orderBox}>
                    <div className={classN.orderHeader}>
                      <Typography>
                      {order.user ? order.user.name? order.user.name : 'User Deleted' : 'User Deleted'}
                      </Typography>

                      <Typography>
                        Placed on {moment(order.createdAt).utc().format('DD-MM-YY hh:mm')}

                      </Typography>

                  
                    </div>

                    <div className={classN.orderMainSection}>
                      
                        <div className={classN.orderMainSectionHeader}>
                            { order.user ? 
                            (<>
                              <Typography className={classN.orderMainSectionHeaderTitle}>
                              <AccountBox style={{marginRight:'8px'}} />
                              {order.shippingAddress.fullName? order.shippingAddress.fullName : 'Undefined' }
                              </Typography>
                              <Typography className={classN.orderMainSectionHeaderTitle}>
                                  <PhoneAndroid style={{marginRight:'8px'}} />
                                  {order.shippingAddress.phone ? order.shippingAddress.phone : order.user.phone ? order.user.phone: 'Undefined' }
                              </Typography>
                              <Typography className={classN.orderMainSectionHeaderTitle}>
                                  <Mail style={{marginRight:'8px'}} />
                                  {order.shippingAddress.email? order.shippingAddress.email : order.user.email ? order.user.email : 'Undefined' }

                              </Typography>
                            </>

                            )
                            :
                            ( 
                              <>
                              <Typography className={classN.orderMainSectionHeaderTitle}>
                              <AccountBox style={{marginRight:'8px'}} />
                              {order.shippingAddress.fullName? order.shippingAddress.fullName : 'Undefined' }
                              </Typography>
                              {
                                order.shippingAddress.phone ?
                                ( <Typography className={classN.orderMainSectionHeaderTitle}>
                                  <PhoneAndroid style={{marginRight:'8px'}} />
                                  { order.shippingAddress.phone}
                                 </Typography>
                                 ):null
                              }

                               {
                                order.shippingAddress.email ?
                                ( <Typography className={classN.orderMainSectionHeaderTitle}>
                                  <Mail style={{marginRight:'8px'}} />
                                  {order.shippingAddress.email }

                                </Typography>
                                 ):null
                              }
                              

                              
                              </>
                              )
                            }
                           
                            
                        </div>

                        <div className={classN.orderMainSectionBody}>
                            <div className={classN.orderMainSectionBodyItem}>
                                <div className={classN.orderMainSectionBodyItemTitle}>
                                    Payment method
                                </div>
                                <div className={classN.orderMainSectionBodyItemBody}>
                                <Typography className={classN.orderMainSectionBodyItemBodyNrml}>
                                    {order.paymentMethod}
                                </Typography>

                                <Typography className={classN.orderMainSectionBodyItemBodyDesc}>
                                    <strong> Amount : </strong> {order.totalPrice} DA
                                </Typography>
                                </div>
                            </div>

                            <div className={classN.orderMainSectionBodyItem}>
                               
                               <div className={classN.orderMainSectionBodyItemBody}>
                               

                               <Typography className={classN.orderMainSectionBodyItemBodyDesc}>
                                   <strong> Shipping status : </strong> {order.isDelivered? 
                                   
                                   <span style={{backgroundColor:'green', color :'#fff'}} className={classN.orderMainSectionBodyItemBodyStatus}>delivred</span>
                                   :order.isShipped? 
                                   
                                   <span style={{backgroundColor:'orange', color :'#fff'}} className={classN.orderMainSectionBodyItemBodyStatus}>shipped</span>

                                   : order.isPacked? 
                                  
                                   <span style={{backgroundColor:'orange', color :'#fff'}} className={classN.orderMainSectionBodyItemBodyStatus}>paked</span>

                                   :<span style={{backgroundColor:'orange', color :'#fff'}} className={classN.orderMainSectionBodyItemBodyStatus}>orded</span>
                                  }
                                  
                               </Typography>

                               <Typography className={classN.orderMainSectionBodyItemBodyDesc}>
                                   <strong> Payment status : </strong> 
                                   {order.isPaid ? 
                                   <span style={{backgroundColor:'green', color :'#fff'}} className={classN.orderMainSectionBodyItemBodyStatus}>Paid</span>
                                   :<span style={{backgroundColor:'orange', color :'#fff'}} className={classN.orderMainSectionBodyItemBodyStatus}>Pending</span>

                                   
                                   }
                                  
                               </Typography>
                               </div>
                           </div>

                          
                          
                           
                        </div>

                        <div className={classN.orderMainSectionBody}>
                            <div className={classN.orderMainSectionBodyItemFull}>
                                <div className={classN.orderMainSectionBodyItemTitle}>
                                    Billing address

                                </div>
                                <div className={classN.orderMainSectionBodyItemBodyFull}>
                                

                                <Typography className={classN.orderMainSectionBodyItemBodyDescFull}>
                                    <strong> Full name : </strong> {order.shippingAddress.fullName}
                                </Typography>

                                <Typography className={classN.orderMainSectionBodyItemBodyDescFull}>
                                    <strong> Address  : </strong> {order.shippingAddress.address ? order.shippingAddress.address :'Undefined' }
                                </Typography>

                                <Typography className={classN.orderMainSectionBodyItemBodyDescFull}>
                                    <strong> apt. Number  : </strong> {order.shippingAddress.aptNumber ? order.shippingAddress.aptNumber :'' }
                                </Typography>

                                <Typography className={classN.orderMainSectionBodyItemBodyDescFull}>
                                    <strong> City : </strong>  {order.shippingAddress.city ? order.shippingAddress.city :'' }
                                </Typography>
                                
                                <Typography className={classN.orderMainSectionBodyItemBodyDescFull}>
                                    <strong> State  : </strong>  {order.shippingAddress.state ? order.shippingAddress.state :'' }
                                </Typography>


                                <Typography className={classN.orderMainSectionBodyItemBodyDescFull}>
                                    <strong> Country  : </strong>  {order.shippingAddress.country ? order.shippingAddress.country :'' }
                                </Typography>

                                <Typography className={classN.orderMainSectionBodyItemBodyDescFull}>
                                    <strong> Zip code  : </strong>   {order.shippingAddress.postalCode ? order.shippingAddress.postalCode :'' }
                                </Typography>

                                <Typography className={classN.orderMainSectionBodyItemBodyDescFull}>
                                    <strong> Phone  : </strong> {order.shippingAddress.phone ? order.shippingAddress.phone :'' }
                                </Typography>
                                </div>
                            </div>
     
                        </div>


                        
                    
                      
                    </div>

                    
                    <div className = {classN.orderFooter}>
                    <Box className = {classN.orderStepper}>
                      <Stepper activeStep={
                        order.isDelivered ? 4 : 
                        order.isShipped ? 3 :
                        order.isPacked? 2 : 1
                      } alternativeLabel className={classN.orderStepperS} >
                        { ['orderd','packed','shipped', 'delivered'].map((label) => (
                          <Step key={label}>
                            <StepLabel>
                              {label}
                              {label ==='delivered' && order.isDelivered && order.deliveredAt && (
                              <>
                              <div style={{opacity :".75", fontSize:'13px', margin :'4px 0'}}>
                                {moment(order.deliveredAt).utc().format('DD/MM/YY ')}
                              </div>
                              <div style={{opacity :".75", fontSize:'11px'}}>
                                {moment(order.deliveredAt).utc().format('hh:mm:ss')}
                              </div> 
                              </>
                              )
                             }

                              {label ==='shipped' && order.isShipped && order.shippedAt &&  (
                              <>
                              <div style={{opacity :".75", fontSize:'13px', margin :'4px 0'}}>
                                {moment(order.shippedAt).utc().format('DD/MM/YY ')}
                              </div>
                              <div style={{opacity :".75", fontSize:'11px'}}>
                                {moment(order.shippedAt).utc().format('hh:mm:ss')}
                              </div> 
                              </>
                              )
                             }

                              {label ==='packed' && order.isPacked && order.packedAt &&  (
                              <>
                              <div style={{opacity :".75", fontSize:'13px', margin :'4px 0'}}>
                                {moment(order.packedAt).utc().format('DD/MM/YY ')}
                              </div>
                              <div style={{opacity :".75", fontSize:'11px'}}>
                                {moment(order.packedAt).utc().format('hh:mm:ss')}
                              </div> 
                              </>
                              )
                             }

                              {label ==='orderd' && order.createdAt &&  (
                              <>
                              <div style={{opacity :".75", fontSize:'13px', margin :'4px 0'}}>
                                {moment(order.createdAt).utc().format('DD/MM/YY ')}
                              </div>
                              <div style={{opacity :".75", fontSize:'11px'}}>
                                {moment(order.createdAt).utc().format('hh:mm:ss')}
                              </div> 
                              </>
                              )
                             }
                            </StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>

                  

                    <Box  className = {classN.orderAction}>
                    <FormControl className = {classN.orderActionSelect}>
                                <InputLabel
                                  id="label"
                                  style={{ margin: "-6px 0 0 14px" }}
                                >
                                  Shipping Status 
                                </InputLabel>
                                <Select
                                  labelId="label"
                                  label="Shipping Status"
                                  value={shippingStatus}
                                  onChange={(e) => setShippingStatus(e.target.value)}
                                  input={<OutlinedInput label="Shipping Status" />}
                                >
                                  

                                  { ['orderd','packed','shipped', 'delivered'].map((status) => (
                                    <MenuItem
                                      key={status}
                                      value={status}
                                    >
                                      {status}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>

                              
                                <Button
                                  variant="contained"
                                  color="primary"
                                  startIcon={<Save />}
                                  style={{maxHeight :'40px', marginLeft : '20px', padding:'5px 10px'}}
                                  onClick={e=> saveShanges(shippingStatus)}
                                >
                                  Save 
                                </Button>

                              

                    </Box>
                    </div>
                    
                  </Box>

                  <Box className={classN.orderBox}>
                    <div className={classN.orderHeader}>
                      <Typography>
                          Products
                      </Typography>

                    </div>

                    <div className={classN.orderMainSection}>
                      
                    <div className={classN.orderMainSectionTable}>
                        <div className={classN.orderMainSectionTableRow}>
                            <div className={classN.orderMainSectionTableHeaderDescription}>
                                <Typography className={classN.orderMainSectionTableHeaderTitle}>
                                    Description
                                </Typography>
                            </div>

                            <div className={classN.orderMainSectionTableHeaderCountity}>
                                <Typography className={classN.orderMainSectionTableHeaderTitle}>
                                    Quantity
                                </Typography>
                            </div>

                            <div className={classN.orderMainSectionTableHeaderAmount}>
                                <Typography className={classN.orderMainSectionTableHeaderTitle}>
                                    Amount
                                </Typography>
                            </div>

                            <div className={classN.orderMainSectionTableHeaderTotal}>
                                <Typography className={classN.orderMainSectionTableHeaderTitle}>
                                    Total
                                </Typography>
                            </div>
                            

                        </div> 

                        {order.orderItems.map(item=> (
                           <div className={classN.orderMainSectionTableRow} key={item._id}>
                           <div className={classN.orderMainSectionTableHeaderDescription}>
                                  <div className={classN.orderMainSectionTableHeaderDescImgBox}>
                                    <img className={classN.orderMainSectionTableHeaderDescImg} src={item.image} alt></img>
                                  </div>
                               <Typography className={classN.orderMainSectionTableHeaderDesc}>
                                   <strong>
                                       {item.name}
                                   </strong>
                               </Typography>
                           </div>

                           <div className={classN.orderMainSectionTableHeaderCountity}>
                               <Typography className={classN.orderMainSectionTableHeaderDesc}>
                                   {item.quantity}
                               </Typography>
                           </div>

                           <div className={classN.orderMainSectionTableHeaderAmount}>
                               <Typography className={classN.orderMainSectionTableHeaderDesc}>
                               {item.price}DA
                               </Typography>
                           </div>

                           <div className={classN.orderMainSectionTableHeaderTotal}>
                               <Typography className={classN.orderMainSectionTableHeaderDesc}>
                               {item.price * item.quantity} DA
                               </Typography>
                           </div>
                           
                       </div>
                        ))}

                       
                        
                        
                    </div>

                    
                    </div>

                    <div className={classN.orderFooter}>
                      <div className={classN.orderTotal}>
                          <div className={classN.orderTotalBox}>
                                <Typography className={classN.orderTotalTypo}>
                                    <div className={classN.orderTotalTypoTitle}>Sub Total </div> {order.itemsPrice}DA
                                </Typography>
                                <Typography className={classN.orderTotalTypo}>
                                    <div className={classN.orderTotalTypoTitle}>Taxes </div> {order.taxPrice}DA
                                </Typography>
                                <Typography className={classN.orderTotalTypo}>
                                    <div className={classN.orderTotalTypoTitle}>Discount  </div> 00
                                </Typography>

                                <Typography className={classN.orderTotalTotal}>
                                    <div className={classN.orderTotalTypoTitle}>Total   </div> {order.totalPrice}DA
                                </Typography>
                          </div>
                               

                      </div>
                    </div>
                  </Box>
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
// for rende OrderHistory only in front end
export default dynamic(() => Promise.resolve(OrderEdit), { ssr: false });
