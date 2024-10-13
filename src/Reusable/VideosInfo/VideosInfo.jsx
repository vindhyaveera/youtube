import React from "react";
import { Link } from "react-router-dom";
import "./VideosInfo.css";

const VideosInfo = (props) => {
  const imagePath = `/assets/${props.img}`;

  return (
    <div>
      <div className="videoinfo">
        <Link to={`/video/${props.id}`}>
          <img className="image" src={imagePath}></img>
        </Link>

        <div className="image-desc">
          <h4>{props.name}</h4>
          <p>{props.desc}</p>
          <p>{props.rates}</p>
        </div>
        <img className="dots" src={props.dots}></img>
      </div>
    </div>
  );
};

export default VideosInfo;
