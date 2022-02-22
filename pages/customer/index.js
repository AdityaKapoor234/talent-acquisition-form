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
import CustomerApi from "../../services/customer";


export default function Customer() {

  const [customer, setCustomer] = useState([]);

  const customerList=()=>{
    CustomerApi
      .CustomerList(1,"")
      .then((response) => {
        setCustomer(response.data.data.list)
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
    customerList();
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
