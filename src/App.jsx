import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreatePost from "./pages/CreatePost.jsx"; // you’ll add later
import PostDetails from "./pages/PostDetails.jsx"; // you’ll add later

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
