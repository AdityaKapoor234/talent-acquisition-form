import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import CategoryCreateComponent from "../../../component/catalog/category/category-create";
import Router from "next/router";
import Cookie from "js-cookie";
import CategoryApi from "../../../services/category";
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

export default class CategoryEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      category: {},
      open: false,
      categoryDetails: {
        banner_img: 'https://fitcart-qa.s3.ap-south-1.amazonaws.com/static/category_icon.png',
        description: "",
        full_banner_img: null,
        full_banner_img_sm: null,
        id: null,
        is_active: null,
        name: '',
        parent_id:null,
        short_description:'',
        show_in_main_menu: null,
        show_in_top_menu: null,
        sort_order: null,
      },
    };
  }
  validateData = () => {
    // if (this.state.categoryDetails?.banner_img === "" || this.state.categoryDetails?.banner_img === null) {
    //   toast.error("Please upload icon");
    //   return false;
    // }
    if (this.state.categoryDetails?.full_banner_img === "" || this.state.categoryDetails?.full_banner_img === null) {
      toast.error("Please upload full banner image");
      return false;
    }
    if (this.state.categoryDetails?.full_banner_img_sm === "" || this.state.categoryDetails?.full_banner_img_sm === null) {
      toast.error("Please upload short banner image");
      return false;
    }
    if (this.state.categoryDetails?.name === "" || this.state.categoryDetails?.name === null) {
      toast.error("Please enter the name");
      return false;
    }
    // if (this.state.categoryDetails?.short_description === "" ||this.state.categoryDetails?.short_description === null) {
    //   toast.error("Please enter the short description");
    //   return false;
    // }
    if (this.state.categoryDetails?.description === "" ||this.state.categoryDetails?.description=== null) {
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
        banner_img: this.state.categoryDetails?.banner_img,
        description: this.state.categoryDetails?.description,
        full_banner_img: this.state.categoryDetails?.full_banner_img,
        full_banner_img_sm: this.state.categoryDetails?.full_banner_img_sm,
        is_active: this.state.categoryDetails?.is_active,
        name: this.state.categoryDetails?.name,
        parent_id:this.state.categoryDetails?.parent_id,
        short_description:this.state.categoryDetails?.short_description,
        show_in_main_menu: this.state.categoryDetails?.show_in_main_menu,
        show_in_top_menu: this.state.categoryDetails?.show_in_top_menu,
        sort_order: this.state.categoryDetails?.sort_order,
      };
      CategoryApi.CategoryEdit(this.props.id, data)
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
  getCategoryDetails = (id) => {
    CategoryApi.getCategoryDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            banner_img: response.data.data.category?.banner_img,
            description: response.data.data.category?.description,
            full_banner_img: response.data.data.category?.full_banner_img,
            full_banner_img_sm: response.data.data.category?.full_banner_img_sm,
            id: response.data.data.category?.id,
            is_active: response.data.data.category?.is_active,
            name: response.data.data.category?.name,
            parent_id: response.data.data.category?.parent_id,
            short_description: response.data.data.category?.short_description,
            show_in_main_menu: response.data.data.category?.show_in_main_menu,
            show_in_top_menu: response.data.data.category?.show_in_top_menu,
            sort_order: response.data.data.category?.sort_order,
          };
          this.setState({
            categoryDetails: details,
            category: response.data.data.category,
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
    CategoryApi.CategoryDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ category: response.data.data.category });
          Router.push("/category");
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
    this.getCategoryDetails(this.props.id);
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
                  Edit Category Details - {this.state.categoryDetails?.name}
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
                    this.setState({ open: true });
                  }}
                >
                  <span>Delete </span>
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
                Are you sure you want to delete this category?
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
