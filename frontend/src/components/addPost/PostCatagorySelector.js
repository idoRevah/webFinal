"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var categories_1 = require("@/composables/categories");
var categories = (0, categories_1.getCategories)();
var PostCategorySelector = function (_a) {
    var category = _a.category, setCategory = _a.onChange;
    return (<material_1.TextField select label="Select Category" value={category} onChange={function (e) { return setCategory(e.target.value); }} fullWidth margin="normal" className="transition-all duration-300 rounded-xl bg-white/30 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 shadow-md backdrop-blur-md" InputProps={{
            sx: {
                borderRadius: "12px",
                bgcolor: "rgba(255, 255, 255, 0.15)", // Glass effect
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "&:hover": { borderColor: "#3b82f6" }, // Blue hover effect
                "&.Mui-focused": {
                    borderColor: "#2563eb",
                    boxShadow: "0 0 10px #2563eb",
                },
                "& .MuiSelect-icon": { display: "none" }, // Hide default icon
            },
        }}>
      {categories.map(function (cat) { return (<material_1.MenuItem key={cat} value={cat}>
          {cat}
        </material_1.MenuItem>); })}
    </material_1.TextField>);
};
exports.default = PostCategorySelector;
