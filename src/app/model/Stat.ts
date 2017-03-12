export class Stat{
    public sid:string; // String Identifier
    public label:string;
    public value:number;

    constructor(sid:string, name:string, value:number) {
        this.sid = sid;
        this.label = name;
        this.value = value;
    }
}
