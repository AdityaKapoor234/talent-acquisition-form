import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import Router from "next/router";


export default class ProductPriceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode:props?.mode
        };
    }
    handleChange = (event) => {
        this.setState({ type: event.target.value });
    };

    onSave=()=> {
        Router.push("/product")
    }

    onSaveAndContinue=()=> {
        this.props?.tab("photos")
    }
    render() {
        return (
            <div data-component="product-price-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} mode={this.state.mode} onSaveAndContinue={this.onSaveAndContinue} showSaveContinueButton={true}>Prices</ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12 pt-4">
                        <mark className='font-sm'><small>TODO: Product price editor is under development</small></mark>
                    </div>
                </div>
            </div>
        );
    }
}
