import { NavLink, Outlet } from "react-router-dom";

import "./NavHeader.css";

export default function NavHeader() {
  return (
    <div className="header-container">
      <div className="header-title">
        <img src="src\Assets\logo-simplified.png" className="header-logo" />
        <h1 className="title-text">Speculum Mundi</h1>
      </div>
      <nav className="navigation-panel">
        <NavLink to="/">
          <button className="navigation-button">Home</button>
        </NavLink>
        <NavLink to="/timeline">
          <button className="navigation-button">Timeline</button>
        </NavLink>
        <NavLink to="/map">
          <button className="navigation-button">Map</button>
        </NavLink>
        <NavLink to="/discussions">
          <button className="navigation-button">Discussions</button>
        </NavLink>
        <NavLink to="/contact">
          <button className="navigation-button">Contact</button>
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
