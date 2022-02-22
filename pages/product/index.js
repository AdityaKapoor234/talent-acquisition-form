import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import ProductList from "../../component/catalog/product/product-list";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";

const customer = [
    {
        id: 1,
        name: "BSC Athlete Standard whey Protein - 900 gms,Vanilla",
        productcode:"BSCASWPVA",
        stockquantity:"100",
        producttype:"Regular Product",      
        status: true,
    },
    {
        id: 2,
        name: "BSC Athlete Standard whey Protein - 900 gms,Vanilla",
        productcode: "BSCASWPVA",
        stockquantity: "100",
        producttype: "Product with Variant",
        status: true,
    },
    {
        id: 3,
        name: "BSC Athlete Standard whey Protein - 900 gms,Vanilla",
        productcode: "BSCASWPVA",
        stockquantity: "100",
        producttype: "Variant",
        status: true,
    },
    {
        id: 1,
        name: "BSC Athlete Standard whey Protein - 900 gms,Vanilla",
        productcode: "BSCASWPVA",
        stockquantity: "100",
        producttype: "Variant",
        status: true,
    },
    {
        id: 2,
        name: "BSC Athlete Standard whey Protein - 900 gms,Vanilla",
        productcode: "BSCASWPVA",
        stockquantity: "100",
        producttype: "Variant",
        status: true,
    },
    {
        id: 3,
        name: "BSC Athlete Standard whey Protein - 900 gms,Vanilla",
        productcode: "BSCASWPVA",
        stockquantity: "100",
        producttype: "Variant",
        status: true,
    },
    {
        id: 1,
        name: "BSC Athlete Standard whey Protein - 900 gms,Vanilla",
        productcode: "BSCASWPVA",
        stockquantity: "100",
        producttype: "Variant",
        status: true,
    },
    {
        id: 2,
        name: "BSC Athlete Standard whey Protein - 900 gms,Vanilla",
        productcode: "BSCASWPVA",
        stockquantity: "100",
        producttype: "Variant",
        status: true,
    },
    {
        id: 3,
        name: "BSC Athlete Standard whey Protein - 900 gms,Vanilla",
        productcode: "BSCASWPVA",
        stockquantity: "100",
        producttype: "Variant",
        status: true,
    },
    {
        id: 1,
        name: "BSC Athlete Standard whey Protein - 900 gms,Vanilla",
        productcode: "BSCASWPVA",
        stockquantity: "100",
        producttype: "Variant",
        status: true,
    },
    

];
const product = {
    id: 1,
    name: "test",
    type: "Regular Product",
    
};


export default function Product() {
    useEffect(() => {
        const token = Cookie.get("access_token");
        if (token === undefined) {
            Router.push("/");
        }
    }, []);
    return (
        <div page-component="category-page">
            <Head>
                <title>{APP_NAME} - Product</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-6">
                            <div className="hamburger">
                                <span>Catalog / </span>Product
                            </div>
                            <div className="page-name">Product</div>
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
                                    Router.push(`/product/create`);
                                }}
                            >
                                <span>Add New </span>
                            </div>
                        </div>
                    </div>
                    <div className="row sticky-scroll scroll">
                        <div className="col-md-12 ">
                            <ProductList customer={customer} />
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
