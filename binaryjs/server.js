var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');

var clients = [];

var accessToken = process.env.access_token;

// Start Binary.js server
var server = BinaryServer({port: process.env.PORT});

console.log(process.env.PORT);

// Wait for new user connections
server.on('connection', function(client) {

    clients.push(client);


    client.on('stream', function(stream, meta) {


        stream.on('data', function(data){

            if (data.access_token && data.blob) {

                if (data.access_token !== accessToken) {
                    console.log('invalid access token');
                    return;
                }

                // Client sends image as blob

                console.log('got blob');

                var blob = new Buffer(data.blob, "binary");

                // Broadcast image to all connected clients
                for (var client in clients) {
                    clients[client].send(blob);
                }
            } else {
                console.log('invalid data format')
            }
        });

    });

    client.on('close', function () {
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].id == client.id) {
                clients.splice(i, 1);
            }
        }
        client.close();
    });
});

function getImageStream(ref) {
    return fs.createReadStream('../assets/' + ref + '.png');
}

