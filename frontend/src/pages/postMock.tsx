import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsSection from "../components/fullPost/comments/CommentsSection";
import { API_BASE_URL } from "@/config/config";
import { useAuth } from "@/context/AuthContext";

export default function FullPost() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const postResponse = await fetch(`${API_BASE_URL}/posts/${id}`);
      const postData = await postResponse.json();
      postData.comments = await fetchComments();
      setPost(postData);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  };

  const fetchComments = async () => {
    const commentsResponse = await fetch(`${API_BASE_URL}/posts/${id}/comments`);
    return await commentsResponse.json();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null; // No new image selected

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Image upload failed");

      const data = await response.json();
      return data.imageUrl; // Assuming the server returns `{ imageUrl: "https://yourserver.com/uploads/filename.jpg" }`
    } catch (error) {
      console.error("Image upload error:", error);
      return null;
    }
  };

  const handleSave = async () => {
    try {
      let updatedImageSrc = post.imageSrc;

      if (imageFile) {
        const uploadedImageUrl = await uploadImage();
        if (uploadedImageUrl) {
          updatedImageSrc = uploadedImageUrl;
        }
      }

      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: post.title,
          subtitle: post.subtitle,
          content: post.content,
          imageSrc: updatedImageSrc,
        }),
      });

      if (!response.ok) throw new Error("Failed to update post");

      setIsEditing(false);
      fetchPost(); // Refresh after update
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (!post) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-950 text-white py-12 px-4">
      <div className="bg-gray-900 shadow-lg rounded-lg w-full max-w-5xl p-8">
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            className="w-full text-3xl font-bold bg-gray-800 text-white p-2 rounded"
          />
        ) : (
          <h1 className="text-3xl font-bold text-center text-white">{post.title}</h1>
        )}

        {isEditing ? (
          <input
            type="text"
            name="subtitle"
            value={post.subtitle}
            onChange={handleInputChange}
            className="w-full text-lg bg-gray-800 text-gray-300 p-2 rounded mt-2"
          />
        ) : (
          <h2 className="text-lg text-gray-400 text-center mt-1">{post.subtitle}</h2>
        )}

        <p className="text-sm text-gray-400 text-center mt-1">
          {post.author} • {new Date(post.createdAt).toLocaleDateString()}
        </p>

        <div className="my-6">
          <img
            src={post.imageSrc}
            alt="Post banner"
            className="rounded-lg shadow-md w-full h-64 object-cover"
          />
          {isEditing && (
            <input type="file" accept="image/*" onChange={handleImageChange} className="mt-2 text-gray-400" />
          )}
        </div>

        {isEditing ? (
          <textarea
            name="content"
            value={post.content}
            onChange={handleInputChange}
            className="w-full text-lg bg-gray-800 text-gray-300 p-4 rounded leading-relaxed"
            rows={8}
          />
        ) : (
          <div
            className="text-lg text-gray-300 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        )}

        {/* Edit & Save Buttons */}
        <div className="flex justify-end mt-4">
          {isEditing ? (
            <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
              Save
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
              Edit
            </button>
          )}
        </div>

        {/* Comments Section */}
        {id && <CommentsSection comments={post.comments} postId={id} />}
      </div>
    </div>
  );
}
