import React from "react";
import "./previewImageUpload.scss";

const PreviewImageUpload = ({ source }) => {
  return (
    <div className="previewImage">
      <img src={source} className="" />
    </div>
  );
};

export default PreviewImageUpload;
