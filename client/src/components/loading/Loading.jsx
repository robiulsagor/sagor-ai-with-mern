import { useEffect, useState } from "react";

function Loading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 500); // Adjust the interval to your preference

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  console.log(dots);
  return (
    <div>
      <p className="loading">Loading{dots}</p>
    </div>
  );
}

export default Loading;
