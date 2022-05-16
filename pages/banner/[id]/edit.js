import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import BannerCreateComponent from "../../../component/cms/banner/banner-create";
import Router from "next/router";
import Cookie from "js-cookie";
import BannerApi from "../../../services/banner";
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

export default class BannerEditDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props?.id,
            mode: "edit",
            banner: {},
            open: false,
            is_all: false,
            bannerDetails: {
                name: "",
                sort_order: null,
                url: "",
                banner: "",
                banner_sm: '',
                is_active: null,
            },
        };
    }
    validateData = () => {
        this.setState({is_all: false});
        
        if (
            this.state.bannerDetails?.name === "" ||
            this.state.bannerDetails?.name === null ||
            this.state.bannerDetails?.name.replace(/\s/g, "").length <= 0
        ) {
            toast.error("Please enter the name");
            this.state.is_all=true;
        }
        if (
            this.state.bannerDetails?.url === "" ||
            this.state.bannerDetails?.url === null ||
            this.state.bannerDetails?.url.replace(/\s/g, "").length <= 0
        ) {
            toast.error("Please enter the url");
            this.state.is_all=true;
        }
        if (
            this.state.bannerDetails?.banner === "" ||
            this.state.bannerDetails?.banner === null
        ) {
            toast.error("Please upload banner image");
            this.state.is_all=true;
        }
        if (
            this.state.bannerDetails?.banner_sm === "" ||
            this.state.bannerDetails?.banner_sm === null
        ) {
            toast.error("Please upload short banner image");
            this.state.is_all=true;
        }
        if (
            this.state.bannerDetails?.sort_order === "" ||
            this.state.bannerDetails?.sort_order === null
        ) {
            toast.error("Please enter Display Order ");
            this.state.is_all=true;
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
                name: this.state.bannerDetails?.name,
                sort_order: this.state.bannerDetails?.sort_order,
                url: this.state.bannerDetails?.url,
                banner: this.state.bannerDetails?.banner,
                banner_sm: this.state.bannerDetails?.banner_sm,
                is_active: this.state.bannerDetails?.is_active,
            };
            BannerApi.bannerListEDIT(this.props.id, data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        this.setState({ banner: response.data.data.banner });
                        toast.success(response.data.message);
                        Router.push(`/banner`);
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
        this.setState({ bannerDetails: value });
    };
    getbannerDetails = (id) => {
        BannerApi.bannerViewDetails(id)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    let details = {
                        name: response.data.data.banner?.name,
                        sort_order: response.data.data.banner?.sort_order,
                        url: response.data.data.banner?.url,
                        banner: response.data.data.banner?.banner,
                        banner_sm: response.data.data.banner?.banner_sm,
                        is_active: response.data.data.banner?.is_active,
                    };
                    this.setState({
                        bannerDetails: details,
                        banner: response.data.data.banner,
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
        BannerApi.bannerDelete(id, data)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    this.setState({ banner: response.data.data.banner });
                    Router.push("/banner");
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
        this.getbannerDetails(this.props.id);
        this.setState({ id: this.props?.id });
    }
    render() {
        return (
            <div>
                <Head>
                    <title>{APP_NAME} - Banner</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-5">
                                <div className="hamburger">
                                    <span>CMS / Banner / </span>Edit Banner
                                </div>
                                <div className="page-name">
                                    Edit Banner Details - {this.state.bannerDetails?.name}
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
                                        Router.push(`/banner`);
                                    }}
                                >
                                    <span>Cancel </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-m-12">
                                <BannerCreateComponent
                                    banner={this.state.banner}
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
                                Are you sure you want to delete this banner?
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
