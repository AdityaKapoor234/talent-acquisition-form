import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import GstCreateComponent from "../../component/hsn-code/gst/gst-details";
import Router from "next/router";
import Cookie from "js-cookie";
import GstApi from "../../services/gst";
import CustomerApi from "../../services/customer";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class GstCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      createMode: "create",
      gst: {},
      gstHsnCode: [],
      open: false,
      is_all: false,
      gstDetails: {
        hsn_code: "",
        category_name: "",
        cgst: null,
        sgst: null,
        igst: null,
        is_active: false,
        is_hsn_code: false,
        is_category_name: false,
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

  ValidateEmail = (mail) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    );
  };

  validateData = () => {
    this.setState({ is_all: false });
    this.setState({ is_hsn_code: false });
    this.setState({ is_category_name: false });

    if (
      this.state.gstDetails?.hsn_code === "" ||
      this.state.gstDetails?.hsn_code === null ||
      this.state.gstDetails?.hsn_code === undefined
    ) {
      toast.error("Please enter the HSN Code");
      this.state.is_all = true;
      this.state.is_hsn_code = true;
    }
    if (this.state.gstDetails?.hsn_code !== undefined) {
      if (this.state.gstDetails?.hsn_code.replace(/\s/g, "").length <= 0) {
        if (this.state.is_hsn_code === false) {
          toast.error("Please enter the HSN Code");
          this.state.is_all = true;
        }
      }
    }
    if (
      this.state.gstDetails?.category_name === "" ||
      this.state.gstDetails?.category_name === null ||
      this.state.gstDetails?.category_name === undefined
    ) {
      toast.error("Please enter the category name");
      this.state.is_all = true;
      this.state.is_category_name = true;
    }
    if (this.state.gstDetails?.category_name !== undefined) {
      if (this.state.gstDetails?.category_name.replace(/\s/g, "").length <= 0) {
        if (this.state.is_category_name === false) {
          toast.error("Please enter the category name");
          this.state.is_all = true;
        }
      }
    }
    if (
      this.state.gstDetails?.cgst === "" ||
      this.state.gstDetails?.cgst === null ||
      this.state.gstDetails?.cgst === undefined
    ) {
      toast.error("Please enter the CGST");
      this.state.is_all = true;
    }
    // if (this.state.gstDetails?.cgst !== undefined) {
    //   if (this.state.gstDetails?.cgst.replace(/\s/g, "").length <= 0) {
    //     toast.error("Please enter the CGST");
    //     this.state.is_all=true;
    //   }
    // }
    if (
      this.state.gstDetails?.sgst === "" ||
      this.state.gstDetails?.sgst === null ||
      this.state.gstDetails?.sgst === undefined
    ) {
      toast.error("Please enter the SGST");
      this.state.is_all = true;
    }
    // if (this.state.gstDetails?.sgst !== undefined) {
    //   if (this.state.gstDetails?.sgst.replace(/\s/g, "").length <= 0) {
    //     toast.error("Please enter the SGST");
    //     this.state.is_all=true;
    //   }
    // }
    if (
      this.state.gstDetails?.igst === "" ||
      this.state.gstDetails?.igst === null ||
      this.state.gstDetails?.igst === undefined
    ) {
      toast.error("Please enter the IGST");
      this.state.is_all = true;
    }
    // if (this.state.gstDetails?.igst !== undefined) {
    //   if (this.state.gstDetails?.igst.replace(/\s/g, "").length <= 0) {
    //     toast.error("Please enter the IGST");
    //   this.state.is_all=true;
    //   }
    // }

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
        hsn_code: this.state.gstDetails?.hsn_code,
        category_name: this.state.gstDetails?.category_name,
        cgst: this.state.gstDetails?.cgst,
        sgst: this.state.gstDetails?.sgst,
        igst: this.state.gstDetails?.igst,
        is_active: true,
      };
      GstApi.gstCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ gst: response.data.data.gst });
            toast.success(response.data.message);
            Router.push(`/gst`);
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
    this.setState({ gstDetails: value });
  };

  gstHsnCodeDropdownDetails = () => {
    GstApi.gstHsnCodeDropdownDetails()
      .then((response) => {
        this.setState({ gstHsnCode: response.data.data.list })
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

  componentDidMount() {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    this.setState({ id: this.props?.id });
    this.gstHsnCodeDropdownDetails();
  }
  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - GST</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Configurations / HSN Master / </span>Add New HSN Master
                </div>
                <div className="page-name">Add New HSN Master</div>
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
                    Router.push(`/gst`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <GstCreateComponent
                  gst={this.state.gst}
                  mode={this.state.mode}
                  handle={this.stateHandle.bind(this)}
                  gstHsnCode={this.state.gstHsnCode}
                  createMode={this.state.createMode}
                />
              </div>
            </div>
          </DashboardLayoutComponent>
        </main>
      </div>
    );
  }
}
