import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default class AffiliateMarketingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            affiliatemarketingview: props?.affiliatemarketingview,
            mode: props?.mode,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.affiliatemarketingview !== nextProps.view ||
            prevState.mode !== nextProps.mode
        ) {
            return {
                affiliatemarketingview: nextProps?.view,
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
                                Affiliate Marketing info
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
                                                    value={this.state.affiliatemarketingview?.company_name}
                                                    readOnly={true}
                                                />
                                            </div>

                                            <div className="login-form ">
                                                <label>Description<span className="mandatory-star">*</span></label>
                                                <textarea
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state. affiliatemarketingview?.description}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Enquiry<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state. affiliatemarketingview?.enquiry}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Contact Email.<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.affiliatemarketingview?.email}
                                                    readOnly={true}
                                                />
                                            </div>

                                            <div className="login-form ">
                                                <label>Mobile No.<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.affiliatemarketingview?.phone_no}
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
