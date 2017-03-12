import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Hero} from "../../model";
import {HeroService} from "../../service/hero.service";

@Component({
    moduleId: module.id,
    selector: 'app-hero-selector',
    templateUrl: './hero-selector.component.html',
    styleUrls: ['./hero-selector.component.css'],
    providers: [HeroService]
})
export class HeroSelectorComponent implements OnInit {

    private _heroes:Hero[] = [];
    private _selectedHeroesPlayer1:Hero[] = [];
    private _selectedHeroesPlayer2:Hero[] = [];
    private isFirstPlayerTurn = true;

    @Input()
    public _configuration:any = null;

    @Output()
    private _validation: EventEmitter<any> = new EventEmitter<any>();

    constructor(private heroService:HeroService) {}

    ngOnInit() {
        this.loadHeroes();
    }

    loadHeroes() :void {
        this.heroService.findAll().subscribe(
            heroes => {
                this._heroes = heroes;
            },
            err => console.error(err)
        );
    }

    selectHero(hero:Hero) {
        if(!hero || this.isSelectedByPlayer1(hero) || this.isSelectedByPlayer2(hero)) return;

        if(this.isFirstPlayerTurn){
            hero._owner = 'player1';
            this._selectedHeroesPlayer1.push(hero);
        } else {
            hero._owner = 'player2';
            this._selectedHeroesPlayer2.push(hero);
        }
        this.isFirstPlayerTurn = !this.isFirstPlayerTurn;
    }

    reset() {
        this._selectedHeroesPlayer1 = [];
        this._selectedHeroesPlayer2 = [];
        this.isFirstPlayerTurn = true;
    }

    validate() {
        if(this._selectedHeroesPlayer1.length == this._configuration.maxHeroesPerTeam &&
            this._selectedHeroesPlayer2.length == this._configuration.maxHeroesPerTeam)
            this._validation.emit({
                heroesPlayer1: this._selectedHeroesPlayer1,
                heroesPlayer2: this._selectedHeroesPlayer2
            }
        );
        else console.error('incorrect champion count'); // TODO: show message
    }

    isSelectedByPlayer1(hero:Hero) {
        return this._selectedHeroesPlayer1.find((current) => {
            return current.id == hero.id
        }) || false;
    }

    isSelectedByPlayer2(hero:Hero) {
        return this._selectedHeroesPlayer2.find((current) => {
            return current.id == hero.id
        }) || false;
    }
}
