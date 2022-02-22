import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";

export default function photo({ label, accept, mode }) {
  const [image, setImage] = useState("");

  const uploadFile = ({ target: { files } }) => {
    if (files?.length > 0) {
      setImage("/images/login.png");
    }
  };
  return (
    <div className="photo">
      <div className="label">{label}</div>
      <div className="photo-box">
        <div className="photo-image" style={{ background: `url(${image})` }}>
          {image === "" && mode === "edit" ? (
            <>
              <ImageIcon className="image-icon" />
              <label>No file Chosen</label>
            </>
          ) : (
            ""
          )}
        </div>
        {mode === "edit" && (
          <label for="file-input" className="file">
            Choose File
          </label>
        )}
      </div>
      <input
        id="file-input"
        type="file"
        accept={accept}
        onChange={uploadFile}
      />
    </div>
  );
}
