'use strict';

// Your task, is to calculate the minimal number of moves to win the game
// "Towers of Hanoi", with given number of disks.
//
// Towers of Hanoi is a simple game consisting of three rods, and a number
// of disks of different sizes which can slide onto any rod. The puzzle
// starts with the disks in a neat stack in ascending order of size on one
// rod, the smallest at the top, thus making a conical shape.
//
// The objective of the puzzle is to move the entire stack to another rod,
// obeying the following simple rules:
//
// Only one disk can be moved at a time.
// Each move consists of taking the upper disk from one of the stacks and
// placing it on top of another stack i.e. a disk can only be moved if it
// is the uppermost disk on a stack.
// No disk may be placed on top of a smaller disk.

function getMinimumNumber(disks) {
    if (disks <= 0) return 0;
    let steps = 0;

    function move(source, final, diskNumber) {
        if (diskNumber === 1) {
            steps++;
        } else {
            const tempTowerNumber = 6 - source - final;
            move(source, tempTowerNumber, diskNumber - 1);
            steps++;
            move(tempTowerNumber, final, diskNumber - 1);
        }
    }

    move(1, 2, disks);
    return steps;
}

// EXAMPLES + TESTS
const testHanoiTowers = (disks) => getMinimumNumber(disks) === 2**disks - 1;

const examples = [0, 1, 3, 5];
for (let example of examples) {
    console.log(`Test for ${example} disks: ${testHanoiTowers(example) ? 'passed' : 'failed'}`);
}