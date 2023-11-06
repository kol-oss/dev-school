'use strict';

// Your task is to make a function that can take any non-negative integer
// as an argument and return it with its digits in descending order.
// Essentially, rearrange the digits to create the highest possible number.
//
// Examples:
// Input: 42145 Output: 54421
// Input: 145263 Output: 654321
// Input: 123456789 Output: 987654321

function rearrangeDigits(number) {
    const arrayOfNumbers = Array.from(number.toString());

    arrayOfNumbers.sort((a, b) => b - a);

    return Number(arrayOfNumbers.join(''));
}

// EXAMPLES + TESTS
const examples = [
    "42145",
    "145263",
    "123456789",
]

for (const example of examples) {
    console.log(`${example} => ${rearrangeDigits(example)}`);
}
