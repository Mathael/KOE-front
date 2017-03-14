import {Hero, Stat} from "../model";

export class Utils {

    static getRandomInt(min = 0, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Typescript or EcmaScript doesn't support full class cast when retrieve object from API
    // => That's why our class method are converted to utilities

    /**
     * Algo : 10 + PATK * 3
     */
    static handleAttack(attacker:Hero, target:Hero) : void {
        console.log(attacker.name + ' handleAttack on target ' + target.name);

        let attackerPatk = this.getStat('PATK', attacker.stats);
        target.currentHP -= (10 + attackerPatk.value * 3);
    }

    /**
     * Algo : 5 + MATK * 2
     */
    static handleAssist(effector:Hero, effected:Hero) : void {
        console.log(effector.name + ' handleAssist on target ' + effected.name);

        let effectorMatk = this.getStat('MATK', effector.stats);

        effected.currentHP += 5 + effectorMatk.value * 2;
    }

    /**
     * @param stat Stat
     * @param stats Stat[]
     * @returns {undefined|Stat} retrieve a given stat from a given array of stats
     */
    static getStat(stat:string, stats:Stat[]) : Stat {
        return stats.find(s => s.sid === stat);
    }
}
