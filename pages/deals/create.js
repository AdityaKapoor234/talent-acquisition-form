import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import DealsCreateComponent from "../../component/cms/deals/deals-create";
import Router from "next/router";
import Cookie from "js-cookie";
import DealsApi from "../../services/deals";

export default class DealsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "edit",
      deals: {},
      is_all: false,
      dealsDetails: {
        label: "",
        deal_start_date: "",
        deal_end_date: "",
        deal_end_date: "",
        color_code: "",
        url: "",
        icon_url: "",
        is_active: false,
        discount_image_url: "",
        brand_logo: "",
        sort_order: null,
      },
    };
  }

  convertDateStringToDate = (dateStr) => {
    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    let date = new Date(dateStr);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    let str =
      date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
    // new Date(dateStr).toISOString().split('T')[0];
    // date.toLocaleDateString('en-CA');
    return str;
  };

  validateData = () => {
    this.setState({ is_all: false });


    if (this.state.dealsDetails.label === "" || this.state.dealsDetails.label === null || this.state.dealsDetails.label.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter label");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.deal_start_date === "" || this.state.dealsDetails.deal_start_date === null || this.state.dealsDetails.deal_start_date.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter deal start date");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.deal_end_date === "" || this.state.dealsDetails.deal_end_date === null || this.state.dealsDetails.deal_end_date.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter deal end date");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.color_code === "" || this.state.dealsDetails.color_code === null || this.state.dealsDetails.color_code.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter color code");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.url === "" || this.state.dealsDetails.url === null || this.state.dealsDetails.url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter url");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.discount_image_url === "" || this.state.dealsDetails.discount_image_url === null || this.state.dealsDetails.discount_image_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter discount image");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.brand_logo === "" || this.state.dealsDetails.brand_logo === null || this.state.dealsDetails.brand_logo.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter brand logo");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.icon_url === "" || this.state.dealsDetails.icon_url === null || this.state.dealsDetails.icon_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter icon");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails?.sort_order === "" || this.state.dealsDetails?.sort_order === null) {
      toast.error("Please enter display order ");
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
        label: this.state.dealsDetails.label,
        deal_start_date: this.convertDateStringToDate(this.state.dealsDetails.deal_start_date),
        deal_end_date: this.convertDateStringToDate(this.state.dealsDetails.deal_end_date),
        color_code: this.state.dealsDetails.color_code,
        url: this.state.dealsDetails.url,
        icon_url: this.state.dealsDetails.icon_url,
        discount_image_url: this.state.dealsDetails.discount_image_url,
        brand_logo: this.state.dealsDetails.brand_logo,
        sort_order: this.state.dealsDetails.sort_order,
        is_active: this.state.dealsDetails.is_active,
      };
      DealsApi.dealsCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ deals: response.data.data.deal });
            toast.success(response.data.message);
            Router.push(`/deals`);
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
    this.setState({ dealsDetails: value });
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
          <title>{APP_NAME} - Deals</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>CMS / Deals / </span>Add A New Deals
                </div>
                <div className="page-name">Add A New Deals </div>
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
                    Router.push(`/deals`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <DealsCreateComponent
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
