import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../../Layouts/Header/Header";
import Sidebar from "../../../Layouts/Sidebar/Sidebar";
import ScrollMenu from "../../../Layouts/ScrollMenu/ScrollMenu";
import "./SearchComponents.css";

const SearchComponent = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query"); // Get the search query from the URL

  const [searchTerm, setSearchTerm] = useState(query || ""); // Initialize search term with query
  const bigvideoData = useSelector((state) => state.videos.bigvideoData);
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);


  // Update search term when query changes
  useEffect(() => {
    setSearchTerm(query || "");
  }, [query]);

  console.log(searchTerm);

  // Filter videos based on the search term
  const filteredVideos = bigvideoData.filter(
    (video) =>
      video.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <Sidebar />
      <ScrollMenu />

      <div className={`video-list  ${isMenuOpen ? "menu-open" : ""}`}>
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div key={index} className="video-item">
              <img src={video.img} alt={video.name} />
              <div className={`video-content ${isMenuOpen ? "menu-open" : ""}`}>
                <h3>{video.name}</h3>
                <p>{video.desc}</p>
                <p>{video.rates}</p>
                <p>Channel: {video.channel}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
