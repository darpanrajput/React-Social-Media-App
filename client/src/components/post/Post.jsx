import React, { useState, useEffect, useContext } from "react";
import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import axios from "axios";
import { format } from "timeago.js";
// import { Link } from "@material-ui/core";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Post({ post }) {
  // console.log(post);
  //   console.log("username=" + post.id);

  //   const user = Users.filter((u) => u.id == 1);
  //   console.log(user);

  // const [like, setLike] = useState(post.like);
  const [like, setLike] = useState(post.likes.length);

  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      // const res = await axios.get(`/users/${post.userId}`);
      const res = await axios.get(`/users?userId=${post.userId}`);

      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  function likehandler() {
    try {
      axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link
              to={
                user._id !== currentUser._id ? `profile/${user.username}` : "/"
              }>
              <img
                className="postProfileImg"
                // src={
                //   PF +
                //   Users.filter((u) => u.id === post?.userId)[0].profilePicture
                // }

                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.jpeg"
                }
                alt="img"
              />
            </Link>
            <span className="postUserName">
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}

              {user.username}
            </span>
            {/* <span className="postDate">{post.date} </span>
             */}

            <span className="postDate">{format(post.createdAt)} </span>
          </div>

          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {/* <img src={PF + post.photo} alt="" className="postImg" /> */}
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              alt="like"
              className="likeIcon"
              onClick={likehandler}
            />
            <img
              src={`${PF}heart.png`}
              alt="love"
              className="likeIcon"
              onClick={likehandler}
            />
            <span className="postLikeCounter">{like} people liked this</span>
          </div>

          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} commented</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
