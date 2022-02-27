import "./friends.css";
import React from "react";

export default function Friends({ friends }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img
        src={PF + friends.profilePicture}
        alt=""
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{friends.username}</span>
    </li>
  );
}
