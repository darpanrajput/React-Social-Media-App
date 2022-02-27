import React from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
export default function Topbar() {
  const { user } = useContext(AuthContext);
  let PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer">
      <div className="topBarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">FakeBook</span>
        </Link>
      </div>
      <div className="topBarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input placeholder="Search for Post" className="searchInput" />
        </div>
      </div>
      <div className="topBarRight">
        <div className="topbarLink">
          <span className="topBarLink">Homepage</span>
          <span className="topBarLink">Timeline</span>
        </div>
        <div className="topBarIcons">
          <div className="topBarItemIcon">
            <Person />
            <span className="topBarIconBadge">1</span>
          </div>
        </div>

        <div className="topBarIcons">
          <div className="topBarItemIcon">
            <Link
              to="/messenger"
              style={{ color: "inherit", textDecoration: "inherit" }}>
              <Chat />

              <span className="topBarIconBadge">4</span>
            </Link>
          </div>
        </div>

        <div className="topBarIcons">
          <div className="topBarItemIcon">
            <Notifications />
            <span className="topBarIconBadge">1</span>
          </div>
        </div>
        {/* <img
          src="/assets/person/1.jpeg"
          alt="topBarImage"
          className="topBarImage"
        /> */}

        <Link
          to={`/profile/${user.username}`}
          style={{ textDecoration: "none" }}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.jpeg"
            }
            alt="topBarImage"
            className="topBarImage"
          />
        </Link>
      </div>
    </div>
  );
}
