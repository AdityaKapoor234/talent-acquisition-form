import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";
import Photo from "../banner/banner-photo"

export default class DealsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deals: props?.deals,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.deals !== nextProps.deals
        ) {
            return {
                deals: nextProps?.deals
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
                            <div className="col-2 pe-1">Icon</div>
                            <div className="col text-center">Label</div>
                            <div className="col-2 text-center">Deal Start Date</div>
                            <div className="col-2 px-2 text-center">Deal End Date</div>
                            <div className="col-2 px-2 text-center">Display Order</div>
                            <div className="col-1 px-2 text-center">Active</div>
                            <div className="col-1 text-end">Action</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.deals && this.state.deals.length === 0 ? <div className="not-found">No Data Found</div> :
                        this.state.deals?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody pe-1 col-2 elip-text">
                                                <Photo
                                                    mode={"view"}
                                                    label={"Icon"}
                                                    accept=".jpg,.jpeg,.png"
                                                    img={p?.icon_url}
                                                />
                                            </div>
                                            <div className="col text-center" title={p?.label}>{p?.label}</div>
                                            <div className="col-2 text-center px-2 elip-text" title={this.convertDateStringToDate(p?.deal_start_date)}>
                                                {this.convertDateStringToDate(p?.deal_start_date)}
                                            </div>
                                            <div className="col-2 text-center px-2 elip-text" title={this.convertDateStringToDate(p?.deal_end_date)}>
                                                {this.convertDateStringToDate(p?.deal_end_date)}
                                            </div>
                                            <div className="col-2 text-center px-2 elip-text" title={p?.sort_order}>
                                                {p?.sort_order}
                                            </div>
                                            <div className="col-1 px-2 text-center elip-text">
                                                {p?.is_active === true ? (
                                                    <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                                ) : (
                                                    <CancelOutlinedIcon className="cancel-icon" />
                                                )}
                                            </div>
                                            <div className="col-1 text-end">
                                                <RemoveRedEyeIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/deals/${p?.id}/view`);
                                                    }}
                                                />
                                                <EditOutlinedIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/deals/${p?.id}/edit`);
                                                    }}
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
