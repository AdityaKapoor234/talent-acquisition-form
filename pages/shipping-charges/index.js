import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import ShippingChargesComponent from "../../component/configurations/shipping-charges/shipping-charges";
import Router from "next/router";
import Cookie from "js-cookie";
import ShippingChargesAPI from "../../services/shipping-charges";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id: id || null,
        },
    };
}

export default class ShippingCharges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            mode: "view",
            shippingCharges: [],
            open: false,
            is_all: false,

            shippingChargesDetails: {
                shipping_fee: null,
                shipping_fee_breakout: null,
            },
        };
    }
    validateData = () => {
        this.setState({ is_all: false });

        // if (this.state.checkMySupplementDetails.description === "" || this.state.checkMySupplementDetails.description === null || 
        // this.state.checkMySupplementDetails.description.replace(/\s/g, "").length <= 0) {
        // 	this.state.is_all = true;
        // 	toast.error("Please enter the full description");
        // 	return false;
        // }
        // if (this.state.checkMySupplementDetails.short_description === "" || this.state.checkMySupplementDetails.short_description === null || 
        // this.state.checkMySupplementDetails.short_description.replace(/\s/g, "").length <= 0) {
        // 	this.state.is_all = true;
        // 	toast.error("Please enter the short description");
        // 	return false;
        // }
        // if (this.state.checkMySupplementDetails.banner === "" || this.state.checkMySupplementDetails.banner === null || 
        // this.state.checkMySupplementDetails.banner.replace(/\s/g, "").length <= 0) {
        // 	this.state.is_all = true;
        // 	toast.error("Please enter the banner");
        // 	return false;
        // }
        // if (this.state.checkMySupplementDetails.sm_banner === "" || this.state.checkMySupplementDetails.sm_banner === null || 
        // this.state.checkMySupplementDetails.sm_banner.replace(/\s/g, "").length <= 0) {
        // 	this.state.is_all = true;
        // 	toast.error("Please enter the small banner");
        // 	return false;
        // }

        return true;

    };
    OnSave = () => {
        if (this.validateData()) {
            let data = {
                "shipping_fee": this.state.shippingChargesDetails?.shipping_fee,
                "shipping_fee_breakout": this.state.shippingChargesDetails?.shipping_fee_breakout,
            };
            ShippingChargesAPI.shippingChargesEDIT(this.state.id, data).then((response) => {
                if (response.data.httpStatusCode === 200) {
                    toast.success(response.data.message);
                    this.shippingChargesDetail();
                    this.setState({ mode: 'view' });
                }
            }).catch((error) => {
                toast.error(
                    error?.response &&
                        error?.response?.data &&
                        error?.response?.data?.message
                        ? error.response.data.message
                        : "Unable to process your request, please try after sometime"
                );
            });
        }
    };

    shippingChargesDetail = () => {
        ShippingChargesAPI.shippingChargesViewDetails().then((response) => {
            let data = {
                shipping_fee: response.data.data.shipping[0]?.shipping_fee,
                shipping_fee_breakout: response.data.data.shipping[0]?.shipping_fee_breakout,
            }
            this.setState({ shippingChargesDetails: data });
        })
            .catch((error) => {
                toast.error(
                    error?.response &&
                        error?.response?.data &&
                        error?.response?.data?.message
                        ? error.response.data.message
                        : "Unable to process your request, please try after sometime"
                );
            });
    }

    stateHandle = (value) => {
        this.setState({ shippingChargesDetails: value });
    };

    componentDidMount() {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        this.shippingChargesDetail();
        this.setState({ id: 1 });
    }
    render() {
        return (
            <div>
                <Head>
                    <title>{APP_NAME} - Certification</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-7">
                                <div className="hamburger">
                                    <span>Configurations / Shipping Charges / </span>
                                </div>
                                <div className="page-name">
                                    {
                                        this.state.mode === "edit" ?
                                            <>
                                                Edit Details - Shipping Charges
                                            </>
                                            :
                                            <>
                                                View Details - Shipping Charges
                                            </>
                                    }

                                </div>
                            </div>
                            <div className="col-md-5 btn-save">
                                {
                                    this.state.mode === 'edit' ?
                                        <div
                                            className="custom-btn "
                                            onClick={() => {
                                                this.OnSave();
                                            }}
                                        >
                                            <span>Save </span>
                                        </div>
                                        :
                                        <div
                                            className="custom-btn "
                                            onClick={() => {
                                                this.setState({ mode: 'edit' });
                                            }}
                                        >
                                            <span>Edit</span>
                                        </div>
                                }

                                {/* <div
									className="custom-btn "
									onClick={() => {
										this.OnSave();
									}}
								>
									<span>Save </span>
								</div> */}
                                {/* <div
									className="Cancel-btn custom-btn"
									onClick={() => {
										this.setState({ open: true });
									}}
								>
									<span>Delete </span>
								</div> */}
                                {/* <div
									className="Cancel-btn custom-btn"
									onClick={() => {
										Router.push(`/certification`);
									}}
								>
									<span>Cancel </span>
								</div> */}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-m-12">
                                <ShippingChargesComponent
                                    shippingCharges={this.state.shippingChargesDetails}
                                    mode={this.state.mode}
                                    handle={this.stateHandle.bind(this)}
                                />
                            </div>
                        </div>
                    </DashboardLayoutComponent>
                </main>
            </div>
        );
    }
}
