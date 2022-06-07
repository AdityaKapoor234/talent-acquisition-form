import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import ReviewCreateComponent from "../../../component/catalog/review/review-create";
import Router from "next/router";
import Cookie from "js-cookie";
import ReviewApi from "../../../services/review";
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

export default class ReviewEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      review: {},
      open: false,
      is_all: false,
      reviewDetails: {
        rating: null,
        review_title: "",
        review: "",
        img_urls: "",
        user_id: null,
        product_id: null,
        is_verified: false,
        published_at: null,
        user_name: ""

      },
    };
  }
  validateData = () => {
    this.setState({ is_all: false });


    // if (this.state.reviewDetails.name === "" || this.state.reviewDetails.name === null || this.state.reviewDetails.name.replace(/\s/g, "").length <= 0) {
    //   toast.error("Please enter name");
    //   this.state.is_all = true;
    // }
    // if (this.state.reviewDetails.description === "" || this.state.reviewDetails.description === null || this.state.reviewDetails.description.replace(/\s/g, "").length <= 0) {
    //   toast.error("Please enter description");
    //   this.state.is_all = true;
    // }
    // if (this.state.reviewDetails.sort_order === "" || this.state.reviewDetails.sort_order === null) {
    //   toast.error("Please enter display order ");
    //   this.state.is_all = true;
    // }
    // if (this.state.reviewDetails.icon_url === "" || this.state.reviewDetails.icon_url === null || this.state.reviewDetails.icon_url.replace(/\s/g, "").length <= 0) {
    //   toast.error("Please enter icon ");
    //   this.state.is_all = true;
    // }
    // if (this.state.reviewDetails.banner_url === "" || this.state.reviewDetails.banner_url === null || this.state.reviewDetails.banner_url.replace(/\s/g, "").length <= 0) {
    //   toast.error("Please enter full banner image ");
    //   this.state.is_all = true;
    // }
    // if (this.state.reviewDetails.banner_url_sm === "" || this.state.reviewDetails.banner_url_sm === null || this.state.reviewDetails.banner_url_sm.replace(/\s/g, "").length <= 0) {
    //   toast.error("Please enter short banner image ");
    //   this.state.is_all = true;
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
        rating: this.state.reviewDetails.rating,
        review_title: this.state.reviewDetails.review_title,
        review: this.state.reviewDetails.review,
        img_urls: this.state.reviewDetails.images,
        user_id: this.state.reviewDetails.user_id,
        product_id: this.state.reviewDetails.product_id,
      };
      ReviewApi.reviewListEDIT(this.state.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ review: response.data.data });
            toast.success(response.data.message);
            Router.push(`/review`);
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
    this.setState({ reviewDetails: value });
  };
  getreviewDetails = (id) => {
    ReviewApi.reviewViewDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            rating: response.data.data.rating ? response.data.data.rating : "",
            review_title: response.data.data.review_title ? response.data.data.review_title : "",
            review: response.data.data.review ? response.data.data.review : "",
            img_urls: response.data.data.images ? response.data.data.images : "",
            user_id: response.data.data.user_id ? response.data.data.user_id : "",
            product_id: response.data.data.product_id ? response.data.data.product_id : "",
            is_verified: response.data.data.is_verified ? response.data.data.is_verified : "",
            published_at: response.data.data.published_at ? response.data.data.published_at : "",
            user_name: response.data.data.user_name ? response.data.data.user_name : "",
          };
          this.setState({
            reviewDetails: details,
            review: response.data.data,
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
    this.getreviewDetails(this.props.id);
    this.setState({ id: this.props?.id });
  }

  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Review</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Catalog / Review / </span>Edit Review
                </div>
                <div className="page-name">
                  Edit Review Details - {this.state.review?.name}
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
                    Router.push(`/review`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <ReviewCreateComponent
                  review={this.state.review}
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
