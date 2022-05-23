import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import CouponCreateComponent from "../../component/discount/coupon/coupon-details";
import Router from "next/router";
import Cookie from "js-cookie";
import CouponApi from "../../services/coupon";
import CustomerApi from "../../services/customer";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class CouponCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      createMode: "create",
      coupon: {},
      userType: [],
      open: false,
      couponDetails: {
        name:"",
        code:"",
        description:"",
        start_date:"",
        end_date:"",
        discount_type:"",
        min_cart_amount:null,
        max_cart_amount:null,
        uses_per_coupon:null,
        uses_per_customer:null,
        coupon_value:null,
        by_amount_or_percent:"",
        customer_type:"",
        is_active: false,
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
      this.state.couponDetails?.name === "" ||
      this.state.couponDetails?.name === null ||
      this.state.couponDetails?.name.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the name");
      return false;
    }
    if (
      this.state.couponDetails?.code === "" ||
      this.state.couponDetails?.code === null ||
      this.state.couponDetails?.code === undefined
    ) {
        toast.error("Please enter the code");
        return false;
    }
    if (
      this.state.couponDetails?.description === "" ||
      this.state.couponDetails?.description === null ||
      this.state.couponDetails?.description === undefined
    ) {
        toast.error("Please enter the description");
        return false;
    }
    if (
      this.state.couponDetails?.start_date === "" ||
      this.state.couponDetails?.start_date === null ||
      this.state.couponDetails?.start_date === undefined
    ) {
        toast.error("Please enter the start date");
        return false;
    }
    if (
      this.state.couponDetails?.end_date === "" ||
      this.state.couponDetails?.end_date === null ||
      this.state.couponDetails?.end_date === undefined
    ) {
        toast.error("Please enter the end date");
        return false;
    }
    if (
      this.state.couponDetails?.discount_type === "select" ||
      this.state.couponDetails?.discount_type === null ||
      this.state.couponDetails?.discount_type === undefined
    ) {
        toast.error("Please enter the discount type");
        return false;
    }
    if (
      this.state.couponDetails?.min_cart_amount === "" ||
      this.state.couponDetails?.min_cart_amount === null ||
      this.state.couponDetails?.min_cart_amount === undefined
      // this.state.couponDetails?.min_cart_amount.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the minimum cart amount");
      return false;
    }
    if (
      this.state.couponDetails?.max_cart_amount === "" ||
      this.state.couponDetails?.max_cart_amount === null ||
      this.state.couponDetails?.max_cart_amount === undefined
      // this.state.couponDetails?.max_cart_amount.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the maximum cart amount");
      return false;
    }
    if (
      this.state.couponDetails?.uses_per_coupon === "" ||
      this.state.couponDetails?.uses_per_coupon === null ||
      this.state.couponDetails?.uses_per_coupon === undefined
      // this.state.couponDetails?.uses_per_coupon.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the uses per coupon");
      return false;
    }
    if (
      this.state.couponDetails?.uses_per_customer === "" ||
      this.state.couponDetails?.uses_per_customer === null ||
      this.state.couponDetails?.uses_per_customer === undefined
      // this.state.couponDetails?.uses_per_customer.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the uses per customer");
      return false;
    }
    if (
      this.state.couponDetails?.coupon_value === "" ||
      this.state.couponDetails?.coupon_value === null ||
      this.state.couponDetails?.coupon_value === undefined
      // this.state.couponDetails?.coupon_value.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the coupon value");
      return false;
    }
    if (
      this.state.couponDetails?.by_amount_or_percent === "" ||
      this.state.couponDetails?.by_amount_or_percent === null ||
      this.state.couponDetails?.by_amount_or_percent === undefined 
      // this.state.couponDetails?.by_amount_or_percent.replace(/\s/g, "").length <= 0
    ) {
        toast.error("Please select either percentage or amount");
        return false;
    }
    if (
      this.state.couponDetails?.customer_type === "" ||
      this.state.couponDetails?.customer_type === null ||
      this.state.couponDetails?.customer_type === undefined
      // this.state.couponDetails?.customer_type.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the customer type");
      return false;
    }

    return true;
  };
  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.couponDetails?.name,
        code: this.state.couponDetails?.code,
        description: this.state.couponDetails?.description,
        start_date: this.convertDateStringToDate(this.state.couponDetails?.start_date),
        end_date: this.convertDateStringToDate(this.state.couponDetails?.end_date),
        discount_type: this.state.couponDetails?.discount_type,
        min_cart_amount: this.state.couponDetails?.min_cart_amount,
        max_cart_amount: this.state.couponDetails?.max_cart_amount,
        uses_per_coupon: this.state.couponDetails?.uses_per_coupon,
        uses_per_customer: this.state.couponDetails?.uses_per_customer,
        coupon_value: this.state.couponDetails?.coupon_value,
        by_amount_or_percent: this.state.couponDetails?.by_amount_or_percent,
        customer_type: this.state.couponDetails?.customer_type,
        is_active: true,
      };
      CouponApi.couponCreate(data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ coupon: response.data.data.coupon });
            toast.success(response.data.message);
            Router.push(`/coupon`);
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
    this.setState({ couponDetails: value });
  };

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
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Discount / Coupon / </span>Add New Coupon
                </div>
                <div className="page-name">Add New Coupon</div>
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
                  coupon={this.state.coupon}
                  mode={this.state.mode}
                  handle={this.stateHandle.bind(this)}
                  userType={this.state.userType}
                  createMode={this.state.createMode}
                />
              </div>
            </div>
          </DashboardLayoutComponent>
        </main>
      </div>
    );
  }
}
