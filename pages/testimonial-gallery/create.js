import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import TestimonialGalleryCreateComponent from "../../component/testimonial-gallery/testimonial-gallery-details";
import Router from "next/router";
import Cookie from "js-cookie";
import TestimonialGalleryApi from "../../services/testimonial-gallery";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export default class TestimonialGalleryEditDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "edit",
            testimonialGallery: {},
            testimonialGalleryDetails: {
                name: "",
                img_url: "",
            },
        };
    }
    validateData = () => {
        this.setState({is_all: false});
        
        if (
            this.state.testimonialGalleryDetails?.name === "" ||
            this.state.testimonialGalleryDetails?.name === null ||
            this.state.testimonialGalleryDetails?.name === undefined
        ) {
            toast.error("Please enter the name");
            return false;
        }
        if (this.state.testimonialGalleryDetails?.name !== undefined) {
            if (this.state.testimonialGalleryDetails?.name.replace(/\s/g, "").length <= 0) {
                toast.error("Please enter the name");
                return false;
            }
        }

        
        if (
            this.state.testimonialGalleryDetails?.img_url === "" ||
            this.state.testimonialGalleryDetails?.img_url === null ||
            this.state.testimonialGalleryDetails?.img_url === undefined
        ) {
            toast.error("Please enter the image");
            return false;
        }
        if (this.state.testimonialGalleryDetails?.img_url !== undefined) {
            if (this.state.testimonialGalleryDetails?.img_url.replace(/\s/g, "").length <= 0) {
                toast.error("Please enter the image");
                return false;
            }
        }

        return true;
        
    };
    OnSave = () => {
        if (this.validateData()) {
            let data = {
                name: this.state.testimonialGalleryDetails?.name,
                img_url: this.state.testimonialGalleryDetails?.img_url,
                is_active: true,
            };
            TestimonialGalleryApi.testimonialGalleryCreate(data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        this.setState({ testimonialGallery: response.data.data.updated });
                        toast.success(response.data.message);
                        Router.push(`/testimonial-gallery`);
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
        this.setState({ testimonialGalleryDetails: value });
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
                    <title>{APP_NAME} - Gallery</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-5">
                                <div className="hamburger">
                                    <span>CMS / Gallery / </span>Edit Gallery
                                </div>
                                <div className="page-name">
                                    Edit Gallery Details - {this.state.testimonialGalleryDetails?.name}
                                </div>
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
                                {/* <div
                                    className="Cancel-btn custom-btn"
                                    onClick={() => {
                                        this.setState({ open: true });
                                    }}
                                >
                                    <span>Delete </span>
                                </div> */}
                                <div
                                    className="Cancel-btn custom-btn"
                                    onClick={() => {
                                        Router.push(`/testimonial-gallery`);
                                    }}
                                >
                                    <span>Cancel </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-m-12">
                                <TestimonialGalleryCreateComponent
                                    testimonialGallery={this.state.testimonialGallery}
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
