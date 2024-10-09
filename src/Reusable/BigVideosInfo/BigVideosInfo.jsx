import React from "react";
import "./BigVideosInfo.css";
import { useSelector } from "react-redux";


const BigVideosInfo = (props) => {
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);

  return (
    <div>
      <div className="bigvideos">
      {/* <div className={`bigvideos bigimage bigvideoscontent ${isMenuOpen ? "menu-open" : ""}`}> */}
        <img className="bigimage" src={props.img} />
        <div className="bigvideoscontent">
          <div className="round">
            <img className="roundimage" src={props.img} />
          </div>
          <div className="bigvideosdesc">
            <h2>{props.name}</h2>
            <p>{props.desc}</p>
            <p>{props.rates}</p>
          </div>
          <img src={props.dots} />
        </div>
        {/* Conditionally render the buttons */}
      </div>
      {props.showButtons && (
        <div className="button-container">
          <button className="buttoncolor1">Watch</button>
          <button className="buttoncolor">Learn more</button>
        </div>
      )}
    </div>
  );
};

export default BigVideosInfo;
