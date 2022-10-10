import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class SellerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seller: props?.seller,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.seller !== nextProps.seller
        ) {
            return {
                seller: nextProps?.seller
            };
        }
        return null;
    }

    render() {
        return (
            <div data-component="CustomerComponent">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tableRow">
                            <div className="col elip-text pe-1">Name</div>
                            <div className="col px-2 elip-text text-center">Email</div>
                            <div className="col px-2 elip-text text-center">Contact</div>
                            <div className="col px-2 elip-text text-center">Display Order</div>
                            <div className="col px-2 elip-text text-center">Status</div>
                            <div className="col-1 text-end">Action</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.seller && this.state.seller.length === 0 ? <div className="not-found">No Data Found</div> :
                        this.state.seller?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody pe-1 col elip-text" title={p?.name ? p?.name : "-"}>{p?.name ? p?.name : "-"}</div>
                                            <div className="col px-2 text-center elip-text" title={p?.email ? p?.email : "-"}>{p?.email ? p?.email : "-"}</div>
                                            <div className="col px-2 text-center elip-text" title={p?.phone_number ? p?.phone_number : "-"}>{p?.phone_number ? p?.phone_number : "-"}</div>
                                            <div className="col px-2 text-center elip-text" title={p?.sort_order ? p?.sort_order : "-"}>{p?.sort_order ? p?.sort_order : "-"}</div>
                                            <div className="col px-2 text-center elip-text" title={p?.status ? p?.status : "-"}>{p?.status ? p?.status : "-"}</div>
                                            <div className="col-1 text-end">
                                                <RemoveRedEyeIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/seller/${p?.id}/view`);
                                                    }}
                                                />
                                                <EditOutlinedIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/seller/${p?.id}/edit`);
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
