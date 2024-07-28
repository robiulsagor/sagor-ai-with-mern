import { Header } from "../../components/header/Header";
import Home from "../../pages/home/Home";
import "./rootLayout.css";

const RootLayout = () => {
  return (
    <div className="rootLayout">
      <Header />
      <main>
        {/* <p>the main page goes here</p> */}
        <Home />
      </main>
    </div>
  );
};

export default RootLayout;
