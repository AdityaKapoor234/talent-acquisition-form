import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";
import {  CheckCircleOutline } from "@mui/icons-material";

export default class CustomerType extends Component {
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
              <div className="col-7 pe-1">Name</div>
              {/* <div className="col text-center">Type</div> */}
              <div className="col-2 px-2 text-center">Active</div>
              <div className="col-2 px-2 text-center">Default</div>
              <div className="col-1 px-2 text-center">Action</div>
              {/* <div className="col-1 text-center">Active</div> */}
              {/* <div className="col-1 text-end">Action</div> */}
            </div>
          </div>
        </div>
      
           
        
   {  this.state.list?.map((ele,index)=>{return(
       <div className="row" >
       <div className="col-md-12">
         <div className="tableCell">
           
         
           <div className="tableBody  col-7  elip-text ">
           {ele.user_type}
           </div>
           <div className="col-2  text-center elip-text "><CheckCircleOutline className="check-icon"/></div>
           <div className="col-2  text-center elip-text">  <CancelOutlinedIcon className="cancel-icon" /></div>
           <div className="col-1  text-center ">
             {/* {p?.is_active === true ? (
               <CheckCircleOutlineOutlinedIcon className="check-icon" />
             ) : (
               <CancelOutlinedIcon className="cancel-icon" />
             )} */}
             <EditOutlinedIcon  className="edit-icon"/>
           </div>
           {/* <div className="col-1 text-end">
             <RemoveRedEyeIcon
               className="view-icon"
               onClick={() => {
                 Router.push(`/customer/${p?.id}/view`);
               }}
             />
             <EditOutlinedIcon
               className="edit-icon"
               onClick={() => {
                 Router.push(`/customer/${p?.id}/edit`);
               }}
             />
           </div> */}
         </div>
       </div>
     </div>

     )}) }
     
     </div>
    );
  }
}
