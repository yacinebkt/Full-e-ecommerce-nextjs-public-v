import theme from "../theme/theme";
import { makeStyles, createTheme } from "@material-ui/core";
import { css, keyframes } from "@emotion/react";

import BackIm from "../../public/SignUp.png";
const maxWidthV = 1800;
const maxWidthNav = 1600;

const primary = "#088178"
const navbarBackgound = "rgb(0, 30, 60)";

const navbarHeight = 80;
const adminSidebarWidth = 320;
const fonts = {
  textLg: "13px",
  textMd: "",
  textSm: "",
  textXs: "",

  titleLg: "",
  titleMd: "",
  titleSm: "",
  titleXs: "",

  subTitleLg: "",
  subTitleMd: "",
  subTitleSm: "",
  subTitleXs: "",
};

const rotate = keyframes`
  0% {
    transform: rotateX(35deg) rotateY(-45deg);
  }
  100% {
    /* transform: rotateX(35deg); */
  }
`;

const useStyles = makeStyles(() => ({
  navbar: {
    backgroundColor: navbarBackgound,
    height: `${navbarHeight}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: theme.zIndex.drawer+100 ,
    "& a": {
      color: "#fff",
      marginLeft: 10,
      padding: 0,
      margin: 0,
      display: "flex",
    },
    padding: "10px 10px",
    paddingRight: "12px",

    margin: "0 !important",
    [theme.breakpoints.down("xs")]: {
      padding: "0 5px",
     paddingRight: "10px",

    },
  },

  smt : {
    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
    
    },
  },


  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",
    maxWidth: maxWidthNav,
    padding: "0 !important",
    margin: "0 !important",
  },

  firstTollbar: {
    width: "70%",
    display: "flex",
    justifyContent: "space-between",

    [theme.breakpoints.down("lg")]: {
      width: "60%",
    },

    [theme.breakpoints.down("md")]: {
      width: "80%",
      justifyContent: "flex-start",
    },

    [theme.breakpoints.down("sm")]: {
      width: "60%",
      justifyContent: "flex-start",
    },

    [theme.breakpoints.down("xs")]: {
      width: "80%",
      justifyContent: "flex-start",
    },
  },

  secondTollbar: {
    width: "30%",
    display: "flex",
    justifyContent: "flex-end",

    [theme.breakpoints.down("lg")]: {
      width: "40%",
    },

    [theme.breakpoints.down("md")]: {
      width: "20%",
      justifyContent: "flex-end",
    },

    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },

    [theme.breakpoints.down("xs")]: {
      width: "auto",
      // justifyContent :'flex-end',
      // backgroundColor:'yellow'
    },
  },

  navBarTitles: {
    fontSize: "1.2rem",
    cursor: "pointer",
    marginRight: "35px",
    textDecoration: "none",
    transition: "all .2s ease-in",
    // display : 'none',

    [theme.breakpoints.down("lg")]: {
      marginRight: "20px",
    },

    [theme.breakpoints.down("md")]: {
      marginRight: "0",
      // fontSize: '1.3rem !important',
      fontSize: "1.7rem",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },

    [theme.breakpoints.down("xs")]: {
      padding: "0px",
      marginRight: "2px",
      fontSize: "1.6rem",
    },
  },

  noneIconeMobile: {
    [theme.breakpoints.down("xs")]: {
      display: "none !important",
    },
  },

  navBarTitlesSpan: {
    textTransform: "capitalize",
    [theme.breakpoints.down("lg")]: {},

    [theme.breakpoints.down("md")]: {},

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  navbarButton: {
    background: "#fff",
    color: "#111",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#333",
      transform: "scale(1.16) rotate(90deg)",
      // opacity : 0.8,
    },
  },

  navbarButtonListDashhborad: {
    background: "#fff",
    color: "#111",
    borderRadius: "50%",
    transition: "all 0.2s ease",
    "&:hover": {
      color: "#333",
      transform: "scale(1.1)",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: ".85rem",
    },
  },

  // navBarTitlesHelp : {
  //     [theme.breakpoints.down('md')] : {
  //         display : 'none !important',
  //     },

  //     [theme.breakpoints.down('sm')] : {
  //         display : 'none !important',
  //     },
  // },

  searchSection: {
    width: "70%",
    margin: "0 20px",
    // border :'1px solid red',

    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
      // height :'50px',
    },
  },

  searchSection02: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    boxSizing: "border-box",
    margin: "20px 0 02px 0",

    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  searchForm: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,

    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

  searchInput: {
    // paddingLeft : 5,
    // border : '3px solid green',
    width: "-webkit-fill-available",
    color: "#000",
    "&::placeholder": {
      color: "#606060",
    },

    [theme.breakpoints.down("xs")]: {
      "&::placeholder": {
        fontSize: "11px",
      },
    },
  },

  searchBtn: {
    // border : '3px solid blue',
    padding: "0 32px",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderRadius: 0,
    transition: "all .2s ease-in",

    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "#fff",
      opacity: "0.9",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "0 15px",
      fontSize: "14px",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 6px",
      fontSize: "11px",
    },
  },

  iconBtn: {
    // backgroundColor:'#f8c040',
    // padding: 5,
    borderRadius: "0 5px 5px 0",
    cursor: "normal",

    "&:hover": {
      cursor: "normal",
      opacity: "1",
      backgroundColor: "transparent",
    },

    "& span": {
      color: "#000",
    },
  },

  menuBtn: {
    padding: 0,
    margin: 0,
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },

  mainContainer : {

    display: "flex",
    justifyContent: "center",
    width :'100%',
    backgroundColor:'#ffffea',


  },

  main: {
    minHeight: "80vh",
    width :'100%',
    backgroundColor:'#fff',
    border : '1px solid rgba(0, 0, 0, .036)'

    // maxWidth : '2000px',

    // backgroundColor:'#ddd',
    // overflow:'hidden',
  },

  mainHeader : {
    backgroundColor:'#fff',
    width : '100%',
    border : '1px solid rgba(0, 0, 0, .036)'

  },

  mainFo : {
    width :'100%',
    maxWidth : '2000px',
    backgroundColor:'#fff',
    border : '1px solid rgba(0, 0, 0, .036)'


  },

  footer: {
    textAlign: "center",
    marginTop: 15,
    paddingBottom: "60px",
  },

  brand: {
    // fontWeight:700,
    // fontSize:'1.5rem'
    height: "48px",

    [theme.breakpoints.down("sm")]: {
      height: "35px",
    },

    [theme.breakpoints.down("xs")]: {
      height: "25px",
      maxWidth: "100%",
    },
  },

  leftSideProfile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  brandFooter: {
    // fontWeight:700,
    // fontSize:'1.5rem'
    height: "52px",

    [theme.breakpoints.down("sm")]: {
      height: "38px",
    },

    [theme.breakpoints.down("xs")]: {
      height: "25px",
    },
  },

  navbarBtn: {
    // display : 'none !important',
    color: "#eee",
    textTransform: "initial",

    [theme.breakpoints.down("sm")]: {
      // display : 'none',
      padding: 0,
      margin: 0,
      minWidth: 0,
    },
  },

  humbrger: {
    color: "#eee",
    textTransform: "initial",
    fontSize: "2rem",

    [theme.breakpoints.down("sm")]: {
      // display : 'none',
      padding: 0,
      margin: 0,
      minWidth: 0,
    },
  },

  grow: {
    flexGrow: 1,
  },

  form: {
    width: "100%",
    // maxWidth : 700,
    // margin :'0 auto',
  },

  formShipping: {
    width: "100%",
    // maxWidth: "700px",
    // margin: "0 auto",
  },
  formShippingHeader: {
    width: "100%",
    textAlign: "center",
  },

  contactLeftSide: {
    padding: "20px 0",
    width: "63%",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  contactRightSide: {
    width: "37%",
    height: "100%",
    borderLeft: `4px solid ${primary}`,
    borderRadius: "2px",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.4s ease",

    [theme.breakpoints.down("sm")]: {
      width: "100%",
      borderLeft: `0px solid ${primary}`,
      borderBottom: `4px solid ${primary}`,
    },
  },

  contactDetaisContainer: {
    display: "flex",
    alignItems: "center",
    margin: "4px 0",
  },

  contactInfoContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    "& > p": {
      fontSize: "1.1rem",
      marginRight: "7px",

      [theme.breakpoints.down("sm")]: {
        fontSize: ".85rem",
        marginRight: "7px",
      },
    },
  },

  contactIconContainer: {
    width: "48px",
    height: "48px",
    margin: "10px 12px 10px 04px",
    borderRadius: "50%",
    padding: "5px",
    backgroundColor: primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFF",
    fontSize: "1.9rem",
    fontWeight: 700,

    [theme.breakpoints.down("sm")]: {
      width: "34px",
      height: "34px",
      fontSize: "1.3rem",
    },
  },

  section: {
    position : 'relative',
    marginTop: 15,
    marginBottom: 15,
    padding: "0 30px",
    width: "100%",


    [theme.breakpoints.down("md")]: {
      padding: "0 20px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "0 10px",
    },

    [theme.breakpoints.down("xs")]: {
      padding: "0 7px",
    },
  },

  list0: {
    margin: 0,
    padding: 0,
  },

  tr_Bg: {
    backgroundColor: "transparent",
  },

  error: {
    color: "#f04040",
  },

  fullWidth: {
    width: "100%",
  },

  reviewForm: {
    maxWidth: 800,
    width: "100%",
  },

  reviewsSection: {
    border: "1px solid rgba(0, 0, 0, .096)",
    margin: "5px",
    marginBottom: "0px",
    padding: "5px",
  },

  reviewContainer: {
    border: "1px solid rgba(0, 0, 0, .096)",
    marginBottom: "5px",
  },

  reviewItem: {
    marginRight: "1rem",
    // borderRight : '1px solid #808080',
    paddingRight: "1rem",
  },

  carouselMui: {
    border : '2px solid red',

 
  },

  featuredImageCarousel : {
    maxHeight : '350px',
    width : '100%',
    position :'relative',

    overflow: "hidden",

    display : 'flex',
    justifyContent :'center',
    alignItems: "top",
    cursor :'pointer',
  },

  featuredImageLogo : {
     position: "absolute",
    right: "2px",
    top: "3px",
    // height : '10px',
    width : '100px !important',
    [theme.breakpoints.down("sm")]: {
      width : '40px !important',
      right: "0px",

    },
    [theme.breakpoints.down("xs")]: {
      width : '35px !important',
      right: "0px",

    },
  },

  featuredImage : {
    // height : '100%',
    width : '100%',
    height : '100%',
    // objectFit: "cover",
    // position: "absolute",
    // left: "50%",
    // top: "50%",
    // transform: "translateY(-50%)",
  },
  featuredImageLeftBtn : {
    width : '20px',
    position: "absolute",
    height : '100%',
    top : 0,
    left : 0,
    backgroundColor: 'blue',
  },
  featuredImageRightBtn : {

  },

  mt1: {
    marginTop: ".7rem",
  },

  sort: {
    marginRight: 5,
  },

  productImageCardMedia: {
    height: "220px",
    //maxHeight: '250px',
    width: "100%",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      height: "105px",
    },
  },

  menuHeader: {
    padding: "0rem",
    margin: "7px 0",
    marginLeft: "2rem",

    marginTop: "10px",
    // width:'100%',
    height: "120px",
    //backgroundColor: 'transparent',
    //borderBottom: '1px solid #cecece',
    boxShadow: "0 1px 2px -2px rgba(0,0,0,0.06)",
    display: "flex",
    // justifyContent: 'start',
    justifyContent: "start",
    marginLeft: "0px !important",
    paddingLeft: "0rem !important",
    overflow: "scroll",
    listStyle: "none",
    "&::-webkit-scrollbar": {
      display: "none !important",
    },

    [theme.breakpoints.down("md")]: {
      height: "80px",
      margin: "1.3rem 0",
    },

    "& > li > ul": {
      display: "none",
      //display: 'flex',
      flexDirection: "row",
      justifyContent: "start",
      alignItems: "start",
      position: "absolute",
      // backgroundColor: '#111',
      top: 130,
      width: "80%",
      maxHeight: "340px",
      overflow: "hidden",
      left: "50%",
      transform: "translateX(-50%)",

      // border: '2px solid #444',
      boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",
      //border: '1px outset  rgba(0, 0, 255, .1)',
      zIndex: 100000,

      "& li": {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        //border: '1px solid red',
        marginRight: "2rem",
        fontWeight: "700",

        [theme.breakpoints.down("sm")]: {
          display: "none",
        },

        "& ul": {
          // border: '1px solid green',
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "start",
          //padding-inline-start: 20px
          paddingInlineStart: "0.2rem",

          "& li": {
            margin: 0,
            padding: 0,
            marginBottom: ".5rem",
            fontWeight: "400",

            "& > :hover": {
              color: "blue",
              fontWeight: "700",
            },
          },
        },
      },
    },

    "& > li:hover ul": {
      display: "flex",
    },

    "& li": {
      display: "flex",
      // backgroundColor: 'red',

      "& div": {
        //catcont
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        /* border: 2px solid black; */
        margin: "0 10px",
        cursor: "pointer",
        //backgroundColor: 'red',

        [theme.breakpoints.down("md")]: {
          margin: "0 7px",
        },

        "& div": {
          //catcontainer
          // width: "90px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
      },
    },

    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  categoryImageHeader: {
    width: "2.8rem",
    height: "2.8rem",
    objectFit: "cover",
    marginBottom: "08px",
    borderRadius: ".2rem",
    display: "block",

    [theme.breakpoints.down("sm")]: {
      width: "2rem",
      height: "2rem",
    },

    [theme.breakpoints.down("xs")]: {
      width: "1.8rem",
      height: "1.8rem",
    },
  },

  resaultSearch: {
    width: "93%",
    fontSize: "1.06rem",

    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
      width: "100%",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "9px",
    },
  },

  resaultSearchBtn: {
    fontSize: "1.36rem",

    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "15px",
    },
  },

  categorynamecontainer: {
    textAlign: "center",
    height: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: ".6rem",
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: ".8rem",
    },
  },
  // productsCon : {

  //     [theme.breakpoints.down('md')]: {

  //         gridTemplateColumns: 'repeat(2, 1fr)',
  //     },
  // },

  CardActionAreaHover: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },

  productBox: {
    padding: "10px 12px",
    border: "1px solid #cce7d0",
    borderRadius: "25px",
    cursor: "pointer",
    boxShadow: " 20px 20px 30px rgba(0, 0, 0, 0.04)",

    position: "relative",
    margin: 0,
    transtion: "all .3s ease-in-out",
    "&:hover": {
      boxShadow: " 0 0 6px rgba(0, 0, 0, 0.3)",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "4px 6px",
      borderRadius: "12px",

    },
  },

  productContent: {
    padding: "10px 4px 4px 10px",
    "& > span:nth-of-type(1)": {
      fontSize: "14px",
    },

    "& h3": {
      fontSize: "15px",
      fontWeight: "500",
      margin: "05px 0",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "8px 4px",

      fontSize: "10px",
      "& > span:nth-of-type(1)": {
        fontSize: "11px",
      },

      "& h3": {
        fontSize: "11px",
        fontWeight: "500",
        margin: "04px 0",
      },
    },
  },

  productRating: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem !important",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      marginBottom: "0px",
    },
  },

  carouselContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    border: "1px solid #111",
  },

  carouselMui: {
    minWidth: "100%",
    width: "100%",
  },

  productCart: {
    width: "40px",
    height: "40px",
    lineHeight: "40px",
    borderRadius: "50%",
    backgroundColor: "#e8f6ea",
    fontWeight: "500",
    color: "primary",
    border: "1px solid #cce7d0",
    position: "absolute",
    bottom: "10px",
    right: "10px",
    padding: 4,

    [theme.breakpoints.down("sm")]: {
      width: "30px",
      height: "30px",
      lineHeight: "30px",
    },

    [theme.breakpoints.down("xs")]: {
      width: "25px",
      height: "25px",
      lineHeight: "25px",
      // fontSize: '15px',
    },
  },

  productPrice: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.1rem",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: ".8rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: ".9rem",
    },
  },

  flex_sb: {
    display: "flex",
    justifyContent: "space-between",
  },

  productsHeader: {
    fontWeight: "600",
    fontSize: "45px",
    width: "100%",
    wordBreak: "break-word",
    textAlign: "center",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.6rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
    },
  },

  aboutContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    flexDirection: "row",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

 

  aboutContainerImage: {
    width: "min-content",

    height: "450px",
    // border :'1px solid rgba(0, 0, 0, .8)',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",

    [theme.breakpoints.down("sm")]: {
      width: "100%",

      height: "85vw",
    },
  },
  aboutContainerVideo: {
    height: "100%",
  },

  aboutContainerText: {
    width: "auto",
    // border :'1px solid rgba(0, 0, 0, .8)',
    display: "flex",
    alignItems: "center",
    paddingLeft: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      paddingLeft: "0px",
    },
  },

  aboutContainerTextTitle: {
    fontSize: "2.6rem",
    fontWeight: "700",
    color: primary,
    textAlign: "center",
    marginBottom: "2rem",
  },

  aboutContainerTextText: {
    fontSize: "1.2rem",
    fontWeight: "500",
    lineHeight: "1.6",
    // color : "#000",
    textAlign: "justify",
    textJustify: "distribute",
    // textShadow: `${primary} 1px 0 0px`,
    // fontStyle: 'oblique 10deg',
    marginTop: "15px",
    //fontFamily: 'Pacifico, cursive',
    [theme.breakpoints.down("md")]: {
      fontSize: "1.06rem",
    },
  },

  footerLink: {
    fontSize: "14px",
    fontWeight: "500",

    textDecoration: "none",
    //color: '#222',textColor
    //color: theme.palette.primary.textColor,
    paddingBottom: "10px",
  },

  footerLinkSocial: {
    marginRight: "9px",
    marginBottom: "5px",
    color: primary,
    fontWeight: 800,
    fontSize: "30px",
    "&:hover": {
      // fontSize : '32px',
    },
  },
  footerPayContainer: {
    display: "flex",
    // flexWrap : 'wrap',
    justifyContent: "space-around",
    margin: "5px 0",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
    },
  },

  footerPay: {
    border: "1px solid #088178",
    borderRadius: "6px",
    width: "46%",

    [theme.breakpoints.down("xs")]: {
      width: "60%",
      margin: "10px 0",
    },
  },

  footerPayCenter: {
    width: "80%",
    // marginBottom :'18px'
    "& img": {
      width: "100%",
    },
  },

  footerSubTitle: {
    fontWeight: 700,
    padding: "05px 0 15px 0",
    fontSize: 15,
    width: "100%",
  },

  footerSubTitleText: {
    padding: "05px 0 15px 0",
    fontSize: 15,
    width: "100%",
  },
  footerCopyright: {
    fontWeight: 700,
    padding: "10px 10px",
    fontSize: 14,
    textAlign: "center",
    width: "100%",

    // fontStyle: 'oblique',
  },

  bannerSection: {
    //backgroundImage: `url(${BannerImage})`,
    width: "100%",
    height: "40vh",
    margin: "50px 0",
    // padding : '20px 10px',
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
    overflow: "hidden",
  },

  bannerTitle: {
    color: "#fff",
    fontSize: "28px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "14px",
    },

    //padding: '30px 0',
  },
  bannerText: {
    color: "#fff",
    fontSize: "32px",
    padding: "30px 0",

    [theme.breakpoints.down("sm")]: {
      padding: "15px 0",

      fontSize: "20px",
      textAlign: "center",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "18px",
      textAlign: "center",
    },

    "& span": {
      color: "#ef3636",
    },
  },
  bannerButton: {
    fontSize: "14px",
    fontWeight: 600,
    padding: "13px 30px",
    color: "#111",
    background: "#fff",
    cursor: "pointer",
    border: " none",
    outline: "none ",
    borderRadius: "4px",
    transition: "0.2s ease",

    "&:hover": {
      background: "#088178",
      color: "#fefefe",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "13px 18px",

      fontSize: "13px",
      fontWeight: 500,
    },

    [theme.breakpoints.down("xs")]: {
      padding: "8px 10px",

      fontSize: "9px",
    },
  },

  banner02: {},

  banner02Box: {
    // width: '49%',
    height: "45vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    //padding: 30,
    margin: "50px 0",
    backgroundClip: "content-box",
  },

  banner02Button: {
    fontSize: "13px",
    fontWeight: 600,
    padding: "11px 18px",
    color: "#fff",
    background: "transparent",
    cursor: "pointer",
    border: "1px solid #fff",
    outline: "none",
    /* border-radius: 5px; */
    transition: " 0.2s ease",
    marginLeft: "1rem",
  },

  bannerTitle02: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: 800,
    marginLeft: "1rem",
  },

  bannerText02: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: 400,
    marginLeft: "1rem",
  },

  bannerSpan02: {
    color: "#fff",
    fontSize: "14px",
    fontWeight: 500,
    paddingBottom: 15,
    marginLeft: "1rem",

    // display: 'block',
  },

  banner03: {},

  banner03Box: {
    height: "33vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    //padding: '0 10px',
    marginTop: "0",
    marginBottom: "50px",
    //backgroundOrigin: 'content-box',
    backgroundClip: "content-box",
  },

  bannerTitle03: {
    color: "#fff",
    fontSize: "20px",
    fontWeight: 800,
    marginLeft: "1rem",
  },

  bannerSpan03: {
    color: "#ef3636",
    fontSize: "14px",
    fontWeight: 600,
    paddingBottom: 15,
    marginLeft: "1rem",
  },

  footerScetion: {
    marginTop : '20px',
    padding: "40px 40px",
    borderTop: "1px solid rgba(0, 0, 0, .085)",

    [theme.breakpoints.down("sm")]: {
      padding: "20px 20px",
      paddingBottom: "40px",
    },
  },

  NewsletterSection: {
    padding: "40px 80px",
    height: "22vh",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "20% 30%",
    backgroundColor: "#041e42",

    [theme.breakpoints.down("sm")]: {
      height: "24vh",
      padding: "20px 10px",
    },
  },

  NewsletterTitle: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#fff",
  },

  NewsletterText: {
    fontSize: "14px",
    fontWeight: 600,
    color: "#818ea0",

    "& span": {
      color: "#ffbd27",
    },
  },

  NewsletterButton: {
    backgroundColor: "#088178",
    color: "#fff",
    whiteSpace: "nowrap",
    borderTopLeftRadius: 0,
    borderBottoLeftRadius: 0,
    transition: "all .3s ease",
    padding: "0 20px",

    "&:hover": {
      backgroundColor: "#088178",
      opacity: "0.95",
      color: "#fefefe",
    },
  },

  NewsletterForm: {
    display: "flex",
    // width: '40%',
  },

  NewsletterInput: {
    height: "3.125em",
    padding: "0 1.25em",
    fontSize: "14px",
    width: "100%",
    border: "1px solid transparent",
    borderRadius: "4px",
    outline: "none",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  maxLines: {
    display: "block" /* or inline-block */,
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    overflow: "hidden",
    maxHeight: "3.6em",
    height: "3.6em",
    lineHeight: "1.8em",

    "&::after": {
      content: "...",
      position: "absolute",
      right: "-12px",
      bottom: "4px",
    },
  },


  maxLinesBrand: {
    display: "block" /* or inline-block */,
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    overflow: "hidden",
    maxHeight: "1.8em",
    height: "1.8em",
    lineHeight: "1.6em",

    "&::after": {
      content: "...",
      position: "absolute",
      right: "-12px",
      bottom: "4px",
    },
  },

  containerPers: {
    maxWidth: maxWidthV,
    width: "96%",

    zoom : '89%',

    [theme.breakpoints.down("md")]: {
      width: "96%",
    },

    [theme.breakpoints.down("sm")]: {
      width: "98%",
    },

    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },

  productDetailsName: {
    lineHeight: 1.4,
    fontSize: "18px",
    fontWeight: 400,
    display: "inline-block",
  },
  productDetailsPrice: {
    lineHeight: 1.4,
    fontSize: "30px",
    fontWeight: 600,
    display: "inline-block",
  },

  productDetailsOff: {
    lineHeight: 1.4,
    fontSize: "17px",
    fontWeight: 500,
    display: "inline-block",
  },

  productColorsImages : {
    display :'flex',
    flexWrap :'wrap',
    margin :'8px 0',

  },

  productColorsImage : {
    objectFit: "contain",
    width : '65px',
    height : '65px',
    marginRight :'8px',
    marginBottom :'8px',
    border : '1px solid rgba(0, 0, 0, .09)',
    cursor : 'pointer',

  },

  productColorsImageSelect : {
    objectFit: "contain",
    width : '65px',
    height : '65px',
    marginRight :'8px',
    marginBottom :'8px',
    border : '1px solid blue',
    cursor : 'pointer',

  },

  productSizeBox : {
    objectFit: "contain",
    minWidth : '33px',
    maxWidth : '50px',
    padding: '6px',

    height : '29px',
    marginRight :'8px',
    marginBottom :'8px',
    border : '1px solid rgba(0, 0, 0, .7)',
    cursor : 'pointer',
    display : 'flex',
    justifyContent: "center",
    alignItems: "center",
    fontWeight: 600,

  },




  productDetailsTitle: {
    fontWeight: 600,
    fontSize: 14,
    marginRight: "14px",
  },

  productDetailsDes: {
    fontWeight: 400,
    fontSize: 14,
  },

  productDetailsTableHeader: {
    fontWeight: 500,
    fontSize: 18,
  },

  productImageContainer: {},

  productImage: {
    // width: '100%',
    //borderRadius: '20px',
    objectFit: "contain !important",
    maxWidth: "100%",
    height: "100%",
  },

  gridColoumnFixed: {
    position: "sticky",
    top: navbarHeight + 5,
    height: "100vh",
    boxSizing: "border-box",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
      // width: 5
    },

    "&::-webkit-scrollbar-track": {
      backgroundColor: "grey",
      opacity: "0.7",
    },

    "&::-webkit-scrollbar-thumb": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    },

    [theme.breakpoints.down("md")]: {
      position: "relative",
      height: "auto",
      top: 0,
    },
  },

  gridColoumnFixedZiro: {
    position: "sticky",
    top: 0,
    height: "100vh",
    boxSizing: "border-box",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      display: "none",
      // width: 5
    },

    "&::-webkit-scrollbar-track": {
      backgroundColor: "grey",
      opacity: "0.7",
    },

    "&::-webkit-scrollbar-thumb": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    },

    [theme.breakpoints.down("md")]: {
      position: "relative",
      height: "auto",
      top: 0,
    },
  },

  gridColoumnFixedProduct: {
    position: "sticky",
    top: navbarHeight,
    height: "100vh",
    boxSizing: "border-box",
    overflowY: "scroll",

    "&::-webkit-scrollbar": {
      display: "none",
      // width: 5
    },

    "&::-webkit-scrollbar-track": {
      backgroundColor: "grey",
      opacity: "0.7",
    },

    "&::-webkit-scrollbar-thumb": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    },

    [theme.breakpoints.down("md")]: {
      position: "relative",
      height: "auto",
      top: 0,
    },
  },

  separate: {
    position: "sticky",
    top: 0,
    height: "100vh",
    boxSizing: "border-box",
    overflowY: "scroll",
  },

  productImageZomm: {
    position: "absolute",
    left: 0,
    top: 0,
  },

  sliderr: {
    //   color: 'red',
    //backgroundColor: 'red',
    width: "95%",

    height: 3,
    padding: "13px 0",

    "& .MuiSlider-thumb": {
      // height: 27,
      // width: 27,
      // backgroundColor: 'red',
      // border: '1px solid currentColor',
      // '&:hover': {
      //   boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
      // },
      // '& .airbnb-bar': {
      //   height: 9,
      //   width: 1,
      //   backgroundColor: 'currentColor',
      //   marginLeft: 1,
      //   marginRight: 1,
      // },
    },
    "& .MuiSlider-track": {
      height: 4,
    },
    "& .MuiSlider-rail": {
      color: "#d8d8d8",
      opacity: 0.8,
      height: 3,
    },

    // position: 'sticky',
    // top: 0,
    // height: '100vh',
    // boxSizing: 'border-box'
  },

  slugProductImageBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid rgba(0, 0, 0, .096)",
    margin: "0 5px",
    height: 400,
    overflow: "hidden",
    position: "relative",

    [theme.breakpoints.down("md")]: {
      display: "flex",
      height: 290,
    },

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      height: 250,
    },
  },

  slugProductImage: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    objectFit: "contain",
    maxWidth: "100%",
    width: "94%",
    height: "95%",

    [theme.breakpoints.down("sm")]: {
      // position : 'relative',
      // objectFit: 'contain ',
      // maxWidth: '100%',
      // height: '100%',
    },
  },

  slugProductLeftSideImages: {
    display: "flex",
    height: 400,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      height: 290,
    },

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  slugProductLeftSideImagesMobile: {
    display: "none",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0",
    padding: 0,

    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },

  slugProductLeftSideImagesMobileImages: {
    border: "1px solid rgba(0, 0, 0, .096)",
    // width : '100%',
    display: "flex",
    overflowX: "scroll",

    [theme.breakpoints.down("xl")]: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },

    [theme.breakpoints.down("md")]: {
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },

    [theme.breakpoints.down("sm")]: {},
  },

  arrowBtn: {
    border: "1px solid rgba(0, 0, 0, .096)",
    margin: "0",

    [theme.breakpoints.down("sm")]: {
      height: "100%",
      paddin: 0,
      margin: 0,
      border: "1px solid rgba(0, 0, 0, .096)",
    },
  },

  leftSideImageContainer: {
    display: "flex",
    justifyContent: "center",
    border: "1px solid rgba(0, 0, 0, .096)",
    
    marginRight : '5px',
    marginBottom: "4px",
    padding: "4px",
    cursor: "pointer",
    height: 78,

    width: "100%",

    [theme.breakpoints.down("md")]: {
      height: 60,
    },

    [theme.breakpoints.down("sm")]: {
      // display:'flex',
      // width : '120px',
      height: 60,
    },
  },

  leftSideImage: {
    objectFit: "contain !important",
    width: "80px",
    height: "100%",
  },

  flexSb : {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

  productBtn: {
    paddingTop: "10px",
    paddingBottom: "10px",
    margin: "8px",

    [theme.breakpoints.down("sm")]: {
      paddingTop: "6px",
      paddingBottom: "6px",
    },
  },

  listItemTableWithHeaderBox: {
    border: "1px solid rgba(0, 0, 0, .096)",
    margin: "5px",
    marginTop: "15px",
    padding: "10px",
    [theme.breakpoints.down("sm")]: {
      margin: "8px",
      marginTop: "8px",
      padding: "05px",
    },
  },

  searchFildesLisConatiner: {
    borderBottom: "1px solid rgba(0, 0, 0, .096)",
    paddingTop: "14px",
    paddingBottom: "0px",
  },

  filterSearchContainerMobile: {
    border: "1px solid rgba(0, 0, 0, .096)",
    zIndex: "99999999",
    paddingBottom: "56px",
    width: "100%",

    [theme.breakpoints.up("md")]: {
      display: "none",
    },

    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      height: "100%",
      width: "100%",
      background: "#fff",
    },
  },

  filterSearchContainer: {
    width: "30%",
    border: "1px solid rgba(0, 0, 0, .096)",

    // [theme.breakpoints.down('md')] : {
    //     width : '20%',
    // },

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },

    //     [theme.breakpoints.down('sm')] : {
    //         display : 'none',
    //    },

    "&::-webkit-scrollbar ": {
      display: "flex",
      width: "3px",
      height: "3px",
    },

    "&::-webkit-scrollbar-track ": {
      borderRadius: "6px",
      background: "rgba(0,0,0,0.1)",
    },

    "&::-webkit-scrollbar-thumb": {
      borderRadius: "6px",
      background: "rgba(0,0,0,0.2)",

      "&:hover ": {
        borderRadius: "6px",
        background: "rgba(0,0,0,0.4)",
      },

      "&:active ": {
        borderRadius: "6px",
        background: "rgba(0,0,0,0.9)",
      },
    },
  },

  productsSearchContaineer: {
    width: "70%",
    padding: "0 25px",

    //     [theme.breakpoints.down('md')] : {
    //         width : '80%',

    //    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      padding: "0 10px",
    },

    [theme.breakpoints.down("xs")]: {
      padding: "0 5px",
    },
  },

  filterMenu: {
    display: "none",
    background: primary,
    zIndex: "9999999999999999999999999999",
    position: "fixed",
    left: 0,
    right: 0,
    bottom: "-2px",
    height: "50px",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
    },
  },

  filterMenuItem: {
    // height : '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.45rem",
    color: "white",
    fontWeight: "700",
  },

  filterMenuItemMiddle: {
    borderRight: "1px solid rgba(0, 0, 0, .096)",
    borderLeft: "1px solid rgba(0, 0, 0, .096)",
  },

  displayNone: {
    display: "none !important",
  },

  searchFildesConatiner: {
    maxHeight: "120px",
    minHeight: "45px",
    width: "95%",
    padding: 0,
    margin: 0,
    // border:'1px solid red',
    // display: 'flex',
    // flexDirection:'column',
    overflowY: "scroll",
    // flexWrap : 'wrap',

    "&::-webkit-scrollbar ": {
      width: "3px",
      height: "3px",
    },

    "&::-webkit-scrollbar-track ": {
      borderRadius: "3px",
      background: "rgba(0,0,0,0.1)",
    },

    "&::-webkit-scrollbar-thumb": {
      borderRadius: "6px",
      background: "rgba(0,0,0,0.2)",

      "&:hover ": {
        borderRadius: "6px",
        background: "rgba(0,0,0,0.4)",
      },

      "&:active ": {
        borderRadius: "6px",
        background: "rgba(0,0,0,0.9)",
      },
    },
  },

  searchFildesBox: {
    padding: 0,
    margin: 0,
    height: "40px",
    lineHeight: "15px",
    fontSize: "15px",
    overflowY: "hidden",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },

  searchFildesBoxText: {
    fontSize: "15px",
  },

  inputNumberFiled: {
    padding: 0,
    "& input[type=number]": {
      "-moz-appearance": "textfield",
      height: "100%",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      // '-webkit-appearance': 'none',
      // margin: 0
      padding: 0,
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      padding: 0,
      margin: 0,
      transform: "scale(1.5)",

      // '-webkit-appearance': 'none',
      // margin: 0
    },
  },

  forTestUpdates: {
    padding: 0,
    "& input[type=number]": {
      "-moz-appearance": "textfield",
      height: "100%",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      // '-webkit-appearance': 'none',
      // margin: 0
      padding: 0,
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      padding: 0,
      margin: 0,
      transform: "scale(1.5)",

      // '-webkit-appearance': 'none',
      // margin: 0
    },
  },

  forTestUpdates02: {
    padding: 0,
    "& input[type=number]": {
      "-moz-appearance": "textfield",
      height: "100%",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      // '-webkit-appearance': 'none',
      // margin: 0
      padding: 0,
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      padding: 0,
      margin: 0,
      transform: "scale(1.5)",

      // '-webkit-appearance': 'none',
      // margin: 0
    },
  },

  sideBarBoxes: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",

    padding: "10px",
  },
  sideBarTitlesPrimary: {
    color: primary,
    fontSize: "1rem",
    fontWeight: "500",
  },

  modelBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",

    padding: 0,
    margin: 0,
  },
  modelItem: {
    borderBottom: "1px solid #222",
    textAlign: "center",
    display: "flex",
    minHeight: "30px",
    justifyContent: "center",
  },

  displayNoneInMobile: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  GrapAL: {
    // background: '#f6f5f7',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    fontFamily: "Montserrat, sans-serif",
    minHeight: "90vh",
    padding: "20px 0",
    // minHeight: '90vh',
    width: "100%",
    /*margin: -20px 0 50px;*/
    backgroundImage: `url(${BackIm})`,

    backgroundPosition: "50% 50%",
    backgroundSize: "cover",
    position: "relative",
    zIndex: 0,
    // paddingTop: '70px',
  },

  OverlayB: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    background: "#00C9FF" /* fallback for old browsers */,
    background: "-webkit-linear-gradient(to right, #92FE9D, #00C9FF)",
    background: "linear-gradient(to right, #92FE9D, #00C9FF)",
    opacity: 0.7,

    color: "white",
    display: "flex",
    zIndex: -1,
  },

  containerSignUp: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: " 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    position: "relative",
    overflow: "hidden",
    width: "90%",
    maxWidth: "1000px",

    // minWidth: '575px',
    minHeight: "380px",
    // height: '70%',
    padding: "20px 0",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
    // maxHeight: '80vh !important',
  },

  containerSection: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: " 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
    position: "relative",
    overflow: "hidden",
    width: "90%",
    maxWidth: "1000px",

    // minWidth: '575px',
    minHeight: "min-content",
    maxHeight: "80vh",
    overflowY: "scroll",
    // height: '70%',
    padding: " 25px",
    display: "flex",

    [theme.breakpoints.down("sm")]: {
      padding: " 20px",
    },

    [theme.breakpoints.down("xs")]: {
      padding: " 15px",
    },

    "&::-webkit-scrollbar ": {
      display: "flex",
      width: "10px",
      height: "10px",
      padding: "10px",
      margin: "10px",
    },

    "&::-webkit-scrollbar-track ": {
      borderRadius: "6px",
      background: primary,
    },

    "&::-webkit-scrollbar-thumb": {
      borderRadius: "6px",
      background: "rgba(0,0,0,0.2)",

      "&:hover ": {
        borderRadius: "6px",
        background: "rgba(0,0,0,0.4)",
      },

      "&:active ": {
        borderRadius: "6px",
        background: "rgba(0,0,0,0.9)",
      },
    },
  },

  SignUpHeder: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "8px auto",
    padding: "0 10px",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500,
    fontFamily: "Atkinson Hyperlegible, sans-serif",
    // borderBottom: `3px solid ${primary}`,
    width: "100%",

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.15rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    alignItems: "center",
    textAlign: "center",
    margin: "8px auto",
    padding: "0 10px",
    fontSize: "1.2rem",

    // fontFamily: 'Montserrat, sans-serif',
    fontWeight: 600,
    fontFamily: "Atkinson Hyperlegible, sans-serif",
    // borderBottom: `3px solid ${primary}`,
    width: "100%",
  },

  sectionText: {
    fontSize: ".9rem",
    fontWeight: "400",
    lineHeight: "1.9",
    // color : "#000",
    textAlign: "justify",
    textJustify: "distribute",
    // textShadow: `${primary} 1px 0 0px`,
    // fontStyle: 'oblique 10deg',
    marginTop: "15px",
    //fontFamily: 'Pacifico, cursive',
    [theme.breakpoints.down("md")]: {
      fontSize: "1.06rem",
    },
  },

  allFlexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  productsContainer: {
    // width : '100%',
    // border : '1px solid red',
    zoom:'88%',

  },

  textFiledNumberArrowNone: {
    // '& input[type=number]': {
    //     '-moz-appearance': 'textfield',
    //     display: 'none',

    // },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      // margin: 0
    },
  },

  capitalize: {
    textTransform: "capitalize",
  },

  adminGrid: {
    flexWrap: "nowrap",

    [theme.breakpoints.down("sm")]: {
      // display : 'none',
      flexWrap: "wrap",
    },
  },

  adminLeftSideGrid: {
    width: `${adminSidebarWidth}px`,
    [theme.breakpoints.down("sm")]: {
      //   display : 'none',
      width: "100%",
    },
  },

  adminLeftSideGridToTop: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    zIndex: theme.zIndex.drawer + 2,
    backgroundColor: navbarBackgound,
    color: "#fff",
    borderBottom: "2px solid rgba(255, 255, 255, 0.05 )",
    padding: "10px 15px",
    display: "none",

    [theme.breakpoints.down("sm")]: {
      position: "relative",
      display: "flex",
    },
  },

  adminLeftSideGridToTopTitle: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: ".85rem",
    },
  },

  adminMainGrid: {
     width: "calc(100% - " + adminSidebarWidth + "px)",
    // width : 'fit-content',
    padding: "0",
    margin: "0",
    flexDirection: "column",
    position : 'relative',

    [theme.breakpoints.down("md")]: {
      padding: "0 0",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100% !important",
      marginTop: "30px",
      padding: "8px 0",
    },

    [theme.breakpoints.down("xs")]: {
      width: "100% !important",
      padding: "4px 0",
    },
    //
  },

  adminMainGridContainer: {
    minHeight: "calc(100vh - " + navbarHeight + "px)",

  },

  leftSideContainerAll: {
    margin: 0,
    backgroundColor: navbarBackgound, //#fff
    height: "calc(100vh - " + navbarHeight + "px)", //`calc(100vh - ${navbarHeight})`
    color: "#FFF",
     zIndex: theme.zIndex.drawer ,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    position: "sticky",
    top: navbarHeight,
    left : 0,
    boxSizing: "border-box",
    overflowY: "scroll",
    borderTop: "1px solid rgba(0,0,0,0.3) ",
    "&::-webkit-scrollbar": {
      display: "none",
    },

    "&::-webkit-scrollbar-track": {
      backgroundColor: "grey",
      opacity: "0.7",
    },

    "&::-webkit-scrollbar-thumb": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    },
    "-webkit-backface-visibility": 'hidden',

    [theme.breakpoints.down("sm")]: {
      position: "fixed",
      height: "min-content",
      backgroundColor: navbarBackgound,
      color: "#FFF",
      width: "100%",
    },
  },

  leftSideContainer: {
    paddingTop: "1.5rem",
    padding: "12px",
    margin: 0,
    backgroundColor: navbarBackgound, //#fff
    height: "calc(100vh - " + navbarHeight + "px)", //`calc(100vh - ${navbarHeight})`
    color: "#FFF",
    zIndex: theme.zIndex.drawer + 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    //  position: 'sticky',
    //  top: navbarHeight,
    //  bottom: 0,

    boxSizing: "border-box",
    overflowY: "scroll",
    

    "&::-webkit-scrollbar": {
      display: "none",
    },

    "&::-webkit-scrollbar-track": {
      backgroundColor: "grey",
      opacity: "0.7",
    },

    "&::-webkit-scrollbar-thumb": {
      boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    },

    [theme.breakpoints.down("sm")]: {
      //  position: 'fixed',
      display: "none",
      backgroundColor: navbarBackgound,
      color: "#FFF",
      width: "100%",
    },
  },

  leftSideContainerAllClickMobile: {
    
    height: "calc(100vh - " + navbarHeight + "px)",
  },

  leftSideContainerClickMobile: {
    
    display: "flex",
  },

  leftSideProfile: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: "20px",
    marginTop: "12px",
    
  },

  leftSideProfileImageContainer: {
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    border: "1px solid rgba(0, 0, 0, .196)",
    backgroundColor: "rgba(255,255,255,.1)",
    boxShadow: "2px 8px 12px rgba(0, 0, 0, .396)",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      width: "80px",
      height: "80px",
      minHeight : "80px",
      minWidth : '80px',
    },
  },

  leftSideProfileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2.1rem",
    fontWeight: "600",
    textTransform: "uppercase",
  },

  leftSideProfileDetails: {
    margin: "15px 0",
    textAlign: "center",
  },

  leftSideItemProfileName: {
    fontWeight: 500,
    fontSize: "1.1rem",
  },

  leftSideItemProfileEmail: {
    fontWeight: 500,
    fontSize: ".95rem",
    color: "#e4e4e4",
  },

  leftSideItem: {
    display: "flex",
    padding: "15px",
    cursor: "pointer",
    borderRadius: "10px",
    margin: "4px 0px",
    width: "100%",
    transition: "all 0.1s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, .1)",
    },
  },

  leftSideItemActive: {
    display: "flex",
    padding: "15px",
    cursor: "pointer",
    backgroundColor: "rgba(255, 255, 255, .1)",
    borderRadius: "10px",
    margin: "4px 0px",
    width: "100%",
  },

  leftSideItemIcon: {
    marginRight: "12px",
    fontSize: "20px",
  },

  leftSideItemText: {
    fontWeight: 500,
    fontSize: "1.1rem",
    [theme.breakpoints.down("sm")]: {
      // display : 'none',
    },
  },

  dashboardCardTitle: {
    fontWeight: 500,
    fontSize: "1.5rem",
    marginBottom: "14px",

    [theme.breakpoints.down("md")]: {
      fontSize: "1.2rem",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: ".9rem",
    },
  },

  dashboardCardDecs: {
    lineHeight: '1.57143',
    fontSize: '0.98rem',
    fontFamily: "Public Sans sans-serif",
    fontWeight: 500,
    color:'rgb(33, 43, 54)',
    
    [theme.breakpoints.down("xs")]: {
      fontSize: ".85rem",
    },
  },

  profileAccountTitle: {
    margin: 0,
    padding: 0,
    fontSize: "1.36rem",
    marginBottom: "10px",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.1rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: ".9rem",
    },
  },

  profileAccountDetails: {
    // margin : '20px 40px',
    // border : '1px solid rgba(0, 0, 0, .096)',
  },

  profileDetailsContainer: {
    // background : 'yellow',
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },

  profileAccountDetailsItem: {
    // width :'50%',
    display: "flex",
    justifyContent: "space-between",
    // borderBottom : '1px solid rgba(0, 0, 0, .096)',
    // borderTop : '1px solid rgba(0, 0, 0, .096)',

    // margin: '2px  0',
    cursor: "pointer",
    transition: "all 03s ease",

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  },

  profileAccountDetailsItemEdit: {
    display: "flex",
    border: "1px solid rgba(0, 0, 0, .096)",
    transition: "all 03s ease",
  },

  prodileDetailsColumn: {
    display: "flex",
    flexDirection: "column",
  },

  actioneditContainer: {
    display: "flex",
    margin: "7px 0",
    justifyContent: "flex-end",
  },
  firstEditBtn: {
    marginRight: "10px",
    fontSize: ".8rem",
    padding: "4px 8px",

    [theme.breakpoints.down("xs")]: {
      marginRight: "6px",
      fontSize: ".7rem",
      padding: "8px 6px",
      width : '100%',
     
    },
  },
  lastEditBtn: {
    fontSize: ".8rem",
    padding: "4px 8px",
    [theme.breakpoints.down("xs")]: {
      fontSize: ".7rem",
      padding: "8px 6px",
      width : '100%',
      marginBottom :"12px"
    },
  },

  titleDetails: {
    display: "flex",
    flexDirection: "column",
    margin: "6px 0",
    width: "100%",
    maxWidth: "500px",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  },

  titleDetailsfirst: {
    width: "190px",
    marginRight: "10px",
    fontSize: ".95rem",
    marginBottom: "4px",
    // wordBreak : 'break-all',

    [theme.breakpoints.down("md")]: {
      width: "100px",
    },

    [theme.breakpoints.down("sm")]: {
      width: "70px",
      fontSize: ".85rem",
    },

    [theme.breakpoints.down("xs")]: {
      width: "100%",
      fontSize: ".75rem",
    },
  },

  titleDetailsSecond: {
    fontWeight: 500,
    fontSize: ".96rem",
    wordBreak: "break-all",
    [theme.breakpoints.down("sm")]: {
      fontSize: ".9rem",
    },
  },

  editPrfileBtnLg: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },

  editPrfileBtnSm: {
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },

  modelTitle: {
    fontWeight: 400,
    fontSize: "1.1rem",
    marginLeft: "4px",
    [theme.breakpoints.down("md")]: {
      fontSize: ".9rem",
    },
  },

  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#fff",
    border: "1px solid rgba(0, 0, 0, .096)",
    boxShadow: " 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",

    padding: "20px",
    width: "90%",
    maxWidth: "500px",
    borderRadius: ".8rem",

    [theme.breakpoints.down("md")]: {
      padding: "10px",
    },

    [theme.breakpoints.down("sm")]: {
      padding: "10px 5px",
    },

    [theme.breakpoints.down("md")]: {
      padding: "10px 3px",
    },
  },

  coverProfile: {
    width: "100%",
    height: "300px",
    backgroundColor: "rgba(0, 0, 0, .2)",
    marginBottom: "200px",
    position: "relative",

    [theme.breakpoints.down("md")]: {
      height: "250px",
      marginBottom: "150px",
    },

    [theme.breakpoints.down("sm")]: {
      height: "200px",
      marginBottom: "130px",
    },

    [theme.breakpoints.down("xs")]: {
      height: "60vw",
      marginBottom: "130px",
    },
  },

  profileImageFlotingContainer: {
    height: "300px",
    width: "300px",
    backgroundColor: "grey",
    borderRadius: "50%",
    border: "5px solid #fff",

    position: "absolute",
    left: "50%",
    top: "100%",
    transform: "translate(-50%, -50%)",
    // overflow : 'hidden',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("md")]: {
      height: "250px",
      width: "250px",
    },

    [theme.breakpoints.down("sm")]: {
      height: "200px",
      width: "200px",
    },

    [theme.breakpoints.down("xs")]: {
      height: "70vw",
      width: "70vw",
    },
  },

  profileImageFloting: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "3rem",
    letterSpacing: "7px",
    textShadow: "black 0.1em 0.1em 0.2em",
    fontWeight: "600",
    color: "#FFF",

    textTransform: "uppercase",
  },

  coverProfileUpdateBtn: {
    width: "50px",
    height: "50px",
    backgroundColor: "rgba(0, 0, 0, .85)",
    zIndex: "10",
    position: "absolute",
    left: "95%",
    top: "76%",
    transform: "translate(-50%, -50%)",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2.2rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    "&:hover": {
      width: "53px",
      height: "53px",
    },

    [theme.breakpoints.down("md")]: {
      height: "40px",
      width: "40px",
      fontSize: "2rem",
      "&:hover": {
        width: "43px",
        height: "43px",
      },
    },

    [theme.breakpoints.down("sm")]: {
      height: "35px",
      width: "35px",
      fontSize: "1.5rem",
      "&:hover": {
        width: "38px",
        height: "38px",
      },
    },

    [theme.breakpoints.down("xs")]: {
      // height : '20px',
      // width : '20px',
      //  fontSize : '1rem',
    },
  },

  camerabtnRe: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.8rem",
    },

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },

    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
    },
  },

  modalActions: {
    margin: "15px 0 2px 0",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  modalActionsSm: {
    margin: "15px 0 2px 0",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },

    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",

    },
  },

  // btnErroer : {
  //     backgroundColor: 'rgb(183, 33, 54)',
  // },

  modalMaxHeight: {
    maxHeight: "75vh",
    overflowY: "scroll",

    "&::-webkit-scrollbar ": {
      display: "flex",
      width: "9px",
      [theme.breakpoints.down("sm")]: {
        width: "5px",
      },

      [theme.breakpoints.down("xs")]: {
        width: "3px",
      },
    },

    "&::-webkit-scrollbar-track ": {
      borderRadius: "6px",
      background: "rgba(0,0,0,0.1)",
    },

    "&::-webkit-scrollbar-thumb": {
      borderRadius: "6px",
      background: primary,
      cursor: "pointer",

      "&:hover ": {
        background: `${primary}ee`,
      },

      "&:active ": {
        background: `${primary}dd`,
      },
    },
  },

  headerTitleSb: {
    display: "flex",
    flexDirection: "column",
    // alignItems : 'center',
    margin: "10px 0",
  },
  titleHeader: {
    fontSize: "1rem",
    margin: " 0px",
    fontWeight: "600",
    lineHeight: "1.55556",
    fontFamily: '"Public Sans", sans-serif',
    display: "block",
    // color: 'rgb(33, 43, 54)',
    
  wordBreak: 'break-all',

    [theme.breakpoints.down("md")]: {
      fontSize: ".85rem",
      fontWeight: "600",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: ".78rem",
      fontWeight: "500",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".72rem",
    },
  },

  titleText: {
    fontSize: "0.96rem",
    margin: " 0px",
    fontWeight: "500",
    lineHeight: "1.55556",
    fontFamily: '"Public Sans", sans-serif',
    display: "block",
    // color: 'rgb(33, 43, 54)',

    [theme.breakpoints.down("md")]: {
      fontSize: ".85rem",
      fontWeight: "600",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: ".78rem",
      fontWeight: "500",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: ".72rem",
    },
  },

  titleHeaderIcon: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    // marginBottom : '10px',
  },

  btnHeaderWithIcon: {
    fontSize: ".8rem",
    padding: "4px 8px",
    [theme.breakpoints.down("sm")]: {
      fontSize: ".6rem",
      padding: "3px 6px",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  btnIconHeader: {
    display: "flex",

    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  emptyPageImageContainer: {
    height: "50vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "10px",
  },
  emptyPageImage: {
    maxHeight: "100%",
    maxWidth: "100%",
    maxWidth: "100%",
    width: "60%",
    height: "auto",
    objectFit: "cover",
  },
  primaryColor: {
    color: primary,
    cursor: "poniter",
  },

  loadingContainer: {
    height: "50vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  loadingBox: {
    // width : '100%',
    height: "120px",
    width: "120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // background : 'yellow',
    transform: "translateX(-50% -50%)",

    [theme.breakpoints.down("md")]: {
      height: "90px",
    },

    [theme.breakpoints.down("sm")]: {
      height: "80px",
    },

    [theme.breakpoints.down("xm")]: {
      height: "50px",
    },
  },

  loadingBoxItem01: {
    width: "120px",
    height: "120px",
    border: "0px solid #fff",
    borderRadius: "50%",
    position: "absolute",
    //
    borderBottomWidth: "8px",

    [theme.breakpoints.down("md")]: {
      width: "90px",
      height: "90px",
    },

    [theme.breakpoints.down("sm")]: {
      width: "80px",
      height: "80px",
    },

    [theme.breakpoints.down("xm")]: {
      height: "50px",
      width: "50px",
    },
    borderColor: primary,
    animation: `$rotate  2s linear infinite`,
  },

  loadingBoxItem02: {
    width: "120px",
    height: "120px",
    border: "0px solid #fff",
    borderRadius: "50%",
    position: "absolute",
    [theme.breakpoints.down("md")]: {
      width: "90px",
      height: "90px",
    },

    [theme.breakpoints.down("sm")]: {
      width: "80px",
      height: "80px",
    },

    [theme.breakpoints.down("xm")]: {
      height: "50px",
      width: "50px",
    },
    //
    borderRightWidth: "8px",
    borderColor: "yellow",
    animation: `$rotate02 2s linear infinite`,
  },
  loadingBoxItem03: {
    width: "120px",
    height: "120px",
    border: "0px solid #fff",
    borderRadius: "50%",
    position: "absolute",
    [theme.breakpoints.down("md")]: {
      width: "90px",
      height: "90px",
    },

    [theme.breakpoints.down("sm")]: {
      width: "80px",
      height: "80px",
    },

    [theme.breakpoints.down("xm")]: {
      height: "50px",
      width: "50px",
    },
    //
    borderTopWidth: "8px",
    borderColor: "orange",
    animation: `$rotate03  2s linear infinite`,
  },

  loadingBoxItem04: {
    width: "120px",
    height: "120px",
    border: "0px solid #fff",
    borderRadius: "50%",
    position: "absolute",
    [theme.breakpoints.down("md")]: {
      width: "90px",
      height: "90px",
    },

    [theme.breakpoints.down("sm")]: {
      width: "80px",
      height: "80px",
    },

    [theme.breakpoints.down("xm")]: {
      height: "50px",
      width: "50px",
    },
    //
    borderLeftWidth: "8px",
    borderColor: "green",
    animation: `$rotate04  2s linear infinite`,
  },

  loadingBoxText: {
    color: primary,
    fontSize: ".8rem",
    fontWeight: "600",
    animation: `$loadingText  1s linear infinite`,

    [theme.breakpoints.down("sm")]: {
      fontSize: ".8rem",
    },

    [theme.breakpoints.down("xm")]: {
      fontSize: ".6rem",
    },
  },

  "@keyframes rotate": {
    "0%": {
      transform: "rotateX(35deg) rotateY(-45deg) rotateZ(0deg)",
    },
    "100%": {
      transform: "rotateX(35deg) rotateY(-45deg) rotateZ(360deg)",
    },
  },

  "@keyframes rotate02": {
    "0%": {
      transform: "rotateX(50deg) rotateY(10deg) rotateZ(0deg)",
    },
    "100%": {
      transform: "rotateX(50deg) rotateY(10deg) rotateZ(360deg)",
    },
  },

  "@keyframes rotate03": {
    "0%": {
      transform: "rotateX(35deg) rotateY(55deg) rotateZ(0deg)",
    },
    "100%": {
      transform: "rotateX(35deg) rotateY(55deg) rotateZ(360deg)",
    },
  },

  "@keyframes rotate04": {
    "0%": {
      transform: "rotateX(50deg) rotateY(-20deg) rotateZ(0deg)",
    },
    "100%": {
      transform: "rotateX(50deg) rotateY(-20deg) rotateZ(360deg)",
    },
  },

  "@keyframes loadingText": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      transform: 1,
    },
  },

  menuItem: {
    // paddingLeft: '8px !important',
    margin: "0 !important",
    padding: "10px 15px 10px 8px  !important",
    minWidth: "100%",
    // whiteSpace : 'nowrap',
    color: "rgb(33, 43, 54)",
    lineHeight: "initial !important",
    fontSize: "0.875rem",
    fontFamily: '"Public Sans", sans-serif',
    fontWeight: "400",
    borderRadius: "6px",
    //
    display: "flex",
    justifyContent: "flex-start !important",
    alignItems: "center",
    position: "relative",
    textDecoration: "none",
    minHeight: "28px",
    width: "135px",
    margin: 0,
  },

  menuItemDelet: {
    color: " rgb(255, 72, 66)",
  },

  menuItemNormalBtn: {
    marginRight: "18px",
    width: "20px",
    height: "20px",
  },

  tableCell: {
    fontSize: "0.875rem",
  },

  tableCellHeader: {
    fontSize: "0.875rem",
    fontWeight: "600",
  },

  loadingContainerHome: {
    height: "100vh",
    width: "100%",
    // background : 'yellow',s
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingContainerAllPage: {
    background: "rgba(0,0,0,.45)",
    zIndex: "10000",
    position: "fixed ",
    top: 0,
    left: 0,
    righht: 0,
    bottom: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translateX(-50% -50%)",
  },

  productImagesContanerModule: {
    width: "45px",
    height: "45px",
    margin: "8px 10px 8px 0",
    position: "relative",
  },

  productImagerModule: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  priceincreaseContainer : {
    display : "flex",
    alignItems: "center",

    [theme.breakpoints.down("xs")]: {
      flexDirection : 'column',
      alignItems: "flex-start",

     },

  },
  priceincrease : {
    display : "flex",
    // justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      marginBottom :'10px'

     },
    
  },
  priceincreaseBtn : {
    width : '28px',
    height : '28px',
    display : 'flex', 
    justifyContent: "center",
    alignItems: "center",
    border : "1px solid rgba(0, 0, 0, .3)",
    borderRadius :'50%',
    cursor: "pointer",

  },
  iquantity : {
    margin : '0 5px',
    minWidth : '40px',
    height : '27px',

    display : 'flex', 
    justifyContent: "center",
    alignItems: "center",

    border : "1px solid rgba(0, 0, 0, .25)",

  },

  imgCart : {
    width : '70px',
    height : '70px',
    objectFit: "contain",
    marginRight : '10px',

    [theme.breakpoints.down("sm")]: {
      width : '40px',
      height : '40px',
     },

     [theme.breakpoints.down("xs")]: {
      width : '32px',
      height : '32px',
     },

  },

  

  cartRow : {
    display : 'flex', 
    padding : '14px 10px',
    borderBottom : "1px solid rgba(0, 0, 0, .096)",
    // flexWrap : 'wrap',
    // wordBreak: 'break-all',


  },

sbInLarge : {
  display: "flex",
  justifyContent: "space-between",
  width : '100%',
  

  [theme.breakpoints.down("sm")]: {
    flexDirection : 'column',
  },

},

  productImageCancel: {
    position: "absolute",
    top: "1px !important",
    right: "1px !important",
    width: "5px",
    height: "5px",
    background: "#eee",
    color: "#222",
    display : 'flex', 
    justifyContent: "center",
    alignItems: "center",
    borderRadius :'50%',
    cursor: "pointer",


    "&:hover": {
      background: "#fff",
      color: "#000",
      transform: "scale(1.03) ",
    },

    [theme.breakpoints.down("sm")]: {
        width: "4px",
        height: "4px",
    },

  },
  productImageCancelIcon : {
    position: "relative",
    display : 'block',
    background: "#fff",
    borderRadius :'50%',

  },
  cartEmptyImg : {
    width : '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection : 'column',
    marginTop :'40px'
  },

  cartEmptyImgImg : {
    marginBottom :'15px'

  },

  loadFull:{
    position : 'fixed',
    // width : '100%', 
    height : '100%', 
    top : 0, 
    left : 0,
    right : 0, 
    bottom :0, 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    background : 'rgba(0,0,0,.15)',
    zIndex : 999,
    // transform: "translate(-50%, -50%)",

},









listItemMin : {
  width :'50%',
  justifyContent: "flex-start",
    alignItems: "flex-start",
   
    [theme.breakpoints.down("md")]: {
      width :'100%',  
      marginLeft : 0,
      marginRight : 0,  
      paddingLeft : '0 !important',
      paddingRight : '0 !important',

    },
},


listItemFull : {
  width :'100%', 
 
  [theme.breakpoints.down("md")]: {
    width :'100%',  
    marginLeft : 0,
    marginRight : 0,  
    paddingLeft : '0 !important',
    paddingRight : '0 !important',

  },
},

listItemMinAccordion : {
  width :'100%',
  margin : '5px 0',

  boxShadow :'0 !important',
  border : '1px solid rgba(0, 0, 0, .196)',

  '&:before': {
    display: 'none',
  }, 

  '& MuiPaper-elevation1' : {
    boxShadow :'0 !important',
    border : '0px solid rgba(0, 0, 0, .196)',
  
  },
},

sectionAddFloat : {
  background : '#fff',
  position: "inherit",
    width: "100%",
    // height: "100%",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  zIndex : 10,
},

sectionP : {
  padding : '4px 16px',

  [theme.breakpoints.down("md")]: {
    padding : '4px 12px'
   },
  [theme.breakpoints.down("sm")]: {
    padding : '3px 10px'
   },
  [theme.breakpoints.down("xs")]: {
   padding : '2px 6px'
  },
},

TreeItemStyle : {
  width : '100% !important',
  // border :'1px solid red',
  margin : 0,
  padding : 0,
  minHeight : '40px',
  '& ul' :{
  minHeight : '40px',

    
   margin : '0 0 5px 7px',
   padding : 0,
   height :'100%'
  },

  '& li' :{
    padding : 0,
    
    margin : '0px 0 0px 7px',

   },

},

orderBox : {
  width : '100%',
  display: "flex",
  margin: '20px 0',
  
  justifyContent: "flex-start",
  alignItems: "flex-start",
  flexDirection : 'column',
  border : '1px solid rgba(0, 0, 0, .196)',
  borderRadius : '5px',
},

orderHeader : {  
  
 
  minHeight : '65px',
  width : '100%',
  borderBottom : '1px solid rgba(0, 0, 0, .196)',
  display: "flex",
  
  justifyContent: "space-between",
  alignItems: "center",
  padding : '7px 5px 7px 20px',
  // flexWrap:'wrap',

  [theme.breakpoints.down("sm")]: {
    padding : '0 4px 0 10px',
  },

  [theme.breakpoints.down("xs")]: {
    padding : '0 2px 0 4px',

  },
},


orderMain : {
  width : '100%',
  padding : '10px 25px',
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexWrap : 'wrap',
  [theme.breakpoints.down("sm")]: {
    flexDirection : 'column',
    flexWrap : 'nowrap',
    padding : '4px 10px',
  },

  [theme.breakpoints.down("xs")]: {
    padding : '4px 6px',
  },
},

orderMainItems : {
  maxWidth : '50%',
  [theme.breakpoints.down("md")]: {
    maxWidth : '100%',
   },
  padding :'10px',
  [theme.breakpoints.down("sm")]: {
    maxWidth : '100%',
    width : '100%',
   },

},

orderMainItem : {
  '& span':{opacity :'0.75'}
},

orderMainTitle : {
  fontWeight: 700,
},

orderFooter:{
  width : '100%',
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding :'10px 20px',
  
  flexWrap : 'wrap',

  // justifyContent: "space-between",
},

orderStepper:{
  width : '60%',
  padding :'12px 0',
  margin : 0,
  [theme.breakpoints.down("md")]: {
    width : '100%',
   },
   [theme.breakpoints.down("sm")]: {
    width : '100%',
    overflowX: 'scroll',
   },
},
orderStepperS : {
  padding :0,
  margin : 0,
},

orderAction : {
  display: "flex",
  flexDirection : 'row',
  alignItems: "center",
  // width : '40%',
  justifyContent: "flex-end",
  [theme.breakpoints.down("md")]: {
    width : '100%',
    justifyContent: "flex-start",
    alignItems: "center",

  },

   [theme.breakpoints.down("xs")]: {
    flexDirection : 'column',
    alignItems: "flex-end",
    justifyContent: "center",


   },

},
orderActionSelect:{
  width : '250px',
  margin: '10px 0',
  [theme.breakpoints.down("md")]: {
    width : '200px',
    marginTop: '28px',

   },

   [theme.breakpoints.down("sm")]: {
    width : '60%',
   },

   [theme.breakpoints.down("xs")]: {
    width : '100%',
   },
},

orderMainSection : {
  
  // borderBottom : '1px solid rgba(0, 0, 0, .196)',
  width : '100%',
  padding : '0 20px',

  [theme.breakpoints.down("sm")]: {
    padding : '0 10px',

  },

  [theme.breakpoints.down("xs")]: {
    padding : '0 6px',
  },

},

orderMainSectionHeader : {
  minHeight : '65px',
  width : '100%',
  borderBottom : '1px solid rgba(0, 0, 0, .196)',
  display: "flex",
  
  justifyContent: "flex-start",
  alignItems: "center",
  padding : '7px 5px 7px 20px',
  wordBreak: 'break-all',


  [theme.breakpoints.down("sm")]: {
    padding : '10px ',
    flexDirection : "column",
    alignItems: "flex-start",

  },

  [theme.breakpoints.down("xs")]: {
    padding : '10px 4px',
  },
 
},

orderMainSectionHeaderTitle : {
  marginRight : '25px',
  display: "flex",
  
  justifyContent: "flex-start",
  alignItems: "center",
  fontWeight: '400',
  lineHeight: '1.5em',
  color: 'rgb(97, 97, 97)',
  fontFamily: 'Roboto, sans-serif',
  fontSize: '0.875rem',
  flexWrap : "wrap",
  wordBreak: 'break-all',


  [theme.breakpoints.down("md")]: {
    marginRight : '12px',
   },

   [theme.breakpoints.down("sm")]: {
    padding : '7px 0',
  },

  

},

orderMainSectionBodyItemBodyStatus : {
  fontWeight: '700',
  borderRadius : '6px',
  padding : '3px 10px',
  margin : '5px',
  wordBreak: 'break-all',
},

orderMainSectionBody : {
  display: "flex",
  
  justifyContent: "space-between",
  alignItems: "center",
  padding : '19px 0',
  borderBottom : '1px solid rgba(0, 0, 0, .196)',
  flexWrap: 'wrap',
  wordBreak: 'break-all',
},

orderMainSectionBodyItem : {
  minWidth :'32%',

  [theme.breakpoints.down("sm")]: {
    width :'100%',
  },

  

},

orderMainSectionBodyItemFull : {
  width :'100%',
  wordBreak: 'break-all',

},

orderMainSectionBodyItemTitle :{    
  fontSize: '1.1rem',
  fontWeight: '600',
  fontFamily: 'Roboto, sans-serif',
  lineHeight: '1.235',
  padding : '14px 0',
  wordBreak: 'break-all',

},

orderMainSectionBodyItemBodyNrml :{
  fontSize: '1rem',
  fontWeight: '500',
  fontFamily: 'Roboto, sans-serif',
  lineHeight: '1.25',
  paddingBottom : '9px',
  wordBreak: 'break-all',

},

orderMainSectionBodyItemBodyDesc :{
  fontSize: '.98rem',
  fontWeight: '500',
  fontFamily: 'Roboto, sans-serif',
  lineHeight: '1.25',
  paddingBottom : '16px',
  wordBreak: 'break-all',

},

orderMainSectionBodyItemBody : {
  padding : '5px 7px',
},


orderMainSectionBodyItemBodyFull:{
  display : 'flex',
  flexDirection :'row',
  justifyContent: "space-between",
  flexWrap : "wrap",

},
orderMainSectionBodyItemBodyDescFull : {
  fontSize: '.98rem',
  fontWeight: '500',
  fontFamily: 'Roboto, sans-serif',
  lineHeight: '1.25',
  paddingBottom : '9px',
  width : '32%',
  wordBreak: 'break-all',

  [theme.breakpoints.down("md")]: {
    width :'48%',
  },
  [theme.breakpoints.down("sm")]: {
    width :'100%',
  },
},

orderMainSectionTable : {
  width : '100%',
  display : 'flex',
  flexDirection :'column',
  padding : '10px 0',
  
  overflowX: "scroll",
  "&::-webkit-scrollbar": {
    display: "none",
    // width: 5
  },

  "&::-webkit-scrollbar-track": {
    backgroundColor: "grey",
    opacity: "0.7",
  },

  "&::-webkit-scrollbar-thumb": {
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
  },
},

orderMainSectionTableRow:{
  width : '100%',
  display : 'flex',
  flexDirection :'row',
  flexWrap : "nowrap",
  minHeight : '60px',
  minWidth : '710px',
 
  borderBottom : '1px solid rgba(0, 0, 0, .196)',
  
  justifyContent: "flex-start",
  alignItems: "center",
  padding : '6px 5px 6px 20px',
},

orderMainSectionTableHeaderDescription : {
  width : '43%',
  padding : '6px 4px',
  display : 'flex', 
  justifyContent: "flex-start",  
  alignItems: "center",




},

orderMainSectionTableHeaderCountity : {
  width : '18%',
  minWidth : '150px',
  padding : '8px 4px',

  textAlign: 'center',

},

orderMainSectionTableHeaderAmount : {
  width : '18%',
  padding : '8px 4px',

},

orderMainSectionTableHeaderTotal : {
  width : '18%',
  padding : '8px 4px',

},

orderMainSectionTableHeaderTitle : {
  fontSize: '1.1rem',
  fontWeight: '600',
  fontFamily: 'Roboto, sans-serif',
  lineHeight: '1.3',
},

orderMainSectionTableHeaderDesc : {
  fontSize: '1rem',
  fontWeight: '400',
  fontFamily: 'Roboto, sans-serif',
  lineHeight: '1.3',
},

orderFooter:{
  padding : '30px 22px',
  width : '100%',
  display : 'flex',
  flexDirection :'row',
  justifyContent:'space-between',
  flexWrap : 'wrap',

 
  [theme.breakpoints.down("sm")]: {
    padding : '28px 12px',
    flexDirection :'column',
  },

},
orderTotal : {
  width : '100%',
  display : 'flex', 
  flexDirection :'row',
  justifyContent:'flex-end',
  backgroundColor: 'rgb(227, 242, 253)',
  padding : '20px',
  borderRadius: "10px",
  
  wordBreak: 'break-all',

  [theme.breakpoints.down("sm")]: {
      padding : '8px',
      borderRadius: "8px",
    justifyContent:'flex-start',



  },
},

orderTotalBox : {
// width : '100%',
// maxWidth : '600px',
  // display : 'flex', 
  // flexDirection :'column',
  // alignItems:'flex-end',

},

orderMainSectionTableHeaderDescImgBox : {
  width :'80px',
  height : '50px',
  margin : '5px 7px 5px 0'
  
},
orderMainSectionTableHeaderDescImg : {
  width :'100%',
  height : '100%',
  objectFit: 'contain',

  
},

orderTotalTypo : {
  display : 'flex', 
  flexDirection :'row',
  margin : '2px 0',
  
  wordBreak: 'break-all',
},

orderTotalTypoTitle : {
  width  : '200px ',
  fontWeight: '700',
  
  wordBreak: 'break-all',

  [theme.breakpoints.down("sm")]: {
    width  : '120px ',
    marginRight  : '15px ',

  },

  [theme.breakpoints.down("xs")]: {
    width  : 'auto ',
    marginRight  : '10px ',
  },

},

orderTotalTotal : {
  display : 'flex', 
  flexDirection :'row',
  margin : '22px 0 5px 0'
},



cardDashFirst : {
  backgroundColor : 'rgba(200, 250, 205, 0.9)',
boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
  borderRadius : '12px',
  transition: "all 0.2s ease",
  minHeight : '160px',
  margin : '5px 0',
  "&:hover": {
    backgroundColor : 'rgba(200, 250, 205, 0.85)',
boxShadow: 'rgb(145 158 171 / 20%) 1px 1px 4px 0px, rgb(145 158 171 / 12%) 0px 15px 26px -5px',
      
  },

},

cardDash : {
  backgroundColor : 'rgba(200, 250, 205, 0.3)',
boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
  borderRadius : '12px',
  transition: "all 0.2s ease",
  minHeight : '160px',
  
  margin : '5px 0',

  "&:hover": {
    backgroundColor : 'rgba(200, 250, 205, 0.85)',
boxShadow: 'rgb(145 158 171 / 20%) 1px 1px 4px 0px, rgb(145 158 171 / 12%) 0px 15px 26px -5px',
      
  },

},

dashboardCardBtn : {
  backgroundColor : 'rgba(0, 123, 85, 0.9)',
  color :'#fff',
  padding : '6px 15px',
  fontWeight: '700',
  lineHeight: '1.71429',
  fontSize: '0.875rem',
  textTransform: 'capitalize',
  // fontFamily: "Public Sans sans-serif",
  // boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
   borderRadius : '7px',
   "&:hover": {
    backgroundColor : 'rgba(10, 123, 85, 0.85)',
    color :'#fff',
  },

},


dashboardSection : {
  margin :'40px 0',
  display : 'flex',
  flexDirection : 'column',
  justifyContent: "flex-start",
    alignItems: "flex-start",
},


dashboardflexTab : {
  display : 'flex',
  justifyContent: "space-between",
  margin : '8px 0',
  paddingRight : '5px',
  width :'100%',
  alignItems: "center",
  backgroundColor : 'rgba(200, 250, 205, 0.5)',
  boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
  borderRadius : '9px',

  
[theme.breakpoints.down("xs")]: {
  overflowX: 'scroll',

},
},

dashboardflexTabDesName : {
width :'100%',  
lineHeight:'2rem',
maxHeight :'1.6rem',
overflow : 'hidden',
fontSize: '1rem',


[theme.breakpoints.down("xs")]: {
 
  fontSize: '.7rem',



},

},

dashboardflexTabImg : {
  width : '60px',
  minWidth : '60px',
  height : '60px',
  border : '1px solid rgba(0, 0, 0, .03)',
  borderRadius : '7px',
  padding : '6px',
  marginRight : '5px',

  [theme.breakpoints.down("xs")]: {
    width : '40px',
    minWidth : '40px',
    height : '40px',
  },
},

dashboardflexTabDesItems : {
  width : '50px',
  minWidth : '50px',
  height : '50px',
  backgroundColor : 'rgba(0, 123, 85, 0.9)',
  color :'#fff',
  
  fontWeight: '700',
  fontSize: '1.1rem',

  boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
  borderRadius : '50%',
  border: '2px solid #fff',
  display : 'flex',
  justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      width : '30px',
      minWidth : '30px',
      height : '30px',
      fontSize: '.6rem',


      border: '1px solid #fff',


    },

    [theme.breakpoints.down("xs")]: {
      width : '20px',
      minWidth : '20px',
      height : '20px',
      borderRadius : '30%',
      fontSize: '.7rem',


      border: '1px solid #fff',


    },
    
},



dashboardflexTabImgImg : {
  width : '100%',
  height : '100%',
  objectFit: 'contain',

},

dashboardflexTabDes : {
  width : '100%',

},



}));

export default useStyles;
