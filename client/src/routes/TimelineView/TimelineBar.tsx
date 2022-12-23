import { useEffect, useState } from "react";
import { BarNumberToDate, configureTimeUnit } from "../../Utils";
import "./TimelineBar.css";

export default function TimelineBar(props: any) {
  const [cursorPosition, setCursorPosition] = useState(-1);
  const [left, setLeft] = useState(0);
  const [timeUnit, setTimeUnit] = useState("year");

  const configureCursorPosition = (e: any) => {
    setCursorPosition(e.nativeEvent.x);
  };

  const configureDisplayedYear = () => {
    const formattedDate = BarNumberToDate(
      Math.floor(
        props.startDate +
          (props.endDate - props.startDate) *
            ((cursorPosition - 480) / (2104 - 480))
      )
    );
    switch (timeUnit) {
      case "year":
        return formattedDate.year;
      case "month":
        return `${formattedDate.year}.${formattedDate.month}`;
      case "day":
        return `${formattedDate.year}.${formattedDate.month}.${formattedDate.day}`;
      case "hour":
        return `${formattedDate.year}.${formattedDate.month}.${formattedDate.day} ${formattedDate.hour}`;
      case "minute":
        return `${formattedDate.year}.${formattedDate.month}.${formattedDate.day} ${formattedDate.hour}:${formattedDate.minute}`;
      case "second":
        return `${formattedDate.year}.${formattedDate.month}.${formattedDate.day} ${formattedDate.hour}:${formattedDate.minute}:${formattedDate.second}`;
    }
  };

  useEffect(() => {
    setLeft(cursorPosition - 490); //replace with computed value
  }, [cursorPosition]);

  useEffect(() => {
    setTimeUnit(configureTimeUnit(props.startDate, props.endDate));
  }, [props.startDate, props.endDate]);

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
