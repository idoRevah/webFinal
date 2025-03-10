import { motion } from "framer-motion";

const FeaturedPost = ({ post }) => {
  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }} // ⏳ Slower, smoother
      className="w-full max-w-5xl mx-auto mb-8 relative"
    >
      <div className="relative rounded-lg overflow-hidden shadow-xl hover:scale-[1.03] transition transform duration-500">
        <img
          src={post.imageSrc}
          className="w-full h-[400px] object-cover opacity-90"
          alt="Featured Post"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }} // 🎭 Slight delay for cinematic reveal
          className="absolute bottom-6 left-6"
        >
          <h1 className="text-4xl font-bold text-white">{post.title}</h1>
          <p className="text-gray-300 mt-2">{post.subtitle}</p>
          <p className="text-sm text-gray-400 mt-1">
            {post.author} • {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturedPost;
