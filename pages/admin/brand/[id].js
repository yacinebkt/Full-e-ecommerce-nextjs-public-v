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
} from "@material-ui/core";

import {
  MoreVert,
  DeleteForever,
  DeleteOutline,
  Edit,
  AddBox,
  Cancel,
  ExpandMore,
  Image,
} from "@material-ui/icons";

import Leftbar from "../../../components/Layout/Leftbar";
import Preloader from "../../../components/Layout/Preloader";

import useStyles from "../../../utils/styles/styles";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
//import Cookies from 'js-cookie';
import moment from "moment";

import { useForm, Controller } from "react-hook-form";
import countriesData from "../../../utils/data/registration/countries";


function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, /*brand: action.payload,*/ error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    //

    case "FETCH_All_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_All_SUCCESS":
      return {
        ...state,
        loading: false,
        /*brands: action.payload,*/ error: "",
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

function BrandEdit({ params }) {
  const brandId = params.id;

  const { state /*dispatch*/ } = useContext(Store);

  const [isFeatured, setIsFeatured] = useState(false);
  const [inMenu, setInMenu] = useState(false);

  const [parentId, setParentId] = useState("");
  const [foundedDate, setFoundedDate] = useState("");

  
  const [initialBrandImage, setInitialBrandImage] = useState("");
  const [brandImageObject, setBrandImageObject] = useState(null);

  
  const [initialFuteuredImage, setInitialFuteuredImage] = useState("");
  const [featuredImageObject, setFeaturedImageObject] = useState(null);


  const [brands, setBrands] = useState([]);

  const [countryName, setCountryName] = useState("");


  const [breadArray, setBreadArray] = useState([
    { name: "home", link: "/" },
    { name: "dashboard", link: "/admin/dashboard" },
    { name: "brands", link: "/admin/brands" },
    { name: "edit", link: "#" },
  ]);

  //    const [{ loading, loadingUpdate, loadingUpload, error, /*brands *//*brand*/ }, dispatch] = useReducer(reducer, {

  const [{ loading, loadingUpdate, loadingUpload, error }, dispatch] =
    useReducer(reducer, {
      loading: true,
      // brand: {},
      error: "",
    });

  const router = useRouter();

  const { userInfo } = state;

  const classN = useStyles();
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
      return router.push("/login");
    } else {
      async function fetchData() {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/admin/brands/${brandId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: "FETCH_SUCCESS" });
          setValue("name", data.name);
          setValue("nativeName", data.nativeName);
          setValue("tradeName", data.tradeName);
          // setValue("origin", data.origin);
          setCountryName(data.origin)
          setValue("Headquarters", data.Headquarters);
          setValue("ISIN", data.ISIN);
          // setValue('Founded', data.Founded)
          setValue("description", data.description);
          setValue("Website", data.Website);

          

          const formattedDate = moment(data.Founded).format("YYYY-MM-DD"); //04-05-2017

          setFoundedDate(formattedDate);

          // setValue("brandLogo", data.brandLogo);
          // setValue("featuredImage", data.featuredImage);

          setInitialBrandImage(data.brandLogo);
          setInitialFuteuredImage(data.featuredImage);
          // setValue('parentId', data.parentId)
          setParentId(data.parentId);

          setValue("createdBy", data.createdBy);

          setIsFeatured(data.isFeatured);
          setInMenu(data.inMenu);
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      }
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_All_REQUEST" });
        const { data } = await axios.get(`/api/admin/brands`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_All_SUCCESS" /* payload: data*/ });
        setBrands(data);
      } catch (err) {
        dispatch({ type: "FETCH_All_FAIL", payload: getError(err) });
      }
    };

    fetchData();

    //console.log('summary.salesData.length', summary.salesData)
  }, []);

  const updateBrand = async ({ name, nativeName, tradeName, Headquarters, ISIN, description, Website,}) => {
    //e.preventDefault();
    closeSnackbar();

    let brandImage = await uploadBrandImageFun()

    let featuredImage = await uploadFeaturedImageFun();
    
  
   

    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/admin/brands/${brandId}`,
        {
          name, /* featuredImage, isFeatured, inMenu*/
          nativeName, tradeName, Headquarters, ISIN, description, Website,

          brandPicture : initialBrandImage? initialBrandImage :brandImage,
          featuredImage : initialFuteuredImage ? initialFuteuredImage : featuredImage,
          parentId,
          foundedDate,
          origin : countryName,
          isFeatured,
          inMenu,

        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "UPDATE_SUCCESS" });
      enqueueSnackbar("Brand Updated successfully", { variant: "success" });
      router.push("/admin/brands");
    } catch (err) {
      //alert(err.response.data ? err.response.data.message : err.message);
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });

      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

 

  const uploadBrandImage = (e) => {
    if (e.target.files.length > 0) {
      setBrandImageObject(e.target.files[0]);
      removeBrandImage();
    }
  };
  const uploadFeaturedImage = (e) => {
    if (e.target.files.length > 0) {
      setFeaturedImageObject(e.target.files[0]);
      removeBrandFeatuered();
    }
  };

  
  const removeBrandImage = () => {
    setInitialBrandImage("");
  };

  const removeBrandFeatuered = () => {
    setInitialFuteuredImage("");
  };


  const uploadFeaturedImageFun = async () => {
    if (!featuredImageObject) {
      return "";
    } else {
      const bodyFomData = new FormData();
      bodyFomData.append("file", featuredImageObject);

      try {
        const { data } = await axios.post("/api/admin/upload", bodyFomData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${userInfo.token}`,
          },
        });

       
        return data.secure_url;
      } catch (err) {
        enqueueSnackbar(`Upload Featured Image Faild, try again or choose another image: ${getError(err)}`, {
          variant: "error",
        });
      }
    }
  };

  const uploadBrandImageFun = async () => {
    if (!brandImageObject) {
      return "";
    } else {
      const bodyFomData = new FormData();
      bodyFomData.append("file", brandImageObject);

      try {
        const { data } = await axios.post("/api/admin/upload", bodyFomData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        return data.secure_url;
      } catch (err) {
        enqueueSnackbar(`Upload brand Logo Faild, try again or choose another image : ${getError(err)}`, {
          variant: "error",
        });
      }
    }
  };

  return (
    <Layout title="Edit Brand" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="brands" adminDashboard />
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
                      Edit Brand N : {brandId}
                    </Typography>
                  </ListItem>

                  <form
                    className={classN.form}
                    onSubmit={handleSubmit(updateBrand)}
                  >
                    <List style={{ display: "flex", flexWrap: "wrap" }}>
                      {/* Name Controller */}
                      <ListItem className={classN.listItemMin}>
                        <Controller
                          name="name"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="name"
                              label="Name"
                              //   inputProps={{ type: 'name' }}
                              error={Boolean(errors.name)}
                              helperText={errors.name ? "Name is required" : ""}
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                      {/* nativeName Controller */}
                      <ListItem className={classN.listItemMin}>
                        <Controller
                          name="nativeName"
                          control={control}
                          defaultValue=""
                          rules={{
                            // required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="nativeName"
                              label="nativeName"
                              //   inputProps={{ type: 'name' }}
                              error={Boolean(errors.nativeName)}
                              helperText={
                                errors.nativeName
                                  ? "nativeName is required"
                                  : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                      {/* tradeName Controller */}
                      <ListItem className={classN.listItemMin}>
                        <Controller
                          name="tradeName"
                          control={control}
                          defaultValue=""
                          rules={{
                            // required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="tradeName"
                              label="tradeName"
                              //   inputProps={{ type: 'name' }}
                              error={Boolean(errors.tradeName)}
                              helperText={
                                errors.tradeName ? "tradeName is required" : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                       {/* ISIN Controller */}
                       <ListItem className={classN.listItemMin}>
                        <Controller
                          name="ISIN"
                          control={control}
                          defaultValue=""
                          rules={{
                            // required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="ISIN"
                              label="ISIN"
                              //   inputProps={{ type: 'name' }}
                              error={Boolean(errors.ISIN)}
                              helperText={errors.ISIN ? "ISIN is required" : ""}
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                      {/* origin Controller */}
                    
                    <ListItem className={classN.listItemMin}>
                      <FormControl className={classN.fullWidth}>
                        <InputLabel
                          id="label"
                          style={{ margin: "-7px 0 0 12px" }}
                        >
                          origin
                        </InputLabel>
                        <Select
                          labelId="label"
                          label="origin"
                          fullWidth
                          variant="outlined"
                          value={countryName}
                          style={{ overflowX: "hidden" }}
                          onChange={ (e) => setCountryName(e.target.value)}
                        >
                          <MenuItem value=""></MenuItem>

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

                      {/* Headquarters Controller */}
                      <ListItem className={classN.listItemMin}>
                        <Controller
                          name="Headquarters"
                          control={control}
                          defaultValue=""
                          rules={{
                            // required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="Headquarters"
                              label="Headquarters"
                              //   inputProps={{ type: 'name' }}
                              error={Boolean(errors.Headquarters)}
                              helperText={
                                errors.Headquarters
                                  ? "Headquarters is required"
                                  : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                      {/* Parent Controller */}  
                      
                      <ListItem className={classN.listItemMin}>
                      <FormControl className={classN.fullWidth}>
                        <InputLabel
                          id="parentId"
                          style={{ margin: "-7px 0 0 12px" }}
                        >
                          parent brand
                        </InputLabel>
                        <Select
                          labelId="label"
                          label="parent brand"
                          fullWidth
                          variant="outlined"
                          value={parentId}
                          style={{ overflowX: "hidden" }}
                          onChange={(e) => setParentId(e.target.value)}
                        >
                           <MenuItem key="NoParentId" value="">
                                  No ParentId{" "}
                                </MenuItem>

                                {brands && brands.map((brand) => (
                                  <MenuItem key={brand.name} value={brand.name}>
                                    {brand.name}{" "}
                                  </MenuItem>
                                ))}
                        </Select>
                      </FormControl>
                    </ListItem>
                      {/* Founded Controller */}
                      <ListItem className={classN.listItemMin}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="Founded"
                          label="Founded"
                          //   inputProps={{ type: 'name' }}
                          type="date"
                          value={foundedDate}
                          onChange={(e) => setFoundedDate(e.target.value)}
                          InputLabelProps={{ shrink: true, required: true }}
                        ></TextField>
                      </ListItem>

                      {/* description Controller */}
                      <ListItem className={classN.listItemFull}>
                        <Controller
                          name="description"
                          control={control}
                          defaultValue=""
                          rules={{
                            // required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              multiline
                              rows={3}
                              fullWidth
                              id="description"
                              label="description"
                              //   inputProps={{ type: 'name' }}
                              error={Boolean(errors.description)}
                              helperText={
                                errors.description
                                  ? "description is required"
                                  : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                      {/* Website Controller */}
                      <ListItem>
                        <Controller
                          name="Website"
                          control={control}
                          defaultValue=""
                          rules={{
                            // required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="Website"
                              label="Website"
                              //   inputProps={{ type: 'name' }}
                              error={Boolean(errors.Website)}
                              helperText={
                                errors.Founded ? "Website is required" : ""
                              }
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                      {/* brandLogo Controller */}
                  

                      <ListItem className={classN.listItemMin}>
                        <div>
                          <Button
                            variant="contained"
                            color="primary"
                            component="label"
                            startIcon={<Image />}
                            // className={classN.btnHeaderWithIcon}
                          >
                            Upload brand Logo
                            <input
                              type="file"
                              // multiple
                              onChange={(e) => uploadBrandImage(e)}
                              hidden
                            />
                          </Button>

                          {initialBrandImage ? (
                            <ListItem>
                              <div
                                className={classN.productImagesContanerModule}
                              >
                                <img
                                  src={initialBrandImage}
                                  alt="brand image"
                                  className={classN.productImagerModule}
                                />
                                <div
                                  className={classN.productImageCancel}
                                  onClick={(e) => removeBrandImage()}
                                >
                                  <Cancel
                                    className={classN.productImageCancelIcon}
                                  />
                                </div>
                              </div>
                            </ListItem>
                          ) : null}

                          {brandImageObject ? (
                            <ListItem>
                              <div
                                className={classN.productImagesContanerModule}
                                key={brandImageObject.name}
                              >
                                <img
                                  src={URL.createObjectURL(brandImageObject)}
                                  alt="featured product image"
                                  className={classN.productImagerModule}
                                />
                                <div
                                  className={classN.productImageCancel}
                                  onClick={(e) => setBrandImageObject(null)}
                                >
                                  <Cancel
                                    className={classN.productImageCancelIcon}
                                  />
                                </div>
                              </div>
                            </ListItem>
                          ) : null}
                        </div>
                      </ListItem>

                      {/* featuredImage Controller */}

                      <ListItem className={classN.listItemMin}>
                        <div>
                          <Button
                            variant="contained"
                            color="primary"
                            component="label"
                            startIcon={<Image />}
                            // className={classN.btnHeaderWithIcon}
                          >
                            Upload Featured image
                            <input
                              type="file"
                              // multiple
                              onChange={(e) => uploadFeaturedImage(e)}
                              hidden
                            />
                          </Button>

                          {initialFuteuredImage ? (
                            <ListItem>
                              <div
                                className={classN.productImagesContanerModule}
                              >
                                {/* <img src={ URL.createObjectURL(featuredImageObject)} alt="featured product image"  className={classN.productImagerModule} /> */}

                                <img
                                  src={initialFuteuredImage}
                                  alt=" Futeured category image"
                                  className={classN.productImagerModule}
                                />
                                <div
                                  className={classN.productImageCancel}
                                  onClick={(e) => removeCategoryFeatuered()}
                                >
                                  <Cancel
                                    className={classN.productImageCancelIcon}
                                  />
                                </div>
                              </div>
                            </ListItem>
                          ) : null}

                          {featuredImageObject ? (
                            <ListItem>
                              <div
                                className={classN.productImagesContanerModule}
                                key={featuredImageObject.name}
                              >
                                <img
                                  src={URL.createObjectURL(featuredImageObject)}
                                  alt="featured product image"
                                  className={classN.productImagerModule}
                                />
                                <div
                                  className={classN.productImageCancel}
                                  onClick={(e) => setFeaturedImageObject(null)}
                                >
                                  <Cancel
                                    className={classN.productImageCancelIcon}
                                  />
                                </div>
                              </div>
                            </ListItem>
                          ) : null}
                        </div>
                      </ListItem>


                  
                      <ListItem  className={classN.listItemFull}>
                        <FormControlLabel
                          label="Is Featured"
                          control={
                            <Checkbox
                              onClick={(e) => setIsFeatured(e.target.checked)}
                              checked={isFeatured}
                              name="isFeatured"
                            />
                          }
                        ></FormControlLabel>
                        </ListItem>
                      <ListItem  className={classN.listItemFull}>
                        <FormControlLabel
                          label="In Menu"
                          control={
                            <Checkbox
                              onClick={(e) => setInMenu(e.target.checked)}
                              checked={inMenu}
                              name="In Menu"
                            />
                          }
                        ></FormControlLabel>
                      </ListItem>

                      <ListItem  >
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          fullWidth
                        >
                          Update
                        </Button>
                        {loadingUpdate && <CircularProgress />}
                      </ListItem>
                    </List>
                  </form>
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
export default dynamic(() => Promise.resolve(BrandEdit), { ssr: false });
