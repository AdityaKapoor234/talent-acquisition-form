import React, { Component } from "react";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import AddCustomer from "../../../component/customer/addcustomer.component";
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
import CustomerApi from "../../../services/customer";


export async function getServerSideProps(context) {
	const { id } = context.query;
	return {
		props: {
			id: id || null,
		},
	};
}

export default class EditCustomerType extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props?.id,
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


	OnSave = (id) => {
		if (this.validateData()) {
			let data = {
				user_type: this.state.customerDetails?.user_type,
				is_active: this.state.customerDetails?.is_active,
				sort_order: this.state.customerDetails?.sort_order
			};
			CustomerApi.EditCustomerType(id, data)
				.then((response) => {
					if (response.data.httpStatusCode === 200) {
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


	CustomerType = (id) => {
		CustomerApi.getCustomerType(id)
			.then((response) => {
				this.setState({ customer: response.data.data.view });
				let details = {
					user_type: response.data.data.view.user_type,
					sort_order: response.data.data.view.sort_order,
					is_active: response.data.data.view.is_active
				};
				this.setState({ customerDetails: details });
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
	};

	Delete = (id) => {
		let data = {};
		CustomerApi.CustomerTypeDelete(id, data)
			.then((response) => {
				if (response.data.httpStatusCode === 200) {
					Router.push("/customer-type");
					toast.success(response.data.message);
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
	};

	componentDidMount() {
		const token = Cookie.get("access_token_admin");
		if (token === undefined) {
			Router.push("/");
		}
		this.CustomerType(this.state.id);
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
							<div className="col-md-5">
								<div className="hamburger">
									<span>customer / customer Type / </span> Edit Customer Type
								</div>
								<div className="page-name"> </div>
							</div>
							<div className="col-md-7 btn-save">
								<div
									className="custom-btn "
									onClick={() => {
										this.OnSave(this.state.id);
									}}
								>
									<span>Save </span>
								</div>
								<div
									className="Cancel-btn custom-btn"
									onClick={() => {
										this.setState({open: true})
									}}
								>
									<span>Delete </span>
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
								<AddCustomer mode={this.state.mode} customer={this.state.customer} handle={this.stateHandle.bind(this)} />
							</div>
						</div>
					</DashboardLayoutComponent>
					<Dialog
						open={this.state.open}
						onClose={() => this.setState({open: false})}
						maxWidth="sm"
						fullWidth
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle style={{ color: "#012169" }}>
							Confirm the action
						</DialogTitle>
						<Box position="absolute" top={0} right={0}>
							<IconButton onClick={() => this.setState({open: false})}>
								<CloseIcon />
							</IconButton>
						</Box>
						<DialogContent>
							<Typography style={{ color: "#7e8f99" }}>
								Are you sure you want to delete this customer Type?
							</Typography>
						</DialogContent>
						<DialogActions style={{ marginBottom: "0.5rem" }}>
							<Button
								onClick={() => {
									this.setState({open: false})
								}}
								style={{
									color: "#012169",
									borderRadius: "0px",
									background: "white",
								}}
								color="primary"
								variant="contained"
							>
								Cancel
							</Button>
							<Button
								onClick={() => this.Delete(this.state.id)}
								style={{ background: "#f54a00", borderRadius: "0px" }}
								color="secondary"
								variant="contained"
							>
								Confirm
							</Button>
						</DialogActions>
					</Dialog>
				</main>
			</div >
		);
	}
}