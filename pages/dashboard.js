import Head from "next/head";
import Image from "next/image";
import { toast } from "react-toastify";
import { APP_NAME } from "../utils/constant";
import { useState, useEffect } from "react";
import DashboardLayoutComponent from "../component/layouts/dashboard-layout/dashboard-layout";
import  Router  from "next/router";
import Cookie from "js-cookie";

export default function Dashboard() {
  useEffect(() => {
    const token = Cookie.get("access_token");
    if (token === undefined) {
      Router.push("/");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>{APP_NAME} - Dashborad</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent></DashboardLayoutComponent>
      </main>
    </div>
  );
}
