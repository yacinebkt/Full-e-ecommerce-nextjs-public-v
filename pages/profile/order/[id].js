import React, { useContext, useEffect, useReducer, useState } from "react";
import dynamic from "next/dynamic";

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
  Backdrop,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Breadcrumbs,
} from "@material-ui/core";
import Layout from "../../../components/Layout/Layout";
import { Store } from "../../../utils/store/Store";
import NextLink from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import useStyles from "../../../utils/styles/styles";
import CheckOut from "../../../components/Layout/CheckOut";
import { useSnackbar } from "notistack";
import { getError /*onError*/ } from "../../../utils/error/error";
import Cookies from "js-cookie";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
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
  PhoneAndroid,
  Mail,
  AccountBox,
  Save,
} from "@material-ui/icons";

import moment from "moment";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };

    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    //

    case "PAY_REQUEST":
      return { ...state, loadingPay: true };

    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, succesPay: true };

    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, succesPay: false, errorPay: "" };

    //

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };

    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };

    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false, errorDeliver: action.payload };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        errorDeliver: "",
      };

    // case 'DELIVER_REQUEST':
    // return { ...state, loadingDeliver: true };
    // case 'DELIVER_SUCCESS':
    // return { ...state, loadingDeliver: false, successDeliver: true };
    // case 'DELIVER_FAIL':
    // return { ...state, loadingDeliver: false, errorDeliver: action.payload };
    // case 'DELIVER_RESET':
    // return {
    //     ...state,
    //     loadingDeliver: false,
    //     successDeliver: false,
    //     errorDeliver: '',
    // };
    default:
      state;
  }
}

function Order({ params }) {
  const { state /*dispatch*/ } = useContext(Store);
  const router = useRouter();
  const { userInfo /*cart: {cartItems, shippingAddress, paymentMethod}*/ } =
    state;
  const classN = useStyles();

  let [shippingStatus, setShippingStatus] = useState("orderd");

  //const [loading, setLoading] = useState(false)

  //end of page props
  const orderId = params.id;

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [
    { loading, error, order, succesPay, loadingDeliver, successDeliver },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });

  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  
 

  const [breadArray, setBreadArray] =useState([{name: 'home', link :'/' },
  {name: 'profile', link :'/profile' },
  {name: 'order history', link :'/order-history' },
  { name: "details", link: "#" },

])


  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }

    //fetch order details from backend
    const fetchOrder = async () => {
      try {
        //dispatch for reducer hook not store
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (
      !order._id ||
      succesPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (succesPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      loadPaypalScript();
    }
  }, [order, succesPay, successDeliver]);

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      }); //orderId created py paypal
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );

        dispatch({ type: "PAY_SUCCESS", payload: data });
        enqueueSnackbar("Order Is Paid", { variant: "success" });
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        enqueueSnackbar(getError(err), { variant: "error" });
      }
    });
  }

  function onError(err) {
    enqueueSnackbar(getError(err), { variant: "error" });
  }

  async function deliveredOrderfun() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      enqueueSnackbar("Order Is Delivered", { variant: "success" });
    } catch (err) {
      dispatch({ type: "DELIVER_FAIL", payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  }

  async function testPay() {
    try {
      dispatch({ type: "PAY_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/paytest`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "PAY_SUCCESS", payload: data });
      enqueueSnackbar("Order Is Paid", { variant: "success" });
    } catch (err) {
      dispatch({ type: "PAY_FAIL", payload: getError(err) });
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  }

  return (
    <Layout title="Order History" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="order history" userDashboard />
        </Grid>

        <Grid className={classN.adminMainGrid}>
          <div className={classN.section}>
            <List>
              <ListItem>
                <Breadcrumbs aria-label="breadcrumb">
                                  {breadArray.map(e=>(
                                  <Link
                                  key={e.name}
                                  underline="hover"
                                  color="inherit"
                                  style={{fontSize : '12px'}}
                                  href={e.link}
                                      >
                                          {e.name}
                                      </Link>
                              ))}    
                              </Breadcrumbs>
              </ListItem>
            </List>

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
              <Typography className={classN.error}>{error}</Typography>
            ) : (
              <List>
                <>
                  <ListItem>
                    <Typography // component="h1" variant="h1"
                      className={classN.titleHeader}
                    >
                      Order N : {orderId}
                    </Typography>
                  </ListItem>

                  <Box className={classN.orderBox}>
                    <div className={classN.orderHeader}>
                      <Typography>Order Details</Typography>

                      <Typography>
                        Placed on{" "}
                        {moment(order.createdAt).utc().format("DD-MM-YY hh:mm")}
                      </Typography>
                    </div>

                    <div className={classN.orderMainSection}>
                      <div className={classN.orderMainSectionHeader}>
                        {order.user ? (
                          <>
                            <Typography
                              className={classN.orderMainSectionHeaderTitle}
                            >
                              <AccountBox style={{ marginRight: "8px" }} />
                              {order.shippingAddress.fullName
                                ? order.shippingAddress.fullName
                                : "Undefined"}
                            </Typography>
                            <Typography
                              className={classN.orderMainSectionHeaderTitle}
                            >
                              <PhoneAndroid style={{ marginRight: "8px" }} />
                              {order.shippingAddress.phone
                                ? order.shippingAddress.phone
                                : order.user.phone
                                ? order.user.phone
                                : "Undefined"}
                            </Typography>
                            <Typography
                              className={classN.orderMainSectionHeaderTitle}
                            >
                              
                              {order.shippingAddress.email
                                ? order.shippingAddress.email
                                : order.user.email
                                ? <><Mail style={{ marginRight: "8px" }} /> {order.user.email} </>
                                : ""}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <Typography
                              className={classN.orderMainSectionHeaderTitle}
                            >
                              <AccountBox style={{ marginRight: "8px" }} />
                              {order.shippingAddress.fullName
                                ? order.shippingAddress.fullName
                                : "Undefined"}
                            </Typography>
                            {order.shippingAddress.phone ? (
                              <Typography
                                className={classN.orderMainSectionHeaderTitle}
                              >
                                <PhoneAndroid style={{ marginRight: "8px" }} />
                                {order.shippingAddress.phone}
                              </Typography>
                            ) : null}

                            {order.shippingAddress.email ? (
                              <Typography
                                className={classN.orderMainSectionHeaderTitle}
                              >
                                <Mail style={{ marginRight: "8px" }} />
                                {order.shippingAddress.email}
                              </Typography>
                            ) : null}
                          </>
                        )}
                      </div>

                      <div className={classN.orderMainSectionBody}>
                        <div className={classN.orderMainSectionBodyItem}>
                          <div className={classN.orderMainSectionBodyItemTitle}>
                            Payment method
                          </div>
                          <div className={classN.orderMainSectionBodyItemBody}>
                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyNrml
                              }
                            >
                              {order.paymentMethod}
                            </Typography>

                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyDesc
                              }
                            >
                              <strong> Amount : </strong> {order.totalPrice} DA
                            </Typography>
                          </div>
                        </div>

                        <div className={classN.orderMainSectionBodyItem}>
                          <div className={classN.orderMainSectionBodyItemBody}>
                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyDesc
                              }
                            >
                              <strong> Shipping status : </strong>{" "}
                              {order.isDelivered ? (
                                <span
                                  style={{
                                    backgroundColor: "green",
                                    color: "#fff",
                                  }}
                                  className={
                                    classN.orderMainSectionBodyItemBodyStatus
                                  }
                                >
                                  delivred
                                </span>
                              ) : order.isShipped ? (
                                <span
                                  style={{
                                    backgroundColor: "orange",
                                    color: "#fff",
                                  }}
                                  className={
                                    classN.orderMainSectionBodyItemBodyStatus
                                  }
                                >
                                  shipped
                                </span>
                              ) : order.isPacked ? (
                                <span
                                  style={{
                                    backgroundColor: "orange",
                                    color: "#fff",
                                  }}
                                  className={
                                    classN.orderMainSectionBodyItemBodyStatus
                                  }
                                >
                                  paked
                                </span>
                              ) : (
                                <span
                                  style={{
                                    backgroundColor: "orange",
                                    color: "#fff",
                                  }}
                                  className={
                                    classN.orderMainSectionBodyItemBodyStatus
                                  }
                                >
                                  orded
                                </span>
                              )}
                            </Typography>

                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyDesc
                              }
                            >
                              <strong> Payment status : </strong>
                              {order.isPaid ? (
                                <span
                                  style={{
                                    backgroundColor: "green",
                                    color: "#fff",
                                  }}
                                  className={
                                    classN.orderMainSectionBodyItemBodyStatus
                                  }
                                >
                                  Paid
                                </span>
                              ) : (
                                <span
                                  style={{
                                    backgroundColor: "orange",
                                    color: "#fff",
                                  }}
                                  className={
                                    classN.orderMainSectionBodyItemBodyStatus
                                  }
                                >
                                  Pending
                                </span>
                              )}
                            </Typography>
                          </div>
                        </div>
                      </div>

                      <div className={classN.orderMainSectionBody}>
                        <div className={classN.orderMainSectionBodyItemFull}>
                          <div className={classN.orderMainSectionBodyItemTitle}>
                            Billing address
                          </div>
                          <div
                            className={classN.orderMainSectionBodyItemBodyFull}
                          >
                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyDescFull
                              }
                            >
                              <strong> Full name : </strong>{" "}
                              {order.shippingAddress.fullName}
                            </Typography>

                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyDescFull
                              }
                            >
                              <strong> Address : </strong>{" "}
                              {order.shippingAddress.address
                                ? order.shippingAddress.address
                                : "Undefined"}
                            </Typography>

                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyDescFull
                              }
                            >
                              <strong> apt. Number : </strong>{" "}
                              {order.shippingAddress.aptNumber
                                ? order.shippingAddress.aptNumber
                                : ""}
                            </Typography>

                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyDescFull
                              }
                            >
                              <strong> City : </strong>{" "}
                              {order.shippingAddress.city
                                ? order.shippingAddress.city
                                : ""}
                            </Typography>

                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyDescFull
                              }
                            >
                              <strong> State : </strong>{" "}
                              {order.shippingAddress.state
                                ? order.shippingAddress.state
                                : ""}
                            </Typography>

                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyDescFull
                              }
                            >
                              <strong> Country : </strong>{" "}
                              {order.shippingAddress.country
                                ? order.shippingAddress.country
                                : ""}
                            </Typography>

                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyDescFull
                              }
                            >
                              <strong> Zip code : </strong>{" "}
                              {order.shippingAddress.postalCode
                                ? order.shippingAddress.postalCode
                                : ""}
                            </Typography>

                            <Typography
                              className={
                                classN.orderMainSectionBodyItemBodyDescFull
                              }
                            >
                              <strong> Phone : </strong>{" "}
                              {order.shippingAddress.phone
                                ? order.shippingAddress.phone
                                : ""}
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={classN.orderFooter}>
                   
                      {!isPaid && (
                     
                          <div className = {classN.sbInLarge}>
                            <div
                              className={classN.orderMainSectionBodyItemTitle}
                            >
                              Payment Order
                            </div>
                          
                              {isPending ? (
                                <CircularProgress />
                              ) : (
                                <div className={classN.fullWidth} style={{maxWidth:'350px', width: '100%', minWidth : '80px !important'}}>
                                  <PayPalButtons
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError}
                                    style={{minWidth : '80px !important'}}
                                  ></PayPalButtons>
                                </div>
                              )}
                         
                          </div>
                      
                      )}

                    
                    </div>
                  </Box>

                  <Box className={classN.orderBox}>
                    <div className={classN.orderHeader}>
                      <Typography>Products</Typography>
                    </div>

                    <div className={classN.orderMainSection}>
                      <div className={classN.orderMainSectionTable}>
                      
                        {order.orderItems.map((item) => (
                    <div key={item._id} className={classN.cartRow}>
                      <div align="left">
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <img
                              src={item.image}
                              alt={item.name}
                              className={classN.imgCart}
                            />
                          </Link>
                        </NextLink>
                      </div>

                      <div align="left">
                       
                            <Typography className={classN.smt}>
                              {item.name.slice(0, 205) } 
                            </Typography>
                          
                         (x{item.quantity})

                        <div style={{ margin: "8px 0" }}>{item.price} DA</div>

                        {/* <div className={classN.priceincreaseContainer}>
                          <div className={classN.priceincrease}>
                            <div
                              className={classN.priceincreaseBtn}
                              onClick={(e) => {
                                item.quantity > 1 &&
                                  UpdateQn(item, item.quantity - 1);
                              }}
                            >
                              -
                            </div>
                            <div className={classN.iquantity}>
                              {item.quantity}
                            </div>
                            <div
                              className={classN.priceincreaseBtn}
                              onClick={(e) => UpdateQn(item, item.quantity + 1)}
                            >
                              +
                            </div>
                          </div>

                          <Button
                            color="secondary"
                            onClick={() => removeItemFromCart(item)}
                          >
                            Remove
                          </Button>
                        </div> */}
                      </div>
                    </div>
                  ))}

                       
                      </div>
                    </div>

                    <div className={classN.orderFooter}>
                      <div className={classN.orderTotal}>
                        <div className={classN.orderTotalBox}>
                          <Typography className={classN.orderTotalTypo}>
                            <div className={classN.orderTotalTypoTitle}>
                              Sub Total{" "}
                            </div>{" "}
                            {order.itemsPrice}DA
                          </Typography>
                          <Typography className={classN.orderTotalTypo}>
                            <div className={classN.orderTotalTypoTitle}>
                              Taxes{" "}
                            </div>{" "}
                            {order.taxPrice}DA
                          </Typography>
                          <Typography className={classN.orderTotalTypo}>
                            <div className={classN.orderTotalTypoTitle}>
                              Discount{" "}
                            </div>{" "}
                            00
                          </Typography>

                          <Typography className={classN.orderTotalTotal}>
                            <div className={classN.orderTotalTypoTitle}>
                              Total{" "}
                            </div>{" "}
                            {order.totalPrice}DA
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Box>
                </>
              </List>
            )}
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
