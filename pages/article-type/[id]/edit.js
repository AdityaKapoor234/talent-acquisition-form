import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import TypeCreateComponent from "../../../component/articles/type/type-create";
import Router from "next/router";
import Cookie from "js-cookie";
import ArticleApi from "../../../services/articles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class TypeEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      open: false,
      type:{},
      TypeDetails: {
        sort_order: null,
        name: "",
        description:"",
        short_description: "",
        label:"",
        bg_img:"",
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
    if (this.state.TypeDetails.short_description === "" || this.state.TypeDetails?.short_description.replace(/\s/g, "").length <=0) {
      toast.error("Please enter short description");
      return false;
    }
    if (
      this.state.TypeDetails.sort_order === "" ||
      this.state.TypeDetails.sort_order === null
    ) {
      toast.error("Please enter Display Order ");
      return false;
    }
    if (this.state.TypeDetails.bg_img === "" || this.state.TypeDetails.bg_img === null || this.state.TypeDetails?.bg_img.replace(/\s/g, "").length <=0) {
      toast.error("Please enter icon");
      return false;
    }
    if (this.state.TypeDetails.banner_sm_url === "" || this.state.TypeDetails.banner_sm_url === null || this.state.TypeDetails?.banner_sm_url.replace(/\s/g, "").length <=0) {
      toast.error("Please enter short banner image");
      return false;
    }
    if (this.state.TypeDetails.banner_url === "" || this.state.TypeDetails.banner_url === null || this.state.TypeDetails?.banner_url.replace(/\s/g, "").length <=0) {
      toast.error("Please enter full banner image");
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
        short_description: this.state.TypeDetails.short_description,
        label:this.state.TypeDetails.label,
        bg_img:this.state.TypeDetails.bg_img,
        banner_sm_url:this.state.TypeDetails.banner_sm_url,
        banner_url:this.state.TypeDetails.banner_url
      };
      ArticleApi.TypeEdit(this.props.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
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
  getTypeDetails = (id) => {
    ArticleApi.getTypeDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            sort_order: response.data.data.view.sort_order
              ? response.data.data.view.sort_order
              : null,
            name: response.data.data.view.name
              ? response.data.data.view.name
              : "",
            is_active: response.data.data.view.is_active
              ? response.data.data.view.is_active
              : null,
            description: response.data.data.view?.description ?response.data.data.view?.description:"",
            short_description: response.data.data.view?.short_description ?response.data.data.view?.short_description:"",
            label:response.data.data.view?.label? response.data.data.view?.label:"",
            bg_img:response.data.data.view?.bg_img? response.data.data.view?.bg_img:"",
            banner_sm_url:response.data.data.view?.banner_sm_url? response.data.data.view?.banner_sm_url:"",
            banner_url:response.data.data.view?.banner_url? response.data.data.view?.banner_url:""
          };
          this.setState({
            TypeDetails: details,
            type: response.data.data.view,
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

  componentDidMount() {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    this.getTypeDetails(this.props.id);
    this.setState({ id: this.props?.id });
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
                  <span>Article / Type / </span>Edit Type
                </div>
                <div className="page-name">
                  Edit Type Details 
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
                  type={this.state.type}
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
