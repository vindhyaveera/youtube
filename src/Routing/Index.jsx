import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../Components/HomeComponents/BigVideos/BigVideos";
import BigVideosDetails from "../Components/HomeComponents/BigVideosDetails/BigVideosDetails";
import SearchComponent from "../Components/HomeComponents/SearchComponents/SearchComponents"; // Import your SearchComponent

const Index = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/details/:id" element={<BigVideosDetails />} />
          <Route path="/search" element={<SearchComponent />} />{" "}
          {/* Add the SearchComponent route */}
        </Routes>
      </Router>
    </div>
  );
};

export default Index;
