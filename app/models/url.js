const mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    originalUrl: String,
    redirectUrl: String,
    user: String,
    dateAdded: Date,
    hitCounter: Number 
})

mongoose.model('URL', urlSchema);