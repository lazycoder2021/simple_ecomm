const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    email: {
        type: String, 
        required: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    isAdmin: {
        type: String, 
        required: false,
        default: false
    }
}) 

userSchema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.verifyPassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch;
}


const User = mongoose.model('User', userSchema); 

module.exports = User; 


