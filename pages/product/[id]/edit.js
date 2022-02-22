import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import ProductCreateComponent from "../../../component/catalog/product/product-create";
import Router from "next/router";
import Cookie from "js-cookie";

const product = {
    id: 1,
    name: "test",
    type: "Regular Product",
};


export default function ProductEditDetails() {

    const mode = "edit";

    useEffect(() => {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
    }, []);
    return (
        <div>
            <Head>
                <title>{APP_NAME} - Product</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-4">
                            <div className="hamburger">
                                <span>Catalog / Product / </span>Edit Product
                            </div>
                            <div className="page-name">Edit Product Details-Test</div>
                        </div>
                        <div className="col-md-8 btn-save">
                            <div
                                className="custom-btn "
                                onClick={() => {
                                    Router.push(`/product`);
                                }}
                            >
                                <span>Save </span>
                            </div>
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/product`);
                                }}
                            >
                                <span>Delete </span>
                            </div>
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/product`);
                                }}
                            >
                                <span>Cancel </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-m-12">
                            <ProductCreateComponent mode={mode} product={product} />
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}
