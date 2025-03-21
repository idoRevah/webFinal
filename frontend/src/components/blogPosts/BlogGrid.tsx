import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BlogGrid = ({ posts, onLike }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
            className="relative overflow-hidden rounded-lg shadow-lg hover:scale-[1.05] transition transform duration-500"
          >
            <img
              src={post.imageSrc}
              className="w-full h-64 object-cover opacity-80"
              alt={post.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6">
              <h2 className="text-2xl font-semibold text-white">
                {post.title}
              </h2>
              <p className="text-gray-300 mt-1 text-sm">{post.subtitle}</p>
              <p className="text-xs text-gray-400 mt-1">
                {post.author} • {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <button
                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(post._id);
                }}
              >
                ❤️ {post.likes.length}
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BlogGrid;
