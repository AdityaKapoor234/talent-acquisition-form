import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class AffiliatedMarketing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: props?.product,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.customer !== nextProps.customer
    ) {
      return {
        customer: nextProps?.customer
      };
    }
    return null;
  }

  convertDateStringToDate = (dateStr) => {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let date = new Date(dateStr);
    let str =
      date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    return str;
  };

  componentDidMount(){
    console.log(this.state.product);
  }

  render() {
    return (
      <div data-component="CustomerComponent">
        <div className="row">
          <div className="col-md-12">
            <div className="tableRow">
              <div className="col-2 pe-1">Name</div>
              {/* <div className="col text-center">Type</div> */}
              <div className="col-3 px-2 text-center">Email</div>
              <div className="col px-2 text-center">Mobile No.</div>
              <div className="col px-2 text-center">Product</div>
              <div className="col-2 text-center ">View</div>
            </div>
          </div>
        </div>
        {
		this.state.product && this.state.product.length === 0 ? <div className="not-found">No Data Found</div> :
          this.state.product?.map((p, index) => {
          return (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="tableCell">
                  <div className="tableBody pe-1 col-2 elip-text" title={p?.name}>{p?.name}</div>
                  {/* <div className="col text-center">{p?.type?p?.type:"General"}</div> */}
                  <div className="tableBody px-2 col-3 justify-content-center elip-text" title={p?.email}>
                    {p?.email}
                  </div>
                  <div className="col px-2 text-center elip-text" title={p?.phone_no}>{p?.phone_no}</div>
                  <div className="col px-2 text-center elip-text" title={p?.order_product}>{p?.order_product}</div>
                  <div className="col-2 text-center">
                    <RemoveRedEyeIcon
                      className="view-icon"
                      onClick={() => {
                        Router.push(`/bulk-buys/${p?.id}/view`);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
