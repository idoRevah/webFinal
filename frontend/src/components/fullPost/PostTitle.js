"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var PostTitle = function (_a) {
    var title = _a.title;
    return (<material_1.Typography variant="h4" className="text-3xl font-bold mt-4 mb-2 text-gray-800">
      {title}
    </material_1.Typography>);
};
exports.default = PostTitle;
