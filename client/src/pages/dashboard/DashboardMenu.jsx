import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./dashboardMenu.css";

function DashboardMenu() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["userchats"],
    queryFn: () =>
      fetch("http://localhost:5000/api/userchats", {
        credentials: "include",
      }).then((res) => res.json()),
  });

  // if (isPending) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error: {error.message}</div>;
  // }

  console.log(data);

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
            <span className="title">dashboard</span>
            <Link to="/">Create a new chat</Link>
            <Link to="/">Explore Sagor AI</Link>
            <Link to="/">Contact</Link>
          </div>
          <hr className="hr" />

          <div>
            <span className="title"> recent chat</span>

            {isPending ? (
              <p style={{ margin: "10px 0" }}>Loading...</p>
            ) : (
              data?.length && (
                <div className="list">
                  {data.map((item, i) => (
                    <Link key={i} to={`/dashboard/chat/${item.id}`}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              )
            )}
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
