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
class GoogleCalendar {
    constructor(name) {
        this.name = name;
    }
    addEvent() {
        throw new Error("Method not implemented.");
    }
    removeEvent() {
        throw new Error("Method not implemented.");
    }
}
class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
let pair = new KeyValuePair(1, 'Apple');
class StringKeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
let anotherPair = new StringKeyValuePair('1', 'Apple');
class AnotherKeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
let yetAnotherPair = new AnotherKeyValuePair(1, 'a');
function wrapInArray(value) {
    return [value];
}
let numbersArray = wrapInArray('1');
let anotherNumbersArray = wrapInArray(2);
console.log(anotherNumbersArray);
class ArrayUtils {
    static wrapInArray(value) {
        return [value];
    }
}
let moreNumbers = ArrayUtils.wrapInArray(1);
console.log(moreNumbers);
function fetch(url) {
    console.log(url);
    return {
        data: null,
        error: null
    };
}
let resultClient = fetch('some url');
let resultProduct = fetch('some url');
function echo(value) {
    return value;
}
echo(1);
function echo1(value) {
    return value;
}
echo1(1);
function echo2(value) {
    return value;
}
echo2({ name: 'Raquel' });
function echo3(value) {
    return value;
}
echo3({ name: 'Raquel' });
class HumanPerson {
    constructor(name) {
        this.name = name;
    }
}
class HumanCustomer extends HumanPerson {
}
function echo4(value) {
    return value;
}
echo4(new HumanPerson('Anna'));
echo4(new HumanCustomer('Lars'));
class Store {
    constructor() {
        this._objects = [];
    }
    add(obj) {
        this._objects.push(obj);
    }
}
class CompressibleStore extends Store {
    compress() {
    }
}
class SearchableStore extends Store {
    find(name) {
        return this._objects.find(obj => obj.name === name);
    }
}
class ProductStore extends Store {
}
class AnotherStore {
    constructor() {
        this._objects = [];
    }
    add(obj) {
        this._objects.push(obj);
    }
    find(property, value) {
        return this._objects.find(obj => obj[property] === value);
    }
}
let anotherStore = new AnotherStore();
anotherStore.add({ name: 'a', price: 1 });
anotherStore.find('name', 'a');
anotherStore.find('price', 1);
let product = {
    name: 'a',
    price: 1
};
let anotherProduct = {
    name: 'a',
    price: 2
};
console.log(anotherProduct);
//# sourceMappingURL=index.js.map