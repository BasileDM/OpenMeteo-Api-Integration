import {
  dateToLocalTime,
  kmToMiles,
  kmphToMph,
  timeTo12HourFormat,
  getUnixSeconds
} from "./converters";

export const getWindSpeed = (unitSystem, windInKmph) =>
  unitSystem == "metric" ? windInKmph  : kmphToMph(windInKmph);

export const getVisibility = (unitSystem, visibilityInMeters) =>
  unitSystem == "metric"
    ? (visibilityInMeters / 1000).toFixed(1)
    : kmToMiles(visibilityInMeters / 1000);

export const getTime = (unitSystem, currentDate) => {
  const localTime = dateToLocalTime(currentDate);

  return unitSystem == "metric"
    ? localTime
    : timeTo12HourFormat(localTime);
}

export const getAMPM = (unitSystem, currentDate) => {
  return unitSystem === "imperial"
    ? dateToLocalTime(currentDate).split(":")[0] >= 12
      ? "PM"
      : "AM"
    : "";
}

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

export const getWeatherCodeAttributes = (code, isDay) => {
  const codeAttributes = {
    0: { description: "Clear sky", iconName: isDay ? "01d" : "01n" },
    1: { description: "Mainly clear", iconName: isDay ? "02d" : "02n" },
    2: { description: "Partly cloudy", iconName: isDay ? "03d" : "03n" },
    3: { description: "Overcast", iconName: isDay ? "04d" : "04n" },
    45: { description: "Fog", iconName: isDay ? "50d" : "50n" },
    48: { description: "Depositing rime fog", iconName: isDay ? "50d" : "50n" },
    51: { description: "Light drizzle", iconName: isDay ? "09d" : "09n" },
    53: { description: "Moderate drizzle", iconName: isDay ? "09d" : "09n" },
    55: { description: "Dense drizzle", iconName: isDay ? "09d" : "09n" },
    56: { description: "Light freezing drizzle", iconName: isDay ? "09d" : "09n" },
    57: { description: "Dense freezing drizzle", iconName: isDay ? "09d" : "09n" },
    61: { description: "Slight Rain", iconName: isDay ? "10d" : "10n" },
    63: { description: "Moderate Rain", iconName: isDay ? "10d" : "10n" },
    65: { description: "Heavy Rain", iconName: isDay ? "10d" : "10n" },
    66: { description: "Light freezing rain", iconName: isDay ? "10d" : "10n" },
    67: { description: "Heavy freezing rain", iconName: isDay ? "10d" : "10n" },
    71: { description: "Slight snow fall", iconName: isDay ? "13d" : "13n" },
    73: { description: "Moderate snow fall", iconName: isDay ? "13d" : "13n" },
    75: { description: "Heavy snow fall", iconName: isDay ? "13d" : "13n" },
    77: { description: "Snow grains", iconName: isDay ? "13d" : "13n" },
    80: { description: "Slight rain showers", iconName: isDay ? "09d" : "09n" },
    81: { description: "Moderate Rain showers", iconName: isDay ? "09d" : "09n" },
    82: { description: "Violent Rain showers", iconName: isDay ? "09d" : "09n" },
    85: { description: "Slight snow showers", iconName: isDay ? "13d" : "13n" },
    86: { description: "Heavy snow showers", iconName: isDay ? "13d" : "13n" },
    95: { description: "Slight/Moderate thunderstorm", iconName: isDay ? "11d" : "11n" },
    96: { description: "Thunderstorm with slight hail", iconName: isDay ? "11d" : "11n" },
    99: { description: "Thunderstorm with heavy hail", iconName: isDay ? "11d" : "11n" },
  };

  return codeAttributes[code] || { description: "Unknown weather code", iconName: "unknown" };
};
