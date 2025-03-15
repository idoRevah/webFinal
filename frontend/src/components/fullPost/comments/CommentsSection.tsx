import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"; // Like icons
import { API_BASE_URL } from "@/config/config";

interface Comment {
  author: string;
  createdAt: string;
  content: string;
  likes: number;
}

interface CommentsSectionProps {
  comments: Comment[];
  postId: String | undefined;
}

export default function CommentsSection({
  comments,
  postId,
}: CommentsSectionProps) {
  const [commentList, setCommentList] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const { token } = useAuth();

  // Handle like action
  // TODO: backend
  const handleLike = (index: number) => {
    const updatedComments = [...commentList];
    updatedComments[index].likes += 1;
    setCommentList(updatedComments);
  };

  // Handle adding a new comment
  const handleAddComment = async () => {
    try {
      console.log(postId);
      const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      setNewComment(""); // Clear input field

      const newCommentObject = await response.json();
      setCommentList([newCommentObject, ...commentList]);
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold">Comments</h2>

      {/* Add New Comment Box */}
      <div className="mt-4 bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
        <textarea
          className="w-full p-2 text-gray-300 bg-gray-900 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleAddComment}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-300 shadow-md"
        >
          Add Comment
        </button>
      </div>

      {/* Comments List */}
      <div className="mt-4 space-y-4">
        {commentList.length > 0 ? (
          commentList.map((comment, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">{comment.author}</p>
                  <p className="text-gray-400 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {/* Like Button */}
                <div
                  className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-blue-400 transition-all"
                  onClick={() => handleLike(index)}
                >
                  {comment.likes > 0 ? <FaThumbsUp /> : <FaRegThumbsUp />}
                  <span>{comment.likes}</span>
                </div>
              </div>
              <p className="text-gray-300 mt-2">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}
