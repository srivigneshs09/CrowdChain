import React from 'react';
import '../index.css';
import { demoVideo } from '../assets';

const ScrollVideo = () => {
  return (
    <div className="relative">
      <video
        id="v0"
        className="fixed top-0 left-0 w-full h-full object-cover"
        preload="auto"
        autoPlay
        loop
        muted
      >
        <source src={demoVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default ScrollVideo;
