import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class SellOnFitcartList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        sellOnFitcart: props?.sellOnFitcart,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.sellOnFitcart !== nextProps.sellOnFitcart
    ) {
      return {
        sellOnFitcart: nextProps?.sellOnFitcart
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

  render() {
    return (
      <div data-component="CustomerComponent">
        <div className="row">
          <div className="col-md-12">
            <div className="tableRow">
              <div className="col pe-1">Company Name</div>
              <div className="col-3 px-2 text-center">Email</div>
              <div className="col-3 px-2 text-center">Mobile No.</div>
              <div className="col-1 text-end">Action</div>
            </div>
          </div>
        </div>
        {
		this.state.sellOnFitcart && this.state.sellOnFitcart.length === 0 ? <div className="not-found">No Data Found</div> :
          this.state.sellOnFitcart?.map((p, index) => {
          return (
            <div className="row" key={index}>
              <div className="col-md-12">
                <div className="tableCell">
                  <div className="tableBody pe-1 col elip-text" title={p?.company_name}>{p?.company_name}</div>
                  <div className="tableBody px-2 col-3 justify-content-center elip-text" title={p?.email}>
                    {p?.email}
                  </div>
                  <div className="col-3 px-2 text-center elip-text" title={p?.phone_number}>{p?.phone_no}</div>
                  <div className="col-1 text-end">
                    <RemoveRedEyeIcon
                      className="view-icon"
                      onClick={() => {
                        Router.push(`/sell-on-fitcart/${p?.id}/view`);
                      }}
                    />
                    {/* <EditOutlinedIcon
                      className="edit-icon"
                      onClick={() => {
                        Router.push(`/sell-on-fitcart/${p?.id}/edit`);
                      }}
                    /> */}
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
