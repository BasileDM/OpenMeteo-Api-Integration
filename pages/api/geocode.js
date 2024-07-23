export default async function handler(req, res) {
  const { cityInput } = req.body;
  const getWeatherData = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityInput}&count=10&language=fr&format=json`
  );
  const data = await getWeatherData.json();
  res.status(200).json(data);
}
