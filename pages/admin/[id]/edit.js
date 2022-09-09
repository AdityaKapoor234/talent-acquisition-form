import Head from "next/head";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import AdminComponent from "../../../component/admin/admin-list";
import Pagination from "@mui/material/Pagination";
import AdminDetails from "../../../component/admin/admin-details";
import Router from "next/router";
import Cookie from "js-cookie";
import AdminApi from "../../../services/admin";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
        props: {
            id: id || null,
        },
    };
}

export default function AdminEditDetails({ id }) {

    const mode = "edit";

    const [admin, setAdmin] = useState([]);
    const [active, setActive] = useState(false);
    const [oldPass, setOldPass] = useState("");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const [passCheck, setPassCheck] = useState(false);

    const activeHandle = (value) => {
        setActive(value)
    }

    const oldPassHandle = (value) => {
        setOldPass(value)
    }

    const passHandle = (value) => {
        setPass(value)
    }

    const passHandle2 = (value) => {
        setPass2(value)
    }

    const passCheckHandle = () => {
        setPassCheck(true)
    }

	const passCheckFalseHandle = () => {
        setPassCheck(false)
    }

    function validateData() {
        if (passCheck === true) {
            if (
                oldPass === "" ||
                oldPass === null ||
                oldPass === undefined ||
                oldPass.replace(/\s/g, "").length <= 0
            ) {
                toast.error("Please enter the old password");
                return false;
            }
            if (
                pass === "" ||
                pass === null ||
                pass === undefined ||
                pass.replace(/\s/g, "").length <= 0 ||
                !pass.match(/^(?=.*([A-Z]){1,})(?=.*[!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{10,}$/)
            ) {
                toast.error("Please enter valid password");
                return false;
            }
            if (pass2 === "" ||
                pass2 === null ||
                pass2 === undefined ||
                pass2.replace(/\s/g, "").length <= 0
            ) {
                toast.error("Please enter the password again");
                return false;
            }
            if (pass !== pass2) {
                toast.error("Your password doesn't match");
                return false;
            }
        }
        return true;
    };

    const saveDetails = (id) => {
        if (validateData()) {
            // if (passCheck === true) {
            //     let data = {
            //         "is_active": active,
            //         "password": pass,
            //         "old_pass": oldPass,
            //     }
            //     AdminApi
            //     .AdminDetails(id, data)
            //     .then((response) => {
            //         if (response.data.httpStatusCode === 200) {
            //             toast.success(response.data.message)
            //             Router.push(`/admin`);
            //         }
            //     })
            //     .catch((error) => {
            //         toast.error(
            //             error?.response &&
            //                 error?.response?.data &&
            //                 error?.response?.data?.message
            //                 ? error.response.data.message
            //                 : "Unable to process your request, please try after sometime"
            //         );
            //     });
            // }
            // else {
                let data = {
                    "is_active": active,
                    "password": "-1",
                    "old_pass": "-1",
                }   
                AdminApi
                .AdminDetails(id, data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        toast.success(response.data.message)
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
            // }
        }
    }

    const savePass = (id) => {
        if (validateData()) {
            if (passCheck === true) {
                let data = {
                    "is_active": active,
                    "password": pass,
                    "old_pass": oldPass,
                }
                AdminApi
                .AdminDetails(id, data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        toast.success(response.data.message)
                        // Router.push(`/admin`);
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
            else {
                let data = {
                    "is_active": active,
                    "password": "-1",
                    "old_pass": "-1",
                }   
                AdminApi
                .AdminDetails(id, data)
                .then((response) => {
                    if (response.data.httpStatusCode === 200) {
                        toast.success(response.data.message)
                        // Router.push(`/admin`);
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
        }
    }


    const adminDetail = (id) => {
        AdminApi
            .getAdminDetails(id)
            .then((response) => {
                setAdmin(response.data.data)
                setPass(response.data.data.password)
                setPass2(response.data.data.password)
                setActive(response.data.data.is_active)
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

    useEffect(() => {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        adminDetail(id)
        setPassCheck(false)
    }, [id]);
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
                                <span>user / user / </span>Edit user{" "}
                            </div>
                            <div className="page-name">User - {admin?.name}</div>
                        </div>
                        <div className="col-md-7 btn-save">
                            <div
                                className="custom-btn "
                                onClick={() => {
                                    saveDetails(id)
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
                            <AdminDetails admin={admin} id={id} mode={mode} active={activeHandle} oldPass={oldPassHandle} pass={passHandle} pass2={passHandle2} passCheck={passCheckHandle} passCheckFalse={passCheckFalseHandle} save={savePass}/>
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}
