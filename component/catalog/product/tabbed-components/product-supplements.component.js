import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";

export default class ProductSupplementsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplements: []
        };
    }

    addNewIngredient(){
        let supplements = this.state.supplements;
        supplements.push({
            'ingredient': {},
            'amount_per_serving': '',
            'daily_value': '',
            'sort_order': supplements.length + 2,
            'serving_unit': '',
        })
        this.setState({
            supplements
        })
    }

    removeIngredient(i){
        console.log(this.state.supplements)
        let supplements = this.state.supplements;
        supplements.splice(i,1)
        this.setState({supplements})
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
            <div data-component="product-supplement-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue} showSaveContinueButton={true}>Supplements</ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12">
                        {
                            this.state.supplements.length === 0 && <p className='mt-2'>Add ingredient but clicking on the button below</p>
                        }
                        {
                            this.state.supplements.map((s, i)=>{
                                return <div key={i} className='row mt-2'>
                                    <div className='col-md-2'>
                                        <select className='form-control' name="" id="">
                                            <option value="">Select Ingredient</option>
                                        </select>
                                    </div>
                                    <div className='col-md-2'>
                                        <input type="text" placeholder='Per serving' className='form-control' value={s.amount_per_serving} />
                                    </div>
                                    <div className='col-md-2'>
                                        <input type="text" placeholder='Daily value'  className='form-control' value={s.daily_value} />
                                    </div>
                                    <div className='col-md-2'>
                                        <input type="text" placeholder='Sort Order'  className='form-control' value={s.sort_order} />
                                    </div>
                                    <div className='col-md-2'>
                                        <input type="text" placeholder='Serving Unit'  className='form-control' value={s.serving_unit} />
                                    </div>
                                    <div className='col-md-2 d-grid'>
                                        <button className='btn btn-danger btn-sm' onClick={this.removeIngredient.bind(this, i)}>Remove</button>
                                    </div>
                                </div>
                            })
                        }
                        <div className='mt-5'>
                            <button className='btn btn-primary' onClick={this.addNewIngredient.bind(this)}>Add New Ingredient</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
