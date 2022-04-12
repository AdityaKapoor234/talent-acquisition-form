import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import AdminComponent from "../../../component/admin/admin-list";
import Pagination from "@mui/material/Pagination";
import AdminDetail from "../../../component/admin/admin-details";
import Router from "next/router";
import Cookie from "js-cookie";
// import AdminApi from "../../../services/admin";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default function AdminViewDetails({id}) {

  const mode = "view";

  const [admin,setAdmin]=useState([]);

  const adminDetail =(id)=>{
    AdminApi
    .getAdminDetails(id)
    .then((response) => {
      setAdmin(response.data.data.user)
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
    // adminDetail(id)
  }, [id]);
  return (
    <div>
      <Head>
        <title>{APP_NAME} - User</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-10">
              <div className="hamburger">
                <span>user / user / </span>View user{" "}
              </div>
              <div className="page-name">User - {admin?.name}</div>
            </div>
            <div className="col-md-2 btn-save">
              <div
                className="Cancel-btn custom-btn"
                style={{width:"100%"}}
                onClick={() => {
                  Router.push(`/admin`);
                }}
              >
                <span>Cancel </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-m-12">
              <AdminDetail admin={admin} id={id} mode={mode} />
            </div>
          </div>
        </DashboardLayoutComponent>
      </main>
    </div>
  );
}
