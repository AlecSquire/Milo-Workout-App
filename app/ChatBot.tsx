import React from "react";

const ChatBot = () => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#f8f8f8",
        padding: "10px",
        borderTop: "1px solid #ccc",
      }}
    >
      <input type="text" placeholder="im a chat bot how can i help you" />
    </div>
  );
};

export default ChatBot;
