var socketIo = require('socket.io');
//3ml include l socket
var messages = [];
var io = null;


module.exports.createSocketServer = function (server) {
    io = socketIo(server);

    io.on('connection', function (client) {
        console.log('client connected...');
        client.on('hi2', function (data) {
            console.log('hi', data)
            client.emit('hiFromServer', 'ana server :p');
        });

        client.on('newMessage', function (data) {
            messages.push(data)
            io.emit('updateMessages', messages);

        });

        client.on('disconnect', function () {
            console.log('client Away :D ')
        })
    });
}