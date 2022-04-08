import Head from "next/head";
import Image from "next/image";
import React,{ useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import CustomerComponent from "../../../component/customer/customer-list";
import Pagination from "@mui/material/Pagination";
import CustomerDetails from "../../../component/customer/customer-details";
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

export default function CustomerEditDetails({id}) {

  const mode = "edit";

  const [customer,setCustomer]=useState([]);
  const [active, setActive]=useState(false);

  const activeHandle =(value)=>{
    setActive(value)
  }

  const saveDetails =(id)=>{
    let data ={
      "is_active":active
    }
    CustomerApi
    .CustomerDetails(id,data)
    .then((response) => {
      if(response.data.httpStatusCode === 200)
      {
        toast.success(response.data.message)
        Router.push(`/customer`);
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
    const token = Cookie.get("access_token_admin");
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
            <div className="col-md-5">
              <div className="hamburger">
                <span>customer / customer / </span>Edit customer{" "}
              </div>
              <div className="page-name">Customer - {customer?.name}</div>
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
                  Router.push(`/customer`);
                }}
              >
                <span>Cancel </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-m-12">
              <CustomerDetails customer={customer} id={id} mode={mode} active={activeHandle} />
            </div>
          </div>
        </DashboardLayoutComponent>
      </main>
    </div>
  );
}
