import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (title.trim().length < 5) {
      setError("Tiêu đề phải từ 5 ký tự");
      return;
    }
    if (body.trim().length < 20) {
      setError("Nội dung phải từ 20 ký tự");
      return;
    }

    const myPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");
    const newPost = { id: Date.now(), userId: 1, title: title, body: body };
    localStorage.setItem("myPosts", JSON.stringify([newPost, ...myPosts]));
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Viết bài mới</h1>
      <input
        placeholder="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Nội dung"
        rows={6}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Đăng bài</button>
    </form>
  );
}