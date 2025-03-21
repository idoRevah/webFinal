import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BlogGrid = ({ posts, onLike }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {posts.map((post) => {
        const hasLiked = post.likes.includes(userId);

        return (
          <motion.div
            onClick={() => navigate(`/post/${post._id}`)}
            key={post.id}
            className="relative overflow-hidden rounded-lg shadow-lg hover:scale-[1.05] transition transform duration-500"
          >
            <img src={post.imageSrc} className="w-full h-64 object-cover opacity-80" alt={post.title} />
            <button
              className={`mt-2 px-4 py-2 rounded-lg transition ${
                hasLiked ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onLike(post._id);
              }}
            >
              {hasLiked ? "💔 Unlike" : "❤️ Like"} {post.likes.length}
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BlogGrid;
