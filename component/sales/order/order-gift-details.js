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

export default class OrderPrimeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // active: props?.order?.is_active ? props?.order?.is_active : false,
            tab: 1,
            // order: props?.order,
            order: {},
            mode: props?.mode,
            error: props?.error,
            open: false,
            // status: props?.order?.order?.status ? props?.order?.order?.status : "0",
            // invoice: props?.invoice ? props?.invoice : "",
            invoice: "",
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
            // prevState.order !== nextProps.order ||
            // prevState.invoice !== nextProps.invoice ||
            prevState.mode !== nextProps.mode ||
            prevState.error !== nextProps.error
        ) {
            return {
                // order: nextProps?.order,
                // invoice: nextProps?.invoice,
                mode: nextProps?.mode,
                error: nextProps?.error,
                // status: nextProps?.order?.order?.status,
                // active: nextProps?.order?.is_active
                // ? nextProps?.order?.is_active
                // : false,
                id: nextProps?.id,
            };
        }
        return null;
    }

    // orderInvoice = (id) => {
    //     OrderApi.getOrderInvoicePrime(id)
    //         .then((response) => {
    //             // this.setState({ invoice: response.data.data.pdf })
    //         })
    //         .catch((error) => {
    //             toast.error(
    //                 error?.response &&
    //                     error?.response?.data &&
    //                     error?.response?.data?.message
    //                     ? error.response.data.message
    //                     : "Unable to process your request, please try after sometime"
    //             );
    //         });
    // }

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

    orderDetail = (id) => {
        OrderApi.getOrderGiftDetails(id)
            .then((response) => {
                this.setState({ order: response.data.data });
                this.setState({ invoice: response.data?.data?.order_invoice?.invoice_link })
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
        this.orderDetail(this.state.id);
        // this.orderInvoice(this.state.id);
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
                                                    <span className="orderInfo">Sender's Name&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.sender_name}>{this.state.order?.gift_card_details?.sender_name}</span>
                                                </span>
                                                {/* <span className="orderLine">
                                                    <span className="orderInfo">Contact No.&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.shipping_address?.recipient_phone_number}>{this.state.order?.shipping_address?.recipient_phone_number}</span>
                                                </span> */}
                                                <span className="orderLine">
                                                    <span className="orderInfo">Occassion&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.occasion_type}>{this.state.order?.gift_card_details?.occasion_type}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Message&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.message}>{this.state.order?.gift_card_details?.message}</span>
                                                </span>

                                            </div>
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfoValHigh">Receiver's Information&nbsp;</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Name&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.receiver_name}>{this.state.order?.gift_card_details?.receiver_name}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Mob No&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.receiver_mobile_no}>{this.state.order?.gift_card_details?.receiver_mobile_no}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">E-Mail&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.receiver_email}>{this.state.order?.gift_card_details?.receiver_email}</span>
                                                </span>


                                            </div>
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfo">Reg.Date&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.convertDateStringToDate(this.state.order?.order?.created_at)}>{this.convertDateStringToDate(this.state.order?.order?.created_at)}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Valid Till&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.convertDateStringToDate(this.state.order?.gift_card_details?.expire_date)}>{this.convertDateStringToDate(this.state.order?.gift_card_details?.expire_date)}</span>
                                                </span>



                                            </div>
                                            <div className="col-3">
                                                <span className="orderLine align-items-center">
                                                    <span className="orderInfo">Status&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                                    <span className="orderInfoValHigh elip-text" title={this.state.order?.order?.status === "payment_pending" ? "Pending" : this.state.order?.order?.status}>{this.state.order?.order?.status === "payment_pending" ? "Pending" : this.state.order?.order?.status}</span>
                                                    {/* <div data-component="edit-category">
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
                                                    </div> */}
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Payment Mode:&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.order?.payment_mode === "razorpay" ? "Online" : "Cash on Delivery"}>{this.state.order?.order?.payment_mode === "razorpay" ? "Online" : "Cash on Delivery"}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Gift Card Code&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.gift_card_code}>{this.state.order?.gift_card_details?.gift_card_code}</span>
                                                </span>

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
                                                {
                                                    (this.state.order?.order?.status === "placed" || this.state.order?.order?.status === "shipped") &&
                                                    <div
                                                        className={this.state.invoice ? "custom-btn d-flex justify-content-center w-100 mt-2" : "custom-btn d-flex justify-content-center w-100"}
                                                        style={{ width: "fit-content" }}
                                                        onClick={() => { this.orderEMailRegenerate(this.state.order?.order?.order_no, this.state.order?.gift_card_details?.receiver_email) }}
                                                    >
                                                        <span>Resend Mail</span>
                                                    </div>
                                                }


                                            </div>
                                        </div>

                                        <div data-component="CustomerComponent">
                                            <div className="tableRow row py-3">
                                                <div className="col-5">Product</div>
                                                <div className="col text-center">Price</div>
                                                <div className="col text-center">Tax(₹)</div>
                                                <div className="col text-center">Tax(%)</div>
                                                <div className="col text-center">Actual Amount</div>
                                                {/* <div className="col-2 text-center">Quantity</div> */}
                                                <div className="col text-center">Amount</div>
                                            </div>
                                        </div>

                                        <div className="div-box row mb-2">
                                            <div className="col-5">
                                                <div className="row">
                                                    <div className="col-6">

                                                        <img src={this.state.order?.image} className="orderGiftImg" alt="" />
                                                    </div>
                                                    <div className="col-6">
                                                        <span className="orderLine">
                                                            <span className="orderInfo elip-text" title={this.state.order?.name}>{this.state.order?.name}</span>
                                                        </span>
                                                        {/* <span className="orderLine mt-4">
                                                            <span className="orderInfoValQuant elip-text">{p?.size}&nbsp;{p?.size_unit}</span>
                                                        </span> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col justify-content-center d-flex">
                                                <span className="orderLine">
                                                    <span className="orderInfoVal">₹{this.state.order?.gift_card_details?.gift_card_amount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                </span>

                                            </div>
                                            <div className="col justify-content-center d-flex">
                                                -
                                                {/* {p?.tax_price === null ? "-" :
                                                    <span className="orderLine">
                                                        <span className="orderInfoVal">₹{p?.tax_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </span>} */}

                                            </div>
                                            <div className="col justify-content-center d-flex">
                                                -
                                                {/* {p?.tax_rate === null ? "-" :
                                                    <span className="orderLine">
                                                        <span className="orderInfoVal">{p?.tax_rate?.toFixed(2)}%</span>
                                                    </span>} */}

                                            </div>
                                            <div className="col justify-content-center d-flex">
                                                {this.state.order?.gift_card_details?.gift_card_amount === null ? "-" :
                                                    <span className="orderLine">
                                                        <span className="orderInfoVal">₹{this.state.order?.gift_card_details?.gift_card_amount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </span>}

                                            </div>
                                            {/* <div className="col-2">
                                                                <span className="orderLine justify-content-center d-flex">
                                                                    <span className="orderInfoVal">Order Qty: {p?.quantity}</span>
                                                                </span>
                                                                <span className="orderLine justify-content-center d-flex">
                                                                    <span className="orderInfoVal">Shipped Qty: {p?.quantity}</span>
                                                                </span>

                                                            </div> */}
                                            <div className="col justify-content-center d-flex">
                                                <span className="orderLine">
                                                    <span className="orderInfoVal">₹{this.state.order?.gift_card_details?.gift_card_amount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                </span>

                                            </div>

                                        </div>

                                        <div className="div-box row mb-2">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Sub Total</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" title={(this.state.order?.gift_card_details?.gift_card_amount)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>₹&nbsp;{(this.state.order?.gift_card_details?.gift_card_amount)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </div>
                                                </div>
                                                {this.state.order?.discount === null ? "" :
                                                    <div className="row">
                                                        <div className="col-11 textRight">
                                                            <span className="orderInfo">Discount </span>
                                                        </div>
                                                        <div className="col-1 text-end">
                                                            <span className="orderInfoVal elip-text" >-₹ {parseInt(0)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                        </div>
                                                    </div>}
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Shipping Charges</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" >₹ {parseInt(0)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Grand Total</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.gift_card_amount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>₹&nbsp;{this.state.order?.gift_card_details?.gift_card_amount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
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
                                                    <span className="orderInfo">Sender's Name&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.sender_name}>{this.state.order?.gift_card_details?.sender_name}</span>
                                                </span>
                                                {/* <span className="orderLine">
                                                    <span className="orderInfo">Contact No.&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.shipping_address?.recipient_phone_number}>{this.state.order?.shipping_address?.recipient_phone_number}</span>
                                                </span> */}
                                                <span className="orderLine">
                                                    <span className="orderInfo">Occassion&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.occasion_type}>{this.state.order?.gift_card_details?.occasion_type}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Message&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.message}>{this.state.order?.gift_card_details?.message}</span>
                                                </span>

                                            </div>
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfoValHigh">Receiver's Information&nbsp;</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Name&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.receiver_name}>{this.state.order?.gift_card_details?.receiver_name}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Mob No&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.receiver_mobile_no}>{this.state.order?.gift_card_details?.receiver_mobile_no}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">E-Mail&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.receiver_email}>{this.state.order?.gift_card_details?.receiver_email}</span>
                                                </span>


                                            </div>
                                            <div className="col-3">
                                                <span className="orderLine">
                                                    <span className="orderInfo">Reg.Date&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.convertDateStringToDate(this.state.order?.order?.created_at)}>{this.convertDateStringToDate(this.state.order?.order?.created_at)}</span>
                                                </span>
                                                <span className="orderLine">
                                                    <span className="orderInfo">Valid Till&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.convertDateStringToDate(this.state.order?.gift_card_details?.expire_date)}>{this.convertDateStringToDate(this.state.order?.gift_card_details?.expire_date)}</span>
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
                                                <span className="orderLine">
                                                    <span className="orderInfo">Gift Card Code&nbsp;</span>
                                                    <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.gift_card_code}>{this.state.order?.gift_card_details?.gift_card_code}</span>
                                                </span>

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
                                                {
                                                    (this.state.order?.order?.status === "placed" || this.state.order?.order?.status === "shipped") &&
                                                    <div
                                                        className={this.state.invoice ? "custom-btn d-flex justify-content-center w-100 mt-2" : "custom-btn d-flex justify-content-center w-100"}
                                                        style={{ width: "fit-content" }}
                                                        onClick={() => { this.orderEMailRegenerate(this.state.order?.order?.order_no, this.state.order?.gift_card_details?.receiver_email) }}
                                                    >
                                                        <span>Resend Mail</span>
                                                    </div>
                                                }


                                            </div>
                                        </div>

                                        <div data-component="CustomerComponent">
                                            <div className="tableRow row py-3">
                                                <div className="col-5">Product</div>
                                                <div className="col text-center">Price</div>
                                                <div className="col text-center">Tax(₹)</div>
                                                <div className="col text-center">Tax(%)</div>
                                                <div className="col text-center">Actual Amount</div>
                                                {/* <div className="col-2 text-center">Quantity</div> */}
                                                <div className="col text-center">Amount</div>
                                            </div>
                                        </div>

                                        <div className="div-box row mb-2">
                                            <div className="col-5">
                                                <div className="row">
                                                    <div className="col-6">

                                                        <img src={this.state.order?.image} className="orderGiftImg" alt="" />
                                                    </div>
                                                    <div className="col-6">
                                                        <span className="orderLine">
                                                            <span className="orderInfo elip-text" title={this.state.order?.name}>{this.state.order?.name}</span>
                                                        </span>
                                                        {/* <span className="orderLine mt-4">
                                                            <span className="orderInfoValQuant elip-text">{p?.size}&nbsp;{p?.size_unit}</span>
                                                        </span> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col justify-content-center d-flex">
                                                <span className="orderLine">
                                                    <span className="orderInfoVal">₹{this.state.order?.gift_card_details?.gift_card_amount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                </span>

                                            </div>
                                            <div className="col justify-content-center d-flex">
                                                -
                                                {/* {p?.tax_price === null ? "-" :
                                                    <span className="orderLine">
                                                        <span className="orderInfoVal">₹{p?.tax_price?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </span>} */}

                                            </div>
                                            <div className="col justify-content-center d-flex">
                                                -
                                                {/* {p?.tax_rate === null ? "-" :
                                                    <span className="orderLine">
                                                        <span className="orderInfoVal">{p?.tax_rate?.toFixed(2)}%</span>
                                                    </span>} */}

                                            </div>
                                            <div className="col justify-content-center d-flex">
                                                {this.state.order?.gift_card_details?.gift_card_amount === null ? "-" :
                                                    <span className="orderLine">
                                                        <span className="orderInfoVal">₹{this.state.order?.gift_card_details?.gift_card_amount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </span>}

                                            </div>
                                            {/* <div className="col-2">
                                                                <span className="orderLine justify-content-center d-flex">
                                                                    <span className="orderInfoVal">Order Qty: {p?.quantity}</span>
                                                                </span>
                                                                <span className="orderLine justify-content-center d-flex">
                                                                    <span className="orderInfoVal">Shipped Qty: {p?.quantity}</span>
                                                                </span>

                                                            </div> */}
                                            <div className="col justify-content-center d-flex">
                                                <span className="orderLine">
                                                    <span className="orderInfoVal">₹{this.state.order?.gift_card_details?.gift_card_amount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                </span>

                                            </div>

                                        </div>

                                        <div className="div-box row mb-2">
                                            <div className="col-12">
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Sub Total</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" title={(this.state.order?.gift_card_details?.gift_card_amount)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>₹&nbsp;{(this.state.order?.gift_card_details?.gift_card_amount)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </div>
                                                </div>
                                                {this.state.order?.discount === null ? "" :
                                                    <div className="row">
                                                        <div className="col-11 textRight">
                                                            <span className="orderInfo">Discount </span>
                                                        </div>
                                                        <div className="col-1 text-end">
                                                            <span className="orderInfoVal elip-text" >-₹ {parseInt(0)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                        </div>
                                                    </div>}
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Shipping Charges</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" >₹ {parseInt(0)?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-11 textRight">
                                                        <span className="orderInfo">Grand Total</span>
                                                    </div>
                                                    <div className="col-1 text-end">
                                                        <span className="orderInfoVal elip-text" title={this.state.order?.gift_card_details?.gift_card_amount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>₹&nbsp;{this.state.order?.gift_card_details?.gift_card_amount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}</span>
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

