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
    date.year * 31540000 +
    (date.month ? date.month * 2628000 : 0) +
    (date.day ? date.day * 86400 : 0) +
    (date.hour ? date.hour * 3600 : 0) +
    (date.minute ? date.minute * 60 : 0) +
    (date.second ? date.second : 0)
  );
}

export function BarNumberToDate(barNumber: number) {
  const year = Math.floor(barNumber / 31540000);
  const yearRemainder = barNumber % 31540000;
  const month = Math.floor(yearRemainder / 2628000);
  const monthRemainder = yearRemainder % 2628000;
  const day = Math.floor(monthRemainder / 86400);
  const dayRemainder = monthRemainder % 86400;
  const hour = Math.floor(dayRemainder / 3600);
  const hourRemainder = dayRemainder % 3600;
  const minute = Math.floor(hourRemainder / 60);
  const second = hourRemainder % 60;

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
