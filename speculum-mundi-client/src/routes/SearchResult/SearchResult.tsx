import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import "./SearchResult.css";
import NavHeader from "../../NavHeader/NavHeader";

export default function SearchResult() {
  const { searchText } = useParams();
  const [searchList, setSearchList] = useState([]);

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
        console.log(response);
      });
  }

  useEffect(() => {
    getSearchList();
  }, []);

  return (
    <div>
      <NavHeader />
    </div>
  );
}
