import {Stat} from "./Stat";
import {SafeUrl} from "@angular/platform-browser";

export class Item {
    public id:string = null;
    public name:string = '';
    public stats : Stat[] = [];

    public image:string = '';
    public imageB64:string = '';
    public imageSafe:SafeUrl = null;
}
