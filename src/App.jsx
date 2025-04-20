import { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import NowPanel from "./Components/NowPanel";
import HighlightsPanel from "./Components/HighlightsPanel";
import DarkModeToggle from "./Components/DarkModeToggle";

const API_KEY = "r9tfoAs2nc1HyiAW3v7AOfNtuCqrlYNe";

function App() {
  
  const [locationData, setLocationData] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [sunriseTime, setSunriseTime] = useState(null); 
  const [sunsetTime, setSunsetTime] = useState(null);   
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchLocationKey(latitude, longitude);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setError("Location access denied.");
        setLoading(false);
      }
    );
  }, []);

  const fetchLocationKey = async (latitude, longitude) => {
    try {
      const res = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}`
      );
      const data = await res.json();
     
      setLocationData(data);
      fetchCurrentWeather(data.Key);
    } catch (err) {
      console.error("Error fetching location key:", err);
      setError("Failed to get location.");
      setLoading(false);
    }
  };

  const fetchCurrentWeather = async (key) => {
    try {
      const currentRes = await fetch(
        `https://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=${API_KEY}`
      );
      const currentData = await currentRes.json();
      setCurrentWeather(currentData[0]);

      const forecastRes = await fetch(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&details=true`
      );
      const forecastData = await forecastRes.json();
      setForecast(forecastData.DailyForecasts);
      setSunriseTime(forecastData.DailyForecasts[0].Sun.Rise); 
      setSunsetTime(forecastData.DailyForecasts[0].Sun.Set);   

      setLoading(false);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch weather data.");
      setLoading(false);
    }
  };

  const handleCitySelect = (city) => {
  
    setLocationData(city);
    fetchCurrentWeather(city.Key);
  };

  return (
    <div className="h-dvh max-w-7xl mx-auto bg-gray-200 dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <div className="backdrop-blur-md bg-transp px-2 dark:bg-gray-800/10 shadow-md border-b border-white/20 dark:border-gray-700/20 w-full z-50">
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-yellow-400 dark:text-blue-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="..." />
              </svg>
              <span className="text-white dark:text-gray-200 font-bold text-lg">
                WeatherApp
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar onCitySelect={handleCitySelect} />
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-10">Loading weather data...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <div className="grid mt-3 grid-cols-2 lg:grid-cols-3 gap-6">
          <NowPanel weather={currentWeather} location={locationData} forecast={forecast} />
          <div className="lg:col-span-2">
            <HighlightsPanel
              sunriseTime={sunriseTime}
              sunsetTime={sunsetTime}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
