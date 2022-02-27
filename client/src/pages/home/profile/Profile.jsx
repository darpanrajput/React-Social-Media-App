import React, { useState, useEffect } from "react";
import Feed from "../../../components/feed/Feed";
import RightBar from "../../../components/rightbar/RightBar";
import SideBar from "../../../components/sidebar/SideBar";
import Topbar from "../../../components/topbar/Topbar";
import "../home.css";
import "./profile.css";
import axios from "axios";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  //  {// // Template literals->
  //   // src={`${PF}post/3.jpeg`}
  //  }
  const [user, setUser] = useState({});
  const params = useParams();
  // console.log(params);
  const username = params.username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <div>
      <Topbar />
      <div className="profile">
        <SideBar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                // src={`${PF}post/3.jpeg`}

                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : `${PF}person/noCover.jpg`
                }
                alt="cover-photo"
                className="profileCoverImg"
              />
              <img
                // src={`${PF}person/2.jpeg`}

                alt="profile-photo"
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.jpeg"
                }
              />
            </div>
            <div className="profileInfo">
              <h5 className="profileInfoName">{user.username}</h5>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed id={user._id} username={username} />
            <RightBar id={user._id} user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
