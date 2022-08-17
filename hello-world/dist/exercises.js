"use strict";
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
//# sourceMappingURL=exercises.js.map