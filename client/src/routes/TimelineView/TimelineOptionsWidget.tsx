import "./TimelineOptionsWidget.css";
import { timelineDiagramOptions } from "../../Shared/diagramOptions";

import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export default function TimelineOptionsWidget(props: any) {
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);

  const onMenuClick = (e: any) => {
    e.preventDefault();
    setIsMenuExpanded(!isMenuExpanded);
  };

  const onOptionClick = (option: string) => {
    props.setEditStatus(true);
    switch (option) {
      case "Add Node":
        props.setIsEditNode(true);
        props.setIsEditAddition(true);
        break;
      case "Add Edge":
        props.setIsEditNode(false);
        props.setIsEditAddition(true);
        break;
      case "Remove Node":
        props.setIsEditNode(true);
        props.setIsEditAddition(false);
        break;
      case "Remove Edge":
        props.setIsEditNode(false);
        props.setIsEditAddition(false);
        break;
    }
  };

  return (
    <div className="timeline-menu-container">
      <MenuIcon
        className={"timeline-menu-icon" + (isMenuExpanded ? "-selected" : "")}
        onClick={onMenuClick}
      />
      {isMenuExpanded && (
        <div className="options-container">
          {timelineDiagramOptions.map((option) => (
            <div
              className="option-panel"
              onClick={() => {
                onOptionClick(option);
              }}
              key={option}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
