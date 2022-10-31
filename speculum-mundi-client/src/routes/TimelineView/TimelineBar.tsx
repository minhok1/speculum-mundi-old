import { useEffect, useState } from "react";
import "./TimelineBar.css";

export default function TimelineBar() {
  const [cursorPosition, setCursorPosition] = useState(-1);
  const [left, setLeft] = useState(0);

  const configureCursorPosition = (e: any) => {
    setCursorPosition(e.nativeEvent.x);
  };

  useEffect(() => {
    setLeft(cursorPosition - 480); //replace with computed value
  }, [cursorPosition]);

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
        <div className="timeline-year" style={{ left: left }}>
          {cursorPosition}
        </div>
      )}
    </div>
  );
}
