import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Router from "next/router";
import ProductInfoApi from "../../../services/product-info";
import {toast} from "react-toastify";
import ProductApi from "../../../services/product";

export default class ProductSelector extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            product: {},
            input: {
                q: ''
            }
        };
    }


    handleChange = (event) => {
        let input = this.state.input;
        input[event.target.name]= event.target.value;
        this.setState({ input: input });
    };

    selectProduct(product){
        this.setState({
            product
        })
        this.props.onSelect(product)
    }



    getProducts = ()=>{
        ProductApi.getProducts(this.state.input.q)
            .then((response) => {
                if (response.data.httpStatusCode === 200) {
                    this.setState({
                        products :response.data.data?.list
                    })
                }
            })
            .catch((error) => {
                toast.error(
                    error?.response &&
                    error?.response?.data &&
                    error?.response?.data?.message
                        ? error.response.data.message
                        : "Unable to process your request, please try after sometime1"
                );
            });
    }



    componentDidMount() {
        this.getProducts()
    }

    render() {
        return (
            <div data-component="product-selector">
                <div className='search-box'>
                    <div className="input-group mb-3">
                        <input name='q' type="text" value={this.state.input.q} onChange={this.handleChange.bind(this)} className="form-control box-radius-square" placeholder="Recipient's username"
                               aria-label="enter product name" aria-describedby="button-addon2" />
                            <button className="btn btn-primary" onClick={this.getProducts.bind(this)} type="button" id="button-addon2">Go
                            </button>
                    </div>
                </div>
                <div className='product-list-container'>
                    {
                        this.state.products?.map((p, index) => {
                            return <div onClick={this.selectProduct.bind(this, p)}  className={this.state.product.type_id === p.type_id ? 'product-list-item selected': 'product-list-item'}>
                                <p className='name'>{p.id} {p.label}</p>
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }
}