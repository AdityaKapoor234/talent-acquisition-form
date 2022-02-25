import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import FlavourCreateComponent from "../../../component/catalog/flavour/flavour-create";
import Router from "next/router";
import Cookie from "js-cookie";

const flavour = {
  id: "1",
  display: "0",
  name: "BCCA"
};

export default function FlavourEditDetails() {

  const mode = "edit";

  useEffect(() => {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
  }, []);
  return (
    <div>
      <Head>
        <title>{APP_NAME} - Incredient</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-5">
              <div className="hamburger">
                <span>Catalog / Flavour / </span>Edit Flavour
              </div>
              <div className="page-name">Edit Incredient Details - BCCA</div>
            </div>
            <div className="col-md-7 btn-save">
              <div
                className="custom-btn "
                onClick={() => {
                  Router.push(`/flavour`);
                }}
              >
                <span>Save </span>
              </div>
              <div
                className="Cancel-btn custom-btn"
                onClick={() => {
                  Router.push(`/flavour`);
                }}
              >
                <span>Delete </span>
              </div>
              <div
                className="Cancel-btn custom-btn"
                onClick={() => {
                  Router.push(`/flavour`);
                }}
              >
                <span>Cancel </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-m-12">
              <FlavourCreateComponent flavour={flavour} mode={mode}/>
            </div>
          </div>
        </DashboardLayoutComponent>
      </main>
    </div>
  );
}
