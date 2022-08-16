
// ******* EXERCISES *******

// • For each of these values, what type will the TypeScript compiler infer?

let a = 100; // number
let b = 'Coffee'; //string
let c = [true, false, false]; // boolean[] – array of booleans
let d = { age: 20 }; // {age: number}
let e = [3]; // number[]
let f; // any
let g = []; // any[]

// •What are the compilation errors in each of the following code snippets?
let song: {
    title: string,
    releaseYear: number
} = {
    title: 'My song',
    releaseYear: 1992
}; // releaseYear was missing

let prices = [100, 200, 300];

// prices[0] = '$100'; // this can't be a string – Type 'string' is not assignable to type 'number'

// function myFunc(a: number, b: number): number { } // there is no return value – A function whose declared type is neither 'void' nor 'any' must return a value.



// • Given the data below, define a type alias for representing users.

type User = {
    name: string,
    age: number,
    occupation?: string,
}

let users: User[] = [
    {
        name: 'John Smith',
        age: 30,
        occupation: 'Software engineer'
    }, {
        name: 'Kate Müller',
        age: 28
    }
];

// • Birds fly. Fish swim. A Pet can be a Bird or Fish. Use type aliases to represent these


type Bird = {
    fly: () => void,
}

type Fish = {
    swim: () => void,
}

type Pet = Bird | Fish

// • Define a type for representing the days of week. Valid values are “Monday”, “Tuesday”, etc.

type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

// • Simplify the following code snippets:

// let user = getUser();
// console.log(user?.address?.street);

// let x = foo ?? bar()


// • What is the problem in this piece of code?

let value: unknown = 'a';
if (typeof value === 'string') // narrowing
    console.log(value.toUpperCase());

// we get a compilation error since the method 'toUpperCase' can't be called on a type unknown object – we need to use 'narrowing'


// •Define a class called Logger that takes the name of a file in its constructor and provides a method for writing messages to that file. Don’t worry about the actual file I/O operations. Just define the class with the right members. 

class Logger {
    constructor(public logFile: string) { }
    // log(message: string) { }
}




// • Given the Person class below, create a getter for getting the full name of a person.

class AnotherPerson {
    constructor(
        public firstName: string,
        public lastName: string) { }

    get fullName(): string {
        let fullName = `${this.firstName} ${this.lastName}`;
        return fullName
    }
}

// • Create a new class called Employee that extends Person and adds a new property called salary.

class AnotherEmployee extends AnotherPerson {
    constructor(
        firstName: string,
        lastName: string,
        public salary: number
    ) {
        super(firstName, lastName)
    }
}
// • What is the difference between private and protected members?

// Protected members are inherited by child classess and private members are not.

// • Given the data below, define an interface for representing employees:

let anotherEmployee = {
    name: 'John Smith',
    salary: 50_000,
    address: {
        street: 'Flinders st',
        city: 'Melbourne',
        zipCode: 3144,
    },
};

interface Address {
    street: 'Flinders st',
    city: 'Melbourne',
    zipCode: 3144,
};

interface AnotherEmployee {
    name: string;
    salary: number;
    address: Address
}


// GENERICS

// • Convert the function below to a generic function:
function echo5<T>(arg: T): T {
    return arg;
}

// • When compiling the following piece of code, we get an error saying ‘Property name does not exist on type T’. How can we solve this problem?



// We need to apply a constraint on the generic type parameter so the TypeScript compiler knows that objects of type T have a name property:

function printName<T extends { name: string }>(obj: T) {
    // constraint by object shape
    console.log(obj.name);
}

// • An Entity should have a unique identifier. The type of identifier, however, is dependent on the use case. In some cases, the ID might be a number, in other cases, it might be a string, GUID, etc. Represent the entity using a generic class.

class Entity<T> {
    constructor(
        public id: T
    ) { }
}


// • Given the following interface, what does keyof User return?
interface User1 {
    userId: number;
    username: string;
}

// keyof User1 returns a union of the properties of User1 'userId' | 'username'