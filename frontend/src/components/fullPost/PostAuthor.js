"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var AuthorAvatar_1 = require("@/composables/AuthorAvatar");
var dateFormatters_1 = require("@/composables/dateFormatters");
var AuthorInfo = function (_a) {
    var name = _a.name, date = _a.date;
    return (<div className="flex items-center gap-4 my-4">
      <AuthorAvatar_1.AuthorAvatar name={name}/>
      <div>
        <material_1.Typography variant="subtitle1" className="font-medium text-gray-900">
          {name}
        </material_1.Typography>
        <material_1.Typography variant="body2" className="text-gray-500">
          {(0, dateFormatters_1.dateToPostString)(date)}
        </material_1.Typography>
      </div>
    </div>);
};
exports.default = AuthorInfo;
