import React from 'react';

const Header = ({ setShowSavedPlaces = () => { }, showSavedPlaces = false }) => {
  return (
    <div className='header'>
      <p className='h3'>The Weather App</p>
      <button className='btn' onClick={() => setShowSavedPlaces(state => !state)}>{!showSavedPlaces ? "Saved Places" : "Go to search"}</button>
    </div>
  );
};

export default Header;