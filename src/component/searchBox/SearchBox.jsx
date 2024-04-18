import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import logo from "../../assets/information-button.png";
import { Tooltip } from 'react-tooltip';

const SearchBox = () => {
  const [place, setPlace] = useState("");

  return (
    <div className='search-box'>
      <label htmlFor="place">Search for a place :</label>
      <input type="text" id='place' value={place} onChange={e => setPlace(e.target.value)}
        placeholder='place or city, pincode, state, country' />
      <button className='btn-extra-info' data-tooltip-id="my-tooltip" data-tooltip-content='For exact match and precise location enter the full address'>
        <img src={logo} alt="" />
      </button>
      <Tooltip id='my-tooltip' className='tooltip'/>
    </div>
  );
};

export default SearchBox;