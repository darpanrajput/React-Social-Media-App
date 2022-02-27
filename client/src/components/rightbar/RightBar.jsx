import React, { useContext } from "react";
import OnlineFriends from "../online/OnlineFriends";
import "./rightbar.css";
import { Users } from "../../dummyData";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function RightBar({ id, user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.following.includes(id));

  console.log(currentUser.following.includes(id));
  console.log(id);

  console.log(currentUser.following);

  // useEffect(() => {
  //   setFollowed(currentUser.following.includes(user?._id));
  // }, [currentUser, user?._id]);

  // console.log("current user=" + currentUser._id);
  // console.log("user=" + user._id);
  // console.log("current user following=" + currentUser.following);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/followings/" + id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };

    getFriends();
    setFollowed(currentUser.following.includes(id));
  }, [user]);

  const Advertisement = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img
            src={`${PF}gift.png`}
            alt="birthdayImg"
            className="birthdayImg"
          />

          <span className="birthdayText">
            <b>Pola foster</b> and <b>3 other friends</b> have birthday today
          </span>
        </div>
        <img src={`${PF}ad.png`} alt="advertisement" className="ad" />
      </>
    );
  };
  const HomeRightBar = () => {
    return (
      <>
        <Advertisement />

        <h4 className="rightbarTitle">Online friends</h4>

        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <OnlineFriends key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const RightBarFollowingUser = ({ following }) => {
    return (
      <>
        <div className="rightBarFollowing">
          <img
            src={
              following.profilePicture
                ? PF + following.profilePicture
                : PF + "person/noAvatar.jpeg"
            }
            alt="user "
            className="rightBarFollowingImg"
          />
          <span className="rightBarFollowingName">{following.username}</span>
        </div>
      </>
    );
  };

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });

        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };
  const ProfileRightBar = ({ key }) => {
    console.log("followed=" + followed);
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="userBarTitle">User Information</h4>
        <div className="rightBarInfo">
          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">City:</span>
            <span className="rightBarInfoValue">{user.city}</span>
          </div>

          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">From:</span>
            <span className="rightBarInfoValue">{user.from}</span>
          </div>

          <div className="rightBarInfoItem">
            <span className="rightBarInfoKey">Relationship :</span>
            <span className="rightBarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "Complicated"}
            </span>
          </div>
        </div>

        <h4 className="userBarTitle">User Friends</h4>

        <div className="rightBarFllowings">
          {friends.map((u) => (
            <Link
              to={"/profile/" + u.username}
              style={{ textDecoration: "none" }}>
              <RightBarFollowingUser following={u} />
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightBar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightBar key={user._id} /> : <HomeRightBar />}
        {/* <Advertisement /> */}
      </div>
    </div>
  );
}
