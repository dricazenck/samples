var foo = function() {
	if (true) {
		function bar() {
			console.log("true");
		}
	} else {
		if (false) {
			function bar() {
				console.log("false");
			}
		} else {
			function bar() {
				console.log("last function with same name");
			}
		}
	}

	return bar;
};

var fn = foo();
fn(); // wtf?!

// ele cria as funcoes em sequencia.. independente da condição

// exemplo correto
var foo = function() {
	var fbar;
	if (true) {
		fbar = function() {
			console.log("value correct");
		}();
	} else {
		fbar = function() {
			console.log("wrong value");
		}();
	}
	return fbar;
}();
