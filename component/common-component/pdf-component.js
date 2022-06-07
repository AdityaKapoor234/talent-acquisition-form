import React, { useState, useEffect } from "react";
import ImageIcon from "@mui/icons-material/Image";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function photo({ label, accept, mode, img,name,setUrl,value,urlName}) {
  const [image, setImage] = useState(img ? img : "");
  const [isLoader, setIsLoader] = useState(false);

  function uploadFile({ target: { files } }) {
    if (files?.length > 0) {
      const formData = new FormData();
      formData.append("media", files[0]);
      uploadfile(
        `${PRODUCT_SERVICE}/manage/product/certificate/pdf`,
        formData,
        name
      );
    }
  };
  const uploadfile = (url, image,names) => {
    setIsLoader(true);
    const token = cookie.get("access_token_admin");
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(url, image, headers)
      .then((response) => {
        setIsLoader(false);
        setImage(response.data.data?.url);
        setUrl(names,response.data.data?.url)
      })
      .catch((error) => {
        setIsLoader(false);
        toast.error(error);
      });
  };
  useEffect(() => {
    setImage(img ? img : "");
  }, [img]);

  return (
    <div className="photo">
      <Backdrop
        open={isLoader}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="label">{label}<span className="mandatory-star">*</span></div>
      <div className="photo-box">
        <div className="photo-image" style={{ background: `url(${image})` }}>
          {image === "" && mode === "edit" ? (
            <>
              {/* <ImageIcon className="image-icon" /> */}
              <PictureAsPdfIcon className="image-icon" />
              <label>No file Chosen</label>
            </>
          ) : (
            <PictureAsPdfIcon className="image-icon" />
          )}
        </div>
        {mode === "edit" && (
          <label for={value} className="file">
            Choose File
          </label>
        )}
      </div>
      <input
        id={value}
        type="file"
        name={name}
        accept={accept}
        onChange={uploadFile}
      />
    </div>
  );
}
