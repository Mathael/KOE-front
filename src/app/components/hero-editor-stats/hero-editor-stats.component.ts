import {Component, OnInit, Input} from '@angular/core';
import {Stat} from "../../model/Stat";

@Component({
    selector: 'app-hero-editor-stats',
    templateUrl: './hero-editor-stats.component.html',
    styleUrls: ['./hero-editor-stats.component.css']
})
export class HeroEditorStatsComponent implements OnInit {

    @Input()
    private _stats : any = null;

    @Input()
    private _maxPoints : number = 40;

    @Input()
    private _changeStatFunction : Function = (stats, stat, value) => { stat.value += value; };

    constructor() {}

    ngOnInit() {}

    resetStatsPoints():void{
        this._stats.forEach(stat => stat.value = 0);
    }

    getTotalUsedStatPoints() : number {
        return this._stats.map(stat => stat.value).reduce((a,b) => a + b, 0);
    }
}
