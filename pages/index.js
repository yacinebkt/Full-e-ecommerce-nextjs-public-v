import { Grid, Typography, Link, Container } from "@material-ui/core";

//import Carousel from 'react-material-ui-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import Layout from "../components/Layout/Layout";
import Preloader from "../components/Layout/Preloader";
// import Data from '../utils/data/data'
// import NextLink from 'next/link'
import db from "../utils/database/db";
import Product from "../models/Product/Product";
import Category from "../models/Category/Category";

import { useRouter } from "next/router";
import { Store } from "../utils/store/Store";

//import styles from '../styles/Home.module.css'
import axios from "axios";
import { useContext, useState, useEffect } from "react";
// import Rating from '@material-ui/lab/Rating'
// import ProductSelf from '../components/Layout/ProductSelf'
import ProductBox from "../components/Layout/ProductBox";
import useStyles from "../utils/styles/styles";
import Banner from "../components/Layout/Banner";
// import Banner02 from '../components/Layout/Banner02'
// import Banner03 from '../components/Layout/Banner03'
import Newsletter from "../components/Layout/Newsletter";

export default function Home(props) {
  const {
    products,
    HomePageCategories,
    featuredProducts,
    categoriesDocs,
    featuredCategories,
  } = props;

  // console.log('props', props);

  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  const classN = useStyles();
  const [loading, setLoading] = useState(true)

  const [slideImage, setSlideImage] = useState(0)

  const addToCartFun = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
   
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


  
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('loading...')
      setLoading(false)
    }, 500);
    return () => clearTimeout(timer);
  }, []);



  const onClickInCarousel = (slug) => {
    if (slug) {
      router.push(`/product/${slug}`);
      // router.push(`/search?category=${slug}`);
      
    }
  };


  const nameCategorie = (slug) => {
     let item = categoriesDocs.filter(category => category.slug === slug);
 
    return item.length> 0 ? item[0].name : slug
  }


  
  const featuredImageCategorie = (slug) => {
    let item = categoriesDocs.filter(category => category.slug === slug);

   return item.length> 0 ? item[0].featuredImage : false
 }

  const returnProducts = (category) => {
    let i = 0;
    return products.map((product) => {
      if (product.category === category && i < 8) {
        i = i + 1;
        return (
          <Grid item xl={3} md={3} sm={6} xs={12}  key={product.name} >
            {/* <ProductSelf addToCartFun={addToCartFun}  product={product} /> */}
            <ProductBox addToCartFun={addToCartFun} product={product} />
          </Grid>
        );
      }
    });
  };


  const productsContainer = () => {
    return HomePageCategories.map((category, index) => {
      return (
        <div key={category} className={classN.productsContainer} style={{margin: '20px 0'}}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            style={{ margin: "2.15rem 0", width : '100%'}}

          >
            <Typography component="h2" className={classN.productsHeader}>
              {nameCategorie(category)}
            </Typography>

            {/* <Typography component="h5" className={classN.productsSubHeader}>
              Summer Collection New {category}
            </Typography> */}
          </Grid>

          <Container >
            <Grid container spacing={2}>
              {returnProducts(category)}
            </Grid>
          </Container>


          {
            featuredImageCategorie(category) && (
              <Banner
              featuredCategories={featuredImageCategorie}
              // data={true}
            />
            )
          }

          {/* {
            
            featuredCategories.length > 0 && (
              <Banner
              featuredCategories={featuredCategories[index]}
              data={true}
            />
            )
          } */}

          {/* {featuredCategories[index] && (
            <Banner
              featuredCategories={featuredCategories[index]}
              data={true}
            />
          )} */}
        </div>
      );
    });
  };

  return (
    <>
      {loading ? 
      
      ( <div className={classN.loadingContainerHome}>
         <Preloader />
         {/* <CircularProgress /> */}
       </div>)
       :
      
       (<Layout categoriesDocs={categoriesDocs} returnSearch={true}>
       
       <Carousel
         className={classN.carouselMui}
         showArrows={false}
         showIndicators={false}

          autoPlay
          infiniteLoop
         showThumbs={false}
         showStatus={false}  
         

       >
         {featuredProducts.map((product) => (
           <div
             key={product._id}
             href={`/product/${product.slug}`}
            //  passhref
             onClick={(e) => onClickInCarousel(product.slug)}
             className={classN.featuredImageCarousel}

           >
             
               <img
                 src={product.featuredImage}
                 alt={product.name}
                 className={classN.featuredImage}
               ></img>

                  <img
                    src="/Img/logo/fihaLight.png"
                    alt="FIHABOX logo"
                    className={classN.featuredImageLogo}
                    
                  />
               
            
           </div>
         ))}
       </Carousel>

       
 
       {productsContainer()}
 
       <Newsletter />
       </Layout>)
 
     }
    </>
  
    
    
  );
}

export async function getServerSideProps() {
  await db.connect();
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(90); 
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()
    .limit(3);

  const pro = await Product.find({ slug: "second-shirt" }, "-reviews").lean();
  
  
  const categoriesMainDocs = await Category.find({}).lean();
  const featuredCategories = await Category.find({ isFeatured: true }).limit(3).lean();
  // const featuredProductsDocs = await Category.find({ isFeatured: true }).limit(3).lean();
  const HomePageCategories = await Category.find({ inHomePage: true })
    .distinct("slug")
    .lean();

    let products = []

    // HomePageCategories.map( async cat => {

    //   let prods = await Product.find(
    //     { category: cat},
    //     "-reviews"
    //     )
    //     .sort({
    //       rating: -1,
    //     })
    //     .limit(8)
    //     .lean();

    //     prods.map(item=> {
    //       products.push(item)
    //     })

    // })


    async function getProducts() {

      const unresolved = HomePageCategories.map(async(cat) => {
      
        let prods = await Product.find(
          { category: cat},
          "-reviews"
          )
          .sort({
            rating: -1,
          })
          .limit(8)
          .lean();
  
          prods.map(item=> {
            products.push(item)
          })
      })
    
      const resolved = await Promise.all(unresolved)
    
      return resolved
      // console.log(resolved);
    }
    
    // getProducts()
    
    let a = await getProducts()

  // const ProductHomePage = await Product.find(
  //   { category: { $in: HomePageCategories } },
  //   "-reviews"
  // )
  //   .sort({
  //     rating: -1,
  //   })
  //   .lean();


    const testProducts = await Product.find(
      { category: { $in: ['smartphones'] } },
      "-reviews"
    )
      .sort({
        rating: -1,
      }).limit(8)
      .lean();
  
  
    

  await db.disconnect();

  return {
    props: {
      HomePageCategories: HomePageCategories,
      //products : topRatedProductsDocs.map(db.convertDocToObject),
      // products: ProductHomePage.map(db.convertDocToObject),
      products: products.map(db.convertDocToObject),
      //products : topRatedProductsDocsNEW,
      featuredProducts: featuredProductsDocs.map(db.convertDocToObject),
      
      categoriesDocs: categoriesMainDocs.map(db.convertDocToObject),
      featuredCategories: featuredCategories.map(db.convertDocToObject),
      // testProducts :testProducts.map(db.convertDocToObject),
    },
  };
}
