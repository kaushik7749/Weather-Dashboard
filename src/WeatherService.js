// API Service for WeatherAPI.com
const API_KEY = '3feb83385ba24949a65122700252705';
const BASE_URL = 'https://api.weatherapi.com/v1';

// Helper function to convert WeatherAPI condition codes to our icon system
const getWeatherApiIcon = (code, isDay) => {
  const iconMap = {
    1000: isDay ? '01d' : '01n', // Sunny/Clear
    1003: isDay ? '02d' : '02n', // Partly cloudy
    1006: '03d', // Cloudy
    1009: '04d', // Overcast
    1030: '50d', // Mist
    1063: '09d', // Patchy rain possible
    1066: '13d', // Patchy snow possible
    1069: '13d', // Patchy sleet possible
    1072: '09d', // Patchy freezing drizzle possible
    1087: '11d', // Thundery outbreaks possible
    1114: '13d', // Blowing snow
    1117: '13d', // Blizzard
    1135: '50d', // Fog
    1147: '50d', // Freezing fog
    1150: '09d', // Patchy light drizzle
    1153: '09d', // Light drizzle
    1168: '09d', // Freezing drizzle
    1171: '09d', // Heavy freezing drizzle
    1180: '10d', // Patchy light rain
    1183: '10d', // Light rain
    1186: '10d', // Moderate rain at times
    1189: '10d', // Moderate rain
    1192: '10d', // Heavy rain at times
    1195: '10d', // Heavy rain
    1198: '09d', // Light freezing rain
    1201: '09d', // Moderate or heavy freezing rain
    1204: '13d', // Light sleet
    1207: '13d', // Moderate or heavy sleet
    1210: '13d', // Patchy light snow
    1213: '13d', // Light snow
    1216: '13d', // Patchy moderate snow
    1219: '13d', // Moderate snow
    1222: '13d', // Patchy heavy snow
    1225: '13d', // Heavy snow
    1237: '13d', // Ice pellets
    1240: '09d', // Light rain shower
    1243: '10d', // Moderate or heavy rain shower
    1246: '10d', // Torrential rain shower
    1249: '13d', // Light sleet showers
    1252: '13d', // Moderate or heavy sleet showers
    1255: '13d', // Light snow showers
    1258: '13d', // Moderate or heavy snow showers
    1261: '13d', // Light showers of ice pellets
    1264: '13d', // Moderate or heavy showers of ice pellets
    1273: '11d', // Patchy light rain with thunder
    1276: '11d', // Moderate or heavy rain with thunder
    1279: '11d', // Patchy light snow with thunder
    1282: '11d'  // Moderate or heavy snow with thunder
  };
  
  return iconMap[code] || (isDay ? '01d' : '01n');
};

export const weatherService = {
  getCurrentWeather: async (city, unit = 'metric') => {
    try {
      const response = await fetch(
        `${BASE_URL}/current.json?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=yes`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch weather data');
      }
      
      const data = await response.json();
      console.log(data);
      
      
      // Transform WeatherAPI response to match our component structure
      return {
        name: data.location.name,
        main: {
          temp: unit === 'metric' ? data.current.temp_c : data.current.temp_f,
          feels_like: unit === 'metric' ? data.current.feelslike_c : data.current.feelslike_f,
          humidity: data.current.humidity,
          pressure: data.current.pressure_mb
        },
        weather: [{
          main: data.current.condition.text.split(' ')[0],
          description: data.current.condition.text.toLowerCase(),
          icon: getWeatherApiIcon(data.current.condition.code, data.current.is_day)
        }],
        wind: {
          speed: unit === 'metric' ? data.current.wind_kph / 3.6 : data.current.wind_mph
        },
        visibility: unit === 'metric' ? data.current.vis_km : data.current.vis_miles,
        sys: {
          country: data.location.country
        },
        uv: data.current.uv,
        gust: unit === 'metric' ? data.current.gust_kph / 3.6 : data.current.gust_mph
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch weather data');
    }
  },

  getForecast: async (city, unit = 'metric') => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${encodeURIComponent(city)}&days=5&aqi=no`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to fetch forecast data');
      }
      
      const data = await response.json();
      
      // Transform WeatherAPI forecast response
      return {
        list: data.forecast.forecastday.map(day => ({
          dt: new Date(day.date).getTime() / 1000,
          main: {
            temp: unit === 'metric' ? day.day.avgtemp_c : day.day.avgtemp_f,
            temp_max: unit === 'metric' ? day.day.maxtemp_c : day.day.maxtemp_f,
            temp_min: unit === 'metric' ? day.day.mintemp_c : day.day.mintemp_f,
            humidity: day.day.avghumidity
          },
          weather: [{
            main: day.day.condition.text.split(' ')[0],
            description: day.day.condition.text.toLowerCase(),
            icon: getWeatherApiIcon(day.day.condition.code, 1)
          }],
          dt_txt: day.date,
          pop: day.day.daily_chance_of_rain
        }))
      };
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch forecast data');
    }
  }
};