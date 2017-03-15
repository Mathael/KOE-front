import {GameObject} from "./GameObject";
import {Stat} from "./Stat";
import {Coordinate} from "./Coordinate";

export class Hero extends GameObject{
    public stats : Stat[];
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
}
