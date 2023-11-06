'use strict';

// Given an array arr of strings, complete the function by calculating the
// total perimeter of all the islands. Each piece of land will be marked
// with 'X' while the water fields are represented as 'O'. Consider each
// tile being a perfect 1 x 1 piece of land. Some examples for better
// visualization:
//     ['XOOXO',
//      'XOOXO',
//      'OOOXO',
//      'XXOXO',
//      'OXOOO']
// which represents:
//     should return: "Total land perimeter: 24".
//     Following input:
//     ['XOOO',
//         'XOXO',
//         'XOXO',
//         'OOXX',
//         'OOOO']
// which represents:
//     should return: "Total land perimeter: 18"

const POSITIONS_TO_CHECK = [[0, -1], [-1, 0], [1, 0], [0, 1]];

function getTotalPerimeter(listOfStrings) {
    const height = listOfStrings.length;
    const width = listOfStrings[0].length;

    let totalPerimeter = 0;
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (listOfStrings[i][j] !== 'X') continue;

            let perimeterToAdd = 4;
            for (const [x, y] of POSITIONS_TO_CHECK) {
                const iChanged = i + x;
                const jChanged = j + y;

                if (listOfStrings[iChanged] && listOfStrings[iChanged][jChanged] === 'X') {
                    perimeterToAdd--;
                }
            }

            totalPerimeter += perimeterToAdd;
        }
    }
    return `Total land perimeter: ${totalPerimeter}`;
}

// EXAMPLES
const exampleCases = [
    ['XOOXO', 'XOOXO', 'OOOXO', 'XXOXO', 'OXOOO'], // 24
    ['XOOO', 'XOXO', 'XOXO', 'OOXX', 'OOOO'] // 18
];

for (const listOfStrings of exampleCases) {
    console.log(getTotalPerimeter(listOfStrings));
}