/* eslint-disable react/prop-types */
import WeatherCard from "./WeatherCard"
const HighlightsPanel = ({ sunriseTime, sunsetTime }) => {
    const formattedSunrise = sunriseTime
    ? new Date(sunriseTime).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--";

  const formattedSunset = sunsetTime
    ? new Date(sunsetTime).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "--";
  return (
    <div className="bg-gray-800 text-white p-6 rounded-2xl col-span-2">
        <h2 className="text-xl font-bold mb-4">Today&apos;s Highlights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className=" bg-gray-700 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Air Quality Index</h3>
                    <span className="bg-green-500 text-xs px-2 py-1 cursor-pointer  rounded">Fair</span>
                </div>
                <div className="mt-4 grid grid-cols-4 text-center text-sm">
                <div><p className="font-semibold">CO</p><p>270.37 µg/m³</p></div>
                <div><p className="font-semibold">NO</p><p>0.45 µg/m³</p></div>
                <div><p className="font-semibold">NO₂</p><p>6.6 µg/m³</p></div>
                <div><p className="font-semibold">O₃</p><p>94.41 µg/m³</p></div>
                </div>
            </div>
            <div className="bg-gray-700 p-4 rounded-xl">
                <h3 className="font-semibold mb-2">Sunrise And Sunset</h3>
                <div className="flex justify-around text-center">
                    <div><div>☀️</div><p>{formattedSunrise}</p></div>
                    <div><div>🌙</div><p>{formattedSunset}</p></div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <WeatherCard title="Humidity" value='73%' emoji="💧" />
            <WeatherCard title="Pressure" value='1024 hPa' emoji="🔽" />
            <WeatherCard title="Visibility" value='10 km' emoji="👁️" />
            <WeatherCard title="Feels Like" value='18.52°C' emoji="🌡️" />
            
        </div>
    </div>
  )
}

export default HighlightsPanel