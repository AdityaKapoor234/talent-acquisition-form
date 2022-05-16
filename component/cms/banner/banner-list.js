import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";
import Photo from "../banner/banner-photo";

export default class BannerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            banner: props?.banner,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.banner !== nextProps.banner
        ) {
            return {
                banner: nextProps?.banner
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
                            <div className="col-2 pe-1">Banner</div>
                            {/* <div className="col text-center">Banner Type</div> */}
                            <div className="col text-center">Title</div>
                            <div className="col-2 px-2 text-center">Display Order</div>
                            <div className="col-1 text-center">Active</div>
                            <div className="col-1 text-end">Action</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.banner && this.state.banner.length === 0 ? <div className="not-found">No Data Found</div> :
                        this.state.banner?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody pe-1 col-2 elip-text">
                                                <Photo
                                                    mode={"view"}
                                                    label={"Icon"}
                                                    accept=".jpg,.jpeg,.png"
                                                    img={p?.banner}
                                                />
                                            </div>
                                            {/* <div className="col text-center">
                                                {p?.is_active === true ? (
                                                    <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                                ) : (
                                                    <CancelOutlinedIcon className="cancel-icon" />
                                                )}
                                            </div> */}
                                            <div className="col text-center" title={p?.name}>{p?.name}</div>
                                            <div className="col-2 px-2 text-center elip-text" title={p?.sort_order}>{p?.sort_order}</div>
                                            <div className="col-1 text-center">
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
                                                        Router.push(`/banner/${p?.id}/view`);
                                                    }}
                                                />
                                                <EditOutlinedIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/banner/${p?.id}/edit`);
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

