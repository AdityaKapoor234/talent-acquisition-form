import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import TestimonialCategoryCreateComponent from "../../component/testimonial-category/testimonial-category-details";
import Router from "next/router";
import Cookie from "js-cookie";
import TestimonialCategoryApi from "../../services/testimonial-category";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export default class TestimonialCategoryEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "edit",
      testimonialCategory: {},
      open: false,
      testimonialCategoryDetails: {
        name: "",
        is_active: false,
      },
    };
  }
  validateData = () => {


    if (this.state.testimonialCategoryDetails.name === "" || this.state.testimonialCategoryDetails.name === null || this.state.testimonialCategoryDetails.name === undefined) {
      toast.error("Please enter name");
      return false;
    }

    if (this.state.testimonialCategoryDetails.name !== undefined) {
      if (this.state.testimonialCategoryDetails.name.replace(/\s/g, "").length <= 0) {
        toast.error("Please enter name");
        return false;
      }
    }


    return true;
  };

  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.testimonialCategoryDetails.name,
        is_active: this.state.testimonialCategoryDetails.is_active,
      };
      TestimonialCategoryApi.testimonialCategoryCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ testimonialCategory: response.data.data.updated });
            toast.success(response.data.message);
            Router.push(`/testimonial-category`);
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
    this.setState({ testimonialCategoryDetails: value });
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
          <title>{APP_NAME} - Category</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Testimonial / Category / </span>Edit Category
                </div>
                <div className="page-name">
                  Edit Category Details - {this.state.testimonialCategory?.name}
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
                {/* <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    this.setState({ open: true });
                  }}
                >
                  <span>Delete </span>
                </div> */}
                <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    Router.push(`/testimonial-category`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <TestimonialCategoryCreateComponent
                  testimonialCategory={this.state.testimonialCategory}
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
