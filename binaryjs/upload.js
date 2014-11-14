/**
 * Register click events for buttons
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