import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import EmailSupportView from "../../../component/email-support/email-support-view.component";
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

export default function EmailSupportViews({ id }) {
    const mode = "view";

    const [emailSupportView,  setEmailSupportView] = useState([]);
    // const [open, setOpen] = useState(false);

    const getEmailSupportView = (id) => {
        InquiryApi.getEmailSupportView(id)
            .then((response) => {
            setEmailSupportView(response.data.data.email_support);
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
        getEmailSupportView(id);
    }, []);
    return (
        <div>
            <Head>
                <title>{APP_NAME} - Email Support View</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-5">
                            <div className="hamburger">
                                <span>Inquiry /Email Sppourt/ </span>View Email Support
                            </div>
                            <div className="page-name">Email Support Details -{emailSupportView?.name} </div>
                        </div>
                        <div className="col-md-7 btn-save">
                          
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/email-support`);
                                }}
                            >
                                <span>Cancel </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-m-12">
                            <EmailSupportView view={emailSupportView} mode={mode} />
                        
                        </div>
                    </div>
                </DashboardLayoutComponent>
               
            </main>
        </div>
    );
}
