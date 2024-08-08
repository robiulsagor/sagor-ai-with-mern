import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  const { isSignedIn, isLoaded, user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    isLoaded && !isSignedIn && navigate("/sign-in");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    fetch("http://localhost:5000/api/chats", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.id, text }),
    });
  };

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
        <form onSubmit={submitHandler}>
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
