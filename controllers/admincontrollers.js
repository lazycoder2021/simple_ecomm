const Razorpay = require('razorpay');
require('dotenv').config();
const Order = require('../models/Order');

var instance = new Razorpay({ key_id: 'rzp_test_obMCtlKp3EEqKX', key_secret: 'HJmwrAqZCfXxzoEXtZa1jMXd', });

const createorder = async (req, res) => {
    //console.log(req.body.data)

    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };

    instance.orders.create(options, async function (err, order) {
        await console.log(order);
        if (order) {
            console.log(order.created_at)
            
            try {
                const newOrder = new Order({
                    userId: req.session.userId,
                    email: req.body.email, 
                    products: 'Gym Shorts, Nike Shoes, Cricket Bat',
                    orderId: order.id, 
                    amount: req.body.amount, 
                });
                await newOrder.save();
                res.status(200).json({ "msg": "payment success, order stored in db", newOrder, order })
            } catch (e) {
                console.log(e)
                res.status(500).json({ "msg": "server error" })
            }
        }
        res.status(200).json({ order, newOrder})
    });

    

    
}


    





const getorders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json({"msg": "testing admin controller", orders})
    }
    catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }
}

module.exports = {
    getorders, 
    createorder
}
