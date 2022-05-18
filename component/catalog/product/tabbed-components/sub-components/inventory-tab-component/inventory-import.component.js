import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../../../../common-component/photo";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductApi from "../../../../../../services/product";
import { toast } from "react-toastify";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function InventoryImportComponent(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(props?.id);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [inventoryId,setInventoryId] = useState();
  const [active,setActive]=useState();
  const [input,setInput]=useState({
        "count" : null,
        "batch_number":null,
        "best_before_months" : "",
        "manufacture_date":"",
        "expire_date":"",
        "certificate_url" : "",
        "upc_code": "",
        "is_active": false
    });

  const addNewInventory = () => {
    setIsEdit(true);
  };

  const AddProductQnt = () => {
    setIsEdit(false);
  };

  const convertDateStringToDate = (dateStr) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let date = new Date(dateStr);
    let str =
      date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    return str;
  };

  const getInventoryList = (id, page) => {
    ProductApi.getInventoryList(id, page)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          setList(response.data.data?.list);
        }
      })
      .catch((error) => {
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  };

  const ActivationButton=()=>{
      let data={
        "is_active" : active?false:true
    }
    ProductApi.getInventoryUpdate(inventoryId, data)
    .then((response) => {
      if (response.data.httpStatusCode === 200) {
          toast.success(response.data.message)
          setOpenDialog(false)
          getInventoryList(id, 1);
      }
    })
    .catch((error) => {
      toast.error(
        error?.response &&
          error?.response?.data &&
          error?.response?.data?.message
          ? error.response.data.message
          : "Unable to process your request, please try after sometime"
      );
    });

  }

  const DialogOpen=(val)=>{
      setOpen(true)
      setInventoryId(val)
  }

  const activeOpen=(val,act)=>{
    setActive(act?true:false)
    setOpenDialog(true)
    setInventoryId(val)
}

  const Delete=()=>{
    ProductApi.getInventoryDelete(inventoryId, {})
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
            toast.success(response.data.message)
            setOpen(false)
            getInventoryList(id, 1);
        }
      })
      .catch((error) => {
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  }

  useEffect(() => {
    getInventoryList(id, 1);
  }, []);

  useEffect(() => {
    setId(props?.id);
  }, [props?.id]);

  return (
    <div>
      <div className="tab-heading-row">
        <div className="row justify-content-between">
          <div className="col-md-7"></div>
          {isEdit === false && (
            <div className="col-md-2 d-grid">
              <button
                className="btn btn-primary full-width btn-sm"
                onClick={() => addNewInventory()}
              >
                Add New Inventory
              </button>
            </div>
          )}
          {isEdit && (
            <>
              <div className="col-md-3 d-grid">
                <button
                  className="btn btn-primary full-width btn-sm"
                  onClick={() => AddProductQnt()}
                >
                  Add Product Quantity
                </button>
              </div>
              <div className="col-md-2 d-grid cancel">
                <button
                  className="btn btn-primary full-width btn-sm"
                  onClick={() => setIsEdit(false)}
                >
                  Back
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {isEdit === false && (
        <div data-component="CustomerComponent">
          <div className="row">
            <div className="col-md-12">
              <div className="tableRow">
                <div className="col">UPC Code</div>
                <div className="col text-center">Batch No</div>
                <div className="col  text-center">Quantity</div>
                <div className="col text-center">Mfg Date</div>
                <div className="col  text-center">Exp Date</div>
                <div className="col-1 text-center">Active</div>
                <div className="col-1 text-center">Delete</div>
                <div className="col-1 text-end">Edit</div>
              </div>
            </div>
          </div>
          <div className="row">
            {list?.map((val) => {
              return (
                <div className="col-md-12">
                  <div className="tableCell">
                    <div className="tableBody col">
                      {val?.upc_code ? val?.upc_code : "-"}
                    </div>
                    <div className="col text-center">
                      {val?.batch_number ? val?.batch_number : "-"}
                    </div>
                    <div className="col text-center">
                      {val?.batch_number ? val?.batch_number : "-"}
                    </div>
                    <div className="col text-center">
                      {convertDateStringToDate(val?.manufacture_date)}
                    </div>
                    <div className="col text-center">
                      {convertDateStringToDate(val?.expire_date)}
                    </div>
                    <div className="col-1 text-center">
                      {val?.is_active ? (
                        <CheckCircleOutlineOutlinedIcon className="check-icon" />
                      ) : (
                        <CancelOutlinedIcon className="cancel-icon" />
                      )}
                    </div>
                    <div className="col-1 text-center">
                      <DeleteIcon className="delete-icon" onClick={()=>DialogOpen(val?.id)}/>
                    </div>
                    <div className="col-1 text-end">
                      <EditOutlinedIcon
                        className="edit-icon"
                        onClick={() => {
                          activeOpen(val?.id,val?.is_active)
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isEdit && (
        <>
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="login-form ">
                <label>
                  UPC Code<span className="mandatory-star">*</span>
                </label>
                <input
                  type="number"
                  name="name"
                  //   value={this.state.input.name}
                    // onChange={handleChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="login-form ">
                <label>
                  Batch Number<span className="mandatory-star">*</span>
                </label>
                <input
                  type="number"
                  name="name"
                  //   value={this.state.input.name}
                  //   onChange={this.handleChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="login-form ">
                <label>
                  Quantity<span className="mandatory-star">*</span>
                </label>
                <input
                  type="number"
                  name="name"
                  //   value={this.state.input.name}
                  //   onChange={this.handleChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="login-form ">
                <label>
                  manufacture Date<span className="mandatory-star">*</span>
                </label>
                <input
                  type="date"
                  name="name"
                  //   value={this.state.input.name}
                  //   onChange={this.handleChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="login-form ">
                <label>
                  Expiry Date<span className="mandatory-star">*</span>
                </label>
                <input
                  type="date"
                  name="name"
                  //   value={this.state.input.name}
                  //   onChange={this.handleChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-md-4 mt-4">
              <div className="signup-check">
                <Checkbox
                  size="small"
                  style={{ color: "#012169" }}
                  //   checked={this.state.input.is_active}
                  name="is_active"
                  //   onChange={this.handleCheck.bind(this)}
                />
                <label>Active</label>
              </div>
            </div>
            <div className="col-md-4">
              <div className="">
                <Photo
                  //   mode={this.state.mode}
                  label={"Certificate "}
                  accept=".jpg,.jpeg,.png"
                  name="full_banner_img_sm"
                  //   img={this.state.input.full_banner_img_sm}
                  //   setUrl={this.handlePhotoUrl.bind(this)}
                  //   value={this.state.img_sm}
                  urlName="banner"
                />
              </div>
            </div>
          </div>
        </>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: "#012169" }}>
          Confirm the action
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography style={{ color: "#7e8f99" }}>
            Are you sure you want to delete this Inventory?
          </Typography>
        </DialogContent>
        <DialogActions style={{ marginBottom: "0.5rem" }}>
          <Button
            onClick={() => setOpen(false)}
            style={{
              color: "#012169",
              background: "white",
              borderRadius: "0px",
            }}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => Delete()}
            style={{ background: "#f54a00", borderRadius: "0px" }}
            color="secondary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle style={{ color: "#012169" }}>
          Confirm the action
        </DialogTitle>
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={() => setOpenDialog(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <DialogContent>
          <Typography style={{ color: "#7e8f99" }}>
            Are you sure you want to {active?" deactivate":"activate "} this Inventory?
          </Typography>
        </DialogContent>
        <DialogActions style={{ marginBottom: "0.5rem" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            style={{
              color: "#012169",
              background: "white",
              borderRadius: "0px",
            }}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => ActivationButton()}
            style={{ background: "#f54a00", borderRadius: "0px" }}
            color="secondary"
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
