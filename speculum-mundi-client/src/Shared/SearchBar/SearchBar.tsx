import SearchIcon from "@mui/icons-material/Search";

import "./SearchBar.css";

export default function SearchBar() {
  return (
    <div className="searchbar-container">
      <form action="/" method="get" className="searchbar-form">
        <input
          type="text"
          placeholder="Search"
          name="search"
          className="searchbar"
        />
        <button type="submit" className="submit-button">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
