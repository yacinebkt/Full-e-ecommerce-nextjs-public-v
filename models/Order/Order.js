import mongoose, { Mongoose } from 'mongoose'


const orderSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId, ref : 'User',
        required : true
    },
    orderItems : [
        { 
            name: { type: String, required : true},
            quantity: { type: Number, required : true},
            image: { type: String, required : true},
            price: { type: Number, required : true},
        }
    ],
    shippingAddress : {
        fullName: { type: String, required : true},
        address : { type: String, required : true},
        city : { type: String, required : true},
        postalCode : { type: String, required : true},
        country : { type: String, required : true},

        
        aptNumber : {type : String},
        state :  {type : String},
        phone :  {type : String},
        
        
    },
    paymentMethod : { type: String, required : true},
    paymentResult : {
        id : String,
        status : String, 
        email_address : String,
    },
    itemsPrice : { type: Number, required : true},
    shippingPrice : { type: Number, required : true},
    taxPrice : { type: Number, required : true},
    sizeS : {type: String},
    sizeN : {type: Number},
    totalPrice : { type: Number, required : true},
    isPaid : { type: Boolean, required : true, default: false }, // =is orderd true
    //
    isPacked : { type: Boolean, required : true, default: false },
    isShipped : { type: Boolean, required : true, default: false },
    //
    isDelivered : { type: Boolean, required : true, default: false },
    paidAt : {type : Date},

    deliveredAt : {type : Date},
    packedAt : {type : Date},
    shippedAt : {type : Date},
   
},
 {
     timestamps : true
 }
)


const Order = mongoose.models.Order || mongoose.model('Order', orderSchema )

export default Order;









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