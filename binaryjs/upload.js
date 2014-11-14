/**
 * Register events for buttons and file upload
 * @param client
 */
function createEventListeners(client) {

    var classname = document.getElementsByClassName('upload-reference');

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', function (e) {
            var ref = e.target.getAttribute('data-id');
            uploadReference(client, ref);
        });
    }


    var uploadSubmit = document.getElementById('upload-submit');
    var fileInput = document.getElementById('upload-file');

    // uploadSubmit.addEventListener('click', function(e) {

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
    client.send(blob);
}