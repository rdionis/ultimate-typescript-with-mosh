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
let user2: [number, string] = [1, 'Mosh']
// let user: [number, string] = ['1', 'Mosh'] // this throws the ERROR: Type 'string' is not assignable to type 'number'.
// let user: [number, string] = [1, 'Mosh', 2] // this throws the ERROR: Source has 3 element(s) but target allows only 2.
// here we can also access completion for the respective type methods
user2[1].length // we see all the methods of the string objects
user2.find // we see all the methods of the array objects

// BUT... it allows the .push method, which adds elements to the array (which is not supposed to be allowed in a tuple)
user2.push(1); // this is a gap in TS

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
// let phone = <HTMLInputElement>document.getElementById('phone')
// phone.value

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

// typeof only works with primitive types (nummer, string, boolean, ...), but if we have customed objects created with classes, we have to use 'instanceof'

//     if (document instanceof WordDocument)


//     document.move();
//     document.fly();
//     document.whateverWeWant()
// }
// tsc is saying "Object is of type 'unknown'", meaning the compiler does not know about the type of the document and he does not know what methods are there in the object – this is when we can use type narrowing/type call

// using the unknown type is preferred to using the 'any' type, because the compiler forces us to do some type checking to make sure the methods we are calling exist on the target object 


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

// reject('...')
// processEvents();
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

// An OBJECT is a unit that contains:

// • data aka state (properties)
// • operations aka behaviour (methods)

// Example: 

// PERSON
// properties: (variables that only exist inside the Person Object)
// • name
// • email

// methods: (these are functions inside the Person Object)
// In Object-Oriented Programming, we refer to these functions as methods. A method is a function inside an object.
// • talk()
// • dance()

// Each Object is responsible for a single task. 


// ******* Classes *******

// A Class is a blueprint for creating objects – it is like an object factory
// uses Pascal naming notation


// this is how we create a Class in TypeScript:
class Account {
    // readonly id: number;
    // owner: string;
    // private _balance: number;
    nickname?: string; // by adding a '?', we make this property optional and we don't need to add it in the constructor


    // To initialize an object's properties, we need to create a constructor. A CONSTRUCTOR is a special function or a special method inside a class that is used for initializing an object

    // Without the constructor, we get erros like 'Property 'balance' has no initializer and is not definitely assigned in the constructor'

    constructor(
        public readonly id: number,
        public owner: string,
        private _balance: number) {
        // this method cannot have a return type annotation, because it should always return an instance of Account – 'constructor Account(id: number, owner: string, balance: number): Account' | this construcotr always returns an instance of Account

        // in this method, we type 'this' to reference the current class
        // this is how we can initialize the properties related to the parameters declared in the constructor:
        // this.id = id;
        // this.owner = owner;
        // this._balance = _balance;
        // every time we create a class in TypeScript, we have to repeat this pattern: create a constructor with a bunch of parameters, and write the proper initialization code in that constructor – THIS IS VERY REPETITIVE and TS offers a BETTER WAY
    }

    // in this class, we can also have methods:
    deposit(amount: number): void {
        if (amount <= 0)
            throw new Error('Invalid amount');
        // record a transaction
        this._balance += amount
    }

    // private calculateTax() {


    // getBalance(): number { // this solution is valid, but there is a better way
    get balance(): number { // this is called a GETTER: a 'getter' is a method inside a Class that we use for getting the value of a property 
        return this._balance
    }

    // set balance(value: number) {
    //     if (value < 0)
    //         throw new Error('Invalid value');
    //     this._balance = value
    // }
}
// once we have a Class, we can create an object using that class:

// using the 'new' operator, we can create an instance or an object from an existing class

let account = new Account(1, 'Mosh', 0);
account.deposit(150);
// console.log(account._balance); // returns '100' // after set to private: 'Property '_balance' is private and only accessible within class 'Account'.ts(2341)'
console.log(account); // returns 'Account { id: 1, owner: 'Mosh', balance: 100 }'
console.log(typeof account); // 
console.log(account instanceof Account); // this is a boolean expression // returns 'true'

// if we are using a type guard to narrow down a type and you are dealing with a custom object, we should always use the 'instanceof' operator instead of the 'typeof' operator

// in TS we have MODIFIERS that we can apply to our properties to help us write more robust code:

// READONLY modifier and OPTIONAL properties
// if we add the 'readonly' keyword to a property, we can only set the property in the constructor and it is not possible to reset it anywhere else | we will get a compilation error if we try

// account.id = 0 // This returns a compilation error: 'Cannot assign to 'id' because it is a read-only property.ts(2540)'


// ACCESS CONTROL MODIFIERS

// • public
// • private 
// • protected (will be talked about later on)

// when we declare properties, they are 'public' by default, so we don't have to use the 'public' keyword
// if a property is set to 'private', we can not access it from outside of the Account class, but only within this class.
// DO NOT USE private properties to store sensitive data, like passwords and so on

// by convention, when using the 'private' keyword, we add a '_' to the property name

// console.log(account.getBalance());
console.log(account.balance); // because we habe a 'getter', we can access the balance method like this
// account.balance = 500// but we cannot set it // 'Cannot assign to 'balance' because it is a read-only property.ts(2540)'


// PROPERTY PARAMETERS
// GETTERS AND SETTERS

// INDEX SIGNATURES – are used for creating properties dynamically in TS

// in JS, we can create an empty object and add properties to it dynamically, but this is not possible in TS, because TS is very strict about the shape of objects. So in situations where we need to add properties to objects dynamically, we need to use INDEX SIGNATURES

// Let's say we are building a ticketing app for concerts and for each concert we wanna know who is sitting where 

class SeatAssignment {

    // seats – A1, A2, ...
    // audience members – Mosh, John, ...

    // we don't want to define individual properties like:
    // A1: string;
    // A2: string;
    // It is very repetitive

    [seatNumber: string]: string; // this is an INDEX SIGNATURE property
}

let seats = new SeatAssignment();
seats.A1 = 'Mosh' // same as: seats.['A1'] = 'Mosh'
// seats.A2 = 1 // compilation error: Type 'number' is not assignable to type 'string'.ts(2322)


// STATIC PROPERTIES – a static property is a property that belongs to a class and not an object

// creating a ride sharing application like Uber
class Ride {

    // in this class, we can have properties like: passenger, pickUpLocation, dropOffLocation, ...

    // we want to know how many active rides we have in our system:

    private static _activeRides: number = 0; // by adding the keyword 'static', this property is set to belong to the 'Ride' class and not to the 'ride' object

    start() { Ride._activeRides++; };
    stop() { Ride._activeRides--; };

    static get activeRides() {
        return Ride._activeRides
    }
}

let ride1 = new Ride();
ride1.start();

let ride2 = new Ride();
ride2.start();
ride2.stop();

console.log(Ride.activeRides);


// INHERITANCE – a mechanism that allows us to reuse our code 
// sometimes, we deal with classes that have common properties, so we want to put them in a separate class that can be reused

// Parent / Base / Super Class
// Child / Derived Sub Class 

class Person {
    constructor(
        public firstName: string,
        public lastName: string) {
    }

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    protected walk() {
        console.log('Walking');

    }
}

class Student extends Person { // the Student class will inherit everything that is part of the Person class
    constructor(
        public studentId: number,
        firstName: string,
        lastName: string) { // 'Constructors for derived classes must contain a 'super' call.ts(2377)'

        super(firstName, lastName)
    }
    takeTest() {
        this.walk()
        console.log('Taking a test.');
    }
}

let student = new Student(1, 'John', 'Krasinski')
console.log(student);

// METHOD OVERRIDING – overriding = change its implementation
// sometimes, we want to change something in the inherited properties

// on the Teacher class, we want to change the implementation of the 'fullName' getter
class Teacher extends Person {
    // because I dont want to add any properties, this code enough to just inherit the constructor from the 'Person' class

    override get fullName() { // we are overriding this method as set on the 'Person' class
        // this 'override' can be implicit but it is best practice to keep it explicit by enabling "noImplicitOverride": true, /* Ensure overriding members in derived classes are marked with an override modifier. */
        // if we ommit the 'override' keyword, we will get a compilation error: "This member must have an 'override' modifier because it overrides a member in the base class 'Person'.ts(4114)"


        return 'Professor ' + super.fullName;
    }
}

let teacher = new Teacher('John', 'Smith');
console.log(teacher.fullName);


// POLYMORPHISM – one of the core principles of object-oriented programming (polymorphism = many forms)

// an object can take many different forms

// OPEN CLOSED PRINCIPLE – our classes should be open for extension and closed for modification: we should be able to extend them or inherit from them, but we should not modify them // polymorphism allows us to follow this guidelin

class Principal extends Person {

    override get fullName() {
        return 'Principal ' + super.fullName;
    }
}



printNames([
    new Student(1, 'John', 'Matthews'),
    new Teacher('Mosh', 'Hamedani'),
    new Principal('Steven', 'Andrews')
])

function printNames(people: Person[]) {
    for (let person of people)
        console.log(person.fullName);

}

// PRIVATE VS. PROTECTED MEMBERS

// protected members are inherited, but private members are not // AVOID USING PROTECTED MEMBERS – Mosh only mentioned them in case we see them in other people's code

// ABSTRACT CLASSES AND METHODS

// ABSTRACT CLASSES

// if we want to make it impossible to create an instance of the Shape Class, we must mark this class as 'abstract'
// an abstract class is like an uncooked meal, it is not ready

// Base Class
abstract class Shape {
    // with the 'abstract' keyword, we are telling TS that this class is 'abstract' or 'simple' or 'not ready', so another class (like Circle) has to extend it
    constructor(public color: string) { }

    abstract render(): void; // abstract methods can only exist inside abstract classes
}

class Circle extends Shape {
    constructor(public radius: number, color: string) {
        // here, we don't need to add the 'public' keyword, because we already defined this property in the base class
        super(color) // we use the 'super' keyword to call the constructor from the base and pass the color
    }
    override render() {
        // when we type 'render' and press Enter, VSCode automatically adds the 'override' keyword, so we don't need to remember to add it        
        console.log('Rendering a circle')
    }
}

// let shape = new Shape('red')
// shape.render()
// this is possible with the current implementation (without abstract), but it makes no sense, since a shape is not a real thing – THIS IS WHY WE USE ABSTRACT CLASSES AND METHODS
// if we want to make it impossible to create an instance of the Shape Class, we must mark this class as 'abstract'

// After adding the 'abstract' keyword, when we try to add an instance of the Shape class, like so:
// let shape = new Shape('red')
// shape.render()
// ... it will return the following compilation error: 'Cannot create an instance of an abstract class.ts(2511)'


// ABSTRACT METHODS

// they can only exist inside abstract classes – if we remove the 'abstract' from the base class (line 607), we will get the following compilation error: 'Abstract methods can only appear within an abstract class.ts(1244)'

// these are methods that have no implementation – there is really no way for us to implement them, just like the 'render()' method in line 611, so we need to mark it as 'abstract' as well, remove the curly braces and end the line with ';', and annotate the return type as 'void' in order to steer clear of further compilation errors, which we would get otherwise:
//'Method 'render' cannot have an implementation because it is marked abstract.ts(1245)'
// "'render', which lacks return-type annotation, implicitly has an 'any' return 

// the 'abstract' will not show up in the JS file after compilation, because it is purely a TS concept that has no representation in JS


// INTERFACES

// an interface is another building block in Object-oriented Programming
// the purpose of an interface is to define the shape of objects

// abstract class Calendar {
//     constructor(public name: string) { }

//     abstract addEvent(): void;
//     abstract removeEvent(): void;
// }
//there is a better way to do this:
interface Calendar { // we can prefix it with a capital 'I' if we want to
    // here, we will define the shape of every calendar object
    name: string;
    addEvent(): void;
    removeEvent(): void;
}
// this new implementation is shorter and more concise

// In JS, we don't have interfaces, so this interface that we defined here is purely used by the TS compiler for type-checking.

// So should we use an abstract class or an interface? It depends:

//  • use an interface – when the class is not providing any logic or algorithm that subclasses can reuse | it just has method declarations(interfaces cannot have method implementations – we only specify the signature of our methods)

//  • use an abstract class – when you have some logic, some algorithm with a few lines of code to share amongst subclasses

interface CloudCalendar extends Calendar { // inherits all members of the Calendar interface and add something extra
    sync(): void;
}
// at some point, we need concrete calendar implementations like Google Calendar:
class GoogleCalendar implements Calendar {
    // clickling on Ctrl + . adds the following interface implementation automatically
    constructor(public name: string) { }
    addEvent(): void {
        throw new Error("Method not implemented.");
    }
    removeEvent(): void {
        throw new Error("Method not implemented.");
    }
}
// so now we have a class that implements the calendar interface

// In TypeScript, interfaces and type aliases can be used interchangeably. 


// ******* GENERICS *******

// in this section, we'll talk about creating generic and reusable types:

// • Generic classes
// • Generic functions
// • Generic interfaces
// • Generic constraints
// • Type mapping


// problems Generics try to solve


class KeyValuePair {
    constructor(
        public key: number,
        public value: string
    ) { }
}

let pair = new KeyValuePair(1, 'Apple')
// let pair = new KeyValuePair('1', 'Apple') // if we try to assign a string to the 'key' property here, we get a compilation error: 'Argument of type 'string' is not assignable to parameter of type 'number'.ts(2345)'
// 2 possible solutions:
// 1. use the 'any' type for the key – 'public key: any,' – NOT RECOMMENDED (we should avoid using 'any' as much as possible, since it takes away type safety – we have neither type-checking nor intellisense; we don't see the properties and methods available in this 'key' object  )

// 2. duplicate the class:
// But this implementation is redundant and endless
class StringKeyValuePair {
    constructor(
        public key: string,
        public value: string
    ) { }
}

let anotherPair = new StringKeyValuePair('1', 'Apple')

// To solve this, we need a generic: common and reusable solution

// GENERIC CLASSES

// after the class name, we type one or more generic type parameters between angle brackets <>
// we can name it anything, but 'T' is a very common name that comes from C++
// 'T' is short for 'Template'
// in C++, we refer to these classes as Template Classes
// Generic Classes in TS are the same as Template Classes in C++
class AnotherKeyValuePair<K, V> { // here, we defined a generic type parameter
    // '<T, U>' or '<TKey, TValue>' are other valid naming possibilities for the generic type parameters
    constructor(
        public key: K, // we change the 'key' type to 'K'
        public value: V
    ) { }
}
// now, when creating a new 'AnotherKeyValuePair', object, we need to supply two generic type arguments:
let yetAnotherPair = new AnotherKeyValuePair<number, string>(1, 'a');

// pair.key. // will show us all the properties and methods of string objects – we get type safety, intellisense and haven't duplicated our code – we have ONE GENERIC and REUSABLE class

// if we don't supply the generic type arguments in line 748, the compiler can infer the type of 'key' and 'value' – this means that most of the time, we don't need to explicitly supply generic type arguments:
// let yetAnotherPair = new AnotherKeyValuePair(1, 'a') // the compiler knows that 'key' is of type 'number' and 'value' is of type 'string'


// GENERIC FUNCTIONS or METHODS

// function wrapInArray(value: number) { 
// let numbersArray = wrapInArray('1') // if we pass a string here, we get a compilation error

// to make this function generic/reusable:
// right after the function's name, we type a generic type parameter like '<T>' and then use that as the type of 'value'
function wrapInArray<T>(value: T) {
    return [value]
}
let numbersArray = wrapInArray('1') //  if we pass a string, we get a string array
let anotherNumbersArray = wrapInArray(2) //  if we pass a number, we get a number array
console.log(anotherNumbersArray)

// we can also put the function from line 763 inside a class
// we need to remove the 'function' keyword, since we only use it for defining stand-alone functions

class ArrayUtils {

    static wrapInArray<T>(value: T) {
        return [value]
    }
}

// let utils = new ArrayUtils() // we don't need to create this 'utils' object if the wrapInArray method is set to 'static' inside the 'ArrayUtils' class, because we know that static methods belong to classes
// let moreNumbers = utils.wrapInArray(1)
let moreNumbers = ArrayUtils.wrapInArray(1)
console.log(moreNumbers)

// GENERIC INTERFACES

// http://mywebsite.com/clients – the 'clients' part is an endpoint for getting the list of clients
// http://mywebsite.com/products – another endpoint for getting the list of products

// here we are defining an interface for presenting the result of calling one of the aforementioned API endpoints
interface Result<T> {
    data: T | null, // we don't want the type to be 'Client' or 'Product' – we want to make it reusable, so we use a generic (we should have the '| null' here too because if we get an error, then we don't have 'data')
    error: string | null // we should add an error here, since we might get an error when calling an API endpoint (we need the '| null' because we won't necessarily get an error)
}

function fetch<T>(url: string): Result<T> {
    console.log(url)
    return {
        data: null,
        error: null // both are 'null' here for simplicity, since atm we don't care about actually calling an API endpoint
    }
}

interface Client {
    username: string,
}

interface Product {
    title: string
}

// fetch() // if we don't type a generic type argument, and simply open (), we get 'fetch(url: string): Result<unknown>'. The TS compiler can not infer the generic type argument for us – we have to explicitly specify it

let resultClient = fetch<Client>('some url') // 'fetch(url: string): Result<User>' (how to read this expression: 'result' of 'user')
// result.data. // intellisense will show us 'username'

let resultProduct = fetch<Product>('some url') // 'fetch(url: string): Result<User>' (how to read this expression: 'result' of 'user')
// result.data. // intellisense will show us 'title'


// GENERIC CONSTRAINTS

function echo<T>(value: T): T {
    return value
}

echo(1) // we can call this function and give it any kind of value – there are no limitations

// how to limit the type of objects that we can pass to this function?


// constrain by type 
function echo1<T extends number | string>(value: T): T {
    return value
}
echo1(1) // we can only pass a value of type 'number' or 'string' here

// constrain by object shape
function echo2<T extends { name: string }>(value: T): T {
    return value
}
echo2({ name: 'Raquel' }) // we can only pass objects that conform to the shape defined in line 839 (an object with a 'name' property of type 'string')

// constrain by interface 
interface HumanPerson {
    name: string
}

function echo3<T extends HumanPerson>(value: T): T {
    return value
}
echo3({ name: 'Raquel' })

// constrain by class

class HumanPerson {
    constructor(
        public name: string
    ) { }
}
// now, we can pass an instance of HumanPerson or any classes that derive from HumanPerson 
class HumanCustomer extends HumanPerson {
}

function echo4<T extends HumanPerson>(value: T): T {
    return value
}
echo4(new HumanPerson('Anna')) // we can pass a new HumanPerson object
echo4(new HumanCustomer('Lars')) // or a new HumanCustomer object
// literally any object that is a 'HumanPerson' = an instance of HumanPerson or any classes that directly or indirectly derive from Person


// EXTENDING GENERIC CLASSES – GENERIC CLASSES AND INHERITANCE

// let's build an e-commerce platform
interface Product {
    name: string,
    price: number
}

// we need a mechanism for storing these objects – we want to be able to store different kinds of objects: products, orders, shopping carts, etc.
// we need an array for storing these objects (line 885)

class Store<T> { // we make this class generic by adding a generic type parameter
    // private _objects: T[] = [] // we initialize this property here directly instead of having it in a constructor, because it makes no sense/is unnecessary to have a new instance of the 'Store' class and give it an empty array [] – so we give the initialization responsibility to the class itself
    //we add the 'private' keyword to 'objects' and rename it to '_objects', so that this array is only accessible inside the class Store

    protected _objects: T[] = [] // so this can be inherited by child classes, we switched it from 'private' to 'protected'

    add(obj: T): void {
        this._objects.push(obj)
    }
}
// 'Store' is a generic class. How can we extend it? Three diferent scenarios:

// 1. Here, we are passing on the generic type parameter:

class CompressibleStore<T> extends Store<T> {
    compress() {

    }
}

// let store = new CompressibleStore<Product>();
// store.compress()

// 2. Here, we are restricting the generic type parameter:
class SearchableStore<T extends { name: string }> extends Store<T> {
    find(name: string): T | undefined {
        return this._objects.find(obj => obj.name === name)
    }

}

// 3. Here, we don't have a generic type parameter, because we are dealing with a very specific store:

class ProductStore extends Store<Product> {
    //filterByCategory(category: string): Product[] {
    //return []
    //}
}


// THE KEYOF OPERATOR
interface AnotherProduct {
    name: string;
    price: number;
}

class AnotherStore<T> {
    protected _objects: T[] = [];

    add(obj: T): void {
        this._objects.push(obj)
    }

    // T is Product
    // keyof T returns 'name' | 'price'
    // the keyof operator returns a union of properties of the given type
    // we can only call either 'name' or 'price' when calling this method

    find(property: keyof T, value: unknown): T | undefined {
        return this._objects.find(obj => obj[property] === value);
    }
}


let anotherStore = new AnotherStore<AnotherProduct>();
anotherStore.add({ name: 'a', price: 1 });
anotherStore.find('name', 'a');
anotherStore.find('price', 1)
// anotherStore.find('nonExistingProperty', 1) // "Argument of type '"nonExistingProperty"' is not assignable to parameter of type 'keyof AnotherProduct'."


// TYPE MAPPING

// sometimes we need to base a type on another type – this is called TYPE MAPPING

interface YetAnotherProduct {
    name: string;
    price: number;
}

// what if, somwhere else in our application, we need a 'yetAnotherProduct' with readonly properties?
// This is where we use Type Mapping.
// We create a new type based on an existing type
// but in this new type, we want to add all the properties from the original type dynamically and make them readonly

type ReadOnlyYetAnotherProduct = { // for type mapping, we need to create a TYPE ALIAS; we cannot use an interface

    // instead of hardcoding the properties, we are going to use:
    // Index Signature – to dynamically add properties
    // keyof Operator – to dynamically get the properties of the 'yetAnotherProduct' type
    readonly [Property in keyof YetAnotherProduct]: YetAnotherProduct[Property]
    // we can use 'Property' or 'P' or 'K'
    // this is similar to a 'for loop'
    // using the 'keyof' operator, we are getting all the keys for properties of 'yetAnotherProduct'
    // using the 'in' operator, we are iterating over these keys
    // and 'Property', in each iteration, is going to hold one the property names in 'yetAnotherProduct'
    // so we are getting all the keys of 'yetAnotherProduct' as well as their type
}

let product: ReadOnlyYetAnotherProduct = {
    name: 'a',
    price: 1
    // these properties are automatically readonly, so we cannot change them later
}
// product.name = 'b' // We get the compilation error: 'Cannot assign to 'name' because it is a read-only property.ts(2540)'

// if we want to use this readonly type for other objects, we can change it into a Generic Type

//type ReadOnly<T> = { // using a generic type parameter
// readonly [K in keyof T]: T[K]
//}

// now, we can create a readonly product, a readonly customer or any kind of object
let anotherProduct: Readonly<YetAnotherProduct> = { // Readonly type is built in to TS
    name: 'a',
    price: 2
    // these properties are automatically readonly, so we cannot change them later
}
console.log(anotherProduct)
// anotherProduct.name = 'f' // compilation error: Cannot assign to 'name' because it is a read-only property.ts(2540)

// using the same technique, we can create a 'YetAnotherProduct' type with all optional properties

type Optional<T> = { // making all the properties optional
    [K in keyof T]?: T[K]
}
// same as Partial<Type>

// similarly, we can create another type and make all the properties nullable

type Nullable<T> = { // para este acho que n há utility type
    [K in keyof T]: T[K] | null
}

// these types are built into TS as utility types: https://www.typescriptlang.org/docs/handbook/utility-types.html


// ******* DECORATORS *******

// allow us to change and enhance our classes

// • What are decorators
// • Class decorators
// • Method decorators
// • Property decorators
// • Accessor decorators
// • Parameter decorators

// What are decorators?
// Decorators are attributes that we apply to our classes and their members, allowing us to change their behaviour.
// They are frequently used in Angular and Vue applications – these frameworks have built-in decorators
// TS does not have any built-in decorators, so we have to create our own

// before we can build in any decorators, we have to enable a special compiler option, because decorators are an experimental feature and their standards and implementation might change in the future: 'Experimental support for decorators is a feature that is subject to change in a future release. Set the 'experimentalDecorators' option in your 'tsconfig' or 'jsconfig' to remove this warning.ts(1219)'

// enabling "experimentalDecorators": true, /* Enable experimental support for TC39 stage 2 draft decorators. */

// decorators use Pascal naming convention

// CLASS DECORATORS

// function Component(constructor: Function) {
//     // depending on where we are going to apply this decorator, the number and type of parameters vary
//     // if we apply to a class, we should have a single parameter that represents the constructor function – we can call it anything, but it is better to call it 'constructor'
//     // what matters is the type –  if the type is a function, the runtime assumes that we are going to apply this decorator on a class and the 'constructor' parameter represents our constructor function
//     // in this decorator function, we have the chance to modify/enhance our class: we can add/change/delete properties and methods
//     console.log('Component decorator called');
//     constructor.prototype.uniqueId = Date.now();
//     constructor.prototype.insertInDOM = () => console.log('Inserting the component in the DOM')
//     // PROTOTYPES – every object in JS has a prototype from which it inherits various properties and methods
// }
// @Component
// under the hood, this decorator is just a function that gets called by JS at runtime
// in this function, we have the chance to modify this class, so we can add new properties, new methods or we can change the implementation of existing methods
// class ProfileComponent {
// every instance of the 'ProfileComponent' is gonna have the new members set in the 'Component' function
// }

// instead of defining a decorator, we could define a base class called 'Component', like so:
// class Component { // base class
//    insertInDOM() { }
// }

//class ProfileComponent extends Component {

// } // this is another way to solve this problem, without using decorators 

// PARAMETERIZED DECORATORS

type ComponentOptions = {
    selector: string
}


// decorator factory – the following function is acting as a factory for creating a decorator
function Component(options: ComponentOptions) {
    return (constructor: Function) => {
        console.log('Component decorator called.')
        constructor.prototype.options = options;
        constructor.prototype.uniqueId = Date.now();
        constructor.prototype.insertInDOM = () => {
            console.log('Inserting the component in the DOM')
        }
    }

}

// @Component({ selector: '#my-profile' }) // we are passing an object as an argument to this decorator
// class ProfileComponent {
// }


// DECORATOR COMPOSITION
// we can also apply multiple decorators to a class or its members

function Pipe(constructor: Function) {
    console.log('Pipe decorator called.')
    constructor.prototype.pipe = true;
}

@Component({ selector: '#my-profile' }) // we are passing an object as an argument to this decorator
@Pipe
// decorators are called in reverse order:
// first, our pipe decorator gets called with the 'ProfileComponent' class and then the result gets passed to the 'Component' decorator
class ProfileComponent {
}


// METHOD DECORATORS

// to apply a decorator to a method, we need three different types of parameters:
// first: the object that owns the target method
// second: the name of the target method
// third: descriptor object for the target method

function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {

    const original = descriptor.value as Function
    descriptor.value = function (...args: any) {
        console.log('Before')
        original.call(this, ...args)
        console.log('After')
    }
}
// in this case, 'any' is the type that the tsc expects from us
// PropertyDescriptor – every property in an object has a descriptor object to describe that property
class SpecialPerson {
    @Log

    say(message: string) {
        console.log('Special Person says ' + message)

    }
}

let specialPerson = new SpecialPerson();
specialPerson.say('Hello')


// ACCESSOR DECORATORS
// decorators that apply to getters and setters 
// very similar to method decorators


function Capitalize(
    target: any,
    methodName: string,
    descriptor: PropertyDescriptor
) {
    const original = descriptor.get;
    descriptor.get = function () {
        // original?.call(this) // here, we are calling the original getter
        // the line above is the shorthand for the following:
        // if (original !== null && original !== undefined)
        //  original.call(this)

        // but since here we will be applying the method to a getter, so we know that 'original' will not be null or undefined, we can type:
        const result = original!.call(this);
        // in the line above, we are telling the compiler: 'I know this is not gonna be null or undefined, so trust me.'
        return (typeof result === 'string') ? result.toUpperCase() : result
    }
}

class AmazingPerson {
    constructor(public firstName: string, public lastName: string) { }

    @Capitalize
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
}

let amazingPerson = new AmazingPerson('raquel', 'dionísio');
console.log((amazingPerson.fullName))


// PROPERTY DECORATORS
// decorators that enhance existing properties
// very similar to method decorators

function MinLength(length: number) {
    // here we are returning the proper decorator function
    return (target: any, propertyName: string) => {

        let value: string;
        // we don't a have a 'PropertyDescriptor' like in method decorators – instead, we define here a property descriptor for the target property:
        const descriptor: PropertyDescriptor = {
            get() {
                return value
            },
            // here we can define a setter for the target property and in that setter we can perform data validation – so if the new value is less than 4 char. long, we can throw an error
            set(newValue: string) {
                if (newValue.length < length) // we specify length in the function declaration (line 1184)
                    throw new Error(`The ${propertyName} should be at least ${length} characters long.`)
                value = newValue
            }
        }
        Object.defineProperty(target, propertyName, descriptor)
    }
}

class SpecialUser {

    @MinLength(4) // here, we want to ensure that our passwords have a minimum length of 4 characters
    password: string;
    constructor(password: string) {
        // here, we can not type 'constructor(public password: string)' and erase line 1186, because we want to apply a decorator to the property itself
        this.password = password
    }
}

let specialUser = new SpecialUser('1234')
// specialUser.password = '1' // this will throw an error
console.log(specialUser.password)

// every time we try to set the password, the decorator gets called and validates the new value


// PARAMETER DECORATORS
// not something you use often

type WatchedParameter = {
    methodName: string,
    parameterIndex: number
}

const watchedParameters: WatchedParameter[] = []
// variable watchedParameters is of type 'WatchedParameter' array and here we initiliaze it to an empty array

function Watch(target: any, methodName: string, parameterIndex: number) {
    watchedParameters.push({
        methodName,
        parameterIndex
    })
}
class Vehicle {
    move(@Watch speed: number) { }
}

console.log(watchedParameters)


// ******* MODULES *******
