import PostTitleInput from "@/components/addPost/PostTitleInput";
import PostSubtitleInput from "@/components/addPost/PostSubtitleInput";
import PostCategorySelector from "@/components/addPost/PostCatagorySelector";
import PostContentEditor from "@/components/addPost/PostContentEditor";
import ImageInput from "@/components/addPost/PostImageInput";
import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import PublishButton from "@/components/addPost/PublishButton";
import { useAuth } from "@/context/AuthContext";
interface NewPost {
  title: string;
  subtitle: string;
  content: string;
  category: string;
  userId: number;
  imageSrc: File | null; // Accepts a File instead of a string
}

export default function Blog(): JSX.Element {
  const { user, token } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageSrc, setImage] = useState<File | null>(null); // Change from string to File

  const displayMessage = (message: string, isError: boolean) => {
    setSeverity(isError ? "error" : "success");
    setAlertMessage(message);
    setOpenSnackbar(true);
  };

  const handlePublish = async () => {
    if (!imageSrc) {
      displayMessage("Please Upload Image", true);

      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("userId", user.id); // Convert number to string for FormData
    formData.append("imageSrc", imageSrc); // Send the file properly

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Attach JWT for authentication
        },
        body: formData, // No need for Content-Type, FormData handles it automatically
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      displayMessage("Post Created successfully!", false);
    } catch (error) {
      displayMessage("Failed to publish post.", true);
    }
  };

  const handleCancel = () => {
    // TODO: Return to blog
    alert("Canceled.");
  };

  return (
    <>
      <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight text-center">
          ✍ Create Your Masterpiece
        </h1>
        <p className="text-lg text-gray-500 text-center mt-2">
          Share your story, inspire others, and make an impact.
        </p>
        <PostTitleInput title={title} onChange={setTitle} />
        <PostSubtitleInput subTitle={subtitle} onChange={setSubtitle} />
        <ImageInput onFileSelect={setImage} />{" "}
        <PostCategorySelector category={category} onChange={setCategory} />
        <PostContentEditor content={content} onChange={setContent} />
        <div className="flex justify-between mt-5">
          <Button
            variant="contained"
            color="primary"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold px-6 py-2 rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            onClick={handlePublish}
          >
            PUBLISH 🚀
          </Button>
          <Button variant="text" color="error">
            CANCEL
          </Button>
        </div>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={severity}
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
