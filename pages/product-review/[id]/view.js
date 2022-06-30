import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import ReviewCreateComponent from "../../../component/catalog/product-review/product-review-create";
import Router from "next/router";
import Cookie from "js-cookie";
import ReviewApi from "../../../services/review";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ProductApi from "../../../services/product";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id: id || null,
        },
    };
}

export default class ReviewViewDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props?.id,
            mode: "view",
            product: [],
            review: [],
            // isLoader: true,
        };
    }

    reviewList = (id, page, search) => {
        // this.setState({ isLoader: true });
        ReviewApi.reviewList(id, page, search)
            .then((response) => {
                this.setState({
                    review: response.data.data,
                    // isLoader: false,
                });
            })
            .catch((error) => {
                // this.setState({ isLoader: false });
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
        this.setState({ id: this.props?.id });
        this.reviewList(this.props?.id, 1, "");
    }

    render() {
        return (
            <div>
                <Head>
                    <title>{APP_NAME} - Product Review</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-8">
                                <div className="hamburger">
                                    <span>Catalog / Product Review / </span>View Product Review
                                </div>
                                <div className="page-name">
                                    View Product Review Details - {this.state.review?.product_name}
                                </div>
                            </div>
                            <div className="col-md-4 btn-save">
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
                                <div
                                    className="Cancel-btn custom-btn"
                                    onClick={() => {
                                        Router.push(`/product-review`);
                                    }}
                                >
                                    <span>Cancel </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-m-12">
                                <ReviewCreateComponent
                                    id={this.state.id}
                                />
                            </div>
                        </div>
                    </DashboardLayoutComponent>
                </main>
            </div>
        );
    }
}

