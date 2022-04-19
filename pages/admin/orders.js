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
  Menu,
  IconButton,
  Box,
  Stepper,
  Step,
  StepLabel ,
  FormControl ,
  InputLabel,
 
  OutlinedInput,

} from "@material-ui/core";
import useStyles from "../../utils/styles/styles";
import NextLink from "next/link";
import Leftbar from "../../components/Layout/Leftbar";
import Preloader from "../../components/Layout/Preloader";
import { Pagination } from "@material-ui/lab";

import { useSnackbar } from "notistack";

import {
  MoreVert,
  DeleteForever,
  DeleteOutline,
  Edit,
  AddBox,
  Cancel,
  ExpandMore,
  Image,
  Save,
  OpenInBrowser,
} from "@material-ui/icons";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboard() {
  const { state } = useContext(Store);
  const router = useRouter();

  
  
  const [ordersDoc, setOrdersDoc] = useState({});
  const [page, setPage] = useState(1)

  const [anchorEl, setAnchorEl] = useState(null);
  const [itemOpen, setItemOpen] = useState(null);

  const [shippingStatus, setShippingStatus] = useState([]);

  


  const [breadArray, setBreadArray] = useState([
    { name: "home", link: "/" },
    { name: "admin dashboard", link: "/admin/dashboard" },
    { name: "orders", link: "/admin/orders" },
  ]);


  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userInfo } = state;

  const classN = useStyles();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });



  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
   
    fetchDataPage();
    //console.log('summary.salesData.length', summary.salesData)
  }, []);


  
  const fetchDataPage = async (pageN) => {
   
    console.log('orders Sttart')
    try {
      const { data } = await axios.post(`/api/admin/orders/orderswithpage`, {page : pageN? pageN : 1, }, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setOrdersDoc(data)

      let arr= []
      data.orders.map((item, index)=> {
        let status = 'orderd'
        if (item.isPacked)  status = 'packed' 
        if (item.isShipped)  status = 'shipped' 
        if (item.isDelivered)  status = 'delivered' 

     
        arr.push({index:index, id:item._id, status : status })
      })

      setShippingStatus(arr)
      dispatch({ type: "FETCH_SUCCESS", payload: data.orders });
      console.log('data.orders', data.orders)


    } catch (err) {
      // console.log('products wiwth page error', error)
      dispatch({ type: "FETCH_FAIL", payload: getError(err) });
    }
  };

  let shippingStatusChange = (value, index) => {
    console.log('value :', value, 'index : ',index )
    console.log('shippingStatus :', shippingStatus )


   
     let arr= shippingStatus
     arr[index].status=value
   
     setShippingStatus(prevState => [...prevState] )
    //  setShippingStatus(arr)

  }
  


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

  const saveShanges = async (id, status) => {
    console.log('save changes', 'id:',id, 'status : ',status)
    try {
      // dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/admin/orders/${id}`,
        {
          status
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      // dispatch({ type: "UPDATE_SUCCESS" });
      enqueueSnackbar("Updated shipping status successfully", { variant: "success" });
      fetchDataPage()
    } catch (err) {
      //alert(err.response.data ? err.response.data.message : err.message);
      // dispatch({ type: "UPDATE_FAIL", payload: getError(err) });

      enqueueSnackbar(getError(err), { variant: "error" });
    }
  }




  return (
    <Layout title="Orders-Dashboard" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="orders" adminDashboard />
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
          </List>


        
            <List>
             

             
                {loading ? (
                    <div className={classN.loadingContainer}>
                    <Preloader />
                  </div>
                ) : error ? (
                  <Typography className={classN.error}>{error}</Typography>
                ) : (
                  <List>
                  <ListItem>
                    <Typography // component="h1" variant="h1"
                      className={classN.titleHeader}
                    >
                      List of orders
                    </Typography>
                  </ListItem>
                 

                  {orders.map((order, index) => (
                    <Box className={classN.orderBox} key={index}>

                    <div className = {classN.orderHeader}>
                    <Typography style={{ wordBreak: 'break-all',}}>  <strong style={{marginRight : '8px'}}> ID |</strong>  {order._id}</Typography> 
                   
                   <div>
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
                             

                                <NextLink
                                  // href={`/order/${order._id}`}
                                   href={`/admin/order/${order._id}`}
                                 
                                  passHref
                                >
                                  <Link>
                                    <MenuItem className={`${classN.menuItem}`}>
                                      <OpenInBrowser
                                        className={classN.menuItemNormalBtn}
                                      />
                                      <span>Details</span>
                                    </MenuItem>
                                  </Link>
                                </NextLink>
                              </Menu>

                   </div>
                    </div>

                    <div className = {classN.orderMain}>
                        
                        <div className={classN.orderMainItems}>
                          <span className={classN.orderMainTitle}> Items </span>
                          {order.orderItems.map((o, i) => (
                          <Typography className={classN.orderMainItem} key={i}> <span>{i+1} -</span> <strong>({o.quantity})</strong> {o.name}</Typography>
                          ))}
                         </div> 

                        <div className={classN.orderMainItems}>
                          <span className={classN.orderMainTitle}> TOTAL Price </span>
                          <Typography className={classN.orderMainItem}> {order.totalPrice} </Typography>
                        </div> 

                        <div className={classN.orderMainItems}>
                          <span className={classN.orderMainTitle}> Payment Type </span>
                          <Typography className={classN.orderMainItem}> {order.paymentMethod} </Typography>
                        </div> 

                        <div className={classN.orderMainItems}>
                          <span className={classN.orderMainTitle}> Payment Status </span>
                          <Typography className={classN.orderMainItem}>{order.isPaid ? 'PAID' : 'PENDING'}  </Typography>
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
                            <StepLabel>{label}</StepLabel>
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
                                  value={shippingStatus.length> 0 && shippingStatus[index] ? shippingStatus[index].status:'orderd'}
                                  onChange={(e) => shippingStatusChange(e.target.value, index)}
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
                                  onClick={e=> saveShanges(order._id, shippingStatus[index].status )}
                                >
                                  Save 
                                </Button>

                              

                    </Box>
                    </div>
                    </Box>
                  ))}
                  
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
                        count={ordersDoc.pages}
                        onChange={pageChanger}
                      />
                    </div>
                    </ListItem>
                  </List>
                )}
              
            </List>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}

// for rende OrderHistory only in front end
export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
