import React, { useContext } from "react";
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
} from "@material-ui/core";
import Layout from "../components/Layout/Layout";
import { Store } from "../utils/store/Store";
import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import useStyles from "../utils/styles/styles";

//export default function CartScreen() {
function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const {
    cart: { cartItems },
  } = state;

  const classN = useStyles();

  const UpdateQn = async (item, qty) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock <= 0) {
      window.alert("Sorry. Product is Not avalibale");
      return;
    }

    dispatch({ type: "ADD_CART_ITEM", payload: { ...item, quantity: qty } });
  };

  const removeItemFromCart = (item) => {
    dispatch({ type: "REMOVE_ITEM_FROM_CART", payload: item });
  };

  const checkOutFun = () => {
    router.push("/shipping");
  };

  return (
    <Layout titleHeader="Shopping Cart">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div
          className={classN.containerPers}
          // style={{border :'1px solid rgba(0, 0, 0, .096)'}}
        >
          <Typography component="h1" variant="h1">
            Shopping Cart
          </Typography>
          {cartItems.length === 0 ? (
            <div>
              Cart is empty. Look like you have no items in your shopping cart.
              <br />
              <div className={classN.cartEmptyImg}>
                <img
                  src="/Img/em/cartEmpty.svg"
                  alt="Cart is Empty"
                  className={classN.cartEmptyImgImg}
                />
                <NextLink href="/" passHref>
                  <Link>Navigate To Home Page</Link>
                </NextLink>
              </div>
            </div>
          ) : (
            <Grid container spacing={1}>
              <Grid item md={9} xs={12}>
                <div>
                  <List
                    style={{
                      border: "1px solid rgba(0, 0, 0, .096)",
                      borderBottom: "0px solid rgba(0, 0, 0, .096)",
                    }}
                  >
                    <ListItem>
                      <Typography>
                        My Cart ({cartItems.reduce((a, c) => a + c.quantity, 0)}
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
                  {cartItems.map((item) => (
                    <div key={item._id} className={classN.cartRow}>
                      <div align="left">
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <img
                              src={item.productPictures[0]}
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

                        <div style={{ margin: "8px 0" }}>{item.price} DA</div>

                        <div className={classN.priceincreaseContainer}>

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
                      </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Grid>
              <Grid item md={3} xs={12}>
                <div style={{ border: "1px solid rgba(0, 0, 0, .096)" }}>
                  <List
                    style={{ borderBottom: "1px solid rgba(0, 0, 0, .096)" }}
                  >
                    <ListItem>
                      <Typography>CARTE DETAILS</Typography>
                    </ListItem>
                  </List>

                  <List>
                    <ListItem className={classN.flexSb}>
                      <Typography>Total Items</Typography>

                      <Typography>
                        ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                      </Typography>
                    </ListItem>

                    <ListItem className={classN.flexSb}>
                      <Typography>Price</Typography>

                      <Typography>
                        {cartItems.reduce(
                          (a, c) => a + c.quantity * c.price,
                          0
                        )}
                        DA
                      </Typography>
                    </ListItem>

                    <ListItem className={classN.flexSb}>
                      <Typography>Delivery Charges</Typography>

                      <Typography>FREE</Typography>
                    </ListItem>

                    <ListItem>
                      <Button
                        onClick={checkOutFun}
                        variant="contained"
                        color="primary"
                        fullWidth
                      >
                        Check Out
                      </Button>
                    </ListItem>
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

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
