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
      className="transition-all duration-300 rounded-xl bg-white/30 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 shadow-md backdrop-blur-md"
      InputProps={{
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
      }}
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
