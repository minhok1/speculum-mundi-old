import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "./SearchResult.css";
import NavHeader from "../../NavHeader/NavHeader";
import SearchBar from "../../Shared/SearchBar/SearchBar";
import { Summary } from "../../types";

export default function SearchResult() {
  const { searchText } = useParams();
  const [searchList, setSearchList] = useState<Summary[]>([]);

  function getSearchList() {
    fetch("../src/Assets/mock-data.json")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.filter((entry: any) =>
          entry.Name.toLowerCase().includes(searchText)
        );
      })
      .then((response) => {
        setSearchList(response);
      });
  }

  useEffect(() => {
    getSearchList();
  }, []);

  return (
    <div>
      <NavHeader />
      <SearchBar />
      <div className="search-list-container">
        {searchList?.map((searchItem) => (
          <div key={searchItem.Name} className="search-list-item">
            <a>
              <h2 className="item-name">{searchItem.Name}</h2>
            </a>
            <a>
              <div className="item-type">{searchItem.Type}</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
