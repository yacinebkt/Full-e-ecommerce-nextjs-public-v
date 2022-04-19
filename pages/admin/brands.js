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
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  FormControlLabel,
  Checkbox,
  Menu,
} from "@material-ui/core";
import useStyles from "../../utils/styles/styles";
import countriesData from "../../utils/data/registration/countries";

import NextLink from "next/link";
import { useSnackbar } from "notistack";
import Leftbar from "../../components/Layout/Leftbar";
import Preloader from "../../components/Layout/Preloader";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";
import { Pagination } from "@material-ui/lab";


import {
  MoreVert,
  DeleteForever,
  DeleteOutline,
  Edit,
  AddBox,
  Cancel,
  ExpandMore,
  Image,
  OpenInBrowser
} from "@material-ui/icons";


function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, brands: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

   
      
    //
    case "DELETE_BRAND_REQUEST":
      return { ...state, loadingDeleteBrand: true };
    case "DELETE_USER_SUCCESS":
      return { ...state, loadingDeleteBrand: false, brandSuccessDelete: true };
    case "DELETE_BRAND_FAIL":
      return { ...state, loadingDeleteBrand: false };

    case "DELETE_BRAND_RESET":
      return { ...state, loadingDeleteBrand: false, brandSuccessDelete: false };

    default:
      state;
  }
}

function AdminBrand() {
  const { state } = useContext(Store);
  const router = useRouter();

  const { userInfo } = state;

  const classN = useStyles();

  
  const [brandsDoc, setBrandsDoc] = useState({});
  const [page, setPage] = useState(1)



  const [anchorEl, setAnchorEl] = useState(null);
  const [itemOpen, setItemOpen] = useState(null);


  
  const [openAddModal, setOpenAddModal] = useState(false);
  const [loadingAddNew, setLoadingAddNew] = useState(false);



  
  const [isFeatured, setIsFeatured] = useState(false);
  const [inMenu, setInMenu] = useState(false);
  const [parentId, setParentId] = useState("");
  const [foundedDate, setFoundedDate] = useState("");
  const [initialBrandImage, setInitialBrandImage] = useState("");
  const [brandImageObject, setBrandImageObject] = useState(null);
  const [initialFuteuredImage, setInitialFuteuredImage] = useState("");
  const [featuredImageObject, setFeaturedImageObject] = useState(null);
  // const [brands, setBrands] = useState([]);
  const [countryName, setCountryName] = useState("");




  

  const [breadArray, setBreadArray] = useState([
    { name: "home", link: "/" },
    { name: "admin dashboard", link: "/admin/dashboard" },
    { name: "brands", link: "/admin/brands" },
  ]);




  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();


  const closeOpenAddModal= () => {
    setOpenAddModal(false);
  };
 
  


  const [
    {
      loading,
      /*loadingCreateBrand,*/ loadingDeleteBrand,
      brandSuccessDelete,
      error,
      brands,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    brands: [],
    error: "",
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const formattedDate = moment(Date.now()).format("YYYY-MM-DD"); //04-05-2017
    setFoundedDate(formattedDate);

   

    fetchDataPage();

    //console.log('summary.salesData.length', summary.salesData)
  }, [brandSuccessDelete, router, userInfo]);

  const fetchDataPage = async (pageN) => {
   
    try {
      const { data } = await axios.post(`/api/admin/brands/brandswithpage`, {page : pageN? pageN : 1, }, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setBrandsDoc(data)
      dispatch({ type: "FETCH_SUCCESS", payload: data.brands });

      // console.log('products wiwth page', data)
    } catch (err) {
      console.log('products wiwth page error', error)
      dispatch({ type: "FETCH_FAIL", payload: getError(err) });

    }
  };


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



  const addNewBrand = async ({ name, nativeName, tradeName, Headquarters, ISIN, description, Website}) => {
    closeSnackbar();
    let featuredImage = await uploadFeaturedImageFun();
    
    let brandLogo= await uploadBrandImageFun()

    try {
      
    setLoadingAddNew(true)
      // dispatch({ type: "CREATE_BRAND_REQUEST" });
      const {data} = await axios.post('/api/admin/brands',
        {
          name, /* featuredImage, isFeatured, inMenu*/
          nativeName : nativeName ? nativeName : '', 
          tradeName : tradeName ? tradeName : '', 
          Headquarters : Headquarters ? Headquarters : '', 
          ISIN : ISIN ? ISIN : '',
          description : description ? description : '',
          Website : Website ? Website : '',

          brandPicture : brandLogo? brandLogo :'',
          featuredImage : featuredImage ? featuredImage : '',
          parentId: parentId? parentId :'',
          foundedDate,
          origin : countryName ? countryName : '',
          isFeatured,
          inMenu,

        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      // dispatch({ type: 'CREATE_BRAND_SUCCESS' })
        setLoadingAddNew(false)
      enqueueSnackbar('Brand Created successfully', {variant : 'success'})
      router.push(`/admin/brand/${data.brand._id}`)
    } catch (err) {
      //alert(err.response.data ? err.response.data.message : err.message);
      // dispatch({ type: "CREATE_BRAND_FAIL", payload: getError(err) });
      setLoadingAddNew(false)

      enqueueSnackbar(getError(err), { variant: "error" });
    }
  
   
  }
  const deleteBrandFun = async (brandId) => {
    if (!window.confirm("Are you sure want te delet this item ?")) {
      return;
    }
    try {
    setLoadingAddNew(true)
      

      await axios.delete(
        `/api/admin/brands/${brandId}`,
        //{}, delete handler don't accept form body
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

     setLoadingAddNew(false)  
      enqueueSnackbar("Brand Deleted successfully", { variant: "success" });
      fetchDataPage()
      //router.push(`/admin/brand/${data.brand._id}`)
    } catch (err) {
      // dispatch({ type: "DELETE_BRAND_FAIL" });
      setLoadingAddNew(false)
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };




  const uploadBrandImage = (e) => {
    if (e.target.files.length > 0) {
      setBrandImageObject(e.target.files[0]);
    }
  };
  const uploadFeaturedImage = (e) => {
    if (e.target.files.length > 0) {
      setFeaturedImageObject(e.target.files[0]);
    }
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
    <Layout title="Brand-Dashboard" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="brands" adminDashboard />
        </Grid>
        {loadingAddNew ? 
                <div className={classN.loadFull}>
                {/* <Preloader /> */}
                <CircularProgress />
              </div>:
          null
        }


        <Grid className={classN.adminMainGrid}>

        {openAddModal ? (
            <div className={classN.sectionAddFloat}>                 
            <div //className={classN.modalMaxHeight}
            className={classN.section}
            > 
            {loadingAddNew ? 
              <div className={classN.loadFull}>
              {/* <Preloader /> */}
              <CircularProgress />
            </div>
            :null}

            <List >

            
              <div className={classN.titleHeaderIcon}>
                <IconButton 
                  variant="contained"
                  color="error"
                  // startIcon={}
                  onClick={closeOpenAddModal}
                  // className={classN.btnHeaderWithIcon}
                >
                  {/* Cancel */}
                  <Cancel />
                </IconButton >

               
              </div>
            </List>
              
              <form
                className={classN.form}
                onSubmit={handleSubmit(addNewBrand)}
              >
                
                <List style={{ display: "flex", flexWrap: "wrap" }}>

                <ListItem>
                  <Typography // component="h1" variant="h1"
                    className={classN.titleHeader}
                  >
                    Add New Brand
                    {/* you have saved before */}
                  </Typography>
                </ListItem>

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

                   
                   


              
                
               

                <ListItem>
                  <div className={classN.modalActions}>
                    <Button
                      className={classN.lastEditBtn}
                      variant="contained"
                      color="error"
                      onClick={closeOpenAddModal}
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
                      // onClick={handleSubmit(addNewCategory)}
                    >
                      Add Brand
                    </Button>
                  </div>

                  <div className={classN.modalActionsSm}>
                    <Button
                      className={classN.lastEditBtn}
                      variant="contained"
                      color="error"
                      onClick={closeOpenAddModal}
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
                      onClick={handleSubmit(addNewBrand)}
                    >
                      Add Brand
                    </Button>
                  </div>
                </ListItem>

                </List>
              </form>
            </div>


            </div>
          ) :
          null}


          <div className={classN.section} style={{display : openAddModal ? 'none' : 'block'}}>

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

          <List className={classN.headerTitleSb}>
              <div className={classN.titleHeaderIcon}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddBox />}
                  onClick={() => setOpenAddModal(true)}
                  // onClick={createBrandFun}

                  className={classN.btnHeaderWithIcon}
                >
                  New Brand
                </Button>

                <AddBox
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenAddModal(true)}
                  // onClick={createBrandFun}
                  className={classN.btnIconHeader}
                />
              </div>
            </List>

            <List>
                       

             
              {
                loading ? (
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
                    List of brands
                  </Typography>
                </ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        {/** */}
                        <TableRow>
                          <TableCell className={classN.tableCellHeader}>ID</TableCell>
                          <TableCell className={classN.tableCellHeader}>NAME</TableCell>
                          <TableCell className={classN.tableCellHeader}>ORIGIN</TableCell>
                          <TableCell className={classN.tableCellHeader}>NATIVE_NAME</TableCell>
                          <TableCell className={classN.tableCellHeader}>ISIN</TableCell>

                          {/* <TableCell>COUNT</TableCell>
                          <TableCell>RATING</TableCell> */}
                          <TableCell className={classN.tableCellHeader}>
                            {/*ACTION*/}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {brands.map((brand, index) => (
                          <TableRow key={brand._id}>
                            <TableCell className={classN.tableCell}>{brand._id.substring(20, 24)}</TableCell>
                            <TableCell className={classN.tableCell}>{brand.name}</TableCell>
                            <TableCell className={classN.tableCell}>{brand.origin}</TableCell>
                            <TableCell className={classN.tableCell}>
                              {brand.nativeName ? brand.nativeName : " "}
                            </TableCell>
                            <TableCell className={classN.tableCell}>
                              {brand.ISIN ? brand.ISIN : " "}
                            </TableCell>

                            {/* <TableCell>
                              {brand.countInStock}
                            </TableCell>
                            <TableCell>
                              {brand.rating}
                            </TableCell> */}
                            
                            <TableCell>


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
                                <MenuItem
                                  className={`${classN.menuItem} ${classN.menuItemDelet}`}
                                  onClick={() => deleteBrandFun(brand._id)}

                                >
                                  <DeleteOutline
                                    className={classN.menuItemNormalBtn}
                                  />
                                  <span>Delet</span>
                                </MenuItem>
                                <NextLink
                                  href={`/admin/brand/${brand._id}`}
                                  passHref
                                >
                                  <Link>
                                    <MenuItem className={`${classN.menuItem}`}>
                                      <Edit
                                        className={classN.menuItemNormalBtn}
                                      />
                                      <span>Edit</span>
                                    </MenuItem>
                                  </Link>
                                </NextLink>

                                {/* <NextLink
                                  href={`/product/${product.slug}`}
                                  passHref
                                >
                                  <Link>
                                    <MenuItem className={`${classN.menuItem}`}>
                                      <OpenInBrowser
                                        className={classN.menuItemNormalBtn}
                                      />
                                      <span>Open</span>
                                    </MenuItem>
                                  </Link>
                                </NextLink> */}
                              </Menu>




                             
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

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
                        count={brandsDoc.pages}
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

// for rende brandHistory only in front end
export default dynamic(() => Promise.resolve(AdminBrand), { ssr: false });
