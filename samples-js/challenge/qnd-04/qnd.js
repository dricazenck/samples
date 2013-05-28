var fuckIt = function(ms) {
    var ts = new Date().getTime();
    while ((new Date().getTime() - ts) < ms);
};

var tick = function(name) {
    var n = 0;
    return function() {
        n += 1;
        console.log(new Date(), name, n);
    };
};

var timeout = setTimeout(tick("timeout"), 3000);
var interval = setInterval(tick("interval"), 3000);