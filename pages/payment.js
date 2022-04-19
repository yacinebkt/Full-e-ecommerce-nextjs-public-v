import React, { useContext, useEffect, useState } from "react";

import Cookies from "js-cookie";
import { Store } from "../utils/store/Store";
import { useRouter } from "next/router";
import Layout from "../components/Layout/Layout";
import CheckOut from "../components/Layout/CheckOut";
import useStyles from "../utils/styles/styles";
import {
  Button,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
  Grid,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

export default function Payment() {
  const classN = useStyles();
  const [paymentMethod, setPaymentMetod] = useState("");

  // const {handleSubmit, control, formState: {errors} } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress, cartItems },
  } = state;
  const router = useRouter();

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    } else {
      setPaymentMetod(Cookies.get("paymentMethod") || "");
    }
  }, []);

  const handleSubmit = (e) => {
    closeSnackbar();
    e.preventDefault();

    if (!paymentMethod) {
      enqueueSnackbar("Payment Method is required", { variant: "error" });
    } else {
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
      Cookies.set("paymentMethod", paymentMethod);
      router.push("/placeorder");
    }
  };
  return (
    <Layout titleHeader="Payment Methd">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div className={classN.containerPers}>
          <CheckOut activeStep={2} />

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
                    <Typography>Payment Methode</Typography>
                  </ListItem>
                </List>
                <List
                  style={{
                    border: "1px solid rgba(0, 0, 0, .096)",
                  }}
                >
                  {/* <form className={classN.form} onSubmit={loginFun}> */}
                  <form className={classN.formShipping} onSubmit={handleSubmit}>
                    <ListItem>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="Payment Method"
                          name="paymentMethod"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMetod(e.target.value)}
                        >
                          <FormControlLabel
                            label="Cash"
                            value="Cash"
                            control={<Radio />}
                          ></FormControlLabel>

                          <FormControlLabel
                            label="PayPal"
                            value="PayPal"
                            control={<Radio />}
                          ></FormControlLabel>

                          <FormControlLabel
                            label="Stripe"
                            value="Stripe"
                            control={<Radio />}
                          ></FormControlLabel>
                        </RadioGroup>
                      </FormControl>
                    </ListItem>

                    {/* <ListItem>
                        <Button type='submit' variant='contained' color='primary' fullWidth >
                            Next
                        </Button>
                    </ListItem>

                    <ListItem>
                        <Button type='button' variant='contained' onClick={()=> router.push('/shipping')} fullWidth >
                            Back
                        </Button>
                    </ListItem> */}

                    <ListItem>
                      <div className={classN.modalActions}>
                        <Button
                          className={classN.lastEditBtn}
                          variant="contained"
                          color="error"
                          onClick={() => router.push("/shipping")}
                        >
                          Back
                        </Button>

                        <Button
                          className={classN.firstEditBtn}
                          variant="contained"
                          color="primary"
                          type="submit"
                          style={{ marginLeft: "8px" }}

                          // startIcon={<AddBox />}
                          // onClick={handleSubmit(loginFun)}
                        >
                          Continue
                        </Button>
                      </div>

                      <div className={classN.modalActionsSm}>
                        <Button
                          className={classN.lastEditBtn}
                          variant="contained"
                          color="error"
                          onClick={() => router.push("/shipping")}
                        >
                          Back
                        </Button>

                        <Button
                          className={classN.firstEditBtn}
                          variant="contained"
                          color="primary"
                          type="submit"
                          style={{ marginLeft: "8px" }}

                          // startIcon={<AddBox />}
                          // onClick={handleSubmit(loginFun)}
                        >
                          Continue
                        </Button>
                      </div>
                    </ListItem>
                  </form>
                </List>
              </div>
            </Grid>
            <Grid item md={3} xs={12}>
              <div style={{ border: "1px solid rgba(0, 0, 0, .096)" }}>
                <List style={{ borderBottom: "1px solid rgba(0, 0, 0, .096)" }}>
                  <ListItem>
                    <Typography>CARTE DETAILS</Typography>
                  </ListItem>
                </List>

                <List>
                  <ListItem className={classN.flexSb}>
                    <Typography>Total Items</Typography>

                    <Typography>
                      (
                      {cartItems &&
                        cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                      items)
                    </Typography>
                  </ListItem>

                  <ListItem className={classN.flexSb}>
                    <Typography>Price</Typography>

                    <Typography>
                      {cartItems &&
                        cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                      DA
                    </Typography>
                  </ListItem>

                  <ListItem className={classN.flexSb}>
                    <Typography>Delivery Charges</Typography>

                    <Typography>FREE</Typography>
                  </ListItem>

                  {/* <ListItem>
                    <Button
                    // onClick={nextFun}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Continue
                    </Button>
                  </ListItem> */}
                </List>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}
