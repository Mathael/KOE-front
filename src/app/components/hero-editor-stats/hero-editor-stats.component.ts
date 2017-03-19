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

    resetStatsPoints():void{
        this._stats.forEach(stat => stat.value = 0);
    }

    changeStatValue(stat:Stat, addValue:number) {
        let total = this.getTotalUsedStatPoints();
        if(total == 0 && addValue < 0 ||
            total == 40 && addValue > 0) {
            return; // TODO: error message
        }

        stat.value += addValue;
    }

    getTotalUsedStatPoints() {
        if(!this._stats) return;
        let sum = 0;
        this._stats.forEach((stat) => sum += stat.value);
        return sum;
    }
}
