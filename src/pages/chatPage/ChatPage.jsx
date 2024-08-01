import { useEffect, useRef } from "react";
import "./chatPage.css";

const ChatPage = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message user">What is AI</div>
          <div className="message ">
            AI is something Artificial Intelligence. It is something that can
            help you do many things.
          </div>
          <div className="message user">What is AI</div>
          <div className="message ">
            AI is something Artificial Intelligence. It is something that can
            help you do many things.
          </div>
          <div className="message user">What is AI</div>
          <div className="message ">
            AI is something Artificial Intelligence. It is something that can
            help you do many things.
          </div>
          <div className="message user">
            What is AI? AI is something Artificial Intelligence. It is something
            that can help you do many things.
          </div>
          <div className="message ">
            AI is something Artificial Intelligence. It is something that can
            help you do many things. AI is something Artificial Intelligence. It
            is something that can help you do many things. AI is something
            Artificial Intelligence. It is something that can help you do many
            things. AI is something Artificial Intelligence. It is something
            that can help you do many things.
          </div>

          <div ref={endRef} className="paddingBottom" />
        </div>

        <div className="inputForm">
          <form action="">
            <label htmlFor="file">
              <img src="/attachment.png" alt="" />
            </label>
            <input type="file" id="file" hidden />
            <input type="text" name="" id="" />
            <button>
              <img src="/arrow.png" alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
