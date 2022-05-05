import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class TrustedHealthList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trustedHealth: props?.trustedHealth,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.trustedHealth !== nextProps.trustedHealth
        ) {
            return {
                trustedHealth: nextProps?.trustedHealth
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
                            <div className="col-2 pe-1">Name</div>
                            <div className="col px-2 text-center">Content</div>
                            <div className="col-1 px-2 text-center">Active</div>
                            <div className="col-1 text-end">Action</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.trustedHealth && this.state.trustedHealth.length === 0 ? <div className="not-found">No Data Found</div> :
                        this.state.trustedHealth?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody pe-1 col-2 elip-text" title={p?.name}>{p?.name}</div>
                                            <div className="col px-2 text-center elip-text" title={p?.content}>
                                                {p?.content}
                                            </div>
                                            <div className="col-1 px-2 text-center elip-text">
                                                {p?.is_trust_health === true ? (
                                                    <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                                ) : (
                                                    <CancelOutlinedIcon className="cancel-icon" />
                                                )}
                                            </div>
                                            <div className="col-1 text-end">
                                                <RemoveRedEyeIcon
                                                    className="view-icon"
                                                    onClick={() => {
                                                        Router.push(`/trusted-health/${p?.id}/view`);
                                                    }}
                                                />
                                                <EditOutlinedIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/trusted-health/${p?.id}/edit`);
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
