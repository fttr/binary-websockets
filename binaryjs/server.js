var BinaryServer = require('binaryjs').BinaryServer;
var fs = require('fs');
// Start Binary.js server
var server = BinaryServer({port: 9000});

// Wait for new user connections
server.on('connection', function(client) {

    client.on('stream', function(stream, meta) {

        // Client requests image by reference
        stream.on('data', function(data){

            //console.log('got data:', data);

            if (data.requestImage) {
                var whitelist = ['flower', 'space'];
                var ref = data.requestImage;

                if (whitelist.indexOf(ref) !== -1) {
                    var file = getImageStream(ref);
                    client.send(file);
                }
            } else {
                console.log('got blob');

                var blob = new Buffer(data, "binary");
                client.send(blob);
            }
        });
    });
});

function getImageStream(ref) {
    return fs.createReadStream('../assets/' + ref + '.png');
}

