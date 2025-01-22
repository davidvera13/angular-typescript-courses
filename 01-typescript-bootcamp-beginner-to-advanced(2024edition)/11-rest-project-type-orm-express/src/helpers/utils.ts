
export function isInteger(input:string) {
    // why ?
    // parseInt("abs123") returns NaN
    // parseInt("123abc") returns 123
    return input?.match(/^\d+$/) ?? false;
}