import React from "react";
import { TextField } from "@mui/material";

const PostSubtitleInput: React.FC<any> = ({
  subtitle,
  onChange: setSubtitle,
}) => {
  return (
    <TextField
      label="Subtitle"
      variant="outlined"
      fullWidth
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
      margin="normal"
      value={subtitle}
      onChange={(e) => setSubtitle(e.target.value)}
      placeholder="Enter a subtitle (optional)..."
    />
  );
};

export default PostSubtitleInput;
