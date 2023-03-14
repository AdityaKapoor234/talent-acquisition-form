import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";

export default function BannerContent() {

    let banners = [
        {
            name : 'Feedback',
            id: 0,
        },
        {
            name : 'Advertise With Us',
            id: 1,
        },
        {
            name : 'Affiliate Marketing',
            id: 2,
        },
        {
            name : 'Marketing and Sponsorships',
            id: 3,
        },
        {
            name : 'Sell on Fitcart',
            id: 4,
        },
        {
            name : 'Bulk Buys',
            id: 5,
        },
        {
            name : 'Email Support',
            id: 6,
        },
    ]
  return (
    <div data-component="CustomerComponent">
      <div className="row">
        <div className="col-md-12">
          <div className="tableRow">
            <div className="col-8 pe-1 ">Name</div>
            <div className="col  text-center ">View</div>
            <div className="col text-center ">Edit</div>
          </div>
        </div>
      </div>
      { banners?.map((item) => {
        return(
            <div className="row" key={item?.id}>
            <div className="col-md-12">
              <div className="tableCell">
                <div className="tableBody  col-8 pe-1 elip-text" title={item?.name}>
                  {item?.name}
                </div>
                <div className="col text-center">
                  <RemoveRedEyeIcon
                    className="view-icon"
                    onClick={() => {
                        Router.push(`/banners-content/${item?.id}/view`);
                    }}
                  />
                </div>
                <div className="col  text-center elip-text" title="Edit">
                  <EditOutlinedIcon 
                   className="view-icon"
                   onClick={() => {
                     Router.push(`/banners-content/${item?.id}/edit`);
                   }}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      })    
}
    </div>
  );
}
