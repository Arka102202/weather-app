import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import logo from "../../assets/information-button.png";
import { Tooltip } from 'react-tooltip';
import { getPlaceInfo } from '../../api func/fetchFunc';

const SearchBox = ({ setPlace = () => { }, setLoadingState = () => { } }) => {
  const [query, setQuery] = useState("");


  const fetchPlaceData = async (query = "") => {
    const placeInfo = await getPlaceInfo(query);
    if (placeInfo.error) setLoadingState(placeInfo.message);
    else {
      setPlace(placeInfo);
      setLoadingState("");
    }
  }

  useEffect(() => {
    if (!query) setLoadingState("try search for place to know the weather...");
    else setLoadingState("Searching for the place");
  }, [query, setLoadingState])


  return (
    <div className='search-box'>
      <label htmlFor="place">Search for a place :</label>
      <input type="text" id='place' value={query} onChange={e => setQuery(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Enter") {
            fetchPlaceData(e.target.value);
          }
        }}
        placeholder='place or city, pincode, state, country and press enter' />
      <button className='btn-extra-info' data-tooltip-id="my-tooltip" data-tooltip-content='For exact match and precise location enter the full address'>
        <img src={logo} alt="" />
      </button>
      <Tooltip id='my-tooltip' className='tooltip' />
    </div>
  );
};

export default SearchBox;