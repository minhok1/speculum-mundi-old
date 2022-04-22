import NavHeader from "../../NavHeader/NavHeader";
import "./TimelineView.css";

import { useState, useEffect } from "react";
import { Abstract, TimelineEvent } from "../../types";
import TimelineSearch from "./TimelineSearch";

export default function TimelineView() {
  const [abstracts, setAbstracts] = useState<Abstract[]>([]);

  const configureAbstracts = () => {
    abstracts.forEach((abs, absIndex) => {
      fetch(`http://localhost:8000/api/timeline_events/context=${abs.id}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
        });
    });
  };

  useEffect(() => {
    configureAbstracts();
  }, [abstracts]);

  return (
    <div>
      <NavHeader />
      <TimelineSearch state={abstracts} stateChanger={setAbstracts} />
      <div className="canvas-container"></div>
    </div>
  );
}
