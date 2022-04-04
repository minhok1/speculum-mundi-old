import { useParams } from "react-router-dom";
import { useEffect } from "react";

import "./SearchResult.css";
import NavHeader from "../../NavHeader/NavHeader";

function getSearchList() {
  fetch("../../Assets/mock-data.json").then((response) =>
    console.log(response)
  );
}

export default function SearchResult() {
  const { searchText } = useParams();

  useEffect(() => {
    getSearchList();
  }, []);

  return (
    <div>
      <NavHeader />
    </div>
  );
}
