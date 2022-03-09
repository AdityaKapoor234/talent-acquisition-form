import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";

export default class ProductInventoryComponent extends Component {
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
            <div data-component="product-inventory-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue} showSaveContinueButton={true}>Inventories</ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12 pt-4">
                        <mark className='font-sm'><small>TODO: Product inventory editor is under development</small></mark>
                    </div>
                </div>
            </div>
        );
    }
}
