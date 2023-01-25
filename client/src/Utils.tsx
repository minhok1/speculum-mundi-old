import { CauseEffect, LocationShift, TimelineEvent } from "./types";

import { Node } from "vis-network/standalone/esm/vis-network";

const TimeConversion = {
  yearToSecond: 31540000,
  monthToSecond: 2628000,
  dayToSecond: 86400,
  hourToSecond: 3600,
  minuteToSecond: 60,
};

export function getRandomColor() {
  const red = Math.floor(Math.random() * 180);
  const green = Math.floor(Math.random() * 180);
  const blue = Math.floor(Math.random() * 180);
  return `rgb(${red},${green},${blue})`;
}

export function getRgbNumber(color: string) {
  return color
    .split(/[()]/)[1]
    .split(",")
    .map((c) => parseInt(c));
}

export function getMixedColor(color1: string, color2: string) {
  const rgb1 = getRgbNumber(color1);
  const rgb2 = getRgbNumber(color2);

  let newRgb = [];

  for (let i = 0; i < rgb1.length; i++) {
    newRgb.push(Math.floor((rgb1[i] + rgb2[i]) / 2));
  }
  return newRgb;
}

export function CapitalizeFirstLetter(inputString: string) {
  const stringArray = inputString
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1));
  return stringArray.join(" ");
}

interface dateObject {
  year: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
}

export function DateToBarNumber(date: dateObject) {
  //javascript date starts in 1970, so we need custom date to number conversion
  return (
    date.year * TimeConversion.yearToSecond +
    (date.month ? date.month * TimeConversion.monthToSecond : 0) +
    (date.day ? date.day * TimeConversion.dayToSecond : 0) +
    (date.hour ? date.hour * TimeConversion.hourToSecond : 0) +
    (date.minute ? date.minute * TimeConversion.minuteToSecond : 0) +
    (date.second ? date.second : 0)
  );
}

export function BarNumberToDate(barNumber: number) {
  const year = Math.floor(barNumber / TimeConversion.yearToSecond);
  const yearRemainder = barNumber % TimeConversion.yearToSecond;
  const month = Math.floor(yearRemainder / TimeConversion.monthToSecond);
  const monthRemainder = yearRemainder % TimeConversion.monthToSecond;
  const day = Math.floor(monthRemainder / TimeConversion.dayToSecond);
  const dayRemainder = monthRemainder % TimeConversion.dayToSecond;
  const hour = Math.floor(dayRemainder / TimeConversion.hourToSecond);
  const hourRemainder = dayRemainder % TimeConversion.hourToSecond;
  const minute = Math.floor(hourRemainder / TimeConversion.minuteToSecond);
  const second = hourRemainder % TimeConversion.minuteToSecond;

  return {
    year: year,
    month: month,
    day: day,
    hour: hour,
    minute: minute,
    second: second,
  };
}

export function extractCurrentDate() {
  const currentDate = new Date();
  const currentDateArray = currentDate
    .toISOString()
    .split(/[^0-9]/)
    .slice(0, -2)
    .map((str) => parseInt(str));
  return {
    year: currentDateArray[0],
    month: currentDateArray[1],
    day: currentDateArray[2],
    hour: currentDateArray[3],
    minute: currentDateArray[4],
    second: currentDateArray[5],
  };
}

export function configureTimeUnit(startDate: number, endDate: number) {
  const difference = endDate - startDate;

  if (difference >= 10 * TimeConversion.yearToSecond) {
    return "year";
  } else if (difference >= 6 * TimeConversion.monthToSecond) {
    return "month";
  } else if (difference >= 7 * TimeConversion.dayToSecond) {
    return "day";
  } else if (difference >= 6 * TimeConversion.hourToSecond) {
    return "hour";
  } else if (difference >= 10 * TimeConversion.minuteToSecond) {
    return "minute";
  } else {
    return "second";
  }
}

export function createDefaultNode(
  timelineEvent: TimelineEvent,
  abstractColor: string,
  startDate: number,
  endDate: number,
  absIndex: number
) {
  return {
    id: timelineEvent.id,
    // label: "TE",
    title: timelineEvent.title,
    shape: "diamond",
    size: 5,
    color: { border: abstractColor, background: "white" },
    x:
      (1000 *
        DateToBarNumber({
          year: timelineEvent.event_year,
          month: timelineEvent.event_month,
          day: timelineEvent.event_date,
        })) /
      (endDate - startDate),
    y: -200 * (absIndex + 1),
    fixed: true,
    borderWidth: 1,
  };
}

export function createDefaultConnection(
  timelineEvent: TimelineEvent,
  prevTimelineEvent: TimelineEvent,
  color: string
) {
  return {
    to: timelineEvent.id,
    from: prevTimelineEvent.id,
    id: prevTimelineEvent.id + "to" + timelineEvent.id,
    color: color,
    arrows: { to: { enabled: true, scaleFactor: 0.5 } },
    smooth: false,
  };
}

export function createDefaultCE(ce: CauseEffect) {
  return {
    to: ce.effect,
    from: ce.cause,
    id: "causeeffect" + ce.cause + "to" + ce.effect,
    arrows: { to: { enabled: true, scaleFactor: 0.5 } },
    color: "black",
    dashes: true,
    smooth: {
      enabled: true,
      type: "curvedCW",
      roundness: 0.3,
    },
  };
}

export function createDefaultLS(ls: LocationShift) {
  return {
    to: ls.destination_timeline_event,
    from: ls.origin_timeline_event,
    id:
      "locationshift" +
      ls.origin_timeline_event +
      "to" +
      ls.destination_timeline_event,
    arrows: { to: { enabled: true, scaleFactor: 0.5 } },
    color: "black",
    smooth: {
      enabled: true,
      type: "curvedCCW",
      roundness: 0.1,
    },
  };
}

export function setDateRange(timelineEvents: TimelineEvent[]) {
  let start = Infinity;
  let end = -Infinity;
  timelineEvents.forEach((timelineEvent: TimelineEvent, i: number) => {
    start = Math.min(
      start,
      DateToBarNumber({
        year: timelineEvent.event_year,
        month: timelineEvent.event_month,
        day: timelineEvent.event_date,
      })
    );
    end = Math.max(
      end,
      DateToBarNumber({
        year: timelineEvent.event_year,
        month: timelineEvent.event_month,
        day: timelineEvent.event_date,
      })
    );
  });
  return [start, end];
}
