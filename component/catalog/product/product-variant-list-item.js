import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Router from "next/router";
import {APP_URL} from "../../../utils/constant";
import Link from "@mui/material/Link";

export default class ProductVariantListItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: props?.product,
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            product: nextProps.product
        });
    }

    render() {
        return (
            <div data-component="product-variant-list-item" className='product-list-item'>
                <div className='row'>
                    <div className='col-8'><Link href={APP_URL+'/product/'+this.state.product.id} target="_blank" rel="noopener">{this.state.product.name}</Link></div>
                </div>
            </div>
        );
    }
}