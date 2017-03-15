import {Component, OnInit, Input} from '@angular/core';
import {Case, Coordinate} from "../../model";

@Component({
    selector: 'app-hero-editor-pattern',
    templateUrl: './hero-editor-pattern.component.html',
    styleUrls: ['./hero-editor-pattern.component.css']
})
export class HeroEditorPatternComponent implements OnInit {

    @Input()
    private _addClass : string = '';

    @Input()
    private _heroPattern : any[] = [];

    private _cases : any[] = [];
    private _displayedClass : string = '';

    constructor() {}

    ngOnInit() {
        for(let i=0; i < 7; i++) {
            this._cases[i] = [];
            for(let j = 0; j < 7; j++) {
                this._cases[i][j] = new Case(i+':'+j, i, j);
            }
        }
    }

    hasPattern(x:number, y:number) : boolean {
        return this._heroPattern.find(coord => coord.x == (x) && coord.y == (y)) != null;
    }

    selectPatternCase(x:number, y:number) : void {
        if(x == 3 && y == 3) return;
        let foundCase = this._heroPattern.find(coord => coord.x == (x) && coord.y == (y));
        foundCase ?
            this._heroPattern.splice(this._heroPattern.indexOf(foundCase), 1) : this._heroPattern.push(new Coordinate(x, y));
    }

    displayColorClass(c:Case) : string {
        return this._displayedClass = this.hasPattern(c._x - 3, c._y - 3) ? this._addClass : '';
    }
}
