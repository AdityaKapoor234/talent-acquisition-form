import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import FlavorCreateComponent from "../../../component/catalog/flavor/flavor-create";
import Router from "next/router";
import Cookie from "js-cookie";
import FlavorApi from "../../../services/flavor";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class FlavorEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
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
    if (this.state.flavorDetails.name === "") {
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
      FlavorApi.FlavorEdit(this.props.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ flavor: response.data.data.flavor });
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
  getFlavorDetails = (id) => {
    FlavorApi.getFlavorDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            sort_order: response.data.data.flavor.sort_order
              ? response.data.data.flavor.sort_order
              : null,
            name: response.data.data.flavor.name
              ? response.data.data.flavor.name
              : "",
            is_active: response.data.data.flavor.is_active
              ? response.data.data.flavor.is_active
              : null,
          };
          this.setState({
            flavorDetails: details,
            flavor: response.data.data.flavor,
          });
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
  };
  Delete = (id) => {
    let data = {};
    FlavorApi.FlavorDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ flavor: response.data.data.flavor });
          Router.push("/flavor");
          toast.success(response.data.message);
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
  };
  componentDidMount() {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    this.getFlavorDetails(this.props.id);
    this.setState({ id: this.props?.id });
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
                  <span>Catalog / Flavor / </span>Edit Flavor
                </div>
                <div className="page-name">
                  Edit Flavor Details - {this.state.flavor.name}
                </div>
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
                    this.Delete(this.state.id);
                  }}
                >
                  <span>Delete </span>
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
                  flavor={this.state.flavor}
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
