'use strict';

class Vector {
    coords;
    #dimensions;

    constructor(coords) {
        this.coords = coords;
        this.#dimensions = coords.length;
    }

    #isDimensionsEqual(vector) {
        if (this.#dimensions !== vector.#dimensions) {
            throw new Error('Vectors have different dimensions');
        }
    }
    add(vectorToAdd) {
        if (!(vectorToAdd instanceof Vector)) return;

        this.#isDimensionsEqual(vectorToAdd);

        const addedVectorCoords = new Array (this.#dimensions);
        for (let i = 0; i < this.#dimensions; i++) {
            addedVectorCoords[i] = this.coords[i] + vectorToAdd.coords[i];
        }

        return new Vector(addedVectorCoords);
    }
    subtract(vectorToSubtract) {
        if (!(vectorToSubtract instanceof Vector)) return;

        this.#isDimensionsEqual(vectorToSubtract);

        const subtractedVectorCoords = [];
        for (let i = 0; i < this.#dimensions; i++) {
            subtractedVectorCoords[i] = this.coords[i] - vectorToSubtract.coords[i];
        }

        return new Vector(subtractedVectorCoords);
    }
    dot(vectorToDot) {
        if (!(vectorToDot instanceof Vector)) return;

        this.#isDimensionsEqual(vectorToDot);

        let dot = 0;
        for (let i = 0; i < this.#dimensions; i++) {
            dot += this.coords[i] * vectorToDot.coords[i];
        }

        return dot;
    }
    norm() {
        let normalizedResult = 0;
        for (let i = 0; i < this.#dimensions; i++) {
            normalizedResult += this.coords[i]**2;
        }

        return Math.sqrt(normalizedResult);
    }
    toString() {
        return `(${this.coords.join(',')})`
    }
    equals(vectorToCompare) {
        if (this.#dimensions !== vectorToCompare.#dimensions) return false;

        for (let i = 0; i < this.#dimensions; i++) {
            if (this.coords[i] !== vectorToCompare.coords[i]) return false;
        }

        return true;
    }
}

// USAGE + EXAMPLES
{
    const firstVector = new Vector([1, 2, 3]);
    const secondVector = new Vector([3, 4, 5]);

    console.log(`[${firstVector.coords}] add [${secondVector.coords}] = ${firstVector.add(secondVector)}`); // (4,6,8)
    console.log(`[${firstVector.coords}] subtract [${secondVector.coords}] = ${firstVector.subtract(secondVector)}`); // (-2, -2, -2)
    console.log(`[${firstVector.coords}] dot [${secondVector.coords}] = ${firstVector.dot(secondVector)}`); // 26
    console.log(`[${firstVector.coords}] norm = ${firstVector.norm()}`); // sqrt(14)
}

