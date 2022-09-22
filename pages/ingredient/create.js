import Head from "next/head";
import Image from "next/image";
import React, { Component, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import IngredientCreateComponent from "../../component/catalog/ingredient/ingredient-create";
import Router from "next/router";
import Cookie from "js-cookie";
import IngredientApi from "../../services/ingredient";

export default class IngredientCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: "edit",
            ingredient: {},
            ingredientDetails: {
                sort_order: null,
                name: "",
                is_active: null,
            },
        };
    }

    ValidateName = (name) => {
        // return /[A-Za-z]+$/.test(
        return /^[a-zA-Z0-9 ]*$/.test(
            name
        )
    }

    validateData = () => {
        if (
            this.state.ingredientDetails.name === "" &&
            (this.state.ingredientDetails.sort_order === "" ||
                this.state.ingredientDetails.sort_order === null)
        ) {
            toast.error("Please enter Display Order ");
            toast.error("Please enter name");
            return false;
        }
        if (this.state.ingredientDetails.name === "" || !this.ValidateName(this.state.ingredientDetails.name) || this.state.ingredientDetails?.name.replace(/\s/g, "").length <=0) {
            toast.error("Please enter name");
            return false;
        }
        if (
            this.state.ingredientDetails.sort_order === "" ||
            this.state.ingredientDetails.sort_order === null
        ) {
            toast.error("Please enter Display Order ");
            return false;
        }

        return true;
    };

    OnSave = () => {
        if (this.validateData()) {
            let data = {
                name: this.state.ingredientDetails.name,
                sort_order: parseInt(this.state.ingredientDetails.sort_order),
                is_active: this.state.ingredientDetails.is_active,
            };
            IngredientApi.IngredientCreate(data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        this.setState({ ingredient: response.data.data.Ingredient });
                        toast.success(response.data.message);
                        Router.push(`/ingredient`);
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
        this.setState({ ingredientDetails: value });
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
                    <title>{APP_NAME} - Incredient</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-5">
                                <div className="hamburger">
                                    <span>Category / Ingredient / </span>Add A New Ingredient
                                </div>
                                <div className="page-name">Add A New Ingredient</div>
                            </div>
                            <div className="col-md-7 btn-save">
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
                                        Router.push(`/ingredient`);
                                    }}
                                >
                                    <span>Cancel </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-m-12">
                                <IngredientCreateComponent
                                    mode={this.state.mode}
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
