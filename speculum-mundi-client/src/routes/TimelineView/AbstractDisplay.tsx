import { Abstract } from "../../types";
import "./AbstractDisplay.css";

import RemoveIcon from "@mui/icons-material/Remove";

export default function AbstractDisplay(props: any) {
  const RemoveAbstract = (item: Abstract) => {
    props.setAbstracts(
      props.abstracts.filter((abstract: Abstract) => abstract.id !== item.id)
    );
  };
  return (
    <div className="container-panel abstract-display-container">
      <div className="timeline-search-list-title">Active Abstracts</div>
      {props.abstracts.map((item: Abstract) => (
        <div key={item.id} className="timeline-search-list-item">
          <div className="timeline-search-list-text">{item.title}</div>
          <RemoveIcon
            className="timeline-search-list-icon"
            onClick={(e) => {
              e.preventDefault();
              RemoveAbstract(item);
            }}
          />
        </div>
      ))}
    </div>
  );
}
