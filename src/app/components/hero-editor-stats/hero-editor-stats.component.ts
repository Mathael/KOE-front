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

    changeHeroStatValue(stat:Stat, addValue:number) {
        if(!this._stats || !stat || !addValue) return;
        let total = this._stats.map(stat => stat.value).reduce((a,b) => a + b, 0);
        if(total == 0 && addValue < 0 ||
            total == 40 && addValue > 0 ||
            (stat.value <= 0 && addValue < 0)) {
            return; // TODO: error message
        }
        stat.value += addValue;
    }

    getTotalUsedStatPoints() : number {
        return this._stats.map(stat => stat.value).reduce((a,b) => a + b, 0);
    }
}
