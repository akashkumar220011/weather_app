/* eslint-disable react/prop-types */
const ForecastList = ({forecast}) =>{
    return (
  
        <div className="text-sm">
        {
            forecast.map((item, idx)=> {
                const date = new Date(item.Date);
                const formattedDate = date.toLocaleDateString("en-GB", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                  });

                  return(
                    <div key={idx} className="flex justify-between border-b border-gray-700 pb-1 mb-1">
                    <span>{item.Temperature.Maximum.Value}°C</span>
                    <span>{formattedDate}</span>
                    <span>{item.Day.IconPhrase}</span>
                  </div>
                  );
                  
            })
        }
        </div>
            
      
        );
} 

export default ForecastList