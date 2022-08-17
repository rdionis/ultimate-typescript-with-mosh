// the name of the file should be the same as the corresponding JS file, but the extension should be 'd.ts' ('d' is short for declaration)

// in this declaration file, we declare all the features in our target module 'tax.js'

export declare function calculateOtherTax(income: number): number;
// all we are doing here is declaring this function – the actual implementation is in the target module, in this case, 'tax.js'
// when we type 'export', the TS compiler will know that the 'calculateOtherTax' function expects an 'income' parameter of type 'number'