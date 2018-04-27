const express = require('express'),
    app = express(),
    router = require('./router'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    config = require('./config/config').get(process.env.NODE_ENV),
    socketEvents = require('./socketEvents');
    

var http = require('http').createServer(app);
var io = require('socket.io')(http);
socketEvents(io);

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/dist'));

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

router(app);