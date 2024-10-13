import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../../Layouts/Header/Header";
import "./BigVideosDetails.css";
import Videos from "../../../Components/HomeComponents/Videos/Videos";
import img16 from "../../../assets/descimg1.svg";
import img17 from "../../../assets/descimg2.svg";
import img18 from "../../../assets/descimg3.svg";
import img19 from "../../../assets/descimg4.svg";
import img20 from "../../../assets/descimg5.svg";
import img21 from "../../../assets/descimg6.svg";
import img22 from "../../../assets/descimg7.svg";
import Profile_img from "../../../assets/channels4_profile.jpg";
import { originalData } from "../../../features/videos/videoSlice";

import ScrollMenu from "../../../Layouts/ScrollMenu/ScrollMenu";

const BigVideosDetails = () => {
  const { id } = useParams(); // Get the dynamic ID from the URL
  // const combinedVideoData = useSelector(
  //   (state) => state.videos.selectCombinedVideoData
  // );
  // const bigvideoData = useSelector((state) => state.videos.bigvideoData);
  // const video = bigvideoData[id]; // Use the ID to get the specific video

  // const combinedVideoData = useSelector(selectCombinedVideoData);

  const combinedVideoData = useSelector((state) => state.videos.originalData); // Access originalData from Redux state
  const video = combinedVideoData[id];
  const imagePath = `/assets/${video.img}`;
  const videoPath = `/assets/${video.source}`;

  const [showMore, setShowMore] = useState(false);

  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <Header />
      <div className="maincontent">
        <div className="left-content">
          <video controls autoPlay src={videoPath}></video>
          <div className="desc">
            <h2>{video.name}</h2>
            <div className="desc-details">
              <div className="left-desc">
                <img className="roundimage" src={imagePath} />
                
                <div>
                  <h5>{video.channel}</h5>
                  <p>{video.subscribers}</p>
                </div>
                <button class="image-button1">Subscribe</button>
              </div>
              <div className="right-desc">
                <button class="image-button">
                  <div className="likes">
                    <img src={img17} />
                    {video.likes}
                  </div>
                  <div className="dislikes">
                    <div class="separator"></div>
                    <img src={img18} alt="dislikes" />
                  </div>
                  {/* {video.dislikes} */}
                </button>
                <button class="image-button2">
                  <img src={img21} />
                  Share
                </button>
                <button class="image-button3">
                  <img src={img20} />
                  downloads
                </button>
                <button class="image-button-dot">
                  <img src={img22} />
                </button>
              </div>
            </div>
          </div>
          <div
            className={`video-description ${
              showMore ? "expanded" : "collapsed"
            }`}
          >
            <div
              dangerouslySetInnerHTML={{
                // __html: showMore ? video.fullDescription : truncatedDescription,
                __html: showMore
                  ? video.fullDescription
                  : `${video.fullDescription.substring(0, 100)}...`,
              }}
            ></div>
            {/* // dangerouslySetInnerHTML={{ __html: video.fullDescription }}
            // {showMore ? video.fullDescription : `${video.fullDescription.substring(0, 100)}...`}> */}
            <button className="more-button" onClick={toggleDescription}>
              {showMore ? "Show Less" : "Show More"}
            </button>
          </div>
          <div className="comments">
            <p>{"0"} Comments</p>
            <img src={img19} />
            <p>Sort by</p>
          </div>
          <div className="headcomments">
            <img src={Profile_img} />
            <input type="text" placeholder="Add a" />
          </div>
        </div>
        <Videos />
      </div>
    </div>
  );
};

export default BigVideosDetails;
