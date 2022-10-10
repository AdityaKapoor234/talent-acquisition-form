import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import SellerCreateComponent from "../../../component/seller/seller/seller-details";
import Router from "next/router";
import Cookie from "js-cookie";
import SellerApi from "../../../services/seller";
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

export default class SellerEditDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props?.id,
            mode: "edit",
            seller: {},
            open: false,
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


    ValidateEmail = (mail) => {
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
            SellerApi.sellerListEDIT(this.state.id, data)
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
    getsellerDetails = (id) => {
        SellerApi.getSellerViewDetails(id)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    let details = {
                        seller: response.data.data.seller ? response.data.data.seller : "",
                        seller_address: response.data.data.seller_address ? response.data.data.seller_address : "",
                    };
                    this.setState({
                        sellerDetails: details,
                        seller: response.data.data.seller,
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
        SellerApi.sellerDelete(id, data)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    this.setState({ seller: response.data.data.seller });
                    Router.push("/seller");
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
        this.getsellerDetails(this.props.id);
        this.setState({ id: this.props?.id });
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
                                    <span>Catalog / Seller / </span>Edit Seller
                                </div>
                                <div className="page-name">
                                    Edit Seller Details - {this.state.seller?.name}
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
                                    seller={this.state.seller}
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
                                Are you sure you want to delete this seller?
                            </Typography>
                        </DialogContent>
                        <DialogActions style={{ marginBottom: "0.5rem" }}>
                            <Button
                                onClick={() => {
                                    this.setState({ open: false });
                                }}
                                style={{
                                    color: "#012169",
                                    borderRadius: "0px",
                                    background: "white",
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
