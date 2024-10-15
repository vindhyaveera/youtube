import React from "react";
import "./ShortsVideosInfo.css";

const ShortsVideosInfo = (props) => {
  const imagePath = `/assets/${props.img}`;

  return (
    <div>
      <div className="shortvideos">
        <img className="shortimage" src={imagePath} />
        <div className="shortvideoscontent">
          <div className="shortvideosdesc">
            <h3>{props.name}</h3>
            <p>{props.rates}</p>
          </div>
          <img src={props.dots} />
        </div>
        {/* Conditionally render the buttons */}
      </div>
    </div>
  );
};

export default ShortsVideosInfo;
