function Log() {

    var print = function(s) {
        var output = document.getElementById('logger');

        if (!output) {
            return;
        }

        var li = document.createElement('li');
        li.innerHTML = s;
        output.insertBefore(li,output.firstChild);
    };

    this.log = function log(s) {
        print(s);
    }
}




