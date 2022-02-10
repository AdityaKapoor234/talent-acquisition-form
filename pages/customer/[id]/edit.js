import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import CustomerComponent from "../../../component/customer/customer-list";
import Pagination from "@mui/material/Pagination";
import CustomerDetails from "../../../component/customer/customer-details";
import Router from "next/router";
import Cookie from "js-cookie";

const customer = {
  name: "Ritu",
  phone_number: "8907654321",
  email: "admin@fitcart.com",
  active: true,
  type: "General",
  addressInfo: [
    {
      name: "Ritu Raj",
      phone_number: "9087654321",
      address: "SCO 53, 4th Floor, Main Market, Sector 29,Ghaziabad",
    },
    {
      name: "Ritu Raj",
      phone_number: "9087654321",
      address: "Sector-5  Main Market, Nodia",
    },
    {
      name: "Ritu Raj",
      phone_number: "9087654321",
      address: "SCO 53, 4th Floor, Main Market, New Delhi",
    },
  ],
};
export default function CustomerEditDetails() {

  const mode = "edit";

  useEffect(() => {
    const token = Cookie.get("access_token");
    if (token === undefined) {
      Router.push("/");
    }
  }, []);
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
              <div className="page-name">Customer - Ritu</div>
            </div>
            <div className="col-md-7 btn-save">
              <div
                className="custom-btn "
                onClick={() => {
                  Router.push(`/customer`);
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
              <CustomerDetails customer={customer} mode={mode} />
            </div>
          </div>
        </DashboardLayoutComponent>
      </main>
    </div>
  );
}
