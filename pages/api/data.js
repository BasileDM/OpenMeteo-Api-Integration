export default async function handler(req, res) {
  const { lat, lon } = req.body;
  const getWeatherData = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=Europe%2FBerlin`
  );
  const data = await getWeatherData.json();
  res.status(200).json(data);
}
