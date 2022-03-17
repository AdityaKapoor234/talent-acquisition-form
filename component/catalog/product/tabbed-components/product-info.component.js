import React, {Component} from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import InfoCategory from "./sub-components/info-tab-component/info-category.component";

export default class ProductInfoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange = (event) => {
        this.setState({type: event.target.value});
    };


    onSave() {
        console.log('bar');
    }

    onSaveAndContinue() {
        console.log('continue');
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
                                            name="name"
                                            value=''
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="fc-form-group">
                                        <label>Name<span className="mandatory-star">*</span></label>
                                        <input
                                            type="text"
                                            name="name"
                                            value=''
                                            onChange={this.handleChange.bind(this)}
                                        />
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
                                                name="parent_id"
                                                onChange={this.handleChange}
                                                className="sort-by-select w-100"
                                                value='published'
                                            >
                                                <MenuItem
                                                    value={"select"}
                                                    disabled
                                                    className="field_toggle_checked"
                                                >
                                                    Select Status{" "}
                                                </MenuItem>
                                                <MenuItem value='draft'>Draft</MenuItem>
                                                <MenuItem value='published'>Publised</MenuItem>
                                                <MenuItem value='archived'>Archived</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">

                                    <div className="sort fc-select-form-group">
                                        <label>Brand<span className="mandatory-star">*</span></label>
                                        <div className="sort-by-select-wrapper">
                                            <Select
                                                disableUnderline
                                                variant="standard"
                                                autoWidth={true}
                                                name="parent_id"
                                                onChange={this.handleChange}
                                                className="sort-by-select w-100"
                                                value='published'
                                            >
                                                <MenuItem
                                                    value={"select"}
                                                    disabled
                                                    className="field_toggle_checked"
                                                >
                                                    Select Status{" "}
                                                </MenuItem>
                                                <MenuItem value='draft'>Draft</MenuItem>
                                                <MenuItem value='published'>Publised</MenuItem>
                                                <MenuItem value='archived'>Archived</MenuItem>
                                            </Select>
                                        </div>
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
                                                name="parent_id"
                                                onChange={this.handleChange}
                                                className="sort-by-select w-100"
                                                value='published'
                                            >
                                                <MenuItem
                                                    value={"select"}
                                                    disabled
                                                    className="field_toggle_checked"
                                                >
                                                    Select Status{" "}
                                                </MenuItem>
                                                <MenuItem value='draft'>Draft</MenuItem>
                                                <MenuItem value='published'>Publised</MenuItem>
                                                <MenuItem value='archived'>Archived</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div>
                            <div className='section-heading'>Category</div>
                            <div className='mt-2'>
                                <mark className='font-sm'><small>TODO: One to many category selector</small></mark>
                                < InfoCategory/>
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
                                <mark className='font-sm'><small>TODO: Certification selector</small></mark>
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
                                                type="text"
                                                name="name"
                                                value=''
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Weight Unit<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value=''
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Serving Size<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value=''
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Serving Size Unit<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value=''
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Serving Count<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value=''
                                                onChange={this.handleChange.bind(this)}
                                            />
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
                                                name="name"
                                                value=''
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Gender<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value=''
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Specialty Diet<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value=''
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Recommended Age<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value=''
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Is Vegan<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value=''
                                                onChange={this.handleChange.bind(this)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="fc-form-group">
                                            <label>Country of Origin<span className="mandatory-star">*</span></label>
                                            <input
                                                type="text"
                                                name="name"
                                                value=''
                                                onChange={this.handleChange.bind(this)}
                                            />
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
