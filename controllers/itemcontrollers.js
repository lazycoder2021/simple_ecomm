const Item = require('../models/Item');


const addItem = async (req, res) => {
    try {
        const item = new Item(req.body); 
        await item.save(); 
        res.status(200).json({ "msg": "item added successfully", item })
    } catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }
}

const getItem = async (req, res) => {
    try {
        const items = await Item.find({}); 
        res.status(200).json({ "msg": "items fetched successfully" , items})
    } catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }
}

const updateItem = (req, res) => {
    try {
        res.status(200).json({ "msg": "item updated successfully" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }
}

const deleteItem = (req, res) => {
    try {
        res.status(200).json({ "msg": "item deleted successfully" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }
}

module.exports = {
    addItem, 
    getItem, 
    updateItem, 
    deleteItem
}


