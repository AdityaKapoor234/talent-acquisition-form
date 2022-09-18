import React, { Component } from "react";
import { toast } from "react-toastify";
import Router from "next/router";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OrderApi from "../../../services/orders";
export default class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props?.order?.is_active ? props?.order?.is_active : false,
            tab: 1,
            order: props?.order,
            mode: props?.mode,
            error: props?.error,
            open: false,
            status: props?.order?.order?.status ? props?.order?.order?.status : "0",
            // invoice: props?.invoice ? props?.invoice : "",
            invoice: {},
            id: props?.id,
        };
    }
    handleChange = (event) => {
        this.setState({ status: event.target.value });
        this.props?.handle(event.target.value);

    };
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

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.order !== nextProps.order ||
            // prevState.invoice !== nextProps.invoice ||
            prevState.mode !== nextProps.mode ||
            prevState.error !== nextProps.error

        ) {
            return {
                order: nextProps?.order,
                // invoice: nextProps?.invoice,
                id: nextProps?.id,
                mode: nextProps?.mode,
                error: nextProps?.error,
                status: nextProps?.order?.order?.status,
                active: nextProps?.order?.is_active
                    ? nextProps?.order?.is_active
                    : false,
            };
        }
        return null;
    }

    orderInvoice = (id) => {
        OrderApi.getOrderInvoice(id)
            .then((response) => {
                this.setState({ invoice: response.data.data.pdf })
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

    orderEMailRegenerate = (id, mail) => {
        let data = {
            "email": mail
        }
        OrderApi.orderEMailRegenerate(id, data)
            .then((response) => {
                toast.success(response.data.message)
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
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        let str =
            date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        return str;
    };

    componentDidMount() {
        this.orderInvoice(this.state.id);
    }

    render() {
        return (
            <div data-component="view-order">
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
                                Order info
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.tab === 1 && (
                    <>
                        {this.state.mode === "edit" && (
                            <>
                                <div className="row mt-4">
                                    <div className="col">
                                        <div className="div-box row">
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfo">Order No.&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.order?.order_no}>{this.state.order?.order?.order_no}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Order Date&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.convertDateStringToDate(this.state.order?.order?.created_at)}>{this.convertDateStringToDate(this.state.order?.order?.created_at)}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Name&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.recipient_name}>{this.state.order?.recipient_name}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Contact No.&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.shipping_address?.recipient_phone_number}>{this.state.order?.shipping_address?.recipient_phone_number}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Email&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.email}>{this.state.order?.email}</span>
                                                </span>

                                            </div>
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfo">Billing Address</span>
                                                </span>
                                                <span className="orderLine2">
                                                    <span className="orderInfoVal">
                                                        {this.state.order?.billing_address?.flat_no}&nbsp;
                                                        {this.state.order?.billing_address?.locality}&nbsp;
                                                        {this.state.order?.billing_address?.landmark}&nbsp;
                                                        {this.state.order?.billing_address?.state}<br />
                                                        {this.state.order?.billing_address?.city}&nbsp;
                                                        {this.state.order?.billing_address?.pin_code}
                                                    </span>
                                                </span>
                                                <span className="orderLine mt-3">
                                                    <span className="orderInfoVal">{this.state.order?.billing_address?.recipient_phone_number}</span>
                                                </span>

                                            </div>
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfo">Delivery Address</span>
                                                </span>
                                                <span className="orderLine2">
                                                    <span className="orderInfoVal">
                                                        {this.state.order?.shipping_address?.flat_no}&nbsp;
                                                        {this.state.order?.shipping_address?.locality}&nbsp;
                                                        {this.state.order?.shipping_address?.landmark}&nbsp;
                                                        {this.state.order?.shipping_address?.state}<br />
                                                        {this.state.order?.shipping_address?.city}&nbsp;
                                                        {this.state.order?.shipping_address?.pin_code}
                                                    </span>
                                                </span>
                                                <span className="orderLine mt-3">
                                                    <span className="orderInfoVal">{this.state.order?.shipping_address?.recipient_phone_number}</span>
                                                </span>

                                            </div>
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfo">Status&nbsp;</span>
                                                    <span className="orderInfoValHigh elip-text" title={this.state.order?.order?.status === "payment_pending" ? "Pending" : this.state.order?.order?.status}>{this.state.order?.order?.status === "payment_pending" ? "Pending" : this.state.order?.order?.status}</span>
                                                </span>
                                                {/* <span className="orderLine align-items-center">
                                                    <span className="orderInfo">Status&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                    <div data-component="edit-category">
                                                        <div className="sort">
                                                            <div className="sort-by-select-wrapper">
                                                                <Select
                                                                    disableUnderline
                                                                    variant="standard"
                                                                    autoWidth={true}
                                                                    IconComponent={ExpandMoreIcon}
                                                                    name="orderstatus"
                                                                    onChange={this.handleChange}
                                                                    className="sort-by-select w-100"
                                                                    value={this.state?.status ? this.state?.status : "0"}
                                                                >
                                                                    <MenuItem
                                                                        value={"0"}
                                                                        disabled
                                                                        className="field_toggle_checked"
                                                                    >
                                                                        Select Status{" "}
                                                                    </MenuItem>
                                                                    <MenuItem value={"placed"}>Placed</MenuItem>
                                                                    <MenuItem value={"shipped"}>Shipped</MenuItem>
                                                                    <MenuItem value={"cancelled"}>Cancelled</MenuItem>
                                                                    <MenuItem value={"cpayment_pending"}>Pending</MenuItem>
                                                                </Select>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="orderInfoValHigh elip-text" title={this.state.order?.order?.status}>{this.state.order?.order?.status}</span>
                                                    <span className="orderInfoValHigh elip-text" title={this.state.order?.order?.status}>{this.state.order?.order?.status}</span>

                                                </span> */}
                                                {/* <small className="form-text text-danger" >{this.state.error}</small> */}
                                                <span className="orderLine">
                                                    <span className="orderInfo">Payment Mode:&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.order?.payment_mode === "razorpay" ? "Online" : "Cash on Delivery"}>{this.state.order?.order?.payment_mode === "razorpay" ? "Online" : "Cash on Delivery"}</span>
                                                </span>
                                                {
                                                    this.state.order?.coupon_code !== "" && this.state.order?.coupon_code !== null ?
                                                        <span className="orderLine">
                                                            <span className="orderInfo">Coupon Code:&nbsp;</span>
                                                            <span className="orderInfoVal elip-text" title={this.state.order?.coupon_code}>{this.state.order?.coupon_code}</span>
                                                        </span>
                                                        :
                                                        ""
                                                }

                                                {
                                                    !this.state.invoice ?
                                                        ""
                                                        :
                                                        <div
                                                            className="custom-btn d-flex justify-content-center w-100"
                                                            style={{ width: "fit-content" }}
                                                            onClick={() => { Router.push(this.state.invoice) }}
                                                        >
                                                            <span>Download Invoice</span>
                                                        </div>
                                                }
                                                <div
                                                    className={this.state.invoice ? "custom-btn d-flex justify-content-center w-100 mt-2" : "custom-btn d-flex justify-content-center w-100"}
                                                    style={{ width: "fit-content" }}
                                                    onClick={() => { this.orderEMailRegenerate(this.state.order?.order?.order_no, this.state.order?.email) }}
                                                >
                                                    <span>Resend Mail</span>
                                                </div>
                                                {
                                                    this.state?.status !== "cancelled" &&
                                                    <div
                                                        className={this.state.invoice ? "custom-btn d-flex justify-content-center w-100 mt-2" : "custom-btn d-flex justify-content-center w-100"}
                                                        style={{ width: "fit-content" }}
                                                        onClick={() => { this.props?.saveDetails() }}
                                                    >
                                                        <span>Cancel Order</span>
                                                    </div>
                                                }
                                                <div></div>
                                            </div>
                                        </div>

                                        <div data-component="CustomerComponent">
                                            <div className="tableRow row py-3">
                                                <div className="col-4">Product</div>
                                                <div className="col text-center">Price</div>
                                                <div className="col text-center">Tax(₹)</div>
                                                <div className="col text-center">Tax(%)</div>
                                                <div className="col text-center">Actual Amount</div>
                                                <div className="col-2 text-center">Quantity</div>
                                                <div className="col text-center">Amount</div>
                                            </div>
                                        </div>

                                        {
                                            this.state.order?.products?.map((p, index) => {
                                                return (
                                                    <>
                                                        <div className="div-box row mb-2" key={index}>
                                                            <div className="col-4">
                                                                <div className="row">
                                                                    <div className="col-4">

                                                                        <img src={p?.image} className="orderImg" alt="" />
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <span className="orderLine">
                                                                            <span className="orderInfo elip-text" title={p?.name}>{p?.name}</span>
                                                                        </span>
                                                                        <span className="orderLine mt-4">
                                                                            <span className="orderInfoValQuant elip-text">{p?.size}&nbsp;{p?.size_unit}</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col justify-content-center d-flex">
                                                                <span className="orderLine">
                                                                    <span className="orderInfoVal">₹{p?.unit_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                                </span>

                                                            </div>
                                                            <div className="col justify-content-center d-flex">
                                                                {p?.tax_price === null ? "-" :
                                                                    <span className="orderLine">
                                                                        <span className="orderInfoVal">₹{p?.tax_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                                    </span>}

                                                            </div>
                                                            <div className="col justify-content-center d-flex">
                                                                {p?.tax_rate === null ? "-" :
                                                                    <span className="orderLine">
                                                                        <span className="orderInfoVal">{p?.tax_rate?.toFixed(2)}%</span>
                                                                    </span>}

                                                            </div>
                                                            <div className="col justify-content-center d-flex">
                                                                {p?.actual_price === null ? "-" :
                                                                    <span className="orderLine">
                                                                        <span className="orderInfoVal">₹{p?.actual_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                                    </span>}

                                                            </div>
                                                            <div className="col-2">
                                                                <span className="orderLine justify-content-center d-flex">
                                                                    <span className="orderInfoVal">Order Qty: {p?.quantity}</span>
                                                                </span>
                                                                <span className="orderLine justify-content-center d-flex">
                                                                    <span className="orderInfoVal">Shipped Qty: {p?.quantity}</span>
                                                                </span>

                                                            </div>
                                                            <div className="col justify-content-center d-flex">
                                                                <span className="orderLine">
                                                                    <span className="orderInfoVal">₹{p?.total_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                                </span>

                                                            </div>

                                                        </div>
                                                    </>
                                                )
                                            })}

                                        <div className="div-box row mb-2">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Sub Total</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" title={(this.state.order?.net_price)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>₹&nbsp;{(this.state.order?.net_price)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </div>
                                                </div>
                                                {this.state.order?.discount === null ? "" :
                                                    <div className="row">
                                                        <div className="col-11 textRight">
                                                            <span className="orderInfo">Discount </span>
                                                        </div>
                                                        <div className="col-1 text-end">
                                                            <span className="orderInfoVal elip-text" >-₹ {this.state.order?.discount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                        </div>
                                                    </div>}
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Shipping Charges</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" >₹ {this.state.order?.shipping_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Grand Total</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" title={this.state.order?.price_after_coupon_discount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>₹&nbsp;{this.state.order?.price_after_coupon_discount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </>
                        )}

                        {this.state.mode === "view" && (
                            <>
                                <div className="row mt-4">
                                    <div className="col">
                                        <div className="div-box row">
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfo">Order No.&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.order?.order_no}>{this.state.order?.order?.order_no}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Order Date&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.convertDateStringToDate(this.state.order?.order?.created_at)}>{this.convertDateStringToDate(this.state.order?.order?.created_at)}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Name&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.recipient_name}>{this.state.order?.recipient_name}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Contact No.&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.shipping_address?.recipient_phone_number}>{this.state.order?.shipping_address?.recipient_phone_number}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Email&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.email}>{this.state.order?.email}</span>
                                                </span>

                                            </div>
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfo">Billing Address</span>
                                                </span>
                                                <span className="orderLine2">
                                                    <span className="orderInfoVal">
                                                        {this.state.order?.billing_address?.flat_no}&nbsp;
                                                        {this.state.order?.billing_address?.locality}&nbsp;
                                                        {this.state.order?.billing_address?.landmark}&nbsp;
                                                        {this.state.order?.billing_address?.state}<br />
                                                        {this.state.order?.billing_address?.city}&nbsp;
                                                        {this.state.order?.billing_address?.pin_code}
                                                    </span>
                                                </span>
                                                <span className="orderLine mt-3">
                                                    <span className="orderInfoVal">{this.state.order?.billing_address?.recipient_phone_number}</span>
                                                </span>

                                            </div>
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfo">Delivery Address</span>
                                                </span>
                                                <span className="orderLine2">
                                                    <span className="orderInfoVal">
                                                        {this.state.order?.shipping_address?.flat_no}&nbsp;
                                                        {this.state.order?.shipping_address?.locality}&nbsp;
                                                        {this.state.order?.shipping_address?.landmark}&nbsp;
                                                        {this.state.order?.shipping_address?.state}<br />
                                                        {this.state.order?.shipping_address?.city}&nbsp;
                                                        {this.state.order?.shipping_address?.pin_code}
                                                    </span>
                                                </span>
                                                <span className="orderLine mt-3">
                                                    <span className="orderInfoVal">{this.state.order?.shipping_address?.recipient_phone_number}</span>
                                                </span>

                                            </div>
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfo">Status&nbsp;</span>
                                                    <span className="orderInfoValHigh elip-text" title={this.state.order?.order?.status === "payment_pending" ? "Pending" : this.state.order?.order?.status}>{this.state.order?.order?.status === "payment_pending" ? "Pending" : this.state.order?.order?.status}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Payment Mode:&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.order?.payment_mode === "razorpay" ? "Online" : "Cash on Delivery"}>{this.state.order?.order?.payment_mode === "razorpay" ? "Online" : "Cash on Delivery"}</span>
                                                </span>
                                                {this.state.order?.coupon_code !== "" && this.state.order?.coupon_code !== null ?
                                                    <span className="orderLine">
                                                        <span className="orderInfo">Coupon Code:&nbsp;</span>
                                                        <span className="orderInfoVal elip-text" title={this.state.order?.coupon_code}>{this.state.order?.coupon_code}</span>
                                                    </span> : ""}

                                                {
                                                    !this.state.invoice ?
                                                        ""
                                                        :
                                                        <div
                                                            className="custom-btn d-flex justify-content-center w-100"
                                                            style={{ width: "fit-content" }}
                                                            onClick={() => { Router.push(this.state.invoice) }}
                                                        >
                                                            <span>Download Invoice</span>
                                                        </div>
                                                }
                                                <div
                                                    className={this.state.invoice ? "custom-btn d-flex justify-content-center w-100 mt-2" : "custom-btn d-flex justify-content-center w-100"}
                                                    style={{ width: "fit-content" }}
                                                    onClick={() => { this.orderEMailRegenerate(this.state.order?.order?.order_no, this.state.order?.email) }}
                                                >
                                                    <span>Resend Mail</span>
                                                </div>


                                            </div>
                                        </div>

                                        <div data-component="CustomerComponent">
                                            <div className="tableRow row py-3">
                                                <div className="col-4">Product</div>
                                                <div className="col text-center">Price</div>
                                                <div className="col text-center">Tax(₹)</div>
                                                <div className="col text-center">Tax(%)</div>
                                                <div className="col text-center">Actual Amount</div>
                                                <div className="col-2 text-center">Quantity</div>
                                                <div className="col text-center">Amount</div>
                                            </div>
                                        </div>

                                        {
                                            this.state.order?.products?.map((p, index) => {
                                                return (
                                                    <>
                                                        <div className="div-box row mb-2" key={index}>
                                                            <div className="col-4">
                                                                <div className="row">
                                                                    <div className="col-4">

                                                                        <img src={p?.image} className="orderImg" alt="" />
                                                                    </div>
                                                                    <div className="col-8">
                                                                        <span className="orderLine">
                                                                            <span className="orderInfo elip-text" title={p?.name}>{p?.name}</span>
                                                                        </span>
                                                                        <span className="orderLine mt-4">
                                                                            <span className="orderInfoValQuant elip-text">{p?.size}&nbsp;{p?.size_unit}</span>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col justify-content-center d-flex">
                                                                <span className="orderLine">
                                                                    <span className="orderInfoVal">₹{p?.unit_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                                </span>

                                                            </div>
                                                            <div className="col justify-content-center d-flex">
                                                                {p?.tax_price === null ? "-" :
                                                                    <span className="orderLine">
                                                                        <span className="orderInfoVal">₹{p?.tax_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                                    </span>}

                                                            </div>
                                                            <div className="col justify-content-center d-flex">
                                                                {p?.tax_rate === null ? "-" :
                                                                    <span className="orderLine">
                                                                        <span className="orderInfoVal">{p?.tax_rate?.toFixed(2)}%</span>
                                                                    </span>}

                                                            </div>
                                                            <div className="col justify-content-center d-flex">
                                                                {p?.actual_price === null ? "-" :
                                                                    <span className="orderLine">
                                                                        <span className="orderInfoVal">₹{p?.actual_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                                    </span>}

                                                            </div>
                                                            <div className="col-2">
                                                                <span className="orderLine justify-content-center d-flex">
                                                                    <span className="orderInfoVal">Order Qty: {p?.quantity}</span>
                                                                </span>
                                                                <span className="orderLine justify-content-center d-flex">
                                                                    <span className="orderInfoVal">Shipped Qty: {p?.quantity}</span>
                                                                </span>

                                                            </div>
                                                            <div className="col justify-content-center d-flex">
                                                                <span className="orderLine">
                                                                    <span className="orderInfoVal">₹{p?.total_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                                </span>

                                                            </div>

                                                        </div>
                                                    </>
                                                )
                                            })}

                                        <div className="div-box row mb-2">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Sub Total</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" title={(this.state.order?.net_price)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>₹&nbsp;{(this.state.order?.net_price)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </div>
                                                </div>
                                                {this.state.order?.discount === null ? "" :
                                                    <div className="row">
                                                        <div className="col-11 textRight">
                                                            <span className="orderInfo">Discount </span>
                                                        </div>
                                                        <div className="col-1 text-end">
                                                            <span className="orderInfoVal elip-text" >-₹ {this.state.order?.discount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                        </div>
                                                    </div>}
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Shipping Charges</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" >₹ {this.state.order?.shipping_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Grand Total</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" title={this.state.order?.price_after_coupon_discount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>₹&nbsp;{this.state.order?.price_after_coupon_discount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )
                }
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
                                ? " deactivate this order"
                                : "activate this order"}
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
            </div >
        );
    }
}

