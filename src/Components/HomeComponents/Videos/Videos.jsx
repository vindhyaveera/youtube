import React from "react";
import "./Videos.css";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import VideosInfo from "../../../Reusable/VideosInfo/VideosInfo";
import ScrollMenuSmall from "../../../Layouts/ScrollMenuSmall/ScrollMenuSmall";

const Videos = () => {
  const { id } = useParams(); // Get the dynamic ID from the URL
  const combinedVideoData = useSelector((state) => state.videos.originalData); // Access originalData from Redux state

  return (
    <div className="videos">
      <div className="scrollmenu">
        <ScrollMenuSmall />
      </div>
      <div className="video">
        {combinedVideoData.map((video, index) => (
          <Link
            to={`/details/${video.id}`}
            className="no-style-link"
            key={video.id}
          >
            <VideosInfo
              img={video.img}
              name={video.name}
              desc={video.desc}
              dots={video.dots}
              rates={video.rates}
              showButtons={video.showButtons}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Videos;
