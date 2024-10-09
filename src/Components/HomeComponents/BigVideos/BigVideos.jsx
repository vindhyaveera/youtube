import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setBigVideoData } from "../../../features/videos/videoSlice";
import { setStatus } from "../../../features/videos/videoSlice";
// import { addVideoData } from "../../../../src/features/videos/videoSlice"; // Import the action

import BigVideosInfo from "../../../Reusable/BigVideosInfo/BigVideosInfo";
import Header from "../../../Layouts/Header/Header";
import Sidebar from "../../../Layouts/Sidebar/Sidebar";
import ScrollMenu from "../../../Layouts/ScrollMenu/ScrollMenu";
import "./BigVideos.css";
import ShortsVideos from "../../HomeComponents/ShortsVideos/ShortsVideos";
import { Link } from "react-router-dom";

const BigVideos = () => {
  const bigvideoData = useSelector((state) => state.videos.bigvideoData);
  const bigvideoData_1 = useSelector((state) => state.videos.bigvideoData_1);
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const status = useSelector((state) => state.videos.status);
  const dispatch = useDispatch();
  
  
  const bigvideosRef = useRef(null);

  useEffect(() => {
    viewAllUser(); // Fetch data when component mounts
  }, []);

  useEffect(() => {
    console.log("Updated bigvideoData:", bigvideoData);
  }, [bigvideoData]); // This will log whenever bigvideoData changes

  async function viewAllUser() {
    // alert(".../")
    dispatch(setStatus("Please wait")); // Set status to "Please wait"
    try {
      const response = await fetch("http://localhost:4000/bigvideos/viewAll", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log("API Response:", data);
      // Log the response to check its structure

      console.log(data.data);
      if (Array.isArray(data.data)) {
        dispatch(setBigVideoData(data.data)); // Set to the correct
        console.log(bigvideoData);
      } else {
        console.error("Expected an array but received:", data.data);
        dispatch(setBigVideoData([data.data])); // Handle unexpected data
      }
      dispatch(setStatus(data.message)); // Update status with the response message
    } catch (error) {
      console.log(error.message);
      console.log(error);
      alert("Failed to get bigvideos data");
    }
  }

  console.log(isMenuOpen);

  return (
    <div>
      <Header />
      {!isMenuOpen && <Sidebar />}
      <ScrollMenu />
      {/* <div className="main-content"> */}
      <div className={`main-content  ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="bigvideogrid">
          {Array.isArray(bigvideoData) && bigvideoData.length > 0 ? (
            bigvideoData.map((video, index) => (
              <Link
                to={`/details/${index}`}
                className="no-style-link"
                key={index}
              >
                <BigVideosInfo
                  key={index}
                  img={video.img}
                  name={video.name}
                  desc={video.desc}
                  dots={video.dots}
                  rates={video.rates}
                  source={video.source}
                  showButtons={video.showButtons}
                />
              </Link>
            ))
          ) : (
            <p>No videos available.</p>
          )}
        </div>
        <ShortsVideos bigvideosRef={bigvideosRef} />
        <div ref={bigvideosRef} className="bigvideogrid bigvideodata2">
          {bigvideoData_1.map((video, index) => (
            <BigVideosInfo
              key={index}
              img={video.img}
              name={video.name}
              desc={video.desc}
              dots={video.dots}
              rates={video.rates}
              showButtons={video.showButtons}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BigVideos;
