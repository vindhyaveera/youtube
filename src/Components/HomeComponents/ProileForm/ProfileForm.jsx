import React from "react";
import "./ProfileForm.css";
import { useSelector } from "react-redux";

const ProfileForm = () => {
  const bigvideoData = useSelector((state) => state.videos.userVideos);
  const shortsvideoData = useSelector((state) => state.videos.userShortsVideos);
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);

  console.log("This is Shortsvideosofuser", shortsvideoData);

  return (
    // <div className={`profile-form-overlay  ${isMenuOpen ? "menu-open" : ""}`}>
    <div className="profile-form-overlay">
      <div className="profile-form-container">
        <div className={`video-list-profile  ${isMenuOpen ? "menu-open" : ""}`}>
          {/* <div className="video-list-profile"> */}
          {bigvideoData.length > 0 ? (
            bigvideoData.map((video, index) => {
              const imagePath = `/assets/${video.img}`;
              // const videoPath = `/assets/${filteredVideos.source}`;
              return (
                <div key={index} className="video-item">
                  <div className="leftvideo">
                    <img
                      className="leftbigvideos"
                      src={imagePath}
                      alt={video.name}
                    />
                  </div>
                  <div className="video-content">
                    <h3>{video.name}</h3>
                    <p>{video.desc}</p>
                    <p>{video.rates}</p>
                    <p>Channel: {video.channel}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Bigvideos found</p>
          )}

          {shortsvideoData.length > 0 ? (
            shortsvideoData.map((video, index) => {
              const imagePath = `/assets/${video.img}`;
              // const videoPath = `/assets/${filteredVideos.source}`;
              return (
                <div key={index} className="video-item">
                  <div className="leftshortvideo">
                    <img
                      className="shortimage"
                      src={imagePath}
                      alt={video.name}
                    />
                  </div>
                  <div className="video-content">
                    <h3>{video.name}</h3>
                    <p>{video.desc}</p>
                    <p>{video.rates}</p>
                    {/* <p>Channel: {video.channel}</p> */}
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Shortsvideos found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
