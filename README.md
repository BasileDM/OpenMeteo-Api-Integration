# Weather-App-Integration

Original app repo : https://github.com/madzadev/weather-app

This app keeps all the same features as the original app except for a few changes :
- It integrates with OpenMeteo's API instead of the original OpenWeatherMap API.
- It gets rid of the search function in favor of the ability to set the city in the settings.json file.
- It refreshes the weather every hour.

## Installation

1. ```git clone https://github.com/BasileDM/OpenMeteo-Api-Integration.git```

2. ```cd OpenMeteo-Api-Integration```

3. Node 16.13.2 was used for this project. You can get NVM here:
    - Linux:   https://github.com/nvm-sh/nvm
    - Windows: https://github.com/coreybutler/nvm-windows

4. ```nvm install 16.13.2```

5. ```nvm use 16.13.2```

6. ```npm install```

5. Edit the settings.json file with the city of your choice

8. ```npm run dev```

## Features

1. User's ability to set a city in settings.json

2. Timer refreshes the weather every hour

3. Current local time and date

4. Temperatures and humidity

5. Wind speed and direction

6. Sunrise and sunset times

7. Metric vs Imperial system

8. Error handling and loading info
