import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setuserName } from "../../features/videos/videoSlice";

const Sidebar = () => {
  const navigate = useNavigate(); // To programmatically navigate to the search results
  const userid = useSelector((store) => store.videos.userId);
  // const userid = null;
  const token = useSelector((store) => store.videos.token);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.videos.userName);
  // const [showLoginMessage, setShowLoginMessage] = useState(false);

  useEffect(() => {
    if (userid) {
      getuser();
    }
  }, [userid]); // Dependency array includes userId

  
  const handleHomeRedirect = () => {
    navigate("/"); // Replace "/home" with your actual home page route
  };

  const handleNavigateToProfile = () => {
    // if (userid) {
      // Navigate to the profile page based on the userid
      navigate(`/profile/${userid}`);
    // }
  };

  async function getuser() {
    try {
      const response = await fetch(
        `http://localhost:4000/users/viewOne/${userid}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      // Check if the response contains the Bigvideosuser array
      // const bigUserVideos = data?.data?.Bigvideosuser;
      console.log("API Response from getuser:", data);
      if (data?.data?.firstName) {
        dispatch(setuserName(data.data.firstName));
        // console.log("User:", user);
      } else {
        console.error("Expected an array but received:", data.data);
      }
    } catch (error) {
      console.log(error.message);
      console.log(error);
      alert("Failed to get  data for user");
    }
  }

  return (
    <div>
      <div className="sidebar">
        <div className="sidebarchild">
          <div className="inner home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
              onClick={handleHomeRedirect}

            >
              <g>
                <path d="M4 21V10.08l8-6.96 8 6.96V21h-6v-6h-4v6H4z"></path>
              </g>
            </svg>
            <p>Home</p>
          </div>

          <div className="inner shorts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              ria-hidden="true"
              onClick={handleHomeRedirect}
            >
              <path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.33-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25zm-.23 5.86-8.5 4.5c-1.34.71-3.01.2-3.72-1.14-.71-1.34-.2-3.01 1.14-3.72l2.04-1.08v-1.21l-.69-.28-1.11-.46c-.99-.41-1.65-1.35-1.7-2.41-.05-1.06.52-2.06 1.46-2.56l8.5-4.5c1.34-.71 3.01-.2 3.72 1.14.71 1.34.2 3.01-1.14 3.72L15.5 9.26v1.21l1.8.74c.99.41 1.65 1.35 1.7 2.41.05 1.06-.52 2.06-1.46 2.56z"></path>
            </svg>
            <p>Shorts</p>
          </div>

          <div className="inner Subscriptions">
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
            <p>Subcriptions</p>
          </div>

          <div className="inner You">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
              onClick={handleNavigateToProfile}
            >
              <path d="m11 7 6 3.5-6 3.5V7zm7 13H4V6H3v15h15v-1zm3-2H6V3h15v15zM7 17h13V4H7v13z"></path>
            </svg>
            <p>You</p>
          </div>

          <div className="inner downloads">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"></path>
            </svg>
            <p>Downloads</p>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Sidebar;
