import React from 'react';
import { Droplets, CloudRain } from 'lucide-react';
import { useWeather } from '../WeatherContext';
import { getWeatherIcon, formatDate } from '../utils';

const ForecastDisplay = () => {
  const { forecast, unit } = useWeather();

  if (!forecast.length) return null;

  const unitSymbol = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-8">
      <h3 className="text-2xl font-semibold text-white mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => {
          const WeatherIcon = getWeatherIcon(day.weather[0].icon, day.weather[0].main);
          return (
            <div key={index} className="bg-white/10 rounded-2xl p-4 text-center">
              <div className="text-white/80 text-sm mb-2">
                {index === 0 ? 'Today' : formatDate(day.dt)}
              </div>
              <WeatherIcon className="w-12 h-12 text-white/90 mx-auto mb-3" />
              <div className="text-white text-lg font-semibold mb-1">
                {Math.round(day.main.temp)}{unitSymbol}
              </div>
              {day.main.temp_max && day.main.temp_min && (
                <div className="text-white/60 text-xs mb-1">
                  H: {Math.round(day.main.temp_max)}{unitSymbol} L: {Math.round(day.main.temp_min)}{unitSymbol}
                </div>
              )}
              <div className="text-white/70 text-sm capitalize">
                {day.weather[0].main}
              </div>
              <div className="text-white/60 text-xs mt-2">
                <Droplets className="w-3 h-3 inline mr-1" />
                {day.main.humidity}%
                {day.pop && (
                  <span className="ml-2">
                    <CloudRain className="w-3 h-3 inline mr-1" />
                    {day.pop}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastDisplay;