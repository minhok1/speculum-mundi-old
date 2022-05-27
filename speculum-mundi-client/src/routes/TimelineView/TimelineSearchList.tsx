import { Abstract } from "../../types";
import "./TimelineSearchList.css";

import AddIcon from "@mui/icons-material/Add";

export default function TimelineSearchList(props: any) {
  const addAbstract = (item: Abstract) => {
    if (!props.abstracts.includes(item)) {
      props.setAbstracts([...props.abstracts, item]);
    }
  };
  return (
    <div className="container-panel timeline-search-list">
      <div className="timeline-search-list-title">Search Result</div>
      {props.searchList.map((item: Abstract) => (
        <div key={item.id} className="timeline-search-list-item">
          <div className="timeline-search-list-text">{item.title}</div>
          <AddIcon
            className="timeline-search-list-icon"
            onClick={(e) => {
              e.preventDefault();
              addAbstract(item);
            }}
          />
        </div>
      ))}
    </div>
  );
}
