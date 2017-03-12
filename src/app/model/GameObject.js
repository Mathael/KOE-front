"use strict";
var GameObject = (function () {
    function GameObject(name, description, moveType, moveCount) {
        this._name = name;
        this._description = description;
        this._moveType = moveType;
        this._moveCount = moveCount;
    }
    return GameObject;
}());
exports.GameObject = GameObject;
