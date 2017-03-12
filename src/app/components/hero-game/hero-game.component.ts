import {Component, OnInit, ViewChild} from '@angular/core';
import {HeroSelectorComponent} from "../hero-selector/hero-selector.component";
import {BattlefieldComponent} from "../battlefield/battlefield.component";
import {GameStatus} from "../../enum/GameStatus";

@Component({
    moduleId: module.id,
    selector: 'app-hero-game',
    templateUrl: './hero-game.component.html',
    styleUrls: ['./hero-game.component.css']
})
export class HeroGameComponent implements OnInit {

    @ViewChild(HeroSelectorComponent)
    private selector:HeroSelectorComponent;

    @ViewChild('battlefield')
    private battlefield:BattlefieldComponent;

    private _configuration:any = null;
    private _status: GameStatus = GameStatus.GAME_CONFIG;

    constructor() {}

    ngOnInit() {}

    onHeroesSelectionFinish(heroes:any) {
        this.battlefield.initialize(heroes);
        this._status = GameStatus.DRAW_HEROES; // Updating UI
    }

    onGameConfigurationFinish(configurations:any[]) {
        this._configuration = configurations;
        this._status = GameStatus.SELECTION;
    }

    isSelectionStatus() {
        return this._status === GameStatus.SELECTION;
    }

    isDrawStatus() {
        return this._status === GameStatus.DRAW_HEROES;
    }

    isGameConfigStatus() {
        return this._status === GameStatus.GAME_CONFIG;
    }
}
