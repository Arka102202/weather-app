import React, { useEffect, useState } from 'react';
import PlaceCard from '../placeCard/PlaceCard';

// Define the SavedPlaces component.
const SavedPlaces = ({setShowSavedPlaces = () => {}, setPlace = () => {}, setLoadingState= () =>{}}) => {
  // State to hold the list of saved places.
  const [allPlaces, setAllPlaces] = useState([]);
  // State to trigger re-fetching from local storage. This is used to refresh the list when an item is added or removed.
  const [update, setUpdate] = useState(true);

  // useEffect hook to load saved places from local storage whenever the 'update' state changes.
  useEffect(() => {
    // Retrieve the saved places string from local storage.
    const str = localStorage.getItem("allSaved");
    // Parse the JSON string to an array or default to an empty array if there is nothing in local storage.
    const allSaved = (str && JSON.parse(str)) || [];
    // Set the retrieved places to the allPlaces state.
    setAllPlaces(allSaved);
  }, [update]); // Depend on 'update' to re-run the effect when it changes.

  // Render the SavedPlaces component.
  return (
    <div className='saved-places-box'>
      <p className='title'>All places</p>
      {allPlaces.length > 0 ? (
        // Render cards for each place if there are any saved places.
        <div className='cards'>
          {allPlaces.map((el, idx) => 
            <PlaceCard key={idx} weatherData={el} setUpdate={setUpdate} setShowSavedPlaces={setShowSavedPlaces} setPlace={setPlace}
            setLoadingState={setLoadingState}/>
          )}
        </div>
      ) : (
        // Display a message if there are no places saved.
        <p className='no-place'>Please add some places to the list first</p>
      )}
    </div>
  );
};


export default SavedPlaces;