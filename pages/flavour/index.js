import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import FlavourList from "../../component/catalog/flavour/flavour-list";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";

const customer = [
  {
    id: 1,
    name: "BCCA",
    display: "0",
    active: true,
  },
  {
    id: 2,
    name: "Beta Aline",
    display: "0",
    active: true,
  },
  {
    id: 3,
    name: "Caffine",
    display: "0",
    active: true,
  },
  {
    id: 1,
    name: "Carbohydrate",
    display: "0",
    active: true,
  },
  {
    id: 2,
    name: "Citrulline Malate",
    display: "0",
    active: true,
  },
  {
    id: 3,
    name: "Conjugated Linoleic Acid (CLA)",
    display: "0",
    active: true,
  },
  {
    id: 1,
    name: "Conjugated Linoleic Acid(CLA)",
    display: "0",
    active: true,
  },
  {
    id: 2,
    name: "Carbohydrate",
    display: "0",
    active: true,
  },
  {
    id: 3,
    name: "Carbohydrate",
    display: "0",
    active: true,
  },
  {
    id: 1,
    name: "Creatine",
    display: "0",
    active: true,
  },
];

export default function Flavour() {
  useEffect(() => {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
  }, []);
  return (
    <div page-component="category-page">
      <Head>
        <title>{APP_NAME} - Flavour</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-6">
              <div className="hamburger">
                <span>Catalog / </span>Flavour
              </div>
              <div className="page-name">Flavours</div>
            </div>
            <div className="col-md-4">
              <div className="login-form ">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-box"
                />
                <SearchIcon className="search-icon" />
              </div>
            </div>
            <div className="col-md-2 btn-save">
              <div
                className="custom-btn "
                onClick={() => {
                  Router.push(`/flavour/create`);
                }}
              >
                <span>Add New </span>
              </div>
            </div>
          </div>
          <div className="row sticky-scroll scroll">
            <div className="col-md-12 ">
              <FlavourList customer={customer} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="pagiantion-category">
                <Pagination
                  count={10}
                  className="pagination"
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
