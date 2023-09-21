const mongoose = require('mongoose');
const regiSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    tele: String,
    email: String,
    address: String,
    city: String,
    numb: Number,
})
module.exports = mongoose.model('Registration', regiSchema)