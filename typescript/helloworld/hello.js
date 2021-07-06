function sayHello(person) {
    if (typeof person === 'string') {
        return 'Hello, ' + person;
    }
    else {
        throw new Error('person is not a string');
    }
}
var a;
(function (a) {
    a[a["b"] = 1] = "b";
})(a || (a = {}));
;
var user = 'Tom';
console.log(sayHello(user));
