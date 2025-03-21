import { useState, useEffect } from "react";
import { BlogPostDataType } from "@/components/blogPosts/PostTypes";
import SearchBar from "../components/blogPosts/SerachBar";
import BlogGrid from "../components/blogPosts/BlogGrid";
import FeaturedPost from "../components/blogPosts/FeaturedPost";
import { API_BASE_URL } from "@/config/config";
import { useAuth } from "@/context/AuthContext";

export default function BlogPage() {
  const [posts, setPosts] = useState<Array<BlogPostDataType>>([]);
  const [filteredPosts, setFilteredPosts] = useState<Array<BlogPostDataType>>([]);
  const { token } = useAuth();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const postsDataResponse = await fetch(`${API_BASE_URL}/posts`);
    const data = await postsDataResponse.json();
    const formattedPosts = data.map((p) => ({ ...p, id: p._id }));
    setPosts(formattedPosts);
    setFilteredPosts(formattedPosts);
  };

  const handleLike = async (postId: string) => {
    try {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      const hasLiked = post.likes.includes(userId);
      const endpoint = hasLiked
        ? `${API_BASE_URL}/posts/${postId}/unlike`
        : `${API_BASE_URL}/posts/${postId}/like`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to update like status");
        return;
      }

      const updatedPost = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, likes: updatedPost.likes } : post
        )
      );

      setFilteredPosts((prevFilteredPosts) =>
        prevFilteredPosts.map((post) =>
          post.id === postId ? { ...post, likes: updatedPost.likes } : post
        )
      );
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const handleSearch = (query: string) => {
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.subtitle.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-6">
      <SearchBar onSearch={handleSearch} />
      <FeaturedPost post={filteredPosts.length > 0 ? filteredPosts[0] : null} onLike={handleLike} />
      <BlogGrid posts={filteredPosts.slice(1)} onLike={handleLike} />
      {filteredPosts.length === 0 && (
        <div className="text-center text-gray-500 mt-10">No posts found. Try a different search!</div>
      )}
    </div>
  );
}
