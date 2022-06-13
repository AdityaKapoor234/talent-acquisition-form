import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import TestimonialGalleryCreateComponent from "../../../component/testimonial-gallery/testimonial-gallery-details";
import Router from "next/router";
import Cookie from "js-cookie";
import TestimonialGalleryApi from "../../../services/testimonial-gallery";
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

export default class TestimonialGalleryEditDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props?.id,
            mode: "edit",
            testimonialGallery: {},
            open: false,
            testimonialGalleryDetails: {
                name: "",
                img_url: "",
                is_active: false,
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
                is_active: this.state.testimonialGalleryDetails.is_active,
            };
            TestimonialGalleryApi.testimonialGalleryListEDIT(this.props.id, data)
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
    gettestimonialGalleryDetails = (id) => {
        TestimonialGalleryApi.testimonialGalleryViewDetails(id)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    let details = {
                        name: response.data.data.view?.name,
                        img_url: response.data.data.view?.img_url,
                        is_active: response.data.data.view?.is_active,
                    };
                    this.setState({
                        testimonialGalleryDetails: details,
                        testimonialGallery: response.data.data.view,
                    });
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
    };
    Delete = (id) => {
        let data = {};
        TestimonialGalleryApi.testimonialGalleryDelete(id, data)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    Router.push("/testimonial-gallery");
                    toast.success(response.data.message);
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
    };

    componentDidMount() {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        this.gettestimonialGalleryDetails(this.props.id);
        this.setState({ id: this.props?.id });
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
                                <div
                                    className="Cancel-btn custom-btn"
                                    onClick={() => {
                                        this.setState({ open: true });
                                    }}
                                >
                                    <span>Delete </span>
                                </div>
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
                                    handle={this.stateHandle.bind(this)}
                                />
                            </div>
                        </div>
                    </DashboardLayoutComponent>
                    <Dialog
                        open={this.state.open}
                        onClose={() => this.setState({ open: false })}
                        maxWidth="sm"
                        fullWidth
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle style={{ color: "#012169" }}>
                            Confirm the action
                        </DialogTitle>
                        <Box position="absolute" top={0} right={0}>
                            <IconButton onClick={() => this.setState({ open: false })}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <DialogContent>
                            <Typography style={{ color: "#7e8f99" }}>
                                Are you sure you want to delete this image?
                            </Typography>
                        </DialogContent>
                        <DialogActions style={{ marginBottom: "0.5rem" }}>
                            <Button
                                onClick={() => {
                                    this.setState({ open: false });
                                }}
                                style={{
                                    color: "#012169",
                                    background: "white",
                                    borderRadius: "0px",
                                }}
                                color="primary"
                                variant="contained"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => this.Delete(this.state.id)}
                                style={{ background: "#f54a00", borderRadius: "0px" }}
                                color="secondary"
                                variant="contained"
                            >
                                Confirm
                            </Button>
                        </DialogActions>
                    </Dialog>
                </main>
            </div>
        );
    }
}