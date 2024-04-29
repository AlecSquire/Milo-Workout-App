import React, { useEffect, useState } from "react";

const NewUserSurvey = () => {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const content =
    "Hello, I'm Milo, the AI fitness expert inspired by the Greek God of strength and progressive overload";

  useEffect(() => {
    if (isTyping && currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setText((prevText) => prevText + content[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 50); // Adjust typing speed here (milliseconds)
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [currentIndex, isTyping, content]);

  return (
    <div>
      <h3 className=" text-black p-2 border-spacing-1 m-2 rounded">{text}</h3>
    </div>
  );
};

export default NewUserSurvey;
