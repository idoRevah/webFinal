"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SearchBar = function (_a) {
    var onSearch = _a.onSearch;
    var _b = (0, react_1.useState)(""), query = _b[0], setQuery = _b[1];
    var handleSearch = function (e) {
        var value = e.target.value;
        setQuery(value);
        onSearch(value);
    };
    return (<div className="relative mb-6 max-w-md mx-auto">
      <input type="text" placeholder="Search blog posts..." value={query} onChange={handleSearch} className="w-full px-4 py-2 text-lg text-gray-300 bg-gray-800 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
      <span className="absolute right-4 top-3 text-gray-400">🔍</span>
    </div>);
};
exports.default = SearchBar;
