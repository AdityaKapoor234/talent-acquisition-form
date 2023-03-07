import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import ProductApi from "../../../../services/product";
import cookie from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import { PhotoCamera } from "@mui/icons-material";
import Router from "next/router";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { PRODUCT_SERVICE } from "../../../../utils/constant";

export default class ProductPhotoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props?.id,
            mode: props?.mode,
            photos: [],
            isLoader: false,
            url: ""
        };

    }

    uploadFile = ({ target: { files } }) => {
        if (files?.length > 0) {
            if (files[0]?.size < 3145728) {
                var uploadPic = false;

                var reader = new FileReader();

                //Read the contents of Image File.
                reader.readAsDataURL(files[0]);
                reader.onload = function (e) {

                    //Initiate the JavaScript Image object.
                    var image = new Image();

                    //Set the Base64 string return from FileReader as source.
                    image.src = e.target.result;

                    //Validate the File Height and Width.
                    image.onload = function () {
                        var height = this.height;
                        var width = this.width;
                        // if (height > 100 || width > 550) {
                        if (width > 525) {
                            toast.error("Width of Image must not exceed 525px.");
                            uploadPic = false;
                            // return false;
                        }
                        else {
                            uploadPic = true;
                            // return true;
                        }
                    };
                };

                setTimeout(() => {


                    if (uploadPic) {
                        const formData = new FormData();
                        formData.append("media", files[0]);
                        this.setState({ isLoader: true })
                        const token = cookie.get("access_token_admin");
                        const headers = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        };
                        axios
                            .put(`${PRODUCT_SERVICE}/manage/category/photo/product_photo`, formData, headers)
                            .then((response) => {
                                let photo = this.state.photos;
                                photo.push({
                                    "id": 0,
                                    "is_primary": false,
                                    "path": response.data.data?.url,
                                    "sort_order": null,
                                    "removed": false
                                })
                                this.setState({
                                    isLoader: false,
                                    photos: photo
                                })
                            })
                            .catch((error) => {
                                this.setState({ isLoader: false })
                                toast.error(error);
                            });
                    }
                }, 700)
            } else {
                toast.error("File size is more than 3MB");
            }
        }
    }

    updatePhoto = (id, button) => {
        let data = {
            "data": this.state.photos
        }
        ProductApi.updatePhoto(id, data)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    let list = response.data.data?.data
                    list.forEach(function (field) {
                        field.removed = false
                    })
                    this.setState({ photos: list });
                    toast.success("Update Photos successfully")
                    if (button === "continue") {
                        this.props?.tab("seo")
                    } else if (button === "save") {
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

    validation = () => {
        if (this.state.photos?.length === 0) {
            toast.error("Please uplaod a Photo ");
            return false;
        }
        if (this.state.photos.filter((value) => { return value.is_primary === true }).length !== 1) {
            toast.error("please select one Image for Thumbnail ");
            return false;
        }
        return true;
    }

    onSave = () => {
        if (this.validation()) {
            this.updatePhoto(this.state.id, "save")
        }
    }

    onSaveAndContinue = () => {
        if (this.validation()) {
            this.updatePhoto(this.state.id, "continue")
        }
    }

    handleCheck = (event) => {
        let list = this.state.photos
        let objIndex = list.findIndex((obj => obj.id === parseInt(event?.target?.value)));
        list[objIndex]["is_primary"] = event?.target?.checked;
        this.setState({ photos: list })
    };

    delete = (i) => {
        let photos = this.state.photos;
        let objIndex = photos.findIndex((obj => obj.id === parseInt(i)));
        photos[objIndex]["removed"] = true
        this.setState({ photos })
        this.updatePhoto(this.state.id, "none")
    }

    getPhoto = (id) => {
        ProductApi.getPhoto(id)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    let list = response.data.data?.list
                    list.forEach(function (field) {
                        field.removed = false
                    })
                    this.setState({
                        photos: list
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

    componentDidMount() {
        this.getPhoto(this.state.id)
    }

    render() {
        return (
            <div data-component="product-photo-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue}
                    mode={this.state.mode} showSaveContinueButton={true}>Photos</ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12">
                        <div className="notes"><InfoIcon className="info-icon" /> select one Image for Thumbnail</div>
                        <div className='photo-upload-list d-flex flex-wrap'>
                            {
                                this.state.photos.map((p, i) => {
                                    return <div key={i} className='photo-upload-box'>
                                        <div className='preview-img' style={{ backgroundImage: 'url(' + p.path + ')' }}>
                                            <div className="d-flex checkbox">
                                                <Checkbox
                                                    size="small"
                                                    style={{ color: "#012169" }}
                                                    disabled={this.state?.mode === "view" ? true : false}
                                                    checked={p?.is_primary === true ? true : false}
                                                    name="is_primary"
                                                    value={p?.id}
                                                    onChange={this.handleCheck.bind(this)}
                                                />
                                                {this.state?.mode === "view" ? < DeleteIcon className="delete-icon" />
                                                    : < DeleteIcon className="delete-icon" onClick={() => { this.delete(p?.id) }} />}
                                            </div>
                                        </div>
                                    </div>
                                })
                            }
                            {this.state.mode === "edit" && this.state.photos?.length < 10 &&
                                <div className='photo-upload-box photo-uplaod'>
                                    <input id="img" type="file" accept={".png,.jpg,.jpeg"} onChange={this.uploadFile} style={{ display: "none" }} />
                                    <label for="img" className="file" >Choose File</label>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
