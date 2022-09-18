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
import ProductInfoApi from "../../../services/product-info";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id: id || null,
        },
    };
}

export default function ProductEditCompo({ id }) {

    const mode = "edit";
    const [productId, setProductId] = useState(id)
    const [content, setContent] = useState([]);
    const [isLoader, setIsLoader] = useState(true);
    const [infoDetails, setInfoDetails] = useState();
    // const [flavour,setFlavour]=useState();


    const contentList = (id) => {
        setIsLoader(true);
        ProductApi.ContentList(id)
            .then((response) => {
                console.log(response, "test")
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


    const getInfo = (id) => {
        ProductInfoApi.getInfo(id)
            .then((response) => {
                setInfoDetails(response.data.data);
                console.log(response, "filter")
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

    const productSoftDelete = (id) => {
        let data={}
        ProductInfoApi.productSoftDelete(id,data)
            .then((response) => {
                toast.success(response.data.message)
                Router.push(`/product`);
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

    //    const getFlavors = () => {
    //         ProductInfoApi.getFlavor()
    //             .then((response) => {
    //                 setFlavour(response.data.data.list)
    //                 console.log(response,"test2")

    //             })
    //             .catch((error) => {
    //                 toast.error(
    //                     error?.response &&
    //                         error?.response?.data &&
    //                         error?.response?.data?.message
    //                         ? error.response.data.message
    //                         : "Unable to process your request, please try after sometime1"
    //                 );
    //             });
    //     }


    useEffect(() => {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        setProductId(id)
        contentList(id);
        getInfo(id);
        // getFlavors()
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
                                <span>Catalog / Product / </span>Edit Product
                            </div>
                            <div className="page-name">{infoDetails?.name}
                                {/* {flavour?.filter(elem => elem.id === infoDetails?.flavor_id)?.map(elem => elem?.name)} */}
                                -{productId} -{infoDetails?.weight}{infoDetails?.weight_unit}</div>
                        </div>
                        <div className="col-md-7 btn-save">
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    productSoftDelete(productId)
                                }}
                            >
                                <span>Delete</span>
                            </div>
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/product`);
                                }}
                            >
                                <span>Cancel</span>
                            </div>
                        </div>
                    </div>

                    {/* <div className="row border-box">
                        <div className="col-md-8">

                            <div className="hamburger">
                                <span>Catalog / Product / </span>Edit Product
                            </div>
                            <div className="page-name">{infoDetails?.name}
                                -{productId} -{infoDetails?.weight}{infoDetails?.weight_unit}</div>

                        </div>
                        <div className="col-md-4 btn-save">
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/product`);
                                }}
                            >
                                <span>Cancel </span>
                            </div>
                        </div>
                    </div> */}
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
                                    <ProductEditComponent mode={mode} content={content} id={productId} />
                                )
                            }
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}
