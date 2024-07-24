export const ctoF = (c) => (c * 9) / 5 + 32;

export const kmphToMph = (kmph) => (kmph * 0.621371).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  return `${(hours %= 12) ? hours : 12}:${minutes}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const unixToLocalTime = (unixSeconds, timezone) => {
  let time = new Date(unixSeconds * 1000)
  .toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone
  })
  
  return time.startsWith("0") ? time.substring(1) : time;
};

export const getUnixSeconds = (date) => Math.floor(new Date(date).getTime() / 1000);
