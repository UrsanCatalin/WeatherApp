import { DateTime } from 'luxon';

const API_KEY = 'dddae53d234be99dd95a684690d2d8b8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const makeIconURL = (iconId) => `http://openweathermap.org/img/wn/${iconId}@2x.png`;

const formatLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'ccc") =>
  DateTime.fromSeconds(secs, { zone }).toFormat(format);

const getFormattedWeatherData = async (city, units = 'metric', searchParams = 'weather') => {
  const URL = `${BASE_URL}/${searchParams}?q=${city}&appid=${API_KEY}&units=${units}`;
  const data = await fetch(URL).then((res) => res.json());

  const {
    coord: { lat, lon },
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country,  },
    name,
    dt,
  } = data;

  const { main: details, description, icon } = weather[0];
  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
    lat,
    lon,
    dt,
    details,
    icon,
  };
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice().map(({ dt, temp: { max, min }, weather: [{ description, icon }] }) => ({
    day: formatLocalTime(dt, timezone, 'cccc'),
    date: formatLocalTime(dt, timezone, 'dd LLL yyyy'),
    description,
    iconURL: makeIconURL(icon),
    max: `${Math.round(max)}°C`,
    min: `${Math.round(min)}°C`,
  }));
  hourly = hourly.slice(0, 25).map(({ dt, temp, weather: [{ icon }] }) => ({
    title: formatLocalTime(dt, timezone, 'h:mm a'),
    temp: `${Math.round(temp)}°C`,
    iconURL: makeIconURL(icon),
  }));

  return { timezone, daily, hourly };
};

const getWeatherData = async (searchParams, { lat, lon, ...options } = {}) => {
  const urlParams = new URLSearchParams({ appid: API_KEY, lat, lon, ...options });
  const URL = `${BASE_URL}/${searchParams}?${urlParams}`;
  const data = await fetch(URL).then((res) => res.json());
  return data;
};

const getFormattedForecastWeather = async (city, units = 'metric') => {
 
  const { lat, lon } = await getFormattedWeatherData(city, units);
  
  const forecastData = await getWeatherData('onecall', { lat, lon, exclude: 'current,minutely,alerts', units });
 
  return formatForecastWeather(forecastData);
};



export { getFormattedWeatherData, getFormattedForecastWeather, getWeatherData, formatForecastWeather };
