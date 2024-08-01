import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="container">
      <img src="./orbital.png" className="bgImg" />

      <div className="left">
        <h1>sagor ai</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis
          corporis labore harum. Omnis, aspernatur?
        </p>
        <Link to={"/dashboard"}>get started</Link>
      </div>
      <div className="right">
        <div className="right-container">
          <img src="/bg.png" alt="" className="bgImgRight" />
          <img src="./bot.png" alt="" className="botImg" />
        </div>
      </div>

      <div className="terms">
        <img src="./logo.png" alt="" />
        <div className="links">
          <Link to="/">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
