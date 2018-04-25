const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);
const { generateMessage } = require('./utils/message');

const { Quote } = require('./models/quote');
const Message = require('./models/message');
const Conversation = require('./models/conversation');
const { User } = require('./models/user');
const { Review } = require('./models/review');
const { Book } = require('./models/book');
const { auth } = require('./middleware/auth');
// #############################################################################################

io.on('connection', function(socket){

    socket.on('join', (room, callback) => {
        socket.join(room);
    })

    socket.on('createMessage', (message, cb) => {
        let room = Object.keys( io.sockets.adapter.sids[socket.id] ).filter(item => item!=socket.id);
        socket.broadcast.to(room).emit('newMessage', generateMessage(message.body, message.authorUsername, message.createdAt, message.id));
    })

    socket.on('disconnect', () => {
        
    })

  });

  
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/dist'));

app.get('/api/getBook', (req, res) => {
    let id = req.query.id;
    Book.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
});

app.get('/api/user/:username', (req, res) => {
    let username = req.params.username;

    User.find({username}, (err, user) => {
        if(err) return res.status(400).send(err);
        res.send(user);
    })
})
app.get('/api/books', (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    Book.find().skip(skip).sort({_id: order}).limit(limit).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
});

app.get('/api/trendingbooks', (req, res) => {
    Book.aggregate([{$project:{title: 1, author: 1, coverImage: 1, ysize:{$size:"$usersHaveRead"}}}, {$sort:{ysize: -1}}, {$limit: 5}]).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
})

app.get('/api/newbooks', (req, res) => {
    Book.find({}).sort({publishedDate:-1}).limit(5).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });
})

app.get('/api/getReviewer', (req, res) => {
    let id = req.query.id;

    User.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.send({
            username: doc.username,
            id: doc._id
        });
    });
});

app.get('/api/logout', auth, (req, res) => {
    req.user.deleteToken(req.token, (err, user) => {
        if(err) return res.status(400).send(err);
        res.sendStatus(200);
    });
});

app.get('/api/user_posts', (req, res) => {
    Book.find({ownerId: req.query.user}).exec((err, docs) => {
        if(err) return res.status(400).send(err);
        res.send(docs);
    });
});

app.get('/api/users', (req, res) => {
    User.find({}, (err, user) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(user);
    });
});

// Message.find({conversationId: id}).skip(skip).sort({_id: order}).limit(limit).exec((err, doc) => {
//     if(err) return res.status(400).send(err);
//     res.send(doc);
// });

app.get('/api/review', (req, res) => {
    let id = req.query.id;
    Review.findById(id, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    }) 
})

app.get('/api/reviews', (req, res) => {
    Review.find({}).sort({createdAt: 'desc'}).exec((err, docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
})

app.post('/api/message', (req, res) => {
    const message = new Message(req.body);

    message.save((err, doc) => {
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            message: doc
        });
    })
})

app.get('/api/booksnauthors', (req, res) => {
    let query = req.query.query;
    Book.find({$text:{ $search:`"\"${query}\""`,$language: "ru"}}, (err, docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
})

app.get('/api/getconversation', (req, res) => {
    let user = req.query.user;
    let recipent = req.query.recipent;

    Conversation
        .find({participants: {$all:[user, recipent]}})
        .select('_id participants')
        .exec((err, conversations) => {
            if(err) return res.status(400).send(err);
            res.status(200).send(conversations);
})})

app.get('/api/getconversations', (req, res) => {
    let userid = req.query.id;


    Conversation
        .find({participants: userid})
        .select('_id participants')
        .exec((err, conversations) => {
            if(err) return res.status(400).send(err);
            const fullConversations = [];
            conversations.forEach((conversation) => {
                Message.find({conversationId: conversation._id})
                    .sort('-createdAt')
                    .limit(20)
                    .exec((err, messages) => {
                        if(err) return res.status(400).send(err);
                        fullConversations.push({participants: conversation.participants,id: conversation._id, messages: messages})
                        if (fullConversations.length === conversations.length) {
                            return res.status(200).json({ conversations: fullConversations });
                          }
                    })
                    
            })   
})})

app.get('/api/messages', (req, res) => {
    let skip = parseInt(req.query.skip);
    let limit = parseInt(req.query.limit);
    let order = req.query.order;
    let id = req.query.id;

    Message.find({conversationId: id}).skip(skip).sort({_id: order}).limit(limit).exec((err, doc) => {
        if(err) return res.status(400).send(err);
        res.send(doc);
    });

})

app.post('/api/conversation', (req, res) => {
    const conversation = new Conversation({
        participants: [req.body.userId, req.body.recipientId]
      });
    
    conversation.save((err, doc) => {
        console.log(err)
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            newConversation: doc
        });
    })
})

app.post('/api/register', (req, res) => {
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            user: doc
        });
    });
});

app.get('/api/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        username: req.user.username
    })
});


app.post('/api/quote', (req, res) => {
    const quote = new Quote(req.body);

    quote.save((err, doc) => {
        if(err) return res.json({success: false});
        res.status(200).json({
            success: true,
            quote: doc
        });
    });
})

app.get('/api/book-quotes', (req, res) => {
    let bookId = req.query.bookId;
    Quote.find({bookId}).sort({createdAt: 'desc'}).exec((err, docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
})

app.get('/api/user-quotes', (req, res) => {
    let authorUsername = req.query.username;
    Quote.find({authorUsername}).sort({createdAt: 'desc'}).exec((err, docs) => {
        if(err) return res.status(400).send(err);
        res.status(200).send(docs);
    })
})

app.post('/api/login', (req, res) => {

    User.findOne({'email': req.body.email}, (err, user) => {
        if(!user) return res.status(400).json({isAuth: false, message: 'Auth failed, email not found'});
        
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch) return res.status(400).json({
                isAuth: false, 
                message: 'Wrong password'
            });

            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    isAuth: true,
                    id: user._id,
                    email: user.email,
                    username: user.username
                });
            });
        });    
    });
});

app.post('/api/book', (req, res) => {
    const book = new Book(req.body);

    book.save((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            bookId: doc._id
        });
    });
});

app.post('/api/add_review', (req, res) => {
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


})

app.post('/api/new_review', (req, res) => {
    const review = new Review(req.body);

    review.save((err, doc) => {
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post: true
        });
    })

    Book.findByIdAndUpdate({"_id":req.body.bookId}, {$push: {reviews: {
        username: req.body.authorUsername,
        authorId: req.body.authorId,
        reviewText: req.body.content
    }}},
    {safe: true, upsert: true})
})

app.post('/api/want_to_read', (req, res) => {
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
})

app.post('/api/have_read', ( req, res ) => {
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
})

app.post('/api/favorite_book', (req, res) => {
    let id = req.body.id;
    let bookId = req.body.bookId;

    Book.findByIdAndUpdate(bookId,{$push:{usersFavorited: {id, date: new Date()}}},
        {safe: true, upsert: true}, (err, doc) => {
            if(err) return res.status(400).send(err);

            res.json({
                success: true,
                doc
            });
        })

});

app.post('/api/book_update', (req, res) => {
    Book.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
        if(err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        });
    });
});

app.delete('/api/delete_book', (req, res) => {
    let id = req.query.id;
    Book.findByIdAndRemove(id, (err,doc) => {
        if(err) return res.status(400).send(err);
        res.json(true);
    });
});

if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client','dist','index.html'))
    });
};

const port = process.env.PORT || 3001;
http.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
