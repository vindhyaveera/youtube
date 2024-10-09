import React, { useState } from 'react';

const Example = ({ videos }) => {
  const [showMore, setShowMore] = useState(false);
  
  // Determine how many videos to show
  const videosToShow = showMore ? videos : videos.slice(0, 5);

  return (
    <div>
      <div className="video-list">
        {videosToShow.map((video, index) => (
          <div key={index} className="video-item">
            <img src={video.img} alt={video.name} />
            <div className="video-info">
              <h4>{video.name}</h4>
              <p>{video.dots}</p>
              <p>{video.rates}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Show More/Show Less Button */}
      <button onClick={() => setShowMore(!showMore)}>
        {showMore ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

// Example Usage
const videoData = [
  { img: 'video1.jpg', name: 'Video 1', dots: '...', rates: '4.5' },
  { img: 'video2.jpg', name: 'Video 2', dots: '...', rates: '4.2' },
  { img: 'video3.jpg', name: 'Video 3', dots: '...', rates: '4.8' },
  { img: 'video4.jpg', name: 'Video 4', dots: '...', rates: '4.0' },
  { img: 'video5.jpg', name: 'Video 5', dots: '...', rates: '4.3' },
  { img: 'video6.jpg', name: 'Video 6', dots: '...', rates: '4.1' },
  { img: 'video7.jpg', name: 'Video 7', dots: '...', rates: '4.7' },
];

const App = () => {
  return (
    <div>
      <h2>Short Videos</h2>
      <Example videos={videoData} />
    </div>
  );
};

export default App;
