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
  FormControl,
  FormControlLabel,
  Checkbox,
  InputLabel,
  OutlinedInput,
  Breadcrumbs,
  IconButton,
  Menu,
  Modal,
  Fade,
  Box,
  Backdrop,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  
} from "@material-ui/core";

import { Pagination } from "@material-ui/lab";
import Preloader from "../../components/Layout/Preloader";
import { useForm, Controller } from "react-hook-form";

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

import useStyles from "../../utils/styles/styles";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
import Leftbar from "../../components/Layout/Leftbar";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    //
    case "CREATE_PRODUCT_REQUEST":
      return { ...state, loadingCreateProduct: true };
    case "CREATE_PRODUCT_SUCCESS":
      return { ...state, loadingCreateProduct: false };
    case "CREATE_PRODUCT_FAIL":
      return { ...state, loadingCreateProduct: false };

    //
    case "DELETE_PRODUCT_REQUEST":
      return { ...state, loadingDeleteProduct: true };
    case "DELETE_PRODUCT_SUCCESS":
      return {
        ...state,
        loadingDeleteProduct: false,
        productSuccessDelete: true,
      };
    case "DELETE_PRODUCT_FAIL":
      return { ...state, loadingDeleteProduct: false };

    case "DELETE_PRODUCT_RESET":
      return {
        ...state,
        loadingDeleteProduct: false,
        productSuccessDelete: false,
      };

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

function AdminProducts() {
  const { state } = useContext(Store);
  const router = useRouter();

  const [productsDoc, setProductsDoc] = useState({});
  const [page, setPage] = useState(1)

  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const [color, setColor] = useState("");

  const [isFeatured, setIsFeatured] = useState(false);
  const [loadingAddNewProduct, setLoadingAddNewProduct] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [itemOpen, setItemOpen] = useState(null);

  const [openAddModal, setOpenAddModal] = useState(false);

  const [imagesTest, setImagesTest] = useState([]);
  const [previewImagesTest, setPreviewImagesTest] = useState([]);

  
  const [featuredImageObject, setFeaturedImageObject] = useState(null);
  const [featuredImagePrev, setFeaturedImagePrev] = useState(null);
  const [featuredImage, setFeaturedImage] = useState('');


  const [videoRecording, setVideoRecording] = useState(false);
  const [hdRecording, setHdRecording] = useState(false);
  const [fullHDRecording, setFullHDRecording] = useState(false);

  const [hdRecordingDisplay, setHdRecordingDisplay] = useState(false);
  const [touchScreen, setTouchScreen] = useState(false);
  const [hdGameSupport, setHdGameSupport] = useState(false);

  const [supported4G, setSupported4G] = useState(false);
  const [supported5G, setSupported5G] = useState(false);
  const [wifiHotspot, setWifiHotspot] = useState(false);
  const [nfc, setNfc] = useState(false);
  const [gps, setGps] = useState(false);
  const [rg45, setRg45] = useState(false);
  const [radioSupport, setRadioSupport] = useState(false);
  const [headphoneJack, setHeadphoneJack] = useState(false);


  const [supportedAppNetflix, setSupportedAppNetflix] = useState(false);
  const [supportedAppYoutube, setSupportedAppYoutube] = useState(false);
  const [supportedAppDisney, setSupportedAppDisney] = useState(false);
  const [supportedApps, setSupportedApps] = useState(false);
  const [supportedBluetooth, setSupportedBluetooth] = useState(false);
  const [screenMirroring, setScreenMirroring] = useState(false);
  const [supportedMobileOperatingSystem, setSupportedMobileOperatingSystem] = useState(false);
  const [wirelessLanAdapter, setWirelessLanAdapter] = useState(false);

  const [quickCharging, setQuickCharging] = useState(false);

  
    


  




  



  const colors = [
    "beige",
    "black",
    "blue",
    "brown",
    "green",
    "grey",
    "maroon",
    "orange",
    "pink",
    "purple",
    "red",
    "viollet",
    "white",
    "yellow",
  ];

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  const closeOpenAddModal = () => {
    setOpenAddModal(false);
  };

  const handleClickMenu = (event, item) => {
    setAnchorEl(event.currentTarget);
    setItemOpen(item);
    // console.log('event.currentTarget', event.currentTarget)
  };

  const [breadArray, setBreadArray] = useState([
    { name: "home", link: "/" },
    { name: "admin dashboard", link: "/admin/dashboard" },
    { name: "products", link: "/admin/products" },
  ]);

  const { userInfo } = state;

  const classN = useStyles();

  const [
    {
      loading,
      loadingCreateProduct,
      loadingDeleteProduct,
      productSuccessDelete,
      error,
      products,
      loadingUpload,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      // try {
      //   dispatch({ type: "FETCH_REQUEST" });
      //   const { data } = await axios.get(`/api/admin/products`, {
      //     headers: { authorization: `Bearer ${userInfo.token}` },
      //   });
      //   dispatch({ type: "FETCH_SUCCESS", payload: data });
      // } catch (err) {
      //   dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      // }

      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.post(`/api/admin/products/productswithpage`, {page : 1, }, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        setProductsDoc(data)
       dispatch({ type: "FETCH_SUCCESS", payload: data.products });

        // console.log('products wiwth page', data)
      } catch (err) {
        // console.log('products wiwth page error', error)
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });

      }
    };
    if (productSuccessDelete) {
      dispatch({ type: "DELETE_PRODUCT_RESET" });
    } else {
      fetchData();
    }

    //        fetchData();

    //console.log('summary.salesData.length', summary.salesData)
  }, [productSuccessDelete]);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        // dispatch({ type: 'FETCH_BRANDS_REQUEST' });
        const { data } = await axios.get(`/api/admin/brands`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        // dispatch({ type: 'FETCH_BRANDS_SUCCESS',/* payload: data*/ });
        setBrands(data);
      } catch (err) {
        // dispatch({ type: 'FETCH_BRANDS_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        // dispatch({ type: 'FETCH_CATEGORIES_REQUEST' });
        const { data } = await axios.get(`/api/admin/categories`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        // dispatch({ type: 'FETCH_CATEGORIES_SUCCESS',/* payload: data*/ });
        setCategories(data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
        // dispatch({ type: 'FETCH_CATEGORIES_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, []);







  
  useEffect(() => {
    // console.log('imagesTest update',)
   
  }, [imagesTest]);

  useEffect(() => {
    fetchDataPage()
  }, []);

  const fetchDataPage = async (pageN) => {
    try {
      const { data } = await axios.post(`/api/admin/products/productswithpage`, {page : pageN? pageN : 1, }, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setProductsDoc(data)
      dispatch({ type: "FETCH_SUCCESS", payload: data.products });

      console.log('products wiwth page', data)
    } catch (err) {
      console.log('products wiwth page error', error)
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

 
  const pageChanger = (e, pageN) => {
    // console.log('page', pageN)
    setPage(pageN);
    fetchDataPage(pageN)
  };
  const deleteProductFun = async (productId) => {
    if (!window.confirm("Are you sure want te delet this item ?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_PRODUCT_REQUEST" });

      await axios.delete(
        `/api/admin/products/${productId}`,
        //{}, delete handler don't accept form body
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );

      dispatch({ type: "DELETE_PRODUCT_SUCCESS" });
      enqueueSnackbar("Product Deleted successfully", { variant: "success" });
      //router.push(`/admin/product/${data.product._id}`)
    } catch (err) {
      dispatch({ type: "DELETE_PRODUCT_FAIL" });

      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const addNewProduct = async ({
    name,
    description,
    price,
    countInStock,
    color_details,
    model_number,
    model_name,
    launch_year,
    in_the_box,
    internalStorage,
    expandableStorage,
    supportedMemoryCardType,
    memoryCardSlotType,
    ram,
    ramType,
    ssdCapacity,
    hddCapacity,
    ramFrequency,
    cache,
    numberOfSpeakers,
    speakerOutputRMS,
    internalMic,
    speakerType,
    soundTechnology,
    soundMode,
    soundEnhancements,
    surroundSound,
    supportedAudioFormats,
    otherAudioFeatures,
    soundProperties,
    pictureEngine,
    digitalTVReception,
    brightness,
    refreshRate,
    viewAngle,
    ledDisplayType,
    aspectRatio,
    supportedVideoFormats,
    otherVideoFeatures,
    screenSize,
    resolutionX,
    resolutionY,
    resolutionType,
    gpu,
    //hdRecordingDisplay,
    //touchScreen,
    screenType,
    displayColors,
    //hdGameSupport,
    refreshRateDisplay,
    otherDisplayFeatures,
    operatingSystem,
    operatingSystemArchitecture,
    systemArchitecture,
    operatingFrequency,
    processorType,
    processorCore,
    primaryClockSpeed,
    secondaryClockSpeed,
    othersClockSpeed,
    dedicatedGraphicMemoryType,
    dedicatedGraphicMemory,
    processorBrand,
    processorName,
    processorGeneration,
    numberofCores,
    graphicProcessor,
    primaryCamera,
    selfiCamera,
    maxPrimaryCamera,
    maxSelfiCamera,
    primaryCameraFeatures,
    selfiCameraFeatures,

    webCamera,
    flash,
    // videoRecording,
    // hdRecording,
    // fullHDRecording,
    videoRecordingResolution,
    frameRate,
    digitalZoom,
    networkType,
    maxNetworkType,
    // supported4G,
    // supported5G,
    supportedNetworks,
    internetConnectivity,
    wifi,
    // wifiHotspot,
    bluetooth,
    audioJack,
    usbType,
    hdmiType,
    // nfc,
    // gps,
    gprs,
    // rg45,
    mapSupport,
    usbPorts,
    hdmiPorts,
    // radioSupport,
    // headphoneJack,
    sensors,
    wirelessLAN,
    ethernet,
    // supportedAppNetflix,
    // supportedAppYoutube,
    // supportedAppDisney,
    // supportedApps,
    // supportedBluetooth,
    // screenMirroring,
    // supportedMobileOperatingSystem,
    soundModeTv,
    numberofCoresTv,
    processor,
    graphicProcessorTv,
    ramCapacity,
    storageMemory,
    operatingSystemTv,
    appStoreType,
    // wirelessLanAdapter,
    supportedDevicesForCasting,
    otherInternetFeatures,
    powerRequirement,
    powerConsumption,
    powerOutput,
    otherPowerFeatures,
    batteryCapacity,
    batteryType,
    // quickCharging,
    batteryBackup,
    batteryCell,
    powerSupply,
    width,
    height,
    depth,
    weight,
    material,
    percentage,
    additional_features,
    installation_demo_details,
    capacity
  }) => {

    console.log('', )
    //  console.log('name', name );
    //  console.log('description', description );
    //  console.log('price', price);
    //  console.log('color_details', color_details);
    //  console.log('model_number', model_number );
    //  console.log('model_name', model_name);
    //  console.log('launch_year', launch_year );
    //  console.log('in_the_box', in_the_box );

    //  console.log('internalStorage', internalStorage );
    //  console.log('expandableStorage', expandableStorage );
    //  console.log('supportedMemoryCardType', supportedMemoryCardType );
    //  console.log('memoryCardSlotType', memoryCardSlotType );
    //  console.log('ram', ram );
    //  console.log('ramType', ramType );
    //  console.log('ssdCapacity', ssdCapacity );
    //  console.log('hddCapacity', hddCapacity );
    //  console.log('ramFrequency', ramFrequency );
    //  console.log('cache',cache );


    //  console.log('numberOfSpeakers',numberOfSpeakers );
    //  console.log('speakerOutputRMS',speakerOutputRMS );
    //  console.log('internalMic',internalMic );
    //  console.log('speakerType',speakerType );
    //  console.log('soundTechnology',soundTechnology );
    //  console.log('soundMode',soundMode );
    //  console.log('soundEnhancements',soundEnhancements );
    //  console.log('surroundSound', surroundSound );
    //  console.log('supportedAudioFormats', supportedAudioFormats );
    //  console.log('otherAudioFeatures', otherAudioFeatures );
    //  console.log('soundProperties', soundProperties );


    //  console.log('pictureEngine', pictureEngine );
    //  console.log('digitalTVReception', digitalTVReception );
    //  console.log('brightness', brightness );
    //  console.log('refreshRateDisplay', refreshRateDisplay );
    //  console.log('viewAngle', viewAngle );
    //  console.log('ledDisplayType', ledDisplayType );
    //  console.log('aspectRatio', aspectRatio );
    //  console.log('supportedVideoFormats', supportedVideoFormats );
    //  console.log('otherVideoFeatures', otherVideoFeatures );


    //  console.log('screenSize', screenSize );
    //  console.log('resolutionX', resolutionX );
    //  console.log('resolutionY', resolutionY );
    //  console.log('resolutionType', resolutionType );
    //  console.log('gpu', gpu );
    //  console.log('hdRecordingDisplay', hdRecordingDisplay );
    //  console.log('touchScreen', touchScreen );
    //  console.log('screenType', screenType );
    //  console.log('displayColors', displayColors );
    //  console.log('hdGameSupport', hdGameSupport );
    //  console.log('refreshRate', refreshRate );
    //  console.log('otherDisplayFeatures', otherDisplayFeatures );



    //  console.log('operatingSystem', operatingSystem );
    //  console.log('operatingSystemArchitecture', operatingSystemArchitecture );
    //  console.log('systemArchitecture', systemArchitecture );
    //  console.log('operatingFrequency', operatingFrequency );



    //  console.log('processorType', processorType );
    //  console.log('processorCore', processorCore );
    //  console.log('primaryClockSpeed', primaryClockSpeed );
    //  console.log('secondaryClockSpeed', secondaryClockSpeed );
    //  console.log('othersClockSpeed', othersClockSpeed );
    //  console.log('dedicatedGraphicMemoryType', dedicatedGraphicMemoryType );
    //  console.log('dedicatedGraphicMemory', dedicatedGraphicMemory );
    //  console.log('processorBrand', processorBrand );
    //  console.log('processorName', processorName );
    //  console.log('processorGeneration', processorGeneration );
    //  console.log('numberofCores', numberofCores );
    //  console.log('graphicProcessor', graphicProcessor );



    //  console.log('primaryCamera', primaryCamera );
    //  console.log('selfiCamera', selfiCamera );
    //  console.log('maxPrimaryCamera', maxPrimaryCamera );
    //  console.log('maxSelfiCamera', maxSelfiCamera );
    //  console.log('primaryCameraFeatures', primaryCameraFeatures );
    //  console.log('selfiCameraFeatures', selfiCameraFeatures );
    //  console.log('webCamera', webCamera );
    //  console.log('flash', flash );
    //  console.log('videoRecording', videoRecording );
    //  console.log('hdRecording', hdRecording );
    //  console.log('fullHDRecording', fullHDRecording );
    //  console.log('videoRecordingResolution', videoRecordingResolution );
    //  console.log('frameRate', frameRate );
    //  console.log('digitalZoom', digitalZoom );


    //  console.log('networkType', networkType );
    //  console.log('maxNetworkType', maxNetworkType );
    //  console.log('supported4G', supported4G );
    //  console.log('supported5G', supported5G );
    //  console.log('supportedNetworks', supportedNetworks );
    //  console.log('internetConnectivity', internetConnectivity );
    //  console.log('wifi', wifi );
    //  console.log('wifiHotspot', wifiHotspot );
    //  console.log('bluetooth', bluetooth );
    //  console.log('audioJack', audioJack );
    //  console.log('usbType', usbType );
    //  console.log('hdmiType', hdmiType );
    //  console.log('nfc', nfc );
    //  console.log('gps', gps );
    //  console.log('gprs', gprs );
    //  console.log('rg45', rg45 );
    //  console.log('mapSupport', mapSupport );
    //  console.log('usbPorts', usbPorts );
    //  console.log('hdmiPorts', hdmiPorts );
    //  console.log('radioSupport', radioSupport );
    //  console.log('headphoneJack', headphoneJack );
    //  console.log('sensors', sensors );
    //  console.log('wirelessLAN', wirelessLAN );
    //  console.log('ethernet', ethernet );


    //  console.log('supportedAppNetflix', supportedAppNetflix );
    //  console.log('supportedAppYoutube', supportedAppYoutube );
    //  console.log('supportedAppDisney', supportedAppDisney );
    //  console.log('supportedApps', supportedApps );
    //  console.log('supportedBluetooth', supportedBluetooth );
    //  console.log('screenMirroring', screenMirroring );
    //  console.log('supportedMobileOperatingSystem', supportedMobileOperatingSystem );
    //  console.log('soundModeTv', soundModeTv );
    //  console.log('numberofCores', numberofCores );
    //  console.log('processor', processor );
    //  console.log('graphicProcessorTv', graphicProcessorTv );
    //  console.log('ramCapacity', ramCapacity );
    //  console.log('storageMemory', storageMemory );
    //  console.log('operatingSystemTv', operatingSystemTv );
    //  console.log('appStoreType', appStoreType );
    //  console.log('wirelessLanAdapter', wirelessLanAdapter );
    //  console.log('supportedDevicesForCasting', supportedDevicesForCasting );
    //  console.log('otherInternetFeatures', otherInternetFeatures );



    //  console.log('powerRequirement', powerRequirement );
    //  console.log('powerConsumption', powerConsumption );
    //  console.log('powerOutput', powerOutput );
    //  console.log('otherPowerFeatures', otherPowerFeatures );
    //  console.log('batteryCapacity', batteryCapacity );
    //  console.log('batteryType', batteryType );
    //  console.log('quickCharging', quickCharging );
    //  console.log('batteryBackup', batteryBackup );
    //  console.log('batteryCell', batteryCell );
    //  console.log('powerSupply', powerSupply );


    //  console.log('width', width );
    //  console.log('height', height );
    //  console.log('depth', depth );
    //  console.log('weight', weight );

    //  console.log('material', material );
    //  console.log('percentage', percentage );
    //  console.log('additional_features', additional_features );
    //  console.log('installation_demo_details', installation_demo_details );
   
    if(!imagesTest.length > 0) {
      enqueueSnackbar('you must enter at least one image for product', { variant: "error" });
      return;
    }
    
    
    // featuredImageObject
    setLoadingAddNewProduct(true)
    let featuredImage = await uploadFeaturedImageFun()
    let arrayProductImages = await sendImagesData()
    // console.log('arrayProductImages aray ', arrayProductImages );

      if (arrayProductImages.length > 0) {
      let arr = []
      arrayProductImages.map(imageUrl=> {
        arr.push({img : imageUrl})
      })

     let storage = {
      internalStorage : internalStorage ? internalStorage : 0,
      expandableStorage : expandableStorage ? expandableStorage : 0,
      supportedMemoryCardType : supportedMemoryCardType ? supportedMemoryCardType : '',
      memoryCardSlotType : memoryCardSlotType ? memoryCardSlotType : '',
      ram : ram ? ram : 0,
      ramType : ramType ? ramType : '',
      ssdCapacity : ssdCapacity ? ssdCapacity : 0,
      hddCapacity : hddCapacity ? hddCapacity : 0,
      ramFrequency : ramFrequency ? ramFrequency : 0,
      cache : cache ? cache : '',
     }

    let audio_features = {
      numberOfSpeakers : numberOfSpeakers ? numberOfSpeakers : 0 ,
      speakerOutputRMS : speakerOutputRMS ? speakerOutputRMS : 0 ,
      internalMic : internalMic ? internalMic : '' ,
      speakerType : speakerType ? speakerType : '' ,
      soundTechnology : soundTechnology ? soundTechnology : '' ,
      soundMode : soundMode ? soundMode : '' ,
      soundEnhancements : soundEnhancements ? soundEnhancements : '' ,
      surroundSound : surroundSound ? surroundSound : '' ,
      supportedAudioFormats : supportedAudioFormats ? supportedAudioFormats : '' ,
      otherAudioFeatures : otherAudioFeatures ? otherAudioFeatures : '' ,
      soundProperties : soundProperties ? soundProperties : '' ,
     }

    let video_features = {
      pictureEngine : pictureEngine ? pictureEngine : '' ,
      digitalTVReception : digitalTVReception ? digitalTVReception : '' ,
      brightness : brightness ? brightness : 0 ,
      refreshRateDisplay : refreshRateDisplay ? refreshRateDisplay : 0 ,
      viewAngle : viewAngle ? viewAngle : 0 ,
      ledDisplayType : ledDisplayType ? ledDisplayType : '' ,
      aspectRatio : aspectRatio ? aspectRatio : '' ,
      supportedVideoFormats : supportedVideoFormats ? supportedVideoFormats : '' ,
      otherVideoFeatures : otherVideoFeatures ? otherVideoFeatures : '' ,
     }

    let display_features= {
      screenSize : screenSize? screenSize : 0,
      resolutionX : resolutionX? resolutionX : 0,
      resolutionY : resolutionY? resolutionY : 0,
      resolutionType : resolutionType? resolutionType : '',
      gpu : gpu? gpu : '',
      hdRecording : hdRecordingDisplay? hdRecordingDisplay : false,  //false!true
      touchScreen : touchScreen? touchScreen :  false,  //false!true
      screenType : screenType? screenType : '',
      displayColors : displayColors? displayColors : 0,
      hdGameSupport : hdGameSupport? hdGameSupport :  false,  //false!true
      refreshRate : refreshRate? refreshRate : 0,
      otherDisplayFeatures : otherDisplayFeatures? otherDisplayFeatures : '',
     }

    let operating_system = {
      operatingSystem : operatingSystem ? operatingSystem : '' ,
      operatingSystemArchitecture : operatingSystemArchitecture ? operatingSystemArchitecture : '' ,
      systemArchitecture : systemArchitecture ? systemArchitecture : 0 ,
      operatingFrequency : operatingFrequency ? operatingFrequency : '' ,
     }

    let processor_features = {
      processorType : processorType ? processorType : '' ,
      processorCore : processorCore ? processorCore : '' ,
      primaryClockSpeed : primaryClockSpeed ? primaryClockSpeed : 0,
      secondaryClockSpeed : secondaryClockSpeed ? secondaryClockSpeed : 0,
      othersClockSpeed : othersClockSpeed ? othersClockSpeed : '' ,
      dedicatedGraphicMemoryType : dedicatedGraphicMemoryType ? dedicatedGraphicMemoryType : '' ,
      dedicatedGraphicMemory : dedicatedGraphicMemory ? dedicatedGraphicMemory : 0 ,
      processorBrand : processorBrand ? processorBrand : '' ,
      processorName : processorName ? processorName : '' ,
      processorGeneration : processorGeneration ? processorGeneration : '' ,
      numberofCores : numberofCores ? numberofCores : 0 ,
      graphicProcessor : graphicProcessor ? graphicProcessor : '' ,
     }

    let camera = {
      primaryCamera : primaryCamera ? primaryCamera : '' ,
      selfiCamera : selfiCamera ? selfiCamera : '' ,
      maxPrimaryCamera : maxPrimaryCamera ? maxPrimaryCamera : 0 ,
      maxSelfiCamera : maxSelfiCamera ? maxSelfiCamera : 0,
      primaryCameraFeatures : primaryCameraFeatures ? primaryCameraFeatures : '' ,
      selfiCameraFeatures : selfiCameraFeatures ? selfiCameraFeatures : '' ,
      webCamera : webCamera ? webCamera : '' ,
      flash : flash ? flash : '' ,
      videoRecording : videoRecording ? videoRecording : false,  //false!true
      hdRecording : hdRecording ? hdRecording : false,  //false!true
      fullHDRecording : fullHDRecording ? fullHDRecording : false,  //false!true
      videoRecordingResolution : videoRecordingResolution ? videoRecordingResolution : '' ,
      frameRate : frameRate ? frameRate : 0 ,
      digitalZoom : digitalZoom ? digitalZoom : 0 ,
     }

     let connectivity_features = {
      networkType : networkType ? networkType : '',
      maxNetworkType : maxNetworkType ? maxNetworkType : '',
      supported4G : supported4G ? supported4G : false,  //false!true
      supported5G : supported5G ? supported5G : false,  //false!true
      supportedNetworks : supportedNetworks ? supportedNetworks : '',
      internetConnectivity : internetConnectivity ? internetConnectivity : '',
      wifi : wifi ? wifi : '',
      wifiHotspot : wifiHotspot ? wifiHotspot : false,  //false!true
      bluetooth : bluetooth ? bluetooth : '',
      audioJack : audioJack ? audioJack : '',
      usbType : usbType ? usbType : '',
      hdmiType : hdmiType ? hdmiType : '',
      nfc : nfc ? nfc : false,  //false!true
      gps : gps ? gps : false,  //false!true
      gprs : gprs ? gprs : '',
      rg45 : rg45 ? rg45 : false,  //false!true
      mapSupport : mapSupport ? mapSupport : '',
      usbPorts : usbPorts ? usbPorts : 0,
      hdmiPorts : hdmiPorts ? hdmiPorts : 0,
      radioSupport : radioSupport ? radioSupport : false,  //false!true
      headphoneJack : headphoneJack ? headphoneJack :false,  //false!true
      sensors : sensors ? sensors : '',
      wirelessLAN : wirelessLAN ? wirelessLAN : '',
      ethernet : ethernet ? ethernet : '',
     }
      
     let smart_tv_features = {
      supportedAppNetflix : supportedAppNetflix ? supportedAppNetflix : false,  //false!true
      supportedAppYoutube : supportedAppYoutube ? supportedAppYoutube : false,  //false!true
      supportedAppDisney : supportedAppDisney ? supportedAppDisney : false,  //false!true
      supportedApps : supportedApps ? supportedApps : false,  //false!true
      supportedBluetooth : supportedBluetooth ? supportedBluetooth : '' ,
      screenMirroring : screenMirroring ? screenMirroring : '' ,
      supportedMobileOperatingSystem : supportedMobileOperatingSystem ? supportedMobileOperatingSystem : false,  //false!true
      soundMode : soundModeTv ? soundModeTv : '' ,
      numberofCores : numberofCores ? numberofCores : 0 ,
      processor : processor ? processor : '' ,
      graphicProcessor : graphicProcessorTv ? graphicProcessorTv : '' ,
      ramCapacity : ramCapacity ? ramCapacity : 0,
      storageMemory : storageMemory ? storageMemory : 0,
      operatingSystem : operatingSystemTv ? operatingSystemTv : '' ,
      appStoreType : appStoreType ? appStoreType : '' ,
      wirelessLanAdapter : wirelessLanAdapter ? wirelessLanAdapter : false,  //false!true
      supportedDevicesForCasting : supportedDevicesForCasting ? supportedDevicesForCasting : '' ,
      otherInternetFeatures : otherInternetFeatures ? otherInternetFeatures : '' ,
     }

     let power_features = {
      powerRequirement : powerRequirement ? powerRequirement : '' ,
      powerConsumption : powerConsumption ? powerConsumption : '' ,
      powerOutput : powerOutput ? powerOutput : 0 ,
      otherPowerFeatures : otherPowerFeatures ? otherPowerFeatures : '' ,
      batteryCapacity : batteryCapacity ? batteryCapacity : 0 ,
      batteryType : batteryType ? batteryType : '' ,
      quickCharging : quickCharging ? quickCharging : false,  //false!true
      batteryBackup : batteryBackup ? batteryBackup : '' ,
      batteryCell : batteryCell ? batteryCell : '' ,
      powerSupply : powerSupply ? powerSupply : '' ,
     }


     let dimensions = {
      width : width ? width : 0,
      height : height ? height : 0,
      depth : depth ? depth : 0,
      weight : weight ? weight : 0,
     }


     let industrial_features = {
      originalMaterial : {
        material : material ? material : '',
        percentage : percentage ? percentage : 0,
      }
     }



      try {
        dispatch({ type: "CREATE_PRODUCT_REQUEST" });
  
        console.log('dispatch ', 'name :', name, 'description :', description, 'price :', price, 'countInStock :', countInStock,
          'brand :', brand,
          'category :', category , )
        const { data } = await axios.post(
          "/api/admin/products",
          {name : name, description : description, price: price, countInStock : countInStock,
            brand : brand, isFeatured : isFeatured,
            category: category , productPictures : arr, featuredImage : featuredImage,

            color : color,
            color_details : color_details ? color_details : '',
            model_number : model_number ? model_number : '',
            model_name : model_name ? model_name : '',
            launch_year : launch_year ? launch_year : 0,
            in_the_box : in_the_box ? in_the_box : '',


            // 
            storage : internalStorage || expandableStorage || supportedMemoryCardType || memoryCardSlotType || ram || ramType || ssdCapacity || hddCapacity || ramFrequency || cache 
            ?  storage : {},

            audio_features : numberOfSpeakers || speakerOutputRMS || internalMic || speakerType || soundTechnology || soundMode || soundEnhancements || surroundSound || supportedAudioFormats || otherAudioFeatures || soundProperties
            ? audio_features : {},

            video_features : pictureEngine || digitalTVReception || brightness || refreshRateDisplay || viewAngle || ledDisplayType || aspectRatio || supportedVideoFormats || otherVideoFeatures
            ? video_features : {},
            
            display_features : screenSize || resolutionX || resolutionY || resolutionType || gpu || hdRecordingDisplay || touchScreen || screenType || displayColors || hdGameSupport || refreshRate || otherDisplayFeatures
            ? display_features : {},
            
            operating_system : operatingSystem || operatingSystemArchitecture || systemArchitecture || operatingFrequency
            ? operating_system : {},

            processor_features : processorType || processorCore || primaryClockSpeed || secondaryClockSpeed || othersClockSpeed || dedicatedGraphicMemoryType || dedicatedGraphicMemory || processorBrand || processorName || processorGeneration || numberofCores || graphicProcessor
            ? processor_features : {},


            camera : primaryCamera || selfiCamera || maxPrimaryCamera || maxSelfiCamera || primaryCameraFeatures || selfiCameraFeatures || webCamera || flash || videoRecording || hdRecording || fullHDRecording || videoRecordingResolution || frameRate || digitalZoom
            ? camera : {},

            connectivity_features : networkType || maxNetworkType || supported4G || supported5G || supportedNetworks || internetConnectivity || wifi || wifiHotspot || bluetooth || audioJack || usbType || hdmiType || nfc || gps || gprs || rg45 || mapSupport || usbPorts || hdmiPorts || radioSupport || headphoneJack || sensors || wirelessLAN || ethernet
            ? connectivity_features : {},


            smart_tv_features : supportedAppNetflix || supportedAppYoutube || supportedAppDisney || supportedApps || supportedBluetooth || screenMirroring || supportedMobileOperatingSystem || soundModeTv || numberofCores || processor || graphicProcessorTv || ramCapacity || storageMemory || operatingSystemTv || appStoreType || wirelessLanAdapter || supportedDevicesForCasting || otherInternetFeatures
            ? smart_tv_features : {},


            power_features : powerRequirement || powerConsumption || powerOutput || otherPowerFeatures || batteryCapacity || batteryType || quickCharging || batteryBackup || batteryCell || powerSupply
            ? power_features : {},

            dimensions : width || height || depth || weight
            ? dimensions : {},

            industrial_features : material || percentage
            ? industrial_features : {},
            //

            additional_features : additional_features, 
            installation_demo_details : installation_demo_details,
            capacity : capacity,
          },
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
  
        dispatch({ type: "CREATE_PRODUCT_SUCCESS" });
        enqueueSnackbar("Product Created successfully", { variant: "success" });
        setLoadingAddNewProduct(false)
        router.push(`/admin/product/${data.product._id}`);
      } catch (err) {
        dispatch({ type: "CREATE_PRODUCT_FAIL" });
  
        enqueueSnackbar(getError(err), { variant: "error" });
        setLoadingAddNewProduct(false)

      }
    } else {
      enqueueSnackbar('Produuct images is required', { variant: "error" });
      setLoadingAddNewProduct(false)


    }

   

  };


  const uploadProductImages = (e) => {
    
    console.log('e.target.files.length', e.target.files.length)
    if ( e.target.files.length >0 ) {
      let arrImage = imagesTest

      if ( e.target.files.length === 1) {
      
     
        if (imagesTest.find(x => x.name === e.target.files[0].name))   {
          // console.log('item in array')
        } else {
          arrImage.push(e.target.files[0])
        }
        
        setImagesTest(arrImage)
      } else {
        Array.from(e.target.files).map(file=> {
        
          if (imagesTest.find(x => x.name === file.name))   {
            // console.log('item in array')
          } else {
            arrImage.push(file)
          }
         
        })
        setImagesTest(arrImage)
      }
     
      console.log('arrImage', arrImage)
      if(imagesTest.length > 0) {
        let arr= []
        imagesTest.map((img)=> {
          // console.log('URL.createObjectURL(img)', URL.createObjectURL(img))
          arr.push({url : URL.createObjectURL(img), name : img.name})        
        })

        setPreviewImagesTest(arr)
      }else {
  
      }
    }
  }


  const uploadFeaturedImage = (e) => {
      setFeaturedImageObject(e.target.files[0]) 
      console.log('setFeaturedImageObject',e.target.files[0])
      console.log('featuredImageObject', featuredImageObject)
  }

  const uploadFeaturedImageFun = async () => {
    if(!featuredImageObject) {
      return ''
    } else {

      const bodyFomData = new FormData()
      bodyFomData.append('file', featuredImageObject);
  
      try{
        const {data} = await axios.post('/api/admin/upload', bodyFomData, {
          headers : { 
            'Content-Type' : 'multipart/form-data' ,
            authorization: `Bearer ${userInfo.token}` 
          }
        } )
  
        // setFeaturedImageObject
        setFeaturedImage(data.secure_url)
       console.log('featuredImage secure_url', data.secure_url)

        return data.secure_url ; 
  
        // enqueueSnackbar('Image uploaded successfully', {variant : 'success'})
  
  
      }catch(err) {
  
  
        enqueueSnackbar(`Upload Featured Image Faild : ${getError(err)}` , {variant : 'error'})
  
  
      }

    }

   
  }



  const removeImageFromArray = (img) => {

    let filtered = imagesTest.filter(function(el) { return el.name != img });
    setImagesTest(filtered)
    let filteredUrl = previewImagesTest.filter(function(el) { return el.name != img }); 
    setPreviewImagesTest(filteredUrl)
  }


  const sendImagesData = async () => {
    const bodyFomData = new FormData()
    imagesTest.map(file=> {
      bodyFomData.append('file', file);
    })

    try{
     const {data} = await axios.post('/api/admin/uploadMultiple', bodyFomData, {
        headers : { 
          'Content-Type' : 'multipart/form-data' ,
          authorization: `Bearer ${userInfo.token}` 
        }
      } )   
      // console.log('data resive', data)
      return data ; 
    }catch(err) {
      // console.log('err resive', err)
      enqueueSnackbar(getError(err), { variant: "error" });
      return data = {}
    }

  }




  return (
    <Layout title="Product-Dashboard" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="products" adminDashboard />
        </Grid>

        
        {loadingAddNewProduct ? 
                <div className={classN.loadFull}>
                {/* <Preloader /> */}
                <CircularProgress />
              </div>:
          null
        }
        

     

        <Grid className={classN.adminMainGrid}>


          {/* Test ------------------------------------------------------------ */}
         
         
          {/* Test ------------------------------------------------------------ */}
          {openAddModal ? (
            <div className={classN.sectionAddFloat}>                 
            <div //className={classN.modalMaxHeight}
            className={classN.section}
            > 
            {loadingAddNewProduct ? 
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
                onSubmit={handleSubmit(addNewProduct)}
              >
                
                <List style={{ display: "flex", flexWrap: "wrap" }}>

                <ListItem>
                  <Typography // component="h1" variant="h1"
                    className={classN.titleHeader}
                  >
                    Add New Product
                    {/* you have saved before */}
                  </Typography>
                </ListItem>

                {/* name Controller */}
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
                        label="Name *"
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
                           
                                <TextField
                                  variant="outlined"
                                  fullWidth
                                  id="slug"
                                  label="Slug"
                                  disabled
                                  defaultValue=""

                                  value={getValues('name')? getValues('name').toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/\-\-+/g, '-') : ' '}
                                  
                                >
                                </TextField>
                            
                            
                    </ListItem>

                {/* Price Controller */}
                <ListItem className={classN.listItemMin}>
                  <Controller
                    name="price"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                      pattern: /^[0-9]+(.[0-9]+)?$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="price"
                        label="Price *"
                        //   inputProps={{ type: 'name' }}
                        inputProps={{ type: "number" }}
                        className={classN.textFiledNumberArrowNone}
                        error={Boolean(errors.price)}
                        helperText={
                          errors.price
                            ? errors.price.type === "pattern"
                              ? "Price is not valid"
                              : "Price is required"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>

                  {/* CountInStack Controller */}
                  <ListItem className={classN.listItemMin}>
                  <Controller
                    name="countInStock"
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
                        id="countInStock"
                        label="Count In Stock *"
                        inputProps={{ type: "number" }}
                        className={classN.textFiledNumberArrowNone}
                        error={Boolean(errors.countInStock)}
                        helperText={
                          errors.countInStock
                            ? errors.countInStock.type === "pattern"
                              ? "Count In Stock is not valid"
                              : "Count In Stock is required"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>


                {/* products images Controller */}
                <ListItem className={classN.listItemMin}>
                <div>
                    <Button
                      variant="contained"
                      color="primary"
                      component="label"

                      startIcon={<Image />}
                      // className={classN.btnHeaderWithIcon}
                    >
                      Upload product images
                        <input
                            type="file"
                            multiple
                            onChange={(e) => uploadProductImages(e)}
                            hidden
                          />                    
                    </Button>


                    {
                  previewImagesTest.length > 0 ?
                  
                  ( 
                      <div style={{ display:"flex", flexWrap:"wrap", margin : '10px 0 2px 0'}}>

                        { previewImagesTest.map(img=> (
                            <div className={classN.productImagesContanerModule} key={img.name}>                                 
                                <img src={img.url} alt=" product image"  className={classN.productImagerModule} />
                                <div
                                    className={classN.productImageCancel}
                                    onClick={(e) => removeImageFromArray(img.name)}
                                >
                                  <Cancel className={classN.productImageCancelIcon} />
                                </div>
                            </div>

                              
                          )) }
                      </div>
                  )                                                   
                : null
                }

                  </div>
                    
                </ListItem>



              {/* Featured image Controller */}
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

                        {
                          featuredImageObject?
                        
                        (    
                        
                          <div className={classN.productImagesContanerModule} key={featuredImageObject.name}>                                 
                              <img src={ URL.createObjectURL(featuredImageObject)} alt="featured product image"  className={classN.productImagerModule} />
                          </div>
                        
                        )
                          
                                                            
                      : null
                      }


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


                  </div>
              </ListItem>

            
              {/* category Controller */}
              
              <ListItem className={classN.listItemMin}>
                    <FormControl className={classN.fullWidth}>
                      <InputLabel
                        id="label"
                        style={{ margin: "-6px 0 0 14px" }}
                      >
                        Category *
                      </InputLabel>
                      <Select
                        labelId="label"
                        label=" Category *"
                        value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        input={<OutlinedInput label="Category *" />}
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

                {/* brand Controller */}
            
                <ListItem className={classN.listItemMin}>
                    <FormControl className={classN.fullWidth}>
                      <InputLabel
                        id="label"
                        style={{ margin: "-6px 0 0 14px" }}
                      >
                        Brand *
                      </InputLabel>
                      <Select
                        labelId="label"
                        label="Brand *"
                        value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                        input={<OutlinedInput label="Brand *" />}
                      >
                          <MenuItem value="">No Brand </MenuItem>

                          {brands.map((brand) => (
                            <MenuItem key={brand.name} value={brand.name}>
                              {brand.name}{" "}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </ListItem>

              
                {/* description Controller */}
                <ListItem className={classN.listItemFull}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
                    rules={
                      {
                        required: true,
                      }
                    }
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        multiline
                        rows={3}
                        fullWidth
                        id="description"
                        label="Description *"
                        //   inputProps={{ type: 'name' }}
                        error={Boolean(errors.description)}
                        helperText={
                          errors.description
                            ? "Description is required"
                            : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>

                {/* Collor Controller */}
                <ListItem className={classN.listItemMin}>
                  <Controller
                    name="color"
                    control={control}
                    render={({ field }) => (
                      <FormControl
                      style={{ minWidth: "100%",  }}
                    >
                      <InputLabel
                        id="colorId"
                        style={{ padding: "0rem 1.1rem" }}
                      >
                          {" "}
                          Color
                        </InputLabel>
                        <Select
                          labelId="colorId"
                          id="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          input={<OutlinedInput label="Color" />}
                          //MenuProps={MenuProps}
                        >
                          {/* <MenuItem value=''>Select Color </MenuItem> */}

                          {colors.map((color) => (
                            <MenuItem key={color} value={color}>
                              {color}{" "}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  ></Controller>
                </ListItem>

                {/* color_details Controller */}
                <ListItem className={classN.listItemMin}>
                  <Controller
                    name="color_details"
                    control={control}
                    defaultValue=""
                    rules={{
                      // required: true,

                      pattern: /^[a-z A-Z]{2,60}$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="color_details"
                        label="Color details"
                        //   inputProps={{ type: 'name' }}
                        error={Boolean(errors.color_details)}
                        helperText={
                          errors.pattern ? "Color details is not valid" : ""
                        }
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>

                {/* model_name Controller */}
                <ListItem className={classN.listItemMin}>
                  <Controller
                    name="model_name"
                    control={control}
                    defaultValue=""
                    rules={
                      {
                        // required: true,
                        // pattern: /^[a-z A-Z]{2,60}$/,
                      }
                    }
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="model_name"
                        label="Model name"
                        //   inputProps={{ type: 'name' }}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>

                {/* model_number Controller */}
                <ListItem className={classN.listItemMin}>
                  <Controller
                    name="model_number"
                    control={control}
                    defaultValue=""
                    rules={
                      {
                        // required: true,
                        // pattern: /^[a-z A-Z]{2,60}$/,
                      }
                    }
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="model_number"
                        label="Model number"
                        //   inputProps={{ type: 'name' }}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>

                {/* launch_year Controller */}
                <ListItem className={classN.listItemMin}>
                  <Controller
                    name="launch_year"
                    control={control}
                    defaultValue=""
                    rules={{
                      // required: true,

                      pattern: /^[0-9]{4}$/,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="launch_year"
                        label="Launch year"
                        inputProps={{ type: "number" }}
                        className={classN.textFiledNumberArrowNone}
                        error={Boolean(errors.launch_year)}
                        helperText={errors.pattern ? "Year is not valid" : ""}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>

                {/* in_the_box Controller */}
                <ListItem className={classN.listItemMin}>
                  <Controller
                    name="in_the_box"
                    control={control}
                    defaultValue=""
                    rules={{}}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="in_the_box"
                        label="In the box"
                        //   inputProps={{ type: 'name' }}

                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>


                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Storage Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "internalStorage",
                          label: "Internal Storage",
                          placeholder: "128 GB",
                          number: "number",
                        },
                        {
                          nameId: "expandableStorage",
                          label: "Expandable storage",
                          placeholder: "265 GB",
                          number: "number",
                        },
                        {
                          nameId: "supportedMemoryCardType",
                          label: "supported Memory Card Type",
                          placeholder: "microSD",
                          number: "",
                        },

                        {
                          nameId: "memoryCardSlotType",
                          label: "Memory card slot type",
                          placeholder: " Hybrid Slot",
                          number: "",
                        },
                        {
                          nameId: "ram",
                          label: "Ram ",
                          placeholder: "12 GB",
                          number: "number",
                        },
                        {
                          nameId: "ramType",
                          label: "Ram Type",
                          placeholder: "DDR4",
                          number: "",
                        },
                        {
                          nameId: "ssdCapacity",
                          label: "SSD Capacity",
                          placeholder: "500 GB",
                          number: "number",
                        },
                        {
                          nameId: "hddCapacity",
                          label: "HDD Capacity",
                          placeholder: "1000 GB",
                          number: "number",
                        },
                        {
                          nameId: "ramFrequency",
                          label: "Ram Frequency",
                          placeholder: "2400 Mhz",
                          number: "number",
                        },
                        {
                          nameId: "cache",
                          label: "Cache",
                          placeholder: "8 M",
                          number: "number",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>
              
                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Audio features</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "numberOfSpeakers",
                          label: "Number of speakers",
                          placeholder: "2",
                          number: "number",
                        },
                        {
                          nameId: "speakerOutputRMS",
                          label: "Speaker output RMS",
                          placeholder: "20 W",
                          number: "number",
                        },
                        {
                          nameId: "internalMic",
                          label: "Internal mic",
                          placeholder: "Built-in Dual Microphone || YES/NO",
                          number: "",
                        },
                        {
                          nameId: "speakerType",
                          label: "Speaker type ",
                          placeholder: "Built-in Dual Speakers || YES/NO",
                          number: "",
                        },
                        {
                          nameId: "soundTechnology",
                          label: "Sound technology",
                          placeholder: "Dolby Digital Plus",
                          number: "",
                        },
                        {
                          nameId: "soundMode",
                          label: "Sound mode",
                          placeholder: "Standard",
                          number: "",
                        },
                        {
                          nameId: "soundEnhancements",
                          label: "Sound enhancements",
                          placeholder: "Dirac Sound Effect",
                          number: "",
                        },
                        {
                          nameId: "surroundSound",
                          label: "Surround sound",
                          placeholder: "DTS Virtual-X ",
                          number: "",
                        },
                        {
                          nameId: "supportedAudioFormats",
                          label: "Supported audio formats",
                          placeholder: "MP3, WMA, ...",
                          number: "",
                        },
                        {
                          nameId: "otherAudioFeatures",
                          label: "Other audio features",
                          placeholder: "Volume Offset",
                          number: "",
                        },
                        {
                          nameId: "soundProperties",
                          label: "Sound properties",
                          placeholder: "Waves Maxx Audio Pro",
                          number: "",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>
              
                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Video features</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "pictureEngine",
                          label: "Picture engine",
                          placeholder: "4K X-Reality Pro",
                          number: "",
                        },
                        {
                          nameId: "digitalTVReception",
                          label: "digital TV reception",
                          placeholder: "DVB-T",
                          number: "",
                        },
                        {
                          nameId: "brightness",
                          label: "Brightness",
                          placeholder: "270 nits",
                          number: "number",
                        },
                        {
                          nameId: "refreshRate",
                          label: "Refresh rate ",
                          placeholder: "60 Hz",
                          number: "number",
                        },
                        {
                          nameId: "viewAngle",
                          label: "View angle",
                          placeholder: "180 deg",
                          number: "number",
                        },
                        {
                          nameId: "ledDisplayType",
                          label: "Led display type",
                          placeholder: "LED",
                          number: "",
                        },
                        {
                          nameId: "aspectRatio",
                          label: "Aspect ratio",
                          placeholder: "16:9",
                          number: "",
                        },
                        {
                          nameId: "supportedVideoFormats",
                          label: "Supported video formats",
                          placeholder: "AVI, ASF, MP4, ...",
                          number: "",
                        },
                        {
                          nameId: "otherVideoFeatures",
                          label: "Other video features",
                          placeholder: "Dynamic Noise reduction",
                          number: "",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>

                <ListItem className={classN.listItemMin}> 
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Display features</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "screenSize",
                          label: "Display size",
                          placeholder: "15.49 cm",
                          number: "number",
                        },
                        {
                          nameId: "resolutionX",
                          label: "Resolution X",
                          placeholder: "2532 px",
                          number: "number",
                        },
                        
                        {
                          nameId: "resolutionY",
                          label: "Resolution Y",
                          placeholder: "1170 px",
                          number: "number",
                        },
                        {
                          nameId: "resolutionType",
                          label: "Resolution type ",
                          placeholder: "Full HD+",
                          number: "",
                        },
                        {
                          nameId: "gpu",
                          label: "Gpu",
                          placeholder: "IMG GE8320",
                          number: "",
                        },
                        // {nameId :'hdRecordingDisplay', label:'Hd Recording', placeholder:'TRUE/ FALSE',  number:'',  },
                        // {nameId :'touchScreen', label:'touch Screen', placeholder:'TRUE/ FALSE',  number:'',  },
                        {
                          nameId: "screenType",
                          label: "Display type",
                          placeholder: "Super AMOLED",
                          number: "",
                        },
                        {
                          nameId: "displayColors",
                          label: "Display Colors",
                          placeholder: "16000 k = (1.6M)  ",
                          number: "number",
                        },
                        // {nameId :'hdGameSupport', label:'Hd game support', placeholder:'TRUE/ FALSE',  number:'',  },
                        {
                          nameId: "refreshRateDisplay",
                          label: "Refresh rate",
                          placeholder: "144 HZ",
                          number: "number",
                        },
                        {
                          nameId: "otherDisplayFeatures",
                          label: "Other display features",
                          placeholder: "96% NTSC (Typ) Color Saturation",
                          number: "",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}


                <ListItem>
                  <FormControlLabel
                    label="hd Recording"
                    control={
                      <Checkbox
                        onClick={(e) => setHdRecordingDisplay(e.target.checked)}
                        checked={hdRecordingDisplay}
                        name="hdRecordingDisplay"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Touch Screen"
                    control={
                      <Checkbox
                        onClick={(e) => setTouchScreen(e.target.checked)}
                        checked={touchScreen}
                        name="touchScreen"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>


                <ListItem>
                  <FormControlLabel
                    label="Hd Games Support"
                    control={
                      <Checkbox
                        onClick={(e) => setHdGameSupport(e.target.checked)}
                        checked={hdGameSupport}
                        name="hdGameSupport"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>






                      
                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>


                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Operating System</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "operatingSystem",
                          label: "Operating System",
                          placeholder:
                            "Android Marshmallow 6 | window11 ... ",
                          number: "",
                        },
                        {
                          nameId: "operatingSystemArchitecture",
                          label: "OS Architecture",
                          placeholder: "64 bit",
                          number: "",
                        },
                        {
                          nameId: "systemArchitecture",
                          label: "system architecture ",
                          placeholder: "64",
                          number: "number",
                        },
                        {
                          nameId: "operatingFrequency",
                          label: "Operating frequency ",
                          placeholder: "GSM: 850/900/1800 | TD-LTE: ... ",
                          number: "",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>


                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Processor Features</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "processorType",
                          label: "Processor type",
                          placeholder: "HUAWEI Kirin 955 ARM",
                          number: "",
                        },
                        {
                          nameId: "processorCore",
                          label: "Processor core",
                          placeholder: "Octa Core | i7 | Ryzen ... ",
                          number: "",
                        },
                        {
                          nameId: "primaryClockSpeed",
                          label: "Primary clockSpeed",
                          placeholder: "2.2 GHz",
                          number: "number",
                        },
                        {
                          nameId: "secondaryClockSpeed",
                          label: "Secondary clockSpeed ",
                          placeholder: "2.2 GHz",
                          number: "number",
                        },
                        {
                          nameId: "othersClockSpeed",
                          label: "others clockSpeed ",
                          placeholder: "",
                          number: "",
                        },
                        {
                          nameId: "dedicatedGraphicMemory",
                          label: "Dedicated graphic memory  ",
                          placeholder: " 512 MB",
                          number: "number",
                        },
                        {
                          nameId: "dedicatedGraphicMemoryType",
                          label: "Dedicated graphic memory type ",
                          placeholder: "GDDR6",
                          number: "",
                        },
                        {
                          nameId: "processorBrand",
                          label: "Processor brand ",
                          placeholder: "AMD",
                          number: "",
                        },
                        {
                          nameId: "processorName",
                          label: "Processor name ",
                          placeholder: "Ryzen 5 Quad Core",
                          number: "",
                        },
                        {
                          nameId: "processorGeneration",
                          label: "Processor Generation ",
                          placeholder: "Ryzen 5 ",
                          number: "",
                        },
                        {
                          nameId: "numberofCores",
                          label: "Number of cores ",
                          placeholder: "4 cores",
                          number: "number",
                        },
                        {
                          nameId: "graphicProcessor",
                          label: "Graphic Processor",
                          placeholder: "NVIDIA GeForce RTX 3050ti",
                          number: "",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>


                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Camera Features</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "primaryCamera",
                          label: "Primary cameras",
                          placeholder: "64MP + 12MP + 2MP",
                          number: "",
                        },
                        {
                          nameId: "selfiCamera",
                          label: "Selfi cameras",
                          placeholder: "64MP + 12MP",
                          number: "",
                        },
                        {
                          nameId: "maxPrimaryCamera",
                          label: "Max primary camera",
                          placeholder: "128 MP",
                          number: "number",
                        },
                        {
                          nameId: "maxSelfiCamera",
                          label: "Max selfi camera",
                          placeholder: "68 MP",
                          number: "number",
                        },

                        {
                          nameId: "primaryCameraFeatures",
                          label: "Primary cameras features ",
                          placeholder:
                            "48MP Main Camera (1/2 inch, f/1.7, 0.8μm, 6P)+ ...",
                          number: "",
                        },
                        {
                          nameId: "selfiCameraFeatures",
                          label: "Selfi cameras features ",
                          placeholder:
                            "64MP(1/2 inch, f/1.7, 0.8μm, 6P)+ ...",
                          number: "",
                        },

                        {
                          nameId: "webCamera",
                          label: "Web camera ",
                          placeholder: "720p HD Webcam",
                          number: "",
                        },
                        {
                          nameId: "flash",
                          label: "Flash",
                          placeholder: "Rear: Brighter True Tone Flash with Slow Sync | Front: Retina Flash",
                          number: "",
                        },

                        // {nameId :'videoRecording', label:'Video recording', placeholder:'TRUE/ FALSE',  number:'',  },

                        // {nameId :'hdRecording', label:'Hd recording', placeholder:'TRUE/ FALSE',  number:'',  },
                        // {nameId :'fullHDRecording', label:'Full HD recording', placeholder:'TRUE/ FALSE',  number:'',  },

                        {
                          nameId: "videoRecordingResolution",
                          label: "Video recording resolution ",
                          placeholder:
                            "1080P | HDR Video Recording with Dolby",
                          number: "",
                        },
                        {
                          nameId: "frameRate",
                          label: "Frame rate ",
                          placeholder: "240 fps",
                          number: "number",
                        },
                        {
                          nameId: "digitalZoom",
                          label: "Digital zoom ",
                          placeholder: "5x | 3x ...",
                          number: "number",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}


                <ListItem>
                  <FormControlLabel
                    label="Video Recording"
                    control={
                      <Checkbox
                        onClick={(e) => setVideoRecording(e.target.checked)}
                        checked={videoRecording}
                        name="videoRecording"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>


                <ListItem>
                  <FormControlLabel
                    label="Hd Recording"
                    control={
                      <Checkbox
                        onClick={(e) => setHdRecording(e.target.checked)}
                        checked={hdRecording}
                        name="hdRecording"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Full HD Recording"
                    control={
                      <Checkbox
                        onClick={(e) => setFullHDRecording(e.target.checked)}
                        checked={fullHDRecording}
                        name="fullHDRecording"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>






                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>
                
                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Connectivity Features</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "networkType",
                          label: "Network type",
                          placeholder: "3G 4G 5G",
                          number: "",
                        },
                        {
                          nameId: "maxNetworkType",
                          label: "Max network type",
                          placeholder: "5G",
                          number: "",
                        },

                        // {nameId :'supported4G', label:'supported 4G', placeholder:'TRUE/ FALSE',  number:'',  },
                        // {nameId :'supported5G', label:'supported 5G', placeholder:'TRUE/ FALSE',  number:'',  },

                        {
                          nameId: "supportedNetworks",
                          label: "Supported networks",
                          placeholder: "5G, 4G LTE, WCDMA, GSM",
                          number: "",
                        },
                        {
                          nameId: "internetConnectivity",
                          label: "Internet connectivity",
                          placeholder: "4G, 3G, Wi-Fi, EDGE, GPRS",
                          number: "",
                        },

                        {
                          nameId: "wifi",
                          label: "Wifi ",
                          placeholder: "802.11a/b/g/n/ac",
                          number: "",
                        },
                        // {nameId :'wifiHotspot', label:'Wifi hotspot ', placeholder:'TRUE / FALSE',  number:'',  },

                        {
                          nameId: "bluetooth",
                          label: "Bluetooth ",
                          placeholder: "v5.1",
                          number: "",
                        },

                        {
                          nameId: "audioJack",
                          label: "Audio jack",
                          placeholder: "3.5mm",
                          number: "",
                        },
                        {nameId :'usbType', label:'Usb type ', placeholder:'1 x USB 3.2 Gen 1 ports, 1 x USB Type-C port (Thunderbolt 4),.',  number:'',  },
                        {nameId :'hdmiType', label:'Hdmi type ', placeholder:'1 x HDMI 2.0',  number:'',  },
                        // {nameId :'nfc', label:'nfc ', placeholder:'TRUE / FALSE',  number:'',  },
                        // {nameId :'gps', label:'gps ', placeholder:'TRUE / FALSE',  number:'',  },
                        {nameId :'gprs', label:'gprs', placeholder:'YES',  number:'',  },
                        
                        
                        // {nameId :'rg45', label:'rg45 ', placeholder:'TRUE / FALSE',  number:'',  },
                        
                        
                        {
                          nameId: "usbPorts",
                          label: "Usb ports",
                          placeholder: "4 ports",
                          number: "number",
                        },
                        {
                          nameId: "hdmiPorts",
                          label: "Hdmi ports",
                          placeholder: "2 ports",
                          number: "number",
                        },

                        // {nameId :'radioSupport', label:'Radio support', placeholder:'TRUE/ FALSE',  number:'',  },
                        // {nameId :'headphoneJack', label:'Headphone jack', placeholder:'TRUE/ FALSE',  number:'',  },

                        {
                          nameId: "sensors",
                          label: "Sensors",
                          placeholder:
                            "Fingerprint Reader, Proximity Sensor, Accelerometer,",
                          number: "",
                        },
                        {
                          nameId: "wirelessLAN",
                          label: "Wireless LAN",
                          placeholder:
                            "Realtek RTL8822CE 802.11a/b/g/n/ac (2x2) Wi-Fi®",
                          number: "",
                        },
                        {
                          nameId: "ethernet",
                          label: "Ethernet",
                          placeholder: "Killer Ethernet E2600",
                          number: "",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}


                <ListItem>
                  <FormControlLabel
                    label="Supported 4G"
                    control={
                      <Checkbox
                        onClick={(e) => setSupported4G(e.target.checked)}
                        checked={supported4G}
                        name="supported4G"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Supported 5G"
                    control={
                      <Checkbox
                        onClick={(e) => setSupported5G(e.target.checked)}
                        checked={supported5G}
                        name="supported5G"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Wifi Hotspot"
                    control={
                      <Checkbox
                        onClick={(e) => setWifiHotspot(e.target.checked)}
                        checked={wifiHotspot}
                        name="wifiHotspot"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Supported nfc"
                    control={
                      <Checkbox
                        onClick={(e) => setNfc(e.target.checked)}
                        checked={nfc}
                        name="nfc"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="gps"
                    control={
                      <Checkbox
                        onClick={(e) => setGps(e.target.checked)}
                        checked={gps}
                        name="gps"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="rg45"
                    control={
                      <Checkbox
                        onClick={(e) => setRg45(e.target.checked)}
                        checked={rg45}
                        name="rg45"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Radio Support"
                    control={
                      <Checkbox
                        onClick={(e) => setRadioSupport(e.target.checked)}
                        checked={radioSupport}
                        name="radioSupport"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Headphone Jack"
                    control={
                      <Checkbox
                        onClick={(e) => setHeadphoneJack(e.target.checked)}
                        checked={headphoneJack}
                        name="headphoneJack"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>





                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>
              
                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Smart TV Features</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        // {nameId :'supportedAppNetflix', label:' Supported app netflix', placeholder:'TRUE/ FALSE',  number:'',  },
                        // {nameId :'supportedAppYoutube', label:'Supported app youtube', placeholder:'TRUE/ FALSE',  number:'',  },
                        // {nameId :'supportedAppDisney', label:'Supported app disney', placeholder:'TRUE/ FALSE',  number:'',  },
                        // {nameId :'supportedApps', label:'Supported apps', placeholder:'TRUE/ FALSE',  number:'',  },
                        // {nameId :'supportedBluetooth', label:'Supported bluetooth ', placeholder:'TRUE/ FALSE',  number:'',  },
                        // {nameId :'screenMirroring', label:'Screen mirroring', placeholder:'TRUE/ FALSE',  number:'',  },
                        // {nameId :'supportedMobileOperatingSystem', label:'Supported mobileOperating system', placeholder:'TRUE/ FALSE',  number:'',  },

                        {
                          nameId: "soundModeTv",
                          label: "Sound mode",
                          placeholder: "Standard | News | Movie ...",
                          number: "",
                        },
                        {
                          nameId: "numberofCoresTv",
                          label: "Number of cores",
                          placeholder: "4 cores",
                          number: "number",
                        },

                        {
                          nameId: "processor",
                          label: "Processor ",
                          placeholder: "Quad Core",
                          number: "",
                        },

                        {
                          nameId: "graphicProcessorTv",
                          label: "Graphic processor ",
                          placeholder: "Dual Core",
                          number: "",
                        },

                        {
                          nameId: "ramCapacity",
                          label: "Ram capacity",
                          placeholder: "2 GB",
                          number: "number",
                        },
                        {
                          nameId: "storageMemory",
                          label: "Storage memory",
                          placeholder: "32 GB",
                          number: "number",
                        },
                        {
                          nameId: "operatingSystemTv",
                          label: "Operating system",
                          placeholder: "Android",
                          number: "",
                        },

                        {
                          nameId: "appStoreType",
                          label: "App store type",
                          placeholder: "Google Play Store",
                          number: "",
                        },
                        // {nameId :'wirelessLanAdapter', label:'Wireless lan adapter', placeholder:'TRUE/ FALSE',  number:'',  },

                        {
                          nameId: "supportedDevicesForCasting",
                          label: "supported devices for casting",
                          placeholder: "Laptop | Mobile",
                          number: "",
                        },
                        {
                          nameId: "otherInternetFeatures",
                          label: "Other internet features",
                          placeholder:
                            "Google Assistant | Chromecast Built-in | Google Home,",
                          number: "",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}


                <ListItem>
                  <FormControlLabel
                    label="Supported Netflix App"
                    control={
                      <Checkbox
                        onClick={(e) => setSupportedAppNetflix(e.target.checked)}
                        checked={supportedAppNetflix}
                        name="supportedAppNetflix"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Supported Youtube App"
                    control={
                      <Checkbox
                        onClick={(e) => setSupportedAppYoutube(e.target.checked)}
                        checked={supportedAppYoutube}
                        name="supportedAppYoutube"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Supported Disney App"
                    control={
                      <Checkbox
                        onClick={(e) => setSupportedAppDisney(e.target.checked)}
                        checked={supportedAppDisney}
                        name="supportedAppDisney"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="supported Apps"
                    control={
                      <Checkbox
                        onClick={(e) => setSupportedApps(e.target.checked)}
                        checked={supportedApps}
                        name="supportedApps"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Supported Bluetooth"
                    control={
                      <Checkbox
                        onClick={(e) => setSupportedBluetooth(e.target.checked)}
                        checked={supportedBluetooth}
                        name="supportedBluetooth"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Screen Mirroring"
                    control={
                      <Checkbox
                        onClick={(e) => setScreenMirroring(e.target.checked)}
                        checked={screenMirroring}
                        name="screenMirroring"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Supported Mobile OS"
                    control={
                      <Checkbox
                        onClick={(e) => setSupportedMobileOperatingSystem(e.target.checked)}
                        checked={supportedMobileOperatingSystem}
                        name="supportedMobileOperatingSystem"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>

                <ListItem>
                  <FormControlLabel
                    label="Wireless Lan Adapter"
                    control={
                      <Checkbox
                        onClick={(e) => setWirelessLanAdapter(e.target.checked)}
                        checked={wirelessLanAdapter}
                        name="wirelessLanAdapter"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>








                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>
                
                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Power Features</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "powerRequirement",
                          label: "Power requirement",
                          placeholder: "AC 100 - 240 V, 50/60 Hz",
                          number: "",
                        },
                        {
                          nameId: "powerConsumption",
                          label: "Power consumption",
                          placeholder: "180 W, 0.5 W (Standby)",
                          number: "",
                        },

                        {
                          nameId: "powerOutput",
                          label: "Power Output ",
                          placeholder: "800 w",
                          number: "number",
                        },

                        {
                          nameId: "otherPowerFeatures",
                          label: "Other power features",
                          placeholder: "Power Saving Mode",
                          number: "",
                        },

                        {
                          nameId: "batteryCapacity",
                          label: "Battery capacity",
                          placeholder: " 6000 mAh",
                          number: "number",
                        },
                        {
                          nameId: "batteryType",
                          label: "Battery type",
                          placeholder: "Li-Po",
                          number: "",
                        },

                        // {nameId :'quickCharging', label:'Quick charging', placeholder:'TRUE/ FALSE',  number:'',  },

                        {
                          nameId: "batteryBackup",
                          label: "Battery backup",
                          placeholder: "Upto 7.5 hours",
                          number: "",
                        },

                        {
                          nameId: "batteryCell",
                          label: "Battery Cell",
                          placeholder: "3 Cell",
                          number: "",
                        },

                        {
                          nameId: "powerSupply",
                          label: "Power supply",
                          placeholder: "150 W AC Adapter",
                          number: "",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}


                <ListItem>
                  <FormControlLabel
                    label="quickCharging"
                    control={
                      <Checkbox
                        onClick={(e) => setQuickCharging(e.target.checked)}
                        checked={quickCharging}
                        name="quickCharging"
                      />
                    }
                  ></FormControlLabel>
                </ListItem>


                
                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>
                
                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Dimensions</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "width",
                          label: "Width",
                          placeholder: "71.5 mm",
                          number: "number",
                        },
                        {
                          nameId: "height",
                          label: "Height",
                          placeholder: "140 mm",
                          number: "number",
                        },
                        {
                          nameId: "depth",
                          label: "Depth",
                          placeholder: "8.6 mm",
                          number: "number",
                        },
                        {
                          nameId: "weight",
                          label: "Weight",
                          placeholder: " 170 g",
                          number: "number",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>

                
                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography> Industrial Features</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "material",
                          label: "Material",
                          placeholder: "coton",
                          number: "",
                        },
                        {
                          nameId: "percentage",
                          label: "Percentage",
                          placeholder: "90%",
                          number: "number",
                        },
                      
                        
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
                </ListItem>

                <ListItem className={classN.listItemMin}>
                <Accordion className={classN.listItemMinAccordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography> Additional Features</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ padding: "0 1px" }}>
                    <List style={{ width: "100%" }}>
                      {[
                        {
                          nameId: "additional_features",
                          label: "Additional features",
                          placeholder:
                            "Keyboard : English International Non Backlit Keyboard",
                          number: "",
                        },
                        {
                          nameId: "installation_demo_details",
                          label: "Installation demo details",
                          placeholder:
                            "Please note that any unauthorized handling or...",
                          number: "",
                        },
                        
                        {
                          nameId: "capacity",
                          label: "capacity",
                          placeholder:
                            "1500 L",
                          number: "number",
                        },
                      ].map((item) => (
                        <ListItem key={item.nameId}>
                          <Controller
                            name={item.nameId}
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                // required: true,
                                // pattern: /^[0-9]+(.[0-9]+)?$/
                              }
                            }
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                fullWidth
                                id={item.nameId}
                                label={item.label}
                                error={error}
                                placeholder={item.placeholder}
                                helperText={item.helperText}
                                className={classN.textFiledNumberArrowNone}
                                inputProps={{ type: item.number }}
                                // error={Boolean(errors.rules)}
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionDetails>
                </Accordion>
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
                      onClick={handleSubmit(addNewProduct)}
                    >
                      Add Product
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
                      onClick={handleSubmit(addNewProduct)}
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
         

          <div className={classN.section} //style={{height : openAddModal ? '100px' : '100%'}}
          style={{display : openAddModal ? 'none' : 'block'}}
          
          >
           
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
                  className={classN.btnHeaderWithIcon}
                >
                  New Product
                </Button>

                <AddBox
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenAddModal(true)}
                  className={classN.btnIconHeader}
                />
              </div>
            </List>

            {loading ? (
              <div className={classN.loadingContainer}>
                <Preloader />
              </div>
            ) : error ? (
              <Typography className={classN.error}>{error}</Typography>
            ) : products.length > 0 ? (
              <List>
                <ListItem>
                  <Typography // component="h1" variant="h1"
                    className={classN.titleHeader}
                  >
                    List of brans
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        {/** */}
                        <TableRow>
                          <TableCell className={classN.tableCellHeader}>
                            ID
                          </TableCell>
                          <TableCell className={classN.tableCellHeader}>
                            NAME
                          </TableCell>
                          <TableCell className={classN.tableCellHeader}>
                            PRICE
                          </TableCell>
                          <TableCell className={classN.tableCellHeader}>
                            CATEGORY
                          </TableCell>
                          <TableCell className={classN.tableCellHeader}>
                            COUNT
                          </TableCell>
                          <TableCell className={classN.tableCellHeader}>
                            RATING
                          </TableCell>
                          <TableCell className={classN.tableCellHeader}>
                            {/*ACTION*/}
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.map((product, index) => (
                          <TableRow key={product._id}>
                            <TableCell className={classN.tableCell}>
                              {product._id.substring(20, 24)}
                            </TableCell>
                            <TableCell className={classN.tableCell}>
                              {product.name}
                            </TableCell>

                            <TableCell className={classN.tableCell}>
                              ${product.price}
                            </TableCell>
                            <TableCell className={classN.tableCell}>
                              {product.category}
                            </TableCell>
                            <TableCell className={classN.tableCell}>
                              {product.countInStock}
                            </TableCell>
                            <TableCell className={classN.tableCell}>
                              {product.rating}
                            </TableCell>
                            <TableCell className={classN.tableCell}>
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
                                  onClick={() => deleteProductFun(product._id)}
                                >
                                  <DeleteOutline
                                    className={classN.menuItemNormalBtn}
                                  />
                                  <span>Delet</span>
                                </MenuItem>
                                <NextLink
                                  href={`/admin/product/${product._id}`}
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

                                <NextLink
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
                                </NextLink>
                              </Menu>

                              {/* <NextLink
                             href={`/admin/product/${product._id}`}
                             passHref
                           >
                             <Button size="small" variant="contained">
                               Edit
                             </Button>
                           </NextLink>
                           <Button
                             variant="contained"
                             size="small"
                             onClick={() => deleteProductFun(product._id)}
                           >
                             Delete
                           </Button> */}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>


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
                    count={productsDoc.pages}
                    onChange={pageChanger}
                  />
                </div>
                </ListItem>

              
              </List>
            ) : (
              <div className={classN.emptyPageImageContainer}>
                <Typography className={classN.titleHeader}>
                  Look like you haven&apos;t entered any Products before.
                  <span
                    className={classN.primaryColor}
                    // onClick={() => setOpenShippingAddressModal(true)}
                  >
                    {" "}
                    Add New Product.
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

// for rende productHistory only in front end
export default dynamic(() => Promise.resolve(AdminProducts), { ssr: false });
