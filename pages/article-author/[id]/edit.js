import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import AuthorCreateComponent from "../../../component/articles/author/author-create";
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

export default class AuthorEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      author: {},
      open: false,
      authorDetails: {
        name: "",
        avatar: "",
        bio:"",
        is_active: null,
      },
    };
  }

  validateData = () => {
    if (this.state.authorDetails.name === "" || this.state.authorDetails?.name.replace(/\s/g, "").length <=0) {
      toast.error("Please enter name");
      return false;
    }
    return true;
  };

  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.authorDetails.name,
        avatar: this.state.authorDetails.avatar,
        bio: this.state.authorDetails.bio,
        // is_active: this.state.authorDetails.is_active,
      };
      ArticleApi.AuthorEdit(this.props.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            toast.success(response.data.message);
            Router.push(`/article-author`);
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
    this.setState({ authorDetails: value });
  };
  getAuthorDetail = (id) => {
    ArticleApi.getAuthorDetails(id)
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
            authorDetails: details,
            author: response.data.data.view,
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
    this.getAuthorDetail(this.props.id);
    this.setState({ id: this.props?.id });
  }

  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Author</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Article / Author / </span>Edit Author
                </div>
                <div className="page-name">
                  Edit Author Details 
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
                    Router.push(`/article-author`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <AuthorCreateComponent
                  author={this.state.author}
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
