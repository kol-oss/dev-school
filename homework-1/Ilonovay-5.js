'use strict';

// In this little assignment you are given a string of space separated
// numbers, and have to return the highest and lowest number.
//
// Examples:
// highAndLow("1 2 3 4 5"); // return "5 1"
// highAndLow("1 2 -3 4 5"); // return "5 -3"
// highAndLow("1 9 3 4 -5"); // return "9 -5"
//
// All numbers are valid Int32, no need to validate them.
// There will always be at least one number in the input string.
// Output string must be two numbers separated by a single space, and
// highest number is first.

function highAndLow(strNumbers) {
    const uniqueNumbers = new Set(strNumbers.split(' '));

    const minimum = Math.min(...uniqueNumbers);
    const maximum = Math.max(...uniqueNumbers);

    return `${maximum} ${minimum}`;
}

// EXAMPLES + TESTS
const examples = [
    "1 9 3 4 -5",
    "-2 -90 -2 -1 -5",
    "1",
    "-1000 1 1 1000"
]

for (const example of examples) {
    console.log(`${example} => ${highAndLow(example)}`);
}