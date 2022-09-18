import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";
import Photo from "../banner/banner-photo";

export default class certificationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            certification: props?.certification,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.certification !== nextProps.certification
        ) {
            return {
                certification: nextProps?.certification
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
                            <div className="col-2 pe-1">Icon</div>
                            <div className="col text-center">Name</div>
                            <div className="col text-center">Certificate No.</div>
                            <div className="col text-center">Display Order</div>
                            {/* <div className="col-2 text-center">Trusted Health</div> */}
                            <div className="col text-center">Active</div>
                            <div className="col-1 text-end">Action</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.certification && this.state.certification.length === 0 ? <div className="not-found">No Data Found</div> :
                        this.state.certification?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody pe-1 col-2 elip-text">
                                                <Photo
                                                    mode={"view"}
                                                    label={"Icon"}
                                                    accept=".jpg,.jpeg,.png,.svg"
                                                    img={p?.path}
                                                />
                                            </div>
                                            <div className="col text-center elip-text px-2" title={p?.name}>{p?.name}</div>
                                            <div className="col text-center elip-text px-2" title={p?.certificate_number}>{p?.certificate_number ? p?.certificate_number : "-"}</div>
                                            <div className="col text-center elip-text px-2" title={p?.sort_order}>{p?.sort_order}</div>
                                            {/* <div className="col text-center">
                                                {p?.is_trust_health === true ? (
                                                    <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                                ) : (
                                                    <CancelOutlinedIcon className="cancel-icon" />
                                                )}
                                            </div> */}
                                            <div className="col text-center">
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
                                                        Router.push(`/certification/${p?.id}/view`);
                                                    }}
                                                />
                                                <EditOutlinedIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/certification/${p?.id}/edit`);
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

