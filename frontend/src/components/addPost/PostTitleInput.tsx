import React from "react";
import { TextField } from "@mui/material";

const PostTitleInput: React.FC<any> = ({ title, onChange: setTitle }: any) => {
  return (
    <TextField
      label="Post Title"
      variant="outlined"
      fullWidth
      margin="normal"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      placeholder="Enter your post title here..."
    />
  );
};

export default PostTitleInput;
