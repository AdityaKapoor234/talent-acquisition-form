import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import OrderComponent from "../../../component/order/order-list";
import Pagination from "@mui/material/Pagination";
import OrderDetails from "../../../component/order/order-details";
import Router from "next/router";
import Cookie from "js-cookie";
import OrderApi from "../../../services/orders";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id: id || null,
        },
    };
}

export default function OrderEditDetails({ id }) {

    const mode = "edit";

    const [order, setOrder] = useState([]);
    const [active, setActive] = useState(false);
    const [orderStatus, setOrderStatus] = useState("");
    const [error, setError] = useState("");

    const activeHandle = (value) => {
        setActive(value)
    }
    const statusHandle = (value) => {
        setOrderStatus(value);
    };

    const validation = () => {
        let isValid = true;
        if (orderStatus == "") {
            isValid = false;
            setError("Please select status");
        }

        return isValid;
    }


    const saveDetails = (id) => {
        if (validation()) {

            let data = {
                "status": orderStatus
            }
            OrderApi
                .AddOrder(id, data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        toast.success(response.data.message)
                        Router.push(`/order`);
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
    }

    const orderDetail = (id) => {
        OrderApi
            .getOrderDetails(id)
            .then((response) => {
                setOrder(response.data.data)
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

    useEffect(() => {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        orderDetail(id)
    }, [id]);
    return (
        <div>
            <Head>
                <title>{APP_NAME} - Order</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-5">
                            <div className="hamburger">
                                <span>order / order / </span>Edit order{" "}
                            </div>
                            <div className="page-name">Order - {order?.name}</div>
                        </div>
                        <div className="col-md-7 btn-save">
                            <div
                                className="custom-btn "
                                onClick={() => {
                                    saveDetails(id)
                                }}
                            >
                                <span>Save </span>
                            </div>
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/order`);
                                }}
                            >
                                <span>Cancel </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-m-12">
                            <OrderDetails order={order} mode={mode} active={activeHandle} error={error} handle={statusHandle.bind(this)}/>
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}
