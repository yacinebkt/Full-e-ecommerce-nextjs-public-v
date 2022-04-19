import mongoose from 'mongoose'




// const reviewSchema = new mongoose.Schema({
//     user : {
//         type: mongoose.Schema.Types.ObjectId, ref : 'User',
//         required : true
//     },
//     name : {
//         type : String,
//         required : true,
//     },
//     rating : {
//         type : Number,
//         default : 0,
//     },
//     comment : {
//         type : String,
//         required : true,
//     }
// }
// ,
//  {
//      timestamps : true
//  }
// );

const reviewSchema = new mongoose.Schema(
    {
    //   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      name: { type: String, required: true },
      rating: { type: Number, default: 0 },
      comment: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );


const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    slug : {
        type: String,
        required : true,
        unique : true
    },
    category : {
        type: String,
        required : true
    },
    image : {
        type: String,
        // required : true
    },
    productPictures: [
        { img:{        
             type:String,
         }}
    ],
    price : {
        type: Number,
        required : true,
        default : 0,
    },
    purchasingPrice : {
        type: Number,
        required : true,
        default : 0,
    },
    brand : {
        type: String,
        default:'undefined',
        //required : true
    },
    rating : {
        type: Number,
        required : true,
        default : 0
    },
    numReviews : {
        type: Number,
        required : true,
        default : 0
    },
    countInStock : {
        type: Number,
        required : true,
        default : 0
    },
    description : {
        type: String,
        // required : true
    },
    reviews : [reviewSchema],
    featuredImage : {
        type : String,
    },
    isFeatured : {
        type : Boolean,
        required: true,
        default : false,
    },
//
    color : {
        type : String,   //default color
    },

    color_details : {
        type : String,   // like Denim Blue
    },


  


    
    sizes :[
        {
            sizeS: {type : String},
            sizeN: {type : Number},
            count : {type : Number},

            // colors : [
            //     {
            //         color : {type : String},
            //         count : {type : Number},
            //         price : {type : Number},
            //         image : {type : String},
            //     }
            // ]
        }
    ],

    capacity : { type : Number}, //30L
    original_Product_Slug : {type : String},

    
    model_name : {type : String},
    model_number : {type : String},
    in_the_box : {type : String}, // '1 TV Unit, Warranty Card, Remote Control,1 AC Power cord & 1 AC adapter',
  
    designed_for: { type : String }, // "D5-BLK-HOT-11S",
   
    

    launch_year : { type : Number}, // 2020





    storage : {
            internalStorage : Number,  //128 GB     
            expandableStorage : Number,   //256 GB    Expandable Memory //Upto 16 GB

            supportedMemoryCardType : String,   //microSD
            memoryCardSlotType : String,   //Dedicated Slot  Hybrid Slot

            ram : Number,           //12 GB
            ramType : String, //DDR4

            //pc 
            // pc Storage
            ssdCapacity :  Number,   //256 GB
            hddCapacity : Number,    //HDD Capacity  1 TB  = 1.000 GB	

            // pc ram
            ramFrequency : Number, //2400 MHz 2666 MHz

            cache : Number,  //4 MB
    },

    audio_features : {
        numberOfSpeakers : Number, //2
        speakerOutputRMS : Number, //20 W
        internalMic : String,
        speakerType : String, 
        soundTechnology : String,
        soundMode : String, //Standard, News, 
        soundEnhancements : String, 
        surroundSound : String,
        supportedAudioFormats : String, //MP3, WMA, M4A, AAC, MP2
        otherAudioFeatures : String, //Auto Volume Function, Volume Offset
        soundProperties : String,
    },

    video_features : {
        pictureEngine : String, //4K X-Reality Pro    
        digitalTVReception : String, //DVB-T/T2
        brightness : Number, // 270 nits
        refreshRate : Number, //60 Hz
        viewAngle : Number, //180 deg 
        ledDisplayType : String, //LED
        aspectRatio :String,
        supportedVideoFormats : String, //'AVI, ASF, MP4, MKV, WebM, PS, TS', //AVI, ASF, MP4, MKV, WebM, PS, TS
        otherVideoFeatures : String, //details

    },


    display_features : { // Screen   
            screenSize : Number, //  Display Size : 15.49 cm (6.1 inch)  // 13 inches
            resolutionX :  Number,  //   2532             2532 x 1170 Pixels  => X/Y
            resolutionY :  Number,  //     1170             (pixels)
            resolutionType : String,   //Full HD   Full HD+
            gpu : String,  //IMG GE8320

            hdRecording : Boolean,   // True False
            
            // pc 
            touchScreen : Boolean,    // True False
            screenType : String,    //   Super AMOLED /Full HD            Display Type
            displayColors : Number, //16.7 M ==> add in mille
            hdGameSupport : Boolean,
            refreshRate : Number, //144HZ

            otherDisplayFeatures : String, // otherDisplayFeatures : "90Hz Refresh Rate",

    },
    operating_system :{
            operatingSystem : String,  //iOS 14   Android Marshmallow 6  /window10 Dos  // Android 10
            operatingSystemArchitecture :  String,  //64 bit
            systemArchitecture : Number, //64
            operatingFrequency  : String, //GSM: 850/900/1800/1900, WCDMA: B1/B2/B4/B5/B6/B8/B19, TD-LTE:
    },

    processor_features :{
            // Mobile 

            processorType : String,    // HUAWEI Kirin 955 ARM A14  + Bionic Chip with Next Generation Neural Engine
            processorCore : String,    //Octa Core  corei5 i3 Rayzen ..
            primaryClockSpeed : Number,   //2.2 GHz
            secondaryClockSpeed : Number,  
            othersClockSpeed : String, 

   
            //GraphicsCard  pc
            dedicatedGraphicMemoryType : String, //GDDR6
            dedicatedGraphicMemory : Number, // 512 MB

            //processor  pc
            processorBrand : String,  //AMD
            processorName : String ,   //  Ryzen 5 Quad Core
            processorGeneration : String ,   //  Ryzen 5 Quad Core
            numberofCores : Number,  // 4 cores
            graphicProcessor : String,

            //clockSpeed : Number,


    },
    camera :{
            primaryCamera: String,  //64MP + 12MP + 8MP + 2MP
            selfiCamera: String , //64MP + 12MP
            maxPrimaryCamera : Number,
            maxSelfiCamera : Number,
            primaryCameraFeatures: String , //64MP + 12MP
            selfiCameraFeatures: String , //64MP + 12MP

            webCamera : String, 

            flash : String, //Rear: Brighter True Tone Flash with Slow Sync | Front: Retina Flash
            videoRecording : Boolean,
            hdRecording : Boolean,
            fullHDRecording : Boolean,
            videoRecordingResolution : String, // 4K, 1080P, HDR Video Recording with Dolby Vision Upto 30 fps
            frameRate : Number,  //24 fps, 30 fps, 60 fps, 120 fps, 240 fps
            digitalZoom : Number,  //Photo: Digital Zoom Upto 5x, Video: Digital Zoom Upto 3x
    }, 

    connectivity_features : {
            networkType : String, // 3G, 4G, 2G
            maxNetworkType : String, // 3G, 4G, 2G

            supported4G : Boolean, 
            supported5G : Boolean, 

            supportedNetworks : String,  //5G, 4G LTE, WCDMA, GSM
            internetConnectivity :String , // '4G, 3G, Wi-Fi, EDGE, GPRS'

            wifi : String,
            wifiHotspot : Boolean,
            
            bluetooth : String,   //Bluetooth Support:Yes     Bluetooth Versio : v5.0
            bluetoothRange : String, //'10 m',
            chargingTime : String, // '2 h',
            playTime :  String, // '15 h',
       
            audioJack : String,  //3.33mm

            usbType : String,    //Yes, USB 2.0
            hdmiType : String,       //
            nfc : Boolean, 
            gps : Boolean,
            gprs : String,
            rg45: Boolean,
           

            mapSupport : String, // Maps Google Maps
            
            usbPorts : Number,  // if one TRUE DONT SHOWW NUMBER
            hdmiPorts : Number,
            radioSupport : Boolean,
            headphoneJack : Boolean,

            sensors : String,
            // pc
            wirelessLAN : String,   //Realtek RTL8822CE 802.11a/b/g/n/ac (2x2) Wi-Fi®
            ethernet :  String,
    },

    smart_tv_features : {
           supportedAppNetflix: Boolean,
           supportedAppYoutube: Boolean,
           supportedAppDisney: Boolean,
           supportedApps : Boolean,
           supportedBluetooth : Boolean,
           screenMirroring : Boolean,
           supportedMobileOperatingSystem : Boolean, // true
           soundMode : String, //Standard, News, Movie, Game, Custom
           numberofCores : Number, //4
           processor : String, //'Quad Core'
           graphicProcessor : String, //'Dual Core'
           ramCapacity : Number, // 2GB
           storageMemory : Number , // 16GB
           operatingSystem : String, // Android
           appStoreType : String, // Google Play Store
           wirelessLanAdapter : Boolean, //treu False
           supportedDevicesForCasting : String, // Laptop, Mobile
           otherInternetFeatures :String, //Latest Android 11, Google Assistant, Chromecast Built-in, Google Home, Compatible with Gamepad
           
    },
    power_features : {
        powerRequirement : String, //AC 100 - 240 V, 50/60 Hz
        powerConsumption : String,  //180 W, 0.5 W (Standby)
        powerOutput: Number, //800 w
        otherPowerFeatures : String, //Power Saving Mode
        batteryCapacity : Number, // 6000 mAh
        batteryType: String,
        quickCharging : Boolean,
        batteryBackup : String, // Upto 7 Hours
        batteryCell : String, // 3 Cell
        powerSupply :  String, //'150 W AC Adapter'


    },
    dimensions : {
            width : Number , //71.5 mm
            height : Number , //140 mm
            depth : Number ,  // 8.4 mm
            weight : Number, //170 g
    },

    industrial_features : {
            originalMaterial : {
                material : String,  //coton
                percentage : Number, //90%
            },      
    },

    additional_features : {type : String}, // others detials
    installation_demo_details :{type : String}, // others detials


},
 {
     timestamps : true
 }
)





const Product = mongoose.models.Product || mongoose.model('Product', productSchema )

export default Product;







