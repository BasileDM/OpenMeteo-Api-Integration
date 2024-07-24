import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
  unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem == "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getTime = (unitSystem, currentDate, timezone) => {
  let currentTimeMs = new Date(currentDate).getTime();
  let currentTime = Math.floor(currentTimeMs / 1000);
  return unitSystem == "metric"
    ? unixToLocalTime(currentTime, timezone)
    : timeTo12HourFormat(unixToLocalTime(currentTime, timezone));
}

export const getAMPM = (unitSystem, currentTime, timezone) =>
  unitSystem === "imperial"
    ? unixToLocalTime(currentTime, timezone).split(":")[0] >= 12
      ? "AM"
      : "PM"
    : "";

export const getWeekDay = (weatherData) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekday[
    new Date(weatherData.current.time).getUTCDay()
  ];
};

export const getWeatherCodeAttributes = (code) => {
  const codeAttributes = {
    0: { description: "Clear sky", iconName: "01d" },
    1: { description: "Mainly clear", iconName: "02d" },
    2: { description: "Partly cloudy", iconName: "03d" },
    3: { description: "Overcast", iconName: "04d" },
    45: { description: "Fog", iconName: "50d" },
    48: { description: "Depositing rime fog", iconName: "50d" },
    51: { description: "Light drizzle", iconName: "09d" },
    53: { description: "Moderate drizzle", iconName: "09d" },
    55: { description: "Dense drizzle", iconName: "09d" },
    56: { description: "Light freezing drizzle", iconName: "09d" },
    57: { description: "Dense freezing drizzle", iconName: "09d" },
    61: { description: "Slight Rain", iconName: "10d" },
    63: { description: "Moderate Rain", iconName: "10d" },
    65: { description: "Heavy Rain", iconName: "10d" },
    66: { description: "Light freezing rain", iconName: "10d" },
    67: { description: "Heavy freezing rain", iconName: "10d" },
    71: { description: "Slight snow fall", iconName: "13d" },
    73: { description: "Moderate snow fall", iconName: "13d" },
    75: { description: "Heavy snow fall", iconName: "13d" },
    77: { description: "Snow grains", iconName: "13d" },
    80: { description: "Slight rain showers", iconName: "09d" },
    81: { description: "Moderate Rain showers", iconName: "09d" },
    82: { description: "Violent Rain showers", iconName: "09d" },
    85: { description: "Slight snow showers", iconName: "13d" },
    86: { description: "Heavy snow showers", iconName: "13d" },
    95: { description: "Slight/Moderate thunderstorm", iconName: "11d" },
    96: { description: "Thunderstorm with slight hail", iconName: "11d" },
    99: { description: "Thunderstorm with heavy hail", iconName: "11d" },
  };

  return codeAttributes[code] || { description: "Unknown weather code", iconName: "unknown" };
};
