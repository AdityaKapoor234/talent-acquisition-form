import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import TypeCreateComponent from "../../component/articles/type/type-create";
import Router from "next/router";
import Cookie from "js-cookie";
import ArticleApi from "../../services/articles";

export default class TypeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "edit",
      type: {},
      TypeDetails: {
        sort_order: null,
        name: "",
        description:"",
        label:"",
        banner_sm_url:"",
        banner_url:"",
        is_active: null,
      },
    };
  }

  validateData = () => {
    if (
      this.state.TypeDetails.name === "" &&
      (this.state.TypeDetails.sort_order === "" ||
        this.state.TypeDetails.sort_order === null)
    ) {
      toast.error("Please enter Display Order ");
      toast.error("Please enter name");
      return false;
    }
    if (this.state.TypeDetails.name === "" || this.state.TypeDetails?.name.replace(/\s/g, "").length <=0) {
      toast.error("Please enter name");
      return false;
    }
    if (this.state.TypeDetails.label === "" || this.state.TypeDetails?.label.replace(/\s/g, "").length <=0) {
      toast.error("Please Choose one option");
      return false;
    }
    if (this.state.TypeDetails.description === "" || this.state.TypeDetails?.description.replace(/\s/g, "").length <=0) {
      toast.error("Please enter description");
      return false;
    }
    if (
      this.state.TypeDetails.sort_order === "" ||
      this.state.TypeDetails.sort_order === null
    ) {
      toast.error("Please enter Display Order ");
      return false;
    }

    return true;
  };

  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.TypeDetails.name,
        sort_order: parseInt(this.state.TypeDetails.sort_order),
        is_active: this.state.TypeDetails.is_active,
        description: this.state.TypeDetails.description,
        label:this.state.TypeDetails.label,
        banner_sm_url:this.state.TypeDetails.banner_sm_url,
        banner_url:this.state.TypeDetails.banner_url
      };
      ArticleApi.TypeCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ type: response.data.data.added_type });
            toast.success(response.data.message);
            Router.push(`/article-type`);
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
    this.setState({ TypeDetails: value });
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
          <title>{APP_NAME} - Type</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Article / Type / </span>Add A New Type
                </div>
                <div className="page-name">Add A New Type </div>
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
                    Router.push(`/article-type`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <TypeCreateComponent
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
