import Header from "./component/header/Header";
import SearchBox from "./component/searchBox/SearchBox";
import { useState } from "react";
import WeatherInfoBox from "./component/weatherInfoBox/WeatherInfoBox";
import SavedPlaces from "./component/savedPlaces/SavedPlaces";

// Define the App component
function App() {
  // State to hold the selected place's details
  const [place, setPlace] = useState({});

  // State to manage loading messages or status updates
  const [loadingState, setLoadingState] = useState("try searching for a place to know the weather...");

  // State to toggle the visibility of saved places
  const [showSavedPlaces, setShowSavedPlaces] = useState(false);

  // The component returns a div wrapper for the entire app interface
  return (
    <div className="App" style={{ background: "#232323" }}>
      {/* Header component that receives functions and states to manage saved places */}
      <Header setShowSavedPlaces={setShowSavedPlaces} showSavedPlaces={showSavedPlaces} />

      {/* Conditionally display SearchBox and WeatherInfo only when not showing saved places */}
      {!showSavedPlaces && (
        <>
          {/* Component for searching places. It receives a setPlace function to update the place state */}
          <SearchBox setPlace={setPlace} setLoadingState={setLoadingState} loadingState={loadingState}/>

          {/* Title for the weather information section */}
          <p className='title'>Weather Info</p>

          {/* Display a loading or status message if there is any */}
          {loadingState && <p className="loading-state">{loadingState}</p>}

          {/* Display weather information if loadingState is empty (indicating loading is complete) */}
          {!loadingState && <WeatherInfoBox data={place} />}
        </>
      )}

      {/* Display saved places component when showSavedPlaces is true */}
      {showSavedPlaces && <SavedPlaces setShowSavedPlaces={setShowSavedPlaces} setPlace={setPlace} setLoadingState={setLoadingState}/>}
    </div>
  );
}


export default App;
