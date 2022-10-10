import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import SellerCreateComponent from "../../component/seller/seller/seller-details";
import Router from "next/router";
import Cookie from "js-cookie";
import SellerApi from "../../services/seller";

export default class SellerCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "edit",
            seller: {},
            is_all: false,
            sellerDetails: {
                name: "",
                status: "",
                email: "",
                phone_number: "",
                website_url: "",
                logo: "",
                gst: "",
                pan_number: "",
            },
        };
    }

    ValidateEmail=(mail)=> {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            mail
        )
    }

    validateData = () => {
        this.setState({ is_all: false });

        if (!this.state.sellerDetails.name || this.state.sellerDetails.name === "" || this.state.sellerDetails.name === null || this.state.sellerDetails.name.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter your name");
            this.state.is_all = true;
        }
        if (!this.state.sellerDetails.email || !this.ValidateEmail(this.state.sellerDetails.email) || this.state.sellerDetails.email === "" || this.state.sellerDetails.email === null || this.state.sellerDetails.email.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter your email");
            this.state.is_all = true;
        }
        if (this.state.sellerDetails?.phone_number === "" ||
            !this.state.sellerDetails?.phone_number.match(/^[1-9]{1}[0-9]{9}$/) ||
            this.state.sellerDetails?.phone_number.replace(/\s/g, "").length <= 0
        ) {
            toast.error("Please enter phone number");
            this.state.is_all = true;
        }
        if (!this.state.sellerDetails.pan_number || this.state.sellerDetails.pan_number === "" || this.state.sellerDetails.pan_number === null || this.state.sellerDetails.pan_number.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter your PAN Number");
            this.state.is_all = true;
        }
        if (!this.state.sellerDetails.gst || this.state.sellerDetails.gst === "" || this.state.sellerDetails.gst === null || this.state.sellerDetails.gst.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter your gst");
            this.state.is_all = true;
        }
        if (!this.state.sellerDetails.status || this.state.sellerDetails.status === "" || this.state.sellerDetails.status === "select" || this.state.sellerDetails.status === null || this.state.sellerDetails.status.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter your status");
            this.state.is_all = true;
        }
        if (!this.state.sellerDetails.logo || this.state.sellerDetails.logo === "" || this.state.sellerDetails.logo === null || this.state.sellerDetails.logo.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter the logo");
            this.state.is_all = true;
        }
        if (!this.state.sellerDetails.website_url || this.state.sellerDetails.website_url === "" || this.state.sellerDetails.website_url === null || this.state.sellerDetails.website_url.replace(/\s/g, "").length <= 0) {
            toast.error("Please enter the website url");
            this.state.is_all = true;
        }
        if (!this.state.sellerDetails.sort_order || this.state.sellerDetails.sort_order === "" || this.state.sellerDetails.sort_order === null || this.state.sellerDetails.sort_order === undefined) {
            toast.error("Please enter display order ");
            this.state.is_all = true;
        }


        if (this.state.is_all === true) {
            return false;
        }
        else {
            return true;
        }
    };

    OnSave = () => {
        if (this.validateData()) {
            let data = {
                name: this.state.sellerDetails?.name,
                status: this.state.sellerDetails?.status,
                email: this.state.sellerDetails?.email,
                phone_number: this.state.sellerDetails?.phone_number,
                website_url: this.state.sellerDetails?.website_url,
                logo: this.state.sellerDetails?.logo,
                gst: this.state.sellerDetails?.gst,
                pan_number: this.state.sellerDetails?.pan_number,
            };
            SellerApi.sellerCreate(data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        this.setState({ seller: response.data.data.seller });
                        toast.success(response.data.message);
                        Router.push(`/seller`);
                    }
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
    };
    stateHandle = (value) => {
        this.setState({ sellerDetails: value });
    };
    componentDidMount() {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
    }

    render() {
        return (
            <div>
                <Head>
                    <title>{APP_NAME} - Seller</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-5">
                                <div className="hamburger">
                                    <span>Catalog / Seller / </span>Add A New Seller
                                </div>
                                <div className="page-name">Add A New Seller </div>
                            </div>
                            <div className="col-md-7 btn-save">
                                <div
                                    className="custom-btn "
                                    onClick={() => {
                                        this.OnSave();
                                    }}
                                >
                                    <span>Save </span>
                                </div>
                                <div
                                    className="Cancel-btn custom-btn"
                                    onClick={() => {
                                        Router.push(`/seller`);
                                    }}
                                >
                                    <span>Cancel </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-m-12">
                                <SellerCreateComponent
                                    mode={this.state.mode}
                                    createMode="create"
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
