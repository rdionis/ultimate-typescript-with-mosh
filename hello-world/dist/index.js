"use strict";
let sales = 123456789;
let course = 'Typescript';
let isPublished = true;
let level;
level = 1;
level = 'a';
function render(document) {
    console.log(document);
}
let fnumbers = [1, 2, '3'];
let numbers = [1, 2, 3];
let otherNumbers = [];
numbers.forEach(number => number.toFixed);
let user = [1, 'Mosh'];
user[1].length;
user.find;
user.push(1);
var Sizes;
(function (Sizes) {
    Sizes["Small"] = "S";
    Sizes["Medium"] = "M";
    Sizes["Large"] = "L";
})(Sizes || (Sizes = {}));
;
let mySize = 2;
console.log(mySize);
function calculateTax(income, taxYear = 2022) {
    if (taxYear < 2022)
        return income * 1.2;
    return income * 1.3;
}
calculateTax(10000);
let employee = {
    id: 1,
    name: 'Mosh',
    retire: (date) => {
        console.log(date);
    }
};
//# sourceMappingURL=index.js.map