'use strict';

// The Codewars Council meets at a circular table with n seats. Depending
// on the day d of the month, d people will be chosen as leaders of the
// council. These d leaders are spaced equidistantly from each other on the
// table, like spokes on a wheel. The leaders are chosen based on which
// grouping of d equidistant people have the largest summed honor. The
// honor of the participants for that day in the Council is given in an
// array arr of length n. Return the combined honor of the d leaders of the
// Council.
//
// Given conditions:
// n % d == 0, ie. there will be no invalid cases. All groupings go fully
// around the circle.
// 1 <= d <= 31, as you can't have 32 days in a month.
// n > 0 because you can't have a Council of 0 people. (You also can't have
// a table with 0 open seats, then it's just a nightstand or something)
// You can have negative honor on Codewars (but it is hard to do) and the
// solution may be negative.
// Example:
// [1, 2, 3, 4], 2 -> 6 because max(1+3, 2+4) == 6
// [1, 5, 6, 3, 4, 2], 3 -> 11 because max(1+6+4, 5+3+2) == 11
// [1, 1, 0], 1 -> 1 because max(1, 1, 0) == 1
// Hint:
// Something important to note is that you (usually) don't have to evaluate
// every sum in the array, as after n/d repetitions the sums loop over on
// themselves.

function getMaxHonor(honorList, dayOfMonth) {
    const numberOfGroups = honorList.length / dayOfMonth;
    // Array can be changed by maxSum variable
    // But it was left for understandability
    const honorOfGroups = new Array(numberOfGroups).fill(0);

    for (let i = 0; i < numberOfGroups; i ++) {
        for (let j = i; j < honorList.length; j += numberOfGroups) {
            honorOfGroups[i] += honorList[j];
        }
    }
    return Math.max(...honorOfGroups);
}

// EXAMPLES
const exampleCases = [
    [[1, 2, 3, 4], 2],
    [[1, 5, 6, 3, 4, 2], 3],
    [[1, 1, 0], 1]
];

for (const exampleData of exampleCases) {
    const [list, day] = exampleData;
    console.log(`Result of input [${list}]: ${getMaxHonor(list, day)}`)
}