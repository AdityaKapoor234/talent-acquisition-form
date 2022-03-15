import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import CategoryCreateComponent from "../../component/catalog/category/category-create";
import Router from "next/router";
import Cookie from "js-cookie";
import CategoryApi from "../../services/category";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class CategoryCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      category: {},
      open: false,
      categoryDetails: {
        banner_img: null,
        description: "",
        full_banner_img: null,
        full_banner_img_sm: null,
        id: null,
        is_active: null,
        name: "",
        parent_id: null,
        short_description: "",
        show_in_main_menu: null,
        show_in_top_menu: null,
        sort_order: null,
      },
    };
  }
  validateData = () => {
    if (
      this.state.categoryDetails?.name === "" ||
      this.state.categoryDetails?.name === null
    ) {
      toast.error("Please enter the name");
      return false;
    }
    // if (
    //   this.state.categoryDetails?.banner_img === "" ||
    //   this.state.categoryDetails?.banner_img === null
    // ) {
    //   toast.error("Please upload icon");
    //   return false;
    // }
    if (
      this.state.categoryDetails?.full_banner_img === "" ||
      this.state.categoryDetails?.full_banner_img === null
    ) {
      toast.error("Please upload full banner image");
      return false;
    }
    if (
      this.state.categoryDetails?.full_banner_img_sm === "" ||
      this.state.categoryDetails?.full_banner_img_sm === null
    ) {
      toast.error("Please upload short banner image");
      return false;
    }
    if (
      this.state.categoryDetails?.short_description === "" ||
      this.state.categoryDetails?.short_description === null
    ) {
      toast.error("Please enter the short description");
      return false;
    }
    if (
      this.state.categoryDetails?.description === "" ||
      this.state.categoryDetails?.description === null
    ) {
      toast.error("Please enter the full description");
      return false;
    }
    if (
      this.state.categoryDetails?.sort_order === "" ||
      this.state.categoryDetails?.sort_order === null
    ) {
      toast.error("Please enter Display Order ");
      return false;
    }

    return true;
  };
  OnSave = () => {
    if (this.validateData()) {
      let data = {
        banner_img: '/images/category_icon.png',
        description: this.state.categoryDetails?.description,
        full_banner_img: this.state.categoryDetails?.full_banner_img,
        full_banner_img_sm: this.state.categoryDetails?.full_banner_img_sm,
        is_active: this.state.categoryDetails?.is_active,
        name: this.state.categoryDetails?.name,
        parent_id: this.state.categoryDetails?.parent_id,
        short_description: this.state.categoryDetails?.short_description,
        show_in_main_menu: this.state.categoryDetails?.show_in_main_menu,
        show_in_top_menu: this.state.categoryDetails?.show_in_top_menu,
        sort_order: this.state.categoryDetails?.sort_order,
      };
      CategoryApi.CategoryCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ category: response.data.data.category });
            toast.success(response.data.message);
            Router.push(`/category`);
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
    this.setState({ categoryDetails: value });
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
          <title>{APP_NAME} - Category</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Catalog / Category / </span>Add New Category
                </div>
                <div className="page-name">Add New Category</div>
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
                    Router.push(`/category`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <CategoryCreateComponent
                  category={this.state.category}
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
