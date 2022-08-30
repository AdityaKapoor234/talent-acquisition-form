import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import CustomerCreateComponent from "../../component/customer/customer-details";
import Router from "next/router";
import Cookie from "js-cookie";
import CustomerApi from "../../services/customer";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id: id || null,
        },
    };
}

export default class CustomerCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props?.id,
            mode: "create",
            customer: {},
            expertise: [],
            pass2: "",
            userType: [],
            open: false,
            is_all: false,
            active: "",
            shoppingCartTotal: "",
            customerDetails: {
                name: "",
                email: "",
                phone_number: "",
                user_type: "",
            },
        };
    }

    stateHandle = (value) => {
        this.setState({ customerDetails: value });
    };
    activeHandle = (value) => {
        this.setState({ active: value });
    }


    ValidateEmail = (mail) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            mail
        );
    };

    validateData = () => {
        this.state.is_all = false;
        if (
            this.state.customerDetails?.name === "" ||
            this.state.customerDetails?.name === null ||
            this.state.customerDetails?.name === undefined ||
            this.state.customerDetails?.name.replace(/\s/g, "").length <= 0
        ) {
            toast.error("Please enter the name");
            this.state.is_all = true;
        }
        if (this.state.customerDetails?.email) {
            if (this.state.customerDetails?.email === "" ||
                this.state.customerDetails?.email === null ||
                this.state.customerDetails?.email === undefined ||
                this.state.customerDetails?.email.replace(/\s/g, "").length <= 0 ||
                !this.ValidateEmail(this.state.customerDetails?.email)
            ) {
                toast.error("Please enter valid email address");
                this.state.is_all = true;
            }
        }
        // if (this.state.customerDetails?.phone_number === "" ||
        //     this.state.customerDetails?.phone_number !== undefined
        // ) {
        //     if (!this.state.customerDetails?.phone_number.match(/^[6-9]{1}[0-9]{9}$/) ||
        //         this.state.customerDetails?.phone_number.replace(/\s/g, "").length <= 0
        //     ) {
        //         toast.error("Please enter phone number");
        //         this.state.is_all = true;
        //     }
        // }
        if (
            this.state.customerDetails?.user_type === "select" ||
            this.state.customerDetails?.user_type === null ||
            this.state.customerDetails?.user_type === undefined ||
            this.state.customerDetails?.user_type.replace(/\s/g, "").length <= 0
        ) {
            toast.error("Please enter the user type");
            this.state.is_all = true;
        }

        if (this.state.is_all === true) {
            return false;
        }

        return true;

    };
    OnSave = () => {
        if (this.validateData()) {
            let data;
            if (this.state.customerDetails?.email) {
                data = {
                    name: this.state.customerDetails?.name,
                    phone_number: this.state.customerDetails?.phone_number,
                    email: this.state.customerDetails?.email,
                    user_type: this.state.customerDetails?.user_type,
                };
            }
            else {
                data = {
                    name: this.state.customerDetails?.name,
                    phone_number: this.state.customerDetails?.phone_number,
                    email: null,
                    user_type: this.state.customerDetails?.user_type,
                };
            }
            CustomerApi.CustomerAdd(data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        this.setState({ customer: response.data.data });
                        toast.success(response.data.message);
                        Router.push(`/customer`);
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
    wishListDetail = (id, page) => {
        CustomerApi.WishList(id, page)
            .then((response) => {
                setWishList(response.data.data.list);
                setWishListTotalProduct(response.data.data.total);
                setTotalWishListPage(Math.ceil(response.data.data.total / response.data.data.page_size));

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
    customerTypeDropdownDetail = () => {
        CustomerApi.getCustomerTypeDropdownDetails()
            .then((response) => {
                this.setState({ userType: response.data.data.list })
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


    // stateHandle = (value) => {
    //     this.setState({ customerDetails: value });
    //     this.state.customerDetails.email
    // };
    nameHandle = (value) => {
        this.state.customerDetails.name = value;
    };
    phoneHandle = (value) => {
        this.state.customerDetails.phone_number = value;
    };
    mailHandle = (value) => {
        this.state.customerDetails.email = value;
    };
    userTypeHandle = (value) => {
        this.state.customerDetails.user_type = value;
    };

    componentDidMount() {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        this.setState({ id: this.props?.id });
        // this.wishListDetail(this.props?.id, "1");
        this.customerTypeDropdownDetail();
    }
    render() {
        return (
            <div>
                <Head>
                    <title>{APP_NAME} - User</title>
                    <meta name="description" content="Trusted Brands. Better Health." />
                    <link rel="icon" href="/fitcart.ico" />
                </Head>

                <main>
                    <DashboardLayoutComponent>
                        <div className="row border-box">
                            <div className="col-md-5">
                                <div className="hamburger">
                                    <span>Users / Users / </span>Add New User
                                </div>
                                <div className="page-name">Add New User</div>
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
                                        Router.push(`/customer`);
                                    }}
                                >
                                    <span>Cancel </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-m-12">
                                <CustomerCreateComponent
                                    // handle={stateHandle}
                                    // customer={customer}
                                    // id={id}
                                    // mode={mode}
                                    // active={activeHandle}
                                    // userType={userType}
                                    // wishList={wishList}
                                    // totalWishListPage={totalWishListPage}
                                    // wishListTotalProduct={wishListTotalProduct}
                                    // wishListPage={wishListPage}


                                    customer={this.state.customer}
                                    mode={this.state.mode}
                                    id={this.state.id}
                                    handle={this.stateHandle.bind(this)}
                                    name={this.nameHandle.bind(this)}
                                    phone={this.phoneHandle.bind(this)}
                                    mail={this.mailHandle.bind(this)}
                                    userTypeHandle={this.userTypeHandle.bind(this)}
                                    active={this.activeHandle.bind(this)}
                                    userType={this.state.userType}
                                    shoppingCartTotal={this.state.shoppingCartTotal}
                                />
                            </div>
                        </div>
                    </DashboardLayoutComponent>
                </main>
            </div>
        );
    }
}
