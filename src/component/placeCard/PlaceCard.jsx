import React, { useEffect, useState } from 'react';
import season from "../../assets/season.png";
import { getWeatherInfo } from '../../api func/fetchFunc';
import { Tooltip } from 'react-tooltip';
import add from "../../assets/check.png";
import remove from "../../assets/remove.png";

const PlaceCard = ({ weatherData = {}, setUpdate = () => { } }) => {



  const [isAdded, setIsAdded] = useState(false);
  const [newData, setNewData] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const updateList = () => {
    const str = localStorage.getItem("allSaved");
    const allSaved = (str && JSON.parse(str)) || [];
    if (isAdded) {
      let index = -1;
      for (let i = 0; i < allSaved.length; i++) {
        const temp = allSaved[i];
        console.log(temp.location.lat);
        if (temp.location.lat === weatherData?.location?.lat && temp.location.lon === weatherData?.location?.lon) {
          index = i;
          break;
        }
      }

      console.log(index);
      if (index !== -1) allSaved.splice(index, 1);

      localStorage.setItem("allSaved", JSON.stringify(allSaved));
      setIsAdded(false);
      setUpdate(state => !state);
    }
  }

  const fetchWeatherInfo = async () => {
    setIsLoading(true);
    const temp = await getWeatherInfo({ lat: weatherData.location.lat, lng: weatherData.location.lon });

    const str = localStorage.getItem("allSaved");
    const allSaved = (str && JSON.parse(str)) || [];

    let index = -1;

    for (let i = 0; i < allSaved.length; i++) {
      const temp = allSaved[i];
      if (temp.location.lat === weatherData?.location?.lat && temp.location.lon === weatherData?.location?.lon) {
        index = i;
        break;
      }
    }

    if (index !== -1) allSaved.splice(index, 1, { location: weatherData.location, current: temp.current });

    localStorage.setItem("allSaved", JSON.stringify(allSaved));

    setNewData(temp);
    setIsLoading(false);
  }


  useEffect(() => {
    const str = localStorage.getItem("allSaved");
    const allSaved = (str && JSON.parse(str)) || [];
    if (allSaved) {
      for (let i = 0; i < allSaved.length; i++) {
        const temp = allSaved[i];

        if (temp.location.lat === weatherData?.location?.lat && temp.location.lon === weatherData?.location?.lon) {
          setIsAdded(true);
          break;
        }
      }
    }
    fetchWeatherInfo();
  }, [])


  return (
    <div className='place-card'>
      {isLoading && <div className='update'><p>Updating...</p></div>}
      <div className='weather-logo'>
        <img src={season} alt="" />
      </div>
      <div className='main-info'>
        <div className='line line--1'>
          <p className='temp'>{Object.entries(newData).length === 0 ? weatherData?.current?.temp_c : newData?.current?.temp_c} &#x2103;, </p>
          <p className='text'>{Object.entries(newData).length === 0 ? weatherData?.current?.condition?.text : newData?.current?.condition?.text}</p>
        </div>
        <div className='line'>
          <p className='name'>{weatherData.location.name.length > 10 ? weatherData.location.name.substring(0, 10) + "...." : weatherData.location.name}, </p>
          <p className='date'>{(Object.entries(newData).length === 0 ? new Date(weatherData?.current?.last_updated_epoch * 1000) : new Date(newData?.current?.last_updated_epoch * 1000)).toDateString()}</p>
        </div>
      </div>
      <button className='btn-extra-info btn-add-remove' data-tooltip-id="my-tooltip--1" data-tooltip-content={!isAdded ? 'Added to the list' : "Remove from the list"} onClick={() => updateList()}>
        <img src={!isAdded ? add : remove} alt="" />
      </button>
      <Tooltip id='my-tooltip--1' className='tooltip' style={{ overflow: "hidden", backgroundColor: "#4d4d4d" }} />
    </div>
  );
};

export default PlaceCard;