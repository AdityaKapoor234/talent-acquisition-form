import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import CustomerApi from "../../services/customer";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";

export default class CustomerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: props?.customer?.is_active ? props?.customer?.is_active : false,
      tab: 1,
      customer: props?.customer,
      wishList: props?.wishList,
      mode: props?.mode,
      currentPage: 1,
      currentPageAddress: 1,
      currentWishListPage: 1,
      wishListTotalProduct: props?.wishListTotalProduct,
      totalWishListPage: props?.totalWishListPage,
      id: props?.id,
      open: false,
      address: [],
      orders: [],
      orderTotal: 1,
      addressTotal: 1,
    };
  }
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  handleCheckbox = () => {
    if (this.state.active) {
      this.setState({
        active: false,
        open: false,
      });
      this.props?.active(false);
    } else {
      this.setState({
        active: true,
        open: false,
      });
      this.props?.active(true);
    }
  };
  onPageChange = (e, page) => {
    this.setState({ currentPage: page });
    this.getOrder(this.state.id, page);
  };

  onPageChangeAddress = (e, page) => {
    this.setState({ currentPageAddress: page });
    this.getAddress(this.state.id, page);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.customer !== nextProps.customer ||
      prevState.mode !== nextProps.mode ||
      prevState.wishList !== nextProps.wishList ||
      prevState.wishListTotalProduct !== nextProps.wishListTotalProduct ||
      prevState.totalWishListPage !== nextProps.totalWishListPage ||
      prevState.id !== nextProps.id
    ) {
      return {
        customer: nextProps?.customer,
        mode: nextProps?.mode,
        wishList: nextProps?.wishList,
        wishListTotalProduct: nextProps?.wishListTotalProduct,
        totalWishListPage: nextProps?.totalWishListPage,
        id: nextProps?.id,
        active: nextProps?.customer?.is_active
          ? nextProps?.customer?.is_active
          : false,
      };
    }
    return null;
  }

  convertDateStringToDate = (dateStr) => {
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

  getAddresses = (id, page) => {
    CustomerApi.CustomerAddresses(id, page)
      .then((response) => {
        this.setState({
          address: response?.data?.data?.list,
          addressTotal: response?.data?.data?.pages,
        });
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

  getOrder = (id, page) => {
    CustomerApi.CustomerOrder(id, page)
      .then((response) => {
        this.setState({
          orders: response?.data?.data?.list,
          orderTotal: response?.data?.data?.pages,
        });
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

  pageChange = (e, page) => {
    this.props?.wishListPage(page);
    this.setState({ currentWishListPage: page });
  }

  componentDidMount() {
    this.getAddresses(this.state.id, 1);
    this.getOrder(this.state.id, 1);
  }

  render() {
    return (
      <div data-component="edit-customer">
        <div className="row">
          <div className="col-md-12">
            <div className="tab">
              <div
                className={
                  this.state.tab === 1 ? `sub-tab active-tab` : "sub-tab"
                }
                onClick={() => {
                  this.setState({ tab: 1 });
                }}
              >
                General info
              </div>
              <div
                className={
                  this.state.tab === 2 ? `sub-tab active-tab` : "sub-tab"
                }
                onClick={() => {
                  this.setState({ tab: 2 });
                }}
              >
                Address Info
              </div>
              <div
                className={
                  this.state.tab === 3 ? `sub-tab active-tab` : "sub-tab"
                }
                onClick={() => {
                  this.setState({ tab: 3 });
                }}
              >
                order Info
              </div>
              <div
                className={
                  this.state.tab === 4 ? `sub-tab active-tab` : "sub-tab"
                }
                onClick={() => {
                  this.setState({ tab: 4 });
                }}
              >
                wishlist Info
              </div>
            </div>
          </div>
        </div>
        {this.state.tab === 1 && (
          <>
            {this.state.mode === "edit" && (
              <div className="row mt-4">
                <div className="col-md-4">
                  {/* <div className="login-form ">
                    <label>Customer Type</label>
                    <input type="text" value={this.state.type} onChange={(e)=>{this.setState({type:e.target.value})}} />
                  </div> */}
                  <div className="login-form ">
                    <label>Name</label>
                    <input
                      type="text"
                      value={this.state.customer?.name}
                      readOnly={true}
                    />
                  </div>
                  <div className="login-form ">
                    <label>Email</label>
                    <input
                      type="text"
                      value={this.state.customer?.email}
                      readOnly={true}
                    />
                  </div>
                  <div className="login-form ">
                    <label>Mobile</label>
                    <input
                      type="number"
                      value={this.state.customer?.phone_number}
                      readOnly={true}
                    />
                  </div>
                  <div className="signup-check">
                    <Checkbox
                      size="small"
                      style={{ color: "#012169" }}
                      checked={this.state.active}
                      onChange={() => {
                        this.setState({ open: true });
                      }}
                    />
                    <label>Active</label>
                  </div>
                </div>
              </div>
            )}
            {this.state.mode === "view" && (
              <div className="row mt-4">
                <div className="col-md-4">
                  {/* <div className="login-form ">
                    <label>Customer Type</label>
                    <input
                      type="text"
                      readOnly={true}
                      value={this.state.type}
                    />
                  </div> */}
                  <div className="login-form ">
                    <label>Name</label>
                    <input
                      type="text"
                      readOnly={true}
                      value={this.state.customer?.name}
                    />
                  </div>
                  <div className="login-form ">
                    <label>Email</label>
                    <input
                      type="text"
                      readOnly={true}
                      value={this.state.customer?.email}
                    />
                  </div>
                  <div className="login-form ">
                    <label>Mobile</label>
                    <input
                      type="number"
                      readOnly={true}
                      value={this.state.customer?.phone_number}
                    />
                  </div>
                  <div className="signup-check">
                    <Checkbox
                      size="small"
                      disabled
                      style={{ color: "#012169" }}
                      checked={this.state.active}
                    />
                    <label>Active</label>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {this.state.tab === 2 && (<>
          <div data-component="address-view">
            <div className="row mt-4 sticky-scroll scroll">
              {this.state.address?.length === 0 && (
                <div className="error-message">No Address Info</div>
              )}
              {this.state.address?.map((p) => {
                return (
                  <div className="col-xl-4 col-lg-6 col-sm-6 mb-3">
                    <div className="edit-box">
                      <div className="row">
                        <div className="col-12">
                          <div className="complete-address">
                            <div>
                              <div
                                className="name two-line-ellipsis mt-3"
                                title={p?.recipient_name}
                              >
                                {p?.recipient_name}
                              </div>
                              <div
                                className="address"
                                title={`${p?.flat_no} ${p?.locality} ${p?.city} ${p?.pin_code}`}
                              >
                                {p?.flat_no} {p?.locality}
                                {p?.landmark !== "" ? ", " : " "}
                                <div>
                                  {p?.landmark !== "" ? "Near " : ""}
                                  {p?.landmark !== "" ? p?.landmark : ""}
                                  {p?.landmark !== "" ? ", " : ""}
                                  {p?.city}{" "}
                                </div>
                                <div>
                                  {p?.state}
                                  {" - "}
                                  {p?.pin_code}
                                </div>
                              </div>
                              <div className="number">
                                {p?.recipient_phone_number}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {this.state.addressTotal > 1 && (
            <div className="row">
              <div className="col-md-12 justify-content-between d-flex position-relative">
                <div className="pagiantion-category">
                  <div>
                    <Pagination
                      className="pagination pagi"
                      page={this.state.currentPageAddress}
                      count={this.state.addressTotal}
                      onChange={this.onPageChangeAddress}
                    />
                  </div>
                  <div
                    className="position-absolute totalCount"
                    style={{ right: 23, bottom: 5 }}
                  >
                    Total Addresses: {this.state.address?.length}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
        )}
        {this.state.tab === 3 && (
          <>
            <div data-component="CustomerComponent">
              <div className="row">
                <div className="col-md-12">
                  <div className="tableRow">
                    <div className="col">Order#</div>
                    <div className="col text-center">Date</div>
                    <div className="col text-center">Status</div>
                    {/* <div className="col-3 text-center">Shipment Method</div> */}
                    <div className="col text-center">Total</div>
                    {/* <div className="col-1 text-center">Active</div> */}
                    <div className="col-1 text-end">View</div>
                  </div>
                </div>
              </div>
              <div className="sticky-scroll scroll">
                {this.state.orders?.length === 0 && (
                  <div className="error-message">No order Info</div>
                )}
                {this.state.orders?.map((p) => {
                  return (
                    <div className="row">
                      <div className="col-md-12">
                        <div className="tableCell">
                          <div className="tableBody col">{p?.order_number}</div>
                          <div className="col text-center">
                            {this.convertDateStringToDate(p?.created_at)}
                          </div>
                          <div className="tableBody col justify-content-center">
                            {p?.status}
                          </div>
                          {/* <div className="col-3 text-center">COD</div> */}
                          <div className="col text-center">
                            ₹{" "}
                            {p?.total
                              ?.toFixed(2)
                              .toString()
                              .replace(
                                /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
                                ","
                              )}
                          </div>
                          {/* <div className="col-1 text-center">
                            <CheckCircleOutlineOutlinedIcon className="check-icon" />
                          </div> */}
                          <div className="col-1 text-end">
                            <RemoveRedEyeIcon
                              className="view-icon"
                              onClick={() => {
                                Router.push(`/order/${p?.order_number}/view`);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {this.state.orderTotal > 1 && (
              <div className="row">
                <div className="col-md-12 justify-content-between d-flex position-relative">
                  <div className="pagiantion-category">
                    <div>
                      <Pagination
                        className="pagination pagi"
                        page={this.state.currentPage}
                        count={this.state.orderTotal}
                        onChange={this.onPageChange}
                      />
                    </div>
                    <div
                      className="position-absolute totalCount"
                      style={{ right: 23, bottom: 5 }}
                    >
                      Total Orders: {this.state.orders?.length}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {this.state.tab === 4 && (
          <>
            <div data-component="wishlist">
              <div className='row'>
                {this.state?.wishList?.map(val => {
                  return (
                    <div className='col-3'>
                      <div className='padding'>
                        <div className='box'>
                          <div
                            className="bck-img mt-4"
                            style={{ backgroundImage: `url(${val?.primary_image_path})`, }}
                          >
                          </div>
                          <div className='name'>
                            <h3
                              className='text-center'
                            >
                              {val?.name}
                            </h3>
                            <div className="product-qulaty-div mb-3">
                              <span >
                                {val?.size}
                              </span>
                              {val?.size !== "" && val?.flavor !== "" ? "|" : ""}
                              <span >
                                {val?.flavor}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="row">
                <div className="col-md-12 py-5 justify-content-between d-flex position-relative">
                  <div className="pagiantion-category">
                    <div>
                      <Pagination
                        className="pagination pagi"
                        page={this.state.currentWishListPage}
                        count={this.state.totalWishListPage}
                        onChange={this.pageChange.bind(this)}
                      />
                    </div>
                    <div className="position-absolute totalCount" style={{ right: 23, bottom: 5 }}>
                      Total Products: {this.state.wishListTotalProduct}
                    </div>
                  </div>
                </div>
              </div>


            </div>

          </>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          maxWidth="sm"
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{ color: "#012169" }}>
            Confirm the action
          </DialogTitle>
          <Box position="absolute" top={0} right={0}>
            <IconButton onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent>
            <Typography style={{ color: "#7e8f99" }}>
              Are you sure you want to{" "}
              {this.state.active
                ? " deactivate this customer"
                : "activate this customer"}
              ?
            </Typography>
          </DialogContent>
          <DialogActions style={{ marginBottom: "0.5rem" }}>
            <Button
              onClick={this.handleClose}
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
              onClick={this.handleCheckbox}
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
}
