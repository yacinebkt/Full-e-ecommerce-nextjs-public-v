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
  FormControl,
  OutlinedInput,
  InputLabel,
  Backdrop,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Breadcrumbs,

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

import useStyles from "../../../utils/styles/styles";
import NextLink from "next/link";
import { useSnackbar } from "notistack";
//import Cookies from 'js-cookie';

import { useForm, Controller } from "react-hook-form";
import Leftbar from "../../../components/Layout/Leftbar";
import Preloader from "../../../components/Layout/Preloader";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        /*product: action.payload,*/ error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    //

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

    //
    case "FETCH_BRANDS_REQUEST":
      return { ...state, loadingBrands: true, errorBrands: "" };
    case "FETCH_BRANDS_SUCCESS":
      return {
        ...state,
        loadingBrands: false,
        /*brands: action.payload,*/ errorBrands: "",
      };
    case "FETCH_BRANDS_FAIL":
      return { ...state, loadingBrands: false, errorBrands: action.payload };
    //
    case "FETCH_CATEGORIES_REQUEST":
      return { ...state, loadingCategories: true, errorCategories: "" };
    case "FETCH_CATEGORIES_SUCCESS":
      return {
        ...state,
        loadingCategories: false,
        /*brands: action.payload,*/ errorCategories: "",
      };
    case "FETCH_CATEGORIES_FAIL":
      return {
        ...state,
        loadingCategories: false,
        errorCategories: action.payload,
      };

    default:
      state;
  }
}

function ProductEdit({ params }) {
  const productId = params.id;

  const { state /*dispatch*/ } = useContext(Store);

  const [isFeatured, setIsFeatured] = useState(false);

  const [brand, setBrand] = useState("");
  const [brands, setBrands] = useState([]);

  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [color, setColor] = useState("");




  const [initailProductImages, setInitailProductImages] = useState([]);
  const [initailFeaturedImage, setInitailFeaturedImage] = useState('');


  const [imagesTest, setImagesTest] = useState([]);
  const [previewImagesTest, setPreviewImagesTest] = useState([]);

  const [featuredImageObject, setFeaturedImageObject] = useState(null);
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
  const [supportedMobileOperatingSystem, setSupportedMobileOperatingSystem] =
    useState(false);
  const [wirelessLanAdapter, setWirelessLanAdapter] = useState(false);

  const [quickCharging, setQuickCharging] = useState(false);


  const [breadArray, setBreadArray] =useState([{name: 'home', link :'/' },
    {name: 'dashboard', link :'/admin/dashboard' },
  {name: 'products', link :'/admin/products' },
  {name: 'edit', link :'#' },
])



  const [
    {
      loading,
      loadingUpdate,
      loadingUpload,
      error,
      loadingCategories,
      loadingBrands /*product*/,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    loadingBrands: true,
    loadingCategories: true,
    // product: {},
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
          const { data } = await axios.get(`/api/admin/products/${productId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: "FETCH_SUCCESS" });
          console.log('data all', data)

          setValue("name", data.name ? data.name : '')
          setValue("slug", data.slug ? data.slug : '')
          setValue("price", data.price ? data.price : 0)
          setValue("countInStock", data.countInStock ? data.countInStock : 0)
          setValue("description", data.description ? data.description : '')

          setValue('color_details', data.color_details ? data.color_details : '')
          setValue('model_number', data.model_number ? data.model_number : '')
          setValue('model_name', data.model_name ? data.model_name : '')
          setValue('launch_year', data.launch_year ? data.launch_year : 0)
          setValue('in_the_box', data.in_the_box ? data.in_the_box : '')
      
          setInitailProductImages(data.productPictures ? data.productPictures : [])
          setInitailFeaturedImage(data.featuredImage ? data.featuredImage : '')
          setBrand(data.brand ? data.brand : '')
          setCategory(data.category ? data.category : '')
          setIsFeatured(data.isFeatured ? data.isFeatured : false)
          setColor(data.color ? data.color : '')

          setValue("additional_features", data.additional_features ? data.additional_features : '')
          setValue("installation_demo_details", data.installation_demo_details ? data.installation_demo_details : '')
          setValue("capacity", data.capacity ? data.capacity : 0)

          // set initial value
          //storage
          if (data.storage) {
            setValue("internalStorage", data.storage.internalStorage? data.storage.internalStorage : 0 );
            setValue("expandableStorage", data.storage.expandableStorage ?  data.storage.expandableStorage  : 0);
            setValue("supportedMemoryCardType", data.storage.supportedMemoryCardType ? data.storage.supportedMemoryCardType : '' );
            setValue("memoryCardSlotType", data.storage.memoryCardSlotType ? data.storage.memoryCardSlotType : '' );
            setValue("ram", data.storage.ram ? data.storage.ram  : 0 );
            setValue("ramType", data.storage.ramType ? data.storage.ramType : '' );
            setValue("ssdCapacity", data.storage.ssdCapacity ? data.storage.ssdCapacity : 0 );
            setValue("hddCapacity", data.storage.hddCapacity ? data.storage.hddCapacity  : 0 );
            setValue("ramFrequency", data.storage.ramFrequency ? data.storage.ramFrequency : 0 );
            setValue("cache", data.storage.cache ? data.storage.cache : 0 );
  
          }else {
            setValue("internalStorage",  0 );
            setValue("expandableStorage",  0);
            setValue("supportedMemoryCardType", '' );
            setValue("memoryCardSlotType", '' );
            setValue("ram",  0 );
            setValue("ramType", '' );
            setValue("ssdCapacity",  0 );
            setValue("hddCapacity",  0 );
            setValue("ramFrequency",  0 );
            setValue("cache",  0 );
          }

          //audio_features
          if (data.audio_features){
            setValue("numberOfSpeakers", data.audio_features.numberOfSpeakers ? data.audio_features.numberOfSpeakers : 0);
            setValue("speakerOutputRMS", data.audio_features.speakerOutputRMS ? data.audio_features.speakerOutputRMS : 0);
            setValue("internalMic", data.audio_features.internalMic ? data.audio_features.internalMic : '');
            setValue("speakerType", data.audio_features.speakerType ? data.audio_features.speakerType : '');
            setValue("soundTechnology", data.audio_features.soundTechnology ? data.audio_features.soundTechnology : '');
            setValue("soundMode", data.audio_features.soundMode ? data.audio_features.soundMode : '');
            setValue("soundEnhancements", data.audio_features.soundEnhancements ? data.audio_features.soundEnhancements : '');
            setValue("surroundSound", data.audio_features.surroundSound ? data.audio_features.surroundSound : '');
            setValue("supportedAudioFormats",data.audio_features.supportedAudioFormats ? data.audio_features.supportedAudioFormats : '');
            setValue("otherAudioFeatures",data.audio_features.otherAudioFeatures ? data.audio_features.otherAudioFeatures : '');
            setValue("soundProperties", data.audio_features.soundProperties ? data.audio_features.soundProperties : '');
          }else {
            setValue("numberOfSpeakers",  0);
            setValue("speakerOutputRMS",  0);
            setValue("internalMic", '');
            setValue("speakerType", '');
            setValue("soundTechnology", '');
            setValue("soundMode",  '');
            setValue("soundEnhancements", '');
            setValue("surroundSound", '');
            setValue("supportedAudioFormats",'');
            setValue("otherAudioFeatures",'');
            setValue("soundProperties", '');
          }
        
          
          //video_features
          if (data.video_features) {
            setValue("pictureEngine", data.video_features.pictureEngine ? data.video_features.pictureEngine  :''  );
            setValue("digitalTVReception",data.video_features.digitalTVReception ? data.video_features.digitalTVReception : '');
            setValue("brightness", data.video_features.brightness ? data.video_features.brightness : 0  );
            setValue("refreshRateDisplay",data.video_features.refreshRateDisplay ? data.video_features.refreshRateDisplay : 0 );
            setValue("viewAngle", data.video_features.viewAngle ?  data.video_features.viewAngle : 0 );
            setValue("ledDisplayType", data.video_features.ledDisplayType ? data.video_features.ledDisplayType  : '' );
            setValue("aspectRatio", data.video_features.aspectRatio ? data.video_features.aspectRatio : '' );
            setValue("supportedVideoFormats",data.video_features.supportedVideoFormats ? data.video_features.supportedVideoFormats : '' );
            setValue("otherVideoFeatures",data.video_features.otherVideoFeatures ? data.video_features.otherVideoFeatures : '' );
          }else {
            setValue("pictureEngine", '');
            setValue("digitalTVReception", '');
            setValue("brightness", 0);
            setValue("refreshRateDisplay", 0);
            setValue("viewAngle", 0);
            setValue("ledDisplayType", '');
            setValue("aspectRatio", '');
            setValue("supportedVideoFormats", '');
            setValue("otherVideoFeatures", ''); 
          }

         
        
          //display_features

          if (data.display_features) {
            setValue("screenSize", data.display_features.screenSize ? data.display_features.screenSize : 0);
            setValue("resolutionX", data.display_features.resolutionX ? data.display_features.resolutionX : 0);
            setValue("resolutionY", data.display_features.resolutionY ? data.display_features.resolutionY : 0);
            setValue("resolutionType", data.display_features.resolutionType ? data.display_features.resolutionType : '');
            setValue("gpu", data.display_features.gpu ? data.display_features.gpu : '');
            // setValue("hdRecording", data.display_features.hdRecording ? data.display_features.hdRecording : 0);
            // setValue("touchScreen", data.display_features.touchScreen ? data.display_features.touchScreen : 0);
            setValue("screenType", data.display_features.screenType ? data.display_features.screenType : '');
            setValue("displayColors", data.display_features.displayColors ? data.display_features.displayColors : 0);
            // setValue("hdGameSupport", data.display_features.hdGameSupport ? data.display_features.hdGameSupport : 0);
            setValue("refreshRate", data.display_features.refreshRate ? data.display_features.refreshRate : 0);
            setValue("otherDisplayFeatures", data.display_features.otherDisplayFeatures ? data.display_features.otherDisplayFeatures : '');
  
            setHdRecordingDisplay(data.display_features.hdRecording ? data.display_features.hdRecording : false);
            setTouchScreen(data.display_features.touchScreen ? data.display_features.touchScreen : false);
            setHdGameSupport(data.display_features.hdGameSupport ? data.display_features.hdGameSupport : false);
          }else {
            setValue("screenSize",  0);
            setValue("resolutionX",  0);
            setValue("resolutionY",  0);
            setValue("resolutionType", '');
            setValue("gpu", '');
            // setValue("hdRecording", 0);
            // setValue("touchScreen",  0);
            setValue("screenType", '');
            setValue("displayColors",  0);
            // setValue("hdGameSupport", 0);
            setValue("refreshRate",  0);
            setValue("otherDisplayFeatures", '');
  
            setHdRecordingDisplay(false);
            setTouchScreen(false);
            setHdGameSupport(false);
            
          }
         
          // operating_system

          if (data.operating_system) {
            setValue("operatingSystem", data.operating_system.operatingSystem ? data.operating_system.operatingSystem : '');
            setValue("operatingSystemArchitecture",data.operating_system.operatingSystemArchitecture ? data.operating_system.operatingSystemArchitecture : '');
            setValue("systemArchitecture",data.operating_system.systemArchitecture ? data.operating_system.systemArchitecture : 0);
            setValue("operatingFrequency",data.operating_system.operatingFrequency ? data.operating_system.operatingFrequency : '');  
          }else{
            setValue("operatingSystem", '');
            setValue("operatingSystemArchitecture", '');
            setValue("systemArchitecture", 0);
            setValue("operatingFrequency", '');  
          }
        
          //processor_features

          
          if (data.processor_features) {
            setValue("processorType", data.processor_features.processorType ? data.processor_features.processorType : '');
            setValue("processorCore", data.processor_features.processorCore ? data.processor_features.processorCore : '');
            setValue("primaryClockSpeed", data.processor_features.primaryClockSpeed ? data.processor_features.primaryClockSpeed : 0);
            setValue("secondaryClockSpeed", data.processor_features.secondaryClockSpeed ? data.processor_features.secondaryClockSpeed : 0);
            setValue("othersClockSpeed", data.processor_features.othersClockSpeed ? data.processor_features.othersClockSpeed : '');
            setValue("dedicatedGraphicMemoryType", data.processor_features.dedicatedGraphicMemoryType ? data.processor_features.dedicatedGraphicMemoryType : '');
            setValue("dedicatedGraphicMemory", data.processor_features.dedicatedGraphicMemory ? data.processor_features.dedicatedGraphicMemory : 0);
            setValue("processorBrand", data.processor_features.processorBrand ? data.processor_features.processorBrand : '');
            setValue("processorName", data.processor_features.processorName ? data.processor_features.processorName : '');
            setValue("processorGeneration", data.processor_features.processorGeneration ? data.processor_features.processorGeneration : '');
            setValue("numberofCores", data.processor_features.numberofCores ? data.processor_features.numberofCores : 0);
            setValue("graphicProcessor", data.processor_features.graphicProcessor ? data.processor_features.graphicProcessor : '');  
          } else {
            setValue("processorType", '');
            setValue("processorCore", '');
            setValue("primaryClockSpeed", 0);
            setValue("secondaryClockSpeed", 0);
            setValue("othersClockSpeed", '');
            setValue("dedicatedGraphicMemoryType", '');
            setValue("dedicatedGraphicMemory", 0);
            setValue("processorBrand", '');
            setValue("processorName", '');
            setValue("processorGeneration", '');
            setValue("numberofCores", 0);
            setValue("graphicProcessor", );  
          
          }

            //camera
          if (data.camera) {
            setValue("primaryCamera", data.camera.primaryCamera ? data.camera.primaryCamera : '');
            setValue("selfiCamera", data.camera.selfiCamera ? data.camera.selfiCamera : '');
            setValue("maxPrimaryCamera", data.camera.maxPrimaryCamera ? data.camera.maxPrimaryCamera : 0);
            setValue("maxSelfiCamera", data.camera.maxSelfiCamera ? data.camera.maxSelfiCamera : 0);
            setValue("primaryCameraFeatures", data.camera.primaryCameraFeatures ? data.camera.primaryCameraFeatures : '');
            setValue("selfiCameraFeatures", data.camera.selfiCameraFeatures ? data.camera.selfiCameraFeatures : '');
            setValue("webCamera", data.camera.webCamera ? data.camera.webCamera : '');
            setValue("flash", data.camera.flash ? data.camera.flash : '');
            // setValue("videoRecording", data.camera.videoRecording ? data.camera.videoRecording : 0);
            // setValue("hdRecording", data.camera.hdRecording ? data.camera.hdRecording : 0);
            // setValue("fullHDRecording", data.camera.fullHDRecording ? data.camera.fullHDRecording : 0);
            setValue("videoRecordingResolution", data.camera.videoRecordingResolution ? data.camera.videoRecordingResolution : '');
            setValue("frameRate", data.camera.frameRate ? data.camera.frameRate : 0);
            setValue("digitalZoom", data.camera.digitalZoom ? data.camera.digitalZoom : 0);
  
            setVideoRecording(data.camera.videoRecording ? data.camera.videoRecording : false);
            setHdRecording(data.camera.hdRecording ? data.camera.hdRecording : false);
            setFullHDRecording(data.camera.fullHDRecording ? data.camera.fullHDRecording : false);

          }else {
            setValue("primaryCamera", '');
            setValue("selfiCamera", '');
            setValue("maxPrimaryCamera", 0);
            setValue("maxSelfiCamera", 0);
            setValue("primaryCameraFeatures", '');
            setValue("selfiCameraFeatures", '');
            setValue("webCamera", '');
            setValue("flash", '');
            // setValue("videoRecording", 0);
            // setValue("hdRecording", 0);
            // setValue("fullHDRecording", 0);
            setValue("videoRecordingResolution", '');
            setValue("frameRate", 0);
            setValue("digitalZoom", 0);
  
            setVideoRecording(false);
            setHdRecording(false);
            setFullHDRecording(false);
          }
       
        
          
          //connectivity_features
          if (data.connectivity_features) {
            setValue("networkType", data.connectivity_features.networkType ? data.connectivity_features.networkType : '');
            setValue("maxNetworkType", data.connectivity_features.maxNetworkType ? data.connectivity_features.maxNetworkType : '');
            // setValue("supported4G", data.connectivity_features.supported4G ? data.connectivity_features.supported4G : '');
            // setValue("supported5G", data.connectivity_features.supported5G ? data.connectivity_features.supported5G : '');
            setValue("supportedNetworks",data.connectivity_features.supportedNetworks ? data.connectivity_features.supportedNetworks : '');
            setValue("internetConnectivity",data.connectivity_features.internetConnectivity ? data.connectivity_features.internetConnectivity : '');
            setValue("wifi", data.connectivity_features.wifi ? data.connectivity_features.wifi : '');
            // setValue("wifiHotspot", data.connectivity_features.wifiHotspot ? data.connectivity_features.wifiHotspot : '');
            setValue("bluetooth", data.connectivity_features.bluetooth ? data.connectivity_features.bluetooth : '');
            setValue("audioJack", data.connectivity_features.audioJack ? data.connectivity_features.audioJack : '');
            setValue("usbType", data.connectivity_features.usbType ? data.connectivity_features.usbType : '');
            setValue("hdmiType", data.connectivity_features.hdmiType ? data.connectivity_features.hdmiType : '');
            // setValue("nfc", data.connectivity_features.nfc ? data.connectivity_features.nfc : '');
            // setValue("gps", data.connectivity_features.gps ? data.connectivity_features.gps : '');
            setValue("gprs", data.connectivity_features.gprs ? data.connectivity_features.gprs : '');
            // setValue("rg45", data.connectivity_features.rg45 ? data.connectivity_features.rg45 : '');
            setValue("mapSupport", data.connectivity_features.mapSupport ? data.connectivity_features.mapSupport : '');
            setValue("usbPorts", data.connectivity_features.usbPorts ? data.connectivity_features.usbPorts : 0);
            setValue("hdmiPorts", data.connectivity_features.hdmiPorts ? data.connectivity_features.hdmiPorts : 0);
            // setValue("radioSupport", data.connectivity_features.radioSupport ? data.connectivity_features.radioSupport : '');
            // setValue("headphoneJack", data.connectivity_features.headphoneJack ? data.connectivity_features.headphoneJack : '');
            setValue("sensors", data.connectivity_features.sensors ? data.connectivity_features.sensors : '');
            setValue("wirelessLAN", data.connectivity_features.wirelessLAN ? data.connectivity_features.wirelessLAN : '');
            setValue("ethernet", data.connectivity_features.ethernet ? data.connectivity_features.ethernet : '');
  
            setSupported4G(data.connectivity_features.supported4G ? data.connectivity_features.supported4G : false);
            setSupported5G(data.connectivity_features.supported5G ? data.connectivity_features.supported5G : false);
            setWifiHotspot(data.connectivity_features.wifiHotspot ? data.connectivity_features.wifiHotspot : false);
            setNfc(data.connectivity_features.nfc ? data.connectivity_features.nfc : false);
            setGps(data.connectivity_features.gps ? data.connectivity_features.gps : false);
            setRg45(data.connectivity_features.rg45 ? data.connectivity_features.rg45 : false);
            setRadioSupport(data.connectivity_features.radioSupport ? data.connectivity_features.radioSupport : false);
            setHeadphoneJack(data.connectivity_features.headphoneJack ? data.connectivity_features.headphoneJack : false);
          }else{
            setValue("networkType", '');
            setValue("maxNetworkType", '');
            // setValue("supported4G", '');
            // setValue("supported5G", '');
            setValue("supportedNetworks", '');
            setValue("internetConnectivity", '');
            setValue("wifi", '');
            // setValue("wifiHotspot", '');
            setValue("bluetooth", '');
            setValue("audioJack", '');
            setValue("usbType", '');
            setValue("hdmiType", '');
            // setValue("nfc", '');
            // setValue("gps", '');
            setValue("gprs", '');
            // setValue("rg45",  '');
            setValue("mapSupport", '');
            setValue("usbPorts", 0);
            setValue("hdmiPorts", 0);
            // setValue("radioSupport",  '');
            // setValue("headphoneJack", '');
            setValue("sensors", '');
            setValue("wirelessLAN", '');
            setValue("ethernet", '');
  
            setSupported4G(false);
            setSupported5G(false);
            setWifiHotspot(false);
            setNfc(false);
            setGps(false);
            setRg45(false);
            setRadioSupport(false);
            setHeadphoneJack(false);
  
          }
         
         
          //smart_tv_features
          if (data.smart_tv_features) {
            // setValue("supportedAppNetflix", data.smart_tv_features.supportedAppNetflix ? data.smart_tv_features.supportedAppNetflix : 0);
            // setValue("supportedAppYoutube", data.smart_tv_features.supportedAppYoutube ? data.smart_tv_features.supportedAppYoutube : 0);
            // setValue("supportedAppDisney", data.smart_tv_features.supportedAppDisney ? data.smart_tv_features.supportedAppDisney : 0);
            // setValue("supportedApps", data.smart_tv_features.supportedApps ? data.smart_tv_features.supportedApps : 0);
            // setValue("supportedBluetooth", data.smart_tv_features.supportedBluetooth ? data.smart_tv_features.supportedBluetooth : '');
            // setValue("screenMirroring", data.smart_tv_features.screenMirroring ? data.smart_tv_features.screenMirroring : '');
            // setValue("supportedMobileOperatingSystem", data.smart_tv_features.supportedMobileOperatingSystem ? data.smart_tv_features.supportedMobileOperatingSystem : 0);
            setValue("soundModeTv", data.smart_tv_features.soundMode ? data.smart_tv_features.soundMode : "");
            setValue("numberofCoresTv", data.smart_tv_features.numberofCores ? data.smart_tv_features.numberofCores : 0);
            setValue("processor", data.smart_tv_features.processor ? data.smart_tv_features.processor : '');
            setValue("graphicProcessorTv", data.smart_tv_features.graphicProcessor ? data.smart_tv_features.graphicProcessor : '');
            setValue("ramCapacity", data.smart_tv_features.ramCapacity ? data.smart_tv_features.ramCapacity : 0);
            setValue("storageMemory", data.smart_tv_features.storageMemory ? data.smart_tv_features.storageMemory : 0);
            setValue("operatingSystemTv", data.smart_tv_features.operatingSystem ? data.smart_tv_features.operatingSystem : '');
            setValue("appStoreType", data.smart_tv_features.appStoreType ? data.smart_tv_features.appStoreType : '');
            // setValue("wirelessLanAdapter", data.smart_tv_features.wirelessLanAdapter ? data.smart_tv_features.wirelessLanAdapter : 0);
            setValue("supportedDevicesForCasting", data.smart_tv_features.supportedDevicesForCasting ? data.smart_tv_features.supportedDevicesForCasting : '');
            setValue("otherInternetFeatures", data.smart_tv_features.otherInternetFeatures ? data.smart_tv_features.otherInternetFeatures : '');
          
            setSupportedAppNetflix(data.smart_tv_features.supportedAppNetflix ? data.smart_tv_features.supportedAppNetflix : false);
            setSupportedAppYoutube(data.smart_tv_features.supportedAppYoutube ? data.smart_tv_features.supportedAppYoutube : false);
            setSupportedAppDisney(data.smart_tv_features.supportedAppDisney ? data.smart_tv_features.supportedAppDisney : false);
            setSupportedApps(data.smart_tv_features.supportedApps ? data.smart_tv_features.supportedApps : false);
            setSupportedBluetooth(data.smart_tv_features.supportedBluetooth ? data.smart_tv_features.supportedBluetooth : false);
            setScreenMirroring(data.smart_tv_features.screenMirroring ? data.smart_tv_features.screenMirroring : false);
            setSupportedMobileOperatingSystem(data.smart_tv_features.supportedMobileOperatingSystem ? data.smart_tv_features.supportedMobileOperatingSystem : false);
            setWirelessLanAdapter(data.smart_tv_features.wirelessLanAdapter ? data.smart_tv_features.wirelessLanAdapter : false);
  
          }else {
             // setValue("supportedAppNetflix", 0);
            // setValue("supportedAppYoutube", 0);
            // setValue("supportedAppDisney", 0);
            // setValue("supportedApps", 0);
            // setValue("supportedBluetooth", '');
            // setValue("screenMirroring", '');
            // setValue("supportedMobileOperatingSystem", 0);
            setValue("soundModeTv", "");
            setValue("numberofCoresTv", 0);
            setValue("processor", '');
            setValue("graphicProcessorTv", '');
            setValue("ramCapacity", 0);
            setValue("storageMemory", 0);
            setValue("operatingSystemTv", '');
            setValue("appStoreType", '');
            // setValue("wirelessLanAdapter", 0);
            setValue("supportedDevicesForCasting", '');
            setValue("otherInternetFeatures", '');
          
            setSupportedAppNetflix(false);
            setSupportedAppYoutube(false);
            setSupportedAppDisney(false);
            setSupportedApps(false);
            setSupportedBluetooth(false);
            setScreenMirroring(false);
            setSupportedMobileOperatingSystem(false);
            setWirelessLanAdapter(false);
  
          }
         
          //power_features
          if (data.power_features) {
            setValue("powerRequirement", data.power_features.powerRequirement ? data.power_features.powerRequirement : '');
            setValue("powerConsumption", data.power_features.powerConsumption ? data.power_features.powerConsumption : '');
            setValue("powerOutput", data.power_features.powerOutput ? data.power_features.powerOutput : 0);
            setValue("otherPowerFeatures", data.power_features.otherPowerFeatures ? data.power_features.otherPowerFeatures : '');
            setValue("batteryCapacity", data.power_features.batteryCapacity ? data.power_features.batteryCapacity : 0);
            setValue("batteryType", data.power_features.batteryType ? data.power_features.batteryType : '');
            // setValue("quickCharging", data.power_features.quickCharging ? data.power_features.quickCharging : '');
            setValue("batteryBackup", data.power_features.batteryBackup ? data.power_features.batteryBackup : '');
            setValue("batteryCell", data.power_features.batteryCell ? data.power_features.batteryCell : '');
            setValue("powerSupply", data.power_features.powerSupply ? data.power_features.powerSupply : '');
          
            setQuickCharging(data.power_features.quickCharging? data.power_features.quickCharging : false);
          }else {
            setValue("powerRequirement", '');
            setValue("powerConsumption", '');
            setValue("powerOutput", 0);
            setValue("otherPowerFeatures", '');
            setValue("batteryCapacity", 0);
            setValue("batteryType", '');
            // setValue("quickCharging", '');
            setValue("batteryBackup", '');
            setValue("batteryCell", '');
            setValue("powerSupply", '');
          
            setQuickCharging(false);
          
          }

          //dimensions
          
          if (data.dimensions) {
            setValue("width", data.dimensions.width ? data.dimensions.width : 0);
            setValue("height", data.dimensions.height ? data.dimensions.height : 0);
            setValue("depth", data.dimensions.depth ? data.dimensions.depth : 0);
            setValue("weight", data.dimensions.weight ? data.dimensions.weight : 0);
          }else {
            setValue("width", 0);
            setValue("height", 0);
            setValue("depth", 0);
            setValue("weight", 0);
          }



 // industrial_features originalMaterial
          if (data.industrial_features) {
            if (data.industrial_features.originalMaterial) {
              setValue("material", data.industrial_features.originalMaterial.material ? data.industrial_features.originalMaterial.material  : '');
              setValue("percentage", data.industrial_features.originalMaterial.percentage  ? data.industrial_features.originalMaterial.percentage: 0);
            }else {
              setValue("material", '');
              setValue("percentage", 0);
           
            }

           }else {
            setValue("material", '');
            setValue("percentage", 0);
          }
      

         
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
        dispatch({ type: "FETCH_BRANDS_REQUEST" });
        const { data } = await axios.get(`/api/admin/brands`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_BRANDS_SUCCESS" /* payload: data*/ });
        setBrands(data);
      } catch (err) {
        dispatch({ type: "FETCH_BRANDS_FAIL", payload: getError(err) });
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
        dispatch({ type: "FETCH_CATEGORIES_REQUEST" });
        const { data } = await axios.get(`/api/admin/categories`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: "FETCH_CATEGORIES_SUCCESS" /* payload: data*/ });
        setCategories(data.sort((a, b) => a.name.localeCompare(b.name)));
      } catch (err) {
        dispatch({ type: "FETCH_CATEGORIES_FAIL", payload: getError(err) });
      }
    };
    fetchData();
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



  const removeProductImagesFromArray = (img) => {
    setInitailProductImages()
    let filtered = initailProductImages.filter(function(image) { return image != img });
    setInitailProductImages(filtered)
  }

  const removeProductFeatuered = () => {
    setInitailFeaturedImage('')
  }

  const removePriviewImageFromArray = (img) => {

    let filtered = imagesTest.filter(function(el) { return el.name != img });
    setImagesTest(filtered)
    let filteredUrl = previewImagesTest.filter(function(el) { return el.name != img }); 
    setPreviewImagesTest(filteredUrl)
  }


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
    if ( e.target.files.length >0 ) {
      setFeaturedImageObject(e.target.files[0]) 
      removeProductFeatuered()
    }
    
}



const upadateProduct = async ({
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
  //  console.log('numberofCoresTv', numberofCoresTv );
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
 
  if(!(initailProductImages.length + imagesTest.length > 0) ) {
    enqueueSnackbar('you must enter at least one image for product', { variant: "error" });
    return;
  }
  
  
  // featuredImageObject
  // setLoadingAddNewProduct(true)
  let arr = []
  let featuredImage = await uploadFeaturedImageFun()
  let arrayProductImages = await sendImagesData()
  // console.log('arrayProductImages aray ', arrayProductImages );
  // let arrayProductImages = ['item 01, item 02']

    if ((initailProductImages.length + arrayProductImages.length) > 0) {

     console.log('arrayProductImages recive now ', arrayProductImages );
   
      
    if ( initailProductImages.length > 0) {
      initailProductImages.map(imageUrl=> {
        arr.push({img : imageUrl.img})
        })
     console.log('initailProductImages  ', arr );

    }

    if ( arrayProductImages.length > 0) {
      arrayProductImages.map(imageUrl=> {
      arr.push({img : imageUrl})
      })    
    console.log('arrayProductImages after etch  ', arr );

    }


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
    supportedBluetooth : supportedBluetooth ? supportedBluetooth : false , //false!true
    screenMirroring : screenMirroring ? screenMirroring : false , //false!true
    supportedMobileOperatingSystem : supportedMobileOperatingSystem ? supportedMobileOperatingSystem : false,  //false!true
    soundMode : soundModeTv ? soundModeTv : '' ,
    numberofCores : numberofCoresTv ? numberofCoresTv : 0 ,
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
      // dispatch({ type: "CREATE_PRODUCT_REQUEST" });

      console.log('dispatch ', 'name :', name, 'description :', description, 'price :', price, 'countInStock :', countInStock,
        'brand :', brand,
        'category :', category , )
      const { data } =  await axios.put(
        `/api/admin/products/${productId}`,
        {
          name : name? name : '', description : description? description : '', price: price ? price : 0, countInStock : countInStock ? countInStock : 0,
          brand : brand ? brand : '', isFeatured : isFeatured ,
          category: category ? category :'' , productPictures : arr ? arr : [], featuredImage : featuredImage ? featuredImage: initailFeaturedImage ,

          color : color? color : '',
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


          smart_tv_features : supportedAppNetflix || supportedAppYoutube || supportedAppDisney || supportedApps || supportedBluetooth || screenMirroring || supportedMobileOperatingSystem || soundModeTv || numberofCoresTv || processor || graphicProcessorTv || ramCapacity || storageMemory || operatingSystemTv || appStoreType || wirelessLanAdapter || supportedDevicesForCasting || otherInternetFeatures
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

      // dispatch({ type: "CREATE_PRODUCT_SUCCESS" });
      enqueueSnackbar("Product Updated successfully", { variant: "success" });
       router.reload();  
      // setLoadingAddNewProduct(false)
      // router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      // dispatch({ type: "CREATE_PRODUCT_FAIL" });

      enqueueSnackbar(getError(err), { variant: "error" });
      // setLoadingAddNewProduct(false)

    }
  } else {
    enqueueSnackbar('Produuct images is required', { variant: "error" });
    // setLoadingAddNewProduct(false)


  }
};

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
    console.log('data resive', data)
    return data ; 
  }catch(err) {
    // console.log('err resive', err)
    enqueueSnackbar(getError(err), { variant: "error" });
    return data = {}
  }

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
  "violet",
  "white",
  "yellow",
  "transparent"
];




  return (
    <Layout title='Edit Product' withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="products" adminDashboard />
        </Grid>

        <Grid className={classN.adminMainGrid}>
          <div className={classN.section}>
            <List>
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
            
      
                 

                  <ListItem>
                    <Typography // component="h1" variant="h1" 
                    className={classN.titleHeader}
                    >
                     Edit product N : {productId}
                    </Typography>
                </ListItem>

                  <div>
                    <form
                      className={classN.form}
                      onSubmit={handleSubmit(upadateProduct)}
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
                                helperText={
                                  errors.name ? "Name is required" : ""
                                }
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
                                //   inputProps={{ type: 'name' }}
                                error={Boolean(errors.slug)}
                                helperText={
                                  errors.slug ? "Slug is required" : ""
                                }
                                {...field}
                              ></TextField>
                            )}
                          ></Controller>
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
                                label="Price"
                                inputProps={{ type: "number" }}
                                error={Boolean(errors.price)}
                                className={classN.textFiledNumberArrowNone}
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

                        {/* countInStock Controller */}

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
                                label="Count In Stock"
                                inputProps={{ type: "number" }}
                                error={Boolean(errors.countInStock)}
                                className={classN.textFiledNumberArrowNone}
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
                          

                          {initailProductImages.length > 0 ? (
                            <div style={{ display: "flex", flexWrap: "wrap", margin : '10px 0 2px 0'}}>
                              {initailProductImages.map((img) => (
                                <div
                                  className={classN.productImagesContanerModule}
                                  key={img}
                                >
                                  <img
                                    src={img.img}
                                    alt=" product image"
                                    className={classN.productImagerModule}
                                  />
                                  <div
                                    className={classN.productImageCancel}
                                    onClick={(e) =>
                                       removeProductImagesFromArray(img)
                                    }
                                  >
                                    <Cancel
                                      className={classN.productImageCancelIcon}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : null
                          }



                          {
                            previewImagesTest.length > 0 ?
                            
                          ( 
                                <div style={{ display:"flex", flexWrap:"wrap"}}>
                
                                  { previewImagesTest.map(img=> (
                                      <div className={classN.productImagesContanerModule} key={img.name}>                                 
                                          <img src={img.url} alt=" product image"  className={classN.productImagerModule} />
                                          <div
                                              className={classN.productImageCancel}
                                              onClick={(e) => removePriviewImageFromArray(img.name)}
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
                            initailFeaturedImage?
                            
                            (    <ListItem>
                            
                              <div className={classN.productImagesContanerModule} >                                 
                                  {/* <img src={ URL.createObjectURL(featuredImageObject)} alt="featured product image"  className={classN.productImagerModule} /> */}
                                  
                                  <img src={initailFeaturedImage} alt="featured product image"  className={classN.productImagerModule} />
                                  <div
                                    className={classN.productImageCancel}
                                    onClick={(e) =>
                                      removeProductFeatuered()
                                    }
                                  >
                                    <Cancel
                                      className={classN.productImageCancelIcon}
                                    />
                                  </div>
                               
                              </div>
                              </ListItem>
                            )
                              
                                                                
                          : null
                          }

                            {
                     featuredImageObject?
                    
                    (    <ListItem>
                    
                      <div className={classN.productImagesContanerModule} key={featuredImageObject.name}>                                 
                          <img src={ URL.createObjectURL(featuredImageObject)} alt="featured product image"  className={classN.productImagerModule} />
                      </div>
                      </ListItem>
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
                          <Controller
                            name="category"
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                //required: true,
                              }
                            }
                            render={({ field }) => (
                              <FormControl
                                style={{ minWidth: "100%", paddingTop: "1rem" }}
                              >
                                <InputLabel
                                  id="categoryLabelId"
                                  style={{ padding: ".7rem 1.1rem" }}
                                >
                                  {" "}
                                  Category
                                </InputLabel>
                                <Select
                                  labelId="categoryLabelId"
                                  id="category"
                                  value={category}
                                  onChange={(e) => setCategory(e.target.value)}
                                  input={<OutlinedInput label="Category" />}
                                  //MenuProps={MenuProps}
                                  error={Boolean(errors.category)}
                                  helperText={
                                    errors.category
                                      ? "Category is required"
                                      : ""
                                  }
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
                            )}
                          ></Controller>
                        </ListItem>

                        {/* brand Controller */}

                        <ListItem className={classN.listItemMin}>
                          <Controller
                            name="brand"
                            control={control}
                            defaultValue=""
                            rules={
                              {
                                //required: true,
                              }
                            }
                            render={({ field }) => (
                              <FormControl
                                style={{ minWidth: "100%", paddingTop: "1rem" }}
                              >
                                <InputLabel
                                  id="brandLabelId"
                                  style={{ padding: ".7rem 1.1rem" }}
                                >
                                  {" "}
                                  Brand
                                </InputLabel>
                                <Select
                                  labelId="brandLabelId"
                                  id="brand"
                                  value={brand}
                                  onChange={(e) => setBrand(e.target.value)}
                                  input={<OutlinedInput label="Brand" />}
                                  //MenuProps={MenuProps}
                                  error={Boolean(errors.brand)}
                                  helperText={
                                    errors.brand ? "Brand is required" : ""
                                  }
                                >
                                  <MenuItem value="">No Brand </MenuItem>

                                  {brands.map((brand) => (
                                    <MenuItem
                                      key={brand.name}
                                      value={brand.name}
                                    >
                                      {brand.name}{" "}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            )}
                          ></Controller>

                          {/* <ListItem>
                        {loadingBrands && <CircularProgress />}
                      </ListItem> */}
                        </ListItem>

                        

                        {/* description Controller */}
                        <ListItem className={classN.listItemFull}>
                          <Controller
                            name="description"
                            control={control}
                            defaultValue=""
                            rules={{
                              required: true,
                            }}
                            render={({ field }) => (
                              <TextField
                                variant="outlined"
                                multiline
                                rows={3}
                                fullWidth
                                id="description"
                                label="Description"
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                    placeholder:
                                      "Built-in Dual Microphone || YES/NO",
                                    number: "",
                                  },
                                  {
                                    nameId: "speakerType",
                                    label: "Speaker type ",
                                    placeholder:
                                      "Built-in Dual Speakers || YES/NO",
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                    placeholder:
                                      "96% NTSC (Typ) Color Saturation",
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                        onClick={(e) =>
                                          setHdRecordingDisplay(
                                            e.target.checked
                                          )
                                        }
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
                                        onClick={(e) =>
                                          setTouchScreen(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setHdGameSupport(e.target.checked)
                                        }
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
                                    placeholder:
                                      "GSM: 850/900/1800 | TD-LTE: ... ",
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                    placeholder:
                                      "Rear: Brighter True Tone Flash with Slow Sync | Front: Retina Flash",
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                        onClick={(e) =>
                                          setVideoRecording(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setHdRecording(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setFullHDRecording(e.target.checked)
                                        }
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
                                  {
                                    nameId: "usbType",
                                    label: "Usb type ",
                                    placeholder:
                                      "1 x USB 3.2 Gen 1 ports, 1 x USB Type-C port (Thunderbolt 4),.",
                                    number: "",
                                  },
                                  {
                                    nameId: "hdmiType",
                                    label: "Hdmi type ",
                                    placeholder: "1 x HDMI 2.0",
                                    number: "",
                                  },
                                  // {nameId :'nfc', label:'nfc ', placeholder:'TRUE / FALSE',  number:'',  },
                                  // {nameId :'gps', label:'gps ', placeholder:'TRUE / FALSE',  number:'',  },
                                  {
                                    nameId: "gprs",
                                    label: "gprs",
                                    placeholder: "YES",
                                    number: "",
                                  },

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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                        onClick={(e) =>
                                          setSupported4G(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setSupported5G(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setWifiHotspot(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setNfc(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setGps(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setRg45(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setRadioSupport(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setHeadphoneJack(e.target.checked)
                                        }
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                        onClick={(e) =>
                                          setSupportedAppNetflix(
                                            e.target.checked
                                          )
                                        }
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
                                        onClick={(e) =>
                                          setSupportedAppYoutube(
                                            e.target.checked
                                          )
                                        }
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
                                        onClick={(e) =>
                                          setSupportedAppDisney(
                                            e.target.checked
                                          )
                                        }
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
                                        onClick={(e) =>
                                          setSupportedApps(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setSupportedBluetooth(
                                            e.target.checked
                                          )
                                        }
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
                                        onClick={(e) =>
                                          setScreenMirroring(e.target.checked)
                                        }
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
                                        onClick={(e) =>
                                          setSupportedMobileOperatingSystem(
                                            e.target.checked
                                          )
                                        }
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
                                        onClick={(e) =>
                                          setWirelessLanAdapter(
                                            e.target.checked
                                          )
                                        }
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                        onClick={(e) =>
                                          setQuickCharging(e.target.checked)
                                        }
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                    label: "Percentage (%)",
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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
                                    placeholder: "1500 L",
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
                                          className={
                                            classN.textFiledNumberArrowNone
                                          }
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

                        <ListItem  style={{display : 'flex', justifyContent : 'flex-start'}}  >
                          <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            fullWidth
                            style={{maxWidth : '380px', margin : '12px 0'}}        
                          >
                            Update
                          </Button>
                          {loadingUpdate && <CircularProgress />}
                        </ListItem>
                      </List>
                    </form>
                  </div>
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
export default dynamic(() => Promise.resolve(ProductEdit), { ssr: false });
