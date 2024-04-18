import React, { useEffect, useState } from 'react';
import season from "../../assets/season.png";
import { getWeatherInfo } from '../../api func/fetchFunc';
import { Tooltip } from 'react-tooltip';
import add from "../../assets/check.png";
import remove from "../../assets/remove.png";

const WeatherInfoBox = ({ data = {} }) => {


  const [weatherData, setWeatherData] = useState({});
  const [isAdded, setIsAdded] = useState(false);

  const fetchWeatherInfo = async () => {
    const temp = await getWeatherInfo(data.location);
    setWeatherData(temp);
  }


  const updateList = () => {
    const str = localStorage.getItem("allSaved");
    const allSaved = (str && JSON.parse(str)) || [];
    if (isAdded) {
      let index = -1;
      for (let i = 0; i < allSaved.length; i++) {
        const temp = allSaved[i];
        console.log(temp.location.lat);
        if (parseFloat((temp.location.lat).toFixed(2)) === weatherData.location.lat && parseFloat((temp.location.lon).toFixed(2)) === weatherData.location.lon) {
          index = i;
          break;
        }
      }

      console.log(index);
      if (index !== -1) allSaved.splice(index, 1);

      localStorage.setItem("allSaved", JSON.stringify(allSaved));
      setIsAdded(false);
    }
    else {
      allSaved.push({
        location: {
          "name": data.name,
          "address": data.address,
          "lat": data.location.lat,
          "lon": data.location.lng,
        }, current: weatherData.current
      });
      localStorage.setItem("allSaved", JSON.stringify(allSaved));
      setIsAdded(true);
    }
  }


  useEffect(() => {
    fetchWeatherInfo();
  }, [])

  useEffect(() => {
    const str = localStorage.getItem("allSaved");
    const allSaved = (str && JSON.parse(str)) || [];
    if (allSaved) {
      for (let i = 0; i < allSaved.length; i++) {
        const temp = allSaved[i];

        if (parseFloat((temp.location.lat).toFixed(2)) === weatherData?.location?.lat && parseFloat((temp.location.lon).toFixed(2)) === weatherData?.location?.lon) {
          setIsAdded(true);
          break;
        }
      }
    }
  }, [weatherData])


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
        <button className='btn-extra-info btn-add-remove' data-tooltip-id="my-tooltip--1" data-tooltip-content={!isAdded ? 'Added to the list' : "Remove from the list"} onClick={() => updateList()}>
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
          <InfoBox info="direction (in meters)" data={weatherData?.current?.wind_dir} />
          <InfoBox info="speed (in kmph)" data={weatherData?.current?.wind_kph} />
        </div>
      </div>
    </div>
  );
};

export default WeatherInfoBox;


const InfoBox = ({ info = "", data = "" }) => {

  return <div className='each-info-box'>
    <p className='data'>{data}</p>
    <p className='info'>{info}</p>
  </div>
}