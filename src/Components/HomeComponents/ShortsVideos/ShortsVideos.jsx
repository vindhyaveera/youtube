import React, { useRef, useState } from "react";
import ShortsVideosInfo from "../../../Reusable/ShortsVideosInfo/ShortsVideosInfo";
import "./ShortsVideos.css";
import { useSelector } from "react-redux";
import ShortImg from "../../../assets/shortsimg.svg";
import CloseImg from "../../../assets/closeimg.svg";

const ShortsVideos = ({ bigvideosRef }) => {
  const [showMore, setShowMore] = useState(false);
  const [videosVisible, setVideosVisible] = useState(true); // State for video visibility
  const shortvideoData = useSelector((state) => state.videos.shortvideoData);
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const shortsParentRef = useRef(null); // Ref for shortsparent

  // Determine the number of videos to display
  const videosToShow = showMore ? shortvideoData : shortvideoData.slice(0, 5);

  const handleShowMore = () => {
    if (showMore) {
      // Scroll back to the shortsparent when showing less
      setShowMore(false);
      setTimeout(() => {
        const shortsElement = shortsParentRef.current;
        // const shortsElement = document.querySelector(".shortsparent");
        if (shortsElement) {
          shortsElement.scrollIntoView({
            behavior: "smooth",
            // block: "start",
          });
        }
      }, 100); // Adjust delay as necessary
    } else {
      // Scroll to the start of the next big video grid when showing more
      setShowMore(true);
      setTimeout(() => {
        // const nextBigVideoGrid = document.querySelector(".bigvideodata2");
        const nextBigVideoGrid = bigvideosRef.current;
        if (nextBigVideoGrid) {
          nextBigVideoGrid.scrollIntoView({
            behavior: "smooth",
            // block: "start",
          });
        }
      }, 100); // Adjust delay as necessary
    }
  };

  const handleClose = () => {
    setVideosVisible(false);
  };

  const handleUndo = () => {
    setVideosVisible(true);
  };

  return (
    <div>
      {videosVisible ? (
        <div
          ref={shortsParentRef}
          className={`shortsparent  ${isMenuOpen ? "menu-open" : ""}`}
        >
          {/* // <div className="shortsparent"> */}
          <div className={`shortshead  ${isMenuOpen ? "menu-open" : ""}`}>
            <div className="headleft">
              <div className="img">
                <img className="image" src={ShortImg} />
              </div>
              <h2>Shorts</h2>
            </div>
            <div className="img">
              <img className="image" src={CloseImg} onClick={handleClose} />
            </div>
          </div>
          <div
            className={`shortscontent ${showMore ? "expanded" : ""} ${
              isMenuOpen ? "menu-open" : ""
            }`}
          >
            <div className={`shortvideogrid ${isMenuOpen ? "menu-open" : ""}`}>
              {videosToShow.map((video, index) => (
                <ShortsVideosInfo
                  key={index}
                  img={video.img}
                  name={video.name}
                  dots={video.dots}
                  rates={video.rates}
                />
              ))}
            </div>
          </div>
          <div className="showmore">
            {/* <button onClick={() => setShowMore(!showMore)}> */}
            <hr className={`custom-hr-left ${isMenuOpen ? "menu-open" : ""}`} />
            <button onClick={handleShowMore}>
              {showMore ? "Show Less" : "Show More"}
            </button>
            <hr
              className={`custom-hr-right ${isMenuOpen ? "menu-open" : ""}`}
            />
          </div>
        </div>
      ) : (
        <div className="undo-message">
          <p>Shelf will be hidden for 30 days</p>
          <button onClick={handleUndo}>Undo</button>
        </div>
      )}
    </div>
  );
};

export default ShortsVideos;
