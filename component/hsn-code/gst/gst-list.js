import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EmailIcon from '@mui/icons-material/Email';
import Router from "next/router";

export default class GstList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gst: props?.gst,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.gst !== nextProps.gst) {
            return {
                gst: nextProps?.gst,
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
                            <div className="col-2 pe-1">HSN/SAC Code</div>
                            <div className="col px-2 text-center">Category Name</div>
                            <div className="col-1 px-2 text-center">CGST</div>
                            <div className="col-1 px-2 text-center">SGST</div>
                            <div className="col-1 px-2 text-center">IGST</div>
                            <div className="col-1 text-center">Active</div>
                            <div className="col-1 text-end">Action</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.gst && this.state.gst.length === 0 ? <div className="not-found">No Data Found</div> :
                        this.state.gst?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody pe-1 col-2 elip-text" title={p?.hsn_code}>{p?.hsn_code}</div>
                                            <div className="col text-center px-2 elip-text" title={p?.category_name}>{p?.category_name}</div>
                                            <div className="col-1 text-center px-2 elip-text" title={p?.cgst}>{p?.cgst}</div>
                                            <div className="col-1 text-center px-2 elip-text" title={p?.sgst}>{p?.sgst}</div>
                                            <div className="col-1 text-center px-2 elip-text" title={p?.igst}>{p?.igst}</div>
                                            <div className="col-1 text-center">
                                                {p?.is_active === true ? (
                                                    <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                                ) : (
                                                    <CancelOutlinedIcon className="cancel-icon" />
                                                )}
                                            </div>
                                            <div className="col-1 text-end">
                                                {/* <RemoveRedEyeIcon
                                                    className="view-icon"
                                                    onClick={() => {
                                                        Router.push(`/gst/${p?.id}/view`);
                                                    }}
                                                /> */}
                                                <EditOutlinedIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/gst/${p?.id}/edit`);
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
