import React from "react";
import "./ShortsVideosInfo.css";

const ShortsVideosInfo = (props) => {
  return (
    <div>
      <div className="shortvideos">
        <img className="shortimage" src={props.img} />
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
