import { Tooltip } from "react-tooltip";
import Header from "./component/header/Header";
import SearchBox from "./component/searchBox/SearchBox";
import { useState } from "react";
import WeatherInfoBox from "./component/weatherInfoBox/WeatherInfoBox";

function App() {


  const [place, setPlace] = useState({});
  const [loadingState, setLoadingState] = useState("try search for place to know the weather...");

  return (
    <div className="App" style={{ background: "#232323" }}>
      <Header />
      <SearchBox setPlace={setPlace} setLoadingState={setLoadingState} />
      <p className='title'>Weather Info</p>
      {loadingState && <p className="loading-state">{loadingState}</p>}
      {!loadingState && <WeatherInfoBox data={place} />}
    </div>
  );
}

export default App;
