/* eslint-disable react/prop-types */
import { useState } from "react";


const API_KEY = "r9tfoAs2nc1HyiAW3v7AOfNtuCqrlYNe";
{/*	4DJPELuLG4LSlFkGxrq563C4i4N6qdRn */}
const SearchBar = ({onCitySelect}) => {
const [query, setQuery] = useState('');
const [suggestions, setSuggestions] = useState([]);


  const handleChange = async (e)=>{
    const val = e.target.value;
    setQuery(val);
    if(!val){
      setSuggestions([]);
      return;
    }
    try{
      const response = await fetch(
        `https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${val}`
      );
      const data = await response.json();
      setSuggestions(data);
    }
    catch(error){
      console.error("error fetching city suggestions:", error);
    }
  };
  const handleSelect = (city)=> {
    setQuery(city.LocalizedName);
    setSuggestions([]);
    if(onCitySelect) onCitySelect(city);
  };
  return (
     
     <div className="relative flex-1 mx-4">
     <input
       type="text"
       placeholder="Search city..."
       className="w-full px-4 py-2  rounded-xl bg-white/20 dark:bg-gray-700/30 placeholder-red/70 dark:placeholder-gray-300 text-white dark:text-gray-100 border border-black/30 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-white/50"
       value={query}
       onChange={handleChange}
     />
     {suggestions.length > 0 && (
      <ul className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-800 rounded-md shadow-md max-h-60 overflow-y-auto">
        {suggestions.map((city)=>(
          <li key={city.Key}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={()=>{
            handleSelect(city)
          }}>
          {city.LocalizedName}, {city.Country.LocalizedName}
          </li>
        ))}
      </ul>
     )}
   </div>
  )
}

export default SearchBar