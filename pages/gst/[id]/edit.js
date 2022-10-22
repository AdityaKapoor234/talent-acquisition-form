import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import GstCreateComponent from "../../../component/hsn-code/gst/gst-details";
import GstApi from "../../../services/gst";
import CustomerApi from "../../../services/customer";
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

export default class GstEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      open: false,
      gstHsnCode: [],
      gst: [],
      is_all: false,
      gstDetails: {
        hsn_code: "",
        category_name: "",
        cgst: null,
        sgst: null,
        igst: null,
        is_active: false,
        is_hsn_code: false,
        is_category_name: false,
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
    // return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    return /^[a-zA-Z]{1}\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      mail
    );
  };

  validateData = () => {
    this.setState({ is_all: false });
    this.setState({ is_hsn_code: false });
    this.setState({ is_category_name: false });

    if (
      this.state.gstDetails?.hsn_code === "" ||
      this.state.gstDetails?.hsn_code === null ||
      this.state.gstDetails?.hsn_code === undefined
    ) {
      toast.error("Please enter the HSN Code");
      this.state.is_all = true;
      this.state.is_hsn_code = true;
    }
    if (this.state.gstDetails?.hsn_code !== undefined) {
      if (this.state.gstDetails?.hsn_code.replace(/\s/g, "").length <= 0) {
        if (this.state.is_hsn_code === false) {
          toast.error("Please enter the HSN Code");
          this.state.is_all = true;
        }
      }
    }
    if (
      this.state.gstDetails?.category_name === "" ||
      this.state.gstDetails?.category_name === null ||
      this.state.gstDetails?.category_name === undefined
    ) {
      toast.error("Please enter the category name");
      this.state.is_all = true;
      this.state.is_category_name = true;
    }
    if (this.state.gstDetails?.category_name !== undefined) {
      if (this.state.gstDetails?.category_name.replace(/\s/g, "").length <= 0) {
        if (this.state.is_category_name === false) {
          toast.error("Please enter the category name");
          this.state.is_all = true;
        }
      }
    }
    if (
      this.state.gstDetails?.cgst === "" ||
      this.state.gstDetails?.cgst === null ||
      this.state.gstDetails?.cgst === undefined
    ) {
      toast.error("Please enter the CGST");
      this.state.is_all = true;
    }
    // if (this.state.gstDetails?.cgst !== undefined) {
    //   if (this.state.gstDetails?.cgst.replace(/\s/g, "").length <= 0) {
    //     toast.error("Please enter the CGST");
    //     this.state.is_all=true;
    //   }
    // }
    if (
      this.state.gstDetails?.sgst === "" ||
      this.state.gstDetails?.sgst === null ||
      this.state.gstDetails?.sgst === undefined
    ) {
      toast.error("Please enter the SGST");
      this.state.is_all = true;
    }
    // if (this.state.gstDetails?.sgst !== undefined) {
    //   if (this.state.gstDetails?.sgst.replace(/\s/g, "").length <= 0) {
    //     toast.error("Please enter the SGST");
    //     this.state.is_all=true;
    //   }
    // }
    if (
      this.state.gstDetails?.igst === "" ||
      this.state.gstDetails?.igst === null ||
      this.state.gstDetails?.igst === undefined
    ) {
      toast.error("Please enter the IGST");
      this.state.is_all = true;
    }
    // if (this.state.gstDetails?.igst !== undefined) {
    //   if (this.state.gstDetails?.igst.replace(/\s/g, "").length <= 0) {
    //     toast.error("Please enter the IGST");
    //   this.state.is_all=true;
    //   }
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
        hsn_code: this.state.gstDetails?.hsn_code,
        category_name: this.state.gstDetails?.category_name,
        cgst: this.state.gstDetails?.cgst,
        sgst: this.state.gstDetails?.sgst,
        igst: this.state.gstDetails?.igst,
        is_active: this.state.gstDetails?.is_active,
      };
      GstApi.gstListEDIT(this.props.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ gst: response.data.data.gst });
            toast.success(response.data.message);
            Router.push(`/gst`);
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
    this.setState({ gstDetails: value });
  };
  getGstDetails = (id) => {
    GstApi.gstViewDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            hsn_code: response.data.data.gst?.hsn_code,
            category_name: response.data.data.gst?.category_name,
            cgst: response.data.data.gst?.cgst,
            sgst: response.data.data.gst?.sgst,
            igst: response.data.data.gst?.igst,
            is_active: response.data.data.gst?.is_active,
          };
          this.setState({
            gstDetails: details,
          });
          this.setState({ gst: response.data.data.gst });
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
  //   Delete = (id) => {
  //     let data = {};
  //     GstApi.gstDelete(id, data)
  //       .then((response) => {
  //         if (response.data.httpStatusCode === 200) {
  //           this.setState({ gst: response.data.data.gst });
  //           Router.push("/gst");
  //           toast.success(response.data.message);
  //         }
  //       })
  //       .catch((error) => {
  //         toast.error(
  //           error?.response &&
  //             error?.response?.data &&
  //             error?.response?.data?.message
  //             ? error.response.data.message
  //             : "Unable to process your request, please try after sometime"
  //         );
  //       });
  //   };

  gstHsnCodeDropdownDetails = () => {
    GstApi.gstHsnCodeDropdownDetails()
      .then((response) => {
        this.setState({ gstHsnCode: response.data.data.list })
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
    this.getGstDetails(this.props.id);
    this.setState({ id: this.props?.id });
    this.gstHsnCodeDropdownDetails();
  }
  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - GST</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-7">
                <div className="hamburger">
                  <span>Configurations / HSN Master /  </span>Edit HSN Master
                </div>
                <div className="page-name">
                  Edit HSN Master  - {this.state.gst?.hsn_code}
                </div>
              </div>
              <div className="col-md-5 btn-save">
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
                    Router.push(`/gst`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <GstCreateComponent
                  gst={this.state.gstDetails}
                  mode={this.state.mode}
                  handle={this.stateHandle.bind(this)}
                  gstHsnCode={this.state.gstHsnCode}
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
                Are you sure you want to delete this HSN Code?
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
