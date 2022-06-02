import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import AskTheProsCreateComponent from "../../component/ask-the-pros/ask-the-pros";
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
      mode: "create",
      asktheProps: {},
      expertise: [],
      open: false,
      askTheProsDetails: {
        name: "",
        email: "",
        description: "",
        avatar_url: null,
        is_active: false,
        experience: "",
        expertises: [],
      },
    };
  }

  ValidateEmail = (mail) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    );
  };

  validateData = () => {
    if (
      this.state.askTheProsDetails?.name === "" ||
      this.state.askTheProsDetails?.name === null
    ) {
      toast.error("Please enter the name");
      return false;
    }
    if (
      this.state.askTheProsDetails?.description === "" ||
      this.state.askTheProsDetails?.description === null ||
      this.state.askTheProsDetails?.description === undefined
    ) {
      toast.error("Please enter the description");
      return false;
    }
    if (this.state.askTheProsDetails?.description !== undefined) {
      if (this.state.askTheProsDetails?.description.replace(/\s/g, "").length <= 0) {
        toast.error("Please enter the description");
        return false;
      }
    }
    if (this.state.askTheProsDetails?.email === "" ||
      this.state.askTheProsDetails?.email === null) {
      toast.error("Please enter email address");
      return false;
    }
    if (!this.ValidateEmail(this.state.askTheProsDetails?.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (
      this.state.askTheProsDetails?.avatar_url === "" ||
      this.state.askTheProsDetails?.avatar_url === null
    ) {
      toast.error("Please upload avatar");
      return false;
    }
    if (
      this.state.askTheProsDetails?.experience === "" ||
      this.state.askTheProsDetails?.experience === null
    ) {
      toast.error("Please enter experience");
      return false;
    }

    return true;
  };
  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.askTheProsDetails?.name,
        email: this.state.askTheProsDetails?.email,
        description: this.state.askTheProsDetails?.description,
        avatar_url: this.state.askTheProsDetails?.avatar_url,
        is_active: this.state.askTheProsDetails?.is_active,
        experience: this.state.askTheProsDetails?.experience,
        expertises: this.state.askTheProsDetails?.expertises,
      };
      AskTheProsApi.AskTheProsCreate(data)
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
          <title>{APP_NAME} - Trust The Pros</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Trust The Pros / Trust The Pros / </span>Add New Trust The Pros
                </div>
                <div className="page-name">Add New Trust The Pros</div>
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
