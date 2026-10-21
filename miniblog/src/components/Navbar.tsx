import { Link, useNavigate } from "react-router-dom";

export default function Navbar({
  user,
  onLogout,
}: {
  user: string;
  onLogout: () => void;
}) {
  const navigate = useNavigate();

  function handleLogout() {
    onLogout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/">MiniBlog</Link>
      {user ? (
        <>
          <Link to="/new">Viết bài</Link>
          <span>Xin chào, {user}</span>
          <button onClick={handleLogout}>Đăng xuất</button>
        </>
      ) : (
        <Link to="/login">Đăng nhập</Link>
      )}
    </nav>
  );
}