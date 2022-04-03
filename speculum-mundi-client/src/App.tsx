import "./App.css";
import NavHeader from "./NavHeader/NavHeader";
import SearchBar from "./Shared/SearchBar/SearchBar";

function App() {
  return (
    <div className="App">
      <NavHeader />
      <div className="slogan-center">
        <span className="handwritten">Speculum Mundi</span>
        <span className="typed">The Complete History Project</span>
      </div>
      <SearchBar />
    </div>
  );
}

export default App;
