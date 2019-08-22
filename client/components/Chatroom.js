import React, { useState } from "react";
import "./styles.css";

const [handle, setHandle] = useState("");
const [message, setMessage] = useState("");
const [output, setOutput] = useState("");
const [feedback, setFeedback] = useState("");

const ChatRoom = socket => {

  socket.on("chat", data => {
    setFeedback("");
    setOutput(`${data.handle}: ${data.message}`)
  });

  socket.on("typing", data => {
    setFeedback(data + "is typing a message...");
  });

  const onHandleChange = e => {
    setHandle(e.target.value);
  };

  const onMessageChange = e => {
    setMessage(e.target.value);
  };

  const onKeyPress = () => {
    socket.emit("typing", handle.value);
  };

  const onClick = () => {
    socket.emit("chat", { message, handle });

    setHandle("");
    setMessage("");
  };

  return (
    <div id="mario-chat">
      <div id="chat-window">
        <div id="output"><p><strong>{output}</strong></p></div>
        <div id="feedback"><p><em>{feedback}</em></p></div>
      </div>
      <input
        id="handle"
        type="text"
        placeholder="Handle"
        onChange={onHandleChange}
      />
      <input
        id="message"
        type="text"
        placeholder="Message"
        onChange={onMessageChange}
        onKeyPress={onKeyPress}
      />
      <button id="send" onClick={onClick}>
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
