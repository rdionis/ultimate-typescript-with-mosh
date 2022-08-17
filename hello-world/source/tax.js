// // @ts-nocheck
// we add this comment once on the top of a file that we don't want the TS compiler to check


// if we type /** */ VSCode will detect it as a JSDoc comment – so we can just press 'Enter' to generate the comment

/**
 * Calculates income tax.
 * // @ param {*} income // we see here we have a parameter called 'income' and between {} we have the type of the parameter
 * // at this point, VSCode does not know the type of this parameter, which is why we have an * here
 * // we have to do that explicitly:
 * @param {number} income
 * // @ returns // here, we can also specify the type of the return value:
 * @returns {number}
 */
// using JSDoc, we can provide type information to our TS compiler, but we can also explain our code – see line 8
export function calculateOtherTax(income) {
    return income * .3
}

// this is a regular JS file, so we cannot use any TS features, like type annotation