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
  Button,
  Card,
  List,
  ListItem,
  CircularProgress,
  TextField,
  ListItemText,
  Breadcrumbs,
  Link,
  IconButton,
  Menu, 
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  FormControlLabel,
  Checkbox,

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
  OpenInBrowser
} from "@material-ui/icons";

//import TreeView from '@mui/lab/TreeView';
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/IndeterminateCheckBox";
import ChevronRightIcon from "@material-ui/icons/AddCircle";
import Preloader from "../../components/Layout/Preloader";


//import ExpandMoreIcon from '@material-ui/icons-material/ExpandMore';
//import ChevronRightIcon from '@material-ui/icons-material/ChevronRight';
import TreeItem, { useTreeItem } from "@material-ui/lab/TreeItem";
import { useForm, Controller } from "react-hook-form";



import useStyles from "../../utils/styles/styles";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import Leftbar from "../../components/Layout/Leftbar";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    //
    case "CREATE_CATEGORY_REQUEST":
      return { ...state, loadingCreateCategory: true };
    case "CREATE_CATEGORY_SUCCESS":
      return { ...state, loadingCreateCategory: false };
    case "CREATE_CATEGORY_FAIL":
      return { ...state, loadingCreateCategory: false };

    //

    case "DELETE_CATEGORY_REQUEST":
      return { ...state, loadingDeleteGategory: true };
    case "DELETE_CATEGORY_SUCCESS":
      return {
        ...state,
        loadingDeleteGategory: false,
        categorySuccessDelete: true,
      };
    case "DELETE_CATEGORY_FAIL":
      return { ...state, loadingDeleteGategory: false };

    case "DELETE_CATEGORY_RESET":
      return {
        ...state,
        loadingDeleteGategory: false,
        categorySuccessDelete: false,
      };

    default:
      state;
  }
}

const dataTree = {
  id: "root",
  name: "Parent",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
        },
      ],
    },
  ],
};
function AdminCategories() {
  const { state } = useContext(Store);
  const router = useRouter();

  const { userInfo } = state;

  const classN = useStyles();

  const [categoriesTree, setCategoriesTree] = useState([]);
  const [expanded, setExpanded] = useState([]);

  
  const [anchorEl, setAnchorEl] = useState(null);
  const [itemOpen, setItemOpen] = useState(null);



  const [openAddModal, setOpenAddModal] = useState(false);
  const [loadingAddNew, setLoadingAddNew] = useState(false);

  const [initialParent, setInitialParent] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [inMenu, setInMenu] = useState(false);
  const [categoryImageObject, setCategoryImageObject] = useState(null);
  const [featuredImageObject, setFeaturedImageObject] = useState(null);
  // const [categories, setCategories] = useState([]);



  
  const [breadArray, setBreadArray] = useState([
    { name: "home", link: "/" },
    { name: "admin dashboard", link: "/admin/dashboard" },
    { name: "categories", link: "/admin/categories" },
  ]);


  const [
    {
      loading,
      loadingCreateCategory,
      loadingDeleteGategory,
      categorySuccessDelete,
      error,
      categories,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    users: [],
    error: "",
  });


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
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/categories`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        console.log("Get Categories succes", data);
        // setCategories(data);
        // =============================>
        // data.map((cat) => {})
        //createDataTree(data)
        console.log(" createDataTree(data)", createDataTree(data));
        setCategoriesTree(createDataTree(data));
        // =====================================>
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    // if (userSuccessDelete) {
    //   dispatch({ type: 'DELETE_USER_RESET'})
    // }else {
    //   fetchData();
    // }

    fetchData();

    //console.log('summary.salesData.length', summary.salesData)
  }, [categorySuccessDelete, router, userInfo]);

  const createCategoryFun = async () => {
    try {
      dispatch({ type: "CREATE_CATEGORY_REQUEST" });

      const { data } = await axios.post(
        "/api/admin/categories",
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "CREATE_CATEGORY_SUCCESS" });
      enqueueSnackbar("Category Created successfully", { variant: "success" });
      router.push(`/admin/category/${data.category._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_CATEGORY_FAIL" });

      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const addNewCategory = async ({name}) => {
    setLoadingAddNew(true)
    let featuredImage = await uploadFeaturedImageFun();
    
    let categoryImage = await uploadcategoryImageFun()
  
   

  try {
    dispatch({ type: "CREATE_CATEGORY_SUCCESS" });
    const { data } = await axios.post(
      "/api/admin/categories",
      {
        name,
        initialParent /*parentId*/,
        categoryPicture : categoryImage ? categoryImage : '' ,
        featuredImage : featuredImage ? featuredImage : '',
        isFeatured,
        inMenu,
      },
      {
        headers: { authorization: `Bearer ${userInfo.token}` },
      }
    );

    dispatch({ type: "CREATE_CATEGORY_SUCCESS" });
    enqueueSnackbar("Category Created successfully", { variant: "success" });
    setLoadingAddNew(false)
    router.push(`/admin/category/${data.category._id}`);
  } catch (err) {
    dispatch({ type: "CREATE_CATEGORY_FAIL" });
    setLoadingAddNew(false)
    enqueueSnackbar(getError(err), { variant: "error" });
  }

  }

  const deleteCategoryFun = async (categoryId) => {
    if (!window.confirm("Are you sure want te delet this item ?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_CATEGORY_REQUEST" });

      await axios.delete(
        `/api/admin/categories/${categoryId}`,
        //{}, delete handler don't accept form body
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "DELETE_CATEGORY_SUCCESS" });
      enqueueSnackbar("Category Deleted successfully", { variant: "success" });
      //router.push(`/admin/product/${data.product._id}`)
    } catch (err) {
      dispatch({ type: "DELETE_CATEGORY_FAIL" });

      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };


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

  const handleExpandClick = (list) => {
    let arr = [];
    list.map((cat) => {
      arr.push(cat._id);
    });

    setExpanded((oldExpanded) => (oldExpanded.length === 0 ? arr : []));
  };

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleClickMenu = (event, item) => {
    setAnchorEl(event.currentTarget);
    setItemOpen(item);
    // console.log('event.currentTarget', event.currentTarget)
  };

  const renderTree = (nodes, index) => (
    <div style={{width : '100% !important', display:'flex', justifyContent:'space-between', position : 'relative', }}>
    <TreeItem
      key={nodes._id}
      nodeId={nodes._id}
      style={{ widh: "100%" }}
      className={classN.TreeItemStyle}
     
      
      label={
        <div
          style={{
            widh: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: '44px',

          }}
        >
          {nodes.name}     
        </div>
      
      }
    

    >
     
    
      {Array.isArray(nodes.childNodes)
        ? nodes.childNodes.map((node, index) => renderTree(node, index))
        : null}
    </TreeItem>
  
    <div style={{position : 'absolute', right : 0, top : '0px'}}>
           
           <IconButton
                 id="simple-menu"
                 aria-controls="simple-menu"
                 aria-haspopup="true"
                 //  aria-haspopup="true"
                 //  aria-expanded={itemOpen ? 'true' : undefined}
                 onClick={(e) => handleClickMenu(e, nodes._id)}
                 onMouseDown={e=> console.log('e', e)}

               >
                 <MoreVert />
                 {/* <span>{nodes._id}</span> */}
               </IconButton>

               <Menu
                 id="simple-menu"
                 keepMounted
                 open={itemOpen === nodes._id}
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
                
                   onClick={() => deleteCategoryFun(nodes._id)}
                 >
                   <DeleteOutline
                     className={classN.menuItemNormalBtn}
                   />
                   <span>Delet</span>
                 </MenuItem>
                 <NextLink
                   href={`/admin/category/${nodes._id}`} passHref
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

                 <NextLink
                   
                   href={`/search?category=${nodes.slug}`}
                   passHref
                 >
                   <Link>
                     <MenuItem className={`${classN.menuItem}`}>
                       <OpenInBrowser
                         className={classN.menuItemNormalBtn}
                       />
                       <span>Explore</span>
                     </MenuItem>
                   </Link>
                 </NextLink>
               </Menu>


    </div>
    </div>
  );
  const closeOpenAddModal = () => {
    setOpenAddModal(false);
  };
 
  const createDataTree = (dataset) => {
    const hashTable = Object.create(null);

    dataset.forEach(
      (aData) => (hashTable[aData.slug] = { ...aData, childNodes: [] })
    );
    const dataTree = [];
    dataset.forEach((aData) => {
      if (
        aData.initialParent &&
        dataset.filter((e) => e.slug === aData.initialParent).length > 0
      ) {
        hashTable[aData.initialParent].childNodes.push(hashTable[aData.slug]);
      } else dataTree.push(hashTable[aData.slug]);
    });
    return dataTree;
  };

  const uploadFeaturedImage = (e) => {
    if (e.target.files.length > 0) {
      setFeaturedImageObject(e.target.files[0]);
    }
  };

  const uploadCategoryImage = (e) => {
    if (e.target.files.length > 0) {
      setCategoryImageObject(e.target.files[0]);
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
    <Layout title="Categories-Dashboard" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="categories" adminDashboard/>
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
                onSubmit={handleSubmit(addNewCategory)}
              >
                
                <List style={{ display: "flex", flexWrap: "wrap" }}>

                <ListItem>
                  <Typography // component="h1" variant="h1"
                    className={classN.titleHeader}
                  >
                    Add New Category
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

                      {/* Slug Controller */}
                      <ListItem className={classN.listItemMin}>
                        <Controller
                          name="slug"
                          control={control}
                          defaultValue=""
                          rules={{
                            // required: true,
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
                      Add Category
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
                      onClick={handleSubmit(addNewCategory)}
                    >
                      Add Product
                    </Button>
                  </div>
                </ListItem>

                </List>
              </form>
            </div>


            </div>
          ) :
          null}


          <div className={classN.section}   style={{display : openAddModal ? 'none' : 'block'}}>

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
                  // onClick={createCategoryFun}

                  className={classN.btnHeaderWithIcon}
                >
                  New Category
                </Button>

                <AddBox
                  variant="contained"
                  color="primary"
                  // onClick={() => setOpenAddModal(true)}
                  onClick={createCategoryFun}
                  className={classN.btnIconHeader}
                />
              </div>
            </List>


            <List>
             

              <>
                {loading ? (
                  // <CircularProgress />
                  <div className={classN.loadingContainer}>
                    <Preloader />
                  </div>
                ) : error ? (
                  <Typography className={classN.error}>{error}</Typography>
                ) : (
                 <>
                 
                  <ListItem >
                  <Typography // component="h1" variant="h1"
                    className={classN.titleHeader}
                    onClick={(e) => handleExpandClick(categoriesTree)}
                    style={{cursor: 'pointer'}}
                  >
                    
                    {expanded.length === 0 ? "Expand Categories " : "Collapse Categories"}

                  </Typography>
                </ListItem>
                
    
                  <ListItem>
                    <TreeView
                      aria-label="rich object"
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      expanded={expanded}
                      onNodeToggle={handleToggle}
                      //defaultExpanded={['root']}
                      defaultExpandIcon={<ChevronRightIcon />}
                      defaultEndIcon={<div>|</div>}
                      sx={{ height: 150, flexGrow: 1, overflowY: "auto" }}
                      style={{ width: "100%" }}
    
                      // multiSelect
                    >
                      {/*renderTree(dataTree)*/}
                      {categoriesTree.length &&
                        categoriesTree.map((category) => renderTree(category))}
                    </TreeView>
                  </ListItem>
                  </>
                )}
              </>
            </List>
          </div>

          
        </Grid>
      </Grid>
    </Layout>
  );
}

// for rende userHistory only in front end
export default dynamic(() => Promise.resolve(AdminCategories), { ssr: false });
