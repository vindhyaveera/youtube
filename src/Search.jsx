import React, { useState } from "react";
import { useSelector } from "react-redux";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const bigvideoData = useSelector((state) => state.videos.bigvideoData);

  // const [items] = useState([
  //   "Apple",
  //   "Banana",
  //   "Orange",
  //   "Mango",
  //   "Grapes",
  //   "Watermelon",
  // ]);

  // Filter videos based on the search term
  const filteredVideos = bigvideoData.filter(
    (video) =>
      video.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const filteredItems = items.filter((item) =>
  //   item.toLowerCase().includes(searchTerm.toLowerCase())
  // );


  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", marginBottom: "20px", width: "100%" }}

        // onChange={handleSearchChange}
      />
      {/* <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>No matching items found</li>
        )}
      </ul> */}
      
      <div className="video-list">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video, index) => (
            <div key={index} className="video-item">
              <img src={video.img} alt={video.name} />
              <h3>{video.name}</h3>
              <p>{video.desc}</p>
              <p>{video.rates}</p>
              <p>Channel: {video.channel}</p>
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
