import React, { useState } from "react";
import "./ProfileForm.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile_img from "../../../assets/channels4_profile.jpg";

const ProfileForm = () => {
  const bigvideoData = useSelector((state) => state.videos.userVideos);
  const shortsvideoData = useSelector((state) => state.videos.userShortsVideos);
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const user = useSelector((state) => state.videos.userName);

  const [showAllBigVideos, setShowAllBigVideos] = useState(false);
  const [showAllShortsVideos, setShowAllShortsVideos] = useState(false);
  const userID = useSelector((state) => state.videos.userId); // Get userID from Redux

  const handleToggleBigVideos = () => setShowAllBigVideos(!showAllBigVideos);
  const handleToggleShortsVideos = () =>
    setShowAllShortsVideos(!showAllShortsVideos);

  const displayedBigVideos = showAllBigVideos
    ? bigvideoData
    : bigvideoData.slice(0, 5); // Show first 5 by default
  const displayedShortsVideos = showAllShortsVideos
    ? shortsvideoData
    : shortsvideoData.slice(0, 5); // Show first 5 by default

  // Render the welcome message if userID is missing
  if (userID === null) {
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "10%",
          padding: "20px",
          border: "0.1px solid #ADD8E6",
          borderRadius: "10px",
          boxShadow:
            "8px 0 8px rgba(173, 216, 230, 0.5), -8px 0 8px rgba(173, 216, 230, 0.5)",
          backgroundColor: "#f0f8ff",
          marginLeft: "auto",
          marginRight: "auto",
          width: "50%",
        }}
      >
        <h1>Welcome to the App</h1>
        <p>Please log in to access your account.</p>
      </div>
    );
  } else {
    return (
      <div className="profile-form-overlay">
        <div
          className={`profile-form-container ${isMenuOpen ? "menu-open" : ""}`}
        >
          <div className="profile-header">
            <img
              src={Profile_img}
              alt={`${user}'s profile`}
              className="profile-image"
            />
            <h2 className="profile-username">{`${user}'s profile`}</h2>
          </div>

          {/* Big Videos Section */}
          <div className="profile-big-videos-section">
            <h3 className="profile-big-section-header">
              <span>Big Videos</span>
              {bigvideoData.length > 5 && (
                <button
                  onClick={handleToggleBigVideos}
                  className="profile-big-view-all-btn"
                >
                  {showAllBigVideos ? "Show Less" : "View All"}
                </button>
              )}
            </h3>
            <div
              className={`profile-big-videos ${
                showAllBigVideos
                  ? "profile-big-show-all"
                  : "profile-big-show-limited"
              }`}
            >
              {displayedBigVideos.map((video, index) => (
                <Link
                  to={`/details/${video.id}`}
                  className="no-style-link-search"
                  // key={index}
                >
                  <div key={index} className="profile-big-item">
                    <img
                      src={`/assets/${video.img}`}
                      alt={video.name}
                      className="profile-big-image"
                    />
                    <div className="profile-big-content">
                      <h4 className="profile-big-title">{video.name}</h4>
                      {/* <p className="profile-big-desc">{video.desc}</p> */}
                      {/* <p className="profile-big-rates">{video.rates}</p> */}
                      <p className="profile-big-channel">
                        Channel: {video.channel}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Shorts Videos Section */}
          <div className="profile-shorts-videos-section">
            <h3 className="profile-shorts-section-header">
              <span>Shorts Videos</span>
              {shortsvideoData.length > 5 && (
                <button
                  onClick={handleToggleShortsVideos}
                  className="profile-shorts-view-all-btn"
                >
                  {showAllShortsVideos ? "Show Less" : "View All"}
                </button>
              )}
            </h3>
            <div
              className={`profile-shorts-videos ${
                showAllShortsVideos
                  ? "profile-shorts-show-all"
                  : "profile-shorts-show-limited"
              }`}
            >
              {displayedShortsVideos.map((video, index) => (
                <div key={index} className="profile-shorts-item">
                  <img
                    src={`/assets/${video.img}`}
                    alt={video.name}
                    className="profile-shorts-image"
                  />
                  <div className="profile-shorts-content">
                    <h4 className="profile-shorts-title">{video.name}</h4>
                    <p className="profile-shorts-desc">{video.desc}</p>
                    <p className="profile-shorts-rates">{video.rates}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileForm;
