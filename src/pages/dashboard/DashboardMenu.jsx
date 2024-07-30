import { useState } from "react";
import { Link } from "react-router-dom";
import "./dashboardMenu.css";

function DashboardMenu() {
  const [showMenu, setShowMenu] = useState(true);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  console.log(showMenu);

  return (
    <>
      <div className="menuIcon" onClick={toggleMenu}>
        {/* <i className="fa-solid fa-bars"></i> */}
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className={`menu ${showMenu ? "showMenu" : "hideMenu"}`}>
        <div className="menuItems">
          <div>
            <span>dashboard</span>
            <Link to="/">Create a new chat</Link>
            <Link to="/">Explore Sagor AI</Link>
            <Link to="/">Contact</Link>
          </div>
          <hr className="hr" />

          <div>
            <span> recent chat</span>

            <Link to={"/"}>test</Link>
            <Link to={"/"}>test</Link>
          </div>
          <hr className="hr" />
        </div>

        <div className="upgrade">
          <img src="/logo.png" alt="" />
          <div>
            <p>Upgrade to Sagor AI Premium</p>
            <p>Get unlimited access to all features</p>
          </div>
        </div>
      </div>
      <div
        onClick={toggleMenu}
        className={`sidebarWrapper ${showMenu ? "showMenu" : "hideMenu"}`}
      ></div>
    </>
  );
}

export default DashboardMenu;
