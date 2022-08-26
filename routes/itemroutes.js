const express = require('express'); 
const router = express();
const { addItem, updateItem, getItem, deleteItem } = require('../controllers/itemcontrollers')

router.post('/', addItem);

router.get('/', getItem);

router.put('/', updateItem);

router.delete('/', deleteItem);

module.exports = router;
