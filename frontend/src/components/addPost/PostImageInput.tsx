import React from "react";
import { TextField } from "@mui/material";

const PostSubtitleInput: React.FC<any> = ({
  imageUrl,
  onChange: setImageUrl,
}) => {
  return (
    <TextField
      label="Image url"
      variant="outlined"
      fullWidth
      margin="normal"
      value={imageUrl}
      onChange={(e) => setImageUrl(e.target.value)}
      placeholder="Enter Image URL"
    />
  );
};

export default PostSubtitleInput;
