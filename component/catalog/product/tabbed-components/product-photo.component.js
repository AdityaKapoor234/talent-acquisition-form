import React, {Component} from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import ProductApi from "../../../../services/product";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import Photo from "../../../common-component/photo";
import IconButton from "@mui/material/IconButton";
import {PhotoCamera} from "@mui/icons-material";
import Router from "next/router";

export default class ProductPhotoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:props?.id,
            photos: [],
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
            .put( `http://65.1.17.188:5001/manage/category/photo/product_photo`, formData, headers)
            .then((response) => {
                let photo = this.state.photos;
                photo.push({
                    "id": 0,
                    "is_primary": false,
                    "path": response.data.data?.url,
                    "sort_order": null,
                    "removed" : false
                })
                this.setState({
                    isLoader:false,
                    photos:photo
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
            "data": this.state.photos
        }
        ProductApi.updatePhoto(id,data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
            let list =  response.data.data?.data
            this.setState({photo: list});
            toast.success("Update Photos successfully")
            if(button === "continue"){
                this.props?.tab("seo")
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
        if (this.state.photos?.length === 0) {
            toast.error("Please uplaod a Photo ");
            return false;
          }
          return true;
    }

    onSave=()=> {
        if(this.validation()){
            this.updatePhoto(this.state.id,"save")
        }
    }

    onSaveAndContinue=()=> {
        if(this.validation()){
            this.updatePhoto(this.state.id,"continue")
        }
    }

    getPhoto=(id)=>{
        ProductApi.getPhoto(id)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
              let list = response.data.data?.list
            list.forEach(function(field) {
                field.removed = false
                })
            this.setState({
                photos:list
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
        this.getPhoto(this.state.id)
    }

    render() {
        return (
            <div data-component="product-photo-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue}
                                        showSaveContinueButton={true}>Photos</ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12">
                        <div className='photo-upload-list d-flex flex-wrap'>
                        {
                            this.state.photos.map((p, i) => {
                                return <div key={i}  className='photo-upload-box'>
                                    <div className='preview-img' style={{backgroundImage : 'url(' + p.path + ')'}}></div>
                                </div>
                            })
                        }
                        <div  className='photo-upload-box photo-uplaod'>
                            <input id="img" type="file" accept={".png,.jpg,.jpeg"}  onChange={this.uploadFile} style={{display:"none"}} />
                            <label for="img" className="file" >Choose File</label>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
