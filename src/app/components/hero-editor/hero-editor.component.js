"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var hero_service_1 = require("../../service/hero.service");
var HeroEditorComponent = (function () {
    function HeroEditorComponent(heroService) {
        this.heroService = heroService;
        this._heroes = [];
    }
    HeroEditorComponent.prototype.ngOnInit = function () {
        this.loadHeroes();
    };
    HeroEditorComponent.prototype.ngOnChanges = function (changes) {
        console.log(changes);
    };
    HeroEditorComponent.prototype.loadHeroes = function () {
        var _this = this;
        this.heroService.findAll().subscribe(function (heroes) { return _this._heroes = heroes; }, function (err) { return console.error(err); });
    };
    HeroEditorComponent.prototype.validateStats = function (hero) {
        var sum = 0;
        hero.stats.forEach(function (stat) { return sum += stat._value; });
        if (sum > 50) {
            console.log('limit reached !');
        }
    };
    HeroEditorComponent.prototype.update = function (hero) {
        if (!hero)
            return;
        this.heroService.update(hero).subscribe(function (data) {
            console.log(data);
        }, function (err) { return console.error(err); });
    };
    HeroEditorComponent.prototype.remove = function (id) {
        var _this = this;
        if (!id)
            return;
        this.heroService.remove(id).subscribe(function (response) {
            if (response) {
                var hero = _this._heroes.find(function (h) { return h.id == id; });
                _this._heroes.splice(_this._heroes.indexOf(hero), 1);
            }
        }, function (err) { return console.error(err); });
    };
    HeroEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'hero-editor',
            templateUrl: './hero-editor.component.html',
            styleUrls: ['./hero-editor.component.css'],
            providers: [hero_service_1.HeroService]
        })
    ], HeroEditorComponent);
    return HeroEditorComponent;
}());
exports.HeroEditorComponent = HeroEditorComponent;
