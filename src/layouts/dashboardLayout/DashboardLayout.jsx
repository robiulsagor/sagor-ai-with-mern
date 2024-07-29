import { Outlet } from "react-router-dom";
import "./dashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboardLayout">
      <div className="menu"></div>
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
