import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useReducer, useState } from "react";
import Layout from "../../components/Layout/Layout";
import Leftbar from "../../components/Layout/Leftbar";
import Preloader from "../../components/Layout/Preloader";
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
  Button,
  Card,
  List,
  ListItem,
  CircularProgress,
  ListItemText,
  TextField,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  IconButton,
  OutlinedInput,
  Box,
  InputBase,
  Fade,
  Backdrop,
  Modal, Menu, Paper, Breadcrumbs, Link
} from "@material-ui/core";

import { MoreVert, DeleteForever,DeleteOutline, Edit , AddBox, Cancel } from "@material-ui/icons";

import useStyles from "../../utils/styles/styles";
import NextLink from "next/link";
import { useForm, Controller } from "react-hook-form";

import { useSnackbar } from "notistack";

import countriesData from "../../utils/data/registration/countries";
import AlgerianCitiesData from "../../utils/data/registration/cities";

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

function ShippingAddresses() {
  const { state } = useContext(Store);
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const [itemOpen, setItemOpen ] = useState(null);
  const [breadArray, setBreadArray] =useState([{name: 'home', link :'/' },
                                                {name: 'profile', link :'/profile' },
                                                {name: 'shipping addresses', link :'/shipping-addresses' },
                                              ])
  

  const handleClickMenu = (event, item) => {
    setAnchorEl(event.currentTarget);
    setItemOpen(item)
    // console.log('event.currentTarget', event.currentTarget)
  };


  const { userInfo } = state;

  const classN = useStyles();

  const [countryName, setCountryName] = useState("Algeria");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [shippingAddresses, setShippingAddresses] = useState([]);

  const [openShippingAddressModal, setOpenShippingAddressModal]=useState(false);
  const [openShippingAddressDetailsModal, setOpenShippingAddressDetailsModal] =useState(false);
  const [openShippingAddressDetailsItem, setOpenShippingAddressDetailsItem] =useState(null);

 

  

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpenShippingAddressModal(false);
    setOpenShippingAddressDetailsModal(false)
    setOpenShippingAddressDetailsItem(null)
    restValues()
  };

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    orders: [],
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/api/users/shippingaddresses`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      // console.log("address", data);
      setShippingAddresses(data);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: getError(err) });
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
    setItemOpen(null);
  };


  const openDetailsItem = async (item) => {
    setItemOpen(null);

    setOpenShippingAddressDetailsItem(item)
    setCityName(item.city)
    setStateName(item.state)
    setValue("name",item.fullName);
    setValue("streetAddress", item.streetAddress);
    setValue("aptNumber", item.aptNumber);
    setValue("postalCode", item.postalCode);
    setValue("phone", item.phone);
   

    
    setOpenShippingAddressDetailsModal(true)

  }

  




  const removeAddress = async (id) => {
    closeSnackbar();
    setItemOpen(null);

    try {
      const data = await axios.put(`/api/users/shippingaddresses`, {
        action : 'delet',
        _id: id
      },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      enqueueSnackbar("Address deleted Successfully", { variant: "success" });
      fetchAddress();
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: "error" });
    }
  }



  const updateAddress =  async ({
    name,
    streetAddress,
    aptNumber,
    postalCode,
    phone,
  }) => {

      console.log('_id ',openShippingAddressDetailsItem._id, "name", name, "streetAddress", streetAddress, "aptNumber", aptNumber, "postalCode", postalCode, "phone", phone,"countryName", countryName,      "stateName",  stateName, "cityName", cityName);

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
        const data = await axios.put(
          `/api/users/shippingaddresses`,
          {
            action : 'update',
            _id : openShippingAddressDetailsItem._id,
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
        handleClose();
        enqueueSnackbar("address updated Successfully", { variant: "success" });
        fetchAddress();
      } catch (error) {
        enqueueSnackbar(getError(error), { variant: "error" });
      }
  }


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
      handleClose();
      enqueueSnackbar("address add Successfully", { variant: "success" });
      fetchAddress();
    } catch (error) {
      enqueueSnackbar(getError(error), { variant: "error" });
    }
  };

  const countryChange = (e) => {
    //  setCountryName(e.target.value)
    if (e.target.value !== countryName) {
      enqueueSnackbar(
        "Sorry, currently we provide our services in Algeria only",
        { variant: "warning" }
      );
    }
  };
  return (
    <Layout title="Shipping Addresses" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="shipping addresses" userDashboard />
        </Grid>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openShippingAddressModal}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
          style={{}}
        >
          <Fade in={openShippingAddressModal}>
            <Box className={classN.modalBox}>
              <div className={classN.modalMaxHeight}>
                <form
                  className={classN.form}
                  onSubmit={handleSubmit(addNewAddress)}
                >
                  <Typography className={classN.SignUpHeder}>
                    Please enter your shipping address details.
                  </Typography>
                  <List style={{ margin: 0, padding: 0 }}>
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
                                {country.label} ({country.code})+{country.phone}
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
                          onClick={handleClose}
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
                          onClick={handleClose}
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
              </div>
            </Box>
          </Fade>
        </Modal>

        <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openShippingAddressDetailsModal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style={{}}
    >
      <Fade in={openShippingAddressDetailsModal}>
        <Box className={classN.modalBox}>
          {openShippingAddressDetailsItem && (
            <div className={classN.modalMaxHeight}>
                <form
                  className={classN.form}
                  onSubmit={handleSubmit(updateAddress)}
                >
                  <Typography className={classN.SignUpHeder}>
                    update shipping address filed.
                  </Typography>
                  <List style={{ margin: 0, padding: 0 }}>
                    <ListItem>
                   {openShippingAddressDetailsItem.fullName}
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="name"
                        control={control}

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
                        // defaultValue=""
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
                            // defaultValue={openShippingAddressDetailsItem.streetAddress}

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
                        // defaultValue=""
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
                            // defaultValue={openShippingAddressDetailsItem.aptNumber}

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
                                {country.label} ({country.code})+{country.phone}
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
                          // defaultValue={"Djelfa"}
                          // defaultValue={openShippingAddressDetailsItem.state}

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
                          // defaultValue={openShippingAddressDetailsItem.city}

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
                        // defaultValue=""
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
                          // defaultValue={openShippingAddressDetailsItem.postalCode}

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
                          // defaultValue={openShippingAddressDetailsItem.phone}

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
                          onClick={handleClose}
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
                          Update Address
                        </Button>
                      </div>

                      <div className={classN.modalActionsSm}>
                        <Button
                          className={classN.lastEditBtn}
                          variant="contained"
                          color="error"
                          onClick={handleClose}
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
                          Update Address
                        </Button>
                      </div>
                    </ListItem>
                  </List>
                </form>

            </div>
          )}
         
        </Box>
      </Fade>
      
      </Modal>

        <Grid className={classN.adminMainGrid}>
          <div className={classN.section}>
            <List>
               <ListItem >
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
            <List className={classN.headerTitleSb}>
              <div className={classN.titleHeaderIcon}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddBox />}
                  onClick={() => setOpenShippingAddressModal(true)}
                  className={classN.btnHeaderWithIcon}
                >
                  New Address
                </Button>

                <AddBox
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenShippingAddressModal(true)}
                  className={classN.btnIconHeader}
                />
              </div>
              {/* <Typography className={classN.titleHeader}>
                Addresses you have saved before
              </Typography> */}
            </List>

            {loading ? (
              <div className={classN.loadingContainer}>
                <Preloader />
                {/* <CircularProgress /> */}
              </div>
            ) : error ? (
              <Typography className={classN.error}>{error}</Typography>
            ) : shippingAddresses.length > 0 ? (
              <List>

                <ListItem>
                  <Typography // component="h1" variant="h1" 
                  className={classN.titleHeader}
                  >
                   Shipping Addresses 
                   {/* you have saved before */}
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        {/** */}
                        <TableRow>
                          <TableCell className={classN.tableCellHeader}>Name</TableCell>
                          <TableCell className={classN.tableCellHeader}>Street Address</TableCell>
                          <TableCell className={classN.tableCellHeader}>Apt. N</TableCell>
                          <TableCell className={classN.tableCellHeader}>Phone</TableCell>
                          <TableCell className={classN.tableCellHeader}>Country Name</TableCell>
                          {/* <TableCell>State Name</TableCell> */}
                          <TableCell className={classN.tableCellHeader}>City Name</TableCell>
                          <TableCell className={classN.tableCellHeader}>Postal Code</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {shippingAddresses.map((address, index) => (
                          <TableRow key={address._id} >
                            <TableCell title={address.fullName} className={classN.tableCell}>
                              {" "}
                              {address.fullName}
                            </TableCell>
                            <TableCell title={address.streetAddress} className={classN.tableCell}>
                              {address.streetAddress.substring(0, 32)}{" "}
                              {address.streetAddress.length > 32 ?(<span style={{fontSise : '8px'}}>..</span>)  : ""}
                            </TableCell>
                            <TableCell className={classN.tableCell}>{address.aptNumber}</TableCell>
                            <TableCell className={classN.tableCell}>{address.phone}</TableCell>
                            <TableCell className={classN.tableCell}>{address.country}</TableCell>
                            {/* <TableCell>{address.state}</TableCell> */}
                            <TableCell className={classN.tableCell}>{address.city}</TableCell>
                            <TableCell className={classN.tableCell}>{address.postalCode}</TableCell>

                            <TableCell className={classN.tableCell} >

                            <IconButton 
                             id="simple-menu"
                             aria-controls="simple-menu"
                             aria-haspopup="true"
                            //  aria-haspopup="true"
                            //  aria-expanded={itemOpen ? 'true' : undefined}
                             onClick={e=> handleClickMenu(e, index)}

                            >
                                <MoreVert />
                            </IconButton>

                                <Menu
                                 id="simple-menu"
                                 keepMounted
                                
                                open={itemOpen===index}
                                anchorEl={anchorEl}
                                // getContentAnchorEl={null}
                                MenuListProps={{
                                  'aria-labelledby': 'basic-button',
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

                                 style={{margin : 0, padding : 0}}
                               >
                                 <MenuItem className={`${classN.menuItem} ${classN.menuItemDelet}`}
                                 onClick={e=> removeAddress(address._id)}
                                 >
                                     <DeleteOutline className={classN.menuItemNormalBtn}/>
                                      <span>Delet</span>
                                  
                                 </MenuItem>
                                 <MenuItem className={`${classN.menuItem} `}
                                  onClick={e=> openDetailsItem(address)}
                                 > 
                                     <Edit className={classN.menuItemNormalBtn}/>
                                      <span>Edit</span>
                                  </MenuItem>
 
                               </Menu>
                              










                              {/* <MoreVert   onClick={()=>setIsOpen(address._id)}  
                               id={`demo-positioned-menu-${address._id}`}
                               aria-controls={`demo-positioned-button-${address._id}`}

                                 aria-haspopup="true" 
                                />
                              <Menu
                               id={`demo-positioned-button-${address._id}`}
                               aria-labelledby={`demo-positioned-menu-${address._id}`}
                                anchorEl={Boolean(menuIdOpen === address._id)}
                                keepMounted
                                open={Boolean(menuIdOpen === address._id)} 
                                onClose={(event, reason) => {
                                  if (reason !== "backdropClick") {
                                    CloseMenu;
                                    setMenuIdOpen('');
                                    handleClose(event, reason);
                                  } else {
                                    CloseMenu;
                                  }
                                  setMenuIdOpen(null);
                                }}
                                 getContentAnchorEl={null}
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                                }}
                              >
                                <MenuItem>{address._id} </MenuItem>
                                <MenuItem>{address.name} </MenuItem>
                                <MenuItem>{address.phone} </MenuItem>

                              </Menu> */}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* )} */}
                </ListItem>

                {/*  */}
              </List>
            ) : (
              <div className={classN.emptyPageImageContainer}>
                {/* <img
                  className={classN.emptyPageImage}
                  src="/Img/em/empty.png"
                  alt="FIHABOX logo"
                /> */}

                <Typography className={classN.titleHeader}>
                  Look like you haven&apos;t entered any addresses before.
                  <span
                    className={classN.primaryColor}
                    onClick={() => setOpenShippingAddressModal(true)}
                  >
                    {" "}
                    Add New Shipping Address ?
                  </span>
                </Typography>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}

// for rende OrderHistory only in front end
export default dynamic(() => Promise.resolve(ShippingAddresses), {
  ssr: false,
});
