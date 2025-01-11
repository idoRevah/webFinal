import React, { useState } from "react";
import { MenuItem, TextField } from "@mui/material";
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
