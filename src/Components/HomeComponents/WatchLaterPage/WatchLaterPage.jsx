import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./WatchLaterPage.css";

const WatchLaterPage = () => {
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const bigVideosIds = useSelector((state) => state.videos.bigVideosIds);
  const shortsIds = useSelector((state) => state.videos.shortsIds);
  console.log("In WatchLater:",bigVideosIds);
  console.log("Redux Store shortsIds:", shortsIds); // Directly log the shortsIds from Redux


  return (
    <div>
      <div className={`WatchContainer  ${isMenuOpen ? "menu-open" : ""}`}>
        {/* <div className="WatchContainer"> */}
        <div className="menuwatch">
          <button className="all">All</button>
          <button className="all">Videos</button>
          <button className="all">Shorts</button>{" "}
        </div>
      </div>
    </div>
  );
};

export default WatchLaterPage;
