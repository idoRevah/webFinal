import React from "react";
import { CardMedia } from "@mui/material";

interface PostImageProps {
  imageUrl: string;
  altText: string;
}

const PostImage: React.FC<PostImageProps> = ({ imageUrl, altText }) => {
  return (
    <CardMedia
      component="img"
      image={imageUrl}
      alt={altText}
      className="rounded-lg shadow-md w-full my-4"
    />
  );
};

export default PostImage;
