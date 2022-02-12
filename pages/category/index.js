import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import CategoryList from "../../component/catalog/category/category-list";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";

const customer = [
  {
    id: 1,
    name: "Accessories",
    top: false,
    display: "9",
    active: true,
  },
  {
    id: 2,
    name: "Accessories>>Gym Bages",
    top: true,
    display: "49",
    active: true,
  },
  {
    id: 3,
    name: "Accessories>>Gym Accessories",
    top: true,
    display: "7",
    active: true,
  },
  {
    id: 1,
    name: "Accessories",
    top: false,
    display: "9",
    active: true,
  },
  {
    id: 2,
    name: "Accessories>>Gym Bages",
    top: true,
    display: "49",
    active: true,
  },
  {
    id: 3,
    name: "Accessories>>Gym Accessories",
    top: true,
    display: "7",
    active: true,
  },
  {
    id: 1,
    name: "Accessories",
    top: false,
    display: "9",
    active: true,
  },
  {
    id: 2,
    name: "Accessories>>Gym Bages",
    top: true,
    display: "49",
    active: true,
  },
  {
    id: 3,
    name: "Accessories>>Gym Accessories",
    top: true,
    display: "7",
    active: true,
  },
  {
    id: 1,
    name: "Accessories",
    top: false,
    display: "9",
    active: true,
  },
  {
    id: 2,
    name: "Accessories>>Gym Bages",
    top: true,
    display: "49",
    active: true,
  },
  {
    id: 3,
    name: "Accessories>>Gym Accessories",
    top: true,
    display: "7",
    active: true,
  },
  {
    id: 1,
    name: "Accessories",
    top: false,
    display: "9",
    active: true,
  },
  {
    id: 2,
    name: "Accessories>>Gym Bages",
    top: true,
    display: "49",
    active: true,
  },
  {
    id: 3,
    name: "Accessories>>Gym Accessories",
    top: true,
    display: "7",
    active: true,
  },
];

export default function Category() {
  useEffect(() => {
    const token = Cookie.get("access_token");
    if (token === undefined) {
      Router.push("/");
    }
  }, []);
  return (
    <div page-component="category-page">
      <Head>
        <title>{APP_NAME} - Category</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-6">
              <div className="hamburger">
                <span>Catalog / </span>Category
              </div>
              <div className="page-name">Category</div>
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
                  Router.push(`/category/create`);
                }}
              >
                <span>Add New </span>
              </div>
            </div>
          </div>
          <div className="row sticky-scroll scroll">
            <div className="col-md-12 ">
              <CategoryList customer={customer} />
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
