import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import AddCustomerComponent from "../../component/customer/addcustomer.component";
import Pagination from "@mui/material/Pagination";
import CustomerDetail from "../../component/customer/customer-details";
import Router from "next/router";
import Cookie from "js-cookie";
import Link from 'next/link'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomerApi from "../../services/customer";

export default function AddCustomer() {
  const [customerDetails,setCustomerDetails] = useState({"name":"","sort_order":""});
  const [mode,setMode] = useState("edit");


  const validateData = () => {
    if ((customerDetails?.name === "" || customerDetails?.name === null || customerDetails?.name?.replace(/\s/g, "")?.length <= 0)) {
      toast.error("Please enter name");
      return false
    }
    if ((customerDetails?.sort_order === "" || customerDetails?.sort_order === null)) {
      toast.error("Please enter display order ");
      return false
    }
      return true;
  };


  const OnSave = ()=>{
    if(validateData()){
    let data = {
      user_type: customerDetails?.name,
      is_active: customerDetails?.is_active,
      sort_order: customerDetails?.maximum_order_qty
    };
    CustomerApi.AddCustomer(data)
    .then((response) => {
      if (response.data.httpStatusCode === 200) {
        toast.success(response.data.message);
        Router.push(`/customer-type`);
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

  const stateHandle = (value) => {
    setCustomerDetails(value);
  };
  
  useEffect(()=>{
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
  });


 
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
                <span>customer / customer Type / </span> Add Customer Type
              </div>
              <div className="page-name"> </div>
            </div>
            <div className="col-md-7 btn-save">
              <div
                className="custom-btn "
                onClick={() => {
                  OnSave();
                }}
              >
                <span>Save </span>
              </div>
              <div
                className="Cancel-btn custom-btn"
                onClick={() => {
                  Router.push(`/customer-type`);
                }}
              >
                <span>Cancel </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-m-12">
              <AddCustomerComponent mode={mode} handle={stateHandle.bind(this)}/>
            </div>
          </div>
        </DashboardLayoutComponent>
             </main>
    </div>
  );
}