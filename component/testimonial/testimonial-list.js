import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class TestimonialList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testimonial: props?.testimonial,
            testimonialCategoryDropdown: props?.testimonialCategoryDropdown,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.testimonial !== nextProps.testimonial ||
            prevState.testimonialCategoryDropdown !== nextProps.testimonialCategoryDropdown
        ) {
            return {
                testimonial: nextProps?.testimonial,
                testimonialCategoryDropdown: nextProps?.testimonialCategoryDropdown,
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
                            <div className="col pe-1">Name</div>
                            <div className="col px-2 text-center">Designation</div>
                            <div className="col px-2 text-center">Category</div>
                            <div className="col-2 px-2 text-center">Display Order</div>
                            <div className="col-1 text-center">Active</div>
                            <div className="col-1 text-end">Action</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.testimonial && this.state.testimonial.length === 0 ? <div className="not-found">No Data Found</div> :
                        this.state.testimonial?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody pe-1 col elip-text" title={p?.name}>{p?.name}</div>
                                            <div className="col px-2 text-center elip-text" title={p?.designation}>{p?.designation}</div>
                                            <div className="col px-2 text-center elip-text" title={this.state.testimonialCategoryDropdown?.filter(val=>val.id===p?.category_id)?.map(val => val?.name)}>
                                                {
                                                    this.state.testimonialCategoryDropdown?.filter(val=>val.id===p?.category_id)?.map(val => val?.name)
                                                }
                                            </div>
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
                                                        Router.push(`/testimonial/${p?.id}/view`);
                                                    }}
                                                />
                                                <EditOutlinedIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/testimonial/${p?.id}/edit`);
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
