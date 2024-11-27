import React, { useState } from 'react';

const ProfileDropdown = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    alert('Logged out!'); // Replace with actual logout functionality
  };

  return (
    <>
      <div className="profile-container">
        <img
          src="https://via.placeholder.com/50" // Replace with your profile image URL
          alt="Profile"
          onClick={toggleMenu}
          className="profile-img"
        />
        {menuOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item">Login</button>
            <button className="dropdown-item">Profile</button>
            <button className="dropdown-item">Settings</button>
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      <style>
        {`
          .profile-container {
            position: relative;
            display: inline-block;
          }

          .profile-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
          }

          .dropdown-menu {
            position: absolute;
            top: 60px;
            right: 0;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 10px;
            z-index: 1000;
          }

          .dropdown-item {
            display: block;
            width: 100%;
            padding: 8px 12px;
            background: none;
            border: none;
            text-align: left;
            cursor: pointer;
            font-size: 14px;
          }

          .dropdown-item:hover {
            background-color: #f0f0f0;
          }
        `}
      </style>
    </>
  );
};

export default ProfileDropdown;


