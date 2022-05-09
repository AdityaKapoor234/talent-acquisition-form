import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import SportsCreateComponent from "../../component/catalog/sports/sports-create";
import Router from "next/router";
import Cookie from "js-cookie";
import SportsApi from "../../services/sports";

export default class SportsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "edit",
      sports: {},
      is_all: false,
      sportsDetails: {
        name: "",
        description: "",
        sort_order: null,
        icon_url: "",
        banner_url: "",
        banner_url_sm: "",
        is_active: false,
        show_in_main_menu: false,
      },
    };
  }

  validateData = () => {
    this.setState({ is_all: false });


    if (this.state.sportsDetails.name === "" || this.state.sportsDetails.name === null || this.state.sportsDetails.name.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter name");
      this.state.is_all = true;
    }
    if (this.state.sportsDetails.description === "" || this.state.sportsDetails.description === null || this.state.sportsDetails.description.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter description");
      this.state.is_all = true;
    }
    if (this.state.sportsDetails.sort_order === "" || this.state.sportsDetails.sort_order === null) {
      toast.error("Please enter display order ");
      this.state.is_all = true;
    }
    if (this.state.sportsDetails.icon_url === "" || this.state.sportsDetails.icon_url === null || this.state.sportsDetails.icon_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter icon ");
      this.state.is_all = true;
    }
    if (this.state.sportsDetails.banner_url === "" || this.state.sportsDetails.banner_url === null || this.state.sportsDetails.banner_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter full banner image ");
      this.state.is_all = true;
    }
    if (this.state.sportsDetails.banner_url_sm === "" || this.state.sportsDetails.banner_url_sm === null || this.state.sportsDetails.banner_url_sm.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter short banner image ");
      this.state.is_all = true;
    }


    if (this.state.is_all === true) {
      return false;
    }
    else {
      return true;
    }
  };

  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.sportsDetails.name,
        description: this.state.sportsDetails.description,
        sort_order: parseInt(this.state.sportsDetails.sort_order),
        icon_url: this.state.sportsDetails.icon_url,
        banner_url: this.state.sportsDetails.banner_url,
        banner_url_sm: this.state.sportsDetails.banner_url_sm,
        is_active: this.state.sportsDetails.is_active,
        show_in_main_menu: this.state.sportsDetails.show_in_main_menu,
      };
      SportsApi.sportsCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ sports: response.data.data.sport });
            toast.success(response.data.message);
            Router.push(`/sports`);
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
    this.setState({ sportsDetails: value });
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
          <title>{APP_NAME} - Sports</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Catalog / Sports / </span>Add A New Sports
                </div>
                <div className="page-name">Add A New Sports </div>
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
                    Router.push(`/sports`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <SportsCreateComponent
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
