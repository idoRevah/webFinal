import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative mb-6 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search blog posts..."
        value={query}
        onChange={handleSearch}
        className="w-full px-4 py-2 text-lg text-gray-300 bg-gray-800 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <span className="absolute right-4 top-3 text-gray-400">🔍</span>
    </div>
  );
};

export default SearchBar;
