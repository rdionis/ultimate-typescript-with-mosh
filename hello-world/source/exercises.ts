
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

