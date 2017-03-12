"use strict";
var Case = (function () {
    function Case(id) {
        this._objects = [];
        this._id = id;
    }
    Case.prototype.objectCount = function () {
        return this._objects.length;
    };
    Case.prototype.clear = function () {
        this._objects = [];
    };
    return Case;
}());
exports.Case = Case;
