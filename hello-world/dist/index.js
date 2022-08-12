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
let user2 = [1, 'Mosh'];
user2[1].length;
user2.find;
user2.push(1);
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
let speed = null;
let ride = {
    speed: speed !== null && speed !== void 0 ? speed : 30
};
function reject(message) {
    throw new Error(message);
}
function processEvents() {
    while (true) {
    }
}
class Account {
    constructor(id, owner, _balance) {
        this.id = id;
        this.owner = owner;
        this._balance = _balance;
    }
    deposit(amount) {
        if (amount <= 0)
            throw new Error('Invalid amount');
        this._balance += amount;
    }
    get balance() {
        return this._balance;
    }
}
let account = new Account(1, 'Mosh', 0);
account.deposit(150);
console.log(account);
console.log(typeof account);
console.log(account instanceof Account);
console.log(account.balance);
class SeatAssignment {
}
let seats = new SeatAssignment();
seats.A1 = 'Mosh';
class Ride {
    start() { Ride._activeRides++; }
    ;
    stop() { Ride._activeRides--; }
    ;
    static get activeRides() {
        return Ride._activeRides;
    }
}
Ride._activeRides = 0;
let ride1 = new Ride();
ride1.start();
let ride2 = new Ride();
ride2.start();
ride2.stop();
console.log(Ride.activeRides);
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    walk() {
        console.log('Walking');
    }
}
class Student extends Person {
    constructor(studentId, firstName, lastName) {
        super(firstName, lastName);
        this.studentId = studentId;
    }
    takeTest() {
        this.walk();
        console.log('Taking a test.');
    }
}
let student = new Student(1, 'John', 'Krasinski');
console.log(student);
class Teacher extends Person {
    get fullName() {
        return 'Professor ' + super.fullName;
    }
}
let teacher = new Teacher('John', 'Smith');
console.log(teacher.fullName);
class Principal extends Person {
    get fullName() {
        return 'Principal ' + super.fullName;
    }
}
printNames([
    new Student(1, 'John', 'Matthews'),
    new Teacher('Mosh', 'Hamedani'),
    new Principal('Steven', 'Andrews')
]);
function printNames(people) {
    for (let person of people)
        console.log(person.fullName);
}
class Shape {
    constructor(color) {
        this.color = color;
    }
}
class Circle extends Shape {
    constructor(radius, color) {
        super(color);
        this.radius = radius;
    }
    render() {
        console.log('Rendering a circle');
    }
}
//# sourceMappingURL=index.js.map