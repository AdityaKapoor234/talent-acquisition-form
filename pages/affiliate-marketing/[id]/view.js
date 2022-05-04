import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import AffiliateMarketingView from "../../../component/enquiry/affiliated-marketing/affiliated-marketing view.component"
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

export default function affiliateMarketViewsDetails({ id }) {
    const mode = "view";

    const [affiliateMarketingView, setAffiliateMarketingView] = useState(null);
    // const [open, setOpen] = useState(false);

    const affiliateMarketingViewDetail = (id) => {
        InquiryApi.getAffiliateMarketingViewDetails(id)
            .then((response) => {
                 setAffiliateMarketingView(response.data.data.affiliate_marketing_view);
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
        affiliateMarketingViewDetail(id);
    }, []);
    return (
        <div>
            <Head>
                <title>{APP_NAME} - Affiliate Marketing View</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-5">
                            <div className="hamburger">
                                <span>Catalog /Affiliate Marketing/ </span>View Affiliate Marketing
                            </div>
                            <div className="page-name">Affiliate Marketing Details -{affiliateMarketingView?.company_name}  </div>
                        </div>
                        <div className="col-md-7 btn-save">
                          
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/affiliate-marketing`);
                                }}
                            >
                                <span>Cancel </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-m-12">
                           {affiliateMarketingView && <AffiliateMarketingView view={affiliateMarketingView} mode={mode} />}
                        
                        </div>
                    </div>
                </DashboardLayoutComponent>
               
            </main>
        </div>
    );
}
