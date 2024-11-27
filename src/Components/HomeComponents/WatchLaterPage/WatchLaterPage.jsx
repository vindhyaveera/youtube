import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import "./WatchLaterPage.css";
import { setBigVideos, setShorts } from "../../../features/videos/videoSlice"; // Update the path as needed

const WatchLaterPage = () => {
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const userID = useSelector((state) => state.videos.userId); // Get userID from Redux
 
  //  console.log("UserID:",userID);
  // const userID = localStorage.getItem("id");
  const dispatch = useDispatch();
  const bigVideos = useSelector((state) => state.videos.bigVideos);
  const shorts = useSelector((state) => state.videos.shorts);

  // const [bigVideos, setBigVideos] = useState([]); // Big videos
  // const [shorts, setShorts] = useState([]); // Short videos
  const [filter, setFilter] = useState("all"); // Current filter

  // Fetch All Videos from viewAllAssociate API
  const fetchViewAllAssociate = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/watchlater/viewAllAssociate/${userID}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch videos.");
      }

      const data = await response.json();

      // To store unique IDs
      const uniqueBigVideos = new Set();
      const uniqueShorts = new Set();

      // Separate Big Videos and Shorts
      const bigVideosList = data.data
        .filter((item) => item.BigVideo) // Only entries with BigVideo
        .filter((item) => {
          if (uniqueBigVideos.has(item.BigVideo.id)) return false;
          uniqueBigVideos.add(item.BigVideo.id);
          return true;
        })
        .map((item) => ({
          id: item.BigVideo.id,
          img: item.BigVideo.img,
          name: item.BigVideo.name,
          desc: item.BigVideo.desc,
          dots: item.BigVideo.dots,
          source: item.BigVideo.source,
          rates: item.BigVideo.rates,
          channel: item.BigVideo.channel,
          subscribers: item.BigVideo.subscribers,
          likes: item.BigVideo.likes,
          dislikes: item.BigVideo.dislikes,
          fullDescription: item.BigVideo.fullDescription,
        }));

      const shortsList = data.data
        .filter((item) => item.ShortsVideo) // Only entries with ShortsVideo
        .filter((item) => {
          if (uniqueShorts.has(item.ShortsVideo.id)) return false;
          uniqueShorts.add(item.ShortsVideo.id);
          return true;
        })
        .map((item) => ({
          id: item.ShortsVideo.id,
          img: item.ShortsVideo.img,
          name: item.ShortsVideo.name,
          dots: item.ShortsVideo.dots,
          rates: item.ShortsVideo.rates,
        }));

      // setBigVideos(bigVideosList);
      // setShorts(shortsList);
      dispatch(setBigVideos(bigVideosList));
      dispatch(setShorts(shortsList));
    } catch (error) {
      console.error("Error fetching all videos:", error);
    }
  };

  useEffect(() => {
    fetchViewAllAssociate();
  }, []);

  // Filter Videos Based on Current Filter
  const filteredVideos =
    filter === "all"
      ? [...bigVideos, ...shorts]
      : filter === "videos"
      ? bigVideos
      : shorts;

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
