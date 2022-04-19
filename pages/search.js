import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Typography,
  Slider,
  Checkbox,
  TextField,
  Modal,
  Backdrop,
  Fade,
  Drawer,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
// import ProductSelf from '../components/Layout/ProductSelf'
import CancelIcon from "@material-ui/icons/Cancel";

import Product from "../models/Product/Product";

import Category from "../models/Category/Category";

import db from "../utils/database/db";
import { Store } from "../utils/store/Store";
import useStyles from "../utils/styles/styles";
import { Pagination, Rating } from "@material-ui/lab";
import ProductBox from "../components/Layout/ProductBox";

//import { styled } from '@material-ui/';
//import { styled } from '@material-ui/material/styles';

const PAGE_SIZE = 8; // items in the page
const minDistance = 10; // prices minn interval
function valuetext(value) {
  return `${value}°C`;
}

const prices = [
  {
    name: "1$ to 50$",
    value: "1-50",
  },
  {
    name: "51$ to 200$",
    value: "51-200",
  },
  {
    name: "201$ to 1000$",
    value: "201-1000",
  },
  {
    name: "1001$ to 10000$",
    value: "1001-10000",
  },
];

const ratings = [1, 2, 3, 4];

export default function Search(props) {
  //const [category , setCategory] = useState({})
  //const [categories , setCategories] = useState([])

  const [priceValue, setPriceValue] = useState([0, 10]);

  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [showMultible, setShowMultible] = useState(false);
  const [openModelsort, setOpenModelsort] = useState(false);
  const [bottomBar, setBottomBar] = useState(false);

  const router = useRouter();

  const { state, dispatch } = useContext(Store);

  const {
    query = "all",
    category = "all",
    brand = "all",
    price = "all",
    rating = "all",
    sort = "all",
    color = "all",
    PriCamera = "all",
    SelCamera = "all",
    resolutionType = "all",
    screenSize = "all",
    refreshRate = "all",
    checkConnectivity_feature = "all",
    operatingSystem = "all",
    systemArchitecture = "all",
    batteryCapacitie = "all",
    batteryType = "all",
    processorName = "all",
    processorBrand = "all",
    graphicProcessor = "all",
    processorCore = "all",
    processorType = "all",
    numberofCore = "all",
    ram = "all",
    ramType = "all",
    storage = "all",
  } = router.query;

  const filterObject = {
    color: color,
    brand: brand,
    PriCamera: PriCamera,
    SelCamera: SelCamera,
    resolutionType: resolutionType,
    screenSize: screenSize,
    refreshRate: refreshRate,
    //checkConnectivity_feature : checkConnectivity_feature  ,
    operatingSystem: operatingSystem,
    systemArchitecture: systemArchitecture,
    batteryCapacitie: batteryCapacitie,
    batteryType: batteryType,
    processorName: processorName,
    processorBrand: processorBrand,
    graphicProcessor: graphicProcessor,
    processorCore: processorCore,
    processorType: processorType,
    numberofCore: numberofCore,
    ram: ram,
    ramType: ramType,
    storage: storage,
  };

  const {
    products,
    countProducts,
    categories,
    brands,
    pages,
    maxPrice,
    minPrice,
    firstMaxPrice,
    firstMinPrice,
    Colors,
    PrimaryCamera,
    SelfiCamera,
    resolutionTypes,
    screenSizes,
    refreshRates,
    checkConnectivity_features,
    operatingSystems,
    systemArchitectures,
    batteryCapacities,
    batteryTypes,
    processorNames,
    processorBrands,
    graphicProcessors,
    processorCores,
    processorTypes,
    numberofCores,
    rams,
    ramTypes,
    storages,
  } = props;

  const classN = useStyles();

  useEffect(() => {
    // setPriceValue([minPrice, maxPrice])
    setPriceValue([firstMinPrice, firstMaxPrice]);
    // console.log('products', products)
    // console.log('minPrice', minPrice)
    // console.log('maxPrice', maxPrice)
    // console.log('priceValue', priceValue)
    //maxPrice, minPrice
  }, [firstMaxPrice, firstMinPrice]);

  const clearSearch = () => {
    router.push("/search");
    setPriceValue([firstMinPrice, firstMaxPrice]);
  };

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
    color,
    PriCamera,
    SelCamera,
    resolutionType,
    screenSize,
    refreshRate,
    operatingSystem,
    systemArchitecture,
    batteryCapacitie,
    batteryType,
    processorName,
    processorBrand,
    graphicProcessor,
    processorCore,
    processorType,
    numberofCore,
    ram,
    ramType,
    storage,
  }) => {
    const path = router.pathname;
    const { query } = router;
    if (page) {
      query.page = page;
    }
    if (category) {
      query.category = category;
    }
    // if (brand) { query.brand=brand }
    if (sort) {
      query.sort = sort;
    }
    if (min) {
      query.min ? query.min : query.min === 0 ? 0 : min;
    }
    if (max) {
      query.max ? query.max : query.max === 0 ? 0 : max;
    }
    if (searchQuery) {
      query.searchQuery = searchQuery;
    }
    if (price) {
      query.price = price;
    }
    if (rating) {
      query.rating = rating;
    }

    if (brand) {
      if (query.brand) {
        if (query.brand.split("*").includes(brand.toString())) {
          query.brand = query.brand
            .split("*")
            .filter((item) => item.toString() !== brand.toString())
            .join("*");
        } else {
          query.brand = `${query.brand}*${brand}`;
        }
      } else {
        query.brand = brand;
      }
    }

    if (color) {
      if (query.color) {
        if (query.color.split("*").includes(color.toString())) {
          query.color = query.color
            .split("*")
            .filter((item) => item.toString() !== color.toString())
            .join("*");
        } else {
          query.color = `${query.color}*${color}`;
        }
      } else {
        query.color = color;
      }
    }
    if (PriCamera) {
      if (query.PriCamera) {
        if (query.PriCamera.split("*").includes(PriCamera.toString())) {
          query.PriCamera = query.PriCamera.split("*")
            .filter((item) => item.toString() !== PriCamera.toString())
            .join("*");
        } else {
          query.PriCamera = `${query.PriCamera}*${PriCamera}`;
        }
      } else {
        query.PriCamera = PriCamera;
      }
    }

    if (SelCamera) {
      if (query.SelCamera) {
        if (query.SelCamera.split("*").includes(SelCamera.toString())) {
          query.SelCamera = query.SelCamera.split("*")
            .filter((item) => item.toString() !== SelCamera.toString())
            .join("*");
        } else {
          query.SelCamera = `${query.SelCamera}*${SelCamera}`;
        }
      } else {
        query.SelCamera = SelCamera;
      }
    }

    if (resolutionType) {
      if (query.resolutionType) {
        if (
          query.resolutionType.split("*").includes(resolutionType.toString())
        ) {
          query.resolutionType = query.resolutionType
            .split("*")
            .filter((item) => item.toString() !== resolutionType.toString())
            .join("*");
        } else {
          query.resolutionType = `${query.resolutionType}*${resolutionType}`;
        }
      } else {
        query.resolutionType = resolutionType;
      }
    }

    if (screenSize) {
      if (query.screenSize) {
        if (query.screenSize.split("*").includes(screenSize.toString())) {
          query.screenSize = query.screenSize
            .split("*")
            .filter((item) => item.toString() !== screenSize.toString())
            .join("*");
        } else {
          query.screenSize = `${query.screenSize}*${screenSize}`;
        }
      } else {
        query.screenSize = screenSize;
      }
    }

    if (refreshRate) {
      if (query.refreshRate) {
        if (query.refreshRate.split("*").includes(refreshRate.toString())) {
          query.refreshRate = query.refreshRate
            .split("*")
            .filter((item) => item.toString() !== refreshRate.toString())
            .join("*");
        } else {
          query.refreshRate = `${query.refreshRate}*${refreshRate}`;
        }
      } else {
        query.refreshRate = refreshRate;
      }
    }

    if (operatingSystem) {
      if (query.operatingSystem) {
        if (
          query.operatingSystem.split("*").includes(operatingSystem.toString())
        ) {
          query.operatingSystem = query.operatingSystem
            .split("*")
            .filter((item) => item.toString() !== operatingSystem.toString())
            .join("*");
        } else {
          query.operatingSystem = `${query.operatingSystem}*${operatingSystem}`;
        }
      } else {
        query.operatingSystem = operatingSystem;
      }
    }
    //

    if (systemArchitecture) {
      if (query.systemArchitecture) {
        if (
          query.systemArchitecture
            .split("*")
            .includes(systemArchitecture.toString())
        ) {
          query.systemArchitecture = query.systemArchitecture
            .split("*")
            .filter((item) => item.toString() !== systemArchitecture.toString())
            .join("*");
        } else {
          query.systemArchitecture = `${query.systemArchitecture}*${systemArchitecture}`;
        }
      } else {
        query.systemArchitecture = systemArchitecture;
      }
    }

    if (batteryCapacitie) {
      if (query.batteryCapacitie) {
        if (
          query.batteryCapacitie
            .split("*")
            .includes(batteryCapacitie.toString())
        ) {
          query.batteryCapacitie = query.batteryCapacitie
            .split("*")
            .filter((item) => item.toString() !== batteryCapacitie.toString())
            .join("*");
        } else {
          query.batteryCapacitie = `${query.batteryCapacitie}*${batteryCapacitie}`;
        }
      } else {
        query.batteryCapacitie = batteryCapacitie;
      }
    }

    if (batteryType) {
      if (query.batteryType) {
        if (query.batteryType.split("*").includes(batteryType.toString())) {
          query.batteryType = query.batteryType
            .split("*")
            .filter((item) => item.toString() !== batteryType.toString())
            .join("*");
        } else {
          query.batteryType = `${query.batteryType}*${batteryType}`;
        }
      } else {
        query.batteryType = batteryType;
      }
    }

    if (processorName) {
      if (query.processorName) {
        if (query.processorName.split("*").includes(processorName.toString())) {
          query.processorName = query.processorName
            .split("*")
            .filter((item) => item.toString() !== processorName.toString())
            .join("*");
        } else {
          query.processorName = `${query.processorName}*${processorName}`;
        }
      } else {
        query.processorName = processorName;
      }
    }

    if (processorBrand) {
      if (query.processorBrand) {
        if (
          query.processorBrand.split("*").includes(processorBrand.toString())
        ) {
          query.processorBrand = query.processorBrand
            .split("*")
            .filter((item) => item.toString() !== processorBrand.toString())
            .join("*");
        } else {
          query.processorBrand = `${query.processorBrand}*${processorBrand}`;
        }
      } else {
        query.processorBrand = processorBrand;
      }
    }

    if (graphicProcessor) {
      if (query.graphicProcessor) {
        if (
          query.graphicProcessor
            .split("*")
            .includes(graphicProcessor.toString())
        ) {
          query.graphicProcessor = query.graphicProcessor
            .split("*")
            .filter((item) => item.toString() !== graphicProcessor.toString())
            .join("*");
        } else {
          query.graphicProcessor = `${query.graphicProcessor}*${graphicProcessor}`;
        }
      } else {
        query.graphicProcessor = graphicProcessor;
      }
    }

    if (processorCore) {
      if (query.processorCore) {
        if (query.processorCore.split("*").includes(processorCore.toString())) {
          query.processorCore = query.processorCore
            .split("*")
            .filter((item) => item.toString() !== processorCore.toString())
            .join("*");
        } else {
          query.processorCore = `${query.processorCore}*${processorCore}`;
        }
      } else {
        query.processorCore = processorCore;
      }
    }

    //

    if (processorType) {
      if (query.processorType) {
        if (query.processorType.split("*").includes(processorType.toString())) {
          query.processorType = query.processorType
            .split("*")
            .filter((item) => item.toString() !== processorType.toString())
            .join("*");
        } else {
          query.processorType = `${query.processorType}*${processorType}`;
        }
      } else {
        query.processorType = processorType;
      }
    }

    if (numberofCore) {
      if (query.numberofCore) {
        if (query.numberofCore.split("*").includes(numberofCore.toString())) {
          query.numberofCore = query.numberofCore
            .split("*")
            .filter((item) => item.toString() !== numberofCore.toString())
            .join("*");
        } else {
          query.numberofCore = `${query.numberofCore}*${numberofCore}`;
        }
      } else {
        query.numberofCore = numberofCore;
      }
    }

    if (ram) {
      if (query.ram) {
        if (query.ram.split("*").includes(ram.toString())) {
          query.ram = query.ram
            .split("*")
            .filter((item) => item.toString() !== ram.toString())
            .join("*");
        } else {
          query.ram = `${query.ram}*${ram}`;
        }
      } else {
        query.ram = ram;
      }
    }

    if (ramType) {
      if (query.ramType) {
        if (query.ramType.split("*").includes(ramType.toString())) {
          query.ramType = query.ramType
            .split("*")
            .filter((item) => item.toString() !== ramType.toString())
            .join("*");
        } else {
          query.ramType = `${query.ramType}*${ramType}`;
        }
      } else {
        query.ramType = ramType;
      }
    }

    if (storage) {
      if (query.storage) {
        if (query.storage.split("*").includes(storage.toString())) {
          query.storage = query.storage
            .split("*")
            .filter((item) => item.toString() !== storage.toString())
            .join("*");
        } else {
          query.storage = `${query.storage}*${storage}`;
        }
      } else {
        query.storage = storage;
      }
    }

    // if (PriCamera) { query.PriCamera=PriCamera }
    // if (SelCamera) { query.SelCamera=SelCamera }
    // if (resolutionType ) { query.resolutionType=resolutionType }
    // if (screenSize  ) { query.screenSize=screenSize }
    // if (refreshRate  ) { query.refreshRate=refreshRate }
    // if (operatingSystem ) { query.operatingSystem=operatingSystem }
    // if (systemArchitecture  ) { query.systemArchitecture=systemArchitecture }
    // if (batteryCapacitie  ) { query.batteryCapacitie=batteryCapacitie }
    // if (batteryType  ) { query.batteryType=batteryType }
    // if (processorName  ) { query.processorName=processorName }
    // if (processorBrand  ) { query.processorBrand=processorBrand }
    // if (graphicProcessor  ) { query.graphicProcessor=graphicProcessor }
    // if (processorCore  ) { query.processorCore=processorCore }
    // if (processorType  ) { query.processorType=processorType }
    // if (numberofCore  ) { query.numberofCore=numberofCore }
    // if (ram ) { query.ram=ram }
    // if (ramType ) { query.ramType=ramType }
    // if (storage  ) { query.storage=storage }

    router.push({
      pathname: path,
      query: query,
    });
  };


  const StyledPagination = withStyles({
    ul: {
      // display: "inline-flex",
      flexWrap :'nowrap'
    }
  })(Pagination);

  const categoryChanger = (e) => {
    filterSearch({ category: e.target.value });
    setBottomBar(false);
  };

  const pageChanger = (e, page) => {
    filterSearch({ page });
  };

  const sortChanger = (e) => {
    filterSearch({ sort: e.target.value });
  };

  // const brandChanger = (e) => {
  //     filterSearch( { brand : e.target.value} )
  // }

  // const priceChanger = (e) => {
  //     filterSearch( { price : e.target.value} )
  // }

  // const ratingChanger = (e) => {
  //     filterSearch( { rating : e.target.value} )
  // }

  // const fliedChange = (e) => {
  //     filterSearch( { color : e.target.value} )

  // }

  const addToCartFun = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    // if (data.countInStock <= 0 ) {
    //     window.alert('Sorry. Product is Not avalibale');
    //     return;
    // }

    const quantityIncart = state.cart.cartItems.find(
      (x) => x._id === product._id
    );
    const quantity = quantityIncart ? quantityIncart.quantity + 1 : 1;

    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is Not avalibale");
      return;
    }

    dispatch({ type: "ADD_CART_ITEM", payload: { ...product, quantity } });

    router.push("/cart");
  };

  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    //   console.log('newValue', newValue)

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setPriceValue([clamped, clamped + minDistance]);
        setBottomBar(false);
        //filterSearch( { price : `${priceValue[0]}-${priceValue[1]}`} )
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setPriceValue([clamped - minDistance, clamped]);
        setBottomBar(false);
        //filterSearch( { price : `${priceValue[0]}-${priceValue[1]}`} )
      }

      filterSearch({ price: `${priceValue[0]}-${priceValue[1]}` });
      setBottomBar(false);
      //filterSearch( { price : `${PriceValue[0]}-${PriceValue[1]}`} )
    } else {
      setPriceValue(newValue);
      filterSearch({ price: `${newValue[0]}-${newValue[1]}` });
      setBottomBar(false);
    }
  };

  const handleChangePriceInput = (newValue) => {
    if (newValue[1] - newValue[0] > 0 && newValue[0] > -1 && newValue[1] > 0) {
      // const clamped = Math.max(newValue[1], minDistance);
      setPriceValue(newValue);

      filterSearch({ price: `${newValue[0]}-${newValue[1]}` });
    }
  };

  //chcekSectionAndReturn
  const checkFiledAndReturn = (arr, title, variable, va) => {
    //let titleN = variable
    let obj = {};
    obj[variable] = "all";

    // console.log('global[titleN]', global[variable],global.variable, tempNamespace.variable, tempNamespace[variable], Object.keys({color})[0])
    // console.log('color', color)

    //tempNamespace[titleN] = 'all'
    if (arr.length > 0) {
      return (
        <ListItem style={{}} className={classN.searchFildesLisConatiner}>
          <Box className={classN.fullWidth}>
            <Typography>{title}</Typography>

            {/* <Select fullWidth   value={filterObject[variable] }
                                        //value={(tempNamespace[variable])}
                        onChange={e => {
                            obj[variable] = e.target.value
                            filterSearch(obj)
                        }}
                        // onChange={e => filterSearch(e=> obj[titleN]= e.target.value)}
                    >
                        <MenuItem value='all'>
                            All
                        </MenuItem>

                        { arr &&
                            arr.sort().map((propr)=> (
                                <MenuItem key={propr} value={propr}>
                                    {propr}
                                </MenuItem>

                            ))
                        }

                    </Select> */}

            <div className={classN.searchFildesConatiner}>
              {arr &&
                arr.sort().map((propr) => (
                  <div key={propr} className={classN.searchFildesBox}>
                    <Checkbox
                      checked={
                        filterObject[variable]
                          .split("*")
                          .includes(propr.toString())
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        obj[variable] = propr;
                        filterSearch(obj);
                        setBottomBar(false);
                        // console.log('filterObject[variable].split', filterObject[variable].split('*'))
                      }}
                    />

                    <Typography
                      className={classN.searchFildesBoxText}
                      onClick={(e) => {
                        obj[variable] = propr;
                        filterSearch(obj);
                        setBottomBar(false);
                      }}
                    >
                      {propr}
                    </Typography>
                  </div>
                ))}
            </div>
          </Box>
        </ListItem>
      );
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
      <>
        <strong>{parentsTable[0].name} </strong>{" "}
        <span style={{ opacity: "0.45" }}>
          {parentsTable.length === 2 ? ` | ` + parentsTable[1].name : ""}{" "}
        </span>{" "}
      </>
    );
  };

  const ModelStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Layout titleHeader="Search" returnSearch={true}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className={classN.containerPers}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModelsort}
            onClose={(e) => setOpenModelsort(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModelsort}>
              <Box
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90%",
                  background: "white",
                  border: "1px solid #fff",
                  padding: 0,
                  margin: 0,
                  // boxShadow: 10,
                  // p: 4
                }}
              >
                <List className={classN.modelBox}>
                  <ListItem
                    onClick={(e) => {
                      filterSearch({ sort: "all" });
                      setOpenModelsort(false);
                    }}
                    className={classN.modelItem}
                  >
                    All
                  </ListItem>
                  <ListItem
                    onClick={(e) => {
                      filterSearch({ sort: "featured" });
                      setOpenModelsort(false);
                    }}
                    className={classN.modelItem}
                  >
                    Featured
                  </ListItem>
                  <ListItem
                    onClick={(e) => {
                      filterSearch({ sort: "lowest" });
                      setOpenModelsort(false);
                    }}
                    className={classN.modelItem}
                  >
                    Price: Low to High
                  </ListItem>
                  <ListItem
                    onClick={(e) => {
                      filterSearch({ sort: "highest" });
                      setOpenModelsort(false);
                    }}
                    className={classN.modelItem}
                  >
                    Price: High to Low
                  </ListItem>
                  <ListItem
                    onClick={(e) => {
                      filterSearch({ sort: "toprated" });
                      setOpenModelsort(false);
                    }}
                    className={classN.modelItem}
                  >
                    Customer Reviews
                  </ListItem>
                  <ListItem
                    onClick={(e) => {
                      filterSearch({ sort: "newest" });
                      setOpenModelsort(false);
                    }}
                    className={classN.modelItem}
                  >
                    Newest Arrivals
                  </ListItem>
                </List>
              </Box>
            </Fade>
          </Modal>

          <Drawer
            anchor="bottom"
            open={bottomBar}
            onClose={(e) => setBottomBar(false)}
            //className={classN.sideBar}
            style={{
              padding: "0",
              margin: "0",
            }}
          >
            <Grid
              container
              className={` ${classN.gridColoumnFixed} ${classN.filterSearchContainerMobile}`}
            >
              <List className={classN.fullWidth}>
                {/* categoryChanger */}
                <ListItem
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, .096)",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                >
                  <Box className={classN.fullWidth}>
                    <Typography>Filters</Typography>
                  </Box>
                </ListItem>
                <ListItem
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, .096)",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                >
                  <Box className={classN.fullWidth}>
                    <Typography>Categories</Typography>

                    <Select
                      fullWidth
                      value={category}
                      style={{ overflowX: "hidden" }}
                      onChange={categoryChanger}
                    >
                      <MenuItem value="all">All</MenuItem>

                      {categories &&
                        categories
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((category) => (
                            <MenuItem key={category._id} value={category.slug}>
                              {parentsCategoris(category)}
                            </MenuItem>
                          ))}
                    </Select>
                  </Box>
                </ListItem>
                <ListItem
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, .096)",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                >
                  <Box
                    className={classN.fullWidth}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography className={classN.fullWidth}>Prices</Typography>

                    <Slider
                      className={classN.sliderr}
                      getAriaLabel={() => "Minimum distance shift"}
                      value={priceValue}
                      //disableSwap ={ false}
                      onChange={handleChange2}
                      //getAriaValueText={valuetext}
                      // disableSwap
                      min={firstMinPrice}
                      max={firstMaxPrice}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                    />

                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        className={classN.inputNumberFiled}
                        value={Math.min(priceValue[0], priceValue[1])}
                        onChange={(e) => {
                          handleChangePriceInput([
                            e.target.value,
                            priceValue[1],
                          ]);
                        }}
                        label="Min"
                        variant="outlined"
                        type="number"
                        style={{ width: "48%" }}
                      />
                      <TextField
                        value={Math.max(priceValue[0], priceValue[1])}
                        onChange={(e) => {
                          handleChangePriceInput([
                            priceValue[0],
                            e.target.value,
                          ]);
                        }}
                        label="Max"
                        variant="outlined"
                        type="number"
                        style={{ width: "48%" }}
                      />
                    </Box>
                  </Box>
                </ListItem>
                {/* BrandsChanger */}
                {/* cChanger */}
                {/* {chcekSectionAndReturn()} */}
                {brands.length > 0
                  ? checkFiledAndReturn(brands, "Brands", "brand")
                  : null}
                {Colors.length > 0
                  ? checkFiledAndReturn(Colors, "Colors", "color")
                  : null}
                {PrimaryCamera.length > 0
                  ? checkFiledAndReturn(
                      PrimaryCamera,
                      "PrimaryCamera",
                      "PriCamera"
                    )
                  : null}
                {SelfiCamera.length > 0
                  ? checkFiledAndReturn(SelfiCamera, "SelfiCamera", "SelCamera")
                  : null}
                {resolutionTypes.length > 0
                  ? checkFiledAndReturn(
                      resolutionTypes,
                      "resolutionTypes",
                      "resolutionType"
                    )
                  : null}
                {screenSizes.length > 0
                  ? checkFiledAndReturn(
                      screenSizes,
                      "screenSizes",
                      "screenSize"
                    )
                  : null}
                {refreshRates.length > 0
                  ? checkFiledAndReturn(
                      refreshRates,
                      "refreshRates",
                      "refreshRate"
                    )
                  : null}
                {/* {checkConnectivity_features.length > 0 ? checkFiledAndReturn(Colors, 'Colors') : null} */}
                {operatingSystems.length > 0
                  ? checkFiledAndReturn(
                      operatingSystems,
                      "operatingSystems",
                      "operatingSystem"
                    )
                  : null}
                {systemArchitectures.length > 0
                  ? checkFiledAndReturn(
                      systemArchitectures,
                      "systemArchitectures",
                      "systemArchitecture"
                    )
                  : null}
                {batteryCapacities.length > 0
                  ? checkFiledAndReturn(
                      batteryCapacities,
                      "batteryCapacities",
                      "batteryCapacitie"
                    )
                  : null}
                {batteryTypes.length > 0
                  ? checkFiledAndReturn(
                      batteryTypes,
                      "batteryTypes",
                      "batteryType"
                    )
                  : null}
                {processorNames.length > 0
                  ? checkFiledAndReturn(
                      processorNames,
                      "processorNames",
                      "processorName"
                    )
                  : null}
                {processorBrands.length > 0
                  ? checkFiledAndReturn(
                      processorBrands,
                      "processorBrands",
                      "processorBrand"
                    )
                  : null}
                {graphicProcessors.length > 0
                  ? checkFiledAndReturn(
                      graphicProcessors,
                      "graphicProcessors",
                      "graphicProcessor"
                    )
                  : null}
                {processorCores.length > 0
                  ? checkFiledAndReturn(
                      processorCores,
                      "processorCores",
                      "processorCore"
                    )
                  : null}
                {processorTypes.length > 0
                  ? checkFiledAndReturn(
                      processorTypes,
                      "processorTypes",
                      "processorType"
                    )
                  : null}
                {numberofCores.length > 0
                  ? checkFiledAndReturn(
                      numberofCores,
                      "numberofCores",
                      "numberofCore"
                    )
                  : null}
                {rams.length > 0
                  ? checkFiledAndReturn(rams, "rams", "ram")
                  : null}
                ,
                {ramTypes.length > 0
                  ? checkFiledAndReturn(ramTypes, "ramTypes", "ramType")
                  : null}
                {storages.length > 0
                  ? checkFiledAndReturn(storages, "storages", "storage")
                  : null}
                {/* {ChecCamerFeatures()} */}
              </List>
            </Grid>
          </Drawer>

          <Grid container className={classN.filterMenu}>
            <Grid item sm={2} xs={2} className={classN.filterMenuItem}>
              <Typography onClick={(e) => setShowMultible(!showMultible)}>
                {/* ||| */}
                <i className="uil uil-apps"></i>
              </Typography>
            </Grid>

            <Grid
              item
              sm={6}
              xs={6}
              className={`${classN.filterMenuItem} ${classN.filterMenuItemMiddle}`}
              onClick={(e) => setOpenModelsort(true)}
            >
              <Typography>{sort === "all" ? "All Filed" : sort}</Typography>
            </Grid>
            <Grid
              item
              sm={4}
              xs={4}
              className={classN.filterMenuItem}
              //style={{borderLeft:'1px solid rgba(0, 0, 0, .096)'}}
            >
              {/* <Typography onClick={e => setFilterMenuOpen(!filterMenuOpen)} > */}
              <Typography onClick={(e) => setBottomBar(!bottomBar)}>
                Filter
              </Typography>
            </Grid>
          </Grid>

          <Grid container className={classN.mt1} spacing={0}>
           
            <Grid
              item
              className={` ${classN.gridColoumnFixed} ${classN.filterSearchContainer}`}
            >
              <List>
                {/* categoryChanger */}
                <ListItem
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, .096)",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                >
                  <Box className={classN.fullWidth}>
                    <Typography>Filters</Typography>
                  </Box>
                </ListItem>
                <ListItem
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, .096)",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                >
                  <Box className={classN.fullWidth}>
                    <Typography>Categories</Typography>

                    <Select
                      fullWidth
                      value={category}
                      style={{ overflowX: "hidden" }}
                      onChange={categoryChanger}
                    >
                      <MenuItem value="all">All</MenuItem>

                      {categories &&
                        categories
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((category) => (
                            <MenuItem key={category._id} value={category.slug}>
                              {parentsCategoris(category)}
                            </MenuItem>
                          ))}
                    </Select>
                  </Box>
                </ListItem>
                <ListItem
                  style={{
                    borderBottom: "1px solid rgba(0, 0, 0, .096)",
                    paddingTop: "8px",
                    paddingBottom: "8px",
                  }}
                >
                  <Box
                    className={classN.fullWidth}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography className={classN.fullWidth}>Prices</Typography>

                    <Slider
                      className={classN.sliderr}
                      getAriaLabel={() => "Minimum distance shift"}
                      value={priceValue}
                      //disableSwap ={ false}
                      onChange={handleChange2}
                      //getAriaValueText={valuetext}
                      // disableSwap
                      min={firstMinPrice}
                      max={firstMaxPrice}
                      aria-label="Default"
                      valueLabelDisplay="auto"
                    />

                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        className={classN.inputNumberFiled}
                        value={Math.min(priceValue[0], priceValue[1])}
                        onChange={(e) => {
                          handleChangePriceInput([
                            e.target.value,
                            priceValue[1],
                          ]);
                        }}
                        label="Min"
                        variant="outlined"
                        type="number"
                        style={{ width: "48%" }}
                      />
                      <TextField
                        value={Math.max(priceValue[0], priceValue[1])}
                        onChange={(e) => {
                          handleChangePriceInput([
                            priceValue[0],
                            e.target.value,
                          ]);
                        }}
                        label="Max"
                        variant="outlined"
                        type="number"
                        style={{ width: "48%" }}
                      />
                    </Box>
                  </Box>
                </ListItem>
                {/* BrandsChanger */}
                {/* cChanger */}
                {/* {chcekSectionAndReturn()} */}
                {brands.length > 0
                  ? checkFiledAndReturn(brands, "Brands", "brand")
                  : null}
                {Colors.length > 0
                  ? checkFiledAndReturn(Colors, "Colors", "color")
                  : null}
                {PrimaryCamera.length > 0
                  ? checkFiledAndReturn(
                      PrimaryCamera,
                      "PrimaryCamera",
                      "PriCamera"
                    )
                  : null}
                {SelfiCamera.length > 0
                  ? checkFiledAndReturn(SelfiCamera, "SelfiCamera", "SelCamera")
                  : null}
                {resolutionTypes.length > 0
                  ? checkFiledAndReturn(
                      resolutionTypes,
                      "resolutionTypes",
                      "resolutionType"
                    )
                  : null}
                {screenSizes.length > 0
                  ? checkFiledAndReturn(
                      screenSizes,
                      "screenSizes",
                      "screenSize"
                    )
                  : null}
                {refreshRates.length > 0
                  ? checkFiledAndReturn(
                      refreshRates,
                      "refreshRates",
                      "refreshRate"
                    )
                  : null}
                {/* {checkConnectivity_features.length > 0 ? checkFiledAndReturn(Colors, 'Colors') : null} */}
                {operatingSystems.length > 0
                  ? checkFiledAndReturn(
                      operatingSystems,
                      "operatingSystems",
                      "operatingSystem"
                    )
                  : null}
                {systemArchitectures.length > 0
                  ? checkFiledAndReturn(
                      systemArchitectures,
                      "systemArchitectures",
                      "systemArchitecture"
                    )
                  : null}
                {batteryCapacities.length > 0
                  ? checkFiledAndReturn(
                      batteryCapacities,
                      "batteryCapacities",
                      "batteryCapacitie"
                    )
                  : null}
                {batteryTypes.length > 0
                  ? checkFiledAndReturn(
                      batteryTypes,
                      "batteryTypes",
                      "batteryType"
                    )
                  : null}
                {processorNames.length > 0
                  ? checkFiledAndReturn(
                      processorNames,
                      "processorNames",
                      "processorName"
                    )
                  : null}
                {processorBrands.length > 0
                  ? checkFiledAndReturn(
                      processorBrands,
                      "processorBrands",
                      "processorBrand"
                    )
                  : null}
                {graphicProcessors.length > 0
                  ? checkFiledAndReturn(
                      graphicProcessors,
                      "graphicProcessors",
                      "graphicProcessor"
                    )
                  : null}
                {processorCores.length > 0
                  ? checkFiledAndReturn(
                      processorCores,
                      "processorCores",
                      "processorCore"
                    )
                  : null}
                {processorTypes.length > 0
                  ? checkFiledAndReturn(
                      processorTypes,
                      "processorTypes",
                      "processorType"
                    )
                  : null}
                {numberofCores.length > 0
                  ? checkFiledAndReturn(
                      numberofCores,
                      "numberofCores",
                      "numberofCore"
                    )
                  : null}
                {rams.length > 0
                  ? checkFiledAndReturn(rams, "rams", "ram")
                  : null}
                ,
                {ramTypes.length > 0
                  ? checkFiledAndReturn(ramTypes, "ramTypes", "ramType")
                  : null}
                {storages.length > 0
                  ? checkFiledAndReturn(storages, "storages", "storage")
                  : null}
                {/* {ChecCamerFeatures()} */}
              </List>
            </Grid>

            <Grid item className={classN.productsSearchContaineer}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item className={classN.resaultSearch}>
                  {products.length === 0 ? "No" : countProducts} Results =
                  {query !== "all" && query !== "" && " : " + query}
                  {category !== "all" && "  category : " + category.split('*').join(' - ') + " / "}
                  {brand !== "all" && "  brand  : " + brand.split('*').join(' - ') + " / "}
                  {color !== "all" && "  color : " + color.split('*').join(' - ') + " / "}
                  {PriCamera !== "all" && "PriCamera : " + PriCamera.split('*').join(' -  ') + " / "}
                  {SelCamera !== "all" && "  SelCamera : " + SelCamera.split('*').join('  - ') + " / "}
                  {resolutionType !== "all" &&
                    " resolutionType : " + resolutionType.split('*').join('  - ') + " / "}
                  {screenSize !== "all" &&
                    " screenSize : " + screenSize.split('*').join('  - ') + " / "}
                  {refreshRate !== "all" &&
                    "  refreshRate : " + refreshRate.split('*').join('  - ') + " / "}
                  {operatingSystem !== "all" &&
                    "  operatingSystem : " + operatingSystem.split('*').join(' -  ') + " / "}
                  {systemArchitecture !== "all" &&
                    "  systemArchitecture : " + systemArchitecture.split('*').join(' -  ') + " / "}
                  {batteryCapacitie !== "all" &&
                    "  batteryCapacitie : " + batteryCapacitie + " / "}
                  {batteryType !== "all" &&
                    "  batteryType : " + batteryType.split('*').join(' -  ') + " / "}
                  {processorName !== "all" &&
                    "  processorName : " + processorName.split('*').join('  - ') + " / "}
                  {processorBrand !== "all" &&
                    "  processorBrand: " + processorBrand.split('*').join(' -  ') + " / "}
                  {graphicProcessor !== "all" &&
                    "  graphicProcessor : " + graphicProcessor.split('*').join(' -  ') + " / "}
                  {processorCore !== "all" &&
                    " processorCore  : " + processorCore.split('*').join('  - ') + " / "}
                  {processorType !== "all" &&
                    " processorType : " + processorType.split('*').join('  - ') + " / "}
                  {numberofCore !== "all" &&
                    " numberofCore : " + numberofCore.split('*').join(' -  ') + " / "}
                  {ram !== "all" && " : ram " + ram.split('*').join(' -  ') + " / "}
                  {ramType !== "all" && " ramType  : " + ramType.split('*').join('  - ') + " / "}
                  {storage !== "all" && " storage : " + storage.split('*').join(' -  ') + " / "}
                  {price !== "all" && " : Price " + price}
                  {rating !== "all" && " : Rating " + rating + " & up"}
                </Grid>

                <Grid item className={classN.displayNoneInMobile}>
                  <Select value={sort} onChange={sortChanger}>
                    <MenuItem value=""> Sort by</MenuItem>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="featured">Featured</MenuItem>
                    <MenuItem value="lowest">Price | Low to High</MenuItem>
                    <MenuItem value="highest">Price | High to Low</MenuItem>
                    <MenuItem value="toprated">Customer Reviews</MenuItem>
                    <MenuItem value="newest">Newest Arrivals</MenuItem>
                  </Select>
                </Grid>
              </Grid>

              <Grid>
              {(query !== "all" && query !== "") ||
                  category !== "all" ||
                  brand !== "all" ||
                  rating !== "all" ||
                  price !== "all" ||
                  color !== "all" ||
                  PriCamera !== "all" ||
                  SelCamera !== "all" ||
                  resolutionType !== "all" ||
                  screenSize !== "all" ||
                  refreshRate !== "all" ||
                  operatingSystem !== "all" ||
                  systemArchitecture !== "all" ||
                  batteryCapacitie !== "all" ||
                  batteryType !== "all" ||
                  processorName !== "all" ||
                  processorBrand !== "all" ||
                  graphicProcessor !== "all" ||
                  processorCore !== "all" ||
                  processorType !== "all" ||
                  numberofCore !== "all" ||
                  ram !== "all" ||
                  ramType !== "all" ||
                  storage !== "all" ? (
                    <Button onClick={clearSearch}>
                     Clear <CancelIcon className={classN.resaultSearchBtn} style={{margin : '5px'}} />
                    </Button>
                  ) : null}
              </Grid>

              <Grid container spacing={1} className={classN.mt1} >
                {products.slice(0, 8).map((product) => (
                  <Grid //item xs={showMultible === false ? 6 : 12}  sm={4} md={4} lg={3} xl={2}  key={product.name}
                    item
                    xs={12}
                    sm={showMultible === false ? 6 : 12}
                    md={6}
                    lg={3}
                    xl={3}
                    key={product.name}
                    // item xl={3} md={4} sm={6} xs={12}
                  >
                    <ProductBox addToCartFun={addToCartFun} product={product} />
                  </Grid>
                ))}
              </Grid>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  margin: "1.5rem 0",
                }}
              >

                {/*   StyledPagination*/}
                <Pagination
                  className={classN.mt1}
                  defaultPage={parseInt(query.page || "1")}
                  count={pages}
                  onChange={pageChanger}
                  // count={6}
                  siblingCount={0}
                  // size="small"
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  await db.connect();
  const pageSize = query.pagSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const brand = query.brand ? query.brand.split("*") : "";
  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const color = query.color ? query.color.split("*") : "";
  // console.log('color', color)
  const searchQuery = query.query || "";
  const maxPrimaryCamera = query.PriCamera ? query.PriCamera.split("*") : "";
  //const maxPrimaryCamera  = query.PriCamera || ''
  const maxSelfiCamera = query.SelCamera ? query.SelCamera.split("*") : "";
  const resolutionType = query.resolutionType
    ? query.resolutionType.split("*")
    : "";
  const screenSize = query.screenSize ? query.screenSize.split("*") : "";
  const refreshRate = query.refreshRate ? query.refreshRate.split("*") : "";
  const operatingSystem = query.operatingSystem
    ? query.operatingSystem.split("*")
    : "";
  const systemArchitecture = query.systemArchitecture
    ? query.systemArchitecture.split("*")
    : "";
  const batteryCapacitie = query.batteryCapacitie
    ? query.batteryCapacitie.split("*")
    : "";
  const batteryType = query.batteryType ? query.batteryType.split("*") : "";

  const processorName = query.processorName
    ? query.processorName.split("*")
    : "";
  const processorBrand = query.processorBrand
    ? query.processorBrand.split("*")
    : "";
  const graphicProcessor = query.graphicProcessor
    ? query.graphicProcessor.split("*")
    : "";
  const processorCore = query.processorCore
    ? query.processorCore.split("*")
    : "";
  const processorType = query.processorType
    ? query.processorType.split("*")
    : "";
  const numberofCore = query.numberofCore ? query.numberofCore.split("*") : "";
  const ram = query.ram ? query.ram.split("*") : "";

  const ramType = query.ramType ? query.ramType.split("*") : "";
  const storage = query.storage ? query.storage.split("*") : "";

  //     display_features.resolutionType
  // display_features.screenSize
  // display_features.refreshRate

  //maxSelfiCamera

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};

  const categoryFilter = category && category !== "all" ? { category } : {};

  const brandFilter = brand && brand !== "all" ? { brand } : {};
  const colorFilter = color && color !== "all" ? { color } : {};

  const maxPrimaryCameraFilter =
    maxPrimaryCamera && maxPrimaryCamera !== "all"
      ? { "camera.maxPrimaryCamera": maxPrimaryCamera }
      : null;
  const maxSelfiCameraFilter =
    maxSelfiCamera && maxSelfiCamera !== "all"
      ? { "camera.maxSelfiCamera": maxSelfiCamera }
      : null;

  const resolutionTypeFilter =
    resolutionType && resolutionType !== "all"
      ? { "display_features.resolutionType": resolutionType }
      : null;
  const screenSizeFilter =
    screenSize && screenSize !== "all"
      ? { "display_features.screenSize": screenSize }
      : null;
  const refreshRateFilter =
    refreshRate && refreshRate !== "all"
      ? { "display_features.refreshRate": refreshRate }
      : null;

  const operatingSystemFilter =
    operatingSystem && operatingSystem !== "all"
      ? { "operating_system.operatingSystem": operatingSystem }
      : null;
  const systemArchitectureFilter =
    systemArchitecture && systemArchitecture !== "all"
      ? { "operating_system.systemArchitecture": systemArchitecture }
      : null;

  const batteryCapacitieFilter =
    batteryCapacitie && batteryCapacitie !== "all"
      ? { "power_features.batteryCapacity": batteryCapacitie }
      : null;
  const batteryTypeFilter =
    batteryType && batteryType !== "all"
      ? { "power_features.batteryType": batteryType }
      : null;

  const processorNameFilter =
    processorName && processorName !== "all"
      ? { "processor_features.processorName": processorName }
      : null;
  const processorBrandFilter =
    processorBrand && processorBrand !== "all"
      ? { "processor_features.processorBrand": processorBrand }
      : null;
  const graphicProcessorFilter =
    graphicProcessor && graphicProcessor !== "all"
      ? { "processor_features.graphicProcessor": graphicProcessor }
      : null;
  const processorCoreFilter =
    processorCore && processorCore !== "all"
      ? { "processor_features.processorCore": processorCore }
      : null;
  const processorTypeFilter =
    processorType && processorType !== "all"
      ? { "processor_features.processorType": processorType }
      : null;
  const numberofCoreFilter =
    numberofCore && numberofCore !== "all"
      ? { "processor_features.numberofCores": numberofCore }
      : null;
  const ramFilter = ram && ram !== "all" ? { "storage.ram": ram } : null;
  const ramTypeFilter =
    ramType && ramType !== "all" ? { "storage.ramType": ramType } : null;
  const storageFilter =
    storage && storage !== "all"
      ? { "storage.internalStorage": storage }
      : null;

  // constprocessor_features.numberofCores

  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating), // gratee than 3 stars
          },
        }
      : {};

  //

  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]), // grater than 10
            $lte: Number(price.split("-")[1]), // lest than 15
          },
        }
      : {};

  const order = //sort
    sort === "featured"
      ? { featured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  //const categories = await Product.find().distinct('category')

  //const categories = await Category.find({ initialParent : category}).lean();
  let categories = await Category.find({
    $or: [{ initialParent: category }, { slug: category }],
  }).lean();

  categories.length > 0 ? null : (categories = await Category.find().lean());

  let catgoriesQuery = [];
  let searchCategories = [];

  // ================>
  let listCategories = [];
  let categoryItem = {};

  async function myFetch(callBack) {
    categoryItem = await Category.findOne({ slug: category });
    listCategories = await Category.find({});

    callBack();

    //return await {listCategories, categoryItem, };
  }

  const myFetchThen = () => {
    //console.log('listCategories',listCategories.length)
    if (categoryItem && "slug" in categoryItem) {
      searchCategories.push(categoryItem.slug);
      const findAllCategories = (listCategories, categoryItem) => {
        if (categoryItem && listCategories.length > 0) {
          listCategories.map((e) => {
            if (e.initialParent && categoryItem) {
              if (e.initialParent == categoryItem.slug) {
                catgoriesQuery.push({ name: e.slug, prent: e.initialParent });
                searchCategories.push(e.slug);
                findAllCategories(listCategories, e);
                //console.log('fonding ==>', e)c
              }
            }
          });
        }
      };

      findAllCategories(listCategories, categoryItem);
    }
    //console.log('in searchCategories', searchCategories)
    //return searchCategories
  };

  if (category && category !== "all") {
    await myFetch(myFetchThen);
  }

  // =========================//
  var sea = ["Shirts", "Pants"];
  //Just for wating
  // console.log("searchCategories before", searchCategories)
  // //const searchCategoriesFinally = await myFetch(myFetchThen)
  // console.log("searchCategories after", searchCategories)

  const categoryFilterAdv =
    category && category !== "all"
      ? { category: { $in: searchCategories } }
      : {};
  //const queryFilterAdv= searchQuery && searchQuery !== 'all' ? {name : searchQuery} : {}
  //console.log("queryFilterAdv", queryFilterAdv)

  //=========================>

  const productsDocs = await Product.find(
    {
      ...queryFilter,
      //...categoryFilter,
      //category:'Pants',{$in: searchCategories }
      //"category": {$in: sea },

      //category: category && category !== 'all' ?{$in: searchCategories } : '',
      ...categoryFilterAdv,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
      ...colorFilter,
      ...maxPrimaryCameraFilter,
      ...maxSelfiCameraFilter,
      ...resolutionTypeFilter,
      ...screenSizeFilter,
      ...refreshRateFilter,
      ...operatingSystemFilter,
      ...systemArchitectureFilter,
      ...batteryCapacitieFilter,
      ...batteryTypeFilter,
      ...processorNameFilter,
      ...processorBrandFilter,
      ...graphicProcessorFilter,
      ...processorCoreFilter,
      ...processorTypeFilter,
      ...numberofCoreFilter,
      ...ramFilter,
      ...ramTypeFilter,
      ...storageFilter,
    },
    "-reviews"
  )
    .sort(order)
    .skip(pageSize * (page - 1)) //pagenate
    .limit(pageSize)
    .lean(); //convert It to pure Java secript object

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    //...categoryFilter,
    // category: {$in: searchCategories },
    //category: category && category !== 'all' ?{$in: searchCategories } : '',
    ...categoryFilterAdv,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
    ...colorFilter,
    ...maxPrimaryCameraFilter,
    ...maxSelfiCameraFilter,
    ...resolutionTypeFilter,
    ...screenSizeFilter,
    ...refreshRateFilter,
    ...operatingSystemFilter,
    ...systemArchitectureFilter,
    ...batteryCapacitieFilter,
    ...batteryTypeFilter,
    ...processorNameFilter,
    ...processorBrandFilter,
    ...graphicProcessorFilter,
    ...processorCoreFilter,
    ...processorTypeFilter,
    ...numberofCoreFilter,
    ...ramFilter,
    ...ramTypeFilter,
    ...storageFilter,
  });

  const maxSort = await Product.find({
    ...queryFilter,
    //...categoryFilter,
    // category: {$in: searchCategories },
    //category: category && category !== 'all' ?{$in: searchCategories } : '',
    ...categoryFilterAdv,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  }).sort({ price: -1 });

  const firstMaxSortPrice = await Product.find({
    ...queryFilter,
    //...categoryFilter,
    // category: {$in: searchCategories },
    //category: category && category !== 'all' ?{$in: searchCategories } : '',
    ...categoryFilterAdv,
    //...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  }).sort({ price: -1 });

  const brands = await Product.find(
    { ...queryFilter, ...categoryFilterAdv },
    "-reviews"
  ).distinct("brand");

  const productFildes = await Product.find({
    ...queryFilter,
    ...categoryFilterAdv,
  }).select(
    "color camera display_features connectivity_features operating_system power_features processor_features storage"
  );

  const Colors = [];
  const PrimaryCamera = [];
  const SelfiCamera = [];
  const resolutionTypes = [];
  const screenSizes = [];
  const refreshRates = [];
  const operatingSystems = [];
  const systemArchitectures = [];
  let checkConnectivity_features = false;

  const batteryCapacities = [];
  const batteryTypes = [];

  const processorNames = [];
  const processorBrands = [];
  const graphicProcessors = [];
  const processorCores = [];
  const processorTypes = [];
  const numberofCores = [];
  const rams = [];
  const ramTypes = [];
  const storages = [];

  productFildes.map((product) => {
    if (product.color && Colors.indexOf(product.color) === -1) {
      Colors.push(product.color);
    }

    if (product.camera) {
      if (
        product.camera.maxPrimaryCamera &&
        PrimaryCamera.indexOf(product.camera.maxPrimaryCamera) === -1
      ) {
        PrimaryCamera.push(product.camera.maxPrimaryCamera);
      }
      if (
        product.camera.maxSelfiCamera &&
        SelfiCamera.indexOf(product.camera.maxSelfiCamera) === -1
      ) {
        SelfiCamera.push(product.camera.maxSelfiCamera);
      }
    }

    if (product.display_features) {
      if (
        product.display_features.resolutionType &&
        resolutionTypes.indexOf(
          product.display_features.resolutionType.trim()
        ) === -1
      ) {
        resolutionTypes.push(product.display_features.resolutionType.trim());
      }

      if (
        product.display_features.screenSize &&
        screenSizes.indexOf(product.display_features.screenSize) === -1
      ) {
        screenSizes.push(product.display_features.screenSize);
      }

      if (
        product.display_features.refreshRate &&
        refreshRates.indexOf(product.display_features.refreshRate) === -1
      ) {
        refreshRates.push(product.display_features.refreshRate);
      }
    }

    if (product.connectivity_features) {
      checkConnectivity_features = true;
    }
    if (product.operating_system) {
      if (
        product.operating_system.operatingSystem &&
        operatingSystems.indexOf(
          product.operating_system.operatingSystem.trim()
        ) === -1
      ) {
        operatingSystems.push(product.operating_system.operatingSystem.trim());
      }
      if (
        product.operating_system.systemArchitecture &&
        systemArchitectures.indexOf(
          product.operating_system.systemArchitecture
        ) === -1
      ) {
        systemArchitectures.push(product.operating_system.systemArchitecture);
      }
    }

    if (product.power_features) {
      if (
        product.power_features.batteryCapacity &&
        batteryCapacities.indexOf(product.power_features.batteryCapacity) === -1
      ) {
        batteryCapacities.push(product.power_features.batteryCapacity);
      }
      if (
        product.power_features.batteryType &&
        batteryTypes.indexOf(product.power_features.batteryType.trim()) === -1
      ) {
        batteryTypes.push(product.power_features.batteryType.trim());
      }
    }

    if (product.processor_features) {
      if (
        product.processor_features.processorName &&
        processorNames.indexOf(
          product.processor_features.processorName.trim()
        ) === -1
      ) {
        processorNames.push(product.processor_features.processorName.trim());
      }
      if (
        product.processor_features.processorBrand &&
        processorBrands.indexOf(
          product.processor_features.processorBrand.trim()
        ) === -1
      ) {
        processorBrands.push(product.processor_features.processorBrand.trim());
      }

      if (
        product.processor_features.graphicProcessor &&
        graphicProcessors.indexOf(
          product.processor_features.graphicProcessor.trim()
        ) === -1
      ) {
        graphicProcessors.push(
          product.processor_features.graphicProcessor.trim()
        );
      }

      if (
        product.processor_features.processorCore &&
        processorCores.indexOf(
          product.processor_features.processorCore.trim()
        ) === -1
      ) {
        processorCores.push(product.processor_features.processorCore.trim());
      }
      if (
        product.processor_features.processorType &&
        processorTypes.indexOf(
          product.processor_features.processorType.trim()
        ) === -1
      ) {
        processorTypes.push(product.processor_features.processorType.trim());
      }

      if (
        product.processor_features.numberofCores &&
        numberofCores.indexOf(product.processor_features.numberofCores) === -1
      ) {
        numberofCores.push(product.processor_features.numberofCores);
      }
    }

    if (product.storage) {
      if (product.storage.ram && rams.indexOf(product.storage.ram) === -1) {
        rams.push(product.storage.ram);
      }
      if (
        product.storage.ramType &&
        ramTypes.indexOf(product.storage.ramType.trim()) === -1
      ) {
        ramTypes.push(product.storage.ramType.trim());
      }

      if (
        product.storage.internalStorage &&
        storages.indexOf(product.storage.internalStorage) === -1
      ) {
        storages.push(product.storage.internalStorage);
      }
    }
  });

  // .lean()

  // console.log('Colors', Colors)
  // console.log('PrimaryCamera', PrimaryCamera)
  // console.log('SelfiCamera', SelfiCamera)
  // console.log('resolutionType', resolutionTypes)
  // console.log('screenSizes', screenSizes)
  // console.log('refreshRates', refreshRates)
  // console.log('checkConnectivity_features', checkConnectivity_features)
  // console.log('operatingSystems', operatingSystems)
  // console.log('systemArchitectures', systemArchitectures)

  // console.log('batteryCapacities', batteryCapacities)
  // console.log('batteryTypes', batteryTypes)
  // console.log('processorName', processorNames)
  // console.log('processorBrands', processorBrands)
  // console.log('graphicProcessors', graphicProcessors)
  // console.log('processorCores', processorCores)
  // console.log('processorTypes', processorTypes)
  // console.log('numberofCores', numberofCores)

  // console.log('rams', rams)
  // console.log('ramTypes', ramTypes)
  // console.log('storages', storages)

  await db.disconnect();

  const products = productsDocs.map(db.convertDocToObject);
  // console.log('maxSort', maxSort[0].price)
  // console.log('minSort', maxSort[maxSort.length-1].price)

  // console.log('AllCategories', AllCategories)
  const maxSortNew = maxSort.length > 0 ? maxSort[0].price : 0;
  const minSortNew = maxSort.length > 0 ? maxSort[maxSort.length - 1].price : 0;

  const firstMaxPrice =
    firstMaxSortPrice.length > 0 ? firstMaxSortPrice[0].price : 0;
  const firstMinPrice =
    firstMaxSortPrice.length > 0
      ? firstMaxSortPrice[firstMaxSortPrice.length - 1].price
      : 0;

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories: categories.map(db.convertDocToObject),
      brands,
      maxPrice: maxSortNew,
      minPrice: minSortNew,
      firstMaxPrice: firstMaxPrice,
      firstMinPrice: firstMinPrice,
      //AllCategories : AllCategories.map(db.convertDocToObject),

      Colors,
      PrimaryCamera,
      SelfiCamera,
      resolutionTypes,
      screenSizes,
      refreshRates,
      checkConnectivity_features,
      operatingSystems,
      systemArchitectures,
      batteryCapacities,
      batteryTypes,
      processorNames,
      processorBrands,
      graphicProcessors,
      processorCores,
      processorTypes,
      numberofCores,
      rams,
      ramTypes,
      storages,
    },
  };
}
