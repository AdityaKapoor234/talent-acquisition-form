import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo";
import Review from "../../../pages/review/index"


export default class ReviewCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            mode: props?.mode,
            review: props?.review,
            img_sm: "file-input-sm",
            img_lg: "file-input-lg",
            img_icon: "file-input-icon",
            input: {
                rating: props?.review?.rating ? props.review?.rating : "",
                review_title: props?.review?.review_title ? props.review?.review_title : "",
                review: props?.review?.review ? props.review?.review : "",
                img_urls: props?.review?.img_urls ? props.review?.img_urls : [],
                user_id: props?.review?.user_id ? props.review?.user_id : null,
                product_id: props?.review?.product_id ? props.review?.product_id : null,
                is_verified: props?.review?.is_verified ? props.review?.is_verified : false,
                published_at: props?.review?.published_at ? props.review?.published_at : "",
                user_name: props?.review?.user_name ? props.review?.user_name : "",
            },
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.review !== nextProps.review ||
            prevState.mode !== nextProps.mode
        ) {
            return {
                review: nextProps?.review,
                mode: nextProps?.mode,
                input: {
                    rating: nextProps?.review?.rating ? nextProps.review?.rating : "",
                    review_title: nextProps?.review?.review_title ? nextProps.review?.review_title : "",
                    review: nextProps?.review?.review ? nextProps.review?.review : "",
                    img_urls: nextProps?.review?.img_urls ? nextProps.review?.img_urls : [],
                    user_id: nextProps?.review?.user_id ? nextProps.review?.user_id : null,
                    product_id: nextProps?.review?.product_id ? nextProps.review?.product_id : null,
                    is_verified: nextProps?.review?.is_verified ? nextProps.review?.is_verified : false,
                    published_at: nextProps?.review?.published_at ? nextProps.review?.published_at : "",
                    user_name: nextProps?.review?.user_name ? nextProps.review?.user_name : "",
                },
            };
        }
        return null;
    }
    handleChange = (event) => {
        let input = this.state.input;
        if (event.target.name === "rating") {
            input[event.target.name] = event.target.value.replace(/[^\d]/, "");
        } else {
            input[event.target.name] = event.target.value;
        }
        this.setState({ input });
        this.props?.handle(input);
    };
    handleCheck = (event) => {
        let input = this.state.input;
        input[event.target.name] = event.target.checked;
        this.setState({ input });
        this.props?.handle(input);
    };
    handlePhotoUrl = (name, url) => {
        let input = this.state.input;
        input[name] = url;
        this.setState({ input });
        this.props?.handle(input);
    };

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
        let str =
            date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
        return str;
    };


    render() {
        return (
            <div data-component="edit-category">
                <div className="row ">
                    <div className="col-md-12">
                        <div className="tab">
                            <div
                                className={
                                    this.state.tab === 1 ? `sub-tab active-tab` : "sub-tab"
                                }
                                onClick={() => {
                                    this.setState({ tab: 1 });
                                }}
                            >
                                Review Info
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.tab === 1 && (
                    <>
                    <Review/>
                        {this.state.mode === "edit" && (
                            <div className="row sticky-scroll scroll">
                                <div className="col">
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <label>
                                                    User Name<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="user_name"
                                                    value={this.state.input.user_name}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>
                                                    Review Title<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="review_title"
                                                    value={this.state.input.review_title}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>
                                                    Review<span className="mandatory-star">*</span>
                                                </label>
                                                <textarea
                                                    name="review"
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state.input.review}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>
                                                    Rating<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="5"
                                                    name="rating"
                                                    value={this.state.input?.rating}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                            </div>
                                            {/* <div className="mt-4">
                                                <label>
                                                    Images
                                                </label>
                                                <Photo
                                                    mode={this.state.mode}
                                                    label={""}
                                                    accept=".jpg,.jpeg,.png"
                                                    name="img_urls"
                                                    img={this.state.input?.img_urls}
                                                    setUrl={this.handlePhotoUrl.bind(this)}
                                                    value={this.state.img_icon}
                                                    urlLink="http://65.1.17.188:5001/manage/category/photo/icon"
                                                />
                                            </div> */}
                                            <div className="login-form ">
                                                <label>
                                                    Review Date<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="published_at"
                                                    value={this.state.input.published_at ? this.convertDateStringToDate(this.state.input.published_at) : ""}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                            </div>
                                            <div className="signup-check mt-4">
                                                <Checkbox
                                                    size="small"
                                                    style={{ color: "#012169" }}
                                                    checked={this.state.input?.is_verified}
                                                    name="is_verified"
                                                    onChange={this.handleCheck.bind(this)}
                                                />
                                                <label>Verified</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {this.state.mode === "view" && (
                            <div className="row sticky-scroll scroll">
                                <div className="col">
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <label>
                                                    User Name<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.input.user_name}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>
                                                    Review Title<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={this.state.input.review_title}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>
                                                    Review<span className="mandatory-star">*</span>
                                                </label>
                                                <textarea
                                                    name="review"
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state.input.review}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>
                                                    Rating<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="5"
                                                    name="rating"
                                                    value={this.state.input?.rating}
                                                    readOnly={true}
                                                />
                                            </div>
                                            {/* <div className="mt-4">
                                                <label>
                                                    Images
                                                </label>
                                                <Photo
                                                    mode={this.state.mode}
                                                    label={""}
                                                    accept=".jpg,.jpeg,.png"
                                                    img={this.state.input?.img_urls}
                                                />
                                            </div> */}
                                            <div className="login-form ">
                                                <label>
                                                    Review Date<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="published_at"
                                                    value={this.state.input.published_at ? this.convertDateStringToDate(this.state.input.published_at) : ""}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="signup-check mt-4">
                                                <Checkbox
                                                    size="small"
                                                    style={{ color: "#012169" }}
                                                    checked={this.state.input?.is_verified}
                                                    disabled
                                                />
                                                <label>Verified</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }
}
