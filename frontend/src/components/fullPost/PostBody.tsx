import React from "react";
import { Box, Typography } from "@mui/material";

interface PostBodyProps {
  content: string; // Main content of the post
}

const PostBody: React.FC<PostBodyProps> = ({ content }) => {
  return (
    <Box
      sx={{
        margin: "auto",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "12px",
        lineHeight: "1.8",
        color: "#333",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          lineHeight: "1.8",
        }}
      >
        {content}
      </Typography>
    </Box>
  );
};

export default PostBody;
