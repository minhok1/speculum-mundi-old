import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./SearchBar.css";

export default function SearchBar() {
  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  function handleSubmit() {
    navigate(`search/${searchText}`);
  }

  return (
    <div className="searchbar-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          className="searchbar"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className="submit-button">
          <SearchIcon />
        </button>
      </form>
    </div>
  );
}
