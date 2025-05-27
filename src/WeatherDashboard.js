import React, { useEffect, useState, useCallback } from 'react';
import { useWeather } from './WeatherContext';
import { weatherService } from './WeatherService';
import SearchInput from './components/SearchInput';
import ErrorDisplay from './components/ErrorDisplay';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import UnitToggle from './components/UnitToggle';
import LoadingSpinner from './components/LoadingSpinner';

const WeatherDashboard = () => {
    const {
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
      unit
    } = useWeather();
  
    const [pollingInterval, setPollingInterval] = useState(null);
  
    // Load last searched city from memory on mount
    useEffect(() => {
      const savedCity = lastSearchedCity || 'London';
      if (savedCity) {
        fetchWeatherData(savedCity);
      }
    }, []);
  
    // Setup polling when we have weather data
    useEffect(() => {
      if (currentWeather && lastSearchedCity) {
        const interval = setInterval(() => {
          fetchWeatherData(lastSearchedCity, false); // silent refresh
        }, 30000); // 30 seconds
  
        setPollingInterval(interval);
  
        return () => {
          if (interval) clearInterval(interval);
        };
      }
    }, [currentWeather, lastSearchedCity]);
  
    // Refetch data when unit changes
    useEffect(() => {
      if (lastSearchedCity) {
        fetchWeatherData(lastSearchedCity);
      }
    }, [unit]);
  
    const fetchWeatherData = useCallback(async (city, showLoading = true) => {
      try {
        if (showLoading) setLoading(true);
        setError(null);
  
        const [weatherData, forecastData] = await Promise.all([
          weatherService.getCurrentWeather(city, unit),
          weatherService.getForecast(city, unit)
        ]);
  
        setCurrentWeather(weatherData);
        setForecast(forecastData.list);
        setLastSearchedCity(city);
  
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
        setCurrentWeather(null);
        setForecast([]);
      } finally {
        if (showLoading) setLoading(false);
      }
    }, [unit, setCurrentWeather, setForecast, setLastSearchedCity, setLoading, setError]);
  
    const handleSearch = (city) => {
      fetchWeatherData(city);
    };
  
    const handleRetry = () => {
      if (lastSearchedCity) {
        fetchWeatherData(lastSearchedCity);
      }
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Weather Dashboard
            </h1>
            <p className="text-white/80 text-lg">
              Get real-time weather updates for any city
            </p>
          </div>
  
          {/* Search and Unit Toggle */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <SearchInput onSearch={handleSearch} />
            <UnitToggle />
          </div>
  
          {/* Content */}
          <div className="space-y-8">
            {error && (
              <ErrorDisplay error={error} onRetry={handleRetry} />
            )}
  
            {loading && !currentWeather && (
              <div className="text-center py-12">
                <LoadingSpinner className="w-12 h-12 text-white/70 mx-auto mb-4 animate-spin" />
                <p className="text-white/80">Loading weather data...</p>
              </div>
            )}
  
            {currentWeather && !error && (
              <>
                <WeatherDisplay />
                <ForecastDisplay />
              </>
            )}
          </div>
  
          {/* Last Updated */}
          {currentWeather && (
            <div className="text-center mt-8">
              <p className="text-white/60 text-sm">
                Last updated: {new Date().toLocaleTimeString()} • Auto-refreshes every 30 seconds
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };
export default WeatherDashboard;  