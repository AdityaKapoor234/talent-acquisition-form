import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
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

export default class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            tab: 1,
            mode: props?.mode,
            name: props?.product?.name ? props.product?.name : "",
            type: props?.product?.type ? props.product?.type : "",
        };
    }
    handleChange = (event) => {
        this.setState({ type: event.target.value });
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
                                Product info
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.tab === 1 && (
                    <>
                        {this.state.mode === "edit" && (
                            <>
                                <div className="row sticky-scroll scroll">
                                    <div className="col">
                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <div className="sort ">
                                                    <label>
                                                        Product Type<span className="mandatory-star">*</span>
                                                    </label>
                                                    <div className="sort-by-select-wrapper">
                                                        <Select
                                                            disableUnderline
                                                            variant="standard"
                                                            autoWidth={true}
                                                            IconComponent={ExpandMoreIcon}
                                                            name="sort"
                                                            onChange={this.handleChange}
                                                            className="sort-by-select"
                                                            value={this.state.type}
                                                        >
                                                            <MenuItem
                                                                value={"cat"}
                                                                disabled
                                                                className="field_toggle_checked"
                                                            >
                                                                Select Type{" "}
                                                            </MenuItem>
                                                            <MenuItem value={"Regular Product"}>Regular Product</MenuItem>
                                                            <MenuItem value={"Product with Varient"}>Product with Varient</MenuItem>
                                                            <MenuItem value={"Variant"}>Variant</MenuItem>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <div className="login-form ">
                                                    <label>
                                                        Name<span className="mandatory-star">*</span>
                                                    </label>
                                                    <input type="text" value={this.state.name} onChange={(event) => { this.setState({ name: event.target.value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {this.state.mode === "view" && (
                            <>
                                <div className="row sticky-scroll scroll">
                                    <div className="col">
                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <div className="login-form ">
                                                    <label>
                                                        Product Type<span className="mandatory-star">*</span>
                                                    </label>
                                                    <input type="text" readonly="readonly" value={this.state.type} onChange={(event) => { this.setState({ type: event.target.value }) }}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col-md-4">
                                                <div className="login-form ">
                                                    <label>
                                                        Name<span className="mandatory-star">*</span>
                                                    </label>
                                                    <input type="text" readonly="readonly" value={this.state.name} />
                                                </div>
                                            </div>
                                        </div>                             
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        );
    }
}
