const mongoose = require('mongoose');
const config = require('./../config/config').get(process.env.NODE_ENV);

const quoteSchema = mongoose.Schema({
    content:{
        type: String,
        required: true
    },
    authorId:{
        type: String
    },
    bookId: {
        type: String
    },
    authorUsername: {
        type: String
    },
    imageId: {
        type: String
    },
    bookTitle: {
        type: String
    },
    bookAuthor: {
        type: String
    }
}, {timestamps: true});

const Quote = mongoose.model('Quote', quoteSchema);

module.exports = { Quote };
