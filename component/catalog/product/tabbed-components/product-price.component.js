import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import Router from "next/router";


export default class ProductPriceComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isunsaved: false,
            prices: [
                {
                    'special_price': 1000,
                    'price': 1500,
                    'created_at': new Date() - 5,
                    'id': 1,
                },
                {
                    'special_price': 999,
                    'price': 1500,
                    'created_at': new Date() - 10,
                    'id': 2
                }
            ],
            mode:props?.mode
        };
    }
    handleChange = (event) => {
        this.setState({ type: event.target.value });
    };

    addNewPrice(){
        debugger;
        let prices = this.state.prices;
        prices = [{
            'special_price': 0,
            'price': 0,
            'created_at': null,
            'id': 0
        }].concat(prices)
        this.setState({
            prices,
            isunsaved: true
        })
    }

    onSave() {
        console.log('bar');
        this.setState({
            isunsaved: false
        })
        Router.push("/product")
    }

    onSaveAndContinue() {
        console.log('continue');
        this.setState({
            isunsaved: false
        })
        this.props?.tab("photos")
    }
        
    render() {
        return (
            <div data-component="product-price-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave.bind(this)} onSaveAndContinue={this.onSaveAndContinue.bind(this)} mode={this.state.mode} showSaveContinueButton={true}>Prices</ProductTabEditorHeader>
                {/* <ProductTabEditorHeader onSave={this.onSave}  onSaveAndContinue={this.onSaveAndContinue} showSaveContinueButton={true}>Prices</ProductTabEditorHeader> */}
                <div className="row ">
                    <div className="col-md-12">
                        {
                            this.state.prices.length === 0 && <p className='mt-2'>Add price but clicking on the button below</p>
                        }
                        {
                            this.state.prices.map((p, i)=>{
                                return <div key={i} className='row mt-2'>

                                    <div className='col-md-4'>
                                        <input type="number" placeholder='Price' className='form-control' value={p.price} />
                                    </div>
                                    <div className='col-md-4'>
                                        <input type="text" placeholder='Special Price'  className='form-control' value={p.special_price} />
                                    </div>
                                    <div className='col-md-4 mt-1'>
                                        {/*Added on: {p.created_at}*/}
                                    </div>
                                </div>
                            })
                        }
                        <div className='mt-5'>
                            <button className='btn btn-primary'  disabled={this.state.isunsaved} onClick={this.addNewPrice.bind(this)}>Add New Price</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
