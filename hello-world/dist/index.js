"use strict";
var _a;
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
let fistEmployee = {
    id: 1,
    name: 'Mosh',
    retire: (date) => {
        console.log(date);
    }
};
let employee = {
    id: 1,
    name: 'Mosh',
    retire: (date) => {
        console.log(date);
    }
};
function kgToLbs(weight) {
    if (typeof weight === 'number')
        return weight * 2.2;
    else
        return parseInt(weight) * 2.2;
}
kgToLbs(10);
kgToLbs('10kg');
let textBox = {
    drag: () => { },
    resize: () => { },
};
let quantity = 100;
function greet(name) {
    if (name)
        console.log(name.toUpperCase());
    else
        console.log('Olá!');
}
function getCustomer(id) {
    return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(1);
console.log((_a = customer === null || customer === void 0 ? void 0 : customer.birthday) === null || _a === void 0 ? void 0 : _a.getFullYear());
let log = null;
log === null || log === void 0 ? void 0 : log('a');
//# sourceMappingURL=index.js.map