import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default class FeedbackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: props?.feedback,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.feedback !== nextProps.feedback
    ) {
      return {
        feedback: nextProps?.feedback
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
              <div className="col pe-1">Name</div>
              <div className="col px-2 text-center">User Name</div>
              <div className="col px-2 text-center">Feedback Topic</div>
              <div className="col px-2 text-center">Email</div>
              <div className="col px-2 text-center">Mobile No.</div>
              <div className="col-1 text-end">Action</div>
            </div>
          </div>
        </div>
        {
          this.state.feedback && this.state.feedback.length === 0 ? <div className="not-found">No Data Found</div> :
            this.state.feedback?.map((p, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-md-12">
                    <div className="tableCell">
                      <div className="tableBody pe-1 col elip-text" title={p?.name}>{p?.name}</div>
                      <div className="tableBody px-2 col justify-content-center elip-text" title={p?.user_name}>
                        {p?.user_name}
                      </div>
                      <div className="col px-2 text-center elip-text" title={p?.topic}>{p?.topic}</div>
                      <div className="col px-2 text-center elip-text" title={p?.email}>{p?.email}</div>
                      <div className="col px-2 text-center elip-text" title={p?.phone_no}>{p?.phone_no}</div>
                      <div className="col-1 text-end">
                        <RemoveRedEyeIcon
                          className="view-icon"
                          onClick={() => {
                            Router.push(`/feedback/${p?.id}/view`);
                          }}
                        />
                        {/* <EditOutlinedIcon
                      className="edit-icon"
                      onClick={() => {
                        Router.push(`/feedback/${p?.id}/edit`);
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