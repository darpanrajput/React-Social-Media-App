import React from "react";
import "./sidebar.css";
import {
  RssFeed,
  ChatBubbleOutline,
  VideocamOutlined,
  GroupOutlined,
  BookmarkOutlined,
  QuestionAnswerOutlined,
  WorkOffOutlined,
  EventSeatOutlined,
  SchoolOutlined,
} from "@material-ui/icons";

import { Users } from "../../dummyData";
import Friends from "../Friends/Friends";

export default function SideBar() {
  return (
    <div className="sideBar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feeds</span>
          </li>

          <li className="sidebarListItem">
            <ChatBubbleOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>

          <li className="sidebarListItem">
            <VideocamOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">videos</span>
          </li>

          <li className="sidebarListItem">
            <GroupOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>

          <li className="sidebarListItem">
            <BookmarkOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>

          <li className="sidebarListItem">
            <QuestionAnswerOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>

          <li className="sidebarListItem">
            <WorkOffOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>

          <li className="sidebarListItem">
            <EventSeatOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>

          <li className="sidebarListItem">
            <SchoolOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <Friends key={u.id} friends={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
