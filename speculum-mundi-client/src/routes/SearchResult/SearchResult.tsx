import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "./SearchResult.css";
import NavHeader from "../../NavHeader/NavHeader";
import SearchBar from "../../Shared/SearchBar/SearchBar";
import { Abstract } from "../../types";

export default function SearchResult() {
  const { searchText } = useParams();
  const [searchList, setSearchList] = useState<Abstract[]>([]);
  const [showResult, setShowResult] = useState<boolean[]>([]);

  function getSearchList() {
    fetch(`http://localhost:8000/api/abstracts/title=${searchText}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setShowResult(Array(response.length).fill(false));
        setSearchList(response);
      });
  }

  useEffect(() => {
    getSearchList();
  }, []);

  const onResultClickHandler = (index: number) => {
    //this had to be done because doing clone = showResult doesn't work, as showResult is const and so would clone if I make it equal to showResult
    let clone = [...showResult];
    let indexItem = clone[index];
    indexItem = !indexItem;
    clone[index] = indexItem;
    setShowResult(clone);
  };

  return (
    <div>
      <NavHeader />
      <SearchBar />
      <div className="search-list-container">
        {searchList?.map((searchItem, index) => (
          <div
            key={searchItem.title}
            className="search-list-item"
            onClick={() => onResultClickHandler(index)}
          >
            <h2 className="item-name">{searchItem.title}</h2>
            <div className="item-type">{searchItem.type}</div>
            {showResult[index] && (
              <div className="item-introduction">{searchItem.content}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
