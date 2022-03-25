import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class OrderList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: props?.order ? props?.order : [],
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.order !== nextProps.order
        ) {
            return {
                order: nextProps?.order ? nextProps?.order : []
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



    render() {
        return (
            <div data-component="CustomerComponent">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tableRow">
                            <div className="col-2 pe-1">Order#</div>
                            <div className="col-3 px-2 text-center">Customer</div>
                            <div className="col-2 px-2 text-center">Date</div>
                            <div className="col-2 px-2 text-center">Status</div>
                            <div className="col-2 px-2 text-center">Total</div>
                            <div className="col-1 text-end">View</div>
                        </div>
                    </div>
                </div>
                {
                    // this.state.order && this.state.order?.length === 0 ? <div className="not-found">No Data Found</div> :
                    this.state.order?.map((p, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-md-12">
                                    <div className="tableCell">
                                        <div className="tableBody pe-1 col-2 elip-text" title={p?.order_number}>{p?.order_number}</div>
                                        <div className="tableBody px-2 col-3 justify-content-center elip-text" title={p?.customer}>{p?.customer}</div>
                                        <div className="col-2 px-2 text-center elip-text" title={this.convertDateStringToDate(p?.created_at)}>{this.convertDateStringToDate(p?.created_at)}</div>
                                        <div className="col-2 px-2 text-center elip-text" title={p?.status}>{p?.status}</div>
                                        <div className="col-2 px-2 text-center elip-text" title={p?.total}>₹ {p?.total}</div>
                                        <div className="col-1 text-end elip-text">
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
                    })
                }
            </div>
        );
    }
}