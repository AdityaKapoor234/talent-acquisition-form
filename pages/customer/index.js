import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import CustomerList from "../../component/customer/customer-list";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from '@mui/icons-material/Search';

const customer = [
  {
    id: 1,
    name: "Yogesh Sandhankoti",
    type: "General",
    email: "yogeshsandhankoti@fitcart.com",
    phone_number: "88890765432",
    date: "17/12/2021",
    active: true,
  },
  {
    id: 2,
    name: "Rohit",
    type: "General",
    email: "yogeshRohiyt@gamil.com",
    phone_number: "8098076532",
    date: "01/2/2022",
    active: true,
  },
  {
    id: 3,
    name: "Yogesh Sandhankoti",
    type: "General",
    email: "yogeshsandhankoti@fitcart.com",
    phone_number: "88890765432",
    date: "17/12/2021",
    active: false,
  },
  {
    id: 4,
    name: "Ritu",
    type: "General",
    email: "ritu@fitcart.com",
    phone_number: "78890765432",
    date: "18/11/2021",
    active: true,
  },
  {
    id: 5,
    name: "Yogesh ",
    type: "General",
    email: "yogesh@gmail.com",
    phone_number: "88090765432",
    date: "17/01/2022",
    active: false,
  },
  {
    id: 1,
    name: "Yogesh Sandhankoti",
    type: "General",
    email: "yogeshsandhankoti@fitcart.com",
    phone_number: "88890765432",
    date: "17/12/2021",
    active: true,
  },
  {
    id: 2,
    name: "Rohit",
    type: "General",
    email: "yogeshRohiyt@gamil.com",
    phone_number: "8098076532",
    date: "01/2/2022",
    active: true,
  },
  {
    id: 3,
    name: "Yogesh Sandhankoti",
    type: "General",
    email: "yogeshsandhankoti@fitcart.com",
    phone_number: "88890765432",
    date: "17/12/2021",
    active: false,
  },
  {
    id: 4,
    name: "Ritu",
    type: "General",
    email: "ritu@fitcart.com",
    phone_number: "78890765432",
    date: "18/11/2021",
    active: true,
  },
  {
    id: 5,
    name: "Yogesh ",
    type: "General",
    email: "yogesh@gmail.com",
    phone_number: "88090765432",
    date: "17/01/2022",
    active: false,
  },
  {
    id: 1,
    name: "Yogesh Sandhankoti",
    type: "General",
    email: "yogeshsandhankoti@fitcart.com",
    phone_number: "88890765432",
    date: "17/12/2021",
    active: true,
  },
  {
    id: 2,
    name: "Rohit",
    type: "General",
    email: "yogeshRohiyt@gamil.com",
    phone_number: "8098076532",
    date: "01/2/2022",
    active: true,
  },
  {
    id: 3,
    name: "Yogesh Sandhankoti",
    type: "General",
    email: "yogeshsandhankoti@fitcart.com",
    phone_number: "88890765432",
    date: "17/12/2021",
    active: false,
  },
  {
    id: 4,
    name: "Ritu",
    type: "General",
    email: "ritu@fitcart.com",
    phone_number: "78890765432",
    date: "18/11/2021",
    active: true,
  },
  {
    id: 5,
    name: "Yogesh ",
    type: "General",
    email: "yogesh@gmail.com",
    phone_number: "88090765432",
    date: "17/01/2022",
    active: false,
  },
];

export default function Customer() {
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
            <div className="col-md-8">
              <div className="hamburger">
                <span>customer / </span>customer
              </div>
              <div className="page-name">Customer</div>
            </div>
            <div className="col-md-4">
              <div className="login-form ">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="search-box"
                    />
                    <SearchIcon className="search-icon"/>
                  </div>
            </div>
          </div>
          <div className="row sticky-scroll scroll">
            <div className="col-md-12 ">
              <CustomerList customer={customer} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="pagination">
                <Pagination
                  count={10}
                  showFirstButton
                  showLastButton
                  size="small"
                  color="primary"
                />
              </div>
            </div>
          </div>
        </DashboardLayoutComponent>
      </main>
    </div>
  );
}
