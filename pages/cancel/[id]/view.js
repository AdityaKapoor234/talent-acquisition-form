import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import OrderDetail from "../../../component/sales/order/order-details";
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

export default function CancelViewDetails({ id }) {

    const mode = "view";

    const [order, setOrder] = useState([]);
    const [invoice, setInvoice] = useState("");


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

    const orderInvoice = (id) => {
        OrderApi.getOrderInvoice(id)
            .then((response) => {
                setInvoice(response.data.data.pdf)
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
        orderInvoice(id)
    }, [id]);
    return (
        <div>
            <Head>
                <title>{APP_NAME} - Cancel</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-10">
                            <div className="hamburger">
                                <span>sales / cancel / </span>View Cancel order{" "}
                            </div>
                            <div className="page-name">Cancel Order </div>
                        </div>
                        <div className="col-md-2 btn-save">
                            <div
                                className="Cancel-btn custom-btn"
                                style={{ width: "100%" }}
                                onClick={() => {
                                    Router.push(`/cancel`);
                                }}
                            >
                                <span>Cancel </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-m-12">
                            <OrderDetail order={order} invoice={invoice} mode={mode} />
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}