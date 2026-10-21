import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { Post, Comment } from "../types";
import { news, commentList } from "../data";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      // Bài tự viết nằm trong localStorage
      const myPosts = JSON.parse(localStorage.getItem("myPosts") || "[]");
      const myPost = myPosts.find((p: Post) => p.id === Number(id));
      if (myPost) {
        setPost(myPost);
        setLoading(false);
        return;
      }

      try {
        const base = "https://jsonplaceholder.typicode.com";

        const res1 = await fetch(`${base}/posts/${id}`);
        if (!res1.ok) throw new Error("Không tìm thấy bài viết");
        const data = await res1.json();
        const n = news[Number(id) - 1];
        setPost(n ? { ...data, title: n.title, body: n.body } : data);

        const res2 = await fetch(`${base}/posts/${id}/comments`);
        const cmts = await res2.json();
        setComments(
          cmts.map((c: Comment, i: number) => ({
            ...c,
            name: commentList[i % 5].name,
            body: commentList[i % 5].body,
          }))
        );
      } catch (err) {
        console.log(err);
        setError("Không tìm thấy bài viết");
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className="error">Lỗi: {error}</p>;
  if (!post) return null;

  return (
    <div>
      <Link to="/">← Quay lại</Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>

      <h3>Bình luận ({comments.length})</h3>
      {comments.length === 0 && <p>Chưa có bình luận.</p>}
      {comments.map((c) => (
        <div key={c.id} className="comment">
          <b>{c.name}</b> <small>({c.email})</small>
          <p>{c.body}</p>
        </div>
      ))}
    </div>
  );
}