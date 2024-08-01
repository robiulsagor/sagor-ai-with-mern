import { Outlet } from "react-router-dom";
import DashboardMenu from "../../pages/dashboard/DashboardMenu";
import "./dashboardLayout.css";

function DashboardLayout() {
  return (
    <div className="dashboardLayout">
      <DashboardMenu />

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
