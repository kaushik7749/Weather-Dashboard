import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorDisplay = ({ error, onRetry }) => {
  if (!error) return null;

  return (
    <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 text-center">
      <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Oops! Something went wrong</h3>
      <p className="text-white/80 mb-4">{error}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;