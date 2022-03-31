import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import BrandCreateComponent from "../../component/catalog/brand/brand-create";
import Router from "next/router";
import Cookie from "js-cookie";
import BrandsApi from "../../services/brands";

export default class BrandCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "edit",
      brand: {},
      brandDetails: {
        sort_order: null,
        name: "",
        is_active: null,
      },
    };
  }

  validateData = () => {
    if (
      this.state.brandDetails.name === "" &&
      (this.state.brandDetails.sort_order === "" ||
        this.state.brandDetails.sort_order === null)
    ) {
      toast.error("Please enter Display Order ");
      toast.error("Please enter name");
      return false;
    }
    if (this.state.brandDetails.name === "" || this.state.brandDetails.name.replace(/\s/g, "").length <=0) {
      toast.error("Please enter name");
      return false;
    }
    if (
      this.state.brandDetails.sort_order === "" ||
      this.state.brandDetails.sort_order === null
    ) {
      toast.error("Please enter Display Order ");
      return false;
    }

    return true;
  };

  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.brandDetails.name,
        sort_order: parseInt(this.state.brandDetails.sort_order),
        is_active: this.state.brandDetails.is_active,
      };
      BrandsApi.BrandsCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ brand: response.data.data.Brand });
            toast.success(response.data.message);
            Router.push(`/brand`);
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
  };
  stateHandle = (value) => {
    this.setState({ brandDetails: value });
  };
  componentDidMount() {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Brand</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Catalog / Brand / </span>Add A New Brand
                </div>
                <div className="page-name">Add A New Brand </div>
              </div>
              <div className="col-md-7 btn-save">
                <div
                  className="custom-btn "
                  onClick={() => {
                    this.OnSave();
                  }}
                >
                  <span>Save </span>
                </div>
                <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    Router.push(`/brand`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <BrandCreateComponent
                  mode={this.state.mode}
                  handle={this.stateHandle.bind(this)}
                />
              </div>
            </div>
          </DashboardLayoutComponent>
        </main>
      </div>
    );
  }
}
