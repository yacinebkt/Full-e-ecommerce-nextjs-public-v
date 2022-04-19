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
} from "@material-ui/core";
import Layout from "../../components/Layout/Layout";
import { Store } from "../../utils/store/Store";
import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import useStyles from "../../utils/styles/styles";
import CheckOut from "../../components/Layout/CheckOut";
import { useSnackbar } from "notistack";
import { getError /*onError*/ } from "../../utils/error/error";
import Cookies from "js-cookie";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

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
    <Layout titleHeader={`Order N: ${orderId}`}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div className={classN.containerPers}>
          {/* <CheckOut activeStep={3} /> */}

          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography className={classN.error}> {error} </Typography>
          ) : (
            <Grid container spacing={1}>
              <Grid item md={9} xs={12}>
                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, .096)",
                    marginBottom: "15px",
                  }}
                >
                  <List>
                    <ListItem>
                      <Typography>Order Id {orderId} </Typography>
                    </ListItem>
                  </List>
                </div>

                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, .096)",
                    marginBottom: "15px",
                  }}
                >
                  <List
                    style={{
                      borderBottom: "1px solid rgba(0, 0, 0, .096)",
                    }}
                  >
                    <ListItem>
                      <Typography>Shipping addresses</Typography>
                    </ListItem>
                  </List>

                  <List>
                    <ListItem>
                      <div>
                        <div>
                          <Typography>
                            <strong> {shippingAddress.fullName} </strong>
                            {shippingAddress.phone}
                          </Typography>
                        </div>
                        <div>
                          <Typography>
                            {shippingAddress.streetAddress}{" "}
                            {shippingAddress.city}, {shippingAddress.aptNumber}.{" "}
                            {shippingAddress.state}
                          </Typography>
                        </div>
                        <div>
                          <Typography className={classN.shippingAddressDetails}>
                            {shippingAddress.country}{" "}
                            {shippingAddress.postalCode}
                          </Typography>
                        </div>
                      </div>
                    </ListItem>
                  </List>
                </div>

                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, .096)",
                    marginBottom: "15px",
                  }}
                >
                  <List
                    style={{
                      borderBottom: "1px solid rgba(0, 0, 0, .096)",
                    }}
                  >
                    <ListItem>
                      <Typography>Payment Method</Typography>
                    </ListItem>
                  </List>

                  <List>
                    <ListItem>{paymentMethod}</ListItem>
                  </List>
                </div>

                <div>
                  <List
                    style={{
                      border: "1px solid rgba(0, 0, 0, .096)",
                      borderBottom: "0px solid rgba(0, 0, 0, .096)",

                      //   marginBottom: "15px",
                    }}
                  >
                    <ListItem>
                      <Typography>
                        Order Items (
                        {orderItems.reduce((a, c) => a + c.quantity, 0)})
                      </Typography>
                    </ListItem>
                  </List>
                </div>

                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, .096)",
                    borderBottom: "0px solid rgba(0, 0, 0, .096)",
                  }}
                >
                  <List>
                    {orderItems.map((item) => (
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
                          <NextLink href={`/product/${item.slug}`} passHref>
                            <Link>
                              <Typography className={classN.smt}>
                                {item.name.slice(0, 205)}
                              </Typography>
                            </Link>
                          </NextLink>
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
                  </List>
                </div>
              </Grid>

              <Grid item md={3} xs={12}>
                <div style={{ border: "1px solid rgba(0, 0, 0, .096)" }}>
                  <List
                    style={{ borderBottom: "1px solid rgba(0, 0, 0, .096)" }}
                  >
                    <ListItem>
                      <Typography> Order Summary </Typography>
                    </ListItem>
                  </List>

                  <List>
                    <ListItem className={classN.flexSb}>
                      <Typography>Total Items</Typography>

                      <Typography>
                        (
                        {orderItems &&
                          orderItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                        items)
                      </Typography>
                    </ListItem>

                    <ListItem className={classN.flexSb}>
                      <Typography>Price</Typography>

                      <Typography>
                        {orderItems &&
                          orderItems.reduce(
                            (a, c) => a + c.quantity * c.price,
                            0
                          )}{" "}
                        DA
                      </Typography>
                    </ListItem>

                    <ListItem className={classN.flexSb}>
                      <Typography>Tax</Typography>
                      <Typography>{taxPrice} DA</Typography>
                    </ListItem>

                    <ListItem className={classN.flexSb}>
                      <Typography>Delivery Charges</Typography>

                      <Typography>FREE</Typography>
                    </ListItem>

                    <ListItem className={classN.flexSb}>
                      <Typography>
                        <strong>Total </strong>
                      </Typography>

                      <Typography>
                        <strong>{totalPrice} DA</strong>
                      </Typography>
                    </ListItem>

                    {!isPaid && (
                      <ListItem>
                        {isPending ? (
                          <CircularProgress />
                        ) : (
                          <div className={classN.fullWidth}>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        )}
                      </ListItem>
                    )}

                    {/* {
                            !isPaid && (
                                <ListItem>
                                    {isPending ? (<CircularProgress />) :
                                        (
                                            <div className={classN.fullWidth}>
                                               <Button fullWidth variant='contained' color='primary'
                                                 onClick={testPay} >
                                                   Test pay
                                               </Button>
                                            </div>
                                        )
                                    }
                                </ListItem>
                            )
                        } */}

                    {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                      <ListItem>
                        {loadingDeliver && <CircularProgress />}

                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={deliveredOrderfun}
                        >
                          Deliver Order
                        </Button>
                      </ListItem>
                    )}
                  </List>
                </div>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
