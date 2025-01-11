import PostTitleInput from "@/components/addPost/PostTitleInput";
import PostSubtitleInput from "@/components/addPost/PostSubtitleInput";
import PostCategorySelector from "@/components/addPost/PostCatagorySelector";
import PostContentEditor from "@/components/addPost/PostContentEditor";
import ImageUrlInput from "@/components/addPost/PostImageInput";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { BlogPostDataType } from "@/components/blogPosts/PostTypes";

interface NewPost {
  title: string;
  subtitle: string;
  content: String;
  imageSrc: String;
  category: String;
  userId: Number;
}

export default function blog(): JSX.Element {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = () => {
    const post: NewPost = {
      userId: 1,
      title,
      subtitle,
      imageSrc: imageUrl,
      category,
      content,
    };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });

    alert("Post Published!");
  };

  const handleCancel = () => {
    alert("Canceled.");
  };

  return (
    <>
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        <h1>Create New Post</h1>

        <PostTitleInput title={title} onChange={setTitle} />
        <PostSubtitleInput subTitle={subtitle} onChange={setSubtitle} />
        <ImageUrlInput imageUrl={imageUrl} onChange={setImageUrl} />
        <PostCategorySelector category={category} onChange={setCategory} />
        <PostContentEditor content={content} onChange={setContent} />
        <Stack direction="row" spacing={2} style={{ marginTop: "20px" }}>
          <Button variant="contained" color="primary" onClick={handlePublish}>
            Publish
          </Button>
          <Button variant="text" color="error" onClick={handleCancel}>
            Cancel
          </Button>
        </Stack>
      </div>
    </>
  );
}
