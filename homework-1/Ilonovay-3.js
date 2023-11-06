'use strict';

// Your task is to construct a building which will be a pile of n cubes.
// The cube at the bottom will have a volume of n^3, the cube above will
// have volume of (n−1)^3 and so on until the top which will have a volume
// of 1^3.
//
// You are given the total volume m of the building. Being given m can you
// find the number n of cubes you will have to build?
// The parameter of the function findNb (find_nb, find-nb, findNb, ...)
// will be an integer m and you have to return the integer n such as n^3 +
// (n-1)^3 + (n-2)^3 + ... + 1^3 = m if such a n exists or -1 if there is
// no such n.

function findNb(totalVolume) {
    let i = 0;
    let currentVolume = 0;

    while (currentVolume < totalVolume) {
        i++;
        currentVolume += Math.pow(i, 3);
    }

    if (currentVolume === totalVolume) {
        return i;
    }
    else {
        return -1;
    }
}

// EXAMPLES + TESTS
const nbProvedExample = findNb(1071225);
console.log('Number of blocks with volume 1071225:', nbProvedExample);

const nbNotProvedExample = findNb(91716553919377);
console.log('Number of blocks with volume 91716553919377:', nbNotProvedExample);

const nbPositiveTest = findNb(9);
console.log('Number of blocks with volume 9:', nbPositiveTest);

const nbNotPositiveTest = findNb(3);
console.log('Number of blocks with volume 3:', nbNotPositiveTest);