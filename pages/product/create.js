import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import ProductCreateComponent from "../../component/catalog/product/product-create.component";
import Router from "next/router";
import Cookie from "js-cookie";
import ProductApi from "../../services/product";


export default class ProductCreate extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mode: "edit",
        product: {},
        open: false,
        productDetails: {
            name:"",
            sku:"",
            status:""
        },
        errors:{},
      };
    }

    validation(){
        let input = this.state.productDetails;
        let errors = {};
        let isValid = true;
            if (!input["sku"]) {
                isValid = false;
                errors["sku"] = "Please enter sku";
            }
            if (!input["name"]) {
                isValid = false;
                errors["name"] = "Please enter name";
            }
            if (!input["status"]) {
                isValid = false;
                errors["status"] = "Please select status";
            }
            
        this.setState({
            errors: errors
        });

        return isValid;
    }

    OnSave = () => {
        if (this.validation()) {
          let data = {
            "sku": this.state.productDetails?.sku,
            "name":this.state.productDetails?.name,
            "status":this.state.productDetails?.status
          };
          console.log("data",data)
          ProductApi.createProduct(data)
            .then((response) => {
              if (response.data.httpStatusCode === 200) {
                toast.success(response.data.message);
                Router.push(`/product`);
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
      };

    stateHandle = (value) => {
        this.setState({ productDetails: value });
      };

    componentDidMount() {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
          Router.push("/");
        }
      }
      render() {
    return (
        <div>
            <Head>
                <title>{APP_NAME} - Product</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-4">
                            <div className="hamburger">
                                <span>Catalog / Product / </span>Add A New Product
                            </div>
                            <div className="page-name">Add  A New Product</div>
                        </div>
                        <div className="col-md-8 btn-save">
                            <div
                                className="custom-btn "
                                onClick={() => {
                                    this.OnSave();
                                }}
                                >
                                <span>Save </span>
                            </div>
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/product`);
                                }}
                            >
                                <span>Cancel </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-m-12">
                            <ProductCreateComponent 
                                mode={this.state.mode} 
                                errors={this.state.errors}
                                product={this.state.productDetails}
                                handle={this.stateHandle.bind(this)}
                            />
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}
}
