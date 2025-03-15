import { Button } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile(): JSX.Element {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!user?.id) return;
      try {
        const response = await fetch(`http://localhost:3000/posts`);
        const data = await response.json();
        console.log(user);
        console.log(data);
        const userPosts = data.filter((p) => p.author == user.username);
        setPosts(userPosts);
      } catch (error) {
        console.error("Failed to fetch user posts:", error);
      }
    };
    fetchUserPosts();
  }, [user]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#181A23] to-[#1F2230] overflow-hidden p-6">
      {/* Background Lighting Effect */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-white opacity-5 blur-[160px] rounded-full top-[-200px] left-[-200px]"></div>
      </div>

      {/* Floating Glassmorphism Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 bg-white/10 backdrop-blur-lg p-14 rounded-3xl 
        shadow-lg border border-white/15 hover:scale-105 transition-all duration-500 w-[480px] text-center"
      >
        <h2 className="text-3xl font-bold text-white">
          Hello, {user?.username || "Guest"}! 👋
        </h2>
        <img
          src={user?.imageUrl || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto mt-6 shadow-lg border-4 border-white"
        />
        <Button
          variant="contained"
          className="bg-red-500 text-white w-full mt-6 py-3 text-lg rounded-xl hover:bg-red-600 transition-all"
          onClick={logout}
        >
          Sign Out
        </Button>
      </motion.div>

      {/* User's Posts */}
      <div className="mt-12 w-full max-w-4xl">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">
          Your Posts
        </h3>

        {posts.length === 0 ? (
          <p className="text-gray-400 text-center">No posts yet.</p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {posts.map((post) => (
              <motion.div
                key={post._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:scale-105 transition-transform duration-300"
                onClick={() => navigate(`/post/${post._id}`)}
              >
                <img
                  src={post.imageSrc}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h4 className="text-lg font-semibold text-white">
                  {post.title}
                </h4>
                <p className="text-gray-400 text-sm mt-1">{post.subtitle}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
