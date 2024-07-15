import React from 'react';
import './VideoPopup.css';
import Demo from "./demo.mp4";
import close from "../../images/delete.png";

const VideoPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <div className="close"><img width="40px" onClick={onClose} src={close} alt=''/></div>
        <video className='videoJokesweb' controls autoPlay>
          <source src={Demo} type="video/mp4" />
          Tu navegador no soporta la etiqueta de video.
        </video>
      </div>
    </div>
  );
};

export default VideoPopup;