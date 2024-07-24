import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <h2>
        {`${getWeekDay(weatherData)}, ${getTime(
          unitSystem,
          weatherData.current.time,
          weatherData.timezone
        )} ${getAMPM(unitSystem, weatherData.current.time, weatherData.geoData.timezone)}`}
      </h2>
    </div>
  );
};
