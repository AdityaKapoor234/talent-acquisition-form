import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import ArticleCreateComponent from "../../../component/articles/content/content-create";
import ArticleApi from "../../../services/articles";
import Router from "next/router";
import Cookie from "js-cookie";
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

export default class ArticleViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "view",
      open: false,
      article: [],
      articleDetails: {
        title: "",
        slug: "",
        content: "",
        status: "",
        feature_image: "",
        published_at: "",
        author_id: null,
        meta_tags: "",
        meta_title: "",
        meta_description: "",
        category_id: null,
        type_id: null,
        is_show_on_home: false,
        sort_order: null,
        short_description:null
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
    if (
      this.state.articleDetails?.title === "" ||
      this.state.articleDetails?.title === null ||
      this.state.articleDetails?.title === undefined
      // this.state.articleDetails?.title.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the title");
      return false;
    }
    if (
      this.state.articleDetails?.slug === "" ||
      this.state.articleDetails?.slug === null ||
      this.state.articleDetails?.slug === undefined
      // this.state.articleDetails?.slug.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the slug");
      return false;
    }
    if (
      this.state.articleDetails?.status === "select" ||
      this.state.articleDetails?.status === null ||
      this.state.articleDetails?.status === undefined
      // this.state.articleDetails?.status.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please select the status");
      return false;
    }
    if (
      this.state.articleDetails?.feature_image === "" ||
      this.state.articleDetails?.feature_image === null ||
      this.state.articleDetails?.feature_image === undefined
      // this.state.articleDetails?.feature_image.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the feature image");
      // return false;
    }
    if (
      this.state.articleDetails?.meta_tags === "" ||
      this.state.articleDetails?.meta_tags === null ||
      this.state.articleDetails?.meta_tags === undefined
      // this.state.articleDetails?.meta_tags.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the meta tags");
      return false;
    }
    if (
      this.state.articleDetails?.meta_title === "" ||
      this.state.articleDetails?.meta_title === null ||
      this.state.articleDetails?.meta_title === undefined
      // this.state.articleDetails?.meta_title.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the meta title");
      return false;
    }
    if (
      this.state.articleDetails?.meta_description === "" ||
      this.state.articleDetails?.meta_description === null ||
      this.state.articleDetails?.meta_description === undefined
      // this.state.articleDetails?.meta_description.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the meta description");
      return false;
    }
    if (
      this.state.articleDetails?.category_id === "select" ||
      this.state.articleDetails?.category_id === null ||
      this.state.articleDetails?.category_id === undefined
      // this.state.articleDetails?.category_id.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please select the category");
      return false;
    }
    if (
      this.state.articleDetails?.type_id === "select" ||
      this.state.articleDetails?.type_id === null ||
      this.state.articleDetails?.type_id === undefined
      // this.state.articleDetails?.type_id.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please select the type");
      return false;
    }
    if (
      this.state.articleDetails?.author_id === "select" ||
      this.state.articleDetails?.author_id === null ||
      this.state.articleDetails?.author_id === undefined
      // this.state.articleDetails?.author_id.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please select the author");
      return false;
    }
    if (
      !this.state.articleDetails?.content || 
      this.state.articleDetails?.content ==="<p></p>\n" || 
      this.state.articleDetails?.content.replace(/&nbsp;/g, "").length <=8
      // this.state.articleDetails?.content === "" ||
      // this.state.articleDetails?.content === null ||
      // this.state.articleDetails?.content === undefined
      // this.state.articleDetails?.content.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the product label");
      return false;
    }
    // if (
    //   this.state.articleDetails?.published_at === "" ||
    //   this.state.articleDetails?.published_at === null ||
    //   this.state.articleDetails?.published_at === undefined
      // this.state.articleDetails?.published_at.replace(/\s/g, "").length <= 0
    // ) {
    //   toast.error("Please enter the publish date");
    //   return false;
    // }
    if (
      this.state.articleDetails?.sort_order === "" ||
      this.state.articleDetails?.sort_order === null ||
      this.state.articleDetails?.sort_order === undefined
      // this.state.articleDetails?.sort_order.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the display order");
      return false;
    }
    

    return true;
  };
  stateHandle = (value) => {
    this.setState({ articleDetails: value });
  };
  getarticleDetails = (id) => {
    ArticleApi.getContentDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            title: response.data.data.title,
            slug: response.data.data.slug,
            content: response.data.data.content,
            status: response.data.data.status,
            feature_image: response.data.data.feature_image,
            published_at: response.data.data.published_at,
            author_id: response.data.data.author_id,
            meta_tags: response.data.data.meta_tags,
            meta_title: response.data.data.meta_title,
            meta_description: response.data.data.meta_description,
            category_id: response.data.data.category_id,
            type_id: response.data.data.type_id,
            is_show_on_home: response.data.data.is_show_on_home,
            sort_order: response.data.data.sort_order,
            short_description:response.data.data?.short_description
          };
          this.setState({
            articleDetails: details,
          });
          this.setState({ article: response.data.data });
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
      ArticleApi.ContentDelete(id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ article: response.data.data });
            Router.push("/article-content");
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
    this.getarticleDetails(this.props.id);
    this.setState({ id: this.props?.id });
  }
  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Content</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Article / Content /  </span>View Content
                </div>
                <div className="page-name">
                  Edit Content  - {this.state.content?.title}
                </div>
              </div>
              <div className="col-md-7 btn-save">
                <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    this.setState({ open: true });
                  }}
                >
                  <span>Delete </span>
                </div>
                <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    Router.push(`/article-content`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <ArticleCreateComponent
                  content={this.state.articleDetails}
                  mode={this.state.mode}
                  handle={this.stateHandle.bind(this)}
                  userType={this.state.userType}
                />
              </div>
            </div>
          </DashboardLayoutComponent>
          <Dialog
            open={this.state.open}
            onClose={() => this.setState({ open: false })}
            maxWidth="sm"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle style={{ color: "#012169" }}>
              Confirm the action
            </DialogTitle>
            <Box position="absolute" top={0} right={0}>
              <IconButton onClick={() => this.setState({ open: false })}>
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent>
              <Typography style={{ color: "#7e8f99" }}>
                Are you sure you want to delete this content?
              </Typography>
            </DialogContent>
            <DialogActions style={{ marginBottom: "0.5rem" }}>
              <Button
                onClick={() => {
                  this.setState({ open: false });
                }}
                style={{
                  color: "#012169",
                  background: "white",
                  borderRadius: "0px",
                }}
                color="primary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.Delete(this.state.id)}
                style={{ background: "#f54a00", borderRadius: "0px" }}
                color="secondary"
                variant="contained"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    );
  }
}
