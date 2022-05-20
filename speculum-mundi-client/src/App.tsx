import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import "./App.css";
import TimelineView from "./routes/TimelineView/TimelineView";
import GeoView from "./routes/GeoView/GeoView";
import Contact from "./routes/Contact/Contact";
import DiscussionView from "./routes/DiscussionView/DiscussionView";
import SearchResult from "./routes/SearchResult/SearchResult";
import Home from "./routes/Home/Home";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate replace to="home" />} />
              <Route path="home" element={<Home />} />
              <Route path="timeline" element={<TimelineView />} />
              <Route path="map" element={<GeoView />} />
              <Route path="discussions" element={<DiscussionView />} />
              <Route path="contact" element={<Contact />} />
              <Route path="search/:searchText" element={<SearchResult />} />
            </Routes>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
