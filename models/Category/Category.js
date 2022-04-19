
import mongoose from 'mongoose'


const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true 
    },
    parentId: {
       type: String,
    },
    
    initialParent : {
      type: String,
    },
    categoryPicture:{
       type: String,
    },

    //in navbar categoriess
    inMenu: {
        type : Boolean,
        required: true,
        default : false,
    },

    inHomePage: {
      type : Boolean,
      required: true,
      default : false,
  },


    //isFeatured
    isFeatured : {
        type : Boolean,
        required: true,
        default : false,
    },
    featuredImage : {
        type : String,
    },
    featuredTitle : {
      type : String,
    },
    featuredText : {
      type : String,
    },
    featuredSort : {
      type : Number,
    },

  },
  { timestamps: true }
);


const Category = mongoose.models.Category || mongoose.model('Category', categorySchema )

export default Category;
