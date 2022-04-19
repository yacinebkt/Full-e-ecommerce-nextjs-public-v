const ProductsData = [
    // TVS ======================================================================================>

  // PRODUCT 01 =========================>

  {
    name: "Vu Premium 139 cm (55 inch) Ultra HD (4K) LED Smart Android TV",
    slug: "vu-premium-139-cm-55-inch-ultra-hd-4k-led-smart-android-tv",
    category: "smart-tv",
    image:
      "/Img/products/tv/vu-premium-139-cm-55-inch-ultra-hd-4k-led-smart-android-tv/01.jpeg",
    productPictures : [
        { img: "/Img/products/tv/vu-premium-139-cm-55-inch-ultra-hd-4k-led-smart-android-tv/01.jpeg"},
        { img: "/Img/products/tv/vu-premium-139-cm-55-inch-ultra-hd-4k-led-smart-android-tv/02.jpeg"},
        ],
     isFeatured: false,
    // featuredImage:  "/Img/products/tv/vu-premium-139-cm-55-inch-ultra-hd-4k-led-smart-android-tv/04.jpeg",
    price: 84375,
    purchasingPrice : 83375,
    brand: "Vu",
    rating: 1,
    numReviews: 1,
    countInStock: 1,
    description:
      "This Vu TV is here to mesmerise you with a cinematic experience in the comfort of your home. The 30 W Box Speakers of this TV (with Dolby Audio), help you take in every sound and savour clear vocals so that you can enjoy an immersive experience. The Bezel-less Design ensures that you get a larger-than-life experience while streaming movies, gaming, and more. ",
    color: "black",
    sizes: [{ sizeN: 43 }, { sizeN: 55 }, { sizeN: 65 }],
    //capacity: 30, //30L

    model_name: "KD-43X74",
    in_the_box:
      "1 TV Unit, Warranty Card, Remote Control, Table Top Stand, User Manual, 2 Batteries,1 AC Power cord & 1 AC adapter",

    launch_year: 2021, // 2020

    audio_features: {
      numberOfSpeakers: 2, //2
       soundTechnology:
        "Dolby Digital Plus, DTS Virtual-X Surround Sound, Dolby Audio",
      surroundSound:
        "DTS Virtual-X Surround Sound, TruBass HDX, TruSurround X, Dialog Clarity",
    },

    video_features: {
      brightness: 400, // 270 nits
      refreshRate: 60, //60 Hz
      //viewAngle: 180, //180 deg
      ledDisplayType: "Direct LED", //LED
      aspectRatio: "16:9",
    },

    display_features: {
      // Screen
      screenSize: 108, //  Display Size cm : 15.49 cm (6.1 inch)  // 13 inches
      //resolutionX: 2532, //   2532 px=> 2532 x 1170 Pixels  => X/Y
      //resolutionY: 1170, //     1170             (pixels)
      resolutionType: "Ultra HD (4K), 3840 x 2160", //Full HD   Full HD+
     },

    connectivity_features: {
      nfc: false, //true false

      usbPorts: 2, //3 ports
      hdmiPorts: 3, //3 ports
      headphoneJack: true, //true false
    },

    smart_tv_features: {
      supportedAppNetflix: true, //true false
      supportedAppYoutube: true, //true false
      supportedAppDisney: false, //true false

      supportedApps: true, //true false
      supportedBluetooth: true, //true false
   
      soundMode: "Standard", //Standard, News, Movie, Game, Custom
      numberofCores: 4,
      processor: "Quad Core",
      graphicProcessor: "Dual Core",
      ramCapacity: 2, // 2GB
      storageMemory: 16, // 16GB
          wirelessLanAdapter: true, //treu False
    },

    power_features: {
      powerRequirement: "AC 100 - 240 V, 50/60 Hz", //AC 100 - 240 V, 50/60 Hz
      powerConsumption: "180 W, 0.5 W (Standby)", //180 W, 0.5 W (Standby)
    },

    dimensions: {
      width: 1448, //71.5 mm
      height: 1448, //140 mm
      depth: 81, // 8.4 mm
      weight: 17100, //170 g
    },
  },

  // PRODUCT02 =========================>

  {
    name: "SONY X74 108 cm (43 inch) Ultra HD (4K) LED Smart Android TV",
    slug: "sony-x74-108-cm-43-inch-ultra-hd-4k-led-smart-android-tv",
    category: "smart-tv",
    image:
      "/Img/products/tv/sony-x74-108-cm-43-inch-ultra-hd-4k-led-smart-android-tv/01.jpeg",
      productPictures : [
        { img: "/Img/products/tv/sony-x74-108-cm-43-inch-ultra-hd-4k-led-smart-android-tv/01.jpeg"},
        { img: "/Img/products/tv/sony-x74-108-cm-43-inch-ultra-hd-4k-led-smart-android-tv/02.jpeg"},
       ],
    isFeatured: false,
    // featuredImage: "/Img/products/tv/vu-premium-139-cm-55-inch-ultra-hd-4k-led-smart-android-tv/01.jpeg",
    price: 83800,
    purchasingPrice : 82800,

    brand: "SONY",
    rating: 1,
    numReviews: 1,
    countInStock: 1,
    description:
      "This Vu TV is here to mesmerise you with a cinematic experience in the comfort of your home. The 30 W Box Speakers of this TV (with Dolby Audio), help you take in every sound and savour clear vocals so that you can enjoy an immersive experience. The Bezel-less Design ensures that you get a larger-than-life experience while streaming movies, gaming, and more. ",
    color: "black",

    model_name: "65PM",
    //launch_year: 2021, // 2020

    audio_features: {
      numberOfSpeakers: 2, //2
      speakerOutputRMS: 20, //20 W
        soundTechnology:
        "Clear Phase, S-Master Digital Amplifier, Dolby Audio, Bass Reflex Speaker",
      //surroundSound : 'DTS Virtual-X Surround Sound, TruBass HDX, TruSurround X, Dialog Clarity'
    },

    video_features: {
      pictureEngine: "4K X-Reality Pro", //4K X-Reality Pro
      digitalTVReception: "DVB-T/T2", //DVB-T/T2
      // brightness: 400 , // 270 nits
      refreshRate: 60, //60 Hz
      viewAngle: 178, //180 deg
      ledDisplayType: "Edge LED", //LED
      aspectRatio: "16:9",
      supportedVideoFormats: "AVI, ASF, MP4, MKV, WebM, PS, TS", //AVI, ASF, MP4, MKV, WebM, PS, TS
    },

    display_features: {
      // Screen
      screenSize: 164, //  Display Size cm : 15.49 cm (6.1 inch)  // 13 inches
      //resolutionX: 2532, //   2532 px=> 2532 x 1170 Pixels  => X/Y
      //resolutionY: 1170, //     1170             (pixels)
          },

    connectivity_features: {
      //nfc: false, //true false

      usbPorts: 2, //3 ports
      hdmiPorts: 2, //3 ports
      headphoneJack: true, //true false
    },

    smart_tv_features: {
      supportedAppNetflix: true, //true false
      supportedAppYoutube: true, //true false
      supportedAppDisney: false, //true false

 
    },

    power_features: {
      powerRequirement: "AC 100 - 240 V, 50/60 Hz", //AC 100 - 240 V, 50/60 Hz
      powerConsumption: "180 W, 0.5 W (Standby)", //180 W, 0.5 W (Standby)
      otherPowerFeatures: "Power Saving Mode", //Power Saving Mode
      //powerOutput: , //800 w
    },

    dimensions: {
      width: 971, //71.5 mm
      height: 575, //140 mm
      depth: 77, // 8.4 mm
      weight: 7800, //170 g
    },
  },



];

export default ProductsData;
