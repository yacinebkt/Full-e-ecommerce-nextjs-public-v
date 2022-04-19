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
  IconButton,
  Button,
  Card,
  List,
  ListItem,
  CircularProgress,
  ListItemText,
  CardContent,
  CardActions,
  Backdrop,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Box,
} from "@material-ui/core";

import { Cancel, KeyboardArrowDown } from "@material-ui/icons";

import useStyles from "../../utils/styles/styles";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import NextLink from "next/link";
import Leftbar from "../../components/Layout/Leftbar";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, summary: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

function AdminDashboard() {
  const { state } = useContext(Store);
  const router = useRouter();

  const { userInfo } = state;

  const classN = useStyles();

  const [openDachboardMobile, setOpenDachboardMobile] = useState(false);
  const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    loading: true,
    summary: { salesData: [] },
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/summary`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        console.log("data", data);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
    console.log("summary.salesData.length", summary.salesData);
  }, []);

  console.log("summary.salesData.length", summary.salesData);

  return (
    <Layout title="Order History" withoutFooter>
      <Grid container className={classN.adminGrid}>
        <Grid className={classN.adminLeftSideGrid}>
          <Leftbar filedSelect="dashboard" adminDashboard />
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
                  <CircularProgress color="primary" />
                </Backdrop>
              ) : error ? (
                <ListItem>
                  <Typography className={classN.error}>{error}</Typography>
                </ListItem>
              ) : (
                <>
                  <ListItem>
                    <Grid container spacing={2}>
                      <Grid item lg={3} md={6} sm={12} xs={12}>
                        <div className={classN.cardDashFirst}>
                          <CardContent>
                            <Typography className={classN.dashboardCardTitle}>
                               {summary.ordersPrice.toFixed(2) } DA
                            </Typography>
                            <Typography className={classN.dashboardCardDecs}>
                              Sales
                            </Typography>
                          </CardContent>

                          <CardActions>
                            <NextLink href="#sales" passHref>
                              <Button
                                size="small"
                                className={classN.dashboardCardBtn}
                              >
                                Explore
                              </Button>
                            </NextLink>
                          </CardActions>
                        </div>
                      </Grid>

                      <Grid item lg={3} md={6} sm={12} xs={12}>
                        <div className={classN.cardDash}>
                          <CardContent>
                            <Typography className={classN.dashboardCardTitle}>
                              {summary.ordersCount}
                            </Typography>
                            <Typography className={classN.dashboardCardDecs}>
                              Orders
                            </Typography>
                          </CardContent>

                          <CardActions>
                            <NextLink href="/admin/orders" passHref>
                              <Button
                                size="small"
                                className={classN.dashboardCardBtn}
                              >
                                View Orders
                              </Button>
                            </NextLink>
                          </CardActions>
                        </div>
                      </Grid>

                      <Grid item lg={3} md={6} sm={12} xs={12}>
                        <div className={classN.cardDash}>
                          <CardContent>
                            <Typography className={classN.dashboardCardTitle}>
                              {summary.productsCount}
                            </Typography>
                            <Typography className={classN.dashboardCardDecs}>
                              Products
                            </Typography>
                          </CardContent>

                          <CardActions>
                            <NextLink href="/admin/products" passHref>
                              <Button
                                size="small"
                                className={classN.dashboardCardBtn}
                              >
                                View Products
                              </Button>
                            </NextLink>
                          </CardActions>
                        </div>
                      </Grid>

                      <Grid item lg={3} md={6} sm={12} xs={12}>
                        <div className={classN.cardDash}>
                          <CardContent>
                            <Typography className={classN.dashboardCardTitle}>
                              {`${summary.usersCount}`}
                            </Typography>
                            <Typography className={classN.dashboardCardDecs}>
                              {" "}
                              {`Users (${(
                                summary.usersCount / summary.total_users_active
                              ).toFixed(1)}% active)`}
                            </Typography>
                          </CardContent>

                          <CardActions>
                            <NextLink href="/admin/users" passHref>
                              <Button
                                size="small"
                                className={classN.dashboardCardBtn}
                              >
                                View Users
                              </Button>
                            </NextLink>
                          </CardActions>
                        </div>
                      </Grid>

                      <Grid item lg={3} md={6} sm={12} xs={12}>
                        <div className={classN.cardDash}>
                          <CardContent>
                            <Typography className={classN.dashboardCardTitle}>
                              {summary.brandsCount}
                            </Typography>
                            <Typography className={classN.dashboardCardDecs}>
                              Brands
                            </Typography>
                          </CardContent>

                          <CardActions>
                            <NextLink href="/admin/brands" passHref>
                              <Button
                                size="small"
                                className={classN.dashboardCardBtn}
                              >
                                View Brands
                              </Button>
                            </NextLink>
                          </CardActions>
                        </div>
                      </Grid>

                      <Grid item lg={3} md={6} sm={12} xs={12}>
                        <div className={classN.cardDash}>
                          <CardContent>
                            <Typography className={classN.dashboardCardTitle}>
                              {summary.categoriesCount}
                            </Typography>
                            <Typography className={classN.dashboardCardDecs}>
                              Categories
                            </Typography>
                          </CardContent>

                          <CardActions>
                            <NextLink href="/admin/categories" passHref>
                              <Button
                                size="small"
                                className={classN.dashboardCardBtn}
                              >
                                View Categories
                              </Button>
                            </NextLink>
                          </CardActions>
                        </div>
                      </Grid>

                      {/* <Grid item lg={3} md={6} sm={6} xs={12}>
                        <div className={classN.cardDash}>
                          <CardContent>
                            <Typography className={classN.dashboardCardTitle}>
                              {summary.messagesCount}
                            </Typography>
                            <Typography className={classN.dashboardCardDecs}>
                              Messages
                            </Typography>
                          </CardContent>

                          <CardActions>
                            <NextLink href="/admin/messages" passHref>
                              <Button
                                size="small"
                                className={classN.dashboardCardBtn}
                              >
                                View Messages
                              </Button>
                            </NextLink>
                          </CardActions>
                        </div>
                      </Grid> */}
                    </Grid>
                  </ListItem>

                  <ListItem className={classN.dashboardSection}>
                    <Box>
                      <Typography component="h1" variant="h1">
                        Top selling products
                      </Typography>
                    </Box>

                    {summary.top_selling_products.length > 0
                      ? summary.top_selling_products.map((product) => (
                          <Box className={classN.dashboardflexTab} key={product.item.name}>
                            <Box className={classN.dashboardflexTabImg}>
                              <img
                                src={product.item.image}
                                className={classN.dashboardflexTabImgImg}
                                alt={product.item.name}
                                title={product.item.name}
                              />
                            </Box>

                            <Box className={classN.dashboardflexTabDes}>
                              <Box className={classN.dashboardflexTabDesName}>
                                {product.item.name.slice(0, 135)}
                              </Box>
                              <Box className={classN.dashboardflexTabDesName}>
                                {product.item.price} DA
                              </Box>
                            </Box>

                            <Box className={classN.dashboardflexTabDesItems} title='product selling'>
                              <Typography>{product.qty}</Typography>
                            </Box>
                          </Box>
                        ))
                      : null}
                  </ListItem>

                  <ListItem id="sales">
                    <Typography component="h1" variant="h1">
                      Sales Chart
                    </Typography>
                  </ListItem>
                  <ListItem>
                    {summary.salesData.length > 0 ? (
                      <Bar
                        data={{
                          labels: summary.salesData.map((x) => x._id),
                          datasets: [
                            {
                              label: "Sales (DA)",
                              backgroundColor: "rgba(162, 222, 208, 1)",
                              data: summary.salesData
                                .sort(
                                  (a, b) => new Date(a._id) - new Date(b._id)
                                )
                                .map((x) => x.totalSales),
                            },
                          ],
                        }}
                        options={{
                          legend: { display: true, position: "right" },
                        }}
                      ></Bar>
                    ) : (
                      <div></div>
                    )}
                  </ListItem>
                </>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </Layout>
  );
}

// for rende OrderHistory only in front end
export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });
