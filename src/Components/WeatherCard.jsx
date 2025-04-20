// eslint-disable-next-line react/prop-types
const WeatherCard = ({title, value, emoji}) => {
  return (
    <div className="bg-gray-700 p-4 rounded-xl text-center">
        <p className="text-sm">{emoji} {title}</p>
        <p className="text-lg font-bold">{value}</p>
    </div>
  )
}

export default WeatherCard