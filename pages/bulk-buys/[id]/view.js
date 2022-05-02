import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import BulkBuysView from "../../../component/enquiry/bulk-buys/bulk-buys view.component"
import Router from "next/router";
import Cookie from "js-cookie";
import InquiryApi from "../../../services/inquiry";


export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id: id || null,
        },
    };
}

export default function BulkBuysViewsDetails({ id }) {
    const mode = "view";

    const [bulkbuysview, setBulkbuysview] = useState([]);
    // const [open, setOpen] = useState(false);

    const bulkbuysviewDetail = (id) => {
        InquiryApi.getBulkBuysViewDetails(id)
            .then((response) => {
            setBulkbuysview(response.data.data.bulk_buy_view);
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
    };

  
    useEffect(() => {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        bulkbuysviewDetail(id);
    }, []);
    return (
        <div>
            <Head>
                <title>{APP_NAME} - Bulk Buy View</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-5">
                            <div className="hamburger">
                                <span>Catalog /Bulk Buys/ </span>View Bulk Buys
                            </div>
                            <div className="page-name">Bulk Buys Details -{bulkbuysview?.name} </div>
                        </div>
                        <div className="col-md-7 btn-save">
                          
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/bulk-buys`);
                                }}
                            >
                                <span>Cancel </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-m-12">
                           {bulkbuysview && <BulkBuysView bulkbuyview={bulkbuysview} mode={mode} />}
                        
                        </div>
                    </div>
                </DashboardLayoutComponent>
               
            </main>
        </div>
    );
}
