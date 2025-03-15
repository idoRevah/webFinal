"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var CoverImageUploader = function () {
    var _a = (0, react_1.useState)(null), image = _a[0], setImage = _a[1];
    var handleImageUpload = function (e) {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    return (<div style={{ margin: "20px 0" }}>
      <material_1.Button variant="contained" component="label">
        Upload Cover Image
        <input type="file" hidden onChange={handleImageUpload}/>
      </material_1.Button>

      {image && <p>Selected Image: {image.name}</p>}
    </div>);
};
exports.default = CoverImageUploader;
