'use strict';

const CONFIG = {
    startExpScale: 100,
    maxExpScale: 10000,
    levelChangerExpValue: 100,

    ranksList: [
        "Pushover", "Novice", "Fighter",
        "Warrior", "Veteran", "Sage",
        "Elite", "Conqueror", "Champion",
        "Master", "Greatest"
    ],

    texts: {
        invalidLevel: "Invalid level",
        notStrongEnough: "Not strong enough",

        easyFight: "Easy fight",
        goodFight: "A good fight",
        intenseFight: "An intense fight",
        looseInFight: "You've been defeated"
    }
};

function calculateRankIndex(level) {
    const maxRankIndex = CONFIG.ranksList.length - 1;

    let rankIndex = Math.floor(level / 10);

    if (rankIndex === maxRankIndex && level*100 < CONFIG.maxExpScale) {
        rankIndex = maxRankIndex - 1;
    }
    return rankIndex;
}

function calculateBattlePoints(diffInLevel) {
    let battleExpPoints = 0;

    if (diffInLevel === 0) battleExpPoints = 10;
    else if (diffInLevel === 1) battleExpPoints = 5;
    else if (diffInLevel <= -1) battleExpPoints = 20 * diffInLevel * diffInLevel;

    return battleExpPoints;
}

function getBattleResultText(diffInLevel) {
    let battleResultText = "";

    if (diffInLevel >= 2) battleResultText = CONFIG.texts.easyFight;
    else if (diffInLevel >= 0 && diffInLevel <= 1) battleResultText = CONFIG.texts.goodFight;
    else if (diffInLevel < 0) battleResultText = CONFIG.texts.intenseFight;

    return battleResultText;
}

class Warrior {
    expScale;
    achievementsList;

    constructor() {
        this.expScale = CONFIG.startExpScale;
        this.achievementsList = [];
    }
    level() {
        return Math.floor(this.expScale / CONFIG.levelChangerExpValue);
    }
    experience() {
        return this.expScale;
    }
    rank() {
        const level = this.level();
        const rankIndex = calculateRankIndex(level);

        return CONFIG.ranksList[rankIndex];
    }
    achievements() {
        return this.achievementsList;
    }
    #updateExp(value) {
        const newExpScale = this.expScale + value
        this.expScale = newExpScale >= CONFIG.maxExpScale ? CONFIG.maxExpScale : newExpScale;
    }
    training([trainName, trainExp, trainMinLevel]) {
        const warriorLevel = this.level();
        if (warriorLevel < trainMinLevel) {
            return CONFIG.texts.notStrongEnough;
        }

        this.achievementsList.push(trainName);
        this.#updateExp(trainExp);

        return trainName;
    }
    battle(enemyLevel) {
        if (enemyLevel < 1 || enemyLevel > 100) return CONFIG.texts.invalidLevel;

        // CONVENTION: DIFFERENCE IS WARRIOR - ENEMY
        const warriorLevel = this.level();
        const diffInLevel = warriorLevel - enemyLevel;

        const warriorRankIndex = calculateRankIndex(warriorLevel);
        const enemyRankIndex = calculateRankIndex(enemyLevel);

        const diffInRanks = warriorRankIndex - enemyRankIndex;

        if (diffInRanks <= -1 && diffInLevel <= -5) {
            return CONFIG.texts.looseInFight;
        }

        const battlePoint = calculateBattlePoints(diffInLevel);
        this.#updateExp(battlePoint);

        return getBattleResultText(diffInLevel);
    }
}

// USAGE + EXAMPLES
{
    function logWarriorOptions(warrior) {
        console.log('LEVEL:', warrior.level());
        console.log('EXP:', warrior.experience());
        console.log('RANK:', warrior.rank());
        console.log();
    }

    const warrior = new Warrior();
    logWarriorOptions(warrior);

    const trainResult = warrior.training(["Defeated Chuck Norris", 3000, 1]);
    console.log(trainResult);
    logWarriorOptions(warrior);

    const battleResult = warrior.battle(40);
    console.log(battleResult);
    logWarriorOptions(warrior);
}