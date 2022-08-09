
// ******* EXERCISES *******

// •For each of these values, what type will the TypeScript compiler infer?

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

//function myFunc(a: number, b: number): number { } // there is no return value – A function whose declared type is neither 'void' nor 'any' must return a value.



// Given the data below, define a type alias for representing users.

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

let user = getUser();
console.log(user?.address?.street);

let x = foo ?? bar()


// • What is the problem in this piece of code?

let value: unknown = 'a';
if (typeof value === 'string')
    console.log(value.toUpperCase());

// we get a compilation error since the method 'toUpperCase' can't be called on a type unknown object – we need to use 'narrowing'