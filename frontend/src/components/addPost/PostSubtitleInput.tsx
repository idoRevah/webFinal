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
      margin="normal"
      value={subtitle}
      onChange={(e) => setSubtitle(e.target.value)}
      placeholder="Enter a subtitle (optional)..."
    />
  );
};

export default PostSubtitleInput;
