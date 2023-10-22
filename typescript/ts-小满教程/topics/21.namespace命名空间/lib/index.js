"use strict";
var A;
(function (A) {
    A.a = 'a';
})(A || (A = {}));
var A;
(function (A) {
    A.b = 'b';
})(A || (A = {}));
var A;
(function (A) {
    A.c = 'c';
})(A || (A = {}));
console.log(A.a);
console.log(A.b);
console.log(A.c);
