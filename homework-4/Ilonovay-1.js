'use strict';

class VigenereCipherHelper {
    key;
    alphabet;

    constructor(key, alphabet) {
        this.key = key;
        this.alphabet = alphabet;
    }

    #getIndexFromAlphabet(letter) {
        return this.alphabet.indexOf(letter);
    }

    #getKeyFromLetterIndex(index) {
        const keyLength = this.key.length;

        const keyLetter = this.key[index % keyLength];
        return this.#getIndexFromAlphabet(keyLetter);
    }

    encode(wordToEncode) {
        let resultWord = '';

        for (let i = 0; i < wordToEncode.length; i++) {
            const letter = wordToEncode[i];
            const letterIndexInAlphabet = this.#getIndexFromAlphabet(letter);

            if (letterIndexInAlphabet === -1) {
                resultWord += letter;
                continue;
            }

            const keyIndexInAlphabet = this.#getKeyFromLetterIndex(i);

            const resultLetterIndex = letterIndexInAlphabet + keyIndexInAlphabet;

            const resultIndexInAlphabet = resultLetterIndex % this.alphabet.length;
            resultWord += this.alphabet[resultIndexInAlphabet];
        }

        return resultWord;
    }

    decode(wordToDecode) {
        let resultWord = '';

        for (let i = 0; i < wordToDecode.length; i++) {
            const letter = wordToDecode[i];
            const letterIndexInAlphabet = this.#getIndexFromAlphabet(letter);

            if (letterIndexInAlphabet === -1) {
                resultWord += letter;
                continue;
            }

            const keyIndexInAlphabet = this.#getKeyFromLetterIndex(i);

            const resultLetterIndex = letterIndexInAlphabet - keyIndexInAlphabet;
            const resultIndexInAlphabet = resultLetterIndex >= 0 ? resultLetterIndex : this.alphabet.length + resultLetterIndex;

            resultWord += this.alphabet[resultIndexInAlphabet];
        }

        return resultWord;
    }
}

// USAGE + EXAMPLES
{
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const key = 'password';

    const helper = new VigenereCipherHelper(key, alphabet);

    // EXAMPLES
    const exampleCases = ['codewars', 'CODEWARS'];

    for (const exampleData of exampleCases) {
        const encoded = helper.encode(exampleData);
        const decoded = helper.decode(encoded)

        console.log(`${exampleData} =e> ${encoded} =d> ${decoded}`);

    }
}