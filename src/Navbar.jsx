import React from "react";
import { Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-background-dark shadow-sm dark:border-b dark:border-white/10 font-display">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        {/* Left Section: Logo & Nav Links */}
        <div className="flex items-center gap-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-white">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <span className="tracking-tighter">Learnato Forum</span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className="text-sm font-medium text-primary border-b-2 border-primary pb-1"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/myposts")}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition"
            >
              My Posts
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary transition"
            >
              About
            </button>
          </nav>
        </div>

        {/* Center Section: Search Bar */}
        <div className="hidden lg:flex flex-1 justify-center px-8">
          <label className="relative flex w-full max-w-lg items-center">
            <Search className="absolute left-4 text-gray-400 dark:text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search forum..."
              className="w-full rounded-xl border-0 bg-gray-100 dark:bg-white/10 py-2.5 pl-12 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary outline-none"
            />
          </label>
        </div>

        {/* Right Section: User Actions */}
        <div className="flex items-center gap-4">
          {/* Ask Question */}
          <button
            onClick={() => navigate("/create")}
            className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-4 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            <Plus size={16} />
            <span className="truncate hidden sm:inline">Ask a Question</span>
          </button>

          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className="hidden md:flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-gray-100 dark:bg-white/10 px-4 text-sm font-bold text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20 transition"
          >
            Login
          </button>

          {/* User Avatar */}
          <div className="flex items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCK3qx5E9yNh1RTOUr0_PQApcArd06Kg5PYvZ8BA4tSCSmEXXskc8wRZMkVrswDyZXpFGM3UHjftA4AFsA0MWGytqRqteTYQ7AOPVYVcx5EUa9aq_VugCRbbJe7cp8_Xdm6qgcEGAkS_OnCK7eCsTZdz9HvTdZ_wowrOe9MQsxkhvCqDXGkbcGkbzXxmHwfvpcmsKngRWcD0NCrDvzaazlfwDluvuQklsWcb3FeBXfYQLyMQye_dswS9vNf90TxfoewrDg1Jh0iF5c')",
              }}
            ></div>
          </div>
        </div>
      </div>
    </header>
  );
}
