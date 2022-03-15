import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import ClassificationList from "../../component/catalog/classification/classification-list";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import Cookie from "js-cookie";
import SearchIcon from "@mui/icons-material/Search";

const customer = [
  {
    id: 1,
    name: "Muscle & Strength",
    type: "Goal",
    display: 2,
    active: true,
  },
  {
    id: 2,
    name: "Health & Wellbeing",
    type: "Goal",
    display: 1,
    active: true,
  },
  {
    id: 3,
    name: "Sports Performance",
    type: "Goal",
    display: 3,
    active: true,
  },
  {
    id: 1,
    name: "Energy & Endurance",
    type: "Goal",
    display: 4,
    active: true,
  },
  {
    id: 2,
    name: "Cricket",
    type: "Sport",
    display: 0,
    active: true,
  },
  {
    id: 3,
    name: "Football",
    type: "Sport",
    display: 0,
    active: true,
  },
  {
    id: 1,
    name: "Hockey",
    type: "Sport",
    display: 0,
    active: true,
  },
  {
    id: 2,
    name: "Hockey",
    type: "Sport",
    display: 0,
    active: true,
  },
  {
    id: 3,
    name: "Hockey",
    type: "Sport",
    display: 0,
    active: true,
  },
];
const classification = {
  id: 1,
  name: "Muscle & Strength",
  type: "Goal",
  display: 2,
  active: true,
};

export default function Classification() {
  useEffect(() => {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
  }, []);
  return (
    <div page-component="category-page">
      <Head>
        <title>{APP_NAME} - Classification</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-6">
              <div className="hamburger">
                <span>Catalog / </span>Classification
              </div>
              <div className="page-name">Classification</div>
            </div>
            <div className="col-md-4">
              <div className="login-form ">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-box"
                />
                <SearchIcon className="search-icon point-but" />
              </div>
            </div>
            <div className="col-md-2 btn-save">
              <div
                className="custom-btn "
                onClick={() => {
                  Router.push(`/classification/create`);
                }}
              >
                <span>Add New </span>
              </div>
            </div>
          </div>
          <div className="row sticky-scroll scroll">
            <div className="col-md-12 ">
              <ClassificationList customer={customer} />
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
