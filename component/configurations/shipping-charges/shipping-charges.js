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
import { PRODUCT_SERVICE } from "../../../utils/constant";
export default class ShippingChargesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            shippingCharges: props?.shippingCharges,
            mode: props?.mode,
            img_sm: "file-input-sm",
            img_lg: "file-input-lg",
            img_icon: "file-input-icon",
            input: {
                shipping_fee: props?.shippingCharges?.shipping_fee ? props?.shippingCharges?.shipping_fee : null,
                shipping_fee_breakout: props?.shippingCharges?.shipping_fee_breakout ? props?.shippingCharges?.shipping_fee_breakout : null,
            },
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.shippingCharges !== nextProps.shippingCharges ||
            prevState.mode !== nextProps.mode
        ) {
            return {
                shippingCharges: nextProps?.shippingCharges,
                mode: nextProps?.mode,
                input: {
                    shipping_fee: nextProps?.shippingCharges?.shipping_fee ? nextProps?.shippingCharges?.shipping_fee : null,
                    shipping_fee_breakout: nextProps?.shippingCharges?.shipping_fee_breakout ? nextProps?.shippingCharges?.shipping_fee_breakout : null,
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
                                Shipping Charges info
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
                                                    Shipping Fee<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    name="shipping_fee"
                                                    value={this.state.input.shipping_fee}
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>
                                                    Shipping Fee Breakout<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    min={0}
                                                    name="shipping_fee_breakout"
                                                    value={this.state.input.shipping_fee_breakout}
                                                    onChange={this.handleChange.bind(this)}
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
                                                    Shipping Fee<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name="shipping_fee"
                                                    value={this.state.input.shipping_fee}
                                                    readOnly="readonly"
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>
                                                    Shipping Fee Breakout<span className="mandatory-star">*</span>
                                                </label>
                                                <input
                                                    type="number"
                                                    name="shipping_fee_breakout"
                                                    value={this.state.input.shipping_fee_breakout}
                                                    readOnly="readonly"
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
