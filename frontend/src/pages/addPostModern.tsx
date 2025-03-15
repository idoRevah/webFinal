import { useState, useEffect } from "react";
import { Snackbar, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PostTitleInput from "@/components/addPost/PostTitleInput";
import PostSubtitleInput from "@/components/addPost/PostSubtitleInput";
import PostCategorySelector from "@/components/addPost/PostCatagorySelector";
import PostContentEditor from "@/components/addPost/PostContentEditor";
import ImageInput from "@/components/addPost/PostImageInput";
import AIFeedbackPanel from "@/components/addPost/AiFeedbackPanel";
import { useAuth } from "@/context/AuthContext";
import { Rocket, XCircle } from "lucide-react";
import Lottie from "lottie-react";
import loadingAnimation from "@/assets/loading.json";
import successAnimation from "@/assets/success.json";

export default function Blog() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageSrc, setImage] = useState<File | null>(null);
  const [aiFeedback, setAiFeedback] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const displayMessage = (message: string, isError: boolean) => {
    setSeverity(isError ? "error" : "success");
    setAlertMessage(message);
    setOpenSnackbar(true);
  };

  // AI Analysis Placeholder
  useEffect(() => {
    const analyzeContent = () => {
      let feedbackMessages: string[] = [...aiFeedback];
      if (content.length < 50)
        feedbackMessages.push("Your content is too short.");
      if (!content.match(/[.!?]$/))
        feedbackMessages.push("Ensure sentences end with proper punctuation.");
      if (/[^a-zA-Z0-9.,!?\s]/.test(content))
        feedbackMessages.push("Detected non-English characters.");

      setFeedback(feedbackMessages);
    };
    analyzeContent();
  }, [content]);

  const analyzeWithAI = async () => {
    if (!content.trim() || !title.trim()) {
      displayMessage("Please write something before checking with AI.", true);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/llm/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: `${title}\n\n${content}` }),
      });

      if (!response.ok) throw new Error("AI feedback request failed");

      const data = await response.json();
      console.log(data);
      const aiResponse = JSON.parse(
        data.suggestions.replace(/```json|```/g, "").trim()
      );

      console.log(aiResponse);

      setAiFeedback(aiResponse.suggestions);
      setContent(content + ".");
      displayMessage("AI feedback generated successfully!", false);
    } catch (error) {
      console.error("AI Analysis error:", error);
      displayMessage("Failed to analyze with AI.", true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!imageSrc) return displayMessage("Please upload an image.", true);
    if (!user?.id) return displayMessage("Please sign in first.", true);

    setIsLoading(true);
    setIsSuccess(false); // Reset success animation

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("userId", user.id);
    formData.append("imageSrc", imageSrc);

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to publish post");

      const data = await response.json();

      setIsLoading(false);
      setIsSuccess(true);
      displayMessage("Post Created Successfully!", false);
      console.log(data);
      setTimeout(() => {
        navigate(`/post/${data._id}`);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setIsSuccess(false);
      displayMessage("Failed to publish post.", true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      {/*Lottie Loading Animation */}
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <Lottie animationData={loadingAnimation} className="w-32 h-32" />
        </div>
      )}

      {/* Lottie Success Animation */}
      {isSuccess && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 z-50">
          <Lottie animationData={successAnimation} className="w-48 h-48" />
        </div>
      )}

      <div className="bg-gray-800 p-10 rounded-xl w-full max-w-5xl shadow-lg border border-gray-700">
        <h1 className="text-4xl font-extrabold text-white text-center">
          ✍ Create Your Masterpiece
        </h1>
        <p className="text-lg text-gray-400 text-center mt-2">
          AI-powered assistant to refine your content.
        </p>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="col-span-2 space-y-6">
            <PostTitleInput title={title} onChange={setTitle} />
            <PostSubtitleInput subTitle={subtitle} onChange={setSubtitle} />
            <ImageInput onFileSelect={setImage} />
            <PostCategorySelector category={category} onChange={setCategory} />
            <PostContentEditor content={content} onChange={setContent} />
            <Button
              variant="outlined"
              className="text-green-400 hover:text-green-500 w-full mt-3"
              onClick={analyzeWithAI}
              disabled={isLoading}
            >
              {isLoading ? "Analyzing..." : "Check with AI 🤖"}
            </Button>

            <div className="flex justify-between mt-4">
              <Button
                variant="contained"
                className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                startIcon={<Rocket />}
                onClick={handlePublish}
                disabled={isLoading}
              >
                {isLoading ? "Posting..." : "Publish"}
              </Button>
              <Button
                variant="outlined"
                className="text-red-400 hover:text-red-500"
                startIcon={<XCircle />}
              >
                Cancel
              </Button>
            </div>
          </div>
          <AIFeedbackPanel feedback={feedback} setFeedback={setFeedback} />
        </div>
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
  );
}
