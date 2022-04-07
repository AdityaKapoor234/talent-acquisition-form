import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import ProductEditComponent from "../../../component/catalog/product/product-edit.component";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ProductApi from "../../../services/product";
import Router from "next/router";
import Cookie from "js-cookie";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id: id || null,
        },
    };
}

export default function ProductViewDetails({id}) {

    const mode = "view";
    const [productId, setProductId] = useState(id);
    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(true);


    const contentList = (id) => {
        setIsLoader(true);
        ProductApi.ContentList(id)
            .then((response) => {
                setContent(response.data.data);
                setIsLoader(false);
            })
            .catch((error) => {
                setIsLoader(false);
                toast.error(
                    error?.response &&
                        error?.response?.data &&
                        error?.response?.data?.message
                        ? error.response.data.message
                        : "Unable to process your request, please try after sometime"
                );
            });
    };


    useEffect(() => {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        contentList(id);
        setProductId(id);
    }, [id]);
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
                        <div className="col-md-5">
                            <div className="hamburger">
                                <span>Catalog / Product / </span>View Product
                            </div>
                            <div className="page-name">Product Details</div>
                        </div>
                        <div className="col-md-7 btn-save">
                            {/* <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/product`);
                                }}
                            >
                                <span>Delete </span>
                            </div> */}
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
                            {
                                isLoader ? (
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
                                    <ProductEditComponent id={productId} mode={mode} content={content} />
                                )
                            }
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}
