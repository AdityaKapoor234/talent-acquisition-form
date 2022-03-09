import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";


export default class ProductPriceComponent extends Component {
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
            <div data-component="product-price-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue} showSaveContinueButton={true}>Prices</ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12 pt-4">
                        <mark className='font-sm'><small>TODO: Product price editor is under development</small></mark>
                    </div>
                </div>
            </div>
        );
    }
}
