"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var HeroGameComponent = (function () {
    function HeroGameComponent() {
        this._status = 'INIT_GAME';
        // _status
        // => SELECTION = selecting heroes
        // =>   START   = Show the hero on the battlefield and start the game
    }
    HeroGameComponent.prototype.ngOnInit = function () { };
    __decorate([
        core_1.Input()
    ], HeroGameComponent.prototype, "selector", void 0);
    __decorate([
        core_1.Input()
    ], HeroGameComponent.prototype, "battlefield", void 0);
    HeroGameComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-hero-game',
            templateUrl: './hero-game.component.html',
            styleUrls: ['./hero-game.component.css']
        })
    ], HeroGameComponent);
    return HeroGameComponent;
}());
exports.HeroGameComponent = HeroGameComponent;
