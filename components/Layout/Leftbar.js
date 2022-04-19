import { Typography, Grid, IconButton } from "@material-ui/core";

import React, { useContext, useState, useEffect} from "react";
import NextLink from "next/link";
import useStyles from "../../utils/styles/styles";
import { useRouter } from "next/router";
import {Cancel, KeyboardArrowDown, KeyboardArrowUp} from "@material-ui/icons";
import Cookies from "js-cookie";


import { Store } from "../../utils/store/Store";

export default function Leftbar({ filedSelect, adminDashboard, userDashboard }) {
  const classN = useStyles();
  const router = useRouter();


  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  
  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
  
  }, []);
  
  const [openDachboardMobile, setOpenDachboardMobile] = useState(false)


  
  const logout = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    router.push("/");
  };

  const adminDashboardOptions = [
      {name :'dashboard' , link : '/admin/dashboard', icon : <i className="uil uil-estate" /> },
      {name :'users' , link : '/admin/users', icon : <i className="uil uil-users-alt" /> },
      {name :'orders' , link : '/admin/orders', icon : <i className="uil uil-list-ul" /> },
      {name :'products' , link : '/admin/products', icon : <i className="uil uil-package" /> },
      {name :'categories' , link : '/admin/categories', icon : <i className="uil uil-files-landscapes" /> },
      {name :'brands' , link : '/admin/brands', icon : <i className="uil uil-flower" /> },
      // {name :'messages' , link : '/admin/messages', icon : <i className="uil uil-estate" /> },
      {name :'Logout' , fun: logout , icon : <i className="uil-signout" /> },
  ]

  
  const userDashboardOptions = [
    {name :'profile' , link : '/profile', icon : <i className="uil uil-estate" /> },
    {name :'order history' , link : '/profile/order-history', icon : <i className="uil uil-list-ul" /> },
    {name :'shipping addresses' , link : '/profile/shipping-addresses', icon : <i className="uil uil-location-arrow-alt" />},
    {name :'Logout' , fun: logout , icon : <i className="uil-signout" /> },
    ]


  return (
    
    <div className={openDachboardMobile ?
         `${classN.leftSideContainerAll} ${classN.leftSideContainerAllClickMobile}`
        : `${classN.leftSideContainerAll} `
        }

        // style={{position: openDachboardMobile ? 'fixed':"sticky",}}
        >
      <Grid
        className={classN.adminLeftSideGridToTop}
        onClick={() => setOpenDachboardMobile(!openDachboardMobile)}
      >
        <Typography className={`${classN.adminLeftSideGridToTopTitle} ${classN.capitalize}`}>{ filedSelect ? filedSelect : ''}</Typography>

        <IconButton
          aria-label="close"
          style={{
            padding: "0",
            marginLeft: "12px",
          }}
        >
          {openDachboardMobile ? (
            <Cancel className={classN.navbarButtonListDashhborad} />
          ) : (
            <KeyboardArrowDown className={classN.navbarButtonListDashhborad} />
          )}
        </IconButton>
      </Grid>

      <div className={openDachboardMobile ?
          `${classN.leftSideContainer} ${classN.leftSideContainerClickMobile}`
        : `${classN.leftSideContainer}`
        }>

            
        {adminDashboard && filedSelect && filedSelect === "dashboard" ? (
          <div className={classN.leftSideProfile}>
            <div className={classN.leftSideProfileImageContainer}>
              {userInfo && userInfo.profileImage ? (
                <img
                  className={classN.leftSideProfileImage}
                  // src="/Img/test/profileImage.jpg"
                  src={userInfo.profileImage}
                  alt="profile pic"
                />
              ) : (
                <Typography className={classN.leftSideProfileImage}>
                  {
                    // userInfo.name.substring(0,2)
                    userInfo.name
                      .split(/\s/)
                      .reduce(
                        (response, word) => (response += word.slice(0, 1)),
                        ""
                      )
                  }
                </Typography>
              )}
            </div>

            <div className={classN.leftSideProfileDetails}>
              <Typography className={classN.leftSideItemProfileName}>
                {userInfo.name}
              </Typography>
              <Typography className={classN.leftSideItemProfileEmail}>
                {userInfo.email}
              </Typography>
            </div>
          </div>
        ) : null}

        {userDashboard && filedSelect && filedSelect === "profile" ? (
          <div className={classN.leftSideProfile}>
            <div className={classN.leftSideProfileImageContainer}>
              {userInfo && userInfo.profileImage ? (
                <img
                  className={classN.leftSideProfileImage}
                  src={userInfo.profileImage}
                  alt="profile pic"
                />
              ) : (
                <Typography className={classN.leftSideProfileImage}>
                  {
                    // userInfo.name.substring(0,2)
                    userInfo.name
                      .split(/\s/)
                      .reduce(
                        (response, word) => (response += word.slice(0, 1)),
                        ""
                      )
                  }
                </Typography>
              )}
            </div>

            <div className={classN.leftSideProfileDetails}>
              <Typography className={classN.leftSideItemProfileName}>
                {userInfo.name}
              </Typography>
              <Typography className={classN.leftSideItemProfileEmail}>
                {userInfo.email}
              </Typography>
            </div>
          </div>
        ) : null}

    

        { adminDashboard && adminDashboardOptions.map( (ele) => {
            if (ele.link) {
                return (
                    <NextLink href={ele.link} passHref>
                    <div
                        className={
                        filedSelect && filedSelect === ele.name
                            ? classN.leftSideItemActive
                            : classN.leftSideItem
                        }
                    >
                        <div className={classN.leftSideItemIcon}>
                        {ele.icon && (ele.icon)}
                        </div>
                        <Typography className={`${classN.leftSideItemText} ${classN.capitalize}`}>
                            {ele.name && (ele.name)}
                        </Typography>
                    </div>
                    </NextLink>
                )
            }else {
                if(ele.fun) {
                    return (
                        <div className={classN.leftSideItem} onClick={ele.fun}>
                            <div className={classN.leftSideItemIcon}>
                            {ele.icon && (ele.icon)}
                            </div>
                            <Typography className={`${classN.leftSideItemText} ${classN.capitalize}`}> 
                            {ele.name && (ele.name)} </Typography>
                      </div>
              
                    )
                }
            }
        } )}

      

{ userDashboard && userDashboardOptions.map( (ele) => {
            if (ele.link) {
                return (
                    <NextLink href={ele.link} passHref>
                    <div
                        className={
                        filedSelect && filedSelect === ele.name
                            ? classN.leftSideItemActive
                            : classN.leftSideItem
                        }
                    >
                        <div className={classN.leftSideItemIcon}>
                        {ele.icon && (ele.icon)}
                        </div>
                        <Typography className={`${classN.leftSideItemText} ${classN.capitalize}`}>
                            {ele.name && (ele.name)}
                        </Typography>
                    </div>
                    </NextLink>
                )
            }else {
                if(ele.fun) {
                    return (
                        <div className={classN.leftSideItem} onClick={ele.fun}>
                            <div className={classN.leftSideItemIcon}>
                            {ele.icon && (ele.icon)}
                            </div>
                            <Typography className={`${classN.leftSideItemText} ${classN.capitalize}`}> 
                            {ele.name && (ele.name)} </Typography>
                      </div>
              
                    )
                }
            }
        } )}

      

       
        {/*  */}
      </div>
    </div>
  );
}
