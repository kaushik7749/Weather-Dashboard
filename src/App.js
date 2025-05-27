import { WeatherProvider } from './WeatherContext';
import WeatherDashboard from './WeatherDashboard';

function App() {
  return (
    <WeatherProvider>
      <WeatherDashboard />
    </WeatherProvider>
  );
}

export default App;
