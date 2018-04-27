const { Book } = require('../models/book');
const { Quote } = require('../models/quote');

exports.getBook = (req, res, next) => {
    let id = req.query.id;
    Book.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
};

exports.getBooks = (req, res, next) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    Book.find().skip(skip).sort({_id: order}).limit(limit).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
}

exports.deleteBook = (req, res, next) => {
    let id = req.query.id;
    Book.findByIdAndRemove(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json(true);
    });
};

exports.updateBook = (req, res, next) => {
    Book.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        });
    });
}

exports.newBook = (req, res, next) => {
    const book = new Book(req.body);
    
    book.save((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        });
    });
};

exports.getTrendingBooks = (req, res, next) => {
    Book.aggregate([{$project:{title: 1, author: 1, coverImage: 1, ysize:{$size:"$usersHaveRead"}}}, {$sort:{ysize: -1}}, {$limit: 5}]).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
};

exports.getNewBooks = (req, res, next) => {
    Book.find({}).sort({publishedDate:-1}).limit(5).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
};

exports.newQuote = (req, res, next) => {
    const quote = new Quote(req.body);

    quote.save((err, doc) => {
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            quote: doc
        });
    });
};

exports.getBookQuotes = (req, res, next) => {
    let bookId = req.query.bookId;
    Quote.find({bookId}).sort({createdAt: 'desc'}).exec((err, docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
};

exports.findBook = (req, res, next) => {
    let query = req.query.query;
    Book.find({$text:{ $search:`"\"${query}\""`,$language: "ru"}}, (err, docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
};

exports.rateBook = (req, res, next) => {
    let rating = req.body.rating;
    let bookId = req.body.bookId;
    let userId = req.body.userId;
    Book.update({"_id": bookId, "usersHaveRead.id": userId}, {$set: {"usersHaveRead.$.rating": rating}}).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(doc);
    })
}