import { useEffect, useState } from "react";
import "./TimelineBar.css";

export default function TimelineBar(props: any) {
  const [cursorPosition, setCursorPosition] = useState(-1);
  const [left, setLeft] = useState(0);

  const configureCursorPosition = (e: any) => {
    setCursorPosition(e.nativeEvent.x);
  };

  const configureDisplayedYear = () => {
    return Math.floor(
      -2600 + (2022 + 2600) * ((cursorPosition - 480) / (2104 - 480))
    );
  };

  useEffect(() => {
    setLeft(cursorPosition - 490); //replace with computed value
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
          {configureDisplayedYear()}
        </div>
      )}
    </div>
  );
}
