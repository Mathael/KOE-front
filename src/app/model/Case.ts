import {GameObject} from "./GameObject";

export class Case {
    public _name: string;
    public _x : number;
    public _y : number;
    public _object : GameObject =  null;
    public _highlight:boolean = false; // Borders colored
    public _highlightPattern:boolean = false; // Background-color

    constructor(name:string, x:number, y:number) {
        this._name = name;
        this._x = x;
        this._y = y;
    }

    clear() {
        this._object = null;
        this._highlight = false;
        this._highlightPattern = false;
    }
}
