// Connect to Binary.js server
var client = new BinaryClient('wss://agile-hollows-1346.herokuapp.com');

createEventListeners(client);

/**
 * Register events for file upload
 * @param client
 */
function createEventListeners(client) {

    var uploadSubmit = document.getElementById('upload-submit');
    var fileInput = document.getElementById('upload-file');

    uploadSubmit.addEventListener('click', function(e) {

        fileInput.click();
    });

    fileInput.addEventListener('change', function (e) {

        var files = e.target.files; // FileList object
        var file = files[0];

        var reader = new FileReader();

        reader.onload = function(e) {
            uploadBlob(client, reader.result);
        };

        reader.readAsBinaryString(file);

    });

}


/**
 * Send given image reference to given client
 * @param client
 * @param ref
 */
function uploadReference(client, ref) {
    client.send({
        requestImage: ref
    });
}

/**
 * Send image as blob to server
 * @param client
 * @param blob
 */
function uploadBlob(client, blob) {
    client.send({
        access_token: getUrlVars()['token'],
        blob: blob
    });
}

/**
 * Get URL vars
 * @returns {{}}
 */
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}