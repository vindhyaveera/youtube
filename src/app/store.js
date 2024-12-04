// src/app/store.js
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import videoReducer from "../features/videos/videoSlice";

// Persist configuration for videos slice
const persistConfig = {
  key: "videos",
  storage,
  stateReconciler: autoMergeLevel2,
};

// Wrap the videoReducer with persistReducer
const persistedVideoReducer = persistReducer(persistConfig, videoReducer);

// Create the store
export const store = configureStore({
  reducer: {
    videos: persistedVideoReducer,
  },
});


// Create a persistor instance
export const persistor = persistStore(store);


// import { configureStore } from "@reduxjs/toolkit";
// import videoReducer from "../features/videos/videoSlice";

// // Create the store without Redux Persist
// export const store = configureStore({
//   reducer: {
//     videos: videoReducer,
//   },
// });
