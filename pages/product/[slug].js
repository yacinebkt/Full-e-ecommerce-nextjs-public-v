import React, { useContext, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout/Layout';
import { Grid, Link, List, ListItem, Typography, Box, 
    TextField, Button, CircularProgress, Breadcrumbs} from '@material-ui/core';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Rating from '@material-ui/lab/Rating'
import useStyles from '../../utils/styles/styles';
import Product from '../../models/Product/Product';
import Brand from '../../models/Brand/Brand';
import db from '../../utils/database/db';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { getError, /*onError*/ } from '../../utils/error/error';
import { Store } from '../../utils/store/Store';
import Category from '../../models/Category/Category';
import { Pagination } from '@material-ui/lab'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'
import moment from "moment";
import NextLink from 'next/link'



export default function ProductScreen(props) {

    const {state, dispatch} = useContext(Store)
    const {userInfo} = state
    const [reviews, setReviews] = useState([])
    const [comment, setComment] = useState('')
    const [rating, setRating]= useState(0)
    const [loading, setLoding] = useState(false)

    const [firstItemList, setFirstItemList]= useState(0)
    const [endItemList, setEndItemList]= useState(3)
    const [page, setPage] = useState(1)

    const [productCarousel, setProductCarousel] = useState(0)
    const [defaultSize, setDefaultSize] = useState('M')
    const [defaultSizeN, setDefaultSizeN] = useState(30)
    


    const [breadArray, setBreadArray] = useState([])
    const [categoryName, setCategoryName] = useState({})

    const {product, categories, brand, productColors, productOrigin}  = props
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    const classN = useStyles();
    
    const router = useRouter();

    useEffect(() => {
        // console.log('product', product)

        
        
               try {
            fetchReviews()
            findNameCatgory(product.category)
        
        } catch (error) {
            console.error(error);
        }
        
     }, [])



   


 
     useEffect(() => {
      

        try {
            setBreadArray([]) 
            allParents(categoryName)
        } catch (error) {
            console.error(error);
        }
       
     }, [categoryName])

    if (!product) {
        return <div> 
            Product Not FOUND
        </div>
    }

 

   
    const fetchReviews = async () => {
        try{
            const {data} = await axios.get(`/api/products/${product._id}/reviews`)
            setReviews(data)
        }catch(err){
            enqueueSnackbar(getError(err), {variant : 'error'})
        }
    }

    
  const findNameCatgory = (category)=> {
    categories.map((cat)=> {
            if (cat.slug === category) {
                setCategoryName(cat)
                //
                return
            }
    })
  }
  

  const allParents = (cat) => {
    
    setBreadArray(breadArray => [...breadArray, cat]);


    if (cat.initialParent) {
        categories.map( (c) => {
                    if (c.slug === cat.initialParent) {
                        //setBreadArray(breadArray => [...breadArray, c.name]);
                        allParents(c)
                    }
        })

    }
 
    
}






    const addToCartFun = async () => {
        const {data} = await axios.get(`/api/products/${product._id}`)
        
    const quantityIncart = state.cart.cartItems.find(x=> x._id === product._id)
    const quantity =  quantityIncart? quantityIncart.quantity + 1 : 1 ;

    if (data.countInStock < quantity ) {
        // window.alert('Sorry. Product is Not avalibale');
        closeSnackbar();
        enqueueSnackbar('Sorry. This Product is currently out of stock', {variant : 'warning'})

        return;
    }
        dispatch({ type : 'ADD_CART_ITEM', 
                   payload : {...product, quantity}
                })

        router.push('/cart')
    }


    


  const createReviewfun = async (e) => {
    e.preventDefault();
    setLoding(true);
    try {
      await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
          userInfo
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoding(false);
      enqueueSnackbar('Review submitted successfully', { variant: 'success' });
      fetchReviews();
      setComment('')
      setRating(0)
    } catch (err) {
        setLoding(false);
        enqueueSnackbar(getError(err), { variant: 'error' });
        enqueueSnackbar('error from server', { variant: 'error' });
    }
  };


  
  const ShowListItem = (title, description) =>{
      return (
        <ListItem>
            <Grid container>
                <Grid item md={2} >
                    <Typography className={classN.productDetailsTitle}>
                    {title}</Typography>
                </Grid>

                <Grid item md={10} spacing={1}>
                    <Typography className={classN.productDetailsDes}>
                    {description}</Typography>
                </Grid>
            </Grid>
        </ListItem>
      )
  }

  const ShowListItemColors = (title) =>{
    return (
      <ListItem>
          <Grid container>
              <Grid item md={2} >
                  <Typography className={classN.productDetailsTitle}>
                  {title}</Typography>
              </Grid>

              <Grid item md={10} spacing={1} className={classN.productColorsImages}>
                  {productOrigin && productOrigin.productPictures && (
                       <NextLink  href={`/product/${productOrigin.slug}`} passHref>
                       <img src={productOrigin.productPictures[0]}  className={classN.productColorsImage}
                       alt={productOrigin.name} title={productOrigin.color_details ? productOrigin.color_details : productOrigin.color ? productOrigin.color : prd.name }
                       style={{borderBottom : `6px solid ${productOrigin.color}`}}
                       
                       />
                       </NextLink>
                  )}


                  {productColors && !product.original_Product_Slug &&(
                      <div >
                      <img src={product.productPictures[0]} className={classN.productColorsImageSelect} 
                         alt={product.name} title={product.color_details ? product.color_details : product.color ? product.color : prd.name }
                         style={{borderBottom : `6px solid ${product.color}`}}
                      />
                      </div>
                  )}


                   {/* <div>
                      <img src={product.productPictures[0]} alt='' className={classN.productColorsImageSelect}  />
                  </div> */}
                
                  {productColors.map((prd, index) => (

                
                       <NextLink  href={`/product/${prd.slug}`} passHref key={index} >
                        
                      <img src={prd.productPictures[0]} alt={prd.name} title={prd.color_details ? prd.color_details : prd.color ? prd.color : prd.name }
                       className={prd._id === product._id?classN.productColorsImageSelect : classN.productColorsImage}  
                       style={{borderBottom : `6px solid ${prd.color} ` }}
                       />
                    
                      </NextLink>
                 
                  ))}
              </Grid>
          </Grid>
      </ListItem>
    )
}

const ShowListItemSize = (title) => {
    return (
        <ListItem>
            <Grid container>
                <Grid item md={2} >
                    <Typography className={classN.productDetailsTitle}>
                    {title}</Typography>
                </Grid>

                <Grid item md={10} spacing={1} className={classN.productColorsImages}>
                   {product.sizes.map((size, index)=> (
                       <div className={classN.productSizeBox} key={index} 
                       onClick={() =>  {
                        JSON.parse(size).sizeS? setDefaultSize(JSON.parse(size).sizeS) : setDefaultSizeN(JSON.parse(size).sizeN) 
                        }
                        }
                       style={{color : defaultSize=== JSON.parse(size).sizeS? 'blue': defaultSizeN=== JSON.parse(size).sizeN? 'blue': 'black',

                       borderColor : defaultSize === JSON.parse(size).sizeS? 'blue':  defaultSizeN=== JSON.parse(size).sizeN? 'blue': 'black'
                        }}>
                           {JSON.parse(size).sizeS? JSON.parse(size).sizeS: JSON.parse(size).sizeN}
                       </div>
                   ))}

                </Grid>
            </Grid>
        </ListItem>
      )
}

const returnCountInSise =() => {
    let so = 0
    product.sizes.map((size, index)=> {
        if( JSON.parse(size).sizeS === defaultSize) {
            console.log('JSON.parse(size).count', JSON.parse(size).count )
            so = JSON.parse(size).count
            return so
        } 
    }
    )
    return so
}
  const ShowListItemTable =(title, description) =>{
    return (
      <ListItem>
          <Grid container>
              <Grid item md={3} >
                  <Typography className={classN.productDetailsTitle}
                   style={{opacity:'0.87', wordBreak: 'break-word'}}>
                  {title}</Typography>
              </Grid>

              <Grid item md={9} spacing={1}>
                  <Typography className={classN.productDetailsDes}>
                  {description}</Typography>
              </Grid>
          </Grid>
      </ListItem>
    )
}


const ShowListItemTableWithHeader =(obj, headerTitle) =>{
    return (
        <Box className={classN.listItemTableWithHeaderBox}>
         
          <ListItem>
               <Typography component='h1' className={classN.productDetailsName} style={{marginTop :'08px'}} > 
                   {headerTitle}
               </Typography>
          </ListItem>

          
           {showTableItems(obj, headerTitle)}
           

      </Box>

    )
}



    const onMouseMoveFun = (e) => {
        const con = document.getElementById('zoomImageConatiner')

        let clientX = e.clientX - con.offsetLeft
        let clientY = e.clientY - con.offsetTop

        let mWidth = con.offsetWidth  
        let mHeight = con.offsetHeight

        clientX = (clientX- 95) / mWidth * 100
        clientY = (clientY - 80 ) / mHeight * 100

        const ele = document.getElementById('zoomImage')
        ele.style.transform = `translate(-${clientX}%, -${clientY }%) scale(2)`
        ele.style.cursor = 'crosshair'

    }

    const onMouseLeaveFun = (e) => {

        const ele = document.getElementById('zoomImage')
        ele.style.transform = 'translate(-50%, -50%) scale(1)'

    }


    let interval
    let interval2

  const onMouseDownFun = (val) => {
    if (val === 0) {
        stop() 
        clearInterval(interval);
        

    }else {
        stop() 
        clearInterval(interval);
        ScrollDownFunction(val);
    }
}


const onMouseDownRowFun = (val) => {
    // e.preventDefault()
    if (val === 0) {
        stop() 
        clearInterval(interval2);
    }else {
        stop() 
        clearInterval(interval2);
        ScrollDownFunction02(val);
    }
}




  const ScrollDownFunction = (val) => {
    const ele = document.getElementById('scrollD')     
    interval = setInterval(function(){  ele.scrollTop += val }, 80);

  }

  
  const ScrollDownFunction02 = (val) => {
    
    const ele02 = document.getElementById('scrollDRow')
    interval2 = setInterval(function(){  ele02.scrollLeft += val }, 80);

  }

    
    function stop() {
        clearInterval(interval);
        clearInterval(interval2);
    }

  const leftSideImage = () => {
    return product.productPictures.map((im, index) => {
        return (
            <Box key={im}
            style={{border : productCarousel === index ? '1px solid #7accff' : '1px solid rgba(0, 0, 0, .096)' }}
          
            className={classN.leftSideImageContainer}
            onClick={e => setProductCarousel(index)}
            >
                <img src={im} alt="product image"
                    className={classN.leftSideImage}
                    
                    >
                </img>
         </Box>
        )
    })
       
  }

  const TableHeader = (title) => {
    return(
        <ListItem style={{borderBottom :'1px solid rgba(0, 0, 0, .096)' , padding:'15px'}}>
            <Typography className={classN.productDetailsTableHeader}>
            {title}</Typography>
        </ListItem>
    )
  }


  const showTableItems = (obj, headerTitle)=> {
    //console.log('object', obj)

    
     return Object.keys(obj).map(function(key) {
        //  console.log(key, obj[key])

        if (productKeys.includes(key)) {

        }else {
            if (obj[key] === 0) {

            } else {
                            //moment(product[key]).utc().format('MMMM Do YYYY, h:mm:ss a')
            if (key == 'updatedAt' || key == 'createdAt' || key == 'Founded' || key == 'founded') {
                return ShowListItemTable(key.replace(/(_|-)/g, ' ')
                .trim()
                .replace(/\w\S*/g, function(str) {
                    return str.charAt(0).toUpperCase() + str.substr(1)
                })   
                .replace(/([a-z])([A-Z])/g, '$1 $2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                .replace(/([1-9])/g, ' $1').trim()
                
                ,moment(product[key]).utc().format('MMMM Do YYYY, h:mm:ss a')   );
            
            }else {
                if (key === 'brandLogo' ) {
                    return ShowListItemTable(key.replace(/(_|-)/g, ' ')
                    .trim()
                    .replace(/\w\S*/g, function(str) {
                        return str.charAt(0).toUpperCase() + str.substr(1)
                    })   
                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                    .replace(/([1-9])/g, ' $1').trim()
                    
                    ,(<div> <img src={obj[key]} alt='brand Logo' style={{maxWidth : '45px', maxHeight:'45px', objectFit:'cover'}}></img></div>));
                } else {
                    if (key === 'Website') {
                        return ShowListItemTable(key.replace(/(_|-)/g, ' ')
                        .trim()
                        .replace(/\w\S*/g, function(str) {
                            return str.charAt(0).toUpperCase() + str.substr(1)
                        })   
                        .replace(/([a-z])([A-Z])/g, '$1 $2')
                        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                        .replace(/([1-9])/g, ' $1').trim()
                        
                        ,(<div title={obj[key]} style={{color:'blue', cursor : 'pointer'}} target="_blank"> {obj[key]} </div>));
                 
                    } else {
                        return ShowListItemTable(key.replace(/(_|-)/g, ' ')
                        .trim()
                        .replace(/\w\S*/g, function(str) {
                            return str.charAt(0).toUpperCase() + str.substr(1)
                        })   
                        .replace(/([a-z])([A-Z])/g, '$1 $2')
                        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                        .replace(/([1-9])/g, ' $1').trim()
                        
                        ,typeof obj[key] == "boolean" ? obj[key] ? 'YES' : 'NO' : 
                        key =='weight' && headerTitle=='dimensions' ? `${obj[key]} g`: 
                        headerTitle=='dimensions' && (key =='width'|| key =='height' || key =='depth' ) ? `${obj[key]} mm`: 
                        headerTitle=='Display Features' && (key =='screenSize' ) ? `${obj[key]} cm`: 
                        headerTitle=='Display Features' && (key =='resolutionX'|| key =='resolutionY' ) ? `${obj[key]} pixel`: 
                        headerTitle=='Display Features' && (key =='refreshRate' ) ? `${obj[key]} Hz`: 
                        headerTitle=='Processor Features' && (key =='primaryClockSpeed' || key == 'secondaryClockSpeed' ) ? `${obj[key]} GHz`: 
                        headerTitle=='storage' && (key =='ram' || key == 'ssdCapacity' || key == 'hdddCapacity' ) ? `${obj[key]} GB`: 
                        headerTitle=='storage' && (key =='ram' || key == 'ssdCapacity' || key == 'hdddCapacity' ) ? `${obj[key]} GB`: 
                        
                        
                        obj[key] 
                        );
         
                    }
                    
                }
            }
            }

          
        }

       
      })

  }

  let productKeys = ['_id', 'name', 'slug', 'price' , 'image', 'countInStock', 'status', 
  'sizes', 'rating', 'numReviews', 'description', 'featuredImage' ,'isFeatured', '__v', 'V',
  'inMenu', 'isFeatured', 'productPictures', 'purchasingPrice', 'createdAt'
]

  const ShowGeneralListItemTable = () => {
    //   console.log(' ShowGeneralListItemTable product', product)
      return Object.keys(product).map(function(key) {
          if (typeof product[key] !== 'object') {
            if (productKeys.includes(key)) {

            }else {
                if (key == 'updatedAt' || key == 'createdAt') {
                    return ShowListItemTable(key.replace(/(_|-)/g, ' ')
                    .trim()
                    .replace(/\w\S*/g, function(str) {
                        return str.charAt(0).toUpperCase() + str.substr(1)
                    })   
                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                    .replace(/([1-9])/g, ' $1').trim()
                    
                    ,moment(product[key]).utc().format('MMMM Do YYYY, h:mm:ss a')   );
                
                }
                 else {
                    return ShowListItemTable(key.replace(/(_|-)/g, ' ')
                    .trim()
                    .replace(/\w\S*/g, function(str) {
                        return str.charAt(0).toUpperCase() + str.substr(1)
                    })   
                    .replace(/([a-z])([A-Z])/g, '$1 $2')
                    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                    .replace(/([1-9])/g, ' $1').trim()
                    
                    ,typeof product[key] == "boolean" ? product[key] ? 'YES' : 'NO' : product[key]  );
                
                }
               
             //console.log(' ShowGeneralListItemTable key', key)

            }

          }
      })
  }



  /* */

  const pageChanger = (event, value) => {
        setPage(value); 
        setFirstItemList((value * 3) -3)
        setEndItemList (value * 3)

   
    // console.log('value', value)
    // console.log('firstItemList', (value * 3) -3)
    // console.log('endItemList', (value * 3))
  };
  /* */
    return (
       <Layout titleHeader={product.name} descriptionHeader={product.description} returnSearch={false}>
             <div 
               style={{display: 'flex',
                justifyContent : 'center',
                alignItems :'center',
                marginTop: '1rem'
              }}
            >
           <div className={classN.containerPers} style={{border :'1px solid rgba(0, 0, 0, .096)'}}>
          

           <Grid container spacing={0}>
               <Grid container lg={5} md={12}  className={classN.gridColoumnFixedProduct}
                style={{border: '1px solid rgba(0, 0, 0, .016)',
                padding : '7px 2px'}}>

                    <Grid  item md={2} spacing={1} className={classN.slugProductLeftSideImages}>
                        {
                        product.productPictures.length >0 ?
                                    <Button fullWidth
                                    onMouseDown  ={e=> onMouseDownFun(-20)}
                                    onMouseUp  ={e=> onMouseDownFun(0)}
                                    className={classN.arrowBtn}

                                >
                                <KeyboardArrowUpIcon />
                            </Button> : 
                            null
                        }
                      
                       <div id='scrollD' className={classN.gridColoumnFixedZiro} style={{ height: 335,  width:'100%'}}>
                            {leftSideImage()}    
                       </div>

                       {
                        product.productPictures.length >0 ?
                            <Button fullWidth
                                onMouseDown  ={e=> onMouseDownFun(20)}
                                onMouseUp  ={e=> onMouseDownFun(0)}
                                className={classN.arrowBtn}

                            >
                                <KeyboardArrowDownIcon />
                            </Button> : 
                            null
                        }
                        
                    </Grid>
                    

                    <Grid item md={10} xs={12} spacing={1} style={{overflow:'hidden'}}>
                          
                            <Box  id='zoomImageConatiner'
                                className={classN.slugProductImageBox}
                            >
                                <img src={product.productPictures[productCarousel]} alt={product.name}
                                className={classN.slugProductImage} 
                                onMouseMove  ={e=> onMouseMoveFun(e)}
                                onMouseLeave  ={e=> onMouseLeaveFun(e)}
                                onTouchMove ={e=> onMouseMoveFun(e)}
                               
                                
                                id='zoomImage'
                                >
                                </img>
                            </Box>

                          
                                
                                    <Grid container 
                                        className={classN.slugProductLeftSideImagesMobile}
                                    >
                                        {
                                         product.productPictures.length >1?
                                        <Grid item xs={2} >
                                          
                                                        <Button style={{transform :'rotate(-90deg)'}}
                                                        className={classN.arrowBtn}
                                                        onTouchStart ={e=> onMouseDownRowFun(-20)}
                                                        onTouchEnd ={e=> onMouseDownRowFun(0)}
                                                        onMouseDown = {e=> onMouseDownRowFun(-20)}
                                                        onMouseUp = {e=> onMouseDownRowFun(0)}
                                                    >
                                                    <KeyboardArrowUpIcon />
                                                </Button>
                                    
                                        </Grid>
                                        : 
                                        null
                                    }

                                        <Grid item xs={product.productPictures.length >1 ? 8 :12} >
                                            <div id='scrollDRow' className={classN.slugProductLeftSideImagesMobileImages}>
                                                    {leftSideImage()}    
                                            </div> 
                                        </Grid>
                                        {
                                            product.productPictures.length >1 ?

                                        <Grid item xs={2} style={{display: 'flex', justifyContent:'flex-end'}}>
                                            
                                                <Button  style={{transform :'rotate(-90deg)'}}
                                                    className={classN.arrowBtn}
                                                    onTouchStart ={e=> onMouseDownRowFun(20)}
                                                    onTouchEnd ={e=> onMouseDownRowFun(0)}
                                                    onMouseDown = {e=> onMouseDownRowFun(20)}
                                                    onMouseUp = {e=> onMouseDownRowFun(0)}
                                                >
                                                    <KeyboardArrowDownIcon />
                                                </Button> 
                                            
                                        
                                        </Grid>
                                        : 
                                        null
                                        }
                                   
                                    </Grid>
                           


                            {/* <Box
                                // sx={{ height: 400, }} 
                                style={{display:'flex', justifyContent:'center', alignItems:'center',
                                border: '1px solid rgba(0, 0, 0, .096)',
                                margin :'0 5px', padding : '7px 18px', minHeight : 400,
                                }}
                            >
                             
                                <InnerImageZoom 
                                src={product.productPictures[productCarousel]} 
                                zoomSrc={product.productPictures[productCarousel]} 
                                
                                zoomScale={1.7}
                                // fullscreenOnMobile={true}
                                sizes={{width:'10%'}}
                                moveType="pan"
                                />

                            </Box> */}
                            
                            {/* objectFit: 'contain !important',
                            maxWidth: '100%',
                            height: '100%', */}
                            
{/* 
                                <div 
                                style={{padding : '7px 8px', width:'100%', 
                                 display:'flex', justifyContent:'center', alignItems:'center',
                                border: '1px solid rgba(0, 0, 0, .096)', margin :'0 5px'}}
                                >

                                <ReactImageMagnify 
                                //   style = {{ border: '1px solid red', width:'100%', padding:0, margin: 0}}
                                //   className={classN.productImage}
                                   imageClassName={classN.productImage}
                                  
                                 {...{
                                smallImage: {
                                    alt: 'Wristwatch by Ted Baker London',
                                    isFluidWidth: true,
                                    width: '100%',

                                   
                                    src: product.image,
                                   
                                },
                                largeImage: {
                                    src: product.image,
                                    // className: classN.productImageZomm,
                                      width: 1200,
                                      height: 1800,
                                },
                                enlargedImageContainerDimensions: {
                                    width: '100%',
                                    height: '100%'
                                },
                                enlargedImagePortalId: "imageZoom",
                                

                            }} />

                                </div> */}
                                
                            <ListItem>
                                <Button fullWidth variant='contained' color='primary'
                                    onClick={addToCartFun}
                                    className={classN.productBtn}
                                >
                                    Add To Cart
                                </Button>

                                <Button fullWidth variant='contained' color='primary'
                                    onClick={addToCartFun}
                                    className={classN.productBtn}
                                    
                                >
                                    Buy Now
                                </Button>
                            </ListItem>
                    </Grid>
               </Grid>

                <Grid item lg={7} md={12}   style={{position:'relative' }} >

                 <Grid container spacing={0}>  
                    <Grid item xl={12} md={12} xs={12} >

                        <List>
                            
                            
                            <ListItem>
                            
                                <Breadcrumbs aria-label="breadcrumb">
                                    {breadArray.reverse().map(e=>(
                                    <Link
                                    key={e}
                                    underline="hover"
                                    color="inherit"
                                    href={`/search?category=${e.slug}`}
                                    
                                        >
                                            {e.name}
                                        </Link>
                                ))}    
                                </Breadcrumbs>
                            </ListItem>
                            <ListItem>
                                <Typography component='h1' className={classN.productDetailsName} >
                                
                                    {product.name}
                                </Typography>
                            </ListItem>

                        
                            
                            <ListItem>   
                                <Rating value={product.rating} readOnly ></Rating>
                                <Link href='#reviews'>
                                    <Typography>
                                        ({product.numReviews} Reviews)
                                    </Typography>    
                                </Link>
                            </ListItem>
                        
                            <ListItem>
                                <Typography component='h2' className={classN.productDetailsPrice} >
                                 
                                    {`${product.price} DA`}
                                </Typography>
                            </ListItem>

                            {/* product.sizes.map((size, index)=> (
                       <div className={classN.productSizeBox} key={index} 
                       onClick={() =>  setDefaultSize(JSON.parse(size).sizeS)}
                       style={{color : defaultSize === JSON.parse(size).sizeS? 'blue': 'black',
                       borderColor : defaultSize === JSON.parse(size).sizeS? 'blue': 'black' }}>
                           {JSON.parse(size).sizeS}
                       </div>
                   )) */}

                            <ListItem>
                                <Typography component='h2' className={classN.productDetailsOff} >
                                Available offers
                                </Typography>
                            </ListItem>

                            
                           
                    
                            {ShowListItem('Status', 
                             product.countInStock < 1 ?
                                (product.sizes.length > 0  && returnCountInSise() > 0) ? 'Available product' : 'This item is currently out of stock'
                                :'Available product'
                             )}

                        
                        
                        
                            {ShowListItem('Category', categoryName.name )}
                            {ShowListItem('Brand', product.brand )}
                            {product.description && ShowListItem('description', product.description )}

                            {/* productColors */}
                            {productColors.length >0 && ShowListItemColors('Color' )}
                            
                            {product.sizes.length >0 && ShowListItemSize('Size' )}

                            
                        <Box className={classN.listItemTableWithHeaderBox}>
                            {TableHeader('Specifications')}
                            <ListItem>
                                    <Typography component='h1' className={classN.productDetailsName} style={{marginTop :'10px'}} > 
                                        General
                                    </Typography>
                            </ListItem>

                            {ShowGeneralListItemTable()}

                                {/* {ShowListItemTable('In The Box', product.in_the_box )}
                                {ShowListItemTable('Model Number', product.model_number )}
                                {ShowListItemTable('Model Name', product.model_name )}
                                {ShowListItemTable('Color', product.color_details )}
                                {ShowListItemTable('Launch Year', product.launch_year )} */}
                                
                        </Box>

                        


                        {/* <Box style={{border :'1px solid rgba(0, 0, 0, .096)', marginLeft:'5px',
                            padding:'10px'
                            }}>
                                {
                                    showTableItems(product.connectivity_features)
                                }
                        </Box> */}


                        {product.storage && ShowListItemTableWithHeader(product.storage , 'storage')}
                        {product.audio_features && ShowListItemTableWithHeader(product.audio_features, 'Audio Features')}
                        {product.video_features && ShowListItemTableWithHeader(product.video_features, 'Video Features')}
                        {product.display_features && ShowListItemTableWithHeader(product.display_features , 'Display Features')}
                        {product.operating_system && ShowListItemTableWithHeader(product.operating_system, 'Operating_system')}
                        {product.processor_features && ShowListItemTableWithHeader(product.processor_features, 'Processor Features')}
                        {product.camera && ShowListItemTableWithHeader(product.camera, 'Camera ')}
                        {product.connectivity_features && ShowListItemTableWithHeader(product.connectivity_features, 'Connectivity Features')}
                        {product.smart_tv_features && ShowListItemTableWithHeader(product.smart_tv_features, 'Smart Tv Features')}
                        {product.power_features && ShowListItemTableWithHeader(product.power_features, 'Power Features')}
                        {product.dimensions && ShowListItemTableWithHeader(product.dimensions, 'dimensions')}
                        {product.industrial_features && ShowListItemTableWithHeader(product.industrial_features, 'Industrial Features')} 
                        {brand && ShowListItemTableWithHeader(brand, 'Brand Details')} 
                            
                        </List>


                        <List>
                    <div className={classN.reviewsSection}>
                <ListItem>
                    <Typography name='reviews' id='reviews' variant='h2'>
                            Customer Reviews
                    </Typography>

                    </ListItem>

                    {reviews.length ===0 && <ListItem>No Reviews yet  </ListItem>}
                    {!(reviews.length ===0 ) && (
                        
                        reviews.slice(firstItemList, endItemList).map((review)=> (
                                <ListItem key={review._id}  className={classN.reviewContainer}>
                                    <Grid container>
                                        <Grid item md={12} className={classN.reviewItem}>
                                            <Typography><strong> {review.name} </strong> </Typography>
    
                                            <Typography> {review.createdAt ? review.createdAt.substring(0, 10) : null} </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Rating value={review.rating} readOnly ></Rating>
                                            <Typography>{review.comment} </Typography>
                                        </Grid>
                                    </Grid>
                                </ListItem>
                            ))

                    )
                        
                    }
                        {reviews.length !==0 && 
                        <Pagination 
                        className={classN.mt1}
                        // defaultPage= {parseInt(query.page || '1')}
                        count={Math.trunc(reviews.length / 3)}
                        page={page} 
                        onChange = {pageChanger}
                        />

                        
                        }

                                    

                <ListItem>
                    {userInfo? (
                        <form onSubmit={createReviewfun} className={classN.reviewForm}>
                            <List>
                                <ListItem>
                                    <Typography variant='h2'>
                                        Leave your review
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <TextField
                                        multiline /*minRows={6} maxRows={6}*/ variant='outlined'
                                        name='review' label='Enter your review' value={comment}
                                        onChange={(e)=> setComment(e.target.value)}
                                        fullWidth
                                    >

                                    </TextField>

                                </ListItem> 
                                
                                <ListItem>
                                    <Rating 
                                        name='simple-controlled' 
                                        value={rating}
                                        onChange={(e)=> setRating(e.target.value)}
                                        // readOnly 
                                    ></Rating>

                                </ListItem>

                                <ListItem>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        //   labell='Comment'
                                        //   className={classN.submit}
                                    
                                    >
                                        Submit

                                    </Button>
                                    {
                                        loading && (<CircularProgress/>)
                                    }
                                </ListItem>
                            </List>
                        </form>
                    ):
                    (
                        <Typography variant='h2'>
                            Please
                            <Link href={`/login?redirect=/product/${product.slug}`}>
                                Log In
                            </Link>
                            To write a review

                        </Typography>
                    )
                    
                    }
                </ListItem>
                </div>
                        </List>

                    </Grid>

                   
                    
                  </Grid> 
                </Grid>

             

                
            


           </Grid>
           
           

           </div>
           </div>

       </Layout>
    )
}





export async function getServerSideProps(context) {

    const {params} = context
    const {slug} = params
    await db.connect();
    let  productColorsSecond = []
    let  productOrigin 
    const product = await Product.findOne({slug}, '-reviews').lean().then( async data => {
         console.log('data', data)
         productColorsSecond = data.original_Product_Slug?
          await Product.find({original_Product_Slug : await data.original_Product_Slug}, '-reviews').lean()
          :[]
        
         productOrigin = await Product.findOne({ slug: await data.original_Product_Slug}, '-reviews').lean();
        return data 

    })

    const productColors = await Product.find({original_Product_Slug : slug}, '-reviews').lean();


    

    console.log('productColorsSecond', productColorsSecond)
    const brand = await Brand.findOne({name : product.brand}).lean();
    // console.log('brand', brand )


    const categories = await Category.find({}).lean();
    await db.disconnect();
  
    return {
      props: {
        //products : products.map(db.convertDocToObject) 
        product : db.convertDocToObject(product),
        categories : categories.map(db.convertDocToObject),
        productColors : productColors.length> 0 ? productColors.map(db.convertDocToObject) : productColorsSecond.map(db.convertDocToObject),
        brand : brand? db.convertDocToObject(brand) : null ,
        productOrigin : productOrigin ? db.convertDocToObject(productOrigin) : {} ,

      }
    }
  }
