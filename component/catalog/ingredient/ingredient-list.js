import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class IngredientList extends Component {
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
                            <div className="col-5">Name</div>
                            <div className="col text-center">Active</div>
                            <div className="col text-center">Display Order</div>
                            <div className="col-1 text-center">View</div>
                            <div className="col-1 text-end">Edit</div>
                        </div>
                    </div>
                </div>
                {this.state.customer?.map((p, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="col-md-12">
                                <div className="tableCell">
                                    <div className="tableBody col-5">{p?.name}</div>
                                    <div className="col text-center">
                                        {p?.active === true ? (
                                            <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                        ) : (
                                            <CancelOutlinedIcon className="cancel-icon" />
                                        )}
                                    </div>
                                    <div className="col text-center">{p?.display}</div>
                                    <div className="col-1 text-center">
                                        <RemoveRedEyeIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/ingredient/${p?.id}/view`);
                                            }}
                                        />
                                    </div>
                                    <div className="col-1 text-end">
                                        <EditOutlinedIcon
                                                           className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/ingredient/${p?.id}/edit`);
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
