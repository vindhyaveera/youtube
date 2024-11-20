import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./WatchLaterPage.css";
import { Link } from "react-router-dom";

const WatchLaterPage = () => {
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const bigVideosIds = useSelector((state) => state.videos.bigVideosIds);
  const shortsIds = useSelector((state) => state.videos.shortsIds);
  const userID = localStorage.getItem("id");

  const [allVideos, setAllVideos] = useState([]); // Combined videos
  const [filter, setFilter] = useState("all"); // Current filter

  // Fetch Big Videos
  const fetchBigVideos = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/watchlater/getuserwatchlaterVideos/${userID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: bigVideosIds }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch big videos.");
      }

      const data = await response.json();
      return (data.data || []).map((video) => ({
        ...video,
        type: "bigVideo",
      }));
    } catch (error) {
      console.error("Error fetching big videos:", error);
      return [];
    }
  };

  // Fetch Shorts Videos
  const fetchShortsVideos = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/watchlater/getuserwatchlaterShortsVideos/${userID}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ids: shortsIds }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch shorts videos.");
      }

      const data = await response.json();
      console.log("Shorts:", data);
      return (data.data || []).map((video) => ({
        ...video,
        type: "short",
      }));
    } catch (error) {
      console.error("Error fetching shorts videos:", error);
      return [];
    }
  };

  // Fetch and combine videos
  const fetchVideos = async () => {
    const [bigVideos, shortsVideos] = await Promise.all([
      fetchBigVideos(),
      fetchShortsVideos(),
    ]);
    setAllVideos([...bigVideos, ...shortsVideos]);
  };

  useEffect(() => {
    if (bigVideosIds.length || shortsIds.length) {
      fetchVideos();
    }
  }, [bigVideosIds, shortsIds]);

  const filteredVideos = allVideos.filter((video) => {
    if (filter === "videos") return video.type === "bigVideo";
    if (filter === "shorts") return video.type === "short";
    return true; // "all" filter shows all videos
  });

  return (
    <div>
      <div className={`WatchContainer ${isMenuOpen ? "menu-open" : ""}`}>
        <h1>Watch Later</h1>

        {/* Filter Buttons */}
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

        {/* Videos List */}
        <div className="videos-list">
          {console.log("Return:", filteredVideos)}
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
                      <h3>{video.desc}</h3>
                      <p>{video.name}</p>
                    </Link>
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
};

export default WatchLaterPage;
