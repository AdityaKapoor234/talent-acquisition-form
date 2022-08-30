import React, { Component } from "react";
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
import Router from "next/router";
import GstApi from "../../../../services/gst";

export default class ProductInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infoDetails: {
                brand_id: 0,
                categories: [],
                certifications: [],
                flavor_id: 0,
                gender: "",
                is_vegetarian: null,
                name: "",
                origin_country_id: "select",
                product_form: "",
                recommended_age: "",
                serving_count: null,
                serving_size: null,
                serving_size_unit: "",
                sku: "",
                specialty_diet: "",
                weight: null,
                weight_unit: "",
                status: "select",
                hsn_code_id: null,
                igst:"",
                cgst:"",
                sgst:"",
                height:null,
                breadth:null,
                length:null
            },
            id: props?.id,
            mode: props?.mode,
            gst:[],
            errors: {},
            brand: [],
            flavor: [],
            country: []
        };
    }

    stateHandle = (value) => {
        let input = this.state.infoDetails;
        input["certifications"] = value;
        this.setState({ infoDetails: input });
    };

    categoryHandle = (value) => {
        let input = this.state.infoDetails;
        input["categories"] = value;
        this.setState({ infoDetails: input });
    };


    handleChange = (event) => {
        let input = this.state.infoDetails;

        if (event.target.name === "height" || event.target.name === "breadth" || event.target.name === "length") {
            input[event.target.name] = parseInt(event.target.value);
        }
        else{
            input[event.target.name] = event.target.value;
        }
        
        this.setState({ infoDetails: input });
    };
    handleChangeGst = (event) => {
        let input = this.state.infoDetails;
        let gst = this.state.gst?.filter(val=>val?.id===parseInt(event.target.value));
        if(gst?.length>0){
            input["cgst"] = gst[0]?.cgst;
            input['igst'] = gst[0]?.igst;
            input['sgst'] = gst[0]?.sgst;
        }
        input[event.target.name] = event.target.value;
        this.setState({ infoDetails: input });
    };

    handleRadio = (event) => {
        let input = this.state.infoDetails;
        input["is_vegetarian"] = (event.target.value === "true" ? true : false);
        this.setState({ infoDetails: input });
    };

    stringValPatternValidation = stringVal => {
        return /\s/g.test(stringVal);
    };

    validation() {
        let input = this.state.infoDetails;
        let errors = {};
        let isValid = true;
        if (!input["sku"]) {
            isValid = false;
            errors["sku"] = "Please enter sku";
        }
        if (this.stringValPatternValidation(input["sku"])) {
            isValid = false;
            errors["sku"] = "Please enter sku without space";
        }
        if (input["sku"].replace(/\s/g, "").length <= 0) {
            isValid = false;
            errors["sku"] = "Please enter sku";
        }
        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please enter name";
        }
        if (input["name"].replace(/\s/g, "").length <= 0) {
            isValid = false;
            errors["name"] = "Please enter name";
        }
        if (input["status"] === "select") {
            isValid = false;
            errors["status"] = "Please select status";
        }
        // if (input["brand_id"] === 0) {
        //     isValid = false;
        //     errors["brand_id"] = "Please select brand";
        // }
        // if (input["flavor_id"] === 0) {
        //     isValid = false;
        //     errors["flavor_id"] = "Please select flavor";
        // }
        // if (!input["weight"]) {
        //     isValid = false;
        //     errors["weight"] = "Please enter weight";
        // }
        // if (!input["weight_unit"]) {
        //     isValid = false;
        //     errors["weight_unit"] = "Please enter weight unit";
        // }
        // if(input["weight_unit"].replace(/\s/g, "").length <=0){
        //     isValid = false;
        //     errors["weight_unit"] = "Please enter weight unit";
        // }
        // if (!input["serving_size"]) {
        //     isValid = false;
        //     errors["serving_size"] = "Please enter serving size";
        // }
        // if (!input["serving_size_unit"]) {
        //     isValid = false;
        //     errors["serving_size_unit"] = "Please enter serving size unit";
        // }
        // if(input["serving_size_unit"].replace(/\s/g, "").length <=0){
        //     isValid = false;
        //     errors["serving_size_unit"] = "Please enter serving size unit";
        // }
        // if (!input["serving_count"]) {
        //     isValid = false;
        //     errors["serving_count"] = "Please enter serving count";
        // }
        // if (!input["product_form"]) {
        //     isValid = false;
        //     errors["product_form"] = "Please enter form";
        // }
        // if(input["product_form"].replace(/\s/g, "").length <=0){
        //     isValid = false;
        //     errors["product_form"] = "Please enter product form";
        // }
        // if (!input["gender"]) {
        //     isValid = false;
        //     errors["gender"] = "Please enter gender";
        // }
        // if(input["gender"].replace(/\s/g, "").length <=0){
        //     isValid = false;
        //     errors["gender"] = "Please enter gender";
        // }
        // if (!input["specialty_diet"]) {
        //     isValid = false;
        //     errors["specialty_diet"] = "Please enter specialty diet";
        // }
        // if(input["specialty_diet"].replace(/\s/g, "").length <=0){
        //     isValid = false;
        //     errors["specialty_diet"] = "Please enter specialty diet";
        // }
        // if (!input["recommended_age"]) {
        //     isValid = false;
        //     errors["recommended_age"] = "Please enter recommended age";
        // }
        // if(input["recommended_age"].replace(/\s/g, "").length <=0){
        //     isValid = false;
        //     errors["recommended_age"] = "Please enter recommended age";
        // }
        // if (input["is_vegetarian"] === null) {
        //     isValid = false;
        //     errors["is_vegetarian"] = "Please select vegetarian";
        // }
        // if (input["origin_country_id"] === "select") {
        //     isValid = false;
        //     errors["origin_country_id"] = "Please enter country of origin";
        // }

        if (!input["height"]) {
            isValid = false;
            errors["height"] = "Please enter height";
        }
        if (!input["breadth"]) {
            isValid = false;
            errors["breadth"] = "Please enter width";
        }
        if (!input["length"]) {
            isValid = false;
            errors["length"] = "Please enter length";
        }



        this.setState({
            errors: errors
        });

        return isValid;
    }

    validate = () => {
        if (this.state.infoDetails?.categories?.length === 0) {
            toast.error("Please select atleast one Category ");
            return false;
        }
        // if ( this.state.infoDetails?.certifications?.length === 0) {
        //     toast.error("Please select atleast one Certification ");
        //     return false;
        // }
        return true;
    }

    onSave = () => {
        if (this.validation() && this.validate()) {
            this.updateInfo(this.state.id, "save")
        }
    }

    onSaveAndContinue = () => {
        if (this.validation() && this.validate()) {
            this.updateInfo(this.state.id, "continue")
        }
    }

    updateInfo = (id, button) => {
        let data = {
            "data": this.state.infoDetails
        }
        ProductInfoApi.UpdateInfo(id, data)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    toast.success("Update successfully")
                    this.setState({
                        infoDetails: response.data.data
                    })
                    if (button === "continue") {
                        this.props?.tab("variant")
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

    getInfo = (id) => {
        ProductInfoApi.getInfo(id)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    this.setState({
                        infoDetails: response.data.data
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

    getBrands = () => {
        ProductInfoApi.getBrand()
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    this.setState({
                        brand: response.data.data?.list
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

    getFlavors = () => {
        ProductInfoApi.getFlavor()
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    this.setState({
                        flavor: response.data.data?.list
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

    getCountry = () => {
        ProductInfoApi.country()
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    this.setState({
                        country: response.data.data?.list
                    })
                }
            })
            .catch((error) => {
            });
    }
    getGst=()=>{
        GstApi.gstHsnCodeDropdownDetails()
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    this.setState({
                        gst: response.data.data?.list
                    })
                }
            })
            .catch((error) => {
            });
    }

    componentDidMount() {
        this.getInfo(this.state.id)
        this.getBrands()
        this.getFlavors()
        this.getCountry()
        this.getGst()
    }

    render() {
        return (
            <div data-component="product-info-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader mode={this.state.mode} onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue} showSaveContinueButton={true}>Product Info</ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12">
                        <div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="fc-form-group">
                                        <label>SKU / Product code / Item code<span className="mandatory-star">*</span></label>
                                        <input
                                            type="text"
                                            name="sku"
                                            readOnly={this.state.mode === "view" ? true : false}
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
                                            readOnly={this.state.mode === "view" ? true : false}
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
                                                disabled={this.state.mode === "view" ? true : false}
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
                                                <MenuItem value="out_of_stock">Coming Soon</MenuItem>
                                                {/* <MenuItem value="coming_soon">Coming Soon</MenuItem>
                                                <MenuItem value="out_of_stock">Out of Stock</MenuItem> */}
                                            </Select>
                                            <small className="form-text text-danger" >{this.state.errors["status"]}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">

                                    <div className="sort fc-select-form-group">
                                        <label>Brand
                                            {/* <span className="mandatory-star">*</span> */}
                                        </label>
                                        <div className="sort-by-select-wrapper">
                                            <Select
                                                disableUnderline
                                                disabled={this.state.mode === "view" ? true : false}
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
                                                    Select Brand{" "}
                                                </MenuItem>
                                                {this.state.brand?.map(val => {
                                                    return (
                                                        <MenuItem value={val?.id}>{val?.name}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <small className="form-text text-danger" >{this.state.errors["brand_id"]}</small>
                                    </div>
                                </div>
                                <div className="col-md-4">

                                    <div className="sort fc-select-form-group">
                                        <label>Flavor
                                            {/* <span className="mandatory-star">*</span> */}
                                        </label>
                                        <div className="sort-by-select-wrapper">
                                            <Select
                                                disableUnderline
                                                disabled={this.state.mode === "view" ? true : false}
                                                variant="standard"
                                                autoWidth={true}
                                                name="flavor_id"
                                                onChange={this.handleChange}
                                                className="sort-by-select w-100"
                                                value={this.state.infoDetails?.flavor_id}
                                            >
                                                <MenuItem
                                                    value={0}
                                                    // disabled
                                                    className="field_toggle_checked"
                                                >
                                                    Select Flavor{" "}
                                                </MenuItem>
                                                {this.state.flavor?.map(val => {
                                                    return (
                                                        <MenuItem value={val?.id}>{val?.name}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </div>
                                        <small className="form-text text-danger" >{this.state.errors["flavor_id"]}</small>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-4">
                                <div className="sort fc-select-form-group">
                                        <label>HSN/SAC Code</label>
                                        <div className="sort-by-select-wrapper">
                                            <Select
                                                disableUnderline
                                                disabled={this.state.mode === "view" ? true : false}
                                                variant="standard"
                                                autoWidth={true}
                                                name="hsn_code_id"
                                                onChange={this.handleChangeGst}
                                                className="sort-by-select w-100"
                                                value={this.state.infoDetails?.hsn_code_id}
                                            >
                                                <MenuItem
                                                    value={""}
                                                    disabled
                                                    className="field_toggle_checked"
                                                >
                                                    Select HSN code{" "}
                                                </MenuItem>
                                                {this.state.gst?.map(val=>{return(
                                                    <MenuItem value={val?.id}>
                                                        {val?.hsn_code}-CGST({val?.cgst}%)-SGST({val?.sgst}%)-IGST({val?.igst}%)
                                                    </MenuItem>
                                                )})}
                                                
                                            </Select>
                                            {/* <small className="form-text text-danger" >{this.state.errors["status"]}</small> */}
                                        </div>
                                    </div>
                                </div>
                                {this.state.infoDetails?.hsn_code !== "" &&<>
                                <div className="col-md-3">
                                    <div className="fc-form-group d-flex align-items-center h-100">
                                        <label>CGST(%): <span style={{ fontWeight: "400" }}>{parseFloat(this.state.infoDetails?.cgst)?.toFixed(2)}</span></label>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="fc-form-group d-flex align-items-center h-100">
                                        <label>SGST(%): <span style={{ fontWeight: "400" }}>{parseFloat(this.state.infoDetails?.sgst)?.toFixed(2)}</span></label>
                                    </div>
                                </div>
                                <div className="col-md-2">
                                    <div className="fc-form-group d-flex align-items-center h-100">
                                        <label>IGST(%): <span style={{ fontWeight: "400" }}>{parseFloat(this.state.infoDetails?.igst)?.toFixed(2)}</span></label>
                                    </div>
                                </div>
                                </>}
                            </div>




                        </div>

                        <div>
                            <div className='section-heading'>Category</div>
                            <div className='mt-2'>
                                {/* <mark className='font-sm'><small>TODO: One to many category selector</small></mark> */}
                                < InfoCategory mode={this.state.mode} details={this.state.infoDetails?.categories} handle={this.categoryHandle.bind(this)} />
                            </div>
                        </div>
                        {/* <div>
                            <div className='section-heading'>Product Variant</div>
                            <div className='mt-2'>
                                <mark className='font-sm'><small>TODO: Product variant selector</small></mark>
                            </div>
                        </div> */}
                        <div>
                            <div className='section-heading'>Certifications</div>
                            <div className='mt-2'>
                                {/* <mark className='font-sm'><small>TODO: Certification selector</small></mark> */}
                                <InfoCertification mode={this.state.mode} handle={this.stateHandle.bind(this)} details={this.state.infoDetails?.certifications} />
                            </div>
                        </div>
                        <div>
                            <div className='section-heading'>Quantity</div>
                            <div className='mt-2'>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Weight
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                type="string"
                                                min="0"
                                                name="weight"
                                                readOnly={this.state.mode === "view" ? true : false}
                                                value={this.state.infoDetails?.weight}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                            <small className="form-text text-danger" >{this.state.errors["weight"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Weight Unit
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                type="text"
                                                name="weight_unit"
                                                readOnly={this.state.mode === "view" ? true : false}
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
                                            <label>Height (cm)
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                name="height"
                                                readOnly={this.state.mode === "view" ? true : false}
                                                value={this.state.infoDetails?.height}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                            <small className="form-text text-danger" >{this.state.errors["height"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Width (cm)
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                name="breadth"
                                                readOnly={this.state.mode === "view" ? true : false}
                                                value={this.state.infoDetails?.breadth}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                            <small className="form-text text-danger" >{this.state.errors["breadth"]}</small>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Length (cm)
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                 type="number"
                                                 min="0"
                                                name="length"
                                                readOnly={this.state.mode === "view" ? true : false}
                                                value={this.state.infoDetails?.length}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                            <small className="form-text text-danger" >{this.state.errors["length"]}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Serving Size
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                name="serving_size"
                                                readOnly={this.state.mode === "view" ? true : false}
                                                value={this.state.infoDetails?.serving_size}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                            <small className="form-text text-danger" >{this.state.errors["serving_size"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Serving Size Unit
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                type="text"
                                                name="serving_size_unit"
                                                readOnly={this.state.mode === "view" ? true : false}
                                                value={this.state.infoDetails?.serving_size_unit}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                            <small className="form-text text-danger" >{this.state.errors["serving_size_unit"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Serving Count
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                name="serving_count"
                                                readOnly={this.state.mode === "view" ? true : false}
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
                                            <label>Form
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                type="text"
                                                name="product_form"
                                                readOnly={this.state.mode === "view" ? true : false}
                                                value={this.state.infoDetails?.product_form}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                            <small className="form-text text-danger" >{this.state.errors["product_form"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Gender
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                type="text"
                                                name="gender"
                                                readOnly={this.state.mode === "view" ? true : false}
                                                value={this.state.infoDetails?.gender}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                            <small className="form-text text-danger" >{this.state.errors["gender"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Specialty Diet
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                type="text"
                                                name="specialty_diet"
                                                readOnly={this.state.mode === "view" ? true : false}
                                                value={this.state.infoDetails?.specialty_diet}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                            <small className="form-text text-danger" >{this.state.errors["specialty_diet"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Recommended Age
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <input
                                                type="text"
                                                name="recommended_age"
                                                readOnly={this.state.mode === "view" ? true : false}
                                                value={this.state.infoDetails?.recommended_age}
                                                onChange={this.handleChange.bind(this)}
                                            />
                                            <small className="form-text text-danger" >{this.state.errors["recommended_age"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Is Vegetarian
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <RadioGroup
                                                row
                                                disabled={this.state.mode === "view" ? true : false}
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={this.state.infoDetails?.is_vegetarian}
                                                onChange={this.handleRadio}
                                            >
                                                <FormControlLabel value={true} control={<Radio disabled={this.state.mode === "view" ? true : false} size={"small"} style={{ color: "#012169" }} />} label="Yes" />
                                                <FormControlLabel value={false} control={<Radio disabled={this.state.mode === "view" ? true : false} size={"small"} style={{ color: "#012169" }} />} label="No" />
                                            </RadioGroup>
                                            <small className="form-text text-danger" >{this.state.errors["is_vegetarian"]}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Country of Origin
                                                {/* <span className="mandatory-star">*</span> */}
                                            </label>
                                            <select className='form-control'
                                                disabled={this.state.mode === "view" ? true : false}
                                                value={this.state.infoDetails?.origin_country_id}
                                                name="origin_country_id"
                                                onChange={this.handleChange.bind(this)}>
                                                <option value={"select"} disabled>Select country</option>
                                                {this.state.country?.map(val => {
                                                    return (
                                                        <option value={val?.id}>{val?.name}</option>
                                                    )
                                                })}
                                            </select>
                                            {/* <input
                                                type="text"
                                                readOnly={this.state.mode === "view"?true:false}
                                                name="origin_country_id"
                                                value={this.state.infoDetails?.origin_country_id}
                                                onChange={this.handleChange.bind(this)}
                                            /> */}
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
