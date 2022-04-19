import axios from 'axios';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useContext, useReducer, useState } from 'react'
import Layout from '../../components/Layout/Layout';
import Leftbar from "../../components/Layout/Leftbar";

import { getError } from '../../utils/error/error';
import { Store } from '../../utils/store/Store';
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead,
   TableRow, Typography, Button, Card, List, Breadcrumbs, Link,
    ListItem, CircularProgress, ListItemText } from '@material-ui/core';

import { OpenInBrowserSharp, Edit  } from "@material-ui/icons";



import useStyles from '../../utils/styles/styles';
import NextLink from 'next/link'
import Preloader from '../../components/Layout/Preloader';
import moment from "moment";



function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, orders: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        state;
    }
  }

function OrderHistory() {

    const { state } = useContext(Store);
    const router = useRouter();
    
    const {userInfo} = state;

    const classN = useStyles()
    const [breadArray, setBreadArray] =useState([{name: 'home', link :'/' },
    {name: 'profile', link :'/profile' },
    {name: 'order history', link :'/order-history' },
  ])


    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        orders: [],
        error: '',
    });

    
    useEffect(() => {
        if (!userInfo) {
          router.push('/login');
        }
        const fetchOrders = async () => {
          try {
            dispatch({ type: 'FETCH_REQUEST' });
            const { data } = await axios.get(`/api/orders/history`, {
              headers: { authorization: `Bearer ${userInfo.token}` },
            });
            dispatch({ type: 'FETCH_SUCCESS', payload: data });
          } catch (err) {
            dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
          }
        };
        fetchOrders();
      }, []);

    return (
        
        <Layout title="Order History" withoutFooter>
          
         
          <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="order history" userDashboard />
        </Grid>

        <Grid className={classN.adminMainGrid}>

          <div className={classN.section}>

          <List>
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


            </List>

           
             

             
                {loading ? (
                   <div className={classN.loadingContainer}>
                   <Preloader />
                   {/* <CircularProgress /> */}
                 </div>
                ) : error ? (
                  <Typography className={classN.error}>{error}</Typography>
                ) : orders.length > 0 ? (
                  <List>
                     <ListItem>
                      <Typography //component="h1" variant="h1"
                      className={classN.titleHeader}
                      >
                        Order History
                      </Typography>
                    </ListItem>
                    <ListItem>
                    <TableContainer>
                    <Table>
                      <TableHead> 
                      {/** */}
                        <TableRow>
                          <TableCell  className={classN.tableCellHeader}>ID</TableCell>
                          <TableCell  className={classN.tableCellHeader}>DATE</TableCell>
                          <TableCell  className={classN.tableCellHeader}>TOTAL</TableCell>
                          <TableCell  className={classN.tableCellHeader}>PAID</TableCell>
                          <TableCell  className={classN.tableCellHeader}>DELIVERED</TableCell>
                          <TableCell  className={classN.tableCellHeader}></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orders.map((order) => (
                          <TableRow key={order._id}>
                            <TableCell className={classN.tableCell}>{order._id.substring(20, 24)}</TableCell>
                        
                            <TableCell className={classN.tableCell}>{moment(order.createdAt).utc().format("DD-MM-YY hh:mm")} </TableCell>
                            <TableCell className={classN.tableCell}>{order.totalPrice} DA </TableCell>
                            <TableCell className={classN.tableCell}>
                              {order.isPaid
                                ? `paid at ${order.paidAt}`
                                : 'not paid'}
                            </TableCell>
                            <TableCell className={classN.tableCell}>
                              {order.isDelivered
                                ? `delivered at ${order.deliveredAt}`
                                : 'not delivered'}
                            </TableCell>
                            <TableCell className={classN.tableCell}>
                              {/* <NextLink href={`/order/${order._id}`} passHref>
                                <Button variant="contained">Details</Button>
                              </NextLink> */}
                                  <NextLink href={`/profile/order/${order._id}`} target="_blank" passHref className={classN.menuItem} style={{cursor:'pointer'}} > 
                                     <OpenInBrowserSharp className={classN.menuItemNormalBtn} style={{cursor:'pointer'}}/>
                                      {/* <span>Edit</span> */}
                                  </NextLink>
                            </TableCell >
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                    </ListItem>
                  </List>
                 
                )
                : (
                    <div className={classN.emptyPageImageContainer}>
                      {/* <img
                        className={classN.emptyPageImage}
                        src="/Img/em/empty.png"
                        alt="FIHABOX logo"
                      /> */}
      
                      <Typography className={classN.titleHeader}>
                        Look like you haven&apos;t any orders yet ...
                        <Link
                          className={classN.primaryColor}
                          onClick={() => setOpenShippingAddressModal(true)}
                          href='/'
                          tite = 'Navigate to Home page'
                        >
                          {` `}
                          go to shopping ?
                        </Link>
                      </Typography>
                    </div>
                )}
               
              
             
       

          </div>
        </Grid>
      </Grid>

    
    </Layout>
    )
}


// for rende OrderHistory only in front end
export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
