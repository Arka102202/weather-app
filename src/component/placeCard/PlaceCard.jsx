import React, { useEffect, useState } from 'react';
import season from "../../assets/season.png";
import { getWeatherInfo } from '../../api func/fetchFunc';
import { Tooltip } from 'react-tooltip';
import add from "../../assets/check.png";
import remove from "../../assets/remove.png";
import Swal from 'sweetalert2';

// Define the PlaceCard component with destructured props
const PlaceCard = ({ weatherData = {}, setUpdate = () => { }, setShowSavedPlaces = () => { }, setPlace = () => { }, setLoadingState = () => { } }) => {

  // State to track if the current location is added to local storage
  const [isAdded, setIsAdded] = useState(false);
  // State to hold updated weather data
  const [newData, setNewData] = useState({});
  // State to indicate if weather data is currently being fetched
  const [isLoading, setIsLoading] = useState(false);

  // Function to update the saved places list in local storage
  const updateList = () => {
    // Retrieve the saved places array from local storage
    const str = localStorage.getItem("allSaved");
    const allSaved = (str && JSON.parse(str)) || [];
    // Check if the current location is already in the saved places list
    if (isAdded) {
      // If location is already added, find its index in the list
      let index = -1;
      for (let i = 0; i < allSaved.length; i++) {
        const temp = allSaved[i];
        if (temp.location.lat === weatherData?.location?.lat && temp.location.lon === weatherData?.location?.lon) {
          index = i;
          break;
        }
      }
      // If found, remove the location from the list
      if (index !== -1) allSaved.splice(index, 1);
      // Update local storage with the modified list
      localStorage.setItem("allSaved", JSON.stringify(allSaved));
      // Toggle the isAdded state to false to indicate removal from saved places
      setIsAdded(false);
      // Trigger an update in the parent component by toggling the setUpdate function
      setUpdate(state => !state);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Removed from the list",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          popup: 'my-custom-popup',
          content: 'my-custom-content',
        }
      });
    }
  }

  // Function to fetch weather information for the current location
  const fetchWeatherInfo = async () => {
    // Set loading state to true to indicate data fetching is in progress
    setIsLoading(true);
    // Fetch weather information for the current location
    const temp = await getWeatherInfo({ lat: weatherData.location.lat, lng: weatherData.location.lon });

    // Retrieve the saved places array from local storage
    const str = localStorage.getItem("allSaved");
    const allSaved = (str && JSON.parse(str)) || [];

    // Find the index of the current location in the saved places list
    let index = -1;
    for (let i = 0; i < allSaved.length; i++) {
      const temp = allSaved[i];
      if (temp.location.lat === weatherData?.location?.lat && temp.location.lon === weatherData?.location?.lon) {
        index = i;
        break;
      }
    }
    // If found, update the weather data for the current location in the saved places list
    if (index !== -1) allSaved.splice(index, 1, { location: weatherData.location, current: temp.current });
    // Update local storage with the modified list
    localStorage.setItem("allSaved", JSON.stringify(allSaved));

    // Set the new weather data in the component state
    setNewData(temp);
    // Set loading state to false to indicate data fetching is complete
    setIsLoading(false);
  }

  // useEffect to check if current location is in the saved list and set isAdded state accordingly
  useEffect(() => {
    // Retrieve the saved places array from local storage
    const str = localStorage.getItem("allSaved");
    const allSaved = (str && JSON.parse(str)) || [];
    // Check if the current location is in the saved places list
    if (allSaved) {
      for (let i = 0; i < allSaved.length; i++) {
        const temp = allSaved[i];
        if (temp.location.lat === weatherData?.location?.lat && temp.location.lon === weatherData?.location?.lon) {
          // If found, set isAdded state to true to indicate that the location is already saved
          setIsAdded(true);
          break;
        }
      }
    }
    // Fetch weather information for the current location when the component mounts
    fetchWeatherInfo();
  }, [])

  // Render the PlaceCard component
  return (
    <div className='place-card' style={{ cursor: "pointer" }} title='see full info' onClick={() => {
      setShowSavedPlaces(false);
      setPlace({ location: { ...weatherData.location, lng: weatherData.location.lon }, name: weatherData.location.name });
      setLoadingState(false);
    }}>
      {isLoading && <div className='update'><p>Updating...</p></div>}
      <div className='weather-logo'>
        <img src={season} alt="" />
      </div>
      <div className='main-info'>
        <div className='line line--1'>
          {/* Display current temperature and weather condition */}
          <p className='temp'>
            {Object.entries(newData).length === 0 ? weatherData?.current?.temp_c : newData?.current?.temp_c} &#x2103;,
          </p>
          <p className='text'>
            {Object.entries(newData).length === 0 ? weatherData?.current?.condition?.text : newData?.current?.condition?.text}
          </p>
        </div>
        <div className='line'>
          {/* Display location name and last updated date */}
          <p className='name'>
            {weatherData.location.name.length > 10 ?
              weatherData.location.name.substring(0, 10) + "...." :
              weatherData.location.name},
          </p>
          <p className='date'>
            {(Object.entries(newData).length === 0 ?
              new Date(weatherData?.current?.last_updated_epoch * 1000) :
              new Date(newData?.current?.last_updated_epoch * 1000)).toDateString()}
          </p>
        </div>
      </div>
      {/* Button to add/remove place from saved list */}
      <button
        className='btn-extra-info btn-add-remove'
        data-tooltip-id="my-tooltip--1"
        data-tooltip-content={!isAdded ? 'Added to the list' : "Remove from the list"}
        onClick={(e) => {
          e.stopPropagation();
          updateList();
        }}
      >
        <img src={!isAdded ? add : remove} alt="" />
      </button>
      <Tooltip id='my-tooltip--1' className='tooltip' style={{ overflow: "hidden", backgroundColor: "#4d4d4d" }} />
    </div>
  );
};

export default PlaceCard;