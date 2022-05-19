import React, { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import PDF from "../../../../../common-component/pdf-component";
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
  const [inventoryId, setInventoryId] = useState();
  const [inventory, setInventory] = useState([]);
  const [active, setActive] = useState();
  const [input, setInput] = useState({
    "count": null,
    "batch_number": null,
    "best_before_months": "",
    "manufacture_date": "",
    "expire_date": "",
    "certificate_url": "",
    "upc_code": "",
    "is_active": false
  });
  const [upc_code, setUpcCode] = useState("");
  const [batch_number, setBatchNumber] = useState(null);
  const [count, setCount] = useState(null);
  const [manufacture_date, setManufactureDate] = useState("");
  const [expire_date, setExpireDate] = useState("");
  const [is_active, setIsActive] = useState(false);
  const [certificate_url, setCertificateUrl] = useState("");
  const [is_all, setIsAll] = useState(false);

  function setTab(value, url) {
    setCertificateUrl(url);
  };

  function validateData() {
    setIsAll(false);

    if (upc_code === "" || upc_code === null || upc_code.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter upc code");
      
      return (false);
    }
    if (batch_number === "" || batch_number === null || batch_number.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter batch number");
      
      return (false);
    }
    if (count === "" || count === null || count.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter quantity");
      
      return (false);
    }
    if (manufacture_date === "" || manufacture_date === null || manufacture_date.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter manufacturing date");
      
      return (false);
    }
    if (expire_date === "" || expire_date === null || expire_date.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter expiry date");
      
      return (false);
    }
    if (certificate_url === "" || certificate_url === null || certificate_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter certificate");
      
      return (false);
    }

      return true;

  }

  const addNewInventory = () => {
    setIsEdit(true);
  };

  const AddProductQnt = () => {

    { console.log(is_active, "is_active") }
    { console.log(certificate_url, "certificate_url") }
    { console.log(convertDateStringToDate(manufacture_date), "manufacture_date") }
    if (validateData()) {
      
      let data = {
        upc_code: upc_code,
        batch_number: parseInt(batch_number),
        count: parseInt(count),
        manufacture_date: convertDateStringToDateAPI(manufacture_date),
        expire_date: convertDateStringToDateAPI(expire_date),
        best_before_months: "",
        is_active: is_active,
        certificate_url: certificate_url,
      }
      if (data.is_active === "on") {
        data.is_active = true;
      }
      { console.log(data, "data in API Add") }


      ProductApi.createInventory(id, data)
        .then((response) => {
          {console.log(data,"data inside api")}
          if (response.data.httpStatusCode === 200) {
            toast.success(response.data.message);
            
            setIsEdit(false);

            setUpcCode(null);
            setBatchNumber(null);
            setCount(null);
            setManufactureDate("");
            setExpireDate("");
            setIsActive(false);
            setCertificateUrl("");

          }
        })
        .catch((error) => {
          {console.log(error,"error")}
          toast.error(
            error?.response &&
              error?.response?.data &&
              error?.response?.data?.message
              ? error.response.data.message
              : "Unable to process your request, please try after sometime"
          );
        });



    }
  };

  function convertDateStringToDateAPI(dateStr) {
    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    let date = new Date(dateStr);
    let str =
      date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
    // new Date(dateStr).toISOString().split('T')[0];
    // date.toLocaleDateString('en-CA');
    return str;
  };

  function convertDateStringToDate(dateStr) {
    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    let date = new Date(dateStr);
    let str =
      // date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
      // new Date(dateStr).toISOString().split('T')[0];
      date.toLocaleDateString('en-CA');
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

  const ActivationButton = () => {
    let data = {
      "is_active": active ? false : true
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

  const DialogOpen = (val) => {
    setOpen(true)
    setInventoryId(val)
  }

  const activeOpen = (val, act) => {
    setActive(act ? true : false)
    setOpenDialog(true)
    setInventoryId(val)
  }

  const Delete = () => {
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

    setUpcCode(null);
    setBatchNumber(null);
    setCount(null);
    setManufactureDate("");
    setExpireDate("");
    setIsActive(false);
    setCertificateUrl("");

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
                      {convertDateStringToDateAPI(val?.manufacture_date)}
                    </div>
                    <div className="col text-center">
                      {convertDateStringToDateAPI(val?.expire_date)}
                    </div>
                    <div className="col-1 text-center">
                      {val?.is_active ? (
                        <CheckCircleOutlineOutlinedIcon className="check-icon" />
                      ) : (
                        <CancelOutlinedIcon className="cancel-icon" />
                      )}
                    </div>
                    <div className="col-1 text-center">
                      <DeleteIcon className="delete-icon" onClick={() => DialogOpen(val?.id)} />
                    </div>
                    <div className="col-1 text-end">
                      <EditOutlinedIcon
                        className="edit-icon"
                        onClick={() => {
                          activeOpen(val?.id, val?.is_active)
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
                  name="upc_code"
                  value={upc_code}
                  onChange={(e) => { setUpcCode(e.target.value) }}
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
                  name="batch_number"
                  value={batch_number}
                  onChange={(e) => { setBatchNumber(e.target.value) }}
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
                  name="count"
                  value={count}
                  onChange={(e) => { setCount(e.target.value) }}
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
                  name="manufacture_date"
                  value={convertDateStringToDate(manufacture_date)}
                  onChange={(e) => { setManufactureDate(e.target.value) }}
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
                  name="expire_date"
                  value={convertDateStringToDate(expire_date)}
                  onChange={(e) => { setExpireDate(e.target.value) }}
                />
              </div>
            </div>
            <div className="col-md-4 mt-4">
              <div className="signup-check">
                <Checkbox
                  size="small"
                  style={{ color: "#012169" }}
                  checked={is_active}
                  name="is_active"
                  onChange={(e) => { setIsActive(e.target.value) }}
                />
                <label>Active</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="">
                <PDF
                  mode="edit"
                  label={"Certificate"}
                  accept=".pdf"
                  name="certificate"
                  // img={certificate}
                  setUrl={setTab.bind()}
                  value="file-input"
                  urlName="avatar"

                // name="certificate_url"
                // id={id}
                // mode="edit"
                // tab={(e) => {setTab(value)}}
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
            Are you sure you want to {active ? " deactivate" : "activate "} this Inventory?
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
