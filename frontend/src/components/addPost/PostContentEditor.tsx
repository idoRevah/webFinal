import React, { useState } from "react";
import { TextField } from "@mui/material";

const PostContentEditor: React.FC<any> = ({
  content,
  onChange: setContent,
}) => {
  return (
    <TextField
      label="Post Content"
      variant="outlined"
      fullWidth
      multiline
      rows={10}
      margin="normal"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      placeholder="Write your post content here..."
    />
  );
};

export default PostContentEditor;
