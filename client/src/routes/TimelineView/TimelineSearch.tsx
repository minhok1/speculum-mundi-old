import "./TimelineSearch.css";
import { Abstract } from "../../types";

import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";

export default function TimelineSearch(props: any) {
  const [searchTemp, setSearchTemp] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState<Abstract[]>([]);
  const [showResult, setShowResult] = useState<boolean[]>([]);

  function handleSubmit(event: any) {
    event.preventDefault();
    setSearchText(searchTemp);
  }

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

  function addToDiagram(event: any, item: Abstract) {
    event?.preventDefault();
    if (!props.state.includes(item)) {
      props.stateChanger([...props.state, item]);
    }
  }

  const onResultClickHandler = (index: number) => {
    let clone = [...showResult];
    let indexItem = clone[index];
    indexItem = !indexItem;
    clone[index] = indexItem;
    setShowResult(clone);
  };

  useEffect(() => {
    if (searchText) {
      getSearchList();
    }
  }, [searchText]);

  return (
    <div>
      <div className="searchbar-container">
        <form>
          <input
            type="text"
            placeholder="Search"
            value={searchTemp}
            className="searchbar"
            onChange={(e) => setSearchTemp(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="submit-button"
          >
            <SearchIcon />
          </button>
        </form>
      </div>
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
            <button
              className="add-button"
              onClick={(e) => {
                addToDiagram(e, searchItem);
              }}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
