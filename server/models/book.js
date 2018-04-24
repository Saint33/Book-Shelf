const mongoose = require('mongoose');
const config = require('./../config/config').get(process.env.NODE_ENV);

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },   
    subtitle: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    review: {
        type: String,
        default: 'n/a'
    },
    pageCount: {
        type: String,
        default: 'n/a'    
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    price: {
        type: String,
        default: 'n/a'   
    },
    publisher: {
        type: String
    },
    publishedDate: {
        type: String
    },
    language: {
        type: String
    },
    ISBN: {
        type: String
    },
    description: {
        type: String
    },
    coverImage: {
        type: String
    },
    category: {
        type: String
    },
    reviews: [],
    quotes: [],
    series: {
        type: String
    },
    usersHaveRead: [],
    usersWantToRead: [],
    usersFavorited: []
}, {timestamps: true});

const Book = mongoose.model('Book', bookSchema);

module.exports = { Book };
