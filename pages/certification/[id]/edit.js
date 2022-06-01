import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import CertificationCreateComponent from "../../../component/cms/certification/certification-details";
import Router from "next/router";
import Cookie from "js-cookie";
import CertificationApi from "../../../services/certification";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export async function getServerSideProps(context) {
	const { id } = context.query;
	return {
		props: {
			id: id || null,
		},
	};
}

export default class CertificationEditDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props?.id,
			mode: "edit",
			certification: {},
			open: false,
			is_all: false,
			is_name: false,
			certificationDetails: {
				name: "",
				content: "",
				path: "",
				is_trust_health: false,
				is_active: false,
				sort_order: null,
				read_more_url: "",
			},
		};
	}
	validateData = () => {
		this.setState({ is_all: false });
		this.setState({ is_name: false });

		if (
			this.state.certificationDetails?.name === "" ||
			this.state.certificationDetails?.name === null ||
			this.state.certificationDetails?.name === undefined
		) {
			toast.error("Please enter the name");
			this.state.is_name = true;
			this.state.is_all = true;
		}
		if (this.state.certificationDetails?.name !== undefined) {
			if (this.state.certificationDetails?.name.replace(/\s/g, "").length <= 0) {
				if (this.state.is_name === false) {
					toast.error("Please enter the name");
					this.state.is_all = true;
				}
			}
		}
		if (
			this.state.certificationDetails?.path === "" ||
			this.state.certificationDetails?.path === null ||
			this.state.certificationDetails?.path === undefined
			// this.state.certificationDetails?.path.replace(/\s/g, "").length <= 0
		) {
			toast.error("Please enter the icon");
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
				name: this.state.certificationDetails?.name,
				path: this.state.certificationDetails?.path,
				is_active: this.state.certificationDetails?.is_active,
			};
			CertificationApi.certificationListEDIT(this.props.id, data)
				.then((response) => {
					if (response.data.httpStatusCode === 200) {
						// this.setState({ certification: response.data.data.certification });
						toast.success(response.data.message);
						Router.push(`/certification`);
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
		this.setState({ certificationDetails: value });
	};
	getcertificationDetails = (id) => {
		CertificationApi.certificationViewDetails(id)
			.then((response) => {
				if (response.data.httpStatusCode === 200) {
					let details = {
						name: response.data.data.certification?.name,
						content: response.data.data.certification?.content,
						path: response.data.data.certification?.path,
						is_trust_health: response.data.data.certification?.is_trust_health,
						is_active: response.data.data.certification?.is_active,
						sort_order: response.data.data.certification?.sort_order,
						read_more_url: response.data.data.certification?.read_more_url,
					};
					this.setState({
						certificationDetails: details,
						certification: response.data.data.certification,
					});
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
		this.getcertificationDetails(this.props.id);
		this.setState({ id: this.props?.id });
	}
	render() {
		return (
			<div>
				<Head>
					<title>{APP_NAME} - Certification</title>
					<meta name="description" content="Trusted Brands. Better Health." />
					<link rel="icon" href="/fitcart.ico" />
				</Head>

				<main>
					<DashboardLayoutComponent>
						<div className="row border-box">
							<div className="col-md-5">
								<div className="hamburger">
									<span>CMS / Certification / </span>Edit Certification
								</div>
								<div className="page-name">
									Edit Certification Details - {this.state.certificationDetails?.name}
								</div>
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
								{/* <div
									className="Cancel-btn custom-btn"
									onClick={() => {
										this.setState({ open: true });
									}}
								>
									<span>Delete </span>
								</div> */}
								<div
									className="Cancel-btn custom-btn"
									onClick={() => {
										Router.push(`/certification`);
									}}
								>
									<span>Cancel </span>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-m-12">
								<CertificationCreateComponent
									certification={this.state.certification}
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
