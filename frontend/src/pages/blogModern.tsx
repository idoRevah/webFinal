import { useState, useEffect } from "react";
import { BlogPostDataType } from "@/components/blogPosts/PostTypes";
import SearchBar from "../components/blogPosts/SerachBar";
import BlogGrid from "../components/blogPosts/BlogGrid";
import FeaturedPost from "../components/blogPosts/FeaturedPost";
import { API_BASE_URL } from "@/config/config";

export default function BlogPage() {
  const [posts, setPosts] = useState<Array<BlogPostDataType>>([]);
  const [filteredPosts, setFilteredPosts] = useState<Array<BlogPostDataType>>(
    []
  );

  useEffect(() => {
    const fetchPosts = async () => {
      console.log("fetching");
      console.log(API_BASE_URL);
      const postsDataResponse = await fetch(`${API_BASE_URL}/posts`);
      const data = await postsDataResponse.json();
      const formattedPosts = data.map((p) => ({ ...p, id: p._id }));

      setPosts(formattedPosts);
      setFilteredPosts(formattedPosts);
    };
    fetchPosts();
  }, []);

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
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} />

      {/* Featured Post */}
      <FeaturedPost post={filteredPosts.length > 0 ? filteredPosts[0] : null} />

      {/* Blog Grid with Animations */}
      <BlogGrid posts={filteredPosts.slice(1)} />

      {/* No Results Found Message */}
      {filteredPosts.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No posts found. Try a different search!
        </div>
      )}
    </div>
  );
}
