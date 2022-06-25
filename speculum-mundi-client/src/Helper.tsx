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
