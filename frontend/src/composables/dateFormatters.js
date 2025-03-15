"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToPostString = void 0;
var dateToPostString = function (date) {
    var options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
};
exports.dateToPostString = dateToPostString;
