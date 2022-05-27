import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import CategoryCreateComponent from "../../../component/articles/category/category-create";
import Router from "next/router";
import Cookie from "js-cookie";
import ArticleApi from "../../../services/articles";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class CategoryEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      category: {},
      open: false,
      categoryDetails: {
        name: "",
        is_active: null,
      },
    };
  }

  validateData = () => {
    if (this.state.categoryDetails.name === "" || this.state.categoryDetails?.name.replace(/\s/g, "").length <=0) {
      toast.error("Please enter name");
      return false;
    }
    return true;
  };

  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.categoryDetails.name,
        sort_order: parseInt(this.state.categoryDetails.sort_order),
        is_active: this.state.categoryDetails.is_active,
      };
      ArticleApi.CategoryEdit(this.props.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            toast.success(response.data.message);
            Router.push(`/article-category`);
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
  getCategoryDetail = (id) => {
    ArticleApi.getCategoryDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            name: response.data.data.view.name
              ? response.data.data.view.name
              : "",
            is_active: response.data.data.view.is_active
              ? response.data.data.view.is_active
              : null,
          };
          this.setState({
            categoryDetails: details,
            category: response.data.data.view,
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
    this.getCategoryDetail(this.props.id);
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
                  <span>Catalog / Category / </span>Edit Category
                </div>
                <div className="page-name">
                  Edit Category Details 
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
                    Router.push(`/article-category`);
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
