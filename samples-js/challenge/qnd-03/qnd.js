var f = function(a1, a2, a3) {
    console.log(this.toString(), a1, a2, a3);
};

f(1, 2, 3); // global, 1, 2, 3

var foo = { toString : function() { return "foo"; } };
var bar = { toString : function() { return "bar"; } };

foo.f = f;
foo.f(1, 2, 3); // "foo", 1, 2, 3

bar = f;
bar .f(1, 2, 3); // "bar", 1, 2, 3

f.call(foo, 1, 2, 3); // "foo", 1, 2, 3

f.apply(bar, [1, 2, 3]) // "bar", 1, 2, 3

bar.f.call(foo, 1, 2, 3); // "foo", 1, 2, 3

foo.f.call("yomomma", 1, 2, 3);  // "yomomma", 1, 2, 3 // autoboxing madafaka


// the mighty "hoo" "class"
var hoo = function(name) {
    if (!name) {
        throw new Error("fuck you!");
    }

    this.name = name;
};

hoo.prototype.toString = function() { return "hoo: " + this.name; };
hoo.prototype.hayooo = function() { return this.name + ": you suck, but yo momma is sweet!"; };

var h1 = new hoo("h1");
console.log(h1); // "hoo: h1"
console.log(h1.hayooo()); // "h1: you suck, but yo momma is sweet!"

var h2 = new hoo("h2");
console.log(h2); // "hoo: h2"

hoo.prototype.constructor === hoo; // true

// the "yoyo" momma "class"
var yoyo = function(name, age) {
    this.age = age;

    hoo.call(this, name);
};

// prototype FTW!
yoyo.prototype = new hoo();

// overrides "hoo"'s toString
yoyo.prototype.toString = function() { return "yoyo: " + this.name + " (" + this.age + ")"; };

var y1 = new yoyo("y1", 10);
console.log(y1.toString()); // "yoyo: y1 (10)"
console.log(y1.hayooo()); // "y1: you suck, but yo momma is sweet!"

yoyo.prototype.constructor === yoyo; // false
yoyo.prototype.constructor === hoo; // true




