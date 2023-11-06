'use strict';

// Define a function that takes an integer argument and returns a logical
// value true or false depending on if the integer is a prime.
// Per Wikipedia, a prime number ( or a prime ) is a natural number greater
// than 1 that has no positive divisors other than 1 and itself.
// Requirements:
// - You can assume you will be given an integer input.
// - You can not assume that the integer will be only positive. You may be
// given negative numbers as well ( or 0 ).
// - NOTE on performance: There are no fancy optimizations required, but
// still the most trivial solutions might time out. Numbers go up to 2^31 (
// or similar, depending on language ). Looping all the way up to n, or
// n/2, will be too slow.

function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;

    if (number % 2 === 0 || number % 3 === 0) return false;

    for (let i = 5; i < Math.sqrt(number); i += 6) {
        if (number % i === 0 || number % (i+2) === 0) {
            return false;
        }
    }
    return true;
}

// LOG WRAPPER
const logNumberPrimacy = (number) => {
    console.log(`Number ${number} is ${isPrime(number) ? 'prime': 'not prime'}`);
}

// EXAMPLES + TESTS
const primeNumber = 13;
logNumberPrimacy(primeNumber);

const notPrimeNumber = 222;
logNumberPrimacy(notPrimeNumber);

const bigPrimeNumber = 10_000_019;
logNumberPrimacy(bigPrimeNumber);

const bigNotPrimeNumber = 10_000_000_000_5;
logNumberPrimacy(bigNotPrimeNumber);