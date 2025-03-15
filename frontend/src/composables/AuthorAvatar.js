"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorAvatar = exports.getInitials = void 0;
var Avatar_1 = require("@mui/material/Avatar");
var colors_1 = require("@mui/material/colors");
var getInitials = function (fullName) {
    console.log(fullName);
    if (!fullName)
        return "AA";
    var names = fullName.trim().split(" ");
    return names.length === 1
        ? names[0][0].toUpperCase()
        : (names[0][0] + names[names.length - 1][0]).toUpperCase();
};
exports.getInitials = getInitials;
var AuthorAvatar = function (_a) {
    var name = _a.name;
    return (<Avatar_1.default sx={{ bgcolor: colors_1.deepOrange[500], width: 24, height: 24 }}>
      {getInitials(name)}
    </Avatar_1.default>);
};
exports.AuthorAvatar = AuthorAvatar;
