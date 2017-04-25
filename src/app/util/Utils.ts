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

        // get item stats
        let attackerItemSTR : number = 0;
        let attackerItemDEX : number = 0;

        if(attacker.item) {
            attackerItemSTR = this.getStat('STR', attacker.item.stats).value;
            attackerItemDEX = this.getStat('DEX', attacker.item.stats).value;
        }

        let damage : number = ((attackerSTR + attackerItemSTR) * 3 + 10 + ((attackerDEX + attackerItemDEX) / 2));
        if(damage < 0) damage = 0;

        target.currentHp -= damage;
    }

    /**
     * Algo : INT * 5 + MEN * 5 - CON * 2
     * An assist is a Heal effect
     */
    static handleAssist(effector:Hero, effected:Hero) : void {
        let effectorINT : number = this.getStat('INT', effector.stats).value;
        let effectorMEN : number = this.getStat('MEN', effector.stats).value;
        let effectorCON : number = this.getStat('CON', effector.stats).value;

        // get item stats
        let effectorItemINT : number = 0;
        let effectorItemMEN : number = 0;
        let effectorItemCON : number = 0;

        if(effector.item) {
            effectorItemINT = this.getStat('INT', effector.item.stats).value;
            effectorItemMEN = this.getStat('MEN', effector.item.stats).value;
            effectorItemCON = this.getStat('CON', effector.item.stats).value;
        }

        let amount : number = ((effectorINT + effectorItemINT) * 5 + (effectorMEN + effectorItemMEN) * 5 - (effectorCON + effectorItemCON) * 2);
        if(amount < 0) amount = 0;

        effected.currentHp += amount;
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
