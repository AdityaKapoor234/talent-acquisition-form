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

export default class BrandCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            tab: 1,
            customer: props?.customer,
            mode: props?.mode,
            short_description: "",
            full_description: "",
            sort: "cat",
            brand:props?.brand,
            name:props?.brand?.name?props.brand?.name:"",
            display: props?.brand?.display?props.brand?.display:"",
            id:props?.brand?.id?props.brand?.id:"",
        };
    }
    handleChange = (event) => {
        this.setState({ sort: event.target.value });
    };
    handleContent(value) {
        console.log("value.js", value);
    }
    handleFullContent(value) {
        console.log("value.js", value);
    }
    handleFullContent(value) {
        console.log("value.js", value);
    } 
    

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
                                Brand Info
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
                                                <input type="text" value={this.state.name} onChange={(event)=>{this.setState({name:event.target.value})}}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <label>
                                                    Display Order<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    value={this.state.display}
                                                    onChange={(event) => { this.setState({ display: event.target.value }) }}
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
                                                    Name<span className="mandatory-star">*</span>
                                                </label>
                                                <input type="text" value={this.state.brand?.name} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <label>
                                                    Display Order<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    value={this.state.brand?.display}
                                                />
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
