import bcrypt from 'bcryptjs'
//var ObjectId = mongoose.Types.ObjectId,

const Data = {
    users:[
        { 
            name:'Yacine Bakhti',
            email : 'yacine22@gmail.com', 
            password : bcrypt.hashSync('12345689'), 
            isAdmin : true,
            profileImage : '/Img/users/yacine.jpg',
            phone : '0789657400',
            
        },
        { 
            name:'khaled Amine',
            email : 'khaledamine15@gmail.com', 
            password : bcrypt.hashSync('12348856'), 
            isAdmin : false,
            profileImage : '/Img/users/01.jpg',
            phone : '0777553400',
        },
        { 
            name:'Salim Daouad',
            email : 'salimDoud2174@gmail.com', 
            password : bcrypt.hashSync('12345776'), 
            isAdmin : false,
            profileImage : '/Img/users/02.jpg',
            phone : '0777553400',
        },
      
        
    ],


    brands:[
        { 
            name:'Nokia',
            nativeName : 'Nokia Oyj', 
            tradeName : 'Nokia', 
            origin : 'Finland',
            Headquarters :'Tampere',
            ISIN : 'FI0009000681',
            Founded : '1865/05/12', //("2014-12-11T14:12:00Z") ("<YYYY-mm-dd>")
            description : 'Nokia Corporation (natively Nokia Oyj, referred to as Nokia; stylized as NOKIA) is a Finnish multinational telecommunications, information technology, and consumer electronics company, founded in 1865',
            Website : 'www.nokia.com',
            brandLogo : '/Img/brands/Nokia.png',
        },

        { 
            name:'Samsung',
            nativeName : '삼성 (三星)', 
            tradeName : '', 
            origin : 'South Korea',
            Headquarters :'Seoul',
            ISIN : 'US7960508882', 
            Founded : '1938/03/01',
            description : 'The Samsung Group(or simply Samsung) (Korean: 삼성) is a South Korean multinational manufacturing conglomerate headquartered in Samsung Town, Seoul, South Korea.',
            Website : 'samsung.com',
            brandLogo : '/Img/brands/Samsung.png',
        },
    ],


    categories:[

        // Grocery ==========================================================================>
        {
            name: 'Grocery',
            slug: "grocery",
            categoryPicture : '/Img/categories/Grocery.png',
            inMenu : true,
            isFeatured : false,
            featuredImage : '/Img/featuredcategory/grocery.PNG',
            // featuredTitle : 'Special offers on categories' ,
            // featuredText : 'Up to 70% Off - All Mobiles & Accessoire Test',
            featuredSort : 1,
         
        },

            {
                name: 'Super Market',
                slug: "super-market",
                initialParent : 'grocery',
                
            },
                {
                    name: 'Rice, pasta and noodles',
                    slug: "rice-pasta-and-noodles",
                    initialParent : 'super-market',
                    
                },
              
            {
                name: 'Cooking Ingredients',
                slug: "cooking-ingredients",
                initialParent : 'grocery',         
            },
                {
                    name: 'Oil',
                    slug: "oil",
                    initialParent : 'cooking-ingredients',         
                },
               

            {
                name: 'Sweetmeats',
                slug: "sweetmeats",
                initialParent : 'grocery',         
            },
                {
                    name: 'Chocolates & candies',
                    slug: "chocolates-candies",
                    initialParent : 'sweetmeats',         
                },
                {
                    name: 'Biscuits',
                    slug: "biscuits",
                    initialParent : 'sweetmeats',         
                },
            {
                name: 'DRINKS',
                slug: "drinks",
                initialParent : 'grocery',         
            },
            //     name: 'Hygiene And Toilet',
            //     slug: "hygiene-toilet",
            //     initialParent : 'grocery',         
            // },


        
        // Mobiles & Accessories ===========================================================>

        {   
            name: 'Mobiles & Accessories',
            slug: "mobiles-accessories",
            categoryPicture : '/Img/categories/Mobiles-Accessories.png',
            inMenu : true,
            isFeatured : true,
            featuredImage : '/Img/featuredcategory/mobiles-accessories.PNG',
            // featuredTitle : 'Special offers on categories' ,
            // featuredText : 'Up to 70% Off - All Mobiles & Accessoire Test',
            featuredSort : 2,

        },
            {
                name: 'Mobiles',
                slug: "mobiles",
                initialParent : 'mobiles-accessories', 
               
        
            },
                {
                    name: 'Smartphones',
                    slug: "smartphones",
                    initialParent : 'mobiles', 
                    inHomePage : true,        
                },
                {
                    name: 'Basics Phones',
                    slug: "basics-phones",
                    initialParent : 'mobiles',         
                },
            {
                name: 'Mobile Accessories',
                slug: "mobile-accessories",
                initialParent : 'mobiles-accessories',         
            },
                
              
            {
                name: 'Smartwatch',
                slug: "smartwatch",
                initialParent : 'mobiles-accessories',         
            },
               




        // More ==========================================================================>

        {
            //_id : 'Cat09',
            name: 'More',
            slug: "more",
            categoryPicture : '/Img/categories/More.png',
            inMenu : true,
        },
        
    ],






}


export default Data;