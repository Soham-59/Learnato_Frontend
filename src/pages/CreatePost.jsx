import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import {
  Bold,
  Italic,
  Link2,
  Code,
  List,
  Menu,
  Plus,
} from "lucide-react";

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    tags: "",
    content: "",
    author: "Soham",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts", {
        title: form.title,
        content: form.content,
        author: form.author,
      });
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black font-display text-slate-800 dark:text-slate-200">
      {/* Navbar */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-white/70 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-gray-900 dark:text-white">
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
            <span className="text-lg font-extrabold tracking-tight">
              Learnato Forum
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/create")}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 text-sm font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
            >
              <Plus size={16} /> Create Post
            </button>
            <div
              className="bg-center bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/a/default-user')",
              }}
            ></div>
          </div>

          {/* Mobile Menu */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <Menu size={20} />
          </button>
        </div>
      </header>

      {/* Main Form */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            ✍️ Create a New Post
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Share insights, ask questions, and help others grow.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Author */}
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={form.author}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Title */}
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g., How to connect Node.js with MongoDB?"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="e.g., react, mongodb, express"
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                placeholder="Describe your problem or idea..."
                className="w-full min-h-[200px] rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 px-4 py-3 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-y"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-md hover:scale-105 active:scale-95 transition-all duration-300"
              >
                Submit Post
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
