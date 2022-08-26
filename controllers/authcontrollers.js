const User = require('../models/User'); 
const bcrypt = require('bcryptjs');
const session = require('express-session'); 

const register = async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(403).json({"msg": "user already exists"})
        }
        const newUser = new User(req.body); 
        await newUser.save(); 
        res.status(200).json({ "msg": "registration successful", newUser})
    } catch (e) {
        console.log(e)
        res.status(500).json({"msg": "server error"})
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(403).json({"msg": "user does not exist"})
        }

        const isTrue = await user.verifyPassword(req.body.password)

        if (!isTrue) {
            return res.status(403).json({ "msg": "passwords do not match" })
        } else {
            req.session.userId = user._id.toString();
            req.session.isAdmin = user.isAdmin;
            req.session.userEmail = user.email;
            const { _id, email, isAdmin } = user._doc;
            console.log(req.session.userId, req.session.isAdmin, req.session.id, req.session.userEmail)
            res.status(200).json({ "msg": "login successful", _id, email, isAdmin })
        }

        /*

        const isMatch = await bcrypt.compare(req.body.password, user.password)

        if (!isMatch) {
            return res.status(403).json({ "msg": "passwords do not match" })
        } else {
            res.status(200).json({ "msg": "login successful" })
        }

        */

        
    } catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }
}

const userProfile = (req, res) => {
    try {

        res.status(200).json({ "msg": "user profile" })
    } catch (e) {
        console.log(e)
        res.status(500).json({"msg": "server error"})
    }
}

const logout = (req, res) => {
    try {
        req.session.destroy()
        res.status(200).json({ "msg": "user logged out successfully, session destroyed" })
    } catch (e) {
        console.log(e)
        res.status(500).json({ "msg": "server error" })
    }
}


module.exports = {
    register, 
    login, 
    userProfile, 
    logout
}
