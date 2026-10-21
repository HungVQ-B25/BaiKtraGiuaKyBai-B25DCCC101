import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }: { onLogin: (name: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (username === "admin" && password === "123456") {
      onLogin(username);
      navigate("/new");
    } else {
      setError("Sai tài khoản hoặc mật khẩu");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Đăng nhập</h1>
      <input
        placeholder="Tài khoản"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Đăng nhập</button>
    </form>
  );
}