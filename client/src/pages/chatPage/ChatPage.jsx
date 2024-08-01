import ChatInput from "../../components/chatInput/ChatInput";
import "./chatPage.css";

const ChatPage = () => {
  console.log("chat page rendered");
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message user">What is AI</div>
          <div className="message ">
            AI is something Artificial Intelligence. It is something that can
            help you do many things.
          </div>
          <ChatInput />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
