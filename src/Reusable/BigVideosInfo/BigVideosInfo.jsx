import React from "react";
import "./BigVideosInfo.css";
import { useSelector } from "react-redux";
import img from "../../../src/assets/bigimg2.jpg";

const BigVideosInfo = (props) => {
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  // const imagePath = require(`../../../src/assets/${props.img}`);
  
  const imagePath = `${process.env.PUBLIC_URL}/assets/${props.img}`; // Ensure the image names match and the format is correct
  const imagePath1 = `/assets/${props.img}`; // Ensure the image names match and the format is correct


  return (
    <div>
      <div className="bigvideos">
        {/* <div className={`bigvideos bigimage bigvideoscontent ${isMenuOpen ? "menu-open" : ""}`}> */}
        <img className="bigimage" src={imagePath1} />
        <div className="bigvideoscontent">
          <div className="round">
            <img
              className="roundimage"
              src={imagePath1}
              alt="Image description"
            />
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
