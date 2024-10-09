import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addVideoData } from "../features/videos/videoSlice"; // Import the action

const VideoForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    img: "",
    name: "",
    desc: "",
    dots: "",
    source: "",
    rates: "",
    showButtons: false,
    channel: "",
    subscribers: "",
    likes: "",
    dislikes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addVideoData(formData)); // Dispatch action to add the video
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="img" placeholder="Image URL" value={formData.img} onChange={handleChange} />
      <input type="text" name="name" placeholder="Video Name" value={formData.name} onChange={handleChange} />
      <input type="text" name="desc" placeholder="Description" value={formData.desc} onChange={handleChange} />
      <input type="text" name="dots" placeholder="Dots" value={formData.dots} onChange={handleChange} />
      <input type="text" name="source" placeholder="Source" value={formData.source} onChange={handleChange} />
      <input type="text" name="rates" placeholder="Rates" value={formData.rates} onChange={handleChange} />
      <input type="text" name="channel" placeholder="Channel" value={formData.channel} onChange={handleChange} />
      <input type="text" name="subscribers" placeholder="Subscribers" value={formData.subscribers} onChange={handleChange} />
      <input type="text" name="likes" placeholder="Likes" value={formData.likes} onChange={handleChange} />
      <input type="text" name="dislikes" placeholder="Dislikes" value={formData.dislikes} onChange={handleChange} />
      <label>
        Show Buttons
        <input type="checkbox" name="showButtons" checked={formData.showButtons} onChange={() => setFormData({ ...formData, showButtons: !formData.showButtons })} />
      </label>
      <button type="submit">Add Video</button>
    </form>
  );
};

export default VideoForm;
