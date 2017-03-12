"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var hero_service_1 = require("../../service/hero.service");
var HeroSelectorComponent = (function () {
    function HeroSelectorComponent(heroService) {
        this.heroService = heroService;
        this._heroes = [];
        this._selectedHeroesPlayer1 = [];
        this._selectedHeroesPlayer2 = [];
        this.isFirstPlayerTurn = true;
    }
    HeroSelectorComponent.prototype.ngOnInit = function () {
        this.loadHeroes();
    };
    HeroSelectorComponent.prototype.loadHeroes = function () {
        var _this = this;
        this.heroService.findAll().subscribe(function (heroes) { return _this._heroes = heroes; }, function (err) { return console.error(err); });
    };
    HeroSelectorComponent.prototype.selectHero = function (hero) {
        if (!hero || this.isSelectedByPlayer1(hero) || this.isSelectedByPlayer2(hero))
            return;
        this.isFirstPlayerTurn ? this._selectedHeroesPlayer1.push(hero) : this._selectedHeroesPlayer2.push(hero);
        this.isFirstPlayerTurn = !this.isFirstPlayerTurn;
    };
    HeroSelectorComponent.prototype.reset = function () {
        this._selectedHeroesPlayer1 = [];
        this._selectedHeroesPlayer2 = [];
        this.isFirstPlayerTurn = true;
    };
    HeroSelectorComponent.prototype.validate = function () {
        if (this._selectedHeroesPlayer1.length == 6 && this._selectedHeroesPlayer2.length == 6)
            console.log('succes !');
    };
    HeroSelectorComponent.prototype.isSelectedByPlayer1 = function (hero) {
        return this._selectedHeroesPlayer1.find(function (current) {
            return current.id == hero.id;
        });
    };
    HeroSelectorComponent.prototype.isSelectedByPlayer2 = function (hero) {
        return this._selectedHeroesPlayer2.find(function (current) {
            return current.id == hero.id;
        }) || false;
    };
    HeroSelectorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-hero-selector',
            templateUrl: './hero-selector.component.html',
            styleUrls: ['./hero-selector.component.css'],
            providers: [hero_service_1.HeroService]
        })
    ], HeroSelectorComponent);
    return HeroSelectorComponent;
}());
exports.HeroSelectorComponent = HeroSelectorComponent;
