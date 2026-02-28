// src/components/Logo.jsx

import React from "react";
import "./Logo.css";

const Logo = ({ onClick,className }) => {
  return (
    <div className={`logo-container ${className} max-w-3 max-h-4`} onClick={onClick}>
      <div className="corner-accent top-left"></div>
      <div className="corner-accent top-right"></div>
      <div className="corner-accent bottom-left"></div>
      <div className="corner-accent bottom-right"></div>

      <div className="brand-name">
        <div className="main-text">VELVET BOX</div>
      </div>

      <div className="separator"></div>

      <div className="subtitle">Luxury Redefined</div>
    </div>
  );
};

export default Logo;
