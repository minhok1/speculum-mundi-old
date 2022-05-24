import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";

import "./SearchBar.css";

export default function SearchBar(props: any) {
  const [searchText, setSearchText] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  function getSearchList() {
    fetch(`http://localhost:8000/api/abstracts/title=${searchText}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
        props.setSearchList(response);
        setIsFetching(false);
      });
  }

  useEffect(() => {
    if (isFetching) {
      getSearchList();
    }
  }, [isFetching]);

  return (
    <div className="searchbar-container">
      <SearchIcon className="search-icon" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsFetching(true);
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={searchText}
          className="searchbar"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </form>
    </div>
  );
}
