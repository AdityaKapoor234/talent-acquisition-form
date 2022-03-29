import React, {Component} from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import InfoCategory from "./sub-components/info-tab-component/info-category.component";
import InfoCertification from "./sub-components/info-tab-component/info-certification.component";
import ProductInfoApi from "../../../../services/product-info";
import { toast } from "react-toastify";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default class ProductInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoDetails:{
                "brand_id": 0,
                "categories": [],
                "certifications": [],
                "flavour_id": 0,
                "gender": "",
                "is_vegan": true,
                "name": "",
                "origin_country_id": null,
                "product_form": "",
                "recommended_age": "",
                "serving_count": null,
                "serving_size":null,
                "serving_size_unit": "",
                "sku": "",
                "specialty_diet": "",
                "weight": null,
                "weight_unit": "",
                "status":""
            },
            id:props?.id,
            errors:{},
            brand:[],
            flavor:[]
        };
    }

    stateHandle = (value) => {
        let input = this.state.infoDetails;
        input["certifications"]= value;
        this.setState({ infoDetails: input });
      };

    categoryHandle = (value) => {
        let input = this.state.infoDetails;
        input["categories"]= value;
        this.setState({ infoDetails: input });
      };
      

    handleChange = (event) => {
        let input = this.state.infoDetails;
        input[event.target.name]= event.target.value;
        this.setState({ infoDetails: input });
    };

    handleRadio = (event) => {
        let input = this.state.infoDetails;
        input["is_vegan"]= event.target.value;
        this.setState({ infoDetails: input });
      };

      validation(){
        let input = this.state.infoDetails;
        let errors = {};
        let isValid = true;
            if (!input["sku"]) {
                isValid = false;
                errors["sku"] = "Please enter sku";
            }
            if (!input["name"]) {
                isValid = false;
                errors["name"] = "Please enter name";
            }
            if (!input["status"]) {
                isValid = false;
                errors["status"] = "Please select status";
            }
            if (input["brand_id"] !== 0) {
                isValid = false;
                errors["brand_id"] = "Please select brand";
            }
            if (input["flavour_id"] !== 0) {
                isValid = false;
                errors["flavour_id"] = "Please select flavour";
            }
            if (!input["weight"]) {
                isValid = false;
                errors["weight"] = "Please enter weight";
            }
            if (!input["weight_unit"]) {
                isValid = false;
                errors["weight_unit"] = "Please enter weight unit";
            }
            if (!input["serving_size"]) {
                isValid = false;
                errors["serving_size"] = "Please enter serving size";
            }
            if (!input["serving_size_unit"]) {
                isValid = false;
                errors["serving_size_unit"] = "Please enter serving size unit";
            }
            if (!input["serving_count"]) {
                isValid = false;
                errors["serving_count"] = "Please enter serving count";
            }
            if (!input["product_form"]) {
                isValid = false;
                errors["product_form"] = "Please enter form";
            }
            if (!input["gender"]) {
                isValid = false;
                errors["gender"] = "Please enter gender";
            }
            if (!input["specialty_diet"]) {
                isValid = false;
                errors["specialty_diet"] = "Please enter specialty diet";
            }
            if (!input["recommended_age"]) {
                isValid = false;
                errors["recommended_age"] = "Please enter recommended age";
            }
            if (input["is_vegan"] !== null) {
                isValid = false;
                errors["is_vegan"] = "Please select vegan";
            }
            if (!input["origin_country_id"]) {
                isValid = false;
                errors["origin_country_id"] = "Please enter country of origin";
            }
            
            
        this.setState({
            errors: errors
        });

        return isValid;
    }


    onSave=()=> {
        if(this.validation()){
            this.updateInfo(this.state.id)
        }
    }

    onSaveAndContinue=()=> {
        if(this.validation()){
            this.updateInfo(this.state.id)
        }
    }

    updateInfo = (id)=>{
        let data={
            "data": this.state.infoDetails
        }
        ProductInfoApi. UpdateInfo(id,data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({
                infoDetails:response.data.data
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

    getInfo = (id)=>{
        ProductInfoApi.getInfo(id)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({
                infoDetails:response.data.data
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

    getBrands = ()=>{
        ProductInfoApi.getBrand()
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({
                brand:response.data.data?.list
            })
          }
        })
        .catch((error) => {
          toast.error(
            error?.response &&
              error?.response?.data &&
              error?.response?.data?.message
              ? error.response.data.message
              : "Unable to process your request, please try after sometime1"
          );
        });
    }

    getFlavors = ()=>{
        ProductInfoApi.getFlavor()
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({
                flavor:response.data.data?.list
            })
          }
        })
        .catch((error) => {
          toast.error(
            error?.response &&
              error?.response?.data &&
              error?.response?.data?.message
              ? error.response.data.message
              : "Unable to process your request, please try after sometime1"
          );
        });
    }

    componentDidMount(){
        this.getInfo(this.state.id)
        this. getBrands()
        this.getFlavors()
    }

    render() {
        return (
            <div data-component="product-info-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue} showSaveContinueButton={true}>Product Info</ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12">
                        <div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="fc-form-group">
                                        <label>SKU<span className="mandatory-star">*</span></label>
                                        <input
                                            type="text"
                                            name="sku"
                                            value={this.state.infoDetails?.sku}
                                            onChange={this.handleChange.bind(this)}
                                        />
                                        <small className="form-text text-danger" >{this.state.errors["sku"]}</small>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="fc-form-group">
                                        <label>Name<span className="mandatory-star">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={this.state.infoDetails?.name}
                                            onChange={this.handleChange.bind(this)}
                                        />
                                         <small className="form-text text-danger" >{this.state.errors["name"]}</small>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">

                                    <div className="sort fc-select-form-group">
                                        <label>Status<span className="mandatory-star">*</span></label>
                                        <div className="sort-by-select-wrapper">
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                autoWidth={true}
                                                name="status"
                                                onChange={this.handleChange}
                                                className="sort-by-select w-100"
                                                value={this.state.infoDetails?.status}
                                            >
                                                <MenuItem
                                                    value={""}
                                                    disabled
                                                    className="field_toggle_checked"
                                                >
                                                    Select Status{" "}
                                                </MenuItem>
                                                <MenuItem value='draft'>Draft</MenuItem>
                                                <MenuItem value='published'>Publised</MenuItem>
                                                <MenuItem value='archived'>Archived</MenuItem>
                                            </Select>
                                            <small className="form-text text-danger" >{this.state.errors["status"]}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">

                                    <div className="sort fc-select-form-group">
                                        {console.log("vv",this.state.infoDetails?.brand_id)}
                                        <label>Brand<span className="mandatory-star">*</span></label>
                                        <div className="sort-by-select-wrapper">
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                autoWidth={true}
                                                name="brand_id"
                                                onChange={this.handleChange}
                                                className="sort-by-select w-100"
                                                value={this.state.infoDetails?.brand_id}
                                            >
                                                <MenuItem
                                                    value={0}
                                                    disabled
                                                    className="field_toggle_checked"
                                                >
                                                    Select Status{" "}
                                                </MenuItem>
                                                {this.state.brand?.map(val=>{return(
                                                    <MenuItem value={val?.id}>{val?.name}</MenuItem>
                                                )})}
                                            </Select>
                                        </div>
                                        <small className="form-text text-danger" >{this.state.errors["brand_id"]}</small>
                                    </div>
                                </div>
                                <div className="col-md-4">

                                    <div className="sort fc-select-form-group">
                                        <label>Flavor<span className="mandatory-star">*</span></label>
                                        <div className="sort-by-select-wrapper">
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                autoWidth={true}
                                                name="flavour_id"
                                                onChange={this.handleChange}
                                                className="sort-by-select w-100"
                                                value={this.state.infoDetails?.flavour_id}
                                            >
                                                <MenuItem
                                                    value={0}
                                                    disabled
                                                    className="field_toggle_checked"
                                                >
                                                    Select Status{" "}
                                                </MenuItem>
                                                {this.state.flavor?.map(val=>{return(
                                                    <MenuItem value={val?.id}>{val?.name}</MenuItem>
                                                )})}
                                            </Select>
                                        </div>
                                        <small className="form-text text-danger" >{this.state.errors["flavour_id"]}</small>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            <div className='section-heading'>Category</div>
                            <div className='mt-2'>
                                {/* <mark className='font-sm'><small>TODO: One to many category selector</small></mark> */}
                                < InfoCategory details={this.state.infoDetails?.categories} handle={this.categoryHandle.bind(this)}/>
                            </div>
                        </div>
                        <div>
                            <div className='section-heading'>Product Variant</div>
                            <div className='mt-2'>
                                <mark className='font-sm'><small>TODO: Product variant selector</small></mark>
                            </div>
                        </div>
                        <div>
                            <div className='section-heading'>Certifications</div>
                            <div className='mt-2'>
                                {/* <mark className='font-sm'><small>TODO: Certification selector</small></mark> */}
                                <InfoCertification handle={this.stateHandle.bind(this)} details={this.state.infoDetails?.certifications}/>
                            </div>
                        </div>
                        <div>
                            <div className='section-heading'>Quantity</div>
                            <div className='mt-2'>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Weight<span className="mandatory-star">*</span></label>
                                            <input
                                                type="number"
                                                name="weight"
                                                value={this.state.infoDetails?.weight}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                             <small className="form-text text-danger" >{this.state.errors["weight"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Weight Unit<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="weight_unit"
                                                value={this.state.infoDetails?.weight_unit}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                             <small className="form-text text-danger" >{this.state.errors["weight_unit"]}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Serving Size<span className="mandatory-star">*</span></label>
                                            <input
                                                type="number"
                                                name="serving_size"
                                                value={this.state.infoDetails?.serving_size}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                             <small className="form-text text-danger" >{this.state.errors["serving_size"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Serving Size Unit<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="serving_size_unit"
                                                value={this.state.infoDetails?.serving_size_unit}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                             <small className="form-text text-danger" >{this.state.errors["serving_size_unit"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Serving Count<span className="mandatory-star">*</span></label>
                                            <input
                                                type="number"
                                                name="serving_count"
                                                value={this.state.infoDetails?.serving_count}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                             <small className="form-text text-danger" >{this.state.errors["serving_count"]}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='section-heading'>Other Detail</div>
                            <div className='mt-2'>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Form<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="product_form"
                                                value={this.state.infoDetails?.product_form}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                             <small className="form-text text-danger" >{this.state.errors["product_form"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Gender<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="gender"
                                                value={this.state.infoDetails?.gender}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                             <small className="form-text text-danger" >{this.state.errors["gender"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Specialty Diet<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="specialty_diet"
                                                value={this.state.infoDetails?.specialty_diet}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                             <small className="form-text text-danger" >{this.state.errors["specialty_diet"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Recommended Age<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="recommended_age"
                                                value={this.state.infoDetails?.recommended_age}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                             <small className="form-text text-danger" >{this.state.errors["recommended_age"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Is Vegan<span className="mandatory-star">*</span></label>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={this.state.infoDetails?.is_vegan}
                                                onChange={this.handleRadio}
                                            >
                                                <FormControlLabel value={true} control={<Radio size={"small"} style={{color:"#012169"}} />} label="Yes" />
                                                <FormControlLabel value={false} control={<Radio size={"small"} style={{color:"#012169"}} />} label="No" />
                                            </RadioGroup>
                                            <small className="form-text text-danger" >{this.state.errors["is_vegan"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Country of Origin<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="origin_country_id"
                                                value={this.state.infoDetails?.origin_country_id}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                             <small className="form-text text-danger" >{this.state.errors["origin_country_id"]}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
