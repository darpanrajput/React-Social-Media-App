import React from "react";
import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";
import "./share.css";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
export default function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(AuthContext);
  console.log(user);
  const desc = useRef();
  const [file, setfile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + "-" + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);

      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            // src={PF + "person/1.jpeg"}
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.jpeg"
            }
            alt="share-person"
            className="shareProfileImg"
          />
          <input
            placeholder={"what's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>

        <hr className="shareHr" />
        {file && (
          <div className="shareImageContainer">
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="shareImage"
            />
            <Cancel
              className="shareCancelImage"
              onClick={() => setfile(null)}
            />
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or video</span>
              <input
                type="file"
                id="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => {
                  console.log(e.target.files[0]);
                  setfile(e.target.files[0]);
                }}
                style={{ display: "none" }}
              />
            </label>

            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>

            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>

            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">React</span>
            </div>
          </div>

          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
