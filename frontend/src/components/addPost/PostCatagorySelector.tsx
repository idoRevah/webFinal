import React from "react";
import { MenuItem, TextField } from "@mui/material";
// @ts-ignore
import { getCategories } from "@/composables/categories";

const categories = getCategories();

const PostCategorySelector: React.FC<any> = ({
  category,
  onChange: setCategory,
}) => {
  return (
    <TextField
      select
      label="Select Category"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      fullWidth
      margin="normal"
      className="transition-all duration-300 rounded-xl bg-white/30 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 shadow-md backdrop-blur-md"
      InputProps={{
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
      }}
    >
      {categories.map((cat) => (
        <MenuItem key={cat} value={cat}>
          {cat}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default PostCategorySelector;
