import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EmailIcon from '@mui/icons-material/Email';
import Router from "next/router";

export default class CouponList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coupon: props?.coupon,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.coupon !== nextProps.coupon) {
            return {
                coupon: nextProps?.coupon,
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
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        let str =
            date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        return str;
    };

    render() {
        return (
            <div data-component="CustomerComponent">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tableRow">
                            <div className="col-2 pe-1">Name</div>
                            <div className="col px-2 text-center">Code</div>
                            <div className="col px-2 text-center">Start Date</div>
                            <div className="col px-2 text-center">End Date</div>
                            <div className="col-2 text-center">Free Shipping</div>
                            <div className="col-1 text-center">Active</div>
                            <div className="col-1 text-center">Visible</div>
                            <div className="col-1 text-end">Action</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.coupon && this.state.coupon.length === 0 ? <div className="not-found">No Data Found</div> :
                        this.state.coupon?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody pe-1 col-2 elip-text" title={p?.name}>{p?.name}</div>
                                            <div className="col text-center px-2 elip-text" title={p?.code}>{p?.code}</div>
                                            <div className="col text-center px-2 elip-text" title={this.convertDateStringToDate(p?.start_date)}>{this.convertDateStringToDate(p?.start_date)}</div>
                                            <div className="col text-center px-2 elip-text" title={this.convertDateStringToDate(p?.end_date)}>{this.convertDateStringToDate(p?.end_date)}</div>
                                            <div className="col-2 text-center">
                                                {p?.is_free_shipping === true ? (
                                                    <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                                ) : (
                                                    <CancelOutlinedIcon className="cancel-icon" />
                                                )}
                                            </div>
                                            <div className="col-1 text-center">
                                                {p?.is_active === true ? (
                                                    <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                                ) : (
                                                    <CancelOutlinedIcon className="cancel-icon" />
                                                )}
                                            </div>
                                            <div className="col-1 text-center">
                                                {p?.is_show_on_list === true ? (
                                                    <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                                ) : (
                                                    <CancelOutlinedIcon className="cancel-icon" />
                                                )}
                                            </div>
                                            <div className="col-1 text-end">
                                                <RemoveRedEyeIcon
                                                    className="view-icon"
                                                    onClick={() => {
                                                        Router.push(`/coupon/${p?.id}/view`);
                                                    }}
                                                />
                                                <EditOutlinedIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/coupon/${p?.id}/edit`);
                                                    }}
                                                />
                                                <EmailIcon
                                                    className="edit-icon"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
            </div>
        );
    }
}
