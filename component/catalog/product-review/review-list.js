import React, { Component } from "react";
import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import ReviewList from "../review/review-list";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ReviewApi from "../../../services/review";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id: id || null,
        },
    };
}

export default class ProductReviewList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            pathArr: "",
            review: [],
            totalReview: [],
            wordEntered: "",
            totalPage: 1,
            currentPage: 1,
            isLoader: true,
            id: props?.id,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.id !== nextProps.id
        ) {
            return {
                id: nextProps?.id,
            };
        }
        return null;
    }


    handleKeyPress = (event) => {
        // let router_query_object = {};
        // if (wordEntered !== "") {
        //     router_query_object["q"] = wordEntered;
        // }
        if (event.key === "Enter") {
            // Router.push({
            //     pathname: "/review",
            //     query: router_query_object,
            // });
            this.setState({ currentPage: 1 });
            this.reviewList(this.state.id, 1, this.state.wordEntered);
        }
    };

    handleClickPress = (event) => {
        // let router_query_object = {};
        // if (wordEntered !== "") {
        //     router_query_object["q"] = wordEntered;
        // }
        // Router.push({
        //     pathname: "/review",
        //     query: router_query_object,
        // });
        this.setState({ currentPage: 1 });
        this.reviewList(this.state.id, 1, this.state.wordEntered);
    };

    handleFilter = (event) => {
        const searchWord = event.target.value;
        this.setState({ wordEntered: searchWord });
        if (event.target.value === "") {
            // Router.push({
            //     pathname: "/review",
            //     query: "",
            // });
            this.reviewList(this.state.id, 1, "");
        }
    };

    onPageChange = (e, page) => {
        this.setState({ currentPage: page });
        this.reviewList(this.state.id, page, this.state.wordEntered);
    };

    reviewList = (id, page, search) => {
        this.setState({ isLoader: true });
        ReviewApi.reviewList(id, page, search)
            .then((response) => {
                this.setState({
                    review: response.data.data,
                    totalReview: response.data.data,
                    totalPage: Math.ceil(response.data.data.total / response.data.data.page_size),
                    isLoader: false,
                });
            })
            .catch((error) => {
                this.setState({ isLoader: false });
                toast.error(
                    error?.response &&
                        error?.response?.data &&
                        error?.response?.data?.message
                        ? error.response.data.message
                        : "Unable to process your request, please try after sometime"
                );
            });
    };

    componentDidMount(props) {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        this.reviewList(this.state.id, this.state.currentPage, "");
        this.setState({ id: props?.id });

    };

    render() {
        return (
            <div page-component="category-page">

                <main>
                    <div className="row border-box mt-3">
                        <div className="col-md-6 btn-save justify-content-start">

                            <div className="hamburger">
                                {/* <span>Catalog / </span>Review */}
                            </div>
                            {/* <div className="page-name">Review</div> */}
                        </div>
                        <div className="col-md-4">
                            <div className="login-form ">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="search-box"
                                    value={this.state.wordEntered}
                                    onChange={this.handleFilter}
                                    onKeyPress={this.handleKeyPress}
                                />
                                <SearchIcon className="search-icon point-but" onClick={this.handleClickPress} style={{top: "10.25rem"}} />
                            </div>
                        </div>
                        <div className="col-md-2 btn-save">
                            <div
                                className="custom-btn "
                                onClick={() => {
                                    Router.push(`/product-review/${this.state.id}/create`);
                                }}
                            >
                                <span>Add New </span>
                            </div>
                        </div>
                    </div>
                    <div className="row sticky-scroll scroll">
                        <div className="col-md-12 ">
                            {
                                this.state.isLoader ? (
                                    <div className="row justify-content-center">
                                        <div className="col-md-12 loader-cart">
                                            <Box sx={{ display: "flex" }}>
                                                <CircularProgress
                                                    style={{ color: "#F54A00" }}
                                                />
                                            </Box>
                                        </div>
                                    </div>
                                ) : (
                                    // review && review.length === 0 ? <div className="not-found">No Data Found</div> :
                                    <>

                                        <ReviewList review={this.state.review} />
                                    </>
                                )
                            }


                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-12">
                            <div className="pagiantion-category">
                                <Pagination
                                    className="pagination"
                                    page={currentPage}
                                    count={totalPage}
                                    onChange={onPageChange}
                                />
                            </div>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-md-12 justify-content-between d-flex position-relative">
                            <div className="pagiantion-category">
                                <div>
                                    <Pagination
                                        className="pagination pagi"
                                        page={this.state.currentPage}
                                        count={this.state.totalPage}
                                        onChange={this.onPageChange}
                                    />
                                </div>
                                <div className="position-absolute totalCount" style={{ right: 23, bottom: 5 }}>
                                    Total Review: {this.state.totalReview.total}
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        );
    }
}
