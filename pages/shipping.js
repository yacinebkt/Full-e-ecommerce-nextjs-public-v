import {
  List,
  ListItem,
  TextField,
  Typography,
  Button,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Grid,
  FormControlLabel,
} from "@material-ui/core";
import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

import { AddBox, Cancel } from "@material-ui/icons";

import Layout from "../components/Layout/Layout";
import useStyles from "../utils/styles/styles";
import NextLink from "next/link";

import { useSnackbar } from "notistack";

import countriesData from "../utils/data/registration/countries";
import AlgerianCitiesData from "../utils/data/registration/cities";
// import axios from 'axios'
import { Store } from "../utils/store/Store";
import Cookies from "js-cookie";

import { useForm, Controller } from "react-hook-form";
// import { useSnackbar } from 'notistack'

import { useRouter } from "next/router";
import CheckOut from "../components/Layout/CheckOut";
import { getError } from "../utils/error/error";

export default function Shipping() {
  const router = useRouter();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [countryName, setCountryName] = useState("Algeria");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [addressSelect, setAddressSelect] = useState({});

  const [openAddressForm, setOpenAddressForm] = useState(false);

  const countryChange = (e) => {
    //  setCountryName(e.target.value)
    if (e.target.value !== countryName) {
      enqueueSnackbar(
        "Sorry, currently we provide our services in Algeria only",
        { variant: "warning" }
      );
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { redirect } = router.query; // if login redirect to shipping page
  const { state, dispatch } = useContext(Store);

  const {
    userInfo,
    cart: { shippingAddress, cartItems },
  } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push("/login?redirect=/shipping");
    }
    setValue("fullName", shippingAddress.fullName);
    setValue("address", shippingAddress.address);
    setValue("city", shippingAddress.city);
    setValue("postalCode", shippingAddress.postalCode);
    setValue("country", shippingAddress.country);
    //console.log('shippingAddress', Cookies.get('shippingAddress'))
  }, []);

  const classN = useStyles();
  // const [name, setName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    console.log("useEffect useEffect");

    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    console.log("useEffect start");

    try {
      const { data } = await axios.get(`/api/users/shippingaddresses`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      console.log("address", data);
      setShippingAddresses(data);
    } catch (err) {
      console.log("useEffect error", err);
    }
  };

  const nextFun = () => {
    // e.preventDefault();

    closeSnackbar();

    if (Object.keys(addressSelect).length === 0) {
      enqueueSnackbar("Please Select Shipping address", { variant: "error" });
    } else {
      console.log("addreess", addressSelect);
      dispatch({
        type: "SAVE_SHIPPING_ADDRESS",
        payload: {
          fullName: addressSelect.fullName,
          address: addressSelect.streetAddress,
          state: addressSelect.state,
          phone: addressSelect.phone,
          city: addressSelect.city,
          postalCode: addressSelect.postalCode,
          country: addressSelect.country,
          aptNumber: addressSelect.aptNumber,
        },
      });
      //   //Cookies.set('shippingAddress', {fullName, address, city, postalCode, country});

      Cookies.set(
        "shippingAddress",
        JSON.stringify({
          ullName: addressSelect.fullName,
          address: addressSelect.streetAddress,
          state: addressSelect.state,
          phone: addressSelect.phone,
          city: addressSelect.city,
          postalCode: addressSelect.postalCode,
          country: addressSelect.country,
          aptNumber: addressSelect.aptNumber,
        })
      );
      router.push("/payment");
    }
  };

  const restValues = () => {
    setValue("name", "");
    setValue("streetAddress", "");
    setValue("aptNumber", "");
    setValue("postalCode", "");
    setValue("phone", "");
    setStateName("");
    setCityName("");
    setOpenAddressForm(false);
  };

  const addNewAddress = async ({
    name,
    streetAddress,
    aptNumber,
    postalCode,
    phone,
  }) => {
    //e.preventDefault();

    closeSnackbar();

    // console.log( "name", name, "streetAddress", streetAddress, "aptNumber", aptNumber, "postalCode", postalCode, "phone", phone,"countryName", countryName,      "stateName",  stateName, "cityName", cityName);
    if (!stateName) {
      enqueueSnackbar("Please Select Your State Name", { variant: "error" });
      return;
    }
    if (!cityName) {
      enqueueSnackbar("Please Select Your city Name", { variant: "error" });
      return;
    }

    if (!countryName) {
      enqueueSnackbar("Please Select Your Country Name", { variant: "error" });
      return;
    }

    try {
      const data = await axios.post(
        `/api/users/shippingaddresses`,
        {
          name,
          streetAddress,
          aptNumber,
          postalCode,
          phone,
          stateName,
          cityName,
          countryName,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      restValues();
      enqueueSnackbar("address add Successfully", { variant: "success" });
      fetchAddress();
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: "error" });
    }
  };

  return (
    <Layout titleHeader="Shipping Address">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <div className={classN.containerPers}>
          <CheckOut activeStep={1} />

          <Grid container spacing={1}>
            <Grid item md={9} xs={12}>
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, .096)",
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
                  {shippingAddresses.map((item, index) => (
                    <ListItem key={index}>
                      <Checkbox
                        onClick={(e) => setAddressSelect(item)}
                        checked={addressSelect._id === item._id ? true : false}
                      />

                      <div >
                        <div>
                          <Typography >
                            <strong> {item.fullName} </strong>
                            {item.phone}
                          </Typography>

                          
                        </div>

                        <div >
                          <Typography>{item.streetAddress} {item.city}, {item.aptNumber}.  {item.state}</Typography>

                          
                        </div>

                        <div >
                          <Typography className={classN.shippingAddressDetails} >{item.country} {item.postalCode}</Typography>

                       
                        </div>
                      </div>
                    </ListItem>
                  ))}
                </List>
              </div>

              <div>
                <List
                  style={{
                    marginTop: "10px",
                    border: "1px solid rgba(0, 0, 0, .096)",
                  }}
                >
                  <ListItem>
                    <div>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={openAddressForm ? <></> : <AddBox />}
                        onClick={() => setOpenAddressForm(!openAddressForm)}
                        className={classN.btnHeaderWithIcon}
                      >
                        New Address
                      </Button>
                    </div>
                  </ListItem>

                  {/* <form className={classN.form} onSubmit={loginFun}> */}
                  <form
                    className={classN.form}
                    onSubmit={handleSubmit(addNewAddress)}
                  >
                    <List
                      style={{
                        margin: 0,
                        padding: 0,
                        display: openAddressForm ? "block" : "none",
                      }}
                    >
                      <ListItem>
                        <Controller
                          name="name"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            // minLength: 3,
                            pattern: /^[a-z A-Z]{3,70}$/,
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

                      <ListItem>
                        <Controller
                          name="streetAddress"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            minLength: 5,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="streetAddress"
                              label="street Address"
                              inputProps={{ type: "text" }}
                              placeholder="Unit 17 Al_Nacer, Apartment 101"
                              error={Boolean(errors.streetAddress)}
                              helperText={
                                errors.streetAddress
                                  ? errors.streetAddress.type === "minLength"
                                    ? "Street Address is not valid"
                                    : "Street Address is required"
                                  : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                      <ListItem>
                        <Controller
                          name="aptNumber"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                            pattern: /^[0-9]*$/,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="aptNumber"
                              label="Apt./suite No"
                              placeholder="101"
                              inputProps={{ type: "aptNumber" }}
                              error={Boolean(errors.aptNumber)}
                              helperText={
                                errors.aptNumber
                                  ? errors.aptNumber.type === "pattern"
                                    ? "Apartment/Suite number is not valid"
                                    : "Apartment/Suite number is required"
                                  : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                      <ListItem>
                        <FormControl className={classN.fullWidth}>
                          <InputLabel
                            id="label"
                            style={{ margin: "-7px 0 0 12px" }}
                          >
                            Country
                          </InputLabel>
                          <Select
                            labelId="label"
                            label="Country"
                            fullWidth
                            variant="outlined"
                            value={countryName}
                            style={{ overflowX: "hidden" }}
                            onChange={countryChange}
                          >
                            <MenuItem value="">All</MenuItem>

                            {countriesData &&
                              countriesData.map((country) => (
                                <MenuItem
                                  key={country.label}
                                  value={country.label}
                                >
                                  <img
                                    loading="lazy"
                                    width="20"
                                    style={{ margin: "0 12px 0 2px" }}
                                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                    srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                    alt={`Flag of ${country.label}`}
                                  />
                                  {country.label} ({country.code})+
                                  {country.phone}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </ListItem>

                      <ListItem>
                        <FormControl className={classN.fullWidth}>
                          <InputLabel
                            id="label"
                            style={{ margin: "-8px 0 0 12px" }}
                          >
                            State Name
                          </InputLabel>
                          <Select
                            labelId="label"
                            label="State Name"
                            fullWidth
                            variant="outlined"
                            value={stateName}
                            defaultValue={"Djelfa"}
                            // style={{ overflowX: "hidden" }}
                            onChange={(e) => setStateName(e.target.value)}
                          >
                            <MenuItem value="">All</MenuItem>

                            {AlgerianCitiesData &&
                              AlgerianCitiesData.reduce((unique, o) => {
                                if (
                                  !unique.some(
                                    (obj) =>
                                      obj.wilaya_name_ascii ===
                                      o.wilaya_name_ascii
                                  )
                                ) {
                                  unique.push(o);
                                }
                                return unique;
                              }, []).map((state) => (
                                <MenuItem
                                  key={state.wilaya_name_ascii}
                                  value={state.wilaya_name_ascii}
                                >
                                  {state.wilaya_name_ascii}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </ListItem>

                      <ListItem>
                        <FormControl className={classN.fullWidth}>
                          <InputLabel
                            id="label"
                            style={{ margin: "-8px 0 0 12px" }}
                          >
                            City Name
                          </InputLabel>
                          <Select
                            labelId="label"
                            label="City Name"
                            fullWidth
                            variant="outlined"
                            value={cityName}
                            style={{ overflowX: "hidden" }}
                            onChange={(e) => setCityName(e.target.value)}
                          >
                            {AlgerianCitiesData &&
                              AlgerianCitiesData.reduce((unique, o) => {
                                if (
                                  !unique.some(
                                    (obj) =>
                                      obj.commune_name_ascii ===
                                      o.commune_name_ascii
                                  )
                                ) {
                                  if (stateName) {
                                    if (o.wilaya_name_ascii === stateName) {
                                      unique.push(o);
                                    }
                                  } else {
                                    unique.push(o);
                                  }
                                }
                                return unique;
                              }, []).map((state) => (
                                <MenuItem
                                  key={state.commune_name_ascii}
                                  value={state.commune_name_ascii}
                                >
                                  {state.commune_name_ascii}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      </ListItem>

                      <ListItem>
                        <Controller
                          name="postalCode"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="postalCode"
                              label="Zip/postal Code"
                              placeholder="17000"
                              inputProps={{ type: "text" }}
                              error={Boolean(errors.postalCode)}
                              helperText={
                                errors.postalCode
                                  ? errors.postalCode.type === "pattern"
                                    ? "Zip/postal Code is not valid"
                                    : "Zip/postal Code is required"
                                  : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                      <ListItem>
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

                      <ListItem>
                        <div className={classN.modalActions}>
                          <Button
                            className={classN.lastEditBtn}
                            variant="contained"
                            color="error"
                            onClick={() => setOpenAddressForm(!openAddressForm)}
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
                            // onClick={handleSubmit(loginFun)}
                          >
                            Add Address
                          </Button>
                        </div>

                        <div className={classN.modalActionsSm}>
                          <Button
                            className={classN.lastEditBtn}
                            variant="contained"
                            color="error"
                            onClick={() => setOpenAddressForm(!openAddressForm)}
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
                            // onClick={handleSubmit(loginFun)}
                          >
                            Add Address
                          </Button>
                        </div>
                      </ListItem>
                    </List>
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

                  <ListItem>
                    <Button
                      onClick={nextFun}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Continue
                    </Button>
                  </ListItem>
                </List>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}
