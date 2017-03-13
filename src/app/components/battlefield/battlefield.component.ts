import {Component, OnInit} from '@angular/core';
import {HeroService} from "../../service/hero.service";
import {Case, Hero} from "../../model";
import {Utils} from "../../util/Utils";
import {ActionType} from "../../enum";

@Component({
    moduleId: module.id,
    selector: 'app-battlefield',
    templateUrl: './battlefield.component.html',
    styleUrls: ['./battlefield.component.css'],
    providers: [HeroService]
})
export class BattlefieldComponent implements OnInit {

    private _cases:Case[][] = [];
    // Heroes of player 1
    private _heroesP1: Hero[] = [];
    // Heroes of player 2
    private _heroesP2: Hero[] = [];

    // boolean to manage turn
    private _isFirstPlayerTurn:boolean = true;

    // Players selected actions types
    // These variables have 2 type because we
    private _selectedActionTypeP1:ActionType = ActionType.MOVE;
    private _selectedActionTypeP2:ActionType = ActionType.MOVE;

    // Dynamic properties
    private _selectedHero:Hero = null;
    private _selectedCase:Case = null;
    private _selectedHeroPattern = null;

    constructor(private heroService: HeroService) {}

    ngOnInit() {
        for(let i=0;i<15;i++){
            this._cases[i] = [];
            for(let j=0;j<8;j++) {
                this._cases[i][j] = new Case(i+':'+j, i, j);
            }
        }
    }

    initialize(_heroes:any) : void {
        this._isFirstPlayerTurn = true;
        this._heroesP1 = _heroes.heroesPlayer1;
        this._heroesP2 = _heroes.heroesPlayer2;

        // Heroes are spawn in the battlefield with a random position
        this._heroesP1.forEach((hero) => {
            let x:number;
            let y:number;
            let validCase : boolean = false;

            while(!validCase){
                x = Utils.getRandomInt(0, 1);
                y = Utils.getRandomInt(0, this._cases[0].length - 1);

                if(this.isEmptyCase(x,y)){
                    this._cases[x][y]._object = hero;
                    hero.coordX = x;
                    hero.coordY = y;
                    validCase = true;
                }
            }
        });

        this._heroesP2.forEach((hero) => {
            let x:number;
            let y:number;
            let validCase : boolean = false;

            while(!validCase){
                x = Utils.getRandomInt(this._cases.length-2, this._cases.length-1);
                y = Utils.getRandomInt(0, this._cases[0].length-1);

                if(this.isEmptyCase(x,y)){
                    this._cases[x][y]._object = hero;
                    hero.coordX = x;
                    hero.coordY = y;
                    validCase = true;
                }
            }
        });
    }

    getCurrentPlayerActionType() : ActionType {
        return this._isFirstPlayerTurn ? this._selectedActionTypeP1 : this._selectedActionTypeP2;
    }

    getCurrentPlayerActionTypeToString() : string {
        return ActionType[this.getCurrentPlayerActionType()];
    }

    getActionTypeFromString(str:string) : ActionType {
        return ActionType[str] || ActionType.MOVE;
    }

    highlight(hero:Hero) : void {
        if(!hero) return;

        let heroCase = this._cases[hero.coordX][hero.coordY];
        if(!heroCase || !heroCase._object) return;

        this._cases[hero.coordX][hero.coordY]._highlight = true;
    }

    unHighlight(hero:Hero) : void {
        if(!hero) return;

        let heroCase = this._cases[hero.coordX][hero.coordY];
        if(!heroCase || !heroCase._object) return;

        this._cases[hero.coordX][hero.coordY]._highlight = false;
    }

    changeActionType(actionStr:string, firstPlayer:boolean) : void {
        if(!actionStr) return;

        let action : ActionType = ActionType[actionStr];

        // Prevent player to select the other player icons
        if(this._isFirstPlayerTurn != firstPlayer) return;

        this._isFirstPlayerTurn ? this._selectedActionTypeP1 = action : this._selectedActionTypeP2 = action;

        // Handle change action type when hero is selected
        if(this._selectedHero) this.displayPattern(this._selectedHero);
    }

    selectHero(hero:Hero) : void {
        if(!hero) return;

        // Handle release selection
        if(this._selectedHero && hero.id == this._selectedHero.id) {
            this.hideMovePattern();
            this._selectedHero = null;
            return;
        }

        // This line is needed to let sometime to Angular2 to know that variable has changed
        // Currently it's necessary because we are applying class when this variable != null
        // [class.highligh-hero-card]="_selectedHero && ..."
        this._selectedHero = null;

        if(this._selectedHeroPattern) this.hideMovePattern();

        this._selectedHero = hero;
        console.log('selectHero', hero);
        this.displayPattern(hero);
    }

    selectCase(selectedCase:Case) : void {
        if(!selectedCase) return;
        this._selectedCase = selectedCase;

        let action:ActionType = this._isFirstPlayerTurn ? this._selectedActionTypeP1 : this._selectedActionTypeP2;

        // Check if hero want to move
        if(!this._selectedCase._object && this._selectedHero && this._selectedHeroPattern) {
            if(action == ActionType.MOVE) {
                if(this._selectedHeroPattern.find((c:Case) => c._name === selectedCase._name)) {
                    this._cases[this._selectedHero.coordX][this._selectedHero.coordY]._object = null;
                    this._selectedHero.coordX = selectedCase._x;
                    this._selectedHero.coordY = selectedCase._y;
                    this._selectedCase._object = this._selectedHero;
                    this._selectedCase = null;

                    // Hide pattern and release selection from current Hero
                    this.hideMovePattern();
                    this._selectedHero = null;
                }
            } else if(action == ActionType.ASSIST) {
                console.log('assist required on case (' + selectedCase._x + ', ' + selectedCase._y + ')')
            } else if(action == ActionType.ATTACK) {
                console.log('Attack required on case (' + selectedCase._x + ', ' + selectedCase._y + ')')
            }
        }
    }

    hideMovePattern() : void {
        this._selectedHeroPattern.forEach((c) => c._highlightPattern = false);
        this._selectedHeroPattern = null;
    }

    isEmptyCase(x, y) : boolean {
        let battlefieldCase = this.getCase(x,y);
        return !battlefieldCase || !battlefieldCase._object;
    }

    getCase(x:number = 0, y:number = 0) : Case | null {
        if(this._cases && this._cases[x] && this._cases[x][y]) return this._cases[x][y];
    }

    getHeroMovePatternsCases(hero:Hero): Case[] | null {
        if(!hero) return;

        let currentX = hero.coordX;
        let currentY = hero.coordY;

        let results:Case[] = [];

        // Currently we consider the normal Pattern only
        hero.movePattern.forEach((pattern) => {
            let patternCase = this.getCase(pattern.x + currentX, pattern.y + currentY);
            if(patternCase && patternCase._object == null){
                results.push(patternCase);
            }
        });

        return results;
    }

    getHeroAssistPatternsCases(hero:Hero): Case[] | null {
        if(!hero) return;

        let currentX = hero.coordX;
        let currentY = hero.coordY;

        let results:Case[] = [];

        // Currently we consider the normal Pattern only
        hero.assistancePattern.forEach((pattern) => {
            let patternCase = this.getCase(pattern.x + currentX, pattern.y + currentY);
            if(patternCase && patternCase._object == null){
                results.push(patternCase);
            }
        });

        return results;
    }

    getHeroAttackPatternsCases(hero:Hero): Case[] | null {
        if(!hero) return;

        let currentX = hero.coordX;
        let currentY = hero.coordY;

        let results:Case[] = [];

        // Currently we consider the normal Pattern only
        hero.attackPattern.forEach((pattern) => {
            let patternCase = this.getCase(pattern.x + currentX, pattern.y + currentY);
            if(patternCase && patternCase._object == null){
                results.push(patternCase);
            }
        });

        return results;
    }

    // @Deprecated
    displayHeroPattern(hero:Hero) : void {
        if(!hero) return;
        let pattern:Case[] = this.getHeroMovePatternsCases(hero);
        pattern.forEach((c) => c._highlightPattern = true);
        this._selectedHeroPattern = pattern;
    }

    displayPattern(hero:Hero) : void {
        if(!hero) return;
        if(this._selectedHeroPattern) this.hideMovePattern();

        let pattern:Case[] = [];
        let action:ActionType = this._isFirstPlayerTurn ? this._selectedActionTypeP1 : this._selectedActionTypeP2;
        switch(action) {
            case ActionType.ASSIST: pattern = this.getHeroAssistPatternsCases(hero); break;
            case ActionType.ATTACK: pattern = this.getHeroAttackPatternsCases(hero); break;
            default : pattern = this.getHeroMovePatternsCases(hero); break;
        }

        pattern.forEach((c) => c._highlightPattern = true);
        this._selectedHeroPattern = pattern;
    }
}
