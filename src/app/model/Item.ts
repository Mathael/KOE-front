import {Stat} from "./Stat";
import {SafeUrl} from "@angular/platform-browser";

export class Item {
    public id:string = null;
    public name:string = '';
    public stats : Stat[] = [];

    public image:string = '';
    public imageB64:string = '';
    public imageSafe:SafeUrl = null;

    constructor() {
        this.stats.push(new Stat('STR', 'Force physique', 0));
        this.stats.push(new Stat('CON', 'Vitalité', 0));
        this.stats.push(new Stat('DEX', 'Dextérité', 0));
        this.stats.push(new Stat('INT', 'Intelligence', 0));
        this.stats.push(new Stat('MEN', 'Mental', 0));
    }
}
