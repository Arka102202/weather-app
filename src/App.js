import { getAllCountriesWithCode } from "./api func/fetchFunc";
import Header from "./component/header/Header";

function App() {



  getAllCountriesWithCode();



  return (
    <div className="App" style={{background: "#232323"}}>
      <Header/>
    </div>
  );
}

export default App;
