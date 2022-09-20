import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import GoalsCreateComponent from "../../component/catalog/goals/goals-create";
import Router from "next/router";
import Cookie from "js-cookie";
import GoalsApi from "../../services/goals";

export default class GoalsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "edit",
      goals: {},
      is_all: false,
      goalsDetails: {
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


    if (this.state.goalsDetails.name === "" || this.state.goalsDetails.name === null || this.state.goalsDetails.name.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter name");
      this.state.is_all = true;
    }
    // if (this.state.goalsDetails.description === "" || this.state.goalsDetails.description === null || this.state.goalsDetails.description.replace(/\s/g, "").length <= 0) {
    //   toast.error("Please enter description");
    //   this.state.is_all = true;
    // }
    if (this.state.goalsDetails.sort_order === "" || this.state.goalsDetails.sort_order === null) {
      toast.error("Please enter display order ");
      this.state.is_all = true;
    }
    if (this.state.goalsDetails.icon_url === "" || this.state.goalsDetails.icon_url === null || this.state.goalsDetails.icon_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter icon ");
      this.state.is_all = true;
    }
    if (this.state.goalsDetails.banner_url === "" || this.state.goalsDetails.banner_url === null || this.state.goalsDetails.banner_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter full banner image ");
      this.state.is_all = true;
    }
    if (this.state.goalsDetails.banner_url_sm === "" || this.state.goalsDetails.banner_url_sm === null || this.state.goalsDetails.banner_url_sm.replace(/\s/g, "").length <= 0) {
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
        name: this.state.goalsDetails.name,
        description: this.state.goalsDetails.description,
        sort_order: parseInt(this.state.goalsDetails.sort_order),
        icon_url: this.state.goalsDetails.icon_url,
        banner_url: this.state.goalsDetails.banner_url,
        banner_url_sm: this.state.goalsDetails.banner_url_sm,
        is_active: this.state.goalsDetails.is_active,
        show_in_main_menu: this.state.goalsDetails.show_in_main_menu,
      };
      GoalsApi.goalsCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ goals: response.data.data.goal });
            toast.success(response.data.message);
            Router.push(`/goals`);
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
    this.setState({ goalsDetails: value });
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
          <title>{APP_NAME} - Goals</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Catalog / Goals / </span>Add A New Goals
                </div>
                <div className="page-name">Add A New Goals </div>
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
                    Router.push(`/goals`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <GoalsCreateComponent
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
