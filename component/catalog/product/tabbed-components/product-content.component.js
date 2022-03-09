import React, {Component} from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";

export default class ProductContentComponent extends Component {
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
            <div data-component="product-content-edit" className='product-tabbed-editor'>

                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue} showSaveContinueButton={true}>Content</ProductTabEditorHeader>

                <div className="row ">
                    <div className="col-md-12">
                        <div className="fc-form-group">
                            <label>Product Label<span className="mandatory-star">*</span></label>
                            <br/>
                            <textarea
                                name="product_label"
                                cols="100"
                                rows="5"
                                value=''
                            />
                        </div>
                        <div className="fc-form-group">
                            <label>Short Description<span className="mandatory-star">*</span></label>
                            <br/>
                            <textarea
                                name="short_description"
                                cols="100"
                                rows="5"
                                value=''
                            />
                        </div>
                        <div className="fc-form-group">
                            <label>Full Description<span className="mandatory-star">*</span></label>
                            <br/>
                            <textarea
                                name="short_description"
                                cols="100"
                                rows="5"
                                value=''
                            />
                        </div>
                        <div className="fc-form-group">
                            <label>Direction of Use<span className="mandatory-star">*</span></label>
                            <br/>
                            <textarea
                                name="short_description"
                                cols="100"
                                rows="5"
                                value=''
                            />
                        </div>
                        <div className="fc-form-group">
                            <label>Other Ingredient<span className="mandatory-star">*</span></label>
                            <br/>
                            <textarea
                                name="short_description"
                                cols="100"
                                rows="5"
                                value=''
                            />
                        </div>
                        <div className="fc-form-group">
                            <label>Does Not Contain<span className="mandatory-star">*</span></label>
                            <br/>
                            <textarea
                                name="description"
                                cols="100"
                                rows="5"
                                value=''
                            />
                        </div>
                        <div className="fc-form-group">
                            <label>Warning<span className="mandatory-star">*</span></label>
                            <br/>
                            <textarea
                                name="description"
                                cols="100"
                                rows="5"
                                value=''
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
