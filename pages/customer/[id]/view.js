import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import CustomerComponent from "../../../component/customer/customer-list";
import Pagination from "@mui/material/Pagination";
import CustomerDetail from "../../../component/customer/customer-details";
import Router from "next/router";
import Cookie from "js-cookie";
import CustomerApi from "../../../services/customer";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default function CustomerViewDetails({id}) {

  const mode = "view";

  const [customer,setCustomer]=useState([]);

  const customerDetail =(id)=>{
    CustomerApi
    .getCustomerDetails(id)
    .then((response) => {
      setCustomer(response.data.data.user)
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
    const token = Cookie.get("access_token");
    if (token === undefined) {
      Router.push("/");
    }
    customerDetail(id)
  }, [id]);
  return (
    <div>
      <Head>
        <title>{APP_NAME} - Customer</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-10">
              <div className="hamburger">
                <span>customer / customer / </span>View customer{" "}
              </div>
              <div className="page-name">Customer - {customer?.name}</div>
            </div>
            <div className="col-md-2 btn-save">
              <div
                className="Cancel-btn custom-btn"
                style={{width:"100%"}}
                onClick={() => {
                  Router.push(`/customer`);
                }}
              >
                <span>Cancel </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-m-12">
              <CustomerDetail customer={customer} mode={mode} />
            </div>
          </div>
        </DashboardLayoutComponent>
      </main>
    </div>
  );
}
