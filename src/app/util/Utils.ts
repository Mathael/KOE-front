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
        let patk = this.getStat('PATK', attacker.stats);
        let targetHealth = this.getStat('HEALTH', target.stats);
        targetHealth.value -= (10 + patk.value * 3);
    }

    static getStat(stat:string, stats:Stat[]) : Stat {
        return stats.find(s => s.sid === stat);
    }
}
