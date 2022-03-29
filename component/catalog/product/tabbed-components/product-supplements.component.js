import React, { Component } from "react";
import ProductTabEditorHeader from "./sub-components/product-tab-editor-header.component";
import SupplementApi from "../../../../services/supplement";
import { toast } from "react-toastify";
import Router from "next/router";

export default class ProductSupplementsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplements: [],
            ingredient:[],
            select:"",
            id:props?.id,
            errors:{},
            mode:props?.mode,
        };
    }

    addNewIngredient(){
        let supplements = this.state.supplements;
        if( supplements.filter((value)=>{return value.id === 0}).length >0){
            toast.error("Add one by one")
        }else{
            supplements.push({
                "id": 0,
                "ingredient_id": '',
                "amount_per_serving": null,
                "daily_value": null,
                "sort_order": null,
                "serving_unit": "",
                "remove_id": false
            })
        }
        this.setState({
            supplements
        })
    }

    removeIngredient(i){
        let supplements = this.state.supplements;
        let objIndex = supplements.findIndex((obj => obj.id === parseInt(i)));
        supplements[objIndex]["remove_id"] = true
        this.setState({supplements})
        this.EditSupplement(this.state.id)
    }

    handleChange = (event) => {
        let supplements = this.state.supplements;
        let objIndex = supplements.findIndex((obj => obj.id === parseInt(event.target.id)));
        if(event.target.name === "serving_unit"){
            supplements[objIndex][event.target.name] = (event.target.value)
        }else if (event.target.name === "serving_unit"){
            supplements[objIndex][event.target.name] = parseFloat(event.target.value)
        }
        else{
            supplements[objIndex][event.target.name] = parseInt(event.target.value)
        }
        this.setState({supplements});
    };

    handleSelect=(event)=> {
        let supplements = this.state.supplements;
        let objIndex = supplements.findIndex((obj => obj.id === parseInt(event.target.id)));
        supplements[objIndex]["ingredient_id"] = parseInt(event.target.value)
        this.setState({supplements});
      }

    validation(){
        let input = this.state.supplements;
        let errors = {};
        let isValid = true;
            if (this.state.supplements?.filter((value)=>{return value.amount_per_serving ===null}).length >0) {
                isValid = false;
                errors["amount_per_serving"] = "Please enter";
            }
            if (this.state.supplements?.filter((value)=>{return value.ingredient_id ===''}).length >0) {
                isValid = false;
                errors["ingredient_id"] = "Please enter";
            }
            if (this.state.supplements?.filter((value)=>{return value.daily_value ===null}).length >0) {
                isValid = false;
                errors["daily_value"] = "Please enter";
            }
            if (this.state.supplements?.filter((value)=>{return value.sort_order ===null}).length >0) {
                isValid = false;
                errors["sort_order"] = "Please enter";
            }
            if (this.state.supplements?.filter((value)=>{return value.serving_unit ===''}).length >0) {
                isValid = false;
                errors["serving_unit"] = "Please enter";
            }
        this.setState({
            errors: errors
        });

        return isValid;
    }

    validate=()=>{
        if ( this.state.supplements?.length === 0) {
            toast.error("Please Add atleast one supplements ");
            return false;
        }
          return true;
    }

    onSave=()=> {
        if(this.validation() && this.validate()){
            this.EditSupplement(this.state.id,"save")
        }
    }

    onSaveAndContinue=()=> {
        if(this.validation()  && this.validate()){
            this.EditSupplement(this.state.id,"continue")
        }
    }

    AddIngredient = ()=>{
        if(this.validation()  && this.validate()){
            this.EditSupplement(this.state.id,"none")
        }
    }

    EditSupplement = (id,button)=>{
        let data={
            "data": this.state.supplements
        }
        SupplementApi.AddSupplement(id,data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
            let list =  response.data.data?.data
            list.forEach(function(field) {
                field.remove_id = false
                })
          this.setState({supplements: list});
            if(button === "continue"){
                toast.success("Update supplement successfully")
                this.props?.tab("inventories")
            }else if(button === "save"){
                toast.success("Update supplement successfully")
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

    getIngredeint=()=>{
        SupplementApi.IngredientList()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ingredient: response.data.data?.list });
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

    getSupplementData=(id)=>{
        SupplementApi.getSupplement(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
            let list =  response.data.data?.data
            list.forEach(function(field) {
                field.remove_id = false
                })
          this.setState({supplements: list});
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

    componentDidMount(){
        this.getIngredeint()
        this.getSupplementData(this.state.id)
    }

    render() {
        return (
            <div data-component="product-supplement-edit" className='product-tabbed-editor'>
                <ProductTabEditorHeader onSave={this.onSave} onSaveAndContinue={this.onSaveAndContinue} showSaveContinueButton={true} mode={this.state.mode}>Supplements</ProductTabEditorHeader>
                <div className="row ">
                    <div className="col-md-12">
                        {
                            this.state.supplements.length === 0 && <p className='mt-2'>Add ingredient but clicking on the button below</p>
                        }
                        {
                            this.state.supplements.map((s, i)=>{
                                return <div key={i} className='row mt-2'>
                                    <div className='col-md-2'>
                                        <select className='form-control' disabled={this.state.mode === "view"?true:false}  readOnly={this.state.mode === "view"?true:false} id={s?.id} value={s.ingredient_id} onChange={this.handleSelect}>
                                            <option value="" disabled>Select Ingredient</option>
                                            {this.state.ingredient?.map(val=>{
                                                return(
                                                    <option value={val?.id}>{val?.name}</option>
                                                )
                                            })}
                                        </select>
                                        <small className="form-text text-danger" >{this.state.errors["ingredient_id"]}</small>
                                    </div>
                                    <div className='col-md-2'>
                                        <input type="number"  readOnly={this.state.mode === "view"?true:false} placeholder='Per serving' id={s?.id} className='form-control' name='amount_per_serving' onChange={this.handleChange} value={s.amount_per_serving} />
                                        <small className="form-text text-danger" >{this.state.errors["amount_per_serving"]}</small>
                                    </div>
                                    <div className='col-md-2'>
                                        <input type="number"  readOnly={this.state.mode === "view"?true:false} placeholder='Daily value' id={s?.id} name='daily_value'  className='form-control' onChange={this.handleChange} value={s.daily_value} />
                                        <small className="form-text text-danger" >{this.state.errors["daily_value"]}</small>
                                    </div>
                                    <div className='col-md-2'>
                                        <input type="number"  readOnly={this.state.mode === "view"?true:false} placeholder='Sort Order' id={s?.id} name='sort_order'  className='form-control' onChange={this.handleChange} value={s.sort_order} />
                                        <small className="form-text text-danger" >{this.state.errors["sort_order"]}</small>
                                    </div>
                                    <div className='col-md-2'>
                                        <input type="text" readOnly={this.state.mode === "view"?true:false} placeholder='Serving Unit' id={s?.id} name='serving_unit'  className='form-control' onChange={this.handleChange} value={s.serving_unit} />
                                        <small className="form-text text-danger" >{this.state.errors["serving_unit"]}</small>
                                    </div>
                                    {s?.id === 0 ? <>
                                    <div className='col-md-1 d-grid'>
                                        <button disabled={this.state.mode === "view"?true:false} className='btn btn-success btn-sm' onClick={this.AddIngredient.bind(this, s?.id)}>Add</button>
                                    </div>
                                    <div className='col-md-1 d-grid'>
                                        <button disabled={this.state.mode === "view"?true:false} className='btn btn-danger btn-sm' onClick={this.removeIngredient.bind(this, s?.id)}>Remove</button>
                                    </div></>:
                                    <div className='col-md-2 d-grid'>
                                        <button disabled={this.state.mode === "view"?true:false} className='btn btn-danger btn-sm' onClick={this.removeIngredient.bind(this, s?.id)}>Remove</button>
                                    </div>}
                                </div>
                            })
                        }
                        {this.state.mode === "edit" &&
                        <div className='mt-5'>
                            <button className='btn btn-primary' onClick={this.addNewIngredient.bind(this)}>Add New Ingredient</button>
                        </div>}
                    </div>
                </div>
            </div>
        );
    }
}
