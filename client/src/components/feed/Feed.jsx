import React, { useState, useEffect } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { useContext } from "react";
// import { Posts } from "../../dummyData";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [post, setPost] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("feed rendered");

    const fetchPost = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("posts/timeline/" + user._id);
      setPost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      // console.log(res);
      // return res.data;
    };
    fetchPost();
  }, [username, user._id]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* only show share component for current user only */}
        {(!username || username === user.username) && <Share />}
        {/* <Post />

        {Posts.map((p) => (
          // console.log("phd=" + p);
          <Post key={p.id} post={p} />
        ))} */}

        {post.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
