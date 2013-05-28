var n = 123421.1234;
var n2 = 1;

var asdf = "ç";
var s2 = "&#123;";

var o = {
	"asdf" : 123
};

var o = new Object();
o.asdf = 1234;

o[undefined];

o["1"];

a = [ 5 ];

(typeof a) // "string" , "number" , "function" , "boolean"

var n = 1.01;
n.toFixed("3");

var n = new Number(1.01);
n + 1234;
typeof n // "number";
n instanceof Number // false

Object.prototype.toString.call(n) // "[object Number]";

var a = [];

typeof a // "object"
a instanceof Array // true
Object.prototype.toString.call(n) // "[object Array]";

var b = new Boolean(false);

if (b) {
	// vai entrar
}

var bar = foo();
bar(); // wtf?!

var d = new Date();
d instanceof Date;

var f = function() {
	arguments;

	a[0]

	foo(arguments);
}

f(1, 2, 3);

var foo = function(args) {

};

var bar2 = 2;
var foo = function() {
	var bar, y, x; // undefined

	bar = 1;
	console.log(bar); // 1
	console.log(bar2); // 2
	bar2 = 3;

	if (true) {
		y = 3;
		var x = 3;
	}
};

console.log(bar2) // 2
foo();
console.log(bar2) // 3

var bar = function(arr /* len 5 */) {
	var i;

	var addEvent = function(el, i) {
		el.onclick = function() {
			alert(i);
		}
	};

	for (i = 0; i < arr.length; i++) {
		addEvent(arr[i], i);
	}

	// 5
};

(function() {
	var foo, bar;

	foo = function foo() {
		bar();
	};

	bar = function bar() {
	};

	foo();
}());

// RangeError: Maximum call stack size exceeded
var foo = function bar() {
	bar(1);
};

foo();

try {
	alert(yomomma);
} catch (e) {
	console.log(e);
	var x = 1;
}

console.log(x); // 1
console.log(e); // erro

