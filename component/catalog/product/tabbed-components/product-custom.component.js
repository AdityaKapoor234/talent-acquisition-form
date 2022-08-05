import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";

export default class ProductCustomComponent extends Component {
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
            <div data-component="product-custom-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave}>Custom Fields</ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12">
                        <p className='mt-5'>Product custom field editor is under development</p>
                    </div>
                </div>
            </div>
        );
    }
}
