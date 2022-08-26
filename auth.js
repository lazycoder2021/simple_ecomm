

const auth = function (req, res, next) {
    if (req.session.userId) {
        next()
    } else {
        res.send('you are not logged in, login to add tasks')
    }
}

const adminauth = function (req, res, next) {
    if (req.session.userId && req.session.isAdmin) {
        next()
    } else {
        res.status(403).json({"msg": "you don't have admin priveleges"})
    }
}





module.exports = {
    auth, 
    adminauth
}




