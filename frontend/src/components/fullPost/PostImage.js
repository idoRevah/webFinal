"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var PostImage = function (_a) {
    var imageUrl = _a.imageUrl, altText = _a.altText;
    return (<material_1.CardMedia component="img" image={imageUrl} alt={altText} className="rounded-lg shadow-md w-full my-4"/>);
};
exports.default = PostImage;
