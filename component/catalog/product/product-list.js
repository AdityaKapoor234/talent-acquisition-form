import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Router from "next/router";

export default class ProductList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: props?.product,
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.product !== nextProps.product
        ) {
            return {
                product: nextProps?.product
            };
        }
        return null;
    }

    render() {
        return (
            <div data-component="CustomerComponent">
                <div className="row">
                    <div className="col-md-12">
                        <div className="tableRow">
                            <div className="col pe-1">Name</div>
                            <div className="col-2 px-2 text-center">Product Code</div>
                            <div className="col-2 px-2 text-center">Stock Quantity</div>
                            <div className="col-1 text-center">Status</div>
                            <div className="col-1 text-end">View</div>
                            <div className="col-1 text-end">Edit</div>
                        
                        </div>
                    </div>
                </div>
                {
                // this.state.product && this.state.product.length === 0 ? <div className="not-found">No Data Found</div> :
                    this.state.product?.map((p, index) => {
                    return (
                        <div className="row" key={index}>
                            <div className="col-md-12">
                                <div className="tableCell">
                                    <div className="tableBody pe-1 col elip-text" title={p?.name}>{p?.name}</div>
                                    <div className=" col-2 px-2 text-center elip-text" title={p?.sku}>{p?.sku}</div>
                                    <div className=" col-2 px-2 text-center elip-text" title={p?.stock}>{p?.stock}</div>
                                    <div className="col-1 text-center">
                                        {console.log("test",p?.status)}
                                        {p?.status === "draft" &&(
                                            <BlockOutlinedIcon className="draft"/>
                                        ) }
                                        {p?.status === "published" &&(
                                            <CheckCircleOutlineOutlinedIcon className="check-icon"/>
                                        ) }
                                        {p?.status === "out_of_stock" &&(
                                            <ProductionQuantityLimitsIcon className="out"/>
                                        ) }
                                        {p?.status === "archived" &&(
                                            <CancelOutlinedIcon className="cancel-icon" />
                                        ) }
                                        
                                    </div>
                                    <div className="col-1 text-end">
                                        <RemoveRedEyeIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/product/${p?.id}/view`);
                                            }}
                                        />
                                    </div>
                                    <div className="col-1 text-end">
                                        <EditOutlinedIcon
                                            className="edit-icon"
                                            onClick={() => {
                                                Router.push(`/product/${p?.id}/edit`);
                                            }}
                                            />
                                    </div>
                                    
                                    </div>
                                </div>
                            </div>
                    );
                })}
            </div>
        );
    }
}
