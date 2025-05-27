import { Sun, Moon, Cloud, CloudRain, CloudSnow, Zap } from 'lucide-react';

// Utility function to get weather icons
export const getWeatherIcon = (iconCode, main) => {
  const iconMap = {
    '01d': Sun,
    '01n': Moon,
    '02d': Cloud,
    '02n': Cloud,
    '03d': Cloud,
    '03n': Cloud,
    '04d': Cloud,
    '04n': Cloud,
    '09d': CloudRain,
    '09n': CloudRain,
    '10d': CloudRain,
    '10n': CloudRain,
    '11d': Zap,
    '11n': Zap,
    '13d': CloudSnow,
    '13n': CloudSnow,
    '50d': Cloud,
    '50n': Cloud
  };
  
  return iconMap[iconCode] || Cloud;
};

// Format date for forecast display
export const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

// Convert temperature between units
export const convertTemperature = (temp, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return temp;
  
  if (fromUnit === 'metric' && toUnit === 'imperial') {
    return (temp * 9/5) + 32;
  } else if (fromUnit === 'imperial' && toUnit === 'metric') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
};

// Convert wind speed between units
export const convertWindSpeed = (speed, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return speed;
  
  if (fromUnit === 'metric' && toUnit === 'imperial') {
    return speed * 2.237; // m/s to mph
  } else if (fromUnit === 'imperial' && toUnit === 'metric') {
    return speed / 2.237; // mph to m/s
  }
  
  return speed;
};

// Get UV index level description
export const getUVIndexLevel = (uvIndex) => {
  if (uvIndex <= 2) return { level: 'Low', color: 'text-green-400' };
  if (uvIndex <= 5) return { level: 'Moderate', color: 'text-yellow-400' };
  if (uvIndex <= 7) return { level: 'High', color: 'text-orange-400' };
  if (uvIndex <= 10) return { level: 'Very High', color: 'text-red-400' };
  return { level: 'Extreme', color: 'text-purple-400' };
};

// Format time for last updated display
export const formatLastUpdated = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};