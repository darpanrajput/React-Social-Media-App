import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./conversations.css";

export const Conversations = ({ converstaion, currentUser }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = converstaion.members.find((m) => m !== currentUser._id);
    const getuser = async () => {
      try {
        const res = await axios("/users?userId=" + friendId);
        // console.log(res);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getuser();
  }, [currentUser, converstaion]);

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.jpeg"
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};
