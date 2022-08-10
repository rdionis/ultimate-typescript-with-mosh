let sales = 123_456_789; // this is the same as 'let sales: number = 123_456_789' *;
// in TS, we can use _ (underscore) to separate and make large numbers more readable
let course = 'Typescript';
let isPublished = true;

//* In TS we don't always have to annotate our variables, because the tsc or TYPESCRIPT COMPILER can infer/detect the TYPE of our variables based on their value

//if you declare a variable but don't assign a value to it, TS will assume the type 'any'
let level;
//the type 'any' lets you change variable types, which defeats the purpose of TS to keep TYPE STABILITY - WE SHOULD AVOID USING THIS TYPE as much as possible
level = 1
level = 'a'

// Parameter 'document' implicitly has a 'any' type
// function render(document) {} - we haven't explicitly annotated the type, so TS infers it
function render(document: any) { //we can also change 'noImplicitAny' to 'false' on the tsconfig file, but IT IS NOT RECOMMENDED
    console.log(document)
}

// ******* ARRAYS *******

let fnumbers = [1, 2, '3'] // this can create problems
// let numbers: number[] = [1, 2, '3'] // this throws an ERROR
let numbers: number[] = [1, 2, 3]
let otherNumbers: number[] = []

//Intelisense
numbers.forEach(number => number.toFixed) //we get code completion here

// ******* TUPELS *******

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


// ******* ENUMS *******

// Enums represent lists of related constants
// const small = 1;
// const medium = 2;
// const large = 3;

// we use PascalCase for Enums
// enum Size { Small, Medium, Large }
// by default, TS attributes the first member of an Enum the value of '0' (zero), the second the value of '1' and son on.
// If we don't want these values, we have to make it explicit

// with strings
enum Sizes { Small = 'S', Medium = 'M', Large = 'L' } // if we use strings, we need to explicitly declare all the values

// with numbers
const enum Size { Small = 1, Medium, Large }; // it is implicit that Medium = 2, Large = 3
// if we define our enums with const, the tsc will generate a more compiled JS code
let mySize: Size = Size.Medium;
console.log(mySize)


// ******* FUNCTIONS *******

// always properly anottate your functions
function calculateTax(income: number, taxYear = 2022): number {
    // we should always specify the type of the return value

    // function calculateTax(income: number, taxYear?: number): number {
    // we can use a '?' if we want to make the parameter optional, but then we have to refactor the function in order for taxYear to not be undefined || we can assign the parameter a default value // if ((taxYear || 2022) < 2022) // this is one option, but not recommendable

    // return 0; // tsc infers the type of the returned value
    // return 'a'; // returns the error: Type 'string' is not assignable to type 'number'
    if (taxYear < 2022)
        return income * 1.2;
    // undefined (undefined is not a number, which will cause a bug, since we set the type of return to be a number)
    return income * 1.3
}
// calculateTax(10_000, 2022, 1); // returns the error: Expected 2 arguments, but got 3 – because you only have two parameters, you can only supply two arguments

calculateTax(10_000) // we can supply only one argument, since one of the two parameters has a default value


// ******* OBJECTS *******

// – in TS we need to annotate the type of each property
// – we can make the properties read-only, by placing the keyword 'readonly' before the property's key name in the annotation
// – we can make the properties optional by placing a '?' after the property's key name in the annotation
// – if we have a method, we should annotate the parameters on that method

let fistEmployee: {
    // sometimes, you want to make some of the properties read-only, so you don't accidentaly change them later on.
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


// ******* TYPE ALIASES *******

// type aliases are costum types
// they use PascalCase
// with type aliases, we have a single place where we define the shape of a particular object and we can reuse this in multiple places

type Employee = {
    readonly id: number,
    name: string,
    retire: (date: Date) => void
}

let employee: Employee = {
    id: 1,
    name: 'Mosh',
    retire: (date: Date) => {
        console.log(date)
    }
}


// ******* UNION TYPES *******

// with union types, we can give a variable or a function parameter more than one type
// we can create a union type by using the union operator, like so '|'

function kgToLbs(weight: number | string): number {
    // Narrowing – we will narrow down this union type into a more specific type
    if (typeof weight === 'number')
        return weight * 2.2
    else
        return parseInt(weight) * 2.2
}
kgToLbs(10);
kgToLbs('10kg')


// ******* INTERSECTION TYPES *******

// using an intersection type, we can combine separate types into a new type

type Draggable = {
    drag: () => void,
}

type Resizable = {
    resize: () => void
}

type UIWidget = Draggable & Resizable // this is an intersection type

let textBox: UIWidget = {

    // to initialize this object, we need to implement all members of Draggable and Resizable
    drag: () => { },
    resize: () => { },
}


// ******* LITERAL TYPES *******

// we use literal types when we want to limit the values we can assign to a variable
// literal = exact or specific value
// let quantity: 50 | 100 = 50; // this would be valid
// let quantity: 50 | 100 = 100; // this would also be valid

// instead of hardcoding these literal values, we can create a custom type using a type alias

type Quantity = 50 | 100;
let quantity: Quantity = 100;

type Metric = 'cm' | 'inch' // lilteral types can also be strings


// ******* NULLABLE TYPES *******

// by default, TS is very strict about using 'null' and 'undefined' values, since they are a common source of bugs in our applications

function greet(name: string | null | undefined) {
    if (name)
        console.log(name.toUpperCase());
    else
        console.log('Olá!');
}

// greet(null) // this is valid JS code, but our program will crash at runtime because you can not call the method .toUpperCase on a null or undefined object – this returns this error: Argument of type 'null' is not assignable to parameter of type 'string'. This happens because in the tsconfig.json: "strict": true, /* Enable all strict type-checking options. */


// ******* OPTIONAL CHAINING *******

// when working with nullable objects, we often have to do null checks

type Customer = {
    birthday?: Date,
};

function getCustomer(id: number): Customer | null {
    return id === 0 ? null : { birthday: new Date() }
}

let customer = getCustomer(1);

//if (customer !== null && customer !== undefined); // this also works, but there is a simpler way;

// Optional property access operator OR optional chaining operator – ?. // the piece of code after this operator only gets executed only if we have a value that is not null or undefined
console.log(customer?.birthday?.getFullYear());

// Optional element access operator – useful when we are dealing with arrays
// if (customers !== null && customers !== undefined); 
//    customers[0]
// this can be simplified like so:
//    customers?.[0]

// Optional call 

let log: any = null
// log('a') // our program would crash because log is null
log?.('a') // this piece of code will be executed only if log is referencing an actual function, otherwise it will be undefined 


// ******* NULLISH COALESCING OPERATOR *******

// when working with null or undefined values, sometimes we need to fall back to a default value

let speed: number | null = null;
let ride = {
    // Falsy values in JS: undefined, null, '', false, 0
    // speed: speed || 30 // if speed is truthy, return that, if not, return 30
    // but in this case, e.g., '0' would be a valid value for speed, so a more accurate way to implement this scenario is by checking for null
    // speed: speed !== null ? speed: 30 // but in TS we have a better way
    // we can simplify this expression with the:
    // Nullish coalescing operator – '??' (it is called 'nullish' because it can refer to a value that is null or undefined)
    speed: speed ?? 30 // if speed is not null nor undefined, use that value, otherwise use 30 as a default value

}

// ******* TYPE ASSERTIONS *******

// sometimes, we know more about the type of an object than TypeScript


// let phone = document.getElementById('phone')

// HTMLElement is a class defined in JavaScript that represents any kind of HTML elements. It is like the base or parent class for other types of elements (like HTMLInputElement, e.g.)

// These type of elements has an extra property called 'value' for reading the value entered by the user.
// However, if we type:
// 'phone.value' // we cannot see this property. This is where we use a type assertion.

// We are telling the TypeScript compiler: 'hey, I know more about the type of this object than you do'.
// let phone = <HTMLInputElement> document.getElementById('phone') as HTMLInputElement // let phone: HTMLInputElement using the 'as' keyword
// phone.value

// alternative to the 'as' keyword to use type assertion
let phone = <HTMLInputElement>document.getElementById('phone')
phone.value

// beware of this, because there is no type conversion happening under the hood


// ******* THE UNKNOWN TYPE *******

// function render(document: any) {
//     document.move();
//     document.fly();
//     document.whateverWeWant()
// this is the problem with the 'any' type
// there will be no type checking regardless of what we call it, so if there is no method with this name, our program is going to crash (errors won't be caught at compile time)
// }

// This is where we use another similar type called 'unknown' 
// If we change the type from 'any' to 'unknown', we immediately get compilation errors

function renderi(document: unknown) {
    // Narrowing
    // if (typeof document === 'string') {
    //     document.toUpperCase() // this does not return a compilation error, because the compiler knows that this 'document' is a string object
    // }

    // typeof only works with primitive types (nummer, string, boolean, ...), but if we have customed objects created with classes, we have to use 'instanceof'

    //     if (document instanceof WordDocument)


    //     document.move();
    //     document.fly();
    //     document.whateverWeWant()
    // }
    // tsc is saying "Object is of type 'unknown'", meaning the compiler does not know about the type of the document and he does not know what methods are there in the object – this is when we can use type narrowing/type call

    // using the unknown type is preferred to using the 'any' type, because the compiler forces us to do some type checking to make sure the methods we are calling exist on the target object 
}

// ******* THE NEVER TYPE *******

// the 'never' type represents values that never occur – it is not used often

function reject(message: string): never { // this is a function that will never return – it always throws an error
    throw new Error(message)
}


function processEvents(): never { // by using the 'never' type, we tell the compiler that this function never returns
    // here we have an infinite loop, meaning this function will never return
    while (true) {
        // read a message from a queue
    }
}

reject('...')
processEvents();
// after we annotate the function return with the 'never' type, the code after this will be greyed out, meaning it will not get executed
// console.log('Hello, world!')
// we know this line of code will never get executed, because the previous line is a function that never returns since we have an infinite loop
// when we disable "allowUnreachableCode": false, the compiler will detect unreachable code 


// ******* OBJECT-ORIENTED PROGRAMMING *******

// Object-oriented programming is one of the many paradigms or styles of programming there are:

// • Procedural
// • Functional
// • Object-oriented
// • Event-driven
// • Aspect-oriented
// • ...

// These programming paradigms are different ways of writing code – they are NOT programming languages. Different programming languages support different programming paradigms.

// In Object-Oriented Programming, OBJECTS are the building blocks of our application


// ******* Classes *******

// A Class is a blueprint for creating objects – it is like an object factory



