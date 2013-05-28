var counter = function() {
    var count = -1;
    var counterFunction;

    counterFunction = function() {
        count += 1;
        return count;
    };

    return counterFunction;
};

var next = counter(5);
console.log(next()); // 0
console.log(next()); // 1
console.log(next()); // 2

var next2 = counter();
console.log(next2()); // 0
console.log(next2()); // 1

console.log(next()); // 3
