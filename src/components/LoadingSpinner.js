import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = "Loading weather data..." }) => {
  return (
    <div className="text-center py-12">
      <Loader2 className="w-12 h-12 text-white/70 mx-auto mb-4 animate-spin" />
      <p className="text-white/80">{message}</p>
    </div>
  );
};

export default LoadingSpinner;