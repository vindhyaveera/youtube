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
    userID: null, // Initial state for userID

    // bigvideoData: [],
    originalData: [],

    // bigvideoData_1: [
    //   // Previous 6 entries...
    //   {
    //     img: assets.img7,
    //     name: "Introduction to Python Programming",
    //     desc: "A beginner's guide to coding in Python.",
    //     dots: assets.img6,
    //     rates: "2.3M views • 3 years ago",
    //     source: assets.video3,
    //     channel: "Gourmet Chef",
    //     subscribers: "3.2M subscribers",
    //     likes: "12k",
    //     dislikes: "400",
    //     fullDescription:
    //       "Cooking the perfect steak is an art that every food lover should master. In this video, we'll teach you the secrets to preparing a steak that's juicy, tender, and full of flavor. From selecting the right cut of meat to mastering the cooking technique, you'll learn everything you need to know to impress your guests with a restaurant-quality steak.",
    //   },
    //   {
    //     img: assets.img8,
    //     name: "Top 5 Productivity Hacks for Remote Workers",
    //     desc: "Boost your productivity with these simple tips.",
    //     dots: assets.img6,
    //     rates: "1.1M views • 2 years ago",
    //     source: assets.video3,
    //     channel: "Gourmet Chef",
    //     subscribers: "3.2M subscribers",
    //     likes: "12k",
    //     dislikes: "400",
    //     fullDescription:
    //       "Cooking the perfect steak is an art that every food lover should master. In this video, we'll teach you the secrets to preparing a steak that's juicy, tender, and full of flavor. From selecting the right cut of meat to mastering the cooking technique, you'll learn everything you need to know to impress your guests with a restaurant-quality steak.",
    //   },
    //   {
    //     img: assets.img9,
    //     name: "Exploring the Wonders of Space",
    //     desc: "Join us on a journey through the cosmos.",
    //     dots: assets.img6,
    //     rates: "950k views • 1 year ago",
    //     source: assets.video3,
    //     channel: "Gourmet Chef",
    //     subscribers: "3.2M subscribers",
    //     likes: "12k",
    //     dislikes: "400",
    //     fullDescription:
    //       "Cooking the perfect steak is an art that every food lover should master. In this video, we'll teach you the secrets to preparing a steak that's juicy, tender, and full of flavor. From selecting the right cut of meat to mastering the cooking technique, you'll learn everything you need to know to impress your guests with a restaurant-quality steak.",
    //   },
    //   {
    //     img: assets.img10,
    //     name: "The Ultimate Guide to Investing in Stocks",
    //     desc: "Learn how to make smart investments and grow your wealth.",
    //     dots: assets.img6,
    //     rates: "650k views • 4 years ago",
    //     source: assets.video3,
    //     channel: "Gourmet Chef",
    //     subscribers: "3.2M subscribers",
    //     likes: "12k",
    //     dislikes: "400",
    //     fullDescription:
    //       "Cooking the perfect steak is an art that every food lover should master. In this video, we'll teach you the secrets to preparing a steak that's juicy, tender, and full of flavor. From selecting the right cut of meat to mastering the cooking technique, you'll learn everything you need to know to impress your guests with a restaurant-quality steak.",
    //   },
    //   {
    //     img: assets.img11,
    //     name: "Yoga for Beginners: Easy Poses to Start",
    //     desc: "Improve flexibility and reduce stress with these beginner yoga poses.",
    //     dots: assets.img6,
    //     rates: "800k views • 2 years ago",
    //     source: assets.video3,
    //     channel: "Gourmet Chef",
    //     subscribers: "3.2M subscribers",
    //     likes: "12k",
    //     dislikes: "400",
    //     fullDescription:
    //       "Cooking the perfect steak is an art that every food lover should master. In this video, we'll teach you the secrets to preparing a steak that's juicy, tender, and full of flavor. From selecting the right cut of meat to mastering the cooking technique, you'll learn everything you need to know to impress your guests with a restaurant-quality steak.",
    //   },
    //   {
    //     img: assets.img12,
    //     name: "Top 10 Must-Read Books for Entrepreneurs",
    //     desc: "Discover the books that can inspire and guide etp journey.",
    //     dots: assets.img6,
    //     rates: "1.8M views • 5 years ago",
    //     source: assets.video3,
    //     channel: "Gourmet Chef",
    //     subscribers: "3.2M subscribers",
    //     likes: "12k",
    //     dislikes: "400",
    //     fullDescription:
    //       "Cooking the perfect steak is an art that every food lover should master. In this video, we'll teach you the secrets to preparing a steak that's juicy, tender, and full of flavor. From selecting the right cut of meat to mastering the cooking technique, you'll learn everything you need to know to impress your guests with a restaurant-quality steak.",
    //   },
    //   {
    //     img: assets.img13,
    //     name: "Learning Data Science: A Step-by-Step Approach",
    //     desc: "Master data science with practical examples and tutorials.",
    //     dots: assets.img6,
    //     rates: "1.6M views • 3 years ago",
    //     source: assets.video3,
    //     channel: "Gourmet Chef",
    //     subscribers: "3.2M subscribers",
    //     likes: "12k",
    //     dislikes: "400",
    //     fullDescription:
    //       "Cooking the perfect steak is an art that every food lover should master. In this video, we'll teach you the secrets to preparing a steak that's juicy, tender, and full of flavor. From selecting the right cut of meat to mastering the cooking technique, you'll learn everything you need to know to impress your guests with a restaurant-quality steak.",
    //   },
    //   {
    //     img: assets.img14,
    //     name: "The Rise of Electric Vehicles",
    //     desc: "How electric vehicles are shaping the future of transportation.",
    //     dots: assets.img6,
    //     rates: "1.2M views • 1 year ago",
    //     source: assets.video3,
    //     channel: "Gourmet Chef",
    //     subscribers: "3.2M subscribers",
    //     likes: "12k",
    //     dislikes: "400",
    //     fullDescription:
    //       "Cooking the perfect steak is an art that every food lover should master. In this video, we'll teach you the secrets to preparing a steak that's juicy, tender, and full of flavor. From selecting the right cut of meat to mastering the cooking technique, you'll learn everything you need to know to impress your guests with a restaurant-quality steak.",
    //   },
    //   {
    //     img: assets.img15,
    //     name: "Cooking with Spices: Flavorful Recipes to Try",
    //     desc: "Enhance your meals with these spice-filled recipes.",
    //     dots: assets.img6,
    //     rates: "400k views • 4 years ago",
    //     source: assets.video3,
    //     channel: "Gourmet Chef",
    //     subscribers: "3.2M subscribers",
    //     likes: "12k",
    //     dislikes: "400",
    //     fullDescription:
    //       "Cooking the perfect steak is an art that every food lover should master. In this video, we'll teach you the secrets to preparing a steak that's juicy, tender, and full of flavor. From selecting the right cut of meat to mastering the cooking technique, you'll learn everything you need to know to impress your guests with a restaurant-quality steak.",
    //   },
    // ],
    shortvideoData: [],

    userVideos: [],

    userShortsVideos: [],

    bigVideosIds: [],
    shortsIds: [],
    bigVideos: [],
    shorts: [],

    // shortvideoData: [
    //   {
    //     img: Img1,
    //     name: "Quick Cloud Tips - Boost Performance in 60 Seconds",
    //     dots: Img6,
    //     rates: "305k views • 4 years ago",
    //   },
    //   {
    //     img: Img2,
    //     name: "JavaScript Basics in Under a Minute",
    //     dots: Img6,
    //     rates: "1.2M views • 2 years ago",
    //   },
    //   {
    //     img: Img3,
    //     name: "CSS Tricks for Responsive Design 😀 Minute Guide",
    //     dots: Img6,
    //     rates: "850k views • 1 year ago",
    //   },
    //   {
    //     img: Img4,
    //     name: "Flexbox vs. Grid 👍 Which is Better? 60 Seconds",
    //     dots: Img6,
    //     rates: "500k views • 3 years ago",
    //   },
    //   {
    //     img: Img5,
    //     name: "SEO Tips for Fast Websites - 1 Minute Insight",
    //     dots: Img6,
    //     rates: "600k views • 5 months ago",
    //   },
    //   {
    //     img: Img7,
    //     name: "CSS Tricks for Responsive Design 😀 Minute Guide",
    //     dots: Img6,
    //     rates: "850k views • 1 year ago",
    //   },
    //   {
    //     img: Img8,
    //     name: "Flexbox vs. Grid 👍 Which is Better? 60 Seconds",
    //     dots: Img6,
    //     rates: "500k views • 3 years ago",
    //   },
    //   {
    //     img: Img9,
    //     name: "SEO Tips for Fast Websites - 1 Minute Insight",
    //     dots: Img6,
    //     rates: "600k views • 5 months ago",
    //   },
    // ],
    menuOpen: false,
    status: "",
  },

  reducers: {
    setUserID: (state, action) => {
      state.userID = action.payload; // Update userID in state
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

    // setBigVideoData1(state, action) {
    //   state.bigvideoData_1 = action.payload;
    // },

    setShortVideoData(state, action) {
      state.shortvideoData = action.payload;
    },

    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen; // Toggle menuOpen state
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
  closeMenu,
  openMenu,
  setStatus,
  setuserVideos,
  setuserShortsVideos,
  setBigVideosIds,
  setShortsIds,
  setBigVideos,
  setShorts,
  setUserID,
  // setBigVideoData1,
} = videoSlice.actions;

export default videoSlice.reducer;
