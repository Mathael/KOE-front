import {GameObject} from "./GameObject";
import {Stat} from "./Stat";
import {Coordinate} from "./Coordinate";

export class Hero extends GameObject{
    public stats : Stat[]; // Non dynamic stats
    public imageName:string = '';
    public classType:string = null;

    // Patterns
    public movePattern:Coordinate[] = [];
    public attackPattern:Coordinate[] = [];
    public assistancePattern:Coordinate[] = [];

    // Current position on map
    public coordX:number = 0;
    public coordY:number = 0;

    // Current stats
    public currentHP:number = 0;

    // The player owner
    public _owner : string = null;
}
