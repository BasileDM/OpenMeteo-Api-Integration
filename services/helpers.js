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

export const getTime = (unitSystem, currentTime, timezone) =>
  unitSystem == "metric"
    ? currentTime
    : timeTo12HourFormat(currentTime, timezone);

export const getAMPM = (unitSystem, currentTime, timezone) =>
  unitSystem === "imperial"
    ? unixToLocalTime(currentTime, timezone).split(":")[0] >= 12
      ? "PM"
      : "AM"
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
    0: { description: "Clear sky", icon: "01d" },
    1: { description: "Mainly clear", icon: "02d" },
    2: { description: "Partly cloudy", icon: "03d" },
    3: { description: "Overcast", icon: "04d" },
    45: { description: "Fog", icon: "50d" },
    48: { description: "Depositing rime fog", icon: "50d" },
    51: { description: "Light drizzle", icon: "09d" },
    53: { description: "Moderate drizzle", icon: "09d" },
    55: { description: "Dense drizzle", icon: "09d" },
    56: { description: "Light freezing drizzle", icon: "09d" },
    57: { description: "Dense freezing drizzle", icon: "09d" },
    61: { description: "Slight Rain", icon: "10d" },
    63: { description: "Moderate Rain", icon: "10d" },
    65: { description: "Heavy Rain", icon: "10d" },
    66: { description: "Light freezing rain", icon: "10d" },
    67: { description: "Heavy freezing rain", icon: "10d" },
    71: { description: "Slight snow fall", icon: "13d" },
    73: { description: "Moderate snow fall", icon: "13d" },
    75: { description: "Heavy snow fall", icon: "13d" },
    77: { description: "Snow grains", icon: "13d" },
    80: { description: "Slight rain showers", icon: "09d" },
    81: { description: "Moderate Rain showers", icon: "09d" },
    82: { description: "Violent Rain showers", icon: "09d" },
    85: { description: "Slight snow showers", icon: "13d" },
    86: { description: "Heavy snow showers", icon: "13d" },
    95: { description: "Slight/Moderate thunderstorm", icon: "11d" },
    96: { description: "Thunderstorm with slight hail", icon: "11d" },
    99: { description: "Thunderstorm with heavy hail", icon: "11d" },
  };

  return codeAttributes[code] || { description: "Unknown weather code", icon: "unknown" };
};
