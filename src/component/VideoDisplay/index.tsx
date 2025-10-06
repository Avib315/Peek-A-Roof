import React, { useState, useRef, useEffect } from 'react';
import './style.scss';
import vid from "../../assets/videos/roofsVideo.mp4";
import fallbackImage from "../../assets/images/roofs11.jpeg"; // Add a fallback image

interface Props {
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
  posterImage?: string;
  className?: string;
}

const VideoDisplay: React.FC<Props> = ({
  autoPlay = true,
  loop = true,
  muted = true,
  showControls = false,
  posterImage,
  className = ""
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle video load
    const handleLoadedData = () => {
      setIsLoaded(true);
    };

    // Handle video error
    const handleError = () => {
      console.error('Video failed to load');
      setHasError(true);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Attempt to play video (required for some browsers)
    if (autoPlay) {
      video.play().catch((error) => {
        console.warn('Video autoplay failed:', error);
      });
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [autoPlay]);

  // If video fails to load, show fallback image
  if (hasError) {
    return (
      <div className={`video-display video-error ${className}`}>
        <img 
          src={posterImage || fallbackImage} 
          alt="Roof inspection" 
          className="video-fallback-image"
        />
      </div>
    );
  }

  return (
    <div className={`video-display ${className}`}>
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        controls={showControls}
        poster={posterImage}
        className={`video-background ${isLoaded ? 'loaded' : 'loading'}`}
        aria-label="Roof inspection video background"
      >
        <source src={vid} type="video/mp4" />
        <p>Your browser does not support the video tag.</p>
      </video>
      
      {/* Loading overlay */}
      {!isLoaded && (
        <div className="video-loading">
          <div className="spinner" />
        </div>
      )}
    </div>
  );
};

export default VideoDisplay;