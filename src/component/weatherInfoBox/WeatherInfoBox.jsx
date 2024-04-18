import React, { useEffect, useState } from 'react';
import season from "../../assets/season.png";
import { getWeatherInfo } from '../../api func/fetchFunc';

const WeatherInfoBox = ({ data = {} }) => {


  const [weatherData, setWeatherData] = useState({});


  const fetchWeatherInfo = async () => {
    const temp = await getWeatherInfo(data.location);

    setWeatherData(temp);
  }


  useEffect(() => {
    fetchWeatherInfo();
  }, [])


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
      </div>

      <div className='all-info-box'>
        <p className='sec-head'>Atmospheric Condition</p>
        <div className='sec-info'>
          <InfoBox info="humidity" data={weatherData?.current?.humidity} />
          <InfoBox info="visibility (in meters)" data={weatherData?.current?.vis_km} />
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