import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    isAdmin : {
        type: Boolean,
        required : true,
        default : false
    },

    isSeller : {
        type: Boolean,
        required : true,
        default : false,
    },

    profileImage : {
        type:String,
    },
   
    phone : {
        type: String,
        // required : true,
    },

    addresses : [
        { 
            fullName : {type : String},
            streetAddress : {type : String},
            aptNumber : {type : String},
            country : {type : String},
            state :  {type : String},
            city : {type : String},
            postalCode : {type : String},
            phone :  {type : String},
        }
    ]
   
},
 {
     timestamps : true
 }
)


const User = mongoose.models.User || mongoose.model('User', userSchema )

export default User;









// name: 'Second Pants', 
// slug : 'second-pants',
// category: 'Shirts',
// image : '/Img/pants2.jpg',
// price : 3480,
// brand : 'Nike',
// rating: 4.5,
// numReviews : 26,
// countInStock: 120,
// description: 'A popular free shirt'