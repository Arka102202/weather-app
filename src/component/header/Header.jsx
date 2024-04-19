import React from 'react';

// Define the Header component as a functional component with destructured props
const Header = ({ setShowSavedPlaces = () => { }, showSavedPlaces = false }) => {
  // Return the JSX structure for the Header component
  return (
    <div className='header'>
      {/* Title of the Weather App */}
      <p className='h3'>The Weather App</p>
      
      {/* Button to toggle between showing saved places and search */}
      <button className='btn' onClick={() => setShowSavedPlaces(state => !state)}>
        {/* Conditionally display text based on the state of showSavedPlaces */}
        {!showSavedPlaces ? "Saved Places" : "Go to search"}
      </button>
    </div>
  );
};

// Export the Header component as the default export
export default Header;
