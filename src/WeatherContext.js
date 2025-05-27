import React, { createContext, useContext, useState } from 'react';

// Weather Context for global state management
const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCity, setLastSearchedCity] = useState('');
  const [unit, setUnit] = useState('metric'); // metric for Celsius, imperial for Fahrenheit

  const value = {
    currentWeather,
    setCurrentWeather,
    forecast,
    setForecast,
    loading,
    setLoading,
    error,
    setError,
    lastSearchedCity,
    setLastSearchedCity,
    unit,
    setUnit
  };

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};