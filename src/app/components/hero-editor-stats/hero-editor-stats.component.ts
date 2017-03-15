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

    constructor() {}

    ngOnInit() {}

    validateStats(stat:Stat):void{
        let pts = this.getTotalUsedStatPoints();
        if(pts > 40) stat.value = 40 - pts;
    }

    resetStatsPoints():void{
        this._stats.forEach(stat => stat.value = 0);
    }

    getTotalUsedStatPoints() {
        if(!this._stats) return;
        let sum = 0;
        this._stats.forEach((stat) => sum += stat.value);
        return sum;
    }
}
