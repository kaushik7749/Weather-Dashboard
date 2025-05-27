import React from 'react';
import { MapPin, Droplets, Wind, Eye, Gauge, Sun } from 'lucide-react';
import { useWeather } from '../WeatherContext';
import { getWeatherIcon } from '../utils';

const WeatherDisplay = () => {
  const { currentWeather, unit } = useWeather();

  if (!currentWeather) return null;

  const WeatherIcon = getWeatherIcon(currentWeather.weather[0].icon, currentWeather.weather[0].main);
  const temp = Math.round(currentWeather.main.temp);
  const feelsLike = Math.round(currentWeather.main.feels_like);
  const unitSymbol = unit === 'metric' ? '°C' : '°F';
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';
  const visibilityUnit = unit === 'metric' ? 'km' : 'mi';

  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center text-white/80 mb-2">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="text-lg">{currentWeather.name}, {currentWeather.sys.country}</span>
          </div>
          <div className="text-6xl font-light text-white mb-2">{temp}{unitSymbol}</div>
          <div className="text-white/70">Feels like {feelsLike}{unitSymbol}</div>
        </div>
        <div className="text-center">
          <WeatherIcon className="w-24 h-24 text-white/90 mx-auto mb-4" />
          <div className="text-white/80 capitalize text-lg">
            {currentWeather.weather[0].description}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <Droplets className="w-8 h-8 text-blue-300 mx-auto mb-2" />
          <div className="text-white/70 text-sm">Humidity</div>
          <div className="text-white text-xl font-semibold">{currentWeather.main.humidity}%</div>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <Wind className="w-8 h-8 text-green-300 mx-auto mb-2" />
          <div className="text-white/70 text-sm">Wind Speed</div>
          <div className="text-white text-xl font-semibold">{Math.round(currentWeather.wind.speed * 10) / 10} {windUnit}</div>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <Gauge className="w-8 h-8 text-purple-300 mx-auto mb-2" />
          <div className="text-white/70 text-sm">Pressure</div>
          <div className="text-white text-xl font-semibold">{currentWeather.main.pressure} mb</div>
        </div>
        <div className="bg-white/10 rounded-2xl p-4 text-center">
          <Eye className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
          <div className="text-white/70 text-sm">Visibility</div>
          <div className="text-white text-xl font-semibold">{currentWeather.visibility} {visibilityUnit}</div>
        </div>
      </div>

      {/* Additional weather info if available */}
      {(currentWeather.uv !== undefined || currentWeather.gust !== undefined) && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          {currentWeather.uv !== undefined && (
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <Sun className="w-8 h-8 text-orange-300 mx-auto mb-2" />
              <div className="text-white/70 text-sm">UV Index</div>
              <div className="text-white text-xl font-semibold">{currentWeather.uv}</div>
            </div>
          )}
          {currentWeather.gust !== undefined && currentWeather.gust > 0 && (
            <div className="bg-white/10 rounded-2xl p-4 text-center">
              <Wind className="w-8 h-8 text-cyan-300 mx-auto mb-2" />
              <div className="text-white/70 text-sm">Gust Speed</div>
              <div className="text-white text-xl font-semibold">{Math.round(currentWeather.gust * 10) / 10} {windUnit}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;