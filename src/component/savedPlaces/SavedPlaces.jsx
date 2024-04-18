import React, { useEffect, useState } from 'react';
import PlaceCard from '../placeCard/PlaceCard';

const SavedPlaces = () => {


  const [allPlaces, setAllPlaces] = useState([]);
  const [update, setUpdate] = useState(true);


  useEffect(() => {

    const str = localStorage.getItem("allSaved");
    const allSaved = (str && JSON.parse(str)) || [];

    setAllPlaces(allSaved);

  }, [update])





  return (
    <div className='saved-places-box'>
      <p className='title'>All places</p>

      {allPlaces.length > 0 ? <div className='cards'>
        {allPlaces.map((el, idx) => <PlaceCard key={idx} weatherData={el} setUpdate={setUpdate} />)}
      </div> : <p className='no-place'>Please add some places to the list first</p>}

    </div>
  );
};

export default SavedPlaces;