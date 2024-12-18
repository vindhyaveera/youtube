import React, { useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./UserChannel.css";

const UserChannel = () => {
  const { channelname } = useParams(); // Extract channel name from the URL params
  const channelvideoData = useSelector((state) => state.videos.channelsVideos);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const channelVideoWrapperRef = useRef(null);

  // Filter videos by channel name
  const filteredVideos =
    channelvideoData.filter(
      (video) => video.channel === decodeURIComponent(channelname)
    ) || [];

  useEffect(() => {
    if (channelVideoWrapperRef.current) {
      const { scrollWidth, clientWidth } = channelVideoWrapperRef.current;
      setShowNext(scrollWidth > clientWidth);
    }
  }, [filteredVideos]);

  const handleScroll = (direction) => {
    if (channelVideoWrapperRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        channelVideoWrapperRef.current;
      const newScrollPosition =
        direction === "left" ? scrollLeft - 300 : scrollLeft + 300;

      channelVideoWrapperRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });

      setTimeout(() => {
        const { scrollLeft: updatedScrollLeft } =
          channelVideoWrapperRef.current;
        setShowPrev(updatedScrollLeft > 0);
        setShowNext(updatedScrollLeft < scrollWidth - clientWidth);
      }, 300);
    }
  };

  return (
    <div className="user-channel">
      <h1>Channel: {channelname}</h1>
      <div className="channel-video-wrapper">
        {showPrev && (
          <button
            className="userchannelnav-button userchannelprev-button"
            onClick={() => handleScroll("left")}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}

        <div className="channel-video-list" ref={channelVideoWrapperRef}>
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video, index) => (
              <Link
                to={`/details/${video.id}`}
                className="no-style-link"
                // key={index}
              >
                <div key={index} className="channel-video-item">
                  <img
                    src={`/assets/${video.img}`}
                    alt={video.name}
                    className="channel-video-thumbnail"
                  />

                  <div className="channel-video-info">
                    <p className="channel-video-title">{video.name}</p>
                    <p className="channel-video-channel-name">
                      Channel: {video.channel}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="no-videos-message">
              No videos found for this channel.
            </p>
          )}
        </div>

        {showNext && (
          <button
            className="userchannelnav-button userchannelnext-button"
            onClick={() => handleScroll("right")}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default UserChannel;
