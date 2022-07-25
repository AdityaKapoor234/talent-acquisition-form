import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class MarketingAndSponsorshipsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      marketingAndSponsorships: props?.marketingAndSponsorships,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.marketingAndSponsorships !== nextProps.marketingAndSponsorships
    ) {
      return {
        marketingAndSponsorships: nextProps?.marketingAndSponsorships
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

  render() {
    return (
      <div data-component="CustomerComponent">
        <div className="row">
          <div className="col-md-12">
            <div className="tableRow">
              <div className="col pe-1">Name</div>
              <div className="col px-2 text-center">Email</div>
              <div className="col px-2 text-center">Mobile No.</div>
              <div className="col px-2 text-center">Sponsorship</div>
              <div className="col-1 text-end">Action</div>
            </div>
          </div>
        </div>
        {
          this.state.marketingAndSponsorships && this.state.marketingAndSponsorships.length === 0 ? <div className="not-found">No Data Found</div> :
            this.state.marketingAndSponsorships?.map((p, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-md-12">
                    <div className="tableCell">
                      <div className="tableBody pe-1 col elip-text" title={p?.name}>{p?.name}</div>
                      <div className="tableBody px-2 col justify-content-center elip-text" title={p?.email}>
                        {p?.email}
                      </div>
                      <div className="col px-2 text-center elip-text" title={p?.phone_no}>{p?.phone_no}</div>
                      <div className="col px-2 text-center elip-text text-capitalize" title={p?.sponsorship_request}>{p?.sponsorship_request}</div>
                      <div className="col-1 text-end">
                        <RemoveRedEyeIcon
                          className="view-icon"
                          onClick={() => {
                            Router.push(`/marketing-and-sponsorships/${p?.id}/view`);
                          }}
                        />
                        {/* <EditOutlinedIcon
                      className="edit-icon"
                      onClick={() => {
                        Router.push(`/marketing-and-sponsorships/${p?.id}/edit`);
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
