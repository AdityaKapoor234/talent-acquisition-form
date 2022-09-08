import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import ArticleEditor from "../../common-component/text-editer";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Photo from "../../common-component/photo-non-merge";
import CertificationApi from "../../../services/certification";
import {PRODUCT_SERVICE} from "../../../utils/constant";
export default class CheckMySupplementComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            checkMySupplement: props?.checkMySupplement,
            mode: props?.mode,
            img_sm: "file-input-sm",
            img_lg: "file-input-lg",
            img_icon: "file-input-icon",
            input: {
                banner: props?.checkMySupplement?.banner ? props?.checkMySupplement?.banner : "",
                createdAt: props?.checkMySupplement?.created_at ? props?.checkMySupplement?.created_at : null,
                deletedAt: props?.checkMySupplement?.deleted_at ? props?.checkMySupplement?.deleted_at : null,
                description: props?.checkMySupplement?.description ? props?.checkMySupplement?.description : "",
                id: props?.checkMySupplement?.id ? props?.checkMySupplement?.id : 1,
                short_description: props?.checkMySupplement?.short_description ? props?.checkMySupplement?.short_description : "",
	            sm_banner: props?.checkMySupplement?.sm_banner ? props?.checkMySupplement?.sm_banner : "",
                sortOrder: props?.checkMySupplement?.sort_order ? props?.checkMySupplement?.sort_order : null,
                title: props?.checkMySupplement?.title ? props?.checkMySupplement?.title : null,
                updatedAt: props?.checkMySupplement?.updated_at ? props?.checkMySupplement?.updated_at : null,
            },
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.checkMySupplement !== nextProps.checkMySupplement ||
            prevState.mode !== nextProps.mode
        ) {
            return {
                checkMySupplement: nextProps?.checkMySupplement,
                mode: nextProps?.mode,
                input: {
                    banner: nextProps?.checkMySupplement?.banner ? nextProps?.checkMySupplement?.banner : "",
                    createdAt: nextProps?.checkMySupplement?.created_at ? nextProps?.checkMySupplement?.created_at : null,
                    deletedAt: nextProps?.checkMySupplement?.deleted_at ? nextProps?.checkMySupplement?.deleted_at : null,
                    description: nextProps?.checkMySupplement?.description ? nextProps?.checkMySupplement?.description : "",
                    id: nextProps?.checkMySupplement?.id ? nextProps?.checkMySupplement?.id : 1,
                    short_description: nextProps?.checkMySupplement?.short_description ? nextProps?.checkMySupplement?.short_description : "",
                    sm_banner: nextProps?.checkMySupplement?.sm_banner ? nextProps?.checkMySupplement?.sm_banner : "",
                    sortOrder: nextProps?.checkMySupplement?.sort_order ? nextProps?.checkMySupplement?.sort_order : null,
                    title: nextProps?.checkMySupplement?.title ? nextProps?.checkMySupplement?.title : null,
                    updatedAt: nextProps?.checkMySupplement?.updated_at ? nextProps?.checkMySupplement?.updated_at : null,
                },
            };
        }
        return null;
    }
    handleChange = (event) => {
        let tmp_input = this.state.input;
        tmp_input[event.target.name] = event.target.value;

        this.setState({ input: tmp_input });
        this.props?.handle(tmp_input);
    };

    handlePhotoUrl = (name, url) => {
        let tmp_input = this.state.input;
        tmp_input[name] = url;
        
        this.setState({ input: tmp_input });
        this.props?.handle(tmp_input);
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
                                Check My Supplement info
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
                                                  Full Description<span className="mandatory-star">*</span>
                                                </label>
                                                <textarea
                                                  cols="100"
                                                  rows="5"
                                                  name="description"
                                                  value={this.state.input.description}
                                                  onChange={this.handleChange.bind(this)}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>
                                                Short Description<span className="mandatory-star">*</span>
                                                </label>
                                                <textarea
                                                cols="100"
                                                rows="5"
                                                name="short_description"
                                                value={this.state.input.short_description}
                                                onChange={this.handleChange.bind(this)}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Photo
                                                mode= "edit"
                                                label={"Banner"}
                                                accept=".jpg,.jpeg,.png"
                                                name="banner"
                                                img={this.state.input.banner}
                                                setUrl={this.handlePhotoUrl.bind(this)}
                                                value={this.state.img_lg}
                                                urlLink={`${PRODUCT_SERVICE}/manage/category/photo/banner`}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <Photo
                                                mode= "edit"
                                                label={"Short Banner"}
                                                accept=".jpg,.jpeg,.png"
                                                name="sm_banner"
                                                img={this.state.input.sm_banner}
                                                setUrl={this.handlePhotoUrl.bind(this)}
                                                value={this.state.img_sm}
                                                urlLink={`${PRODUCT_SERVICE}/manage/category/photo/banner`}
                                                />
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
                                                  Full Description<span className="mandatory-star">*</span>
                                                </label>
                                                <textarea
                                                  cols="100"
                                                  rows="5"
                                                  readOnly="readonly"
                                                  value={this.state.input?.description}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <label>
                                                Short Description<span className="mandatory-star">*</span>
                                                </label>
                                                <textarea
                                                cols="100"
                                                rows="5"
                                                readOnly="readonly"
                                                value={this.state.input?.short_description}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="mb-4">
                                                <Photo
                                                mode= "view"
                                                label={"Banner"}
                                                accept=".jpg,.jpeg,.png"
                                                img={this.state.input.banner}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="mb-4">
                                                <Photo
                                                mode= "view"
                                                label={"Short Banner"}
                                                accept=".jpg,.jpeg,.png"
                                                img={this.state.input.sm_banner}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )
                }
            </div>
        );
    }
}
