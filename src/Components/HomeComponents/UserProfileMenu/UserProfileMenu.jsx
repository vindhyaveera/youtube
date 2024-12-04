import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu, toggleLogin } from "../../../features/videos/videoSlice";

import { logout } from "../../../features/videos/videoSlice"; // Import the logout action

import "./UserProfileMenu.css";
import Profile_img from "../../../assets/channels4_profile.jpg";
import Profile_img1 from "../../../assets/profile img1.svg";
import Profile_img2 from "../../../assets/profile img2.svg";
import Profile_img3 from "../../../assets/profile img3.svg";
import Profile_img4 from "../../../assets/profile img4.svg";

const UserProfileMenu = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.videos.userName);
  const isLoggedIn = useSelector((store) => store.videos.isLoggedIn);

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(toggleLogin());

    console.log("User signed out");
  };

  console.log("This is my userprofilemenu");
  return (
    <div>
      <div className="user-profile-menu">
        <div className="user-profile">
          <div className="user-profile-header">
            <img
              src={Profile_img}
              alt={`${username}'s profile`}
              className="user-profile-image"
            />
            <h2 className="user-profile-username">{`${username}'s profile`}</h2>
          </div>
          <hr />
          <div className="user-profile-content-head">
            <div className="user-profile-content">
              <img
                src={Profile_img4}
                alt={`${username}'s profile`}
                className="user-profile-content-img"
              />
              <h3 className="user-profile-content-name">Google Account</h3>
            </div>
            <div className="user-profile-content">
              <img
                src={Profile_img2}
                alt={`${username}'s profile`}
                className="user-profile-content-img"
              />
              <h3 className="user-profile-content-name">Switch Account</h3>
            </div>
            <div className="user-profile-content" onClick={handleSignOut}>
              <img
                src={Profile_img3}
                alt={`${username}'s profile`}
                // onClick={handleSignOut} // Add click handler
                className="user-profile-content-img"
              />
              <h3 className="user-profile-content-name">Sign out</h3>
            </div>
          </div>
          <hr />
          <div className="user-setting">
            <img
              src={Profile_img1}
              alt={`${username}'s profile`}
              className="user-profile-content-img"
            />
            <h3 className="user-profile-content-name">Settings</h3>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default UserProfileMenu;
