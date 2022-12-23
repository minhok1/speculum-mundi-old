import { useEffect, useState } from "react";
import ArticleIcon from "@mui/icons-material/Article";

import "./InfoView.css";
import NavSidebar from "../../NavSidebar/NavSidebar";
import ProfileHeader from "../../ProfileHeader/ProfileHeader";
import SearchBar from "../../Shared/SearchBar/SearchBar";
import InfoDetailWidget from "./InfoDetailWidget";

export default function InfoView() {
  const [searchList, setSearchList] = useState([]);
  const [selectedAbstract, setSelectedAbstract] = useState(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleAbstractSelection = (abstract: any, index: number) => {
    setSelectedAbstract(abstract);
    setActiveIndex(index);
  };

  useEffect(() => {
    setActiveIndex(null);
  }, [searchList]);

  return (
    <div className="page-container">
      <NavSidebar />
      <div className="contents-container">
        <ProfileHeader pageTitle="Information" />
        <SearchBar setSearchList={setSearchList} />
        <div className="dashboard-container info-contents">
          <div className="container-panel search-result">
            {searchList.map((listItem: any, i: number) => (
              <div
                key={listItem.id}
                className={
                  `search-result-item` +
                  (i === activeIndex ? " active-search-result-item" : "")
                }
                onClick={() => {
                  handleAbstractSelection(listItem, i);
                }}
              >
                <ArticleIcon
                  className={
                    `search-result-icon` +
                    (i === activeIndex ? " active-search-result-font" : "")
                  }
                />
                <div className="search-result-info">
                  <div
                    className={
                      `search-result-title` +
                      (i === activeIndex ? " active-search-result-font" : "")
                    }
                  >
                    {listItem.title}
                  </div>
                  <div className="search-result-type">{listItem.type}</div>
                </div>
              </div>
            ))}
          </div>
          {selectedAbstract && (
            <InfoDetailWidget selectedAbstract={selectedAbstract} />
          )}
        </div>
      </div>
    </div>
  );
}
