import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import "./ScrollMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ScrollMenu = () => {
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const scrollContainerRef = useRef(null);
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);


  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });

      // Determine if buttons should be shown or hidden
      const newScrollLeft = scrollContainerRef.current.scrollLeft;
      const scrollWidth = scrollContainerRef.current.scrollWidth;
      const clientWidth = scrollContainerRef.current.clientWidth;

      if (direction === "left") {
        setShowNext(true);
        if (newScrollLeft <= 200) {
          setShowPrev(false);
        }
      } else {
        setShowPrev(true);
        if (scrollWidth - newScrollLeft <= clientWidth + 200) {
          setShowNext(false);
        }
      }
    }
  };

  return (
    <div className="scroll-container-wrapper">
    
      <div className={`scroll-container  ${isMenuOpen ? "menu-open" : ""}`} ref={scrollContainerRef}>
        {showPrev && (
          <button
          className={`nav-button prev-button ${isMenuOpen ? "menu-open" : ""}`}
            onClick={() => handleScroll("left")}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        <button className="button">ALL</button>
        <button className="button">Music</button>
        <button className="button">News</button>
        <button className="button">Vocabulary</button>
        <button className="button">Live</button>
        <button className="button">Mixes</button>
        <button className="button">Astrological Signs</button>
        <button className="button">Tamil television drama</button>
        <button className="button">Indian classical dance</button>
        <button className="button">Silk</button>
        <button className="button">Rajinikanth</button>
        <button className="button">Mixes</button>
        <button className="button">Astrological Signs</button>
        <button className="button">Tamil television drama</button>
        <button className="button">Indian classical dance</button>
        <button className="button">Silk</button>
        <button className="button">Rajinikanth</button>

        <button className="button">Mixes</button>
        <button className="button">Astrological Signs</button>
        <button className="button">Tamil television drama</button>
        <button className="button">Indian classical dance</button>
        <button className="button">Silk</button>
        <button className="button">Rajinikanth</button>

        {/* Add more buttons as needed */}
        {showNext && (
          <button
          className={`nav-button next-button ${isMenuOpen ? "menu-open" : ""}`}
            onClick={() => handleScroll("right")}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ScrollMenu;
