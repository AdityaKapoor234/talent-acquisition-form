import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import BannerCreateComponent from "../../component/cms/banner/banner-create";
import Router from "next/router";
import Cookie from "js-cookie";
import BannerApi from "../../services/banner";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id: id || null,
        },
    };
}

export default class BannerCreate extends Component {
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
            BannerApi.bannerCreate(data)
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
    componentDidMount() {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
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
                                    <span>CMS / Banner / </span>Add New Banner
                                </div>
                                <div className="page-name">Add New Banner</div>
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
                </main>
            </div>
        );
    }
}
