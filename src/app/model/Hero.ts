import {GameObject} from "./GameObject";
import {Stat} from "./Stat";
import {Coordinate} from "./Coordinate";
import {Item} from "./Item";
import {SafeUrl} from "@angular/platform-browser";

export class Hero extends GameObject {
    // Manage Hero stats
    public stats : Stat[] = [];

    // Specific stats based on BaseStats
    public maxHp: number = 0;
    public maxMp: number = 0;

    // Current dynamic stats
    public currentHp:number = 0;
    public currentMp:number = 0;

    // Manage hero images:
    // - Default images are picked
    // - Uploaded images are stored in Base64
    public image:string = ''; // This variable is the file name

    public imageB64:string = '';
    public iconB64:string = '';
    public imageSafe:SafeUrl = null;
    public iconSafe:SafeUrl = null;

    // The Hero Class (Wizard, Tank, Fighter, ...)
    public classType:string = null;

    // Patterns
    public movePattern:Coordinate[] = [];
    public attackPattern:Coordinate[] = [];
    public assistancePattern:Coordinate[] = [];

    // Current position on map
    public coordX:number = 0;
    public coordY:number = 0;

    // The player owner
    public _owner : string = null;

    // The Hero's owned item
    public item : Item = null;

    // Constructor used to create a new Hero
    constructor(id, name, descr) {
        super(id, name, descr);
        this.stats.push(new Stat('STR', 'Force', 0));
        this.stats.push(new Stat('CON', 'Constitution', 0));
        this.stats.push(new Stat('DEX', 'Dextérité', 0));
        this.stats.push(new Stat('INT', 'Intelligence', 0));
        this.stats.push(new Stat('MEN', 'Mental', 0));
    }
}
