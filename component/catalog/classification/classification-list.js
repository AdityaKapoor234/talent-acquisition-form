import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class ClassificationList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: props?.customer,
        };
    }

    render() {
        return (
            <div data-component="CustomerComponent">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tableRow">
                            <div className="col-1">Type</div>
                            <div className="col text-center">Name</div>
                            <div className="col-1 text-center">Active</div>
                            <div className="col-2 text-center">Display Order</div>
                            <div className="col-1 text-end">View</div>
                            <div className="col-1 text-end">Edit</div>
                        </div>
                    </div>
                </div>
                {this.state.customer?.map((p, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="col-md-12">
                                <div className="tableCell">
                                    <div className="tableBody col-1">{p?.type}</div>
                                    <div className=" col text-center">{p?.name}</div>
                                    <div className="col-1 text-center">
                                        {p?.active === true ? (
                                            <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                        ) : (
                                            <CancelOutlinedIcon className="cancel-icon" />
                                        )}
                                    </div>
                                    <div className="col-2 text-center">{p?.display}</div>
                                    <div className="col-1 text-end">
                                        <RemoveRedEyeIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/classification/${p?.id}/view`);
                                            }}
                                        />
                                    </div>
                                    <div className="col-1 text-end">
                                        <EditOutlinedIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/classification/${p?.id}/edit`);
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
