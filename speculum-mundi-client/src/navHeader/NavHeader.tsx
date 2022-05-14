import { NavLink, Outlet } from "react-router-dom";
import logo from "../Assets/logo-simplified.png";

import "./NavHeader.css";

export default function NavHeader() {
  return (
    <div className="nav-container">
      <div className="nav-title">
        <h1 className="title-text">Speculum Mundi</h1>
      </div>
      <nav className="navigation-panel">
        <NavLink
          to="/home"
          className={(props) =>
            props.isActive ? "active-link" : "navigation-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/timeline"
          className={(props) =>
            props.isActive ? "active-link" : "navigation-link"
          }
        >
          Timeline
        </NavLink>
        <NavLink
          to="/map"
          className={(props) =>
            props.isActive ? "active-link" : "navigation-link"
          }
        >
          Map
        </NavLink>
        <NavLink
          to="/discussions"
          className={(props) =>
            props.isActive ? "active-link" : "navigation-link"
          }
        >
          Discussions
        </NavLink>
        <NavLink
          to="/contact"
          className={(props) =>
            props.isActive ? "active-link" : "navigation-link"
          }
        >
          Resources
        </NavLink>
        <div className="separator"></div>
        <NavLink
          to="/contact"
          className={(props) =>
            props.isActive ? "active-link" : "navigation-link"
          }
        >
          Settings
        </NavLink>
        <NavLink
          to="/contact"
          className={(props) =>
            props.isActive ? "active-link" : "navigation-link"
          }
        >
          Contact Us
        </NavLink>
        <NavLink
          to="/contact"
          className={(props) =>
            props.isActive ? "active-link" : "navigation-link"
          }
        >
          Settings
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
