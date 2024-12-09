import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./WatchLaterPage.css";
import { setBigVideos, setShorts } from "../../../features/videos/videoSlice";

const WatchLaterPage = () => {
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const userID = useSelector((state) => state.videos.userId);
  const dispatch = useDispatch();
  const bigVideos = useSelector((state) => state.videos.bigVideos);
  const shorts = useSelector((state) => state.videos.shorts);
  const [filter, setFilter] = useState("all");

  // Fetch Videos
  useEffect(() => {
    if (userID) fetchViewAllAssociate();
  }, [userID]);

  const fetchViewAllAssociate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/watchlater/viewAllAssociate/${userID}`
      );
      if (!response.ok) throw new Error("Failed to fetch videos.");
      const data = await response.json();

      const bigVideosList = data.data
        .filter((item) => item.BigVideo)
        .map((item) => ({
          ...item.BigVideo,
        }));

      const shortsList = data.data
        .filter((item) => item.ShortsVideo)
        .map((item) => ({
          ...item.ShortsVideo,
        }));

      dispatch(setBigVideos(bigVideosList));
      dispatch(setShorts(shortsList));
    } catch (error) {
      console.error("Error fetching all videos:", error);
    }
  };

  const deleteVideo = async (userid, videosid, type) => {
    try {
      const response = await fetch(
        `http://localhost:4000/watchlater/delete/${userid}/${videosid}/${type}`,
        { method: "DELETE" }
      );
      const result = await response.json();

      if (response.ok) {
        if (type === "big") {
          dispatch(
            setBigVideos(bigVideos.filter((video) => video.id !== videosid))
          );
        } else {
          dispatch(setShorts(shorts.filter((video) => video.id !== videosid)));
        }
        console.log("Video removed successfully");
      } else {
        console.error("Error removing video:", result);
      }
    } catch (error) {
      console.error("Error in deleteVideo function:", error);
    }
  };

  // Filter Videos
  const filteredVideos =
    filter === "all"
      ? [...bigVideos, ...shorts]
      : filter === "videos"
      ? bigVideos
      : shorts;

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
      <div>
        <div className={`WatchContainer ${isMenuOpen ? "menu-open" : ""}`}>
          <h1>Watch Later</h1>
          <div className="menuwatch">
            <button className="all" onClick={() => setFilter("all")}>
              All
            </button>
            <button className="all" onClick={() => setFilter("videos")}>
              Videos
            </button>
            <button className="all" onClick={() => setFilter("shorts")}>
              Shorts
            </button>
          </div>
          <div className="videos-list">
            {filteredVideos.length > 0 ? (
              filteredVideos.map((video, index) => {
                const imagePath = `/assets/${video.img}`;
                return (
                  <div key={index} className="video-item">
                    <div className="leftvideo">
                      <Link to={`/details/${video.id}`} className="no-style-link">
                        <img src={imagePath} alt={video.name} />
                      </Link>
                    </div>
                    <div className="descvideos">
                      <Link to={`/details/${video.id}`} className="no-style-link">
                        <div className="videos-content">
                          <h3>{video.desc}</h3>
                          <p>{video.name}</p>
                        </div>
                      </Link>
                    </div>
                    <div className="video-button">
                      <button
                        className="remove-button"
                        onClick={() =>
                          deleteVideo(
                            userID,
                            video.id,
                            bigVideos.includes(video) ? "big" : "short"
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="empty-state">No videos to display.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default WatchLaterPage;
