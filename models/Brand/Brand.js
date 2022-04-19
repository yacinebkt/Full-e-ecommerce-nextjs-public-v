   //const { json } = require("body-parser");
import mongoose from 'mongoose'


const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true 

    },

    nativeName : { 
        type: String,
    },
    
    tradeName : { 
        type: String,
    },

    origin : { 
        type: String,
    },
    
    Headquarters : { 
        type: String,
    },

    ISIN  : { 
        type: String,
    },

    Founded : {
        type: Date, 
        
    },
    
    description:{
        type:String,
        trim:true,
    },

    Website :{
        type:String,
    },

    brandLogo: {
        type:String,
    },    
   
    updatedAt:{
        Date
    },
    inMenu : {
        type : Boolean,
        required: true,
        default : false,
    },
    isFeatured : {
        type : Boolean,
        required: true,
        default : false,
    },
   
    featuredImage : {
        type : String,
    },
    parentId: {
        type: String,
     },
    
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref:'User',
        //required:true,
    }, 
  



  },
    {
        timestamps : true
    }
);


const Brand = mongoose.models.Brand || mongoose.model('Brand', brandSchema )

export default Brand;











//module.exports = mongoose.model("Brand", brandSchema);





  // slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },


    
//    Activities: [
//         {         
//              /*type:String,*/
//              categoryId:{type:mongoose.Schema.Types.ObjectId, ref:'Category'}, 
    
//         }
//      ],


    
// parentId: {
//     type: String
// },
     
