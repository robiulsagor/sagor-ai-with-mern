import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();

  console.log(isSignedIn, isLoaded);

  useEffect(() => {
    isLoaded && !isSignedIn && navigate("/sign-in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  return (
    <div className="dashboard-container">
      <div className="top">
        <div className="branding">
          <img src="./logo.png" alt="" />
          <h1>sagor ai</h1>
        </div>

        <div className="features">
          <div className="feature">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>

          <div className="feature">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>

          <div className="feature">
            <img src="/code.png" alt="" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>

      <div className="inputContainer">
        <form action="">
          <input type="text" name="" id="" placeholder="Ask me anything..." />
          <button>
            <img src="./arrow.png" alt="" className="btnImg" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
