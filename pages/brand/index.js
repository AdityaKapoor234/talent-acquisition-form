import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import BrandList from "../../component/catalog/brand/brand-list";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";

const customer = [
    {
        id: 1,
        name: "JYM Supplement Science",
        display: "0",
        active: false,
    },
    {
        id: 2,
        name: "Kinetica Sports",
        display: "3",
        active: true,
    },
    {
        id: 3,
        name: "Science in Sports",
        display: "5",
        active: true,
    },
    {
        id: 1,
        name: "Musashi Nutrition",
        display: "16",
        active: true,
    },
    {
        id: 2,
        name: "BodyScience",
        display: "2",
        active: false,
    },
    {
        id: 3,
        name: "Endurox",
        display: "0",
        active: false,
    },
    {
        id: 1,
        name: "Accelerade",
        display: "0",
        active: true,
    },
    {
        id: 2,
        name: "Endurox",
        display: "0",
        active: false,
    },
    {
        id: 3,
        name: "Accelerade",
        display: "0",
        active: true,
    },
    {
        id: 1,
        name: "Endurox",
        display: "0",
        active: false,
    },

];

export default function Brand() {
    useEffect(() => {
        const token = Cookie.get("access_token");
        if (token === undefined) {
            Router.push("/");
        }
    }, []);
    return (
        <div page-component="category-page">
            <Head>
                <title>{APP_NAME} - Category</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-6">
                            <div className="hamburger">
                                <span>Catalog / </span>Brand
                            </div>
                            <div className="page-name">Brand</div>
                        </div>
                        <div className="col-md-4">
                            <div className="login-form ">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="search-box"
                                />
                                <SearchIcon className="search-icon" />
                            </div>
                        </div>
                        <div className="col-md-2 btn-save">
                            <div
                                className="custom-btn "
                                onClick={() => {
                                    Router.push(`/brand/create`);
                                }}
                            >
                                <span>Add New </span>
                            </div>
                        </div>
                    </div>
                    <div className="row sticky-scroll scroll">
                        <div className="col-md-12 ">
                            <BrandList customer={customer} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="pagination">
                                <Pagination
                                    count={10}
                                    showFirstButton
                                    showLastButton
                                    size="small"
                                    color="primary"
                                />
                            </div>
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}
