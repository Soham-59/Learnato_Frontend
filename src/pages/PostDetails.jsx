import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowUp, Bell, Search, Send, ChevronLeft } from "lucide-react";
import API from "../api";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");





  // Fetch post and replies
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data.post);
        setReplies(res.data.replies || []);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [id]);

  // Add reply
  const handleReply = async () => {
    if (!newReply.trim()) return alert("Reply cannot be empty!");
    try {
      await API.post(`/posts/${id}/reply`, {
        content: newReply,
        author: "User",
      });
      setNewReply("");
      const updated = await API.get(`/posts/${id}`);
      setReplies(updated.data.replies);
    } catch (err) {
      console.error("Error adding reply:", err);
    }
  };

  if (!post)
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500 dark:text-gray-400">
        Loading post details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black font-display text-gray-800 dark:text-gray-200">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/70 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer text-gray-900 dark:text-white hover:opacity-80 transition"
          >
            <ChevronLeft size={20} />
            <div className="bg-gradient-to-tr from-indigo-500 to-purple-500 p-2 rounded-lg text-white shadow-md">
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
            <span className="text-lg font-bold tracking-tight">
              Learnato Forum
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 justify-center px-8">
            <div className="flex w-full max-w-md items-center bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden px-3">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search discussions..."
                className="flex-1 bg-transparent px-2 py-2 outline-none text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-primary/10 transition text-gray-600 dark:text-gray-300 hover:text-primary">
              <Bell size={20} />
            </button>
            <div
              className="w-10 h-10 rounded-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/a/default-user')",
              }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-12 gap-8">
        {/* Left: Post + Replies */}
        <section className="col-span-12 lg:col-span-8 flex flex-col gap-8">
          {/* Post Card */}
          <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-800">
            <div className="flex items-start gap-6">
              {/* Upvote */}
              <div className="flex flex-col items-center">
                <button
                  onClick={async () => {
                    await API.post(`/posts/${post._id}/upvote`);
                    const updated = await API.get(`/posts/${id}`);
                    setPost(updated.data.post);
                  }}
                  className="p-2 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition"
                >
                  <ArrowUp size={26} className="text-indigo-600 dark:text-indigo-400" />
                </button>
                <p className="font-bold text-lg">{post.votes}</p>
              </div>

              {/* Post Content */}
              <div className="flex-1">
                <p className="text-gray-500 text-sm mb-2">
                  Posted by <span className="font-semibold">@{post.author}</span> •{" "}
                  {new Date(post.createdAt).toLocaleString()}
                </p>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4 leading-snug">
                  {post.title}
                </h1>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>
              </div>
            </div>
          </div>

          {/* Replies Section */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              💬 {replies.length} {replies.length === 1 ? "Reply" : "Replies"}
            </h2>

            <div className="flex flex-col gap-6">
              {replies.map((r, i) => (
                <div
                  key={i}
                  className="flex gap-4 bg-white/80 dark:bg-gray-900/70 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
                >
                  <div
                    className="w-10 h-10 rounded-full bg-center bg-cover shrink-0"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/a/default-user')",
                    }}
                  ></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-gray-900 dark:text-gray-100">
                        @{r.author}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(r.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {r.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Reply Box */}
            <div className="flex gap-4 mt-8">
              <div
                className="w-10 h-10 rounded-full bg-center bg-cover shrink-0"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/a/default-user')",
                }}
              ></div>
              <div className="flex-1 bg-white/90 dark:bg-gray-900/80 rounded-xl border border-gray-200 dark:border-gray-800 shadow-inner">
                <textarea
                  className="w-full p-4 bg-transparent border-none outline-none resize-none text-gray-800 dark:text-gray-200"
                  rows="4"
                  placeholder="Add your reply..."
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                />
                <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 p-3">
                  <button
                    onClick={handleReply}
                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <Send size={16} /> Send Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Sidebar */}
        <aside className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white/90 dark:bg-gray-900/80 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold mb-4">📜 Forum Rules</h3>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-400 list-disc list-inside">
              <li>Be respectful and helpful.</li>
              <li>Stay on-topic.</li>
              <li>No spam or ads.</li>
              <li>Use proper formatting for code.</li>
            </ul>
          </div>

          <div className="bg-white/90 dark:bg-gray-900/80 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-bold mb-4">🧩 Related Discussions</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Best way to fetch data in React?
                </a>
                <p className="text-xs text-gray-500">19 replies</p>
              </li>
              <li>
                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Context API vs Redux in 2025
                </a>
                <p className="text-xs text-gray-500">32 replies</p>
              </li>
              <li>
                <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                  Optimizing performance with useMemo
                </a>
                <p className="text-xs text-gray-500">8 replies</p>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
