import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsSection from "../components/fullPost/comments/CommentsSection";
import { API_BASE_URL } from "@/config/config";

export default function FullPost() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
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
      const commentsResponse = await fetch(
        `${API_BASE_URL}/posts/${id}/comments`
      );
      return await commentsResponse.json();
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-950 text-white py-12 px-4">
      <div className="bg-gray-900 shadow-lg rounded-lg w-full max-w-5xl p-8">
        <h1 className="text-3xl font-bold text-center text-white">
          {post.title}
        </h1>
        <h2 className="text-lg text-gray-400 text-center mt-1">
          {post.subtitle}
        </h2>
        <p className="text-sm text-gray-400 text-center mt-1">
          {post.author} • {new Date(post.createdAt).toLocaleDateString()}
        </p>
        <div className="my-6">
          <img
            src={post.imageSrc}
            alt="Post banner"
            className="rounded-lg shadow-md w-full h-64 object-cover"
          />
        </div>
        <div
          className="text-lg text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {/* Comments Section */}
        {id && <CommentsSection comments={post.comments} postId={id} />}
      </div>
    </div>
  );
}
