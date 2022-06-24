import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import TestimonialCreateComponent from "../../component/testimonial/testimonial-details";
import Router from "next/router";
import Cookie from "js-cookie";
import TestimonialApi from "../../services/testimonial";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


export default class TestimonialEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "edit",
      createMode: "create",
      testimonial: {},
      testimonialCategoryDropdown: [],
      open: false,
      testimonialDetails: {
        name: "",
        designation: "",
        content: "",
        image_url: "",
        video_url: "",
        category_id: null,
        sort_order: null,
        is_active: false,
      },
    };
  }
  validateData = () => {


    if (this.state.testimonialDetails.name === "" || this.state.testimonialDetails.name === null || this.state.testimonialDetails.name === undefined) {
      toast.error("Please enter name");
      return false;
    }
    if (this.state.testimonialDetails.name !== undefined) {
      if (this.state.testimonialDetails.name.replace(/\s/g, "").length <= 0) {
        toast.error("Please enter name");
        return false;
      }
    }


    if (this.state.testimonialDetails.designation === "" || this.state.testimonialDetails.designation === null || this.state.testimonialDetails.designation === undefined) {
      toast.error("Please enter designation");
      return false;
    }
    if (this.state.testimonialDetails.designation !== undefined) {
      if (this.state.testimonialDetails.designation.replace(/\s/g, "").length <= 0) {
        toast.error("Please enter designation");
        return false;
      }
    }


    if (this.state.testimonialDetails.content === "" || this.state.testimonialDetails.content === null || this.state.testimonialDetails.content === undefined) {
      toast.error("Please enter content");
      return false;
    }
    if (this.state.testimonialDetails.content !== undefined) {
      if (this.state.testimonialDetails.content.replace(/\s/g, "").length <= 0) {
        toast.error("Please enter content");
        return false;
      }
    }

    if (this.state.testimonialDetails.image_url === "" || this.state.testimonialDetails.image_url === null || this.state.testimonialDetails.image_url === undefined) {
      toast.error("Please enter image");
      return false;
    }
    if (this.state.testimonialDetails.image_url !== undefined) {
      if (this.state.testimonialDetails.image_url.replace(/\s/g, "").length <= 0) {
        toast.error("Please enter image");
        return false;
      }
    }


    // if (this.state.testimonialDetails.video_url === "" || this.state.testimonialDetails.video_url === null || this.state.testimonialDetails.video_url === undefined) {
    //   toast.error("Please enter video url");
    //   return false;
    // }
    // if (this.state.testimonialDetails.video_url !== undefined) {
    //   if (this.state.testimonialDetails.video_url.replace(/\s/g, "").length <= 0) {
    //     toast.error("Please enter video url");
    //     return false;
    //   }
    // }


    if (this.state.testimonialDetails.category_id === "select" || this.state.testimonialDetails.category_id === null || this.state.testimonialDetails.category_id === undefined) {
      toast.error("Please enter category");
      return false;
    }


    if (this.state.testimonialDetails.sort_order === null || this.state.testimonialDetails.sort_order === null || this.state.testimonialDetails.sort_order === undefined) {
      toast.error("Please enter display order ");
      return false;
    }


    return true;
  };

  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.testimonialDetails.name,
        designation: this.state.testimonialDetails.designation,
        content: this.state.testimonialDetails.content,
        image_url: this.state.testimonialDetails.image_url,
        video_url: this.state.testimonialDetails.video_url,
        category_id: parseInt(this.state.testimonialDetails.category_id),
        sort_order: parseInt(this.state.testimonialDetails.sort_order),
        is_active: true,
      };
      TestimonialApi.testimonialCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ testimonial: response.data.data.updated });
            toast.success(response.data.message);
            Router.push(`/testimonial`);
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
    this.setState({ testimonialDetails: value });
  };
  gettestimonialDropdownCategory = () => {
    TestimonialApi.testimonialDropdownCategory()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ testimonialCategoryDropdown: response.data.data.list })
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

  componentDidMount() {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    this.gettestimonialDropdownCategory();
  }

  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Testimonial</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Testimonial / Testimonial / </span>Edit Testimonial
                </div>
                <div className="page-name">
                  Edit Testimonial Details - {this.state.testimonial?.name}
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
                    Router.push(`/testimonial`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <TestimonialCreateComponent
                  testimonial={this.state.testimonial}
                  testimonialCategoryDropdown={this.state.testimonialCategoryDropdown}
                  mode={this.state.mode}
                  createMode={this.state.createMode}
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
                Are you sure you want to delete this testimonial?
              </Typography>
            </DialogContent>
            <DialogActions style={{ marginBottom: "0.5rem" }}>
              <Button
                onClick={() => {
                  this.setState({ open: false });
                }}
                style={{
                  color: "#012169",
                  borderRadius: "0px",
                  background: "white",
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
