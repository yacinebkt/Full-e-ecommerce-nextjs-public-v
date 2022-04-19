import React, { useContext, useEffect, useState } from "react";
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
import Layout from "../components/Layout/Layout";
import { Store } from "../utils/store/Store";
import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import useStyles from "../utils/styles/styles";
import CheckOut from "../components/Layout/CheckOut";
import { useSnackbar } from "notistack";
import { getError } from "../utils/error/error";
import Cookies from "js-cookie";

//export default function CartScreen() {
function PlaceOrder() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    userInfo,
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;
  const classN = useStyles();

  const [loading, setLoading] = useState(false);

  const round2Number = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 252.146=> 252.15
  const itemsPrice = round2Number(
    cartItems.reduce((a, curent) => a + curent.price * curent.quantity, 0)
  );
  const shippingPrice = itemsPrice > 310 ? 0 : 20;
  const taxPrice = round2Number(itemsPrice * 0.05);
  const totalPrice = round2Number(itemsPrice + shippingPrice + taxPrice);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }

    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, []);

  const placeOrderFun = async () => {
    closeSnackbar();

    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      dispatch({ type: "CART_CLEAR" });
      Cookies.remove("cartItems");
      setLoading(false);
      router.push(`order/${data._id}`);
    } catch (err) {
      setLoading(false);
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  return (
    <Layout titleHeader="Place Order">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div className={classN.containerPers}>
          <CheckOut activeStep={3} />

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
                    <Typography> Place Order</Typography>
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
                          {shippingAddress.streetAddress} {shippingAddress.city}
                          , {shippingAddress.aptNumber}. {shippingAddress.state}
                        </Typography>
                      </div>
                      <div>
                        <Typography className={classN.shippingAddressDetails}>
                          {shippingAddress.country} {shippingAddress.postalCode}
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
                         Order Items ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                        )
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
                  {cartItems.map((item) => (
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
                              {item.name.slice(0, 205) } 
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
                <List style={{ borderBottom: "1px solid rgba(0, 0, 0, .096)" }}>
                  <ListItem>
                    <Typography> Order Summary </Typography>
                  </ListItem>
                </List>

                <List>
                  <ListItem className={classN.flexSb}>
                    <Typography>Total Items</Typography>

                    <Typography>
                      (
                      {cartItems &&
                        cartItems.reduce((a, c) => a + c.quantity, 0) }{" "}
                      items)
                    </Typography>
                  </ListItem>

                  <ListItem className={classN.flexSb}>
                    <Typography>Price</Typography>

                    <Typography>
                      {cartItems &&
                        cartItems.reduce((a, c) => a + c.quantity * c.price, 0) } DA
                    </Typography>
                  </ListItem>

                  <ListItem className={classN.flexSb}>
                    <Typography>Tax</Typography>
                    <Typography>
                      {taxPrice} DA
                    </Typography>
                  </ListItem>

                  <ListItem className={classN.flexSb}>
                    <Typography>
                      <strong>Total </strong>
                    </Typography>

                    <Typography>
                      <strong>{totalPrice} DA</strong>
                    </Typography>
                  </ListItem>

                  <ListItem className={classN.flexSb}>
                    <Typography>Delivery Charges</Typography>

                    <Typography>FREE</Typography>
                  </ListItem>

                  <ListItem>
                    <Button
                       onClick={placeOrderFun}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                       Place Order
                    </Button>
                  </ListItem>
                  {loading && (
                    <ListItem>
                      <CircularProgress />
                    </ListItem>
                  )}
                </List>
              </div>
            </Grid>
          </Grid>

          
        </div>
      </div>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(PlaceOrder), { ssr: false });
