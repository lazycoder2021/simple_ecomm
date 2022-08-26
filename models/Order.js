const mongoose = require('mongoose'); 

const orderSchema = ({
    userId: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    }, 
    products: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: false
    },
    createdAt: {
        type: String,
        required: false
    },
    success: {
        type: Boolean, 
        required: false, 
        default:true
    }
})

const Order = mongoose.model('Order', orderSchema); 

module.exports = Order;