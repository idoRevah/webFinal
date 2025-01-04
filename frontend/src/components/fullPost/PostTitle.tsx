import React from "react";
import { Typography } from "@mui/material";

const PostTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Typography
      variant="h4"
      className="text-3xl font-bold mt-4 mb-2 text-gray-800"
    >
      {title}
    </Typography>
  );
};

export default PostTitle;
