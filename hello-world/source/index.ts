let sales = 123_456_789; // this is the same as 'let sales: number = 123_456_789' *;
// in TS, we can use _ (underscore) to separate and make large numbers more readable
let course = 'Typescript';
let isPublished = true;

//* In TS we don't always have to annotate our variables, because the tsc or TYPESCRIPT COMPILER can infer/detect the TYPE of our variables based on their value

//if you declare a variable but don't initialize it, TS will assume the type 'any'
let level;
//the type 'any' lets you change variable types, which defeats the purpose of TS to keep TYPE STABILITY - WE SHOULD AVOID USING THIS TYPE as much as possible
level = 1
level = 'a'

// Parameter 'document' implicitly has a 'any' type
// function render(document) {} - we haven't explicitly annotated the type, so TS infers it
function render(document: any) { //we can also change 'noImplicitAny' to 'false' on the tsconfig file, but IT IS NOT RECOMMENDED
    console.log(document)
}

// Arrays
let fnumbers = [1, 2, '3'] // this can create problems
// let numbers: number[] = [1, 2, '3'] // this throws an ERROR
let numbers: number[] = [1, 2, 3]
let otherNumbers: number[] = []

// ******  intelisense ******
numbers.forEach(number => number.toFixed) //we get code completion here

// Tupel
// 1, 'Mosh'
let user: [number, string] = [1, 'Mosh']
// let user: [number, string] = ['1', 'Mosh'] // this throws the ERROR: Type 'string' is not assignable to type 'number'.
// let user: [number, string] = [1, 'Mosh', 2] // this throws the ERROR: Source has 3 element(s) but target allows only 2.
// here we can also access completion for the respective type methods
user[1].length // we see all the methods of the string objects
user.find // we see all the methods of the array objects

// BUT... it allows the .push method, which adds elements to the array (which is not supposed to be allowed in a tuple)
user.push(1); // this is a gap in TS

// it is recommended to use TUPLES with only TWO ELEMENTS

// Enum
// const small = 1;
// const medium = 2;
// const large = 3;

// we use PascalCase for Enums
// enum Size { Small, Medium, Large }
// by default, TS attributes the first member of an Enum the value of '0' (zero), the second the value of '1' and son on.
// If we don't want these values, we have to make it explicit

// with strings
enum Sizes { Small = 'S', Medium = 'M', Large = 'L' } // if we use strings, we need to explicitly define all the values

// with numbers
const enum Size { Small = 1, Medium, Large }; // Medium = 2, Large = 3
// if we define our enums with const, the tsc will generate a more compiled code
let mySize: Size = Size.Medium;
console.log(mySize)

// Functions
// always properly anottate your functions
function calculateTax(income: number, taxYear = 2022): number {
    // we should always specify the type of the return value

    // function calculateTax(income: number, taxYear?: number): number {
    // we can use a '?' if we want to make the parameter optional, but then we have to refactor the function in order for taxYear to not be undefined || we can assign the parameter a default value

    // return 0; // tsc infers the type of the returned value
    // return 'a'; // Type 'string' is not assignable to type 'number'
    // if ((taxYear || 2022) < 2022) // this is one option, but not recommendable
    if (taxYear < 2022)
        return income * 1.2;
    // undefined (undefined is not a number, which will cause a bug, since we set the type of return to be a number)
    return income * 1.3
}
// calculateTax(10_000, 2022, 1); // Expected 2 arguments, but got 3
calculateTax(10_000) // because you only have two parameters, you can only supply two arguments

// Objects

let employee: {
    readonly id: number,
    name: string,
    // name?: string // this should be avoided, because it does not make sense conceptually (all employees have a name)
    // making the property optional should be reserved for things that are optional
    // beware of the conceptual logic of the features of TypeScript you use
    retire: (date: Date) => void

} = {
    id: 1,
    name: 'Mosh',
    retire: (date: Date) => {
        console.log(date);

    }
}



// sometimes, you want to make some of the properties read-only, so you don't accidentaly change them later on.