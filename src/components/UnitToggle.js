import React from 'react';
import { useWeather } from '../WeatherContext';

const UnitToggle = () => {
  const { unit, setUnit } = useWeather();

  return (
    <div className="flex items-center space-x-2">
      <span className={`text-sm ${unit === 'metric' ? 'text-white' : 'text-white/60'}`}>°C</span>
      <button
        onClick={() => setUnit(unit === 'metric' ? 'imperial' : 'metric')}
        className="relative w-12 h-6 bg-white/20 rounded-full border border-white/30 transition-colors duration-200"
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${
            unit === 'imperial' ? 'transform translate-x-6' : 'transform translate-x-0.5'
          }`}
        />
      </button>
      <span className={`text-sm ${unit === 'imperial' ? 'text-white' : 'text-white/60'}`}>°F</span>
    </div>
  );
};

export default UnitToggle;