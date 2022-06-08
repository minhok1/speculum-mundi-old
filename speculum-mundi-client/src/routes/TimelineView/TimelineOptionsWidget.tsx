import "./TimelineOptionsWidget.css";

import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function TimelineOptionsWidget() {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const onMenuClick = (e: any) => {
    e.preventDefault();
    setIsMenuExpanded(!isMenuExpanded);
  };

  return (
    <div className="timeline-menu-container">
      <MenuIcon
        className={"timeline-menu-icon" + (isMenuExpanded ? "-selected" : "")}
        onClick={onMenuClick}
      />
    </div>
  );
}
