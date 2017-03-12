"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Rx_1 = require('rxjs/Rx');
var HeroService = (function () {
    function HeroService(http) {
        this.http = http;
    }
    HeroService.prototype.ngOnInit = function () {
        console.log('HeroService initialized');
    };
    HeroService.prototype.remove = function (id) {
        return this
            .http
            .delete("/api/hero/" + id)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HeroService.prototype.findAll = function () {
        return this
            .http
            .get('/api/hero')
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HeroService.prototype.update = function (hero) {
        return this
            .http
            .put('/api/hero', hero)
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    HeroService = __decorate([
        core_1.Injectable()
    ], HeroService);
    return HeroService;
}());
exports.HeroService = HeroService;
