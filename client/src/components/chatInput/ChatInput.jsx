import { IKImage } from "imagekitio-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import model from "../../../lib/gemini";
import Upload from "../upload/Upload";
import Loading from "../loading/Loading";

const ChatInput = () => {
  const endRef = useRef(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
  });

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, img.dbData]);

  async function run(text) {
    setQuestion(text);
    const result = await model.generateContent(text);
    const response = await result.response;
    setAnswer(response.text());
    setImg((prev) => ({ ...prev, isLoading: false }));

    console.log("answerr:: ", answer);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setImg((prev) => ({ ...prev, isLoading: true }));
    const text = e.target.text.value;
    if (!text) return;

    run(text);
    e.target.text.value = "";
  };

  return (
    <>
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMGKIT_URL_ENDPOINT}
          path={img.dbData?.filePath}
        />
      )}

      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message ">
          {}
          <Markdown>{answer}</Markdown>
        </div>
      )}

      <div ref={endRef} className="paddingBottom" />

      <div className="inputForm">
        {img.isLoading && <Loading />}

        <form onSubmit={handleSubmit}>
          <label htmlFor="file">
            <img src="/attachment.png" alt="" />
          </label>
          <Upload setImg={setImg} isLoading={img.isLoading} />

          <input type="file" id="file" hidden disabled={img.isLoading} />
          <input
            type="text"
            name="text"
            autoComplete="false"
            disabled={img.isLoading}
          />
          <button type="submit" disabled={img.isLoading}>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatInput;
