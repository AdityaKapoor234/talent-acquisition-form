import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import ContentCreateComponent from "../../component/articles/content/content-create";
import Router from "next/router";
import Cookie from "js-cookie";
import ArticleApi from "../../services/articles";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class ContentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      content: {},
      open: false,
      contentDetails: {
        title: "",
        slug: "",
        content: "",
        status: "",
        feature_image: "",
        author_id: null,
        meta_tags: "",
        meta_title: "",
        meta_description: "",
        category_id: null,
        type_id: null,
        is_show_on_home: false,
        sort_order: null
      },
    };
  }
  validateData = () => {
    // if (
    //   this.state.contentDetails?.name === "" ||
    //   this.state.contentDetails?.name === null || 
    //   this.state.contentDetails?.name.replace(/\s/g, "").length <=0
    // ) {
    //   toast.error("Please enter the name");
    //   return false;
    // }
    // if (
    //   this.state.contentDetails?.full_banner_img === "" ||
    //   this.state.contentDetails?.full_banner_img === null
    // ) {
    //   toast.error("Please upload full banner image");
    //   return false;
    // }
    // if (
    //   this.state.contentDetails?.description === "" ||
    //   this.state.contentDetails?.description === null || 
    //   this.state.contentDetails?.description.replace(/\s/g, "").length <=0
    // ) {
    //   toast.error("Please enter the full description");
    //   return false;
    // }
    // if (
    //   this.state.contentDetails?.sort_order === "" ||
    //   this.state.contentDetails?.sort_order === null
    // ) {
    //   toast.error("Please enter Display Order ");
    //   return false;
    // }

    return true;
  };
  OnSave = () => {
    if (this.validateData()) {
      let data = {
        "title": this.state.contentDetails?.title,
        "slug": this.state.contentDetails?.slug,
        "content":this.state.contentDetails?.content,
        "status": this.state.contentDetails?.status,
        "feature_image": this.state.contentDetails?.feature_image,
        "author_id":this.state.contentDetails?.author_id,
        "meta_tags": this.state.contentDetails?.meta_tags,
        "meta_title": this.state.contentDetails?.meta_title,
        "meta_description": this.state.contentDetails?.meta_description,
        "category_id":this.state.contentDetails?.category_id ,
        "type_id": this.state.contentDetails?.type_id,
        "is_show_on_home": this.state.contentDetails?.is_show_on_home,
        "sort_order": this.state.contentDetails?.sort_order
        
      };
      ArticleApi.contentCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ content: response.data.data.content });
            toast.success(response.data.message);
            Router.push(`/article-content`);
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
    this.setState({ contentDetails: value });
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
          <title>{APP_NAME} - Content</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Article / content / </span>Add New content
                </div>
                <div className="page-name">Add New content</div>
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
                    Router.push(`/article-content`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <ContentCreateComponent
                  content={this.state.content}
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
