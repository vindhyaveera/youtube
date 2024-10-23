import React from "react";
import "./ProfileForm.css";
import { useSelector } from "react-redux";

const ProfileForm = ({ onClose }) => {
  const bigvideoData = useSelector((state) => state.videos.userVideos);

  return (
    <div className="profile-form-overlay">
      <div className="profile-form-container">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
          <h1>Channels Content</h1>
        <div className="video-list">
          {bigvideoData.length > 0 ? (
            bigvideoData.map((video, index) => {
              const imagePath = `/assets/${video.img}`;
              // const videoPath = `/assets/${filteredVideos.source}`;
              return (
                <div key={index} className="video-item">
                  <div className="leftvideo">
                    <img src={imagePath} alt={video.name} />
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
            <p>No videos found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
