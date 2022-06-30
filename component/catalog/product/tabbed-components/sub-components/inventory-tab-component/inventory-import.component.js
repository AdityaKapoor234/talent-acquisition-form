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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Pagination from "@mui/material/Pagination";
import ProductInfoApi from "../../../../../../services/product-info";
import CustomerApi from "../../../../../../services/customer";

export default function InventoryImportComponent(props) {
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(props?.id);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [inventoryId, setInventoryId] = useState();
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState([]);

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  

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
    "is_active": false,
    "country": "select",
    "warehouse": "",
  });
  const [upc_code, setUpcCode] = useState("");
  const [batch_number, setBatchNumber] = useState(null);
  const [count, setCount] = useState(null);
  const [manufacture_date, setManufactureDate] = useState("");
  const [expire_date, setExpireDate] = useState("");
  const [is_active, setIsActive] = useState(false);
  const [certificate_url, setCertificateUrl] = useState("");
  const [country, setCountry] = useState("select");
  const [warehouse, setWarehouse] = useState("select");
  const [is_all, setIsAll] = useState(false);
  const [is_upc_code, setIsUpcCode] = useState(false);
  const [is_batch_number, setIsBatchNumber] = useState(false);
  const [is_count, setIsCount] = useState(false);
  const [is_manufacture_date, setIsManufactureDate] = useState(false);
  const [is_expire_date, setIsExpireDate] = useState(false);
  const [is_certificate_url, setIsCertificateUrl] = useState(false);
  const [is_warehouse_location, setIsWarehouseLocation] = useState(false);
  const [is_country, setIsCountry] = useState(false);


  function setTab(value, url) {
    setCertificateUrl(url);
  };

  function validateData() {
    let isValid = true;
    setIsUpcCode(false);
    setIsBatchNumber(false);
    setIsCount(false);
    setIsManufactureDate(false);
    setIsExpireDate(false);
    setIsCertificateUrl(false);
    setIsWarehouseLocation(false);
    setIsCountry(false);
    // setIsActive(false);

    if (upc_code === "" || upc_code === null || upc_code.replace(/\s/g, "").length <= 0) {
      // toast.error("Please enter upc code");
      setIsUpcCode(true);
      isValid = false;
    }
    if (batch_number === "" || batch_number === null || batch_number.replace(/\s/g, "").length <= 0) {
      // toast.error("Please enter batch number");
      setIsBatchNumber(true);
      isValid = false;
    }
    if (count === "" || count === null || count.replace(/\s/g, "").length <= 0) {
      // toast.error("Please enter quantity");
      setIsCount(true);
      isValid = false;
    }
    if (manufacture_date === "" || manufacture_date === null || manufacture_date.replace(/\s/g, "").length <= 0) {
      // toast.error("Please enter manufacturing date");
      setIsManufactureDate(true);
      isValid = false;
    }
    if (expire_date === "" || expire_date === null || expire_date.replace(/\s/g, "").length <= 0) {
      // toast.error("Please enter expiry date");
      setIsExpireDate(true);
      isValid = false;
    }
    if (certificate_url === "" || certificate_url === null || certificate_url.replace(/\s/g, "").length <= 0) {
      // toast.error("Please enter certific ate");
      setIsCertificateUrl(true);
      isValid = false;
    }
    if (warehouse === "" || warehouse === null || warehouse.replace(/\s/g, "").length <= 0) {
      // toast.error("Please enter upc code");
      setIsWarehouseLocation(true);
      isValid = false;
    }
    if (country === "select" || country === null || country.replace(/\s/g, "").length <= 0) {
      // toast.error("Please enter upc code");
      setIsCountry(true);
      isValid = false;
    }


    return isValid;

  }

  const addNewInventory = () => {
    setIsEdit(true);
  };

  const AddProductQnt = () => {
    if (validateData()) {

      let data = {
        upc_code: upc_code,
        batch_number: batch_number,
        count: parseInt(count),
        manufacture_date: convertDateStringToDateAPI(manufacture_date),
        expire_date: convertDateStringToDateAPI(expire_date),
        best_before_months: "",
        is_active: is_active,
        certificate_url: certificate_url,
        country_id: parseInt(country),
        warehouse_location_state_id: parseInt(warehouse),
      }
      if (data.is_active === "on") {
        data.is_active = true;
      }


      ProductApi.createInventory(id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            toast.success(response.data.message);

            // window.location.reload(false);
            setIsEdit(false);
            getInventoryList(id, 1);

            setUpcCode(null);
            setBatchNumber(null);
            setCount(null);
            setManufactureDate("");
            setExpireDate("");
            setIsActive(false);
            setCertificateUrl("");
            setCountry("select");
            setWarehouse("select");
          

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
          setTotal(response.data.data);
          setTotalPage(Math.ceil(response.data.data.total / response.data.data.page_size));
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

  const getCountry = () => {
    ProductInfoApi.country()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          setCountryList(response.data.data?.list);
        }
      })
      .catch((error) => {
      });
  }

  const getState = () => {
    // AddressService.getState()
    CustomerApi.getState()
      .then((response) => {
        if (response?.data?.httpStatusCode === 200) {
          setStateList(response?.data.data?.list);
        }
      })
      .catch((error) => {
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime.",
          {
            autoClose: 5000,
          }
        );
      });
  };


  const countryChange = (event) => {
    setCountry(event.target.value);
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

  let onPageChange = function (e, page) {
    setCurrentPage(page)
    getInventoryList(id, page);
  };

  useEffect(() => {
    getInventoryList(id, 1);
    getCountry();
    getState();
  }, []);

  useEffect(() => {
    setId(props?.id);
    setCurrentPage(1);

    setUpcCode(null);
    setBatchNumber(null);
    setCount(null);
    setManufactureDate("");
    setExpireDate("");
    setIsActive(false);
    setCertificateUrl("");
    setCountry("select");
    setWarehouse("select");


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
                <div className="col text-center">Warehouse</div>
                <div className="col text-center">Country</div>
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
            {
              list?.length > 0 ?
                list?.map((val) => {
                  return (
                    <div className="col-md-12">
                      <div className="tableCell">
                        <div className="tableBody col ps-2 elip-text" title={val?.upc_code ? val?.upc_code : "-"}>
                          {val?.upc_code ? val?.upc_code : "-"}
                        </div>
                        <div className="col text-center px-2 elip-text" title={val?.batch_number ? val?.batch_number : "-"}>
                          {val?.batch_number ? val?.batch_number : "-"}
                        </div>
                        <div className="col text-center px-2 elip-text" title={val?.warehouse_location_state_id?.name ? val?.warehouse_location_state_id?.name : "-"}>
                          {val?.warehouse_location_state_id?.name ? val?.warehouse_location_state_id?.name : "-"}
                        </div>
                        <div className="col text-center px-2 elip-text" title={val?.country ? val?.country : "-"}>
                          {val?.country ? val?.country : "-"}
                        </div>
                        <div className="col text-center px-2 elip-text" title={val?.count ? val?.count : "-"}>
                          {val?.count ? val?.count : "-"}
                        </div>
                        <div className="col text-center px-2 elip-text" title={convertDateStringToDateAPI(val?.manufacture_date)}>
                          {convertDateStringToDateAPI(val?.manufacture_date)}
                        </div>
                        <div className="col text-center px-2 elip-text" title={convertDateStringToDateAPI(val?.expire_date)}>
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
                })
                :
                <>
                  <div className="not-found">No Data Found</div>
                </>
            }
          </div>


          {
            totalPage > 0 ?
              <div className="row mt-5">
                <div className="col-md-12 justify-content-between d-flex position-relative">
                  <div className="pagiantion-category">
                    <div>
                      <Pagination
                        className="pagination pagi"
                        page={currentPage}
                        count={totalPage}
                        onChange={onPageChange}
                      />
                    </div>
                    <div className="position-absolute totalCount" style={{ right: 23, bottom: 5 }}>
                      Total Inventories: {total.total}
                    </div>
                  </div>
                </div>
              </div>
              :
              ""
          }




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
                  type="text"
                  name="upc_code"
                  value={upc_code}
                  onChange={(e) => { setUpcCode(e.target.value) }}
                />
                {is_upc_code === true ? <small className="form-text text-danger" >Please Enter UPC Code</small> : ""}
              </div>
            </div>
            <div className="col-md-4">
              <div className="login-form ">
                <label>
                  Batch Number<span className="mandatory-star">*</span>
                </label>
                <input
                  type="text"
                  name="batch_number"
                  value={batch_number}
                  onChange={(e) => { setBatchNumber(e.target.value) }}
                />
                {is_batch_number === true ? <small className="form-text text-danger" >Please Enter Batch Number</small> : ""}
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
                  min={0}
                  value={count}
                  onChange={(e) => { setCount(e.target.value) }}
                />
                {is_count === true ? <small className="form-text text-danger" >Please Enter Quantity</small> : ""}
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
                {is_manufacture_date === true ? <small className="form-text text-danger" >Please Enter Manufacture Date</small> : ""}
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
                {is_expire_date === true ? <small className="form-text text-danger" >Please Enter Expiry Date</small> : ""}
              </div>
            </div>
            <div className="col-md-4 mt-4">
              <div className="signup-check">
                <Checkbox
                  size="small"
                  style={{ color: "#012169" }}
                  checked={is_active}
                  name="is_active"
                  onChange={(e) => { setIsActive(e.target.checked) }}
                />
                <label>Active</label>
              </div>
            </div>




            {/* <div className="col-md-4">
              <div className="login-form ">
                <label>
                  Warehouse Location<span className="mandatory-star">*</span>
                </label>
                <input
                  type="text"
                  name="warehouse"
                  value={warehouse}
                  onChange={(e) => { setWarehouse(e.target.value) }}
                />
                {is_warehouse_location === true ? <small className="form-text text-danger" >Please Enter Warehouse Location</small> : ""}
              </div>
            </div> */}





            <div className="col-md-4">
              <div data-component="inventoryCountry">
                <div className="login-form select-dropdown">
                  <label>
                  Warehouse Location<span className="mandatory-star">*</span>
                  </label>


                  <div className="sort-by-select-wrapper">
                    {/* <Select
                      disableUnderline
                      variant="standard"
                      // disabled={mode === "view" ? true : false}
                      autoWidth={true}
                      IconComponent={ExpandMoreIcon}
                      name="country"
                      // onChange={(e) => { setWarehouse(e.target.value) }}
                      onChange={countryChange}
                      className="sort-by-select w-100 selectCountry"
                      value={country}
                    >
                      <MenuItem
                        value="select"
                        disabled
                        className="field_toggle_checked"
                      >
                        Select Country{" "}
                      </MenuItem>
                      {
                        countryList?.map(elem => {
                          return (
                            <>
                              <MenuItem value={elem?.id}>
                                {elem?.name}
                              </MenuItem>
                            </>
                          )
                        })
                      }
                    </Select> */}

                    <select className='selectCountry'
                      // disabled={this.state.mode === "view" ? true : false}
                      value={warehouse}
                      name="origin_country_id"
                      onChange={(e) => { setWarehouse(e.target.value) }}
                    >
                      <option value={"select"} disabled>Select State</option>
                      {stateList?.map(val => {
                        return (
                          <option value={val?.id}>{val?.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  {is_warehouse_location === true ? <small className="form-text text-danger" >Please Enter Warehouse Location</small> : ""}
                </div>
              </div>
            </div>





            <div className="col-md-4">
              <div data-component="inventoryCountry">
                <div className="login-form select-dropdown">
                  <label>
                    Country<span className="mandatory-star">*</span>
                  </label>


                  <div className="sort-by-select-wrapper">
                    {/* <Select
                      disableUnderline
                      variant="standard"
                      // disabled={mode === "view" ? true : false}
                      autoWidth={true}
                      IconComponent={ExpandMoreIcon}
                      name="country"
                      // onChange={(e) => { setCountry(e.target.value) }}
                      onChange={countryChange}
                      className="sort-by-select w-100 selectCountry"
                      value={country}
                    >
                      <MenuItem
                        value="select"
                        disabled
                        className="field_toggle_checked"
                      >
                        Select Country{" "}
                      </MenuItem>
                      {
                        countryList?.map(elem => {
                          return (
                            <>
                              <MenuItem value={elem?.id}>
                                {elem?.name}
                              </MenuItem>
                            </>
                          )
                        })
                      }
                    </Select> */}

                    <select className='selectCountry'
                      // disabled={this.state.mode === "view" ? true : false}
                      value={country}
                      name="origin_country_id"
                      // onChange={this.handleChange.bind(this)}
                      onChange={countryChange}
                    >
                      <option value={"select"} disabled>Select Country</option>
                      {countryList?.map(val => {
                        return (
                          <option value={val?.id}>{val?.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  {is_country === true ? <small className="form-text text-danger" >Please Enter Country</small> : ""}
                </div>
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
                {is_certificate_url === true ? <small className="form-text text-danger" >Please Enter Certificate</small> : ""}
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
