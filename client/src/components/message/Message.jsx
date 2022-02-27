import React from "react";
import "./message.css";
import { format } from "timeago.js";

export const Message = ({ message, own }) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ24sk8gYDCX3n31OUwNA23xkCB7T3Sp1QXDv_RGu11PiY5wzliJczCBaUMhZId4eJPOo&usqp=CAU"
          alt=""
          className="messageImg"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)} </div>
    </div>
  );
};
