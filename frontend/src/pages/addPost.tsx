import PostTitleInput from "@/components/addPost/PostTitleInput";
import PostSubtitleInput from "@/components/addPost/PostSubtitleInput";
import PostCategorySelector from "@/components/addPost/PostCatagorySelector";
import PostContentEditor from "@/components/addPost/PostContentEditor";
import ImageInput from "@/components/addPost/PostImageInput";
import { useState } from "react";
import { Button, Stack } from "@mui/material";

interface NewPost {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  userId: number;
  imageSrc: File | null; // Accepts a File instead of a string
}

export default function Blog(): JSX.Element {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageSrc, setImage] = useState<File | null>(null); // Change from string to File

  const handlePublish = async () => {
    if (!imageSrc) {
      alert("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("userId", "1"); // Convert number to string for FormData
    formData.append("imageSrc", imageSrc); // Send the file properly

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        body: formData, // No need for Content-Type, FormData handles it automatically
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      console.log("Post created successfully:", data);
      alert("Post Published!");
    } catch (error) {
      console.error("Error uploading post:", error);
      alert("Failed to publish post.");
    }
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
        <ImageInput onFileSelect={setImage} />{" "}
        {/* Accepts File instead of string */}
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
