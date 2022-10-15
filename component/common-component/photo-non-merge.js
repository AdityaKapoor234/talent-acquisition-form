import React, { useState, useEffect } from "react";
import ImageIcon from "@mui/icons-material/Image";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InfoIcon from "@mui/icons-material/Info";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

export default function photo({
  label,
  accept,
  mode,
  img,
  name,
  setUrl,
  value,
  urlLink,
  size,
  notMandatory,
}) {
  const [image, setImage] = useState(img ? img : "");
  const [isLoader, setIsLoader] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notMandatoryField, setNotMandatory] = useState(notMandatory ? notMandatory : false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  function uploadFile({ target: { files } }) {
    if (files?.length > 0) {
      const formData = new FormData();
      formData.append("media", files[0]);
      uploadfile(urlLink, formData, name);
    }
  }
  const uploadfile = (url, image, names) => {
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
        setUrl(names, response.data.data?.url);
      })
      .catch((error) => {
        setIsLoader(false);
        // toast.error(error);
        toast.error("Image should not exceed to 3 MB");
        // toast.error("File size is more than 3 MB.");
      });
  };
  useEffect(() => {
    setImage(img ? img : "");
    setNotMandatory(notMandatory ? notMandatory : false);
  }, [img, notMandatory]);

  return (
    <div className="photo">
      <Backdrop
        open={isLoader}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="label">
        {label}
        {
          notMandatoryField ?
            <></>
            :
            <span className="mandatory-star">*</span>
        }
        {size && <InfoIcon
          className="info-icon"
          aria-owns={open ? "mouse-over-popover" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
        />}

        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: "none",
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Typography sx={{ p: 1 }}>{size}</Typography>
        </Popover>
      </div>
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
