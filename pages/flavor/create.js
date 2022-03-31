import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import FlavorCreateComponent from "../../component/catalog/flavor/flavor-create";
import Router from "next/router";
import Cookie from "js-cookie";
import FlavorApi from "../../services/flavor";

export default class FlavorCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "edit",
      flavor: {},
      flavorDetails: {
        sort_order: null,
        name: "",
        is_active: null,
      },
    };
  }

  validateData = () => {
    if (
      this.state.flavorDetails.name === "" &&
      (this.state.flavorDetails.sort_order === "" ||
        this.state.flavorDetails.sort_order === null)
    ) {
      toast.error("Please enter Display Order ");
      toast.error("Please enter name");
      return false;
    }
    if (this.state.flavorDetails.name === "" || this.state.flavorDetails?.name.replace(/\s/g, "").length <=0) {
      toast.error("Please enter name");
      return false;
    }
    if (
      this.state.flavorDetails.sort_order === "" ||
      this.state.flavorDetails.sort_order === null
    ) {
      toast.error("Please enter Display Order ");
      return false;
    }

    return true;
  };

  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.flavorDetails.name,
        sort_order: parseInt(this.state.flavorDetails.sort_order),
        is_active: this.state.flavorDetails.is_active,
      };
      FlavorApi.FlavorCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ flavor: response.data.data.Flavor });
            toast.success(response.data.message);
            Router.push(`/flavor`);
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
    this.setState({ flavorDetails: value });
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
          <title>{APP_NAME} - Flavor</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Catalog / Flavor / </span>Add A New Flavor
                </div>
                <div className="page-name">Add A New Flavor </div>
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
                    Router.push(`/flavor`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <FlavorCreateComponent
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
