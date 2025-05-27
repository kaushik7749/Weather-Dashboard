import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { useWeather } from '../WeatherContext';

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { loading } = useWeather();

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5 animate-spin" />
        )}
      </div>
      <button
        onClick={handleSubmit}
        disabled={loading || !query.trim()}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl p-2 transition-all duration-200"
      >
        <Search className="w-4 h-4 text-white" />
      </button>
    </div>
  );
};

export default SearchInput;