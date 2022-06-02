import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Photo from "../common-component/photo";

export default class EmailSupportView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            view: props?.view,
            mode: props?.mode,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.view !== nextProps.view ||
            prevState.mode !== nextProps.mode
        ) {
            return {
                view: nextProps?.view,
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
                                Email Support info
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
                                                <label>Name<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.view?.email_support?.name}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Email<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.view?.email_support?.email}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Category<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.view?.email_support?.category}
                                                    readOnly={true}
                                                />
                                            </div>

                                            {/* <div className="login-form ">
                                                <label>Address.<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.bulkbuyview?.address}
                                                    readOnly={true}
                                                />
                                            </div> */}
                                            {/* 
                                            <div className="login-form ">
                                                <label>State.<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.bulkbuyview?.state}
                                                    readOnly={true}
                                                />
                                            </div> */}
                                            {/* <div>
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
                                            </div> */}
                                            <div className="login-form ">
                                                <label>Brief Description <span className="mandatory-star">*</span></label>
                                                <textarea
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state.view?.email_support?.customer_query}
                                                    readOnly={true}
                                                />
                                            </div>

                                            <div className="login-form ">

                                                {
                                                    this.state.view?.screen_shots?.length > 0 ?
                                                        <>
                                                            <label>Screenshots <span className="mandatory-star">*</span></label>
                                                            {this.state.view?.screen_shots?.map(elem => {
                                                                return (
                                                                    <>
                                                                        <Photo
                                                                            mode={this.state.mode}
                                                                            label={""}
                                                                            accept=".jpg,.jpeg,.png"
                                                                            img={elem?.images_url}
                                                                        />
                                                                    </>
                                                                )
                                                            })}
                                                        </>
                                                        :
                                                        <div className="login-form ">
                                                            <label>No Screenshots <span className="mandatory-star">*</span></label>
                                                        </div>
                                                }
                                            </div>


                                            {/* <div className="login-form ">
                                                <label>Quantity required<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.bulkbuyview?.quantity_required}
                                                    readOnly={true}
                                                />
                                            </div> */}
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
