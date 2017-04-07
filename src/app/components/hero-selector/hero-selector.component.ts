import {Component, OnInit, Output, EventEmitter, Input, ViewChild, ElementRef} from '@angular/core';
import {Hero} from "../../model";
import {HeroService} from "../../service";
import {Constants} from '../../util';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    moduleId: module.id,
    selector: 'app-hero-selector',
    templateUrl: './hero-selector.component.html',
    styleUrls: ['./hero-selector.component.css'],
    providers: [HeroService]
})
export class HeroSelectorComponent implements OnInit {

    // All heroes
    private _heroes:Hero[] = [];

    // selected heroes containers
    private _selectedHeroesPlayer1:Hero[] = [];
    private _selectedHeroesPlayer2:Hero[] = [];

    // Variable used to display or hide the error message
    private _displayError:boolean = false;

    // Variable used to switch between Player 1 and Player 2 selection
    private isFirstPlayerTurn:boolean = true;

    @Input()
    public _configuration:any = null;

    @Output()
    private _validation: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('errors')
    private _errorContainer: ElementRef = null;

    constructor(private heroService:HeroService, private sanitizer: DomSanitizer) {}

    ngOnInit() : void {
        this.loadHeroes();
        this._errorContainer.nativeElement.innerHTML = Constants.MAXIMUM_NUMBER_OF_HEROES_REACHED;
    }

    loadHeroes() : void {
        this.heroService.findAll().subscribe(
            heroes => {
                this._heroes = heroes;
                this._heroes.forEach(hero => {
                    if(hero.imageB64) hero.imageSafe = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' + hero.imageB64);
                    if(hero.iconB64) hero.iconSafe = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + hero.iconB64);
                })
            },
            err => console.error(err)
        );
    }

    // Handle Hero selection (store in specific array) and change the boolean that define the current player turn
    selectHero(hero:Hero) : void {
        if(!hero || this.isSelectedByPlayer1(hero) || this.isSelectedByPlayer2(hero)) return;

        if(this._selectedHeroesPlayer1.length == this._configuration.maxHeroesPerTeam &&
            this._selectedHeroesPlayer2.length == this._configuration.maxHeroesPerTeam) {
            this._displayError = true;
            return;
        }

        // The hero must known his player
        if(this.isFirstPlayerTurn){
            hero._owner = 'player1';
            this._selectedHeroesPlayer1.push(hero);
        } else {
            hero._owner = 'player2';
            this._selectedHeroesPlayer2.push(hero);
        }
        this.isFirstPlayerTurn = !this.isFirstPlayerTurn;
    }

    // Handle reset selection click
    reset() : void {
        this._displayError = false;
        this._selectedHeroesPlayer1 = [];
        this._selectedHeroesPlayer2 = [];
        this.isFirstPlayerTurn = true;
    }

    // Validate selections and send the list of selected heroes to the parent component (Hero-Game.component)
    validate() : void {
        if(this._selectedHeroesPlayer1.length == this._configuration.maxHeroesPerTeam &&
            this._selectedHeroesPlayer2.length == this._configuration.maxHeroesPerTeam)
            this._validation.emit({
                heroesPlayer1: this._selectedHeroesPlayer1,
                heroesPlayer2: this._selectedHeroesPlayer2
            }
        );
        else console.error('incorrect champion count'); // TODO: show message
    }

    // Utilities functions
    isSelectedByPlayer1(hero:Hero){
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
