import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";
import Photo from "../cms/banner/banner-photo";

export default class TestimonialGalleryList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            testimonialGallery: props?.testimonialGallery,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.testimonialGallery !== nextProps.testimonialGallery
        ) {
            return {
                testimonialGallery: nextProps?.testimonialGallery
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
                            <div className="col pe-1">Title</div>
                            <div className="col text-center">Active</div>
                            <div className="col-1 text-center">View</div>
                            <div className="col-1 text-end">Edit</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.testimonialGallery && this.state.testimonialGallery.length === 0 ? <div className="not-found">No Data Found</div> :
                        this.state.testimonialGallery?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            {/* <div className="tableBody pe-1 col-2 elip-text">
                                                <Photo
                                                    mode={"view"}
                                                    label={"Icon"}
                                                    accept=".jpg,.jpeg,.png"
                                                    img={p?.img_url}
                                                />
                                            </div> */}
                                            <div className="tableBody pe-1 col elip-text" title={p?.name}>{p?.name}</div>
                                            <div className="col text-center">
                                                {p?.is_active === true ? (
                                                    <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                                ) : (
                                                    <CancelOutlinedIcon className="cancel-icon" />
                                                )}
                                            </div>
                                            <div className="col-1 text-center">
                                                <RemoveRedEyeIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/testimonial-gallery/${p?.id}/view`);
                                                    }}
                                                />
                                            </div>
                                            <div className="col-1 text-end">
                                                <EditOutlinedIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/testimonial-gallery/${p?.id}/edit`);
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

