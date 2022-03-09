import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";

export default class ProductSEOComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    handleChange = (event) => {
        this.setState({ type: event.target.value });
    };


    onSave() {
        console.log('bar');
    }

    onSaveAndContinue() {
        console.log('continue');
    }

    render() {
        return (

            <div data-component="product-seo-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue} showSaveContinueButton={true}>
                    Search Engine Optimisation
                </ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="fc-form-group">
                                    <label>URL Key<span className="mandatory-star">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        value=''
                                        onChange={this.handleChange.bind(this)}
                                    />
                                </div>
                                <div className="fc-form-group">
                                    <label>Meta Title<span className="mandatory-star">*</span></label>
                                    <br/>
                                    <textarea
                                        name="short_description"
                                        cols="100"
                                        rows="5"
                                        value=''
                                    />
                                </div>
                                <div className="fc-form-group">
                                    <label>Meta Keywords<span className="mandatory-star">*</span></label>
                                    <br/>
                                    <textarea
                                        name="short_description"
                                        cols="100"
                                        rows="5"
                                        value=''
                                    />
                                </div>
                                <div className="fc-form-group">
                                    <label>Meta Description<span className="mandatory-star">*</span></label>
                                    <br/>
                                    <textarea
                                        name="short_description"
                                        cols="100"
                                        rows="5"
                                        value=''
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
