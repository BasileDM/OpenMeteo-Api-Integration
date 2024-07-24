export default async function handler(req, res) {
  const { latitude, longitude } = req.body.geoData;
  const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=visibility&daily=weather_code,sunrise,sunset,daylight_duration&timezone=Europe%2FBerlin&forecast_days=1`
  );
  const data = await getWeatherData.json();
  res.status(200).json(data);
}
