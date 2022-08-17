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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ImageCrop from "./image-crop";


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
}) {
  const [image, setImage] = useState(img ? img : "");
  const [isLoader, setIsLoader] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [model, setModel] = useState(false);
  const [src, setSrc] = useState(null);
  // const [crop, setCrop] = useState({ aspect: 1 / 1 });
  // const [output, setOutput] = useState(null);
  // const [Image, setimage] = useState(null);

  // const [crop, setCrop] = useState({
  //   x: 0, y: 0
  // });
  // const [zoom, setZoom] = useState(1);
  // const [aspect, setAspect] = useState(aspectRatios[0]);
  // const [croppedAreaPixels, setcroppedAreaPixels] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // function setImage({ target: { files } }) {

  // }

  // const selectImage = (file) => {
  //   // setSrc(URL.createObjectURL(file));
  //   console.log(file, "image file")
  //   setSrc("/images/product5.png");
  //   setModel(true);
  // };

  function uploadFile({ target: { files } }) {
    if (files?.length > 0) {
      // console.log(files[0],"files[0]");
      const formData = new FormData();
      formData.append("media", files[0]);
      // console.log(formData,"formData");
      setModel(true);
      setSrc(URL.createObjectURL(files[0]));
      // uploadfile(urlLink, formData, name);
      // dialogOpen(formData);
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
    console.log(image,"image");
    axios
      .put(url, image, headers)
      .then((response) => {
        setIsLoader(false);
        setImage(response.data.data?.url);
        setUrl(names, response.data.data?.url);
      })
      .catch((error) => {
        setIsLoader(false);
        toast.error(error);
      });
  };

  useEffect(() => {
    setImage(img ? img : "");
    // console.log(src);
  }, [img]);

  const dialogClose = () => {
    setModel(false);
  };

  // const dialogOpen = () => {
  //   // setSrc(URL.createObjectURL(files[0]));
  //   setModel(true);
  // };  

  const onCancel = () => {
    setModel(false);
  }

  const setCroppedImageFor = (croppedImageUrl) => {
    setImage(croppedImageUrl);
    // const formData = new FormData();
    // formData.append("media", croppedImageUrl);

    // uploadfile(urlLink, formData, name);
    // setSrc(null);
    setModel(false);
  }

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
        <span className="mandatory-star">*</span>
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
      // onChange={(e) => { selectImage(e.target.files[0]) }}
      />

      
      {/* <div style={{ zIndex: 1 }}>
        {src ? <ImageCrop src={src} /> : null}
      </div> */}

      {/* <Dialog onClose={dialogClose} open={model} maxWidth="lg"
        fullWidth>

        <Box position="absolute" top={0} right={5}>
          <IconButton onClick={dialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent className="scroll">

          <div>
            {src && (
              <div>
                <ReactCrop src={src} onImageLoaded={setimage}
                    crop={crop} onChange={setCrop} />
                  <br />
                  <button  onClick={cropImageNow}>Crop</button>
                  <br />
                  <br />
                <Cropper image={src} zoom={zoom} crop={crop} onCropChange={onCropChange} />
              </div>
            )}
          </div>
          <div className="controls"></div>
            <div>{output && <img src={output} />}</div>

        </DialogContent>
      </Dialog> */}

      <Dialog
        onClose={dialogClose}
        open={model}
        fullWidth
        maxWidth='sm'
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: "#012169" }}>

        </DialogTitle>
        <Box style={{"color" : "white"}} position="absolute" top={0} right={0}>
          <IconButton onClick={dialogClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          {src ? <ImageCrop src={src} onCancel={onCancel} setCroppedImageFor={setCroppedImageFor}/> : null}
        </DialogContent>
        {/* <DialogActions>
                        <div
                            style={{ color: "#F54A00", fontWeight: "600", border: "2px solid #DBEAF6" }}
                            className="point-text px-5 py-2"
                            onClick={dialogClose}
                        >
                            Ok
                        </div>
                    </DialogActions> */}

      </Dialog>
    </div>
  );
}
