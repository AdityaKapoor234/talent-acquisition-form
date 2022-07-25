import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class CouponLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
    list: props?.list,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.list !== nextProps.list
    ) {
      return {
        list: nextProps?.list
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
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    let str =
      date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
    return str;
  };

  componentDidMount(){
  }

  render() {
    return (
      <div data-component="CustomerComponent">
        <div className="row">
          <div className="col-md-12">
            <div className="tableRow">
              <div className="col-2 pe-1">Coupon Code</div>
              {/* <div className="col text-center">Type</div> */}
              <div className="col-3 px-2 text-center">Order id</div>
              <div className="col px-2 text-center">Customer</div>
              <div className="col px-2 text-center">Date</div>
              <div className="col-2 text-center ">Discount Amount</div>
            </div>
          </div>
        </div>
        {
		this.state.list && this.state.list.length === 0 ? <div className="not-found">No Data Found</div> :
          this.state.list?.map((p, index) => {
          return (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="tableCell">
                  <div className="tableBody pe-1 col-2 elip-text" title={p?.coupon_code}>{p?.coupon_code}</div>
                  {/* <div className="col text-center">{p?.type?p?.type:"General"}</div> */}
                  <div className="tableBody px-2 col-3 justify-content-center elip-text" title={p?.order_no}>
                    {p?.order_no}
                  </div>
                  <div className="col px-2 text-center elip-text" title={p?.customer}>{p?.customer}</div>
                  <div className="col px-2 text-center elip-text" title={this.convertDateStringToDate(p?.created_at)}>{this.convertDateStringToDate(p?.created_at)}</div>
                  <div className="col-2 text-center" title={p?.dicount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}>
                    {/* <RemoveRedEyeIcon
                      className="view-icon"
                      onClick={() => {
                        Router.push(`/bulk-buys/${p?.id}/view`);
                      }}
                    /> */}
                    ₹&nbsp;{p?.dicount?.toFixed(2).toString().replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')}
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
