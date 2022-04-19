import theme from "../../utils/theme/theme";

import {
  AppBar,
  Toolbar,
  Typography,
  Link,
  ThemeProvider,
  CssBaseline,
  Badge,
  Button,
  MenuItem,
  Menu,
  Box,
  IconButton,
  Drawer,
  ListItem,
  List,
  Divider,
  ListItemText,
  InputBase,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import CancelIcon from "@material-ui/icons/Cancel";

import Cookies from "js-cookie";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { Store } from "../../utils/store/Store";
import useStyles from "../../utils/styles/styles";
import { useSnackbar } from "notistack";
import { getError } from "../../utils/error/error";
import axios from "axios";
import Footer from "./Footer";

export default function Layout({
  children,
  titleHeader,
  descriptionHeader,
  categoriesDocs,
  returnSearch,
  withoutFooter,
}) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, cart, userInfo } = state;

  const [anchorEl, setAnchorEl] = useState(null);
  const [sideBarVisble, setSideBarVisble] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [query, setQuery] = useState("");
  const [themeNew, setThemeNew] = useState(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const lightTheme = createTheme({

  //   ...theme,

  //   typography: {
  //     h1: {
  //       fontSize: "1.6rem",
  //       fontWeight: 400,
  //       margin: "1.1rem 0.02rem",
  //     },
  //     h2: {
  //       fontSize: "1.42rem",
  //       fontWeight: 400,
  //       margin: "1.1rem 0.02rem",
  //     },
  //     body1: {
  //       fontWeight: "normal",
  //     },
  //   },

  //   palette: {
  //     primary: {
  //       main: '#088178',
  //     },
  //     secondary: {
  //       main: "#208080",
  //     },
  //     background: {

  //      default: '#fff',
  //      paper: '#fff',  //card and others

  //     },
  //     text: {
  //       primary: '#111',
  //       secondary: '#333',
  //     },
  //     divider : {
  //       main: 'red',
  //     },

  //   },
  // })

  // const darkTheme = createTheme({

  //   typography: {
  //     h1: {
  //       fontSize: "1.6rem",
  //       fontWeight: 400,
  //       margin: "1.1rem 0.02rem",
  //     },
  //     h2: {
  //       fontSize: "1.42rem",
  //       fontWeight: 400,
  //       margin: "1.1rem 0.02rem",
  //     },
  //     body1: {
  //       fontWeight: "normal",
  //     },
  //   },

  //   palette: {
  //     primary: {
  //       main: '#088178',
  //     },
  //     secondary: {
  //       main: "#208080",
  //     },

  //     background: {
  //       main: "#111",
  //       default: '#111',
  //       paper: '#111'

  //     },
  //     text: {
  //       primary: '#fff',
  //       secondary: '#eee',
  //     },
  //   },
  // })

  const classN = useStyles();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
      // console.log('categoriesDocs', categoriesDocs)
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  const fetchBrands = async () => {
    try {
      const { data } = await axios.get(`/api/products/brands`);
      setBrands(data);
      // console.log('categoriesDocs', categoriesDocs)
    } catch (err) {
      enqueueSnackbar(getError(err), { variant: "error" });
    }
  };

  // console.log(" store userInfo", userInfo);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    setThemeNew(theme);
  }, []);

  const OnChangeDarkMode = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const lastValueDarkMode = !darkMode;
    Cookies.set("darkMode", lastValueDarkMode ? "ON" : "OFF");

    //console.log ('darkMode cookie', Cookies.get('darkMode'))

    console.log(" Cookies.get all daata", Cookies.get());
    console.log(" Cookies.get userInfo", Cookies.get("userInfo"));
    console.log(" store userInfo", userInfo);
    console.log(" Theme Type", theme.palette);
  };

  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const loginMenuCloseHandler = (e, redirect) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };

  const logoutFun = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
  };

  const openSideBar = () => {
    setSideBarVisble(!sideBarVisble);
  };

  const closeSideBar = () => {
    setSideBarVisble(false);
  };

  const searchFun = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  const inputSearchChange = (e) => {
    setQuery(e.target.value);
  };

  /** */

  /* */

  const showCategoriesNew = (categories) => {
    const dataTree = createDataTree(categories);
    return showCategories(dataTree);
  };

  const showCategories = (categories) => {
    let defcategories = [];
    for (let category of categories) {
      defcategories.push(
        <li key={category.name}>
          {category.initialParent ? (
            //   <a href={`/${category.slug}?cid=${category._id}&type`}>
            //     {category.name}
            //   </a>

            <NextLink
              key={category._id}
              href={`/search?category=${category.slug}`}
              passHref
            >
              {category.name}
            </NextLink>
          ) : (
            <div className="catcont">
              <div className="catcontainer">
                <div className="catimg">
                  <a href={`/search?category=${category.slug}`}>
                    <img
                      //className="multi__image2"

                      src={category.categoryPicture}
                      alt=""
                      className={classN.categoryImageHeader}
                    />
                  </a>
                </div>
              </div>
              <div className={classN.categorynamecontainer}>
                {/* <span> {category.name} </span> */}
                <NextLink
                  key={category._id}
                  href={`/search?category=${category.slug}`}
                  passHref
                >
                  {category.name.slice(0, 21)}
                </NextLink>
              </div>
            </div>
          )}

          {category.childNodes.length > 0 ? (
            <ul /*className={classN.menuHeaderTheme}*/
              style={{ backgroundColor: darkMode ? "#000" : "#fff" }}
              // darkMode ? darkTheme : lightTheme
            >
              {showCategories(category.childNodes)}
              {/* {console.log('showCategoriesName', category.name,category.childNodes)} */}
            </ul>
          ) : null}
        </li>
      );
    }
    return defcategories;
  };
  /* */
  //initialParent inMenu

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

  /** */
  return (
    <div>
      <Head>
        <title>
          {titleHeader
            ? `${titleHeader} - FIHABOX eCommerce App `
            : `FIHABOX eCommerce App`}
        </title>
        {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" /> */}
        {descriptionHeader && (
          <meta name="description" content={descriptionHeader}></meta>
        )}

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1"
        />
      </Head>

      <ThemeProvider theme={themeNew}>
        {/* <ThemeProvider theme={darkMode ? darkTheme : lightTheme}> */}
        <CssBaseline />
        <AppBar className={classN.navbar} position="sticky">
          <Toolbar className={classN.toolbar}>
            <Box
              display="flex"
              alignItems="center"
              className={classN.firstTollbar}
            >
              <IconButton
                edge="start"
                aria-label="open drawer"
                onClick={openSideBar}
                className={classN.menuBtn}
              >
                <MenuIcon className={classN.humbrger} />
              </IconButton>

              <NextLink href="/" passHref>
                <Link>
                  {/* <Typography className={classN.brand}>KaynaNext</Typography> */}
                  <img
                    className={classN.brand}
                    src="/Img/logo/fihaLight.png"
                    alt="FIHABOX logo"
                  />
                </Link>
              </NextLink>

              <div className={classN.searchSection}>
                <form onSubmit={searchFun} className={classN.searchForm}>
                  <IconButton
                    // type="submit"
                    className={classN.iconBtn}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>

                  <InputBase
                    name="query"
                    className={classN.searchInput}
                    placeholder="Search Product"
                    onChange={inputSearchChange}
                  />

                  <Button type="submit" className={classN.searchBtn}>
                    Search
                  </Button>
                </form>
              </div>
            </Box>

            <Box
              display="flex"
              alignItems="center"
              className={classN.secondTollbar}
            >
              <NextLink href="/login" passHref>
                {userInfo ? (
                  <>
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={loginClickHandler}
                      className={classN.navbarBtn}
                      // endIcon={<KeyboardArrowDownIcon />}
                    >
                      <Typography className={classN.navBarTitles}>
                        <Link
                          style={{ textDecoration: "none" }}
                          className={classN.noneIconeMobile}
                        >
                          <i
                            className="uil uil-user "
                            style={{ marginRight: "3px" }}
                          />
                          <span className={classN.navBarTitlesSpan}>
                            {userInfo &&
                              userInfo.name &&
                              userInfo.name.split(" ")[0].slice(0, 11)}
                          </span>
                        </Link>
                      </Typography>
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      // onClose={loginMenuCloseHandler}

                      onClose={(event, reason) => {
                        if (reason !== "backdropClick") {
                          loginMenuCloseHandler;
                          setAnchorEl(null);
                          handleClose(event, reason);
                        } else {
                          loginMenuCloseHandler;
                        }
                        setAnchorEl(null);
                      }}
                      getContentAnchorEl={null}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <MenuItem
                        onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/profile/order-history")
                        }
                      >
                        Order History
                      </MenuItem>
                      {userInfo.isAdmin && (
                        <MenuItem
                          onClick={(e) =>
                            loginMenuCloseHandler(e, "/admin/dashboard")
                          }
                        >
                          Admin Dashboard
                        </MenuItem>
                      )}

                      <MenuItem onClick={logoutFun}>Logout</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Typography
                    className={`${classN.navBarTitles} ${classN.noneIconeMobile}`}
                  >
                    <Link style={{ textDecoration: "none" }}>
                      <i
                        className="uil uil-user nav_icon"
                        style={{ marginRight: "3px" }}
                      />
                      <span className={classN.navBarTitlesSpan}>Log In</span>
                    </Link>
                  </Typography>
                )}
              </NextLink>

              {/* <NextLink href="#" passHref>
                <Typography className = {`${classN.navBarTitlesHelp} ${classN.navBarTitles} `}>
       
                      <Link style={{ textDecoration : 'none'}}>
                        <i className="uil uil-info-circle nav_icon" style={{marginRight : '3px'}} /> 
                        Help
                      </Link>
                </Typography>
              </NextLink> */}

              <NextLink href="/cart" passHref>
                <Link style={{ textDecoration: "none" }}>
                  <Typography className={classN.navBarTitles}>
                    {cart.cartItems.length > 0 ? (
                      <Badge
                        badgeContent={cart.cartItems.length}
                        color="secondary"
                      >
                        <span className={classN.navBarTitlesSpan}>Cart</span>
                        <i
                          className="uil uil-shopping-cart nav_icon"
                          style={{ marginRight: "3px" }}
                        />
                      </Badge>
                    ) : (
                      <NextLink href="/cart" passHref>
                        <Typography className={classN.navBarTitles}>
                          <Link style={{ textDecoration: "none" }}>
                            <i
                              className="uil uil-shopping-cart"
                              style={{ marginRight: "3px" }}
                            />
                            <span className={classN.navBarTitlesSpan}>
                              Cart
                            </span>
                          </Link>
                        </Typography>
                      </NextLink>
                    )}
                  </Typography>
                </Link>
              </NextLink>
            </Box>

            <Drawer
              anchor="left"
              open={sideBarVisble}
              onClose={closeSideBar}
              //className={classN.sideBar}
              style={{
                padding: "0",
                margin: "0",
              }}
            >
              <List>
                <ListItem>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    style={{ width: "100% " }}
                  >
                    {/* <Typography>Shopping by category</Typography> */}

                    <NextLink href="/" passHref>
                      <Link>
                        {/* <Typography className={classN.brand}>KaynaNext</Typography> */}
                        <img
                          className={classN.brand}
                          src="/Img/logo/fihaDark.png"
                          alt="FIHABOX logo"
                        />
                      </Link>
                    </NextLink>

                    <IconButton
                      //edge="start"
                      aria-label="close"
                      onClick={closeSideBar}
                      style={{
                        padding: "0",
                        marginLeft: "12px",
                      }}
                    >
                      <CancelIcon className={classN.navbarButton} />
                    </IconButton>
                  </Box>
                </ListItem>

                <Divider light />
                <Box className={classN.sideBarBoxes}>
                  <Typography className={classN.sideBarTitlesPrimary}>
                    YOUR ACCOUNT
                  </Typography>

                  {userInfo ? (
                    userInfo.name && (
                      <ListItem
                        onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                      >
                        <i
                          className="uil uil-user nav_icon"
                          style={{
                            marginRight: "6px",
                            fontSize: "1.4rem",
                            fontWeight: 600,
                          }}
                        />
                        <Typography>
                          Profile {`(${userInfo.name.slice(0, 12)})`}{" "}
                        </Typography>
                      </ListItem>
                    )
                  ) : (
                    <ListItem
                      onClick={(e) => loginMenuCloseHandler(e, "/login")}
                    >
                      <i
                        className="uil uil-user nav_icon"
                        style={{
                          marginRight: "6px",
                          fontSize: "1.4rem",
                          fontWeight: 600,
                        }}
                      />
                      <Typography>Login </Typography>
                    </ListItem>
                  )}

                  {userInfo
                    ? userInfo.isAdmin && (
                        <ListItem
                          onClick={(e) =>
                            loginMenuCloseHandler(e, "/admin/dashboard")
                          }
                        >
                          <i
                            className="uil uil-user nav_icon"
                            style={{
                              marginRight: "6px",
                              fontSize: "1.4rem",
                              fontWeight: 600,
                            }}
                          />
                          <Typography>Dashboard</Typography>
                        </ListItem>
                      )
                    : null}

                  <ListItem
                    onClick={(e) =>
                      loginMenuCloseHandler(e, "/profile/order-history")
                    }
                  >
                    <i
                      className="uil uil-shopping-bag"
                      style={{
                        marginRight: "6px",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                      }}
                    />
                    <Typography>Orders</Typography>
                  </ListItem>

                  <ListItem onClick={(e) => loginMenuCloseHandler(e, "/cart")}>
                    <i
                      className="uil uil-shopping-cart"
                      style={{
                        marginRight: "6px",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                      }}
                    />
                    <Typography>Cart</Typography>
                  </ListItem>
                  {/* <ListItem>
                   <i className="uil uil-comment-heart" style={{marginRight : '6px', fontSize : '1.4rem', 
                                      fontWeight: 800}} />
                       <Typography>Reviews</Typography>
                   </ListItem> */}
                </Box>

                <Divider light />
                <Box className={classN.sideBarBoxes}>
                  <Typography className={classN.sideBarTitlesPrimary}>
                    OUR CATEGORIES
                  </Typography>
                  {categories &&
                    categories.map((cat) => {
                      if (!cat.initialParent) {
                        return (
                          <NextLink
                            key={cat.slug}
                            href={`/search?category=${cat.slug}`}
                            passHref
                          >
                            <ListItem
                              button
                              component="a"
                              onClick={closeSideBar}
                            >
                              <img
                                //className="multi__image2"

                                src={cat.categoryPicture}
                                alt=""
                                style={{
                                  width: "1.3rem",
                                  height: "1.3rem",
                                  objectFit: "contain",

                                  marginRight: "12px",
                                  borderRadius: ".2rem",
                                  display: "inline-block",
                                }}
                              />

                              <ListItemText
                                primary={cat.name && cat.name.slice(0, 30)}
                              ></ListItemText>
                            </ListItem>
                          </NextLink>
                        );
                      }
                    })}

                  {/* categoriesDocs */}
                </Box>

                <Divider light />
                <Box className={classN.sideBarBoxes}>
                  <Typography className={classN.sideBarTitlesPrimary}>
                    BRANDS
                  </Typography>
                  {brands &&
                    brands.slice(0, 7).map((brand) => {
                      return (
                        <NextLink
                          key={brand.name}
                          href={`/search?brand=${brand.name}`}
                          passHref
                        >
                          <ListItem button component="a" onClick={closeSideBar}>
                            <img
                              //className="multi__image2"

                              src={brand.brandLogo}
                              alt=""
                              style={{
                                width: "1.3rem",
                                height: "1.3rem",
                                objectFit: "contain",

                                marginRight: "12px",
                                borderRadius: ".2rem",
                                display: "inline-block",
                              }}
                            />

                            <ListItemText
                              primary={brand.name && brand.name.slice(0, 30)}
                            ></ListItemText>
                          </ListItem>
                        </NextLink>
                      );
                    })}
                </Box>

                <Divider light />
                <Box className={classN.sideBarBoxes}>
                  <Typography className={classN.sideBarTitlesPrimary}>
                    ABOUT
                  </Typography>

                  <ListItem onClick={(e) => loginMenuCloseHandler(e, "/about")}>
                    <i
                      className="uil uil-info-circle"
                      style={{
                        marginRight: "6px",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                      }}
                    />
                    <Typography>About</Typography>
                  </ListItem>

                  <ListItem
                    onClick={(e) => loginMenuCloseHandler(e, "/contact")}
                  >
                    <i
                      className="uil uil-envelope"
                      style={{
                        marginRight: "6px",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                      }}
                    />
                    <Typography>Contact</Typography>
                  </ListItem>

                  <ListItem
                    onClick={(e) => loginMenuCloseHandler(e, "/delivery")}
                  >
                    <i
                      className="uil uil-archive-alt"
                      style={{
                        marginRight: "6px",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                      }}
                    />
                    <Typography> Delivery Information </Typography>
                  </ListItem>

                  <ListItem
                    onClick={(e) => loginMenuCloseHandler(e, "/privacypolicy")}
                  >
                    <i
                      className="uil uil-keyhole-circle"
                      style={{
                        marginRight: "6px",
                        fontSize: "1.4rem",
                        fontWeight: 600,
                      }}
                    />
                    <Typography> Privacy Policy </Typography>
                  </ListItem>
                </Box>
              </List>
            </Drawer>

            {/* <div>
               <Switch checked={darkMode} onChange={OnChangeDarkMode}></Switch> 
            </div> */}
          </Toolbar>
        </AppBar>

        {/*
        categoriesDocs && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ul className={classN.menuHeader}>
              {showCategories(categoriesDocs)}
            </ul>
          </div>
        )
        
        */}

        {returnSearch && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={classN.searchSection02}>
              <form
                onSubmit={searchFun}
                className={classN.searchForm}
                style={{ border: "1px solid rgba(0, 0, 0, .76)" }}
              >
                <IconButton
                  // type="submit"
                  className={classN.iconBtn}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>

                <InputBase
                  name="query"
                  className={classN.searchInput}
                  placeholder="Search Product"
                  onChange={inputSearchChange}
                />

                <Button type="submit" className={classN.searchBtn}>
                  Search
                </Button>
              </form>
            </div>
          </div>
        )}

        {categoriesDocs && (
           <div className={classN.mainContainer}>
           <div
              className={classN.mainHeader}
             style={{maxWidth : withoutFooter ? '100%' : '2000px'}}
           >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: "100%",
              //border :'1px solid #444'
            }}
          >
            <ul className={classN.menuHeader}>
              {showCategoriesNew(categoriesDocs)}
            </ul>
          </div>
          </div>
          </div>
        )}

        {/* <Container className={classN.menuHeaderHover}></Container> */}
        {/* withoutFooter */}
        <div className={classN.mainContainer}>
          <div
            className={classN.main}

            style={{maxWidth : withoutFooter ? '100%' : '2000px'}}
          >
            {children}
          </div>
        </div>

        <div className={classN.mainContainer}>
          <div
            className={classN.mainFo}
            // style={{ maxWidth: "2400px !important" }}
          >
            {withoutFooter ? null : <Footer />}
          </div>
        </div>

        {/* {withoutFooter ? null : <Footer />} */}
      </ThemeProvider>
    </div>
  );
}
