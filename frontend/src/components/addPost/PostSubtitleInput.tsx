import React, { useState } from "react";
import { TextField } from "@mui/material";

const PostSubtitleInput: React.FC = () => {
  const [subtitle, setSubtitle] = useState("");

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
