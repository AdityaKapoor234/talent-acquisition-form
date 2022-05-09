import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import DietCreateComponent from "../../component/catalog/diet/diet-create";
import Router from "next/router";
import Cookie from "js-cookie";
import DietApi from "../../services/diet";

export default class DietCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "edit",
      diet: {},
      is_all: false,
      dietDetails: {
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


    if (this.state.dietDetails.name === "" || this.state.dietDetails.name === null || this.state.dietDetails.name.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter name");
      this.state.is_all = true;
    }
    if (this.state.dietDetails.description === "" || this.state.dietDetails.description === null || this.state.dietDetails.description.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter description");
      this.state.is_all = true;
    }
    if (this.state.dietDetails.sort_order === "" || this.state.dietDetails.sort_order === null) {
      toast.error("Please enter display order ");
      this.state.is_all = true;
    }
    if (this.state.dietDetails.icon_url === "" || this.state.dietDetails.icon_url === null || this.state.dietDetails.icon_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter icon ");
      this.state.is_all = true;
    }
    if (this.state.dietDetails.banner_url === "" || this.state.dietDetails.banner_url === null || this.state.dietDetails.banner_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter full banner image ");
      this.state.is_all = true;
    }
    if (this.state.dietDetails.banner_url_sm === "" || this.state.dietDetails.banner_url_sm === null || this.state.dietDetails.banner_url_sm.replace(/\s/g, "").length <= 0) {
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
        name: this.state.dietDetails.name,
        description: this.state.dietDetails.description,
        sort_order: parseInt(this.state.dietDetails.sort_order),
        icon_url: this.state.dietDetails.icon_url,
        banner_url: this.state.dietDetails.banner_url,
        banner_url_sm: this.state.dietDetails.banner_url_sm,
        is_active: this.state.dietDetails.is_active,
        show_in_main_menu: this.state.dietDetails.show_in_main_menu,
      };
      DietApi.dietCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ diet: response.data.data.diet });
            toast.success(response.data.message);
            Router.push(`/diet`);
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
    this.setState({ dietDetails: value });
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
          <title>{APP_NAME} - Diet</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Catalog / Diet / </span>Add A New Diet
                </div>
                <div className="page-name">Add A New Diet </div>
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
                    Router.push(`/diet`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <DietCreateComponent
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
