import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import logo from "../../assets/information-button.png";
import { Tooltip } from 'react-tooltip';
import { getPlaceInfo } from '../../api func/fetchFunc';

// Define the SearchBox component as a functional component with destructured props
const SearchBox = ({ setPlace = () => { }, setLoadingState = () => { } }) => {
  // State to hold the search query entered by the user
  const [query, setQuery] = useState("");

  // Function to fetch place data based on the search query
  const fetchPlaceData = async (query = "") => {
    // Call the getPlaceInfo function to retrieve information about the place
    const placeInfo = await getPlaceInfo(query);
    
    // Check if there's an error in retrieving place information
    if (placeInfo.error) setLoadingState(placeInfo.message);
    else {
      // Update the place state with the retrieved place information
      setPlace(placeInfo);
      // Clear the loading state as the data is successfully loaded
      setLoadingState("");
    }
  }

  // Effect hook to update loading state based on the search query
  useEffect(() => {
    // Update loading state based on whether a search query is present or not
    if (!query) setLoadingState("try searching for a place to know the weather...");
    else setLoadingState("Searching for the place");
  }, [query, setLoadingState]);

  // Return the JSX structure for the SearchBox component
  return (
    <div className='search-box'>
      {/* Label for the search input */}
      <label htmlFor="place">Search for a place :</label>
      
      {/* Input field for entering the search query */}
      <input 
        type="text" 
        id='place' 
        value={query} 
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => {
          // Perform search when Enter key is pressed
          if (e.key === "Enter" && e.target.value) {
            fetchPlaceData(e.target.value);
          }
        }}
        placeholder='place or city, pincode, state, country and press enter' 
      />
      
      {/* Button for additional information */}
      <button 
        className='btn-extra-info' 
        data-tooltip-id="my-tooltip" 
        data-tooltip-content='For exact match and precise location enter the full address'
      >
        <img src={logo} alt="" />
      </button>
      
      {/* Tooltip component */}
      <Tooltip id='my-tooltip' className='tooltip' style={{overflow: "hidden", backgroundColor: "#4d4d4d"}}/>
    </div>
  );
};


export default SearchBox;