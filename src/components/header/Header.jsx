import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
  return (
    <header>
      <Link to={"/"} className="logo">
        <img src="/logo.png" alt="" />
        sagor ai
      </Link>

      <div className="login">Login</div>
    </header>
  );
};
