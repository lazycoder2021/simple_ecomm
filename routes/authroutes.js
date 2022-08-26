const express = require('express'); 
const router = express.Router();
const { auth } = require('../auth'); 



const { register, login, userProfile, logout } = require('../controllers/authcontrollers')

router.post('/register', register); 
router.post('/login', login)
router.get('/userprofile', auth, userProfile)
router.get('/logout', auth, logout)

module.exports = router; 
