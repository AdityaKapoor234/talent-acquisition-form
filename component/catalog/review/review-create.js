import React, { Component } from "react";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo";
import { PRODUCT_SERVICE } from "../../../utils/constant";
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import cookie from "js-cookie";
import axios from "axios";

export default class ReviewCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            mode: props?.mode,
            createMode: props?.createMode,
            changePic: false,
            review: props?.review,
            img_sm: "file-input-sm",
            img_lg: "file-input-lg",
            img_icon: "file-input-icon",
            input: {
                rating: props?.review?.rating ? props.review?.rating : "",
                review_title: props?.review?.review_title ? props.review?.review_title : "",
                review: props?.review?.review ? props.review?.review : "",
                images: props?.review?.images ? props.review?.images : [],
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
                createMode: nextProps?.createMode,
                changePic: false,
                input: {
                    rating: nextProps?.review?.rating ? nextProps.review?.rating : "",
                    review_title: nextProps?.review?.review_title ? nextProps.review?.review_title : "",
                    review: nextProps?.review?.review ? nextProps.review?.review : "",
                    images: nextProps?.review?.images ? nextProps.review?.images : [],
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
        // if (event.target.name === "rating") {
        //     input[event.target.name] = event.target.value.replace(/[^\d]/, "");
        // } else {
        input[event.target.name] = event.target.value;
        // }
        this.setState({ input });
        this.props?.handle(input);
    };
    // handleCheck = (event) => {
    //     let input = this.state.input;
    //     input[event.target.name] = event.target.checked;
    //     this.setState({ input });
    //     this.props?.handle(input);
    // };
    // handlePhotoUrl = (name, url) => {
    //     let input = this.state.input;
    //     input[name] = url;
    //     input[name] = [];
    //     input[name].push(url);
    //     this.setState({ input });
    //     this.props?.handle(input);

    // };

    uploadFile = ({ target: { files } }) => {
        if (files?.length > 0) {
            if (this.state.input.images?.length < 6) {
                const formData = new FormData();
                formData.append("media", files[0]);
                const token = cookie.get("access_token_admin");
                const headers = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                axios
                    .put(`${PRODUCT_SERVICE}/manage/category/photo/icon`, formData, headers)
                    .then((response) => {
                        let input = this.state.input;
                        // input["images"] = [];
                        input["images"].push(
                            response.data.data?.url
                        )
    
                        this.setState({ input });
                        this.props?.handle(input);
    
                    })
                    .catch((error) => {
                        this.setState({ isLoader: false })
                        toast.error(error);
                    });    
            }
            else {
                toast.error("Not more than 6 files can be uploaded");
            }
        }
    }

    handleCheck = (event) => {
        let list = this.state.input.images
        let objIndex = list.findIndex((obj => obj.id === parseInt(event?.target?.value)));
        list[objIndex]["images"] = event?.target?.checked;
        this.setState({ input: { images: list } })
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

    // componentDidMount(){
    //     this.setState({changePic: false})
    // }


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
                        {this.state.mode === "edit" && (
                            <div className="row sticky-scroll scroll">
                                <div className="col">
                                    <div className="row mt-4">
                                        <div className="col-md-4">
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
                                                <br />
                                                <Rating
                                                    name="rating"
                                                    value={this.state.input?.rating}
                                                    precision={0.5}
                                                    // readOnly
                                                    size="large"
                                                    icon={<StarIcon sx={{ color: "#ffcb45" }} fontSize="inherit" />}
                                                    emptyIcon={<StarIcon fontSize="inherit" />}
                                                    onChange={(event, newValue) => {
                                                        let input = this.state.input;
                                                        input["rating"] = newValue;
                                                        this.setState({ input });
                                                        this.props?.handle(input);
                                                    }}
                                                />
                                            </div>
                                            <div className="login-form">

                                                {this.state.changePic === false ?
                                                    <>
                                                        {this.state.input["images"] = []}
                                                        {this.setState({ changePic: true })}
                                                    </>
                                                    :
                                                    ""
                                                }
                                                <div data-component="product-photo-edit" className='product-tabbed-editor'>
                                                    <div className='photo-upload-list d-flex flex-wrap'>
                                                        {
                                                            this.state.input.images.map((p, i) => {
                                                                return <div key={i} className='photo-upload-box'>
                                                                    <div className='preview-img' style={{ backgroundImage: 'url(' + p + ')' }}>
                                                                    </div>
                                                                </div>
                                                            })
                                                        }

                                                        <div className='photo-upload-box photo-uplaod'>
                                                            <input id="img" type="file" accept={".png,.jpg,.jpeg"} onChange={this.uploadFile} style={{ display: "none" }} />
                                                            <label for="img" className="file" >Choose File</label>
                                                        </div>
                                                    </div>
                                                </div>
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
                                                <br />
                                                <Rating
                                                    name="rating"
                                                    value={this.state.input?.rating}
                                                    precision={0.5}
                                                    size="large"
                                                    readonly
                                                    icon={<StarIcon sx={{ color: "#ffcb45" }} fontSize="inherit" />}
                                                    emptyIcon={<StarIcon fontSize="inherit" />}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            {
                                                this.state.input?.images?.length > 0 ?
                                                    <div className="login-form">
                                                        {
                                                            this.state.input?.images?.length > 0 ?
                                                                <>
                                                                    <label>
                                                                        Images
                                                                    </label>
                                                                    <div className="row">
                                                                        {
                                                                            this.state.input?.images?.map(elem => {
                                                                                return (
                                                                                    <>
                                                                                        {/* <img src="/images/product5.png" alt="img-fluid" /> */}
                                                                                        <div className="col-6">
                                                                                            <img
                                                                                                src={elem?.images}
                                                                                                className="mb-3"
                                                                                                style={{ width: "auto", height: "300px" }}
                                                                                            />
                                                                                        </div>
                                                                                        {/* <Photo
                                                                            mode={this.state.mode}
                                                                            label={""}
                                                                            accept=".jpg,.jpeg,.png"
                                                                            img={elem?.images}
                                                                        /> */}
                                                                                    </>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>

                                                                </>
                                                                :
                                                                <div className="login-form ">
                                                                    <label>
                                                                        No Images
                                                                    </label>
                                                                </div>
                                                        }
                                                    </div>

                                                    :
                                                    ""
                                            }

                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-4">

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
