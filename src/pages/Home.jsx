import React, { useEffect, useState } from "react";
import {
  Sun,
  Moon,
  Search,
  ChevronLeft,
  ChevronRight,
  Plus,
  Flame,
} from "lucide-react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Toggle theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Fetch posts from backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Error loading posts:", err);
      }
    };
    fetchPosts();
  }, []);

  // Filter posts by search
  const filteredPosts = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase())
  );

  // Handle upvote
  const handleUpvote = async (id) => {
    try {
      await API.post(`/posts/${id}/upvote`);
      const updated = await API.get("/posts");
      setPosts(updated.data);
    } catch (err) {
      console.error("Error upvoting:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo + Title */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <svg
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
              >
                <path
                  d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight">
              Learnato Forum
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="flex w-full max-w-md items-center bg-gray-100 dark:bg-gray-800 rounded-xl px-3 shadow-inner transition focus-within:ring-2 focus-within:ring-indigo-500">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search topics, questions..."
                className="flex-1 bg-transparent px-3 py-2 outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} className="text-gray-700" />
              )}
            </button>

            {/* New Post */}
            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              <Plus size={18} /> New Post
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            No posts found. Be the first to start a discussion 🚀
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post._id}
              className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
            >
              {/* Vote Section */}
              <div className="flex flex-col items-center pt-1 select-none">
                <button
                  onClick={() => handleUpvote(post._id)}
                  className="p-2.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-indigo-600 dark:text-indigo-300 transition"
                >
                  <Flame size={20} />
                </button>
                <span className="font-semibold text-indigo-700 dark:text-indigo-300 text-sm mt-2">
                  {post.votes}
                </span>
              </div>

              {/* Post Content */}
              <div className="flex-1">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Posted by{" "}
                  <span className="font-medium text-indigo-600 dark:text-indigo-400">
                    {post.author || "Anonymous"}
                  </span>{" "}
                  • {new Date(post.createdAt).toLocaleString()}
                </p>

                <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-4">
                  {post.content}
                </p>

                <button
                  onClick={() =>
                    navigate(`/posts/${post._id}`, { state: { post } })
                  }
                  className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-800/50 transition"
                >
                  View Discussion →
                </button>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 pt-8">
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition">
            <ChevronLeft />
          </button>
          <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">
            1
          </button>
          <button className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            2
          </button>
          <button className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            3
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition">
            <ChevronRight />
          </button>
        </div>
      </main>
    </div>
  );
}
