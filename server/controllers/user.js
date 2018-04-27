const { User } = require('../models/user');
const { Book } = require('../models/book');

exports.getUser = (req, res, next) => {
    let username = req.params.username;

    User.find({username}, (err, user) => {
        if(err) return res.status(400).send(err);
        res.send(user);
    })
};

exports.getUsers = (req, res, next) => {
    User.find({}, (err, user) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(user);
    });
};

exports.addBookToWantToReadList = (req, res, next) => {
    let id = req.body.id;
    let bookId = req.body.bookId;
    Book.findByIdAndUpdate(bookId,{$push:{usersWantToRead: id}},
        {safe: true, upsert: true}, (err, doc) => {
            
        })
    User.findByIdAndUpdate(id,{$push:{wantToRead: bookId}}, (err, doc) => {
        if(err) return res.status(400).send(err);
        
        res.json({
            success: true,
            doc
        });
    })
};

exports.addBookToHaveReadList = (req, res, next) => {
    let id = req.body.id;
    let bookId = req.body.bookId;
    let date = req.body.date;
    let rating = req.body.rating;

    Book.findByIdAndUpdate(bookId,{$push:{usersHaveRead: { id, date }}},
        {safe: true, upsert: true}, ( err, doc ) => {
            
        })

    User.findByIdAndUpdate(id,{$push:{haveRead: { bookId, date, rating }}}, ( err, doc) => {
        if(err) return res.status(400).send(err);

        res.json({
            success: true,
            doc
        });
    })
};

exports.addBookToFavorites = (req, res, next) => {
    let id = req.body.id;
    let bookId = req.body.bookId;

    Book.findByIdAndUpdate(bookId,{$push:{usersFavorited: {id, date: new Date()}}},
        {safe: true, upsert: true}, (err, doc) => {
            if(err) return res.status(400).send(err);

            res.json({
                success: true,
                doc
            });
        });
};

exports.getUserQuotes = (req, res, next) => {
    let authorUsername = req.query.username;
    Quote.find({authorUsername}).sort({createdAt: 'desc'}).exec((err, docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
};

exports.getUserInfo = (req, res, next) => {
    let id = req.query.id;

    User.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.send({
            username: doc.username,
            id: doc._id
        });
    });
};