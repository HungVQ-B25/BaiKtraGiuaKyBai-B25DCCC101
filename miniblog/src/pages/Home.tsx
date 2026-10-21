import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Post } from "../types";
import { news } from "../data";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error("Lỗi tải dữ liệu");
        const data = await res.json();

        // Lấy 10 bài đầu, thay nội dung bằng tin tức Việt Nam
        const list = data.slice(0, 10).map((p: Post, i: number) => ({
          ...p,
          title: news[i].title,
          body: news[i].body,
        }));

        // Bài tự viết (lưu ở localStorage) hiện đầu danh sách
        const myPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");
        setPosts([...myPosts, ...list]);
      } catch (err) {
        console.log(err);
        setError("Không tải được dữ liệu");
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="error">Lỗi: {error}</p>;

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Danh sách bài viết</h1>
      <input
        placeholder="Tìm theo tiêu đề..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.length === 0 && <p>Không tìm thấy bài viết nào.</p>}
      {filtered.map((post) => (
        <div key={post.id} className="card">
          <h3>
            <Link to={`/posts/${post.id}`}>{post.title}</Link>
          </h3>
          <p>{post.body.slice(0, 90)}...</p>
        </div>
      ))}
    </div>
  );
}