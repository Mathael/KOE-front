import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {GameConfigTemplate} from "../../model/GameConfigTemplate";
import {GameConfigService} from "../../service/game-config.service";

@Component({
    selector: 'app-hero-game-config',
    templateUrl: './hero-game-config.component.html',
    styleUrls: ['./hero-game-config.component.css']
})
export class HeroGameConfigComponent implements OnInit {

    @Output()
    private _validation: EventEmitter<any> = new EventEmitter<any>();
    private _configTemplates:GameConfigTemplate[] = []; // Display template by default to let player choose one from them
    private _selectedConfig:GameConfigTemplate = null;

    constructor(private gameConfigService:GameConfigService) {}

    ngOnInit() {
        this.loadGameConfigTemplates();
    }

    loadGameConfigTemplates() :void {
        this.gameConfigService.findAll().subscribe(
            configs => {
                this._configTemplates = configs;
            },
            err => console.error(err)
        );
    }

    validate() {
        if(!this._selectedConfig) return; // TODO: show error message
        this._validation.emit(this._selectedConfig);
    }
}
