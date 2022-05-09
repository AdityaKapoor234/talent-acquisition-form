import React, {Component} from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import ProductApi from "../../../../services/product";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import PDFViewer from 'pdf-viewer-reactjs'
import Photo from "../../../common-component/photo";
import IconButton from "@mui/material/IconButton";
import {PhotoCamera} from "@mui/icons-material";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import DefaultLayoutExample from "../../../common-component/pdf";

export default class ProductCertificateComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:props?.id,
            mode:props?.mode,
            certificate:"",
            isLoader:false,
            url:""
        };

    }

    uploadFile = ({ target: { files } }) => {
        if (files?.length > 0) {
            const formData = new FormData();
            formData.append("media", files[0]);
            this.setState({isLoader:true})
            const token = cookie.get("access_token_admin");
            const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            };
            axios
            .put( `http://65.1.17.188:5001/manage/product/certificate/pdf`, formData, headers)
            .then((response) => {
                this.setState({
                    isLoader:false,
                    certificate:response?.data?.data?.url
                })
            })
            .catch((error) => {
                this.setState({isLoader:false})
                toast.error(error);
            });
        }
    }

    updatePhoto = (id,button)=>{
        let data={
            "data":{
                "certificate_url": this.state.certificate
            }
        }
        ProductApi.addCertificate(id,data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
            toast.success("Update Certificate successfully")
            if(button === "continue"){
                this.props?.tab("content")
            }else if(button === "save"){
                Router.push("/product")
            }
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
    
    validation=()=>{
        if (this.state.certificate === "") {
            toast.error("Please uplaod a certificate ");
            return false;
          }
          return true;
    }

    onSave=()=> {
        // if(this.validation()){
            this.updatePhoto(this.state.id,"save")
        // }
    }

    onSaveAndContinue=()=> {
        // if(this.validation()){
            this.updatePhoto(this.state.id,"continue")
        // }
    }

    getCertification=(id)=>{
        ProductApi.getCertificate(id)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
              let list = response.data.data?.certificate_url
                this.setState({
                    certificate:list
                })
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

    componentDidMount(){
        this.getCertification(this.state.id)
    }

    render() {
        return (
            <div data-component="product-photo-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue}
                                    mode={this.state.mode} showSaveContinueButton={true}>Certificate</ProductTabEditorHeader>
                {this.state.isLoader ? (
                    <div className="row justify-content-center">
                        <div className="col-md-12 loader-cart">
                            <Box sx={{ display: "flex" }}>
                                <CircularProgress style={{ color: "#F54A00" }}/>
                            </Box>
                        </div>
                    </div>) : 
                <div className="row ">
                    {this.state.mode === "edit" &&
                    <div className="col-md-12">
                        <div className='photo-upload-list d-flex flex-wrap'>
                        {this.state.mode ==="edit" &&
                            <div  className='photo-upload-box photo-uplaod'>
                                <input id="img" type="file" accept={".pdf"}  onChange={this.uploadFile} style={{display:"none"}} />
                                <label for="img" className="file" >Choose File</label>
                            </div>
                        }
                        </div>
                        {/* <DefaultLayoutExample /> */}
                    </div>}
                    {this.state.certificate !== "" ? 
                    <div className="col-md-3 mt-3">
                    <a href={this.state.certificate} target="_blank" rel="noreferrer">
                        <div className="custom-btn view-pdf">
                            view Pdf
                        </div>
                    </a>
                    </div>:<div className="mt-3 text-center">No Certificate Found</div>}
                </div>}
            </div>
        );
    }
}
