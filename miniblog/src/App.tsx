import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Login from "./pages/Login";
import NewPost from "./pages/NewPost";
import NotFound from "./pages/NotFound";

export default function App() {
  // Lấy người dùng đã đăng nhập từ localStorage (chuỗi rỗng = chưa đăng nhập)
  const [user, setUser] = useState(localStorage.getItem("user") || "");

  function handleLogin(name: string) {
    localStorage.setItem("user", name);
    setUser(name);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser("");
  }

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route element={<ProtectedRoute user={user} />}>
            <Route path="/new" element={<NewPost />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}