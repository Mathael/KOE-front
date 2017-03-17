import {GameObject} from "./GameObject";
import {Stat} from "./Stat";
import {Coordinate} from "./Coordinate";

export class Hero extends GameObject {
    public stats : Stat[] = [];
    public imageName:string = '';
    public classType:string = null;

    // Patterns
    public movePattern:Coordinate[] = [];
    public attackPattern:Coordinate[] = [];
    public assistancePattern:Coordinate[] = [];

    // Current position on map
    public coordX:number = 0;
    public coordY:number = 0;

    // Specific stats based on BaseStats
    public maxHp: number = 0;
    public maxMp: number = 0;

    // Current stats
    public currentHp:number = 0;
    public currentMp:number = 0;

    // The player owner
    public _owner : string = null;

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
