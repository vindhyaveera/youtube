import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setoriginalData,
  setuserVideos,
  setuserShortsVideos,
} from "../../../features/videos/videoSlice";
import { setShortVideoData } from "../../../features/videos/videoSlice";
import { setStatus } from "../../../features/videos/videoSlice";
// import { addVideoData } from "../../../../src/features/videos/videoSlice"; // Import the action
import BigVideosInfo from "../../../Reusable/BigVideosInfo/BigVideosInfo";
import "./BigVideos.css";
import ShortsVideos from "../../HomeComponents/ShortsVideos/ShortsVideos";
import { Link } from "react-router-dom";

const BigVideos = () => {
  const videos = useSelector((state) => state.videos.originalData);
  const userVideos = useSelector((state) => state.videos.userVideos);
  const userId = useSelector((state) => state.videos.userId);
  const isMenuOpen = useSelector((state) => state.videos.menuOpen);
  const status = useSelector((state) => state.videos.status);
  const dispatch = useDispatch();

  const bigvideosRef = useRef(null);

  // / Split the first 5 items into bigvideoData
  const bigvideoData = videos.slice(0, 6);

  // Split the next 5 items into bigvideoData1
  const bigvideoData_1 = videos.slice(6);

  // useEffect(() => {
  //   viewAllUser(); // Fetch data when component mounts
  //   viewAllShorts();
  //   getuserVideos();
  //   getuserShortsVideos();
  // }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      await viewAllUser();
      await viewAllShorts();
    };
    fetchVideos();
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      const fetchUserVideos = async () => {
        await getuserVideos();
        await getuserShortsVideos();
      };
      fetchUserVideos();
    }
  }, [userId, dispatch]);

  console.log("All User Videos:", userVideos);
  console.log("Original Data from redux array", videos);
  console.log("Original array of bigvideodata", bigvideoData);
  console.log("Original array of bigvideodata1", bigvideoData_1);

  // // useEffect to listen for changes in the userId and call getuserVideos whenever it changes
  // useEffect(() => {
  //   if (userId) {
  //     getuserVideos();
  //     getuserShortsVideos();
  //     // Call the function when userId changes
  //   }
  // }, [userId,dispatch]); // Dependency array includes userId

  // // Update userId when it changes in localStorage
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const newUserId = localStorage.getItem("id");
  //     setUserId(newUserId); // Update the state when localStorage changes
  //   };

  //   // Listen for changes to localStorage
  //   window.addEventListener("storage", handleStorageChange);

  //   // Cleanup listener on component unmount
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);

  useEffect(() => {
    console.log("Updated bigvideoData:", videos);
  }, [videos]); // This will log whenever bigvideoData changes

  async function getuserVideos() {
    try {
      const response = await fetch(
        `https://youtube-sequelize-server.onrender.com/users/getuserVideos/${userId}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      // Check if the response contains the Bigvideosuser array
      const bigUserVideos = data?.data?.Bigvideosuser;
      console.log("API Response from getuserVideos:", bigUserVideos);
      if (Array.isArray(bigUserVideos)) {
        dispatch(setuserVideos(bigUserVideos)); // Set to the correct
      } else {
        console.error("Expected an array but received:", data.data);
      }
    } catch (error) {
      console.log(error.message);
      console.log(error);
      alert("Failed to get bigvideos data for user");
    }
  }

  async function getuserShortsVideos() {
    try {
      const response = await fetch(
        `https://youtube-sequelize-server.onrender.com/users/getuserShortsVideos/${userId}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      // Check if the response contains the Bigvideosuser array
      const shortsUserVideos = data?.data?.Shortvideosuser;
      console.log("API Response from getuserShortsVideos:", shortsUserVideos);
      if (Array.isArray(shortsUserVideos)) {
        dispatch(setuserShortsVideos(shortsUserVideos)); // Set to the correct
      } else {
        console.error("Expected an array but received:", data.data);
      }
    } catch (error) {
      console.log(error.message);
      console.log(error);
      alert("Failed to get shortsvideos data for user");
    }
  }

  async function viewAllUser() {
    dispatch(setStatus("Please wait")); // Set status to "Please wait"
    try {
      const response = await fetch("https://youtube-sequelize-server.onrender.com/bigvideos/viewAll", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });

      // Check if the response status is OK (200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);
      // Log the response to check its structure

      console.log(data.data);
      if (Array.isArray(data.data)) {
        console.log("Hello World");
        dispatch(setoriginalData(data.data)); // Set to the correct
        // console.log(videos);
      } else {
        console.error("Expected an array but received:", data.data);
        // dispatch(setoriginalData([data.data])); // Handle unexpected data
      }
      dispatch(setStatus(data.message)); // Update status with the response message
    } catch (error) {
      console.log(error.message);
      console.log(error);
      alert("Failed to get bigvideos data");
    }
  }

  async function viewAllShorts() {
    // alert(".../")
    dispatch(setStatus("Please wait")); // Set status to "Please wait"
    try {
      const response = await fetch(
        "https://youtube-sequelize-server.onrender.com/shortsvideos/viewAll",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("API Response:", data);
      // Log the response to check its structure

      console.log(data.data);
      if (Array.isArray(data.data)) {
        dispatch(setShortVideoData(data.data)); // Set to the correct
        // console.log(videos);
      } else {
        console.error("Expected an array but received:", data.data);
        // dispatch(setShortVideoData([data.data])); // Handle unexpected data
      }
      dispatch(setStatus(data.message)); // Update status with the response message
    } catch (error) {
      console.log(error.message);
      console.log(error);
      alert("Failed to get bigvideos data");
    }
  }

  console.log(isMenuOpen);
  bigvideoData.map((video) => {
    console.log("ID of Database", video.id);
  });
  bigvideoData_1.map((video) => {
    console.log("ID of Database1", video.id);
  });

  return (
    <div>
      {/* <div className="main-content"> */}
      <div className={`main-content  ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="bigvideogrid">
          {bigvideoData && bigvideoData.length > 0 ? (
            bigvideoData.map((video) => (
              <Link
                to={`/details/${video.id}`}
                className="no-style-link"
                // key={index}
              >
                <BigVideosInfo
                  key={video.id}
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
          {bigvideoData_1 && bigvideoData_1.length > 0 ? (
            bigvideoData_1.map((video) => (
              <Link to={`/details/${video.id}`} className="no-style-link">
                <BigVideosInfo
                  key={video.id}
                  img={video.img}
                  name={video.name}
                  desc={video.desc}
                  dots={video.dots}
                  rates={video.rates}
                  showButtons={video.showButtons}
                />
              </Link>
            ))
          ) : (
            <p>No videos available</p> // Fallback for when no videos are present
          )}
        </div>
      </div>
    </div>
  );
};

export default BigVideos;
