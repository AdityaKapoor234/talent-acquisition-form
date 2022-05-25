import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import CouponCreateComponent from "../../../component/discount/coupon/coupon-details";
import CouponApi from "../../../services/coupon";
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

export default class CouponViewDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "view",
      open: false,
      userType: [],
      coupon: [],
      couponDetails: {
        name: "",
        code: "",
        description: "",
        start_date: "",
        end_date: "",
        discount_type: "",
        min_cart_amount: null,
        max_cart_amount: null,
        uses_per_coupon: null,
        uses_per_customer: null,
        coupon_value: null,
        by_amount_or_percent: "",
        customer_type: "",
        is_active: false,
      },
    };
  }

  stateHandle = (value) => {
    this.setState({ couponDetails: value });
  };
  getcouponDetails = (id) => {
    CouponApi.couponViewDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            name: response.data.data.coupon?.name,
            code: response.data.data.coupon?.code,
            description: response.data.data.coupon?.description,
            start_date: response.data.data.coupon?.start_date,
            end_date: response.data.data.coupon?.end_date,
            discount_type: response.data.data.coupon?.discount_type,
            min_cart_amount: response.data.data.coupon?.min_cart_amount,
            max_cart_amount: response.data.data.coupon?.max_cart_amount,
            uses_per_coupon: response.data.data.coupon?.uses_per_coupon,
            uses_per_customer: response.data.data.coupon?.uses_per_customer,
            coupon_value: response.data.data.coupon?.coupon_value,
            by_amount_or_percent: response.data.data.coupon?.by_amount_or_percent,
            customer_type: response.data.data.coupon?.customer_type,
            is_active: response.data.data.coupon?.is_active,
          };
          this.setState({
            couponDetails: details,
          });
          this.setState({ coupon: response.data.data.coupon });
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
  //     CouponApi.couponDelete(id, data)
  //       .then((response) => {
  //         if (response.data.httpStatusCode === 200) {
  //           this.setState({ coupon: response.data.data.coupon });
  //           Router.push("/coupon");
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

  customerTypeDropdownDetail = () => {
    CustomerApi.getCustomerTypeDropdownDetails()
      .then((response) => {
        this.setState({ userType: response.data.data.list })
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
    this.getcouponDetails(this.props.id);
    this.setState({ id: this.props?.id });
    this.customerTypeDropdownDetail();
  }
  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Coupon</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-7">
                <div className="hamburger">
                  <span>Discount / Coupon /  </span>View Coupon
                </div>
                <div className="page-name">
                  View Coupon  - {this.state.coupon?.name}
                </div>
              </div>
              <div className="col-md-5 btn-save">
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
                    Router.push(`/coupon`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <CouponCreateComponent
                  coupon={this.state.couponDetails}
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
                Are you sure you want to delete this pro?
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
