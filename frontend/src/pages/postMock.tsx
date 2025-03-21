import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentsSection from "../components/fullPost/comments/CommentsSection";
import { API_BASE_URL } from "@/config/config";
import { useAuth } from "@/context/AuthContext";
import FileUploader from "../components/addPost/PostImageInput";

export default function FullPost() {
    const { id } = useParams();
    const [post, setPost] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { token } = useAuth();
    const navigate = useNavigate();

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

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setPost((prev: any) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();
            formData.append("title", post.title);
            formData.append("subtitle", post.subtitle);
            formData.append("content", post.content);

            if (imageFile) {
                formData.append("imageSrc", imageFile);
            } else {
                formData.append("imageSrc", post.imageSrc);
            }

            const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) throw new Error("Failed to update post");

            setIsEditing(false);
            fetchPost();
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) throw new Error("Failed to delete post");

                navigate("/");
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    const removeHTMLTags = (html: string) => {
        return html.replace(/<[^>]*>/g, '');
    }

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
                    {isEditing && <FileUploader onFileSelect={setImageFile} />}
                </div>

                {isEditing ? (
                    <textarea
                        name="content"
                        value={removeHTMLTags(post.content)}
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

                <div className="flex justify-end mt-4">
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mr-2">
                                Save
                            </button>
                            <button onClick={() => setIsEditing(false)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded">
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => setIsEditing(true)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded mr-2">
                                Edit
                            </button>
                            <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                                Delete
                            </button>
                        </>
                    )}
                </div>

                {id && <CommentsSection comments={post.comments} postId={id} />}
            </div>
        </div>
    );
}