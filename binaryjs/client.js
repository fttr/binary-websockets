var log = new Log();
var time = 0;

// Connect to Binary.js server
var client = new BinaryClient('wss://agile-hollows-1346.herokuapp.com');

createEventListeners(client);

// Received new stream from server!
client.on('stream', function(stream, meta) {

    //console.time('x');
    time = performance.now();

    // Buffer for parts
    var parts = [];

    // Got new data
    stream.on('data', function(data){
        parts.push(data);
    });

    stream.on('end', function(){

        var duration = (performance.now() - time).toFixed(2);
        log.log(duration + ' ms');
        //console.timeEnd('x');

        // Display new data in browser!
        var output = document.getElementById('output-image');
        output.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
    });
});

