const mongoose = require('mongoose');
const config = require('./../config/config').get(process.env.NODE_ENV);

const reviewSchema = mongoose.Schema({
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
    reviewerRating: {
        
    }
}, {timestamps: true});

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review };
