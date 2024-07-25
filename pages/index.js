import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";
import settings from "../settings.json"
import { getWeatherCodeAttributes } from "../services/helpers";

export const App = () => {
  const cityInput = settings.city;
  const [geoData, setGeoData] = useState();
  const [weatherData, setWeatherData] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");
  const [timer, setTimer] = useState(0);

  // Refresh timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 3600000);
    return () => clearInterval(interval);
  }, []);

  // Send city name to the OpenMeteo's GeoCode API get latitude and longitude
  useEffect(() => {
    const getGeoData = async () => {
      const res1 = await fetch("api/geocode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cityInput }),
      });
      const geo = await res1.json();
      
      if (geo.results && geo.results[0].name) {
        setGeoData({...geo.results[0]});
      } else {
        setWeatherData({ error: "404" });
      }
    };

    getGeoData();
  }, [cityInput]);

  // Send latitude and longitude to the OpenMeteo weather API to get weather info
  // Fetches data every time the timer changes
  useEffect(() => {
    const getWeatherData = async () => {
      if (geoData) {
        const res2 = await fetch("api/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ geoData }),
        });
        const data = await res2.json();
        const weatherCodeAttributes = getWeatherCodeAttributes(
          data.current.weather_code, 
          data.current.is_day
        );
        setWeatherData({ 
          ...data, 
          description: weatherCodeAttributes.description, 
          iconName: weatherCodeAttributes.iconName, 
          geoData: geoData });
      }
    };
    
    getWeatherData();
  }, [timer, geoData]);

  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");

  return weatherData && !weatherData.error ? (
    <div className={styles.wrapper}>
      <MainCard
        city={geoData.name}
        country={geoData.country_code}
        description={weatherData.description}
        iconName={weatherData.iconName}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  ) : weatherData && weatherData.error ? (
    <ErrorScreen errorMessage="City not found, check your configuration file!">
    </ErrorScreen>
  ) : (
    <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;
