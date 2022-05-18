import React, { Component } from "react";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import AddCustomerComponent from "../../component/customer/addcustomer.component";
import Pagination from "@mui/material/Pagination";
import CustomerDetail from "../../component/customer/customer-details";
import Router from "next/router";
import Cookie from "js-cookie";
import Link from 'next/link'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomerApi from "../../services/customer";

export default class AddCustomerType extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "edit",
			open: false,
			is_all: false,
			customer: [],
			customerDetails: {
				user_type: "",
				sort_order: null,
				is_active: false,
			},
		};
	}


	validateData = () => {
		this.setState({ is_all: false });

		if ((this.state.customerDetails?.user_type === "" || this.state.customerDetails?.user_type === null || this.state.customerDetails?.user_type?.replace(/\s/g, "")?.length <= 0)) {
			toast.error("Please enter user type");
			this.state.is_all = true;
		}
		if ((this.state.customerDetails?.sort_order === "" || this.state.customerDetails?.sort_order === null)) {
			toast.error("Please enter display order ");
			this.state.is_all = true;
		}
		if (this.state.is_all === true) {
			return false;
		}
		else {
			return true;
		}
	};


	OnSave = () => {
		if (this.validateData()) {
			let data = {
				user_type: this.state.customerDetails?.user_type,
				is_active: this.state.customerDetails?.is_active,
				sort_order: parseInt(this.state.customerDetails?.sort_order)
			};
			console.log(data, "data on save");
			CustomerApi.CustomerTypeAdd(data)
				.then((response) => {
					if (response.data.httpStatusCode === 200) {
						// this.setState({ customer: response.data.data });
						toast.success(response.data.message);
						Router.push(`/customer-type`);
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

	stateHandle = (value) => {
		this.setState({ customerDetails: value })
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
					<title>{APP_NAME} - Customer</title>
					<meta name="description" content="Trusted Brands. Better Health." />
					<link rel="icon" href="/fitcart.ico" />
				</Head>

				<main>
					<DashboardLayoutComponent>
						<div className="row border-box">
							<div className="col-md-7">
								<div className="hamburger">
									<span>customer / customer Type / </span> Add Customer Type
								</div>
								<div className="page-name"> </div>
							</div>
							<div className="col-md-5 btn-save">
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
										Router.push(`/customer-type`);
									}}
								>
									<span>Cancel </span>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-m-12">
								<AddCustomerComponent mode={this.state.mode} handle={this.stateHandle.bind(this)} />
							</div>
						</div>
					</DashboardLayoutComponent>
				</main>
			</div>
		);
	}
}