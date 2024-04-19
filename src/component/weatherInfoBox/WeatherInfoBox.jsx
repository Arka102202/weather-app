import React, { useEffect, useState } from 'react';
import season from "../../assets/season.png";
import { getWeatherInfo } from '../../api func/fetchFunc';
import { Tooltip } from 'react-tooltip';
import add from "../../assets/check.png";
import remove from "../../assets/remove.png";

// Define the WeatherInfoBox component with destructured data prop, using an empty object as default
const WeatherInfoBox = ({ data = {} }) => {
  // State to hold weather data
  const [weatherData, setWeatherData] = useState({});
  // State to track if the current location is added to local storage
  const [isAdded, setIsAdded] = useState(false);

  // Async function to fetch weather information based on the location provided
  const fetchWeatherInfo = async () => {
    const temp = await getWeatherInfo(data.location);
    setWeatherData(temp);
  }

  // Function to update the saved places list in local storage
  const updateList = () => {
    const str = localStorage.getItem("allSaved");
    const allSaved = (str && JSON.parse(str)) || [];
    if (isAdded) {
      // Remove place from saved list if it is already added
      let index = allSaved.findIndex(temp => parseFloat(temp.location.lat.toFixed(2)) === weatherData.location.lat && parseFloat(temp.location.lon.toFixed(2)) === weatherData.location.lon);
      if (index !== -1) allSaved.splice(index, 1);
      localStorage.setItem("allSaved", JSON.stringify(allSaved));
      setIsAdded(false);
    } else {
      // Add place to saved list if it is not already added
      allSaved.push({
        location: {
          "name": data.name,
          "address": data.address,
          "lat": data.location.lat,
          "lon": data.location.lng,
        },
        current: weatherData.current
      });
      localStorage.setItem("allSaved", JSON.stringify(allSaved));
      setIsAdded(true);
    }
  }

  // useEffect to fetch weather info on component mount
  useEffect(() => {
    fetchWeatherInfo();
  }, [])

  // useEffect to check if current location is in the saved list and set isAdded state accordingly
  useEffect(() => {
    const str = localStorage.getItem("allSaved");
    const allSaved = (str && JSON.parse(str)) || [];
    const isLocationSaved = allSaved.some(temp => parseFloat(temp.location.lat.toFixed(2)) === weatherData?.location?.lat && parseFloat(temp.location.lon.toFixed(2)) === weatherData?.location?.lon);
    setIsAdded(isLocationSaved);
  }, [weatherData])

  // Render the weather info box with dynamic content based on weather data
  return (
    <div className='weather-info-box'>
      <div className='header'>
        <div className='weather-logo'>
          <img src={season} alt="" />
        </div>
        <div className='main-info'>
          <div className='line line--1'>
            <p className='temp'>{weatherData?.current?.temp_c} &#x2103;, </p>
            <p className='text'>{weatherData?.current?.condition?.text}</p>
          </div>
          <div className='line'>
            <p className='name'>{data.name}, </p>
            <p className='date'>{new Date(weatherData?.current?.last_updated_epoch * 1000).toDateString()}</p>
          </div>
        </div>
        <button className='btn-extra-info btn-add-remove' onClick={() => updateList()}>
          <img src={!isAdded ? add : remove} alt="" />
        </button>
        <Tooltip id='my-tooltip--1' className='tooltip' style={{ overflow: "hidden", backgroundColor: "#4d4d4d" }} />
      </div>
      <div className='all-info-box'>
        <p className='sec-head'>Atmospheric Condition</p>
        <div className='sec-info'>
          <InfoBox info="humidity" data={weatherData?.current?.humidity} />
          <InfoBox info="visibility (in kilometers)" data={weatherData?.current?.vis_km} />
          <InfoBox info="pressure (in mb)" data={weatherData?.current?.pressure_mb} />
        </div>
      </div>
      <div className='all-info-box'>
        <p className='sec-head'>Wind</p>
        <div className='sec-info'>
          <InfoBox info="direction (in degrees)" data={weatherData?.current?.wind_dir} />
          <InfoBox info="speed (in kmph)" data={weatherData?.current?.wind_kph} />
        </div>
      </div>
    </div>
  );
};

export default WeatherInfoBox;

// Define the InfoBox component for displaying specific weather details
const InfoBox = ({ info = "", data = "" }) => {
  // Render a box for each type of information
  return <div className='each-info-box'>
    <p className='data'>{data}</p>
    <p className='info'>{info}</p>
  </div>
}
