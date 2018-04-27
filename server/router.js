const AuthenticationController = require('./controllers/authentication');
const UserController = require('./controllers/user');
const BookController = require('./controllers/book');
const ChatController = require('./controllers/chat');
const ReviewController = require('./controllers/review');

const express = require('express');
const { auth } = require('./middleware/auth');
module.exports = function (app) {
    // Initializing route groups
    const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router(),
    chatRoutes = express.Router(),
    bookRoutes = express.Router(),
    reviewRoutes = express.Router();

    //= ========================
    // Auth Routes
    //= ========================

    // Set auth routes as subgroup/middleware to apiRoutes
    apiRoutes.use('/auth', authRoutes);

    // Registration route
    authRoutes.post('/register', AuthenticationController.register);
    // Authentication route
    authRoutes.get('/auth', auth, AuthenticationController.auth);
    // Login route
    authRoutes.post('/login', AuthenticationController.login);
    // Logout route
    authRoutes.get('/logout', AuthenticationController.logout);

    //= ========================
    // User Routes
    //= ========================

    apiRoutes.use('/user', userRoutes);

    userRoutes.get('/:username', UserController.getUser);
    userRoutes.get('/users', UserController.getUsers);
    userRoutes.post('/want-to-read', UserController.addBookToWantToReadList);
    userRoutes.post('/have-read', UserController.addBookToHaveReadList)
    userRoutes.post('/favorites', UserController.addBookToFavorites);
    userRoutes.get('/quotes', UserController.getUserQuotes);
    userRoutes.get('/info', UserController.getUserInfo);
    
    //= ========================
    // Book Routes
    //= ========================

    apiRoutes.use('/book', bookRoutes);

    bookRoutes.post('/', BookController.newBook);
    bookRoutes.get('/', BookController.getBook);
    bookRoutes.delete('/', BookController.deleteBook);
    bookRoutes.post('/update', BookController.updateBook);
    bookRoutes.get('/books', BookController.getBooks);
    bookRoutes.get('/trending', BookController.getTrendingBooks);
    bookRoutes.get('/new', BookController.getNewBooks);
    bookRoutes.get('/quotes', BookController.getBookQuotes);
    bookRoutes.get('/queryBook', BookController.findBook);
    bookRoutes.post('/rate', BookController.rateBook);
    //= ========================
    // Review Routes
    //= ========================

    apiRoutes.use('/review', reviewRoutes);
    reviewRoutes.get('/', ReviewController.getReview);
    reviewRoutes.get('/reviews', ReviewController.getReviews);
    reviewRoutes.post('/', ReviewController.newReview);
    //= ========================
    // Chat Routes
    //= ========================

    apiRoutes.use('/chat', chatRoutes);

    chatRoutes.get('/conversation', ChatController.getConversation);
    chatRoutes.get('/conversations', ChatController.getConversations);
    chatRoutes.post('/conversation', ChatController.startConversation);
    chatRoutes.post('/message', ChatController.newMessage);
    chatRoutes.get('/messages', ChatController.getConversationMessages);
    app.use('/api', apiRoutes)
}  