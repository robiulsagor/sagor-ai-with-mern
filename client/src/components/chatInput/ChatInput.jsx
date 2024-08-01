import { IKImage } from "imagekitio-react";
import { useEffect, useRef, useState } from "react";
import model from "../../../lib/gemini";
import Upload from "../upload/Upload";

const ChatInput = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function run(text) {
    setQuestion(text);
    const result = await model.generateContent(text);
    const response = await result.response;
    setAnswer(response.text());
    console.log("answerr:: ", answer);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    run(text);
  };

  return (
    <>
      {img.isLoading && <p>Loading...</p>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMGKIT_URL_ENDPOINT}
          path={img.dbData?.filePath}
        />
      )}

      {question && <div className="message user">{question}</div>}
      {answer && <div className="message ">{answer}</div>}

      <div ref={endRef} className="paddingBottom" />

      <div className="inputForm">
        <form onSubmit={handleSubmit}>
          <label htmlFor="file">
            <img src="/attachment.png" alt="" />
          </label>
          <Upload setImg={setImg} />

          <input type="file" id="file" hidden />
          <input type="text" name="text" id="" />
          <button type="submit">
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatInput;
