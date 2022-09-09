import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default class BulkBuysView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            bulkbuyview: props?.bulkbuyview,
            mode: props?.mode,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.bulkbuyview !== nextProps.bulkbuyview ||
            prevState.mode !== nextProps.mode
        ) {
            return {
                bulkbuyview: nextProps?.bulkbuyview,
                mode: nextProps?.mode,
            };
        }
        return null;
    }



    render() {
        return (
            <div data-component="edit-customer">
                <div className="row">
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
                                Bulk Buys info
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.tab === 1 && (
                    <>
                        {this.state.mode === "view" && (
                            <div className="row sticky-scroll scroll">
                                <div className="col">
                                    <div className="row mt-4">
                                        <div className="col-md-4">
                                            <div className="login-form ">
                                                <label>Company Name<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.bulkbuyview?.company_name}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Name<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.bulkbuyview?.name}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Email<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.bulkbuyview?.email}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Contact No.<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.bulkbuyview?.phone_no}
                                                    readOnly={true}
                                                />
                                            </div>

                                            <div className="login-form ">
                                                <label>Address.<span className="mandatory-star">*</span></label>
                                                <textarea
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state.bulkbuyview?.address}
                                                    readOnly={true}
                                                />
                                            </div>

                                            <div className="login-form ">
                                                <label>State.<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.bulkbuyview?.state}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div>
                                                <span className="login-form">
                                                    <label>City.<span className="mandatory-star">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={this.state.bulkbuyview?.city}
                                                        readOnly={true}
                                                    />
                                                </span>

                                                <span className="login-form ">
                                                    <label>PinCode.<span className="mandatory-star">*</span></label>
                                                    <input
                                                        type="text"
                                                        value={this.state.bulkbuyview?.pin_code}
                                                        readOnly={true}
                                                    />
                                                </span>
                                            </div>
                                            <div className="login-form ">
                                                <label>Brief Description for Purchase<span className="mandatory-star">*</span></label>
                                                <textarea
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state.bulkbuyview?.purchase_desc}
                                                    readOnly={true}
                                                />
                                            </div>

                                            <div className="login-form ">
                                                <label>Products Order<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.bulkbuyview?.order_product}
                                                    readOnly={true}
                                                />
                                            </div>

                                            <div className="login-form ">
                                                <label>Quantity required<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.bulkbuyview?.quantity_required}
                                                    readOnly={true}
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
