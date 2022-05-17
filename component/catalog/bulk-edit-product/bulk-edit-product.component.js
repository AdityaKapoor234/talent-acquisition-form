import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Router from "next/router";
import {  CheckCircleOutline } from "@mui/icons-material";
import { BulkEditProductApi } from "../../../services/bulk-edit-product";
import { toast } from "react-toastify";

export default class BulkEditProductComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: props?.list,
      editId: null,
      price: 0,
      special_price: 0
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

  update(id){
    let data = {
      price: parseInt(this.state.price),
      special_price: parseInt(this.state.special_price)
    };
    
    BulkEditProductApi.updatePrice(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
            toast.success("Update price successfully");
            this.setState({editId: null});
            this.props.handle(1,"")
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

  render() {
    return (
      <div data-component="CustomerComponent">
        <div className="row">
          <div className="col-md-12">
            <div className="tableRow">
              <div className="col-5 pe-1">Name</div>
              {/* <div className="col text-center">Type</div> */}
              <div className="col-2 px-2 text-center">Regular Price</div>
              <div className="col-2 px-2 text-center">Special Price</div>
              <div className="col-1 px-2 text-center">Active</div>
              <div className="col-2 text-center">Action</div>
              {/* <div className="col-1 text-end">Action</div> */}
            </div>
          </div>
        </div>
      
           
        
   {  this.state.list?.map((ele,index)=>{return(
       <div className="row" >
       <div className="col-md-12">
         <div className="tableCell">
           
         
           <div className="tableBody  col-5 elip-text ">
           {ele.name}
           </div>
           <div className="col-2  text-center elip-text ">
              
               {this.state.editId && this.state.editId===ele.id ? <input type="number" value={this.state.price} onChange={(e)=>{ this.setState({price: e.target.value}) }}/> : ele.price}
           </div>
           <div className="col-2  text-center elip-text"> 
           

            {this.state.editId && this.state.editId===ele.id ? <input type="number" value={this.state.special_price} onChange={(e)=>{ this.setState({special_price: e.target.value}) }}/> : ele.special_price}
            </div>
           <div className="col-1  text-center ">
           
           
               <CheckCircleOutline className="check-icon"/>
           </div>
           <div className="col-2 text-center">
           
             {this.state.editId && this.state.editId===ele.id ? 
              <div className="btn-save">
                <button className="custom-btn w-50" onClick={()=>{this.update(this.state.editId)}} >Update</button> 
                <button className="custom-btn Cancel-btn w-50" onClick={()=>{ this.setState({editId: null}) }}>Cancel</button>
              </div> : <EditOutlinedIcon
               className="edit-icon"
               onClick={()=>{ this.setState({editId: ele.id, special_price: ele.special_price, price: ele.price}) }}
             /> }
             
           </div> 
         </div>
       </div>
     </div>

     )}) }
     
     </div>
    );
  }
}
