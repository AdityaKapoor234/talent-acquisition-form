import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

export default class ReviewList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            review: props?.review,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.review !== nextProps.review
        ) {
            return {
                review: nextProps?.review
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
                            <div className="col pe-1">Customer Name</div>
                            <div className="col px-2 text-center">Review Title</div>
                            <div className="col px-2 text-center">Rating</div>
                            <div className="col px-2 text-center">Review Date</div>
                            <div className="col-1 text-center">Verified</div>
                            <div className="col-1 text-end">Action</div>
                        </div>
                    </div>
                </div>
                {
                    this.state.review?.product_review && this.state.review?.total === 0 ? <div className="not-found">No Data Found</div> :
                        this.state.review?.product_review?.rating_detials?.map((p, index) => {
                            return (
                                <div className="row" key={index}>
                                    <div className="col-md-12">
                                        <div className="tableCell">
                                            <div className="tableBody pe-1 col elip-text" title={p?.user_name}>{p?.user_name}</div>
                                            <div className="col px-2 text-center elip-text" title={p?.review_title}>{p?.review_title}</div>
                                            <div className="col px-2 text-center elip-text" title={p?.rating}>
                                                <Rating
                                                    name="simple-controlled"
                                                    value={p?.rating}
                                                    precision={0.5}
                                                    readOnly
                                                    size="small"
                                                    icon={<StarIcon sx={{ color: "#ffcb45" }} fontSize="inherit" />}
                                                    emptyIcon={<StarIcon fontSize="inherit" />}

                                                // onChange={(event, newValue) => {
                                                //     setValue(newValue);
                                                // }}
                                                />

                                            </div>
                                            <div className="col px-2 text-center elip-text" title={this.convertDateStringToDate(p?.published_at)}>{this.convertDateStringToDate(p?.published_at)}</div>

                                            <div className="col-1 text-center">
                                                {p?.is_verified === true ? (
                                                    <CheckCircleOutlineOutlinedIcon className="check-icon" />
                                                ) : (
                                                    <CancelOutlinedIcon className="cancel-icon" />
                                                )}
                                            </div>
                                            <div className="col-1 text-end">
                                                <RemoveRedEyeIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/product-review/${p?.id}/view2`);
                                                    }}
                                                />
                                                <EditOutlinedIcon
                                                    className="edit-icon"
                                                    onClick={() => {
                                                        Router.push(`/product-review/${p?.id}/edit`);
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

