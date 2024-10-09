const videoSlice = createSlice({
    name: "videos",
    initialState: {
      bigvideoData: [
        // Initial video data
      ],
      bigvideoData_1: [
        // Another set of video data
      ],
      shortvideoData: [
        // Short videos data
      ],
    },
    reducers: {
      // Existing reducers...
      
      // New reducer to add video data dynamically
      addVideoData: (state, action) => {
        state.bigvideoData.push(action.payload); // Add new video to the array
      },
    },
  });
  
  export const { addVideoData } = videoSlice.actions;
  export default videoSlice.reducer;
  