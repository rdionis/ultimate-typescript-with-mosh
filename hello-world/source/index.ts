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

// in this section, we'll talk about creating generic and reusable types 
