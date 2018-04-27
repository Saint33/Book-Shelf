const { Review } = require('../models/review');

exports.getReview = (req, res, next) => {
    let id = req.query.id;
    Review.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    }) 
}

exports.getReviews = (req, res, next) => {
    Review.find({}).sort({createdAt: 'desc'}).exec((err, docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
}

exports.newReview = (req, res, next) => {
    const review = new Review(req.body);

    review.save((err, doc) => {
        if(err) return res.status(400).send(err);
        Book.findByIdAndUpdate({"_id":req.body.bookId}, {$push: {reviews: req.body}},
        {safe: true, upsert: true}, (err, doc) => {
    
        })
        res.status(200).json({
            post: true,
            bookId: doc._id
        });
    })
};
