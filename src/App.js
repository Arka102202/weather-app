import Header from "./component/header/Header";
import SearchBox from "./component/searchBox/SearchBox";
import { useState } from "react";
import WeatherInfoBox from "./component/weatherInfoBox/WeatherInfoBox";
import SavedPlaces from "./component/savedPlaces/SavedPlaces";

function App() {


  const [place, setPlace] = useState({});
  const [loadingState, setLoadingState] = useState("try searching for a place to know the weather...");
  const [showSavedPlaces, setShowSavedPlaces] = useState(false);

  return (
    <div className="App" style={{ background: "#232323" }}>
      <Header setShowSavedPlaces={setShowSavedPlaces} showSavedPlaces={showSavedPlaces} />
      {!showSavedPlaces && <>
        <SearchBox setPlace={setPlace} setLoadingState={setLoadingState} />
        <p className='title'>Weather Info</p>
        {loadingState && <p className="loading-state">{loadingState}</p>}
        {!loadingState && <WeatherInfoBox data={place} />}
      </>}
      {showSavedPlaces && <SavedPlaces />}
    </div>
  );
}

export default App;
