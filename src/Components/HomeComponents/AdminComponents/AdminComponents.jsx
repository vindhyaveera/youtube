// PopupForm.jsx
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { setStatus } from "../../../features/videos/videoSlice";

import { addVideoData } from "../../../../src/features/videos/videoSlice"; // Import the action
import dotsSvg from "../../../assets/dots.svg";
import "./AdminComponents.css"; // Create this CSS file for styling the popup

const AdminComponents = ({ isVisible, onClose }) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("id");

  const status = useSelector((state) => state.videos.status);

  const [formData, setFormData] = useState(() => {
    console.log(userId);

    // userid: localStorage.getItem("id"),
    return {
      userid: userId, // Fallback if userId is null
      img: "",
      name: "",
      desc: "",
      dots: dotsSvg,
      source: "",
      rates: "",
      showButtons: false,
      channel: "",
      subscribers: "",
      likes: "",
      dislikes: "",
      fullDescription: "",
    };
  });

  // Create refs for the file inputs
  const imgInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value; // Handle checkbox differently
    setFormData({
      ...formData,
      [name]: newValue,
      // userid: localStorage.getItem("id"), // Keep the userid the same
      // userid:userid
    }); // Update form data
    console.log(formData);
  };

  const handleFileUpload = (e, fieldName) => {
    const file = e.target.files[0];
    // Create the path based on the file name

    if (file) {
      // const fileUrl = URL.createObjectURL(file);
      // const serverFilePath = `https://youtube-seven-livid.vercel.app/src/assets/${file.name}`;

      setFormData({
        ...formData,
        [fieldName]: file.name,
      });
      console.log(file);
      console.log(file.name);
      
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    //This is for database storage
    createUser(formData);

    //This is for redux global storage
    // dispatch(addVideoData(formData)); // Dispatch action to add the video

    // Close the popup after submission
    handleClose();
  };


  async function createUser(formData) {
    // alert(".../")
    dispatch(setStatus("Please wait")); // Set initial status
    try {
      const response = await fetch(
        "http://localhost:4000/bigvideos/createbigvideos",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log(data);
      dispatch(setStatus(data.message)); // Update status with the response message
    } catch (error) {
      console.log(error.message);
      console.log(error);
      alert("Failed to store bigvideos data");
    }
  }

  const handleClose = () => {
    setFormData({
      userid: userId,
      img: "",
      name: "",
      desc: "",
      dots: dotsSvg,
      source: "",
      rates: "",
      showButtons: false,
      channel: "",
      subscribers: "",
      likes: "",
      dislikes: "",
      fullDescription: "",
    });

    // Optional: Clear refs if needed
    imgInputRef.current.value = null; // Clear file input
    videoInputRef.current.value = null; // Clear file input

    // onClose(); // Call the onClose prop to close the popup
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Admin Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Image Upload:
            <input
              type="file"
              accept="image/*"
              style={{ display: "block" }}
              id="imgUpload"
              ref={imgInputRef}
              onChange={(e) => handleFileUpload(e, "img")}
              required
            />
            {/* <button
              type="button"
              onClick={() => document.getElementById("imgUpload").click()}
              required
            >
              Upload Image
            </button> */}
            <button
              type="button"
              onClick={() => imgInputRef.current.click()}
              required
            >
              Upload Image
            </button>
            {formData.img && (
              <img
                src={formData.img}
                alt="Preview"
                style={{ maxWidth: "100px", marginTop: "10px" }}
              />
            )}
          </label>
          <br />
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          {/* <label>
            Dots Image URL:
            <input type="text" name="dots" />
          </label>
          <br /> */}
          <label>
            Video Upload:
            <input
              type="file"
              accept="video/*"
              style={{ display: "block" }}
              id="videoUpload"
              ref={videoInputRef}
              onChange={(e) => handleFileUpload(e, "source")}
              required
            />
            {/* <button
              type="button"
              onClick={() => document.getElementById("videoUpload").click()}
            >
              Upload Video
            </button> */}
            <button
              type="button"
              onClick={() => videoInputRef.current.click()}
              required
            >
              Upload Video
            </button>
            {formData.source && (
              <video
                width="220"
                height="140"
                controls
                style={{ marginTop: "10px" }}
              >
                <source src={formData.source} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </label>
          <br />
          <label>
            Rates:
            <input
              type="text"
              name="rates"
              value={formData.rates}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Show Buttons:
            <div className="checkinput">
              <input
                type="checkbox"
                name="showButtons"
                className="check"
                checked={formData.showButtons}
                onChange={handleChange} // Update state on change

                // onChange={(e) =>
                //   // setFormData({ ...formData, showButtons: e.target.checked })
                // }
              />
            </div>
          </label>

          <label>
            Channel:
            <input
              type="text"
              name="channel"
              value={formData.channel}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Subscribers:
            <input
              type="text"
              name="subscribers"
              value={formData.subscribers}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Likes:
            <input
              type="text"
              name="likes"
              value={formData.likes}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Dislikes:
            <input
              type="text"
              name="dislikes"
              value={formData.dislikes}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Full Description:
            <textarea
              name="fullDescription"
              value={formData.fullDescription}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <h1>{status}</h1>
          <button type="submit">Add Data</button>
        </form>
      </div>
    </div>
  );
};

export default AdminComponents;
