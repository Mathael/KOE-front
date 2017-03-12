"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var hero_service_1 = require("../../service/hero.service");
var Case_1 = require("../../model/Case");
var BattlefieldComponent = (function () {
    function BattlefieldComponent(heroService) {
        this.heroService = heroService;
        this._name = null;
        this._cases = null;
    }
    BattlefieldComponent.prototype.ngOnInit = function () {
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                this._cases[i][j] = new Case_1.Case(i + j);
            }
        }
        console.log('battlefield initialized');
        console.log(this._cases);
    };
    BattlefieldComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-battlefield',
            templateUrl: './battlefield.component.html',
            styleUrls: ['./battlefield.component.css'],
            providers: [hero_service_1.HeroService]
        })
    ], BattlefieldComponent);
    return BattlefieldComponent;
}());
exports.BattlefieldComponent = BattlefieldComponent;
