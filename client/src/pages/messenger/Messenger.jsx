import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { ChatOnline } from "../../components/chatOnline/ChatOnline";
import { Conversations } from "../../components/conversations/Conversations";
import { Message } from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";
import axios from "axios";
import { useRef } from "react";
import { io } from "socket.io-client";

export const Messenger = () => {
  const [converstaions, setConversations] = useState([]);
  const [currentChats, setcurrentChats] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const [onlineUsers, setOnlineUser] = useState([]);

  const [arrivalMessages, setArrivalMessages] = useState(null);

  const socket = useRef();
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const scrolRef = useRef();
  // console.log(user._id);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessages({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessages &&
      currentChats?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChats]);

  useEffect(() => {
    //send user id to socket server
    socket.current.emit("sendUser", user._id);
    //get all the users array from socket server

    socket.current.on("getUsers", (users) => {
      console.log(users);
      setOnlineUser(
        user.following.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get("/conversations/" + user._id);
        // console.log(response);
        setConversations(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        console.log(currentChats);
        console.log("conversation ID");
        console.log(currentChats._id);

        const res = await axios.get("/messages/" + currentChats?._id);
        setMessages(res.data);
        console.log("messages");
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChats]);

  // console.log(messages);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessages,
      conversationId: currentChats._id,
    };

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId: currentChats.members.find((memeber) => memeber !== user._id),
      text: newMessages,
    });
    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessages("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    {
      scrolRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  });

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search For Friends"
              className="chatMenuInput"
            />
            {converstaions.map((convo) => (
              <div
                onClick={() => {
                  setcurrentChats(convo);
                }}>
                <Conversations
                  converstaion={convo}
                  currentUser={user}
                  key={convo._id}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChats ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrolRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    placeholder="write something..."
                    className="chatMessageInput"
                    onChange={(e) => setNewMessages(e.target.value)}
                    value={newMessages}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConverstaionText">
                {" Open A conversation \n to start a chat.."}
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUserId={user._id}
              setcurrentChats={setcurrentChats}
            />
          </div>
        </div>
      </div>
    </>
  );
};
