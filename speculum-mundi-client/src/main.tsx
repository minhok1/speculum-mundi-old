import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import TimelineView from "./routes/TimelineView/TimelineView";
import GeoView from "./routes/GeoView/GeoView";
import Contact from "./routes/Contact/Contact";
import DiscussionView from "./routes/DiscussionView/DiscussionView";
import SearchResult from "./routes/SearchResult/SearchResult";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="timeline" element={<TimelineView />} />
        <Route path="map" element={<GeoView />} />
        <Route path="discussions" element={<DiscussionView />} />
        <Route path="contact" element={<Contact />} />
        <Route path="search/:searchText" element={<SearchResult />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
