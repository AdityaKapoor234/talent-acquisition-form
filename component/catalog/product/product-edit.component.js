import React, { Component } from "react";
import ProductInfoComponent from "./tabbed-components/product-info.component";
import ProductContentComponent from "./tabbed-components/product-content.component";
import ProductInventoryComponent from "./tabbed-components/product-inventory.component";
import ProductPriceComponent from "./tabbed-components/product-price.component";
import ProductPhotoComponent from "./tabbed-components/product-photo.component";
import ProductSEOComponent from "./tabbed-components/product-seo.component";
import ProductCustomComponent from "./tabbed-components/product-custom.component";
import ProductSupplementsComponent from "./tabbed-components/product-supplements.component";

const editor_tabs = [
    {
        'id': 1,
        'show': true,
        'label': 'Info',
        'key': 'info'
    },
    {
        'id': 4,
        'show': true,
        'label': 'Content',
        'key': 'content'
    },
    {
        'id': 42,
        'show': true,
        'label': 'Supplements',
        'key': 'supplements'
    },
    {
        'id': 41,
        'show': true,
        'label': 'Inventories',
        'key': 'inventories'
    },
    {
        'id': 42,
        'show': true,
        'label': 'Prices',
        'key': 'prices'
    },
    {
        'id': 5,
        'show': true,
        'label': 'Photos',
        'key': 'photos'
    },
    {
        'id': 6,
        'show': true,
        'label': 'SEO',
        'key': 'seo'
    },
    {
        'id': 7,
        'show': false,
        'label': 'Custom Fields',
        'key': 'custom'
    }
]

export default class ProductEditComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: editor_tabs,
            active: false,
            tab: 'info',
            mode: props?.mode,
            id:props?.id,
            product: props?.product ? props.product : {},
            name: props?.product?.name ? props.product?.name : "",
            type: props?.product?.type ? props.product?.type : "",
        };
    }
    handleChange = (event) => {
        this.setState({ type: event.target.value });
    };

    render() {
        return (
            <div data-component="edit-category">
                <div className="row ">
                    <div className="col-md-12">
                        <div className="tab">
                            {
                                this.state.tabs.map((t)=>{
                                    return t.show && <div
                                        key={t.key}
                                        className={
                                            this.state.tab === t.key ? `sub-tab active-tab` : "sub-tab"
                                        }
                                        onClick={() => {
                                            this.setState({ tab: t.key });
                                        }}
                                    >
                                            {t.label}
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.tab === 'info' && (
                        <>
                            <ProductInfoComponent id={this.state.id}/>
                        </>
                    )}
                    {this.state.tab === 'content' && (
                        <>
                            <ProductContentComponent product_id={this.state.product.id} mode={this.state.mode}/>
                        </>
                    )}
                    {this.state.tab === 'inventories' && (
                        <>
                            <ProductInventoryComponent product_id={this.state.product.id}/>
                        </>
                    )}
                    {this.state.tab === 'prices' && (
                        <>
                            <ProductPriceComponent product_id={this.state.product.id}/>
                        </>
                    )}
                    {this.state.tab === 'photos' && (
                        <>
                            <ProductPhotoComponent product_id={this.state.product.id}/>
                        </>
                    )}
                    {this.state.tab === 'seo' && (
                        <>
                            <ProductSEOComponent id={this.state.id}/>
                        </>
                    )}
                    {this.state.tab === 'custom' && (
                        <>
                            <ProductCustomComponent product_id={this.state.product.id}/>
                        </>
                    )}
                    {this.state.tab === 'supplements' && (
                        <>
                            <ProductSupplementsComponent id={this.state.id}/>
                        </>
                    )}
                </div>
            </div>
        );
    }
}
