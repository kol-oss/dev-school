'use strict';

// Your job is to group the words in anagrams.
// What is an anagram ?
// star and tsar are anagram of each other because you can rearrange the
// letters for star to obtain tsar.
//
//  Example
// A typical test could be :
// // input
// groupAnagrams(["tsar", "rat", "tar", "star", "tars", "cheese"]);
// // output
// [
//     ["tsar", "star", "tars"],
//     ["rat", "tar"],
//     ["cheese"]
// ]

function groupWordsWithAnagrams(listOfWords) {
    // String(sorted letters) -> Array(words)
    const mapOfAnagrams = new Map();

    for (const word of listOfWords) {
        if (!word) continue;

        const sortedLetters = word.split('').sort();
        const keyOfWord = sortedLetters.join('');

        if (!mapOfAnagrams.get(keyOfWord)) {
            mapOfAnagrams.set(keyOfWord, [word]);
        }
        else {
            mapOfAnagrams.get(keyOfWord).push(word);
        }
    }

    return Array.from(mapOfAnagrams.values());
}

// EXAMPLES
const exampleCases = [
    ["tsar", "rat", "tar", "star", "tars", "cheese"],
    ["radar", "radar", "haram", "abraham", "", ""]
];

for (const exampleData of exampleCases) {
    console.log(groupWordsWithAnagrams(exampleData));
}