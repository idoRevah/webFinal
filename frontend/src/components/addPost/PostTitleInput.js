"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var material_1 = require("@mui/material");
var PostTitleInput = function (_a) {
    var title = _a.title, setTitle = _a.onChange;
    return (<material_1.TextField label="Post Title" variant="outlined" className="transition-all duration-300 rounded-xl bg-white/30 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 shadow-md backdrop-blur-md" InputProps={{
            sx: {
                borderRadius: "12px",
                bgcolor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                "&:hover": { borderColor: "#3b82f6" },
                "&.Mui-focused": {
                    borderColor: "#2563eb",
                    boxShadow: "0 0 10px #2563eb",
                }, // Focus glow
            },
        }} fullWidth margin="normal" value={title} onChange={function (e) { return setTitle(e.target.value); }} placeholder="Enter your post title here..."/>);
};
exports.default = PostTitleInput;
