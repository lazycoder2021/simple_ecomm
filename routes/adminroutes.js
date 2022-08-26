const express = require('express'); 
const router = express.Router();
const { adminauth } = require('../auth');

const { getorders, createorder } = require('../controllers/admincontrollers')

router.get('/order', adminauth, getorders)
router.post('/order', adminauth, createorder)


module.exports = router; 
