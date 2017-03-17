import {Hero, Stat} from "../model";

export class Utils {

    // Generate random integer between min and max value
    static getRandomInt(min = 0, max = 100) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Typescript or EcmaScript doesn't support full class cast when retrieve object from API
    // => That's why our class method are converted to utility class

    /**
     * Algo : STR * 3 + 10 + (DEX/2)
     */
    static handleAttack(attacker:Hero, target:Hero) : void {
        let attackerSTR : number = this.getStat('STR', attacker.stats).value;
        let attackerDEX : number = this.getStat('DEX', attacker.stats).value;

        target.currentHp -= (attackerSTR * 3 + 10 + (attackerDEX / 2));
    }

    /**
     * Algo : INT * 5 + MEN * 5 - CON * 2
     * An assist is a Heal effect
     */
    static handleAssist(effector:Hero, effected:Hero) : void {
        let effectorINT : number = this.getStat('INT', effector.stats).value;
        let effectorMEN : number = this.getStat('MEN', effector.stats).value;
        let effectorCON : number = this.getStat('CON', effector.stats).value;

        effected.currentHp += effectorINT * 5 + effectorMEN * 5 - effectorCON * 2;
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
