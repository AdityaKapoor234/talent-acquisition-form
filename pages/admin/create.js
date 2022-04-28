import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import AdminCreateComponent from "../../component/admin/admin-details";
import Router from "next/router";
import Cookie from "js-cookie";
import AdminApi from "../../services/admin";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id: id || null,
        },
    };
}

export default class AdminCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props?.id,
            mode: "create",
            admin: {},
            expertise: [],
            pass2: "",
            open: false,
            adminDetails: {
                name: "",
                email: "",
                password: "",
                is_active: false,
                phone_number: "",
            },
        };
    }

    ValidateEmail = (mail) => {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            mail
        );
    };

    validateData = () => {
        if (
            this.state.adminDetails?.name === "" ||
            this.state.adminDetails?.name === null ||
            this.state.adminDetails?.name.replace(/\s/g, "").length <= 0
        ) {
            toast.error("Please enter the name");
            return false;
        }
        if (this.state.adminDetails?.email === "" ||
            this.state.adminDetails?.email === null ||
            this.state.adminDetails?.email.replace(/\s/g, "").length <= 0
        ) {
            toast.error("Please enter email address");
            return false;
        }
        if (!this.ValidateEmail(this.state.adminDetails?.email)) {
            toast.error("Please enter a valid email address");
            return false;
        }
        if (this.state.adminDetails?.password === "" ||
            this.state.adminDetails?.password === null ||
            this.state.adminDetails?.password === undefined ||
            this.state.adminDetails?.password.replace(/\s/g, "").length <= 0
        ) {
            toast.error("Please enter password");
            return false;
        }
        if (this.state.pass2 === "" ||
            this.state.pass2 === null ||
            this.state.pass2 === undefined ||
            this.state.pass2.replace(/\s/g, "").length <= 0
        ) {
            toast.error("Please enter the password again");
            return false;
        }
        if (this.state.adminDetails?.password !== this.state.pass2) {
            toast.error("Your password doesn't match");
            return false;
        }

        if (this.state.adminDetails?.phone_number === "") {
            toast.error("Please enter phone number");
            return false;
        }
        if (this.state.adminDetails?.phone_number !== undefined) {
            if (!this.state.adminDetails?.phone_number.match(/^[0-9]{10}$/)) {
                toast.error("Please enter valid phone number");
                return false;
            }
            if (this.state.adminDetails?.phone_number.replace(/\s/g, "").length <= 0) {
                toast.error("Please enter phone number");
                return false;
            }
        }

        return true;
    };
    OnSave = () => {
        if (this.validateData()) {
            let data = {
                name: this.state.adminDetails?.name,
                phone_number: this.state.adminDetails?.phone_number,
                email: this.state.adminDetails?.email,
                password: this.state.adminDetails?.password,
                is_active: this.state.adminDetails?.is_active,
            };
            AdminApi.AdminCreate(data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        this.setState({ admin: response.data.data.admins });
                        toast.success(response.data.message);
                        Router.push(`/admin`);
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
    // stateHandle = (value) => {
    //     this.setState({ adminDetails: value });
    //     this.state.adminDetails.email
    // };
    nameHandle = (value) => {
        // this.setState({ adminDetails: value });
        this.state.adminDetails.name = value;
    };
    phoneHandle = (value) => {
        // this.setState({ adminDetails: value });
        this.state.adminDetails.phone_number = value;
    };
    mailHandle = (value) => {
        // this.setState({ adminDetails: value });
        this.state.adminDetails.email = value;
    };
    passHandle = (value) => {
        // this.setState({ adminDetails: value });
        this.state.adminDetails.password = value;
    };
    passHandle2 = (value) => {
        this.state.pass2 = value;
    };
    activeHandle = (value) => {
        // this.setState({ adminDetails: value });
        this.state.adminDetails.is_active = value;
    };

    componentDidMount() {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        this.setState({ id: this.props?.id });
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
                                        Router.push(`/admin`);
                                    }}
                                >
                                    <span>Cancel </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-m-12">
                                <AdminCreateComponent
                                    admin={this.state.admin}
                                    mode={this.state.mode}
                                    // handle={this.stateHandle.bind(this)}
                                    name={this.nameHandle.bind(this)}
                                    phone={this.phoneHandle.bind(this)}
                                    pass={this.passHandle.bind(this)}
                                    pass2={this.passHandle2.bind(this)}
                                    mail={this.mailHandle.bind(this)}
                                    active={this.activeHandle.bind(this)}
                                />
                            </div>
                        </div>
                    </DashboardLayoutComponent>
                </main>
            </div>
        );
    }
}
