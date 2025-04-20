/* eslint-disable react/prop-types */
import ForecastList from "./ForecastList";


const NowPanel = ({weather, location, forecast}) => {
  if (!weather || !location) return null;

   
    const now = new Date();
    const formattedData = now.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
    })
  return (
    <div className="bg-gray-800 text-white p-5 mx-2 rounded-2xl">
        <h2 className="text-2xl font-bold">Now</h2>
        <p className="text-4xl mt-2">{weather.Temperature.Metric.Value}°{weather.Temperature.Metric.Unit}</p>
        <p className="text-sm text-gray-300">{weather.WeatherText}</p>
        <div className="mt-4">
        <p className="text-sm">📅 {formattedData}</p>
        <p className="text-sm">📍 {location.LocalizedName}, {location.Country.LocalizedName}</p>
        </div>
        <h3 className="mt-6 mb-2 font-semibold text-lg">5 Days Forecast</h3>
        <ForecastList forecast={forecast} />
    </div>
  )
}

export default NowPanel