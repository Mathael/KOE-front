import {Component, OnInit} from '@angular/core';
import {Case, Hero} from "../../model";
import {Utils} from "../../util";
import {ActionType} from "../../enum";

@Component({
    moduleId: module.id,
    selector: 'app-battlefield',
    templateUrl: './battlefield.component.html',
    styleUrls: ['./battlefield.component.css'],
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

    constructor() {}

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
            this.hidePattern();
            this._selectedHero = null;
            return;
        }

        // This line is needed to let sometime to Angular2 to know that variable has changed
        // Currently it's necessary because we are applying class when this variable != null
        // [class.highligh-hero-card]="_selectedHero && ..."
        this._selectedHero = null;

        if(this._selectedHeroPattern) this.hidePattern();

        this._selectedHero = hero;
        console.log('selectHero', hero);
        this.displayPattern(hero);
    }

    selectCase(selectedCase:Case) : void {
        if(!selectedCase) return;
        this._selectedCase = selectedCase;

        let action:ActionType = this._isFirstPlayerTurn ? this._selectedActionTypeP1 : this._selectedActionTypeP2;

        // Check if hero want to move
        if(this._selectedHero && this._selectedHeroPattern) {
            if(action == ActionType.MOVE && !this._selectedCase._object) {
                if(this._selectedHeroPattern.find((c:Case) => c._name === selectedCase._name)) {
                    this._cases[this._selectedHero.coordX][this._selectedHero.coordY]._object = null;
                    this._selectedHero.coordX = selectedCase._x;
                    this._selectedHero.coordY = selectedCase._y;
                    this._selectedCase._object = this._selectedHero;
                    this._selectedCase = null;
                    // Hide pattern and release selection from current Hero
                    this.hidePattern();
                    this._selectedHero = null;
                }
            } else if(action == ActionType.ASSIST) {
                if(!this._selectedHeroPattern.find((c:Case) => c._name === selectedCase._name)) return;
                let target = this.checkIfCaseContainAllies(selectedCase);
                if(target == null) return;
                Utils.handleAssist(this._selectedHero, target);
            } else if(action == ActionType.ATTACK && this._selectedCase._object) {
                if(!this._selectedHeroPattern.find((c:Case) => c._name === selectedCase._name)) return;
                let target = this.checkIfCaseContainEnnemies(selectedCase);
                if(target == null) return;
                Utils.handleAttack(this._selectedHero, target);
            }
        }
    }

    hidePattern() : void {
        this._selectedHeroPattern.forEach((c) => c._highlightPattern = false);
        this._selectedHeroPattern = null;
    }

    toggleAttackCursor(currentCase:Case) : boolean {
        return (currentCase._object &&
            ((this._isFirstPlayerTurn && currentCase._object._owner != 'player1' && this._selectedActionTypeP1 == ActionType.ATTACK) ||
            (!this._isFirstPlayerTurn && currentCase._object._owner == 'player1' && this._selectedActionTypeP2 == ActionType.ATTACK)) &&
            this._selectedHeroPattern && this._selectedHeroPattern.find(c => c._name === currentCase._name)) || false;
    }

    toggleAssistCursor(currentCase:Case) : boolean {
        return (currentCase._object &&
            ((this._isFirstPlayerTurn && currentCase._object._owner == 'player1' && this._selectedActionTypeP1 == ActionType.ASSIST) ||
            (!this._isFirstPlayerTurn && currentCase._object._owner != 'player1' && this._selectedActionTypeP2 == ActionType.ASSIST)) &&
            this._selectedHeroPattern && this._selectedHeroPattern.find(c => c._name === currentCase._name)) || false;
    }

    isEmptyCase(x, y) : boolean {
        let battlefieldCase = this.getCase(x,y);
        return !battlefieldCase || !battlefieldCase._object;
    }

    getCase(x:number = 0, y:number = 0) : Case | null {
        if(this._cases && this._cases[x] && this._cases[x][y]) return this._cases[x][y];
    }

    getHealth(hero:Hero) : string {
        let percent = (hero.currentHp * 100 / hero.maxHp);
        return (60 / 100 * percent) + 'px'; // 60px = 100%
    }

    checkIfCaseContainEnnemies(sCase:Case) : Hero | null {
        if(!sCase) return null;

        if(!sCase._object) return null;

        if((this._isFirstPlayerTurn && sCase._object._owner != 'player1') ||
            (!this._isFirstPlayerTurn && sCase._object._owner == 'player1'))
            return sCase._object;
        return null;
    }

    checkIfCaseContainAllies(sCase:Case) : Hero | null {
        if(!sCase) return null;

        if(!sCase._object) return null;

        if((this._isFirstPlayerTurn && sCase._object._owner == 'player1') ||
            (!this._isFirstPlayerTurn && sCase._object._owner != 'player1'))
            return sCase._object;
        return null;
    }

    displayPattern(hero:Hero) : void {
        if(!hero) return;
        if(this._selectedHeroPattern) this.hidePattern();

        let currentX = hero.coordX;
        let currentY = hero.coordY;

        let pattern:Case[] = [];
        let action:ActionType = this._isFirstPlayerTurn ? this._selectedActionTypeP1 : this._selectedActionTypeP2;

        switch(action) {
            case ActionType.ASSIST:
            {
                hero.assistancePattern.forEach((pttrn) => {
                    let patternCase = this.getCase(pttrn.x + currentX, pttrn.y + currentY);
                    if(patternCase) {
                        patternCase._highlightPattern = true;
                        pattern.push(patternCase);
                    }
                });
                break;
            }
            case ActionType.ATTACK:
            {
                hero.attackPattern.forEach((pttrn) => {
                    let patternCase = this.getCase(pttrn.x + currentX, pttrn.y + currentY);
                    if(patternCase) {
                        patternCase._highlightPattern = true;
                        pattern.push(patternCase);
                    }
                });
                break;
            }
            default :
            {
                hero.movePattern.forEach((pttrn) => {
                    let patternCase = this.getCase(pttrn.x + currentX, pttrn.y + currentY);
                    if(patternCase && patternCase._object == null){
                        patternCase._highlightPattern = true;
                        pattern.push(patternCase);
                    }
                });
                break;
            }
        }

        this._selectedHeroPattern = pattern;
    }
}
