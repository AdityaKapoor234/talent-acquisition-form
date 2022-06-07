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
import Photo from "../../common-component/photo";
import CertificationApi from "../../../services/certification";
import {PRODUCT_SERVICE} from "../../../utils/constant";
export default class CertificationCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            certification: props?.certification,
            mode: props?.mode,
            img_sm: "file-input-sm",
            img_lg: "file-input-lg",
            img_icon: "file-input-icon",
            input: {
                name: props?.certification?.name ? props?.certification?.name : "",
                content: props?.certification?.content ? props?.certification?.content : "",
                path: props?.certification?.path ? props?.certification?.path : "",
                is_trust_health: props?.certification?.is_trust_health ? props?.certification?.is_trust_health : false,
                is_active: props?.certification?.is_active ? props?.certification?.is_active : false,
                sort_order: props?.certification?.sort_order ? props?.certification?.sort_order : null,
                read_more_url: props?.certification?.read_more_url ? props?.certification?.read_more_url : "",
            },
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.certification !== nextProps.certification ||
            prevState.mode !== nextProps.mode
        ) {
            return {
                certification: nextProps?.certification,
                mode: nextProps?.mode,
                input: {
                    name: nextProps?.certification?.name ? nextProps?.certification?.name : "",
                    content: nextProps?.certification?.content ? nextProps?.certification?.content : "",
                    path: nextProps?.certification?.path ? nextProps?.certification?.path : "",
                    is_trust_health: nextProps?.certification?.is_trust_health ? nextProps?.certification?.is_trust_health : false,
                    is_active: nextProps?.certification?.is_active ? nextProps?.certification?.is_active : false,
                    sort_order: nextProps?.certification?.sort_order ? nextProps?.certification?.sort_order : null,
                    read_more_url: nextProps?.certification?.read_more_url ? nextProps?.certification?.read_more_url : "",
                },
            };
        }
        return null;
    }
    handleChange = (event) => {
        let input = this.state.input;
        if (event.target.name === "sort_order") {
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
                                Certification info
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
                                                    Name<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={this.state.input.name}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <Photo
                                            mode={this.state.mode}
                                            label={"Icon"}
                                            accept=".jpg,.jpeg,.png,.svg"
                                            name="path"
                                            img={this.state.input.path}
                                            setUrl={this.handlePhotoUrl.bind(this)}
                                            value={this.state.img_lg}
                                            urlLink={`${PRODUCT_SERVICE}/manage/category/photo/full_banner`}
                                        />
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="signup-check">
                                                <Checkbox
                                                    size="small"
                                                    style={{ color: "#012169" }}
                                                    checked={this.state.input.is_active}
                                                    name="is_active"
                                                    onChange={this.handleCheck.bind(this)}
                                                />
                                                <label>Active</label>
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
                                                    Name<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    readonly="readonly"
                                                    value={this.state.input?.name}
                                                />
                                                {console.log(this.state.input,"this.state.input")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <label>
                                                    Content<span className="mandatory-star">*</span>
                                                </label>
                                                <textarea
                                                    name="content"
                                                    cols="100"
                                                    rows="5"
                                                    readonly="readonly"
                                                    value={this.state.input.content}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <Photo
                                                    mode={this.state.mode}
                                                    label={"Icon"}
                                                    accept=".jpg,.jpeg,.png,.svg"
                                                    img={this.state.input.path}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="signup-check">
                                                <Checkbox
                                                    size="small"
                                                    style={{ color: "#012169" }}
                                                    checked={this.state.input.is_trust_health}
                                                />
                                                <label>Trusted Health</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="signup-check">
                                                <Checkbox
                                                    size="small"
                                                    style={{ color: "#012169" }}
                                                    checked={this.state.input.is_active}
                                                />
                                                <label>Active</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <label>
                                                    Display Order<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    readonly="sort_order"
                                                    value={this.state.input.sort_order}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <label>
                                                    Read More URL<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    readonly="readonly"
                                                    value={this.state.input.read_more_url}
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
