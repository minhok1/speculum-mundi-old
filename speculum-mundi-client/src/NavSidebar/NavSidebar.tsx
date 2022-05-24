import { NavLink, Outlet } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import TimelineIcon from "@mui/icons-material/Timeline";
import MapIcon from "@mui/icons-material/Map";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

import "./NavSidebar.css";

export default function NavSidebar() {
  const menuConfig = [
    { to: "/home", name: "Home", icon: <HomeIcon /> },
    { to: "/information", name: "Information", icon: <LibraryBooksIcon /> },
    { to: "/timeline", name: "Timeline", icon: <TimelineIcon /> },
    { to: "/map", name: "Map", icon: <MapIcon /> },
    { to: "/discussions", name: "Discussions", icon: <QuestionAnswerIcon /> },
    { to: "/resources", name: "Resources", icon: <BookIcon /> },
    { to: "/settings", name: "Settings", icon: <SettingsIcon /> },
    { to: "/help", name: "Help", icon: <HelpIcon /> },
  ];

  return (
    <div className="nav-container">
      <div className="nav-title">
        <h1 className="title-text">Speculum Mundi</h1>
      </div>
      <nav className="navigation-panel">
        {menuConfig.map((navLinkInfo) => {
          return (
            <span key={navLinkInfo.name}>
              <NavLink
                to={navLinkInfo.to}
                className={(props) =>
                  props.isActive ? "active-link" : "navigation-link"
                }
              >
                {navLinkInfo.icon}
                <span className="navigation-link-title">
                  {navLinkInfo.name}
                </span>
              </NavLink>
              {navLinkInfo.name === "Resources" ? (
                <div className="separator"></div>
              ) : null}
            </span>
          );
        })}
      </nav>
      <Outlet />
    </div>
  );
}
