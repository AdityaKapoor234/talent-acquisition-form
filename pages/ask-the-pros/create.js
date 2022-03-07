import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import AskTheProsCreateComponent from "../../component/ask-the-pros/ask-the-pros-details";
import Router from "next/router";
import Cookie from "js-cookie";
import AskTheProsApi from "../../services/ask-the-pros";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class AskTheProsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      asktheProps: {},
      open: false,
      askThePropsDetails: {
        
      },
    };
  }
  validateData = () => {
    if (
      this.state.askThePropsDetails?.sort_order === "" ||
      this.state.askThePropsDetails?.sort_order === null
    ) {
      toast.error("Please enter Display Order ");
      return false;
    }

    return true;
  };
  OnSave = () => {
    if (this.validateData()) {
      let data = {
        
      };
      AskTheProsApi.AskThePropsCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ asktheProps: response.data.data });
            toast.success(response.data.message);
            Router.push(`/ask-the-pros`);
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
    this.setState({ askTheProsDetails: value });
  };
  componentDidMount() {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    this.setState({ id: this.props?.id });
  }
  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Ask The Pros</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Ask The Pros / Ask The Pros / </span>Add New Ask The Pros
                </div>
                <div className="page-name">Add New Ask The Pros</div>
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
                    Router.push(`/ask-the-pros`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <AskTheProsCreateComponent
                  askThePros={this.state.asktheProps}
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
