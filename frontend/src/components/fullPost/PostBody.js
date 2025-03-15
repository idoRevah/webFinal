"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var PostBody = function (_a) {
    var content = _a.content;
    return (<material_1.Box sx={{
            margin: "auto",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            lineHeight: "1.8",
            color: "#333",
        }}>
      <material_1.Typography variant="body1" sx={{
            lineHeight: "1.8",
        }}>
        {content}
      </material_1.Typography>
    </material_1.Box>);
};
exports.default = PostBody;
