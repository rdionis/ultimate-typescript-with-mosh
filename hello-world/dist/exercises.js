"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let a = 100;
let b = 'Coffee';
let c = [true, false, false];
let d = { age: 20 };
let e = [3];
let f;
let g = [];
let song = {
    title: 'My song',
    releaseYear: 1992
};
let prices = [100, 200, 300];
let users = [
    {
        name: 'John Smith',
        age: 30,
        occupation: 'Software engineer'
    }, {
        name: 'Kate Müller',
        age: 28
    }
];
let value = 'a';
if (typeof value === 'string')
    console.log(value.toUpperCase());
class Logger {
    constructor(logFile) {
        this.logFile = logFile;
    }
}
class AnotherPerson {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    get fullName() {
        let fullName = `${this.firstName} ${this.lastName}`;
        return fullName;
    }
}
class AnotherEmployee extends AnotherPerson {
    constructor(firstName, lastName, salary) {
        super(firstName, lastName);
        this.salary = salary;
    }
}
let anotherEmployee = {
    name: 'John Smith',
    salary: 50000,
    address: {
        street: 'Flinders st',
        city: 'Melbourne',
        zipCode: 3144,
    },
};
;
function echo5(arg) {
    return arg;
}
function printName(obj) {
    console.log(obj.name);
}
class Entity {
    constructor(id) {
        this.id = id;
    }
}
function Sauce(sauce) {
    return (constructor) => {
        constructor.prototype.sauce = sauce;
    };
}
let Pizza = class Pizza {
};
Pizza = __decorate([
    Sauce('pesto')
], Pizza);
//# sourceMappingURL=exercises.js.map