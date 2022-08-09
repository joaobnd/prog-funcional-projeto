"use strict";
exports.__esModule = true;
exports.Util = void 0;
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.orderBy = function (collection, attr) {
        return collection.sort(function (a, b) { return a[attr].localeCompare(b[attr]); });
    };
    Util.distinct = function (collection, attr) {
        var uniqueAttrs = [];
        var unique = collection.filter(function (element) {
            var isDuplicate = uniqueAttrs.includes(element[attr]);
            if (!isDuplicate) {
                uniqueAttrs.push(element[attr]);
                return true;
            }
            return false;
        });
        return unique;
    };
    return Util;
}());
exports.Util = Util;
var arr = [
    { id: 1, name: 'Tom' },
    { id: 1, name: 'Tom' },
    { id: 2, name: 'Nick' },
    { id: 2, name: 'Nick' },
];
console.log(Util.distinct(arr, 'id'));
