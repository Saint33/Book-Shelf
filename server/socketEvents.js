const { generateMessage } = require('./utils/message');
exports = module.exports = function(io){
    io.on('connection', function(socket){

        socket.on('join', (room, callback) => {
            socket.join(room);
        })
    
        socket.on('createMessage', (message, cb) => {
            let room = Object.keys( io.sockets.adapter.sids[socket.id] ).filter(item => item!=socket.id);
            socket.broadcast.to(room).emit('newMessage', generateMessage(message.body, message.authorUsername, message.createdAt, message.id));
        })
    
        socket.on('disconnect', () => {
            // console.log('user disconnected');
        })
    
      });
}