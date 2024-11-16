import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setStatus } from "../../features/videos/videoSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { setBigVideosIds } from "../../features/videos/videoSlice";
import { setShortsIds } from "../../features/videos/videoSlice";

import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const status = useSelector((state) => state.videos.status);

  const handleWatchLaterClick = async function viewAllVideos() {
    // alert(".../")
    dispatch(setStatus("Please wait")); // Set status to "Please wait"
    try {
      const response = await fetch("http://localhost:4000/watchlater/viewAll", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log("API Response for watchlater:", data);
      // Log the response to check its structure

      if (data && Array.isArray(data.data)) {
        // Extract unique bigVideosIds and shortVideosIds
        const bigvideosIds = [
          ...new Set(
            data.data
              .filter((item) => item.bigVideosId !== null) // Filter where bigVideosId is not null
              .map((item) => item.bigVideosId) // Extract bigVideosId
          ),
        ];
        const shortsIds = [
          ...new Set(
            data.data
              .filter((item) => item.shortVideosId !== null) // Filter where shortVideosId is not null
              .map((item) => item.shortVideosId) // Extract shortVideosId
          ),
        ];

        // Dispatch the IDs to Redux
        dispatch(setBigVideosIds(bigvideosIds));
        dispatch(setShortsIds(shortsIds));

        console.log("BigVideos IDs:", bigvideosIds);
        console.log("Shorts IDs:", shortsIds);
      } else {
        console.error("Expected an array but received:", data.data);
      }
      console.log(data.data);
      // if (Array.isArray(data.data)) {
      //   dispatch(setoriginalData(data.data)); // Set to the correct
      //   console.log(videos);
      // } else {
      //   console.error("Expected an array but received:", data.data);
      //   dispatch(setoriginalData([data.data])); // Handle unexpected data
      // }
      dispatch(setStatus(data.message)); // Update status with the response message
      navigate("/watchlater");
    } catch (error) {
      console.log(error.message);
      console.log(error);
      alert("Failed to get bigvideos data");
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="navbarchild">
          <div
            className="row"
            onClick={() => {
              navigate("/");
              // alert("Watchlater is working");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <g>
                <path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"></path>
              </g>
            </svg>
            <p>Home</p>
          </div>
          <div className="row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              ria-hidden="true"
            >
              <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path>
            </svg>
            <p>Shorts</p>
          </div>
          <div className="row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path>
            </svg>
            <p>Subscriptions</p>
          </div>
          <div className="bottomline">
            <hr className="custom-hr" />
          </div>
          <div
            className="row"
            onClick={() => {
              handleWatchLaterClick();
              // navigate("/watchlater");
              // alert("Watchlater is working");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M10 18v-6l5 3-5 3zm7-15H7v1h10V3zm3 3H4v1h16V6zm2 3H2v12h20V9zM3 10h18v10H3V10z"></path>
            </svg>
            <p>Watch Later</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
