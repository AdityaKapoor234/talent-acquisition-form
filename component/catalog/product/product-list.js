import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class ProductList extends Component {
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
                            <div className="col-4">Name</div>
                            <div className="col">Product Code</div>
                            <div className="col">Stock Quantity</div>
                            <div className="col">Product Type</div>
                            <div className="col text-center">Status</div>
                            <div className="col text-end">Action</div>
                        
                        </div>
                    </div>
                </div>
                {this.state.customer?.map((p, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="col-md-12">
                                <div className="tableCell">
                                    <div className="tableBody col-4">{p?.name}</div>
                                    <div className="tableBody col text-center">{p?.productcode}</div>
                                    <div className="tableBody col text-center">{p?.stockquantity}</div>
                                    <div className="tableBody col text-center">{p?.producttype}</div>
                                    <div className="col text-center">
                                        {p?.status === true ? (
                                            <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                        ) : (
                                            <CancelOutlinedIcon className="cancel-icon" />
                                        )}
                                    </div>
                                    <div className="col text-end">
                                        <RemoveRedEyeIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/product/${p?.id}/view`);
                                            }}
                                        />
                                        <EditOutlinedIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/product/${p?.id}/edit`);
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
