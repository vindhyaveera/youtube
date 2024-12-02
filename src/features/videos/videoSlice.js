// src/features/videos/videoSlice.js
// import img1 from '../../assets/'
import { createSlice } from "@reduxjs/toolkit";
import dotsSvg from "../../assets/dots.svg";
// import Img1 from "../../assets/img1.webp"
import Img1 from "../../assets/oar2.jpg";
import Img2 from "../../assets/oardefault 1.jpg";
import Img3 from "../../assets/oardefault 2.jpg";
import Img4 from "../../assets/oardefault.jpg";
import Img5 from "../../assets/oardefault3.jpg";
import Img6 from "../../assets/dots.svg";
import Img7 from "../../assets/oarimg.jpg";
import Img8 from "../../assets/oarimg2.jpg";
import Img9 from "../../assets/oardefaultimg.jpg";

// Define asset paths
const assets = {
  img1: require("../../assets/img1.webp"),
  img2: require("../../assets/img2.webp"),
  img3: require("../../assets/img3.webp"),
  img4: require("../../assets/img5.jpg"),
  img5: require("../../assets/img6.webp"),
  img6: dotsSvg,
  img7: require("../../assets/bigimg1.jpg"),
  img8: require("../../assets/bigimg2.jpg"),
  img9: require("../../assets/bigimg3.jpg"),
  img10: require("../../assets/bigimg4.jpg"),
  img11: require("../../assets/bigimg5.jpg"),
  img12: require("../../assets/bigimg6.jpg"),
  img13: require("../../assets/bigimg7.jpg"),
  img14: require("../../assets/bigimg8.jpg"),
  img15: require("../../assets/bigimg9.jpg"),
  video1: require("../../assets/video1.mp4"),
  video2: require("../../assets/video2.mp4"),
  video3: require("../../assets/video3.mp4"),
};

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    shortvideoData: [],
    userVideos: [],
    userShortsVideos: [],
    bigVideosIds: [],
    shortsIds: [],
    bigVideos: [],
    shorts: [],
    originalData: [],

    userId: null, // Ensure `userId` is initialized to null
    token: null, // Ensure `token` is initialized to null

    menuOpen: false,
    // signIn: false,
    profileOpen: false,

    status: "",
    userName: "", // Replace with actual username
  },

  reducers: {
    
    setUserId(state, action) {
      state.userId = action.payload;
    },

    setToken(state, action) {
      state.token = action.payload;
    },

    logout(state) {
      state.userId = null;
      state.token = null;
    },

     // Define other reducers as needed
     setuserName(state, action) {
      state.userName = action.payload; // Set new user data
    }, 

    setoriginalData(state, action) {
      state.originalData = action.payload;
    },
    // New reducer to add video data dynamically
    addVideoData: (state, action) => {
      state.originalData.push(action.payload);
    },
    

    setuserVideos(state, action) {
      state.userVideos = action.payload;
    },

    setuserShortsVideos(state, action) {
      state.userShortsVideos = action.payload;
    },

   

    setShortVideoData(state, action) {
      state.shortvideoData = action.payload;
    },

    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen; // Toggle menuOpen state
    },

    

    // toggleSignIn(state) {
    //   state.signIn = !state.signIn;
    // },

    // toggleLogin (state)  {
    //   state.isLoggedIn = !state.isLoggedIn; // Toggle login state
    // },

    profileopen: (state) => {
      state.profileOpen = !state.profileOpen; 
    },

    closeMenu: (state) => {
      state.menuOpen = false; // Close menu
    },

    openMenu: (state) => {
      state.menuOpen = true; // Open menu
    },

    setStatus(state, action) {
      state.status = action.payload; // Update status based on action payload
    },
    // Add reducers for bigVideosIds and shortsIds
    setBigVideosIds(state, action) {
      state.bigVideosIds = action.payload;
    },

    setShortsIds(state, action) {
      state.shortsIds = action.payload;
    },
    setBigVideos(state, action) {
      state.bigVideos = action.payload;
    },
    setShorts(state, action) {
      state.shorts = action.payload;
    },
  },
});

// export const selectCombinedVideoData = (state) => {
//   const combined = [
//     ...state.videos.bigvideoData,
//     ...state.videos.bigvideoData_1,
//   ];
//   console.log("Combined video data:", combined);
//   return combined;
// };

// // Selector to combine both bigvideoData and bigvideoData_1
// export const selectCombinedVideoData = (state) => [
//   ...state.videos.bigvideoData,
//   ...state.videos.bigvideoData_1,
// ];

export const {
  setoriginalData,
  setShortVideoData,
  addVideoData,
  toggleMenu,
  // toggleLogin,
  closeMenu,
  profileopen,
  openMenu,
  setStatus,
  setuserVideos,
  setuserShortsVideos,
  setBigVideosIds,
  setShortsIds,
  setBigVideos,
  setShorts,
  setUserId,
  setToken,
  logout,
  setuserName,
  setprofileOpen,
  // toggleSignIn,
} = videoSlice.actions;

export default videoSlice.reducer;
