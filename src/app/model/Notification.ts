/**
 * Created by LEBOC Philippe on 24/04/2017.
 */
export class Notification {
    public title : string = 'Knights of Elmore';
    public body : string = 'Traitement terminé';
    public icon : string = 'https://goo.gl/3eqeiE';
    public closeDelay : number = 5000;
    public close : Function = null;
    public action : Function = null;
    public show : boolean = false;
}
