import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SearchComponents.css";

const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); // Get the search query from the URL

  const bigvideoData = useSelector((state) => state.videos.originalData);
  // const bigvideoData = useSelector((state) => state.videos.userVideos);

  const [videos, setVideos] = useState([...bigvideoData]);

  const [searchTerm, setSearchTerm] = useState(query || ""); // Initialize search term with query
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);

  // Update search term when query changes
  useEffect(() => {
    setSearchTerm(query || "");
  }, [query]);

  console.log(searchTerm);

  console.log("Data stored in bigvideoData", bigvideoData);
  // Filter videos based on the search term
  const filteredVideos = videos.filter(
    (video) =>
      video.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredVideos);
  // console.log(JSON.stringify(filteredVideos));
  // console.log(bigvideoData);
  // const filteredvideosJson = JSON.stringify(filteredVideos);
  // console.log(JSON.stringify(bigvideoData));
  console.log(filteredVideos.length);

  return (
    <div>
      {/* <ScrollMenu /> */}

      <Link
        to={`/details/${video.id}`}
        // className="no-style-link-channel"
        // key={index}
      >
        <div className={`video-list  ${isMenuOpen ? "menu-open" : ""}`}>
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, index) => {
              const imagePath = `/assets/${video.img}`;
              // const videoPath = `/assets/${filteredVideos.source}`;
              return (
                <div key={index} className="video-item">
                  <div className="leftvideo">
                    <img src={imagePath} alt={video.name} />
                  </div>
                  <div
                    className={`video-content ${isMenuOpen ? "menu-open" : ""}`}
                  >
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
      </Link>
    </div>
  );
};

export default SearchComponent;
