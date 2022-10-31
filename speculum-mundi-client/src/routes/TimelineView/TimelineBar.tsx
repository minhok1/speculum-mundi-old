import { useEffect, useState } from "react";
import "./TimelineBar.css";

export default function TimelineBar() {
  const [cursorPosition, setCursorPosition] = useState(-1);

  const configureCursorPosition = (e: any) => {
    setCursorPosition(e.nativeEvent.x);
  };

  return (
    <div
      onMouseMove={(e) => {
        configureCursorPosition(e);
      }}
      onMouseLeave={() => {
        setCursorPosition(-1);
      }}
      className="timeline-bar"
    >
      {cursorPosition === -1 ? (
        <></>
      ) : (
        <div className="timeline-year">{cursorPosition}</div>
      )}
    </div>
  );
}
