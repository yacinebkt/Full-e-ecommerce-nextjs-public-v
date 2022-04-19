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
} from "@material-ui/icons";

import useStyles from "../../../utils/styles/styles";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
//import Cookies from 'js-cookie';

import { useForm, Controller } from "react-hook-form";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        /*category: action.payload,*/ error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    //

    case "FETCH_All_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_All_SUCCESS":
      return {
        ...state,
        loading: false,
        /*categories: action.payload,*/ error: "",
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

function CategoryEdit({ params }) {
  const categoryId = params.id;

  const { state /*dispatch*/ } = useContext(Store);

  const [isFeatured, setIsFeatured] = useState(false);
  const [inMenu, setInMenu] = useState(false);
  // const [parentId, setParentId] = useState('')
  const [initialParent, setInitialParent] = useState("");

  const [initialCategoryImage, setInitialCategoryImage] = useState("");
  const [categoryImageObject, setCategoryImageObject] = useState(null);

  const [initialFuteuredImage, setInitialFuteuredImage] = useState("");
  const [featuredImageObject, setFeaturedImageObject] = useState(null);

  const [categories, setCategories] = useState([]);

  const [breadArray, setBreadArray] = useState([
    { name: "home", link: "/" },
    { name: "dashboard", link: "/admin/dashboard" },
    { name: "categories", link: "/admin/categories" },
    { name: "edit", link: "#" },
  ]);

  const [
    { loading, loadingUpdate, loadingUpload, error /*categories ,category*/ },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    // category: {},
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
  } = useForm();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
  //     loading: true,
  //     orders: [],
  //     error: '',
  // });

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    } else {
      const fetchData = async () => {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(
            `/api/admin/categories/${categoryId}`,
            {
              headers: { authorization: `Bearer ${userInfo.token}` },
            }
          );
          dispatch({ type: "FETCH_SUCCESS" });
          setValue("name", data.name);
          setValue("slug", data.slug);
          //setValue('parentId', data.parentId)
          setInitialParent(data.initialParent);
          setValue("categoryPicture", data.categoryPicture);
          setInMenu(data.inMenu);

          setInitialCategoryImage(data.categoryPicture);
          setInitialFuteuredImage(data.featuredImage);
          setValue("featuredImage", data.featuredImage);
          setIsFeatured(data.isFeatured);
        } catch (err) {
          dispatch({ type: "FETCH_FAIL", payload: getError(err) });
        }
      };
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
        const { data } = await axios.get(`/api/admin/categories`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_All_SUCCESS" /* payload: data*/ });
        setCategories(data);
      } catch (err) {
        dispatch({ type: "FETCH_All_FAIL", payload: getError(err) });
      }
    };
    // if (userSuccessDelete) {
    //   dispatch({ type: 'DELETE_USER_RESET'})
    // }else {
    //   fetchData();
    // }

    fetchData();

    //console.log('summary.salesData.length', summary.salesData)
  }, []);

  const parentsCategoris = (category) => {
    let parentsTable = [];

    parentsTable.push(category);

    categories.map((cat) => {
      if (category.initialParent === cat.slug) {
        parentsTable.push(cat);
      }
    });

    return (
      <div>
        <strong>{parentsTable[0].name} </strong>{" "}
        <span style={{ opacity: "0.45" }}>
          {parentsTable.length === 2 ? " | " + parentsTable[1].name : ""}{" "}
        </span>{" "}
      </div>
    );
  };

  const updateCatgory = async ({ name }) => {
    //e.preventDefault();

    closeSnackbar();
    // initialCategoryImage
    // initialFuteuredImage
    
      let featuredImage = await uploadFeaturedImageFun();
    
      let categoryImage = await uploadcategoryImageFun()
    
     

    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/admin/categories/${categoryId}`,
        {
          name,
          initialParent /*parentId*/,
          categoryPicture : initialCategoryImage ? initialCategoryImage :categoryImage ,
          featuredImage : initialFuteuredImage ? initialFuteuredImage : featuredImage,
          isFeatured,
          inMenu,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "UPDATE_SUCCESS" });
      enqueueSnackbar("Category Updated successfully", { variant: "success" });
      router.push("/admin/categories");
    } catch (err) {
      //alert(err.response.data ? err.response.data.message : err.message);
      dispatch({ type: "UPDATE_FAIL", payload: getError(err) });

      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

 

  const uploadFeaturedImage = (e) => {
    if (e.target.files.length > 0) {
      setFeaturedImageObject(e.target.files[0]);
      removeCategoryFeatuered();
    }
  };

  const uploadCategoryImage = (e) => {
    if (e.target.files.length > 0) {
      setCategoryImageObject(e.target.files[0]);
      removeCategoryImage();
    }
  };

  const removeCategoryImage = () => {
    setInitialCategoryImage("");
  };
  const removeCategoryFeatuered = () => {
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

        // setFeaturedImageObject
        // setFeaturedImage(data.secure_url);
        // console.log("featuredImage secure_url", data.secure_url);
        return data.secure_url;
        // enqueueSnackbar('Image uploaded successfully', {variant : 'success'})
      } catch (err) {
        enqueueSnackbar(`Upload Featured Image Faild, try again or choose another image: ${getError(err)}`, {
          variant: "error",
        });
      }
    }
  };

  const uploadcategoryImageFun = async () => {
    if (!categoryImageObject) {
      return "";
    } else {
      const bodyFomData = new FormData();
      bodyFomData.append("file", categoryImageObject);

      try {
        const { data } = await axios.post("/api/admin/upload", bodyFomData, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${userInfo.token}`,
          },
        });

        // setFeaturedImageObject
        // setFeaturedImage(data.secure_url);
        // console.log("featuredImage secure_url", data.secure_url);
        return data.secure_url;
        // enqueueSnackbar('Image uploaded successfully', {variant : 'success'})
      } catch (err) {
        enqueueSnackbar(`Upload category Image Faild, try again or choose another image : ${getError(err)}`, {
          variant: "error",
        });
      }
    }
  };

  return (
    <Layout title="Edit Category" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="categories" adminDashboard />
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
                      Edit category N : {categoryId}
                    </Typography>
                  </ListItem>

                  <form
                    className={classN.form}
                    onSubmit={handleSubmit(updateCatgory)}
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

                      {/* Slug Controller */}
                      <ListItem className={classN.listItemMin}>
                        <Controller
                          name="slug"
                          control={control}
                          defaultValue=""
                          rules={{
                            required: true,
                          }}
                          render={({ field }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="slug"
                              label="Slug"
                              disabled
                              //   inputProps={{ type: 'name' }}
                              error={Boolean(errors.slug)}
                              helperText={errors.slug ? "Slug is required" : ""}
                              {...field}
                            ></TextField>
                          )}
                        ></Controller>
                      </ListItem>

                      {/* ParentId Controller */}

                      <ListItem className={classN.listItemMin}>
                        <FormControl className={classN.fullWidth}>
                          <InputLabel
                            id="label"
                            style={{ margin: "-6px 0 0 14px" }}
                          >
                            Parent Gategory *
                          </InputLabel>
                          <Select
                            labelId="label"
                            label="Parent Gategory *"
                            value={initialParent}
                            onChange={(e) => setInitialParent(e.target.value)}
                            input={<OutlinedInput label="Parent Gategory *" />}
                          >
                            <MenuItem value="">No Category </MenuItem>

                            {categories.map((category) => (
                              <MenuItem
                                key={category.slug}
                                value={category.slug}
                              >
                                {parentsCategoris(category)}{" "}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </ListItem>

                      {/* category Image Controller */}

                      <ListItem className={classN.listItemFull}>
                        <div>
                          <Button
                            variant="contained"
                            color="primary"
                            component="label"
                            startIcon={<Image />}
                            // className={classN.btnHeaderWithIcon}
                          >
                            Upload Category image
                            <input
                              type="file"
                              // multiple
                              onChange={(e) => uploadCategoryImage(e)}
                              hidden
                            />
                          </Button>

                          {initialCategoryImage ? (
                            <ListItem>
                              <div
                                className={classN.productImagesContanerModule}
                              >
                                <img
                                  src={initialCategoryImage}
                                  alt="category image"
                                  className={classN.productImagerModule}
                                />
                                <div
                                  className={classN.productImageCancel}
                                  onClick={(e) => removeCategoryImage()}
                                >
                                  <Cancel
                                    className={classN.productImageCancelIcon}
                                  />
                                </div>
                              </div>
                            </ListItem>
                          ) : null}

                          {categoryImageObject ? (
                            <ListItem>
                              <div
                                className={classN.productImagesContanerModule}
                                key={categoryImageObject.name}
                              >
                                <img
                                  src={URL.createObjectURL(categoryImageObject)}
                                  alt="featured product image"
                                  className={classN.productImagerModule}
                                />
                                <div
                                  className={classN.productImageCancel}
                                  onClick={(e) => setCategoryImageObject(null)}
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

                      {/* FeaturedImage Controller */}

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

                      {/* FeaturedImageI checkBox */}

                      <ListItem>
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

                      {/* inMenu checkBox */}

                      <ListItem>
                        <FormControlLabel
                          label="In Menu"
                          control={
                            <Checkbox
                              onClick={(e) => setInMenu(e.target.checked)}
                              checked={inMenu}
                              name="inMenu"
                            />
                          }
                        ></FormControlLabel>
                      </ListItem>

                      <ListItem
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Button
                          variant="contained"
                          type="submit"
                          color="primary"
                          fullWidth
                          style={{ maxWidth: "480px", margin: "12px 0" }}
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
export default dynamic(() => Promise.resolve(CategoryEdit), { ssr: false });
