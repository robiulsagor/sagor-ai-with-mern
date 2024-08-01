import { Outlet } from "react-router-dom";
import { Header } from "../../components/header/Header";
import "./rootLayout.css";

const RootLayout = () => {
  return (
    <div className="rootLayout">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
