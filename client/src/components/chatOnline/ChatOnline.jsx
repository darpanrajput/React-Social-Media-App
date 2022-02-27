import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import "./chatOnline.css";
export const ChatOnline = ({ onlineUsers, currentUserId, setcurrentChats }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFrineds] = useState([]);
  const [onlineFriends, setOnlineFrineds] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/users/followings/" + currentUserId);
      setFrineds(res.data);
    };

    getFriends();
  }, [currentUserId]);

  console.log("Followings/friends");
  console.log(friends);

  useEffect(() => {
    setOnlineFrineds(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  console.log("OnlineFriends");
  console.log(onlineFriends);

  async function openCurrentChatBox(user) {
    try {
      const res = await axios.get(
        `/conversations/find/${currentUserId}/${user._id}`
      );
      console.log("converstaion chats=");
      console.log(res.data);
      setcurrentChats(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="chatOnline">
      {onlineFriends.map((of) => (
        <div
          className="chatOnlineFriend"
          onClick={() => openCurrentChatBox(of)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              alt=""
              src={
                of?.profilePicture
                  ? PF + of.profilePicture
                  : PF + "person/noAvatar.jpeg"
              }
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{of?.username} </span>
        </div>
      ))}
    </div>
  );
};
