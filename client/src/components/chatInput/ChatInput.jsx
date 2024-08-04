import { IKImage } from "imagekitio-react";
import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import model from "../../../lib/gemini";
import Loading from "../loading/Loading";
import Upload from "../upload/Upload";

const ChatInput = () => {
  const endRef = useRef(null);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, img.dbData]);

  async function run(text) {
    setQuestion(text);

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello, I have 2 dogs in my house." }],
        },
        {
          role: "model",
          parts: [{ text: "Great to meet you. What would you like to know?" }],
        },
      ],
      generationConfig: {
        // maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessageStream(
      Object.entries(img?.aiData).length ? [img.aiData, text] : [text]
    );

    let ans = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      ans += chunkText;
      setAnswer(ans);
    }

    setImg((prev) => ({ ...prev, isLoading: false, aiData: {}, dbData: {} }));

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
          className="dbImg"
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
