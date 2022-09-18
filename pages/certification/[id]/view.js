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

export default class CertificationViewDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props?.id,
			mode: "view",
			certification: {},
			open: false,
			is_all: false,
			is_name: false,
			certificationDetails: {
				name: "",
				content: "",
				path: "",
				certificate_number: "",
				is_trust_health: false,
				is_active: false,
				sort_order: null,
				read_more_url: "",
			},
		};
	}
	getcertificationDetails = (id) => {
		CertificationApi.certificationViewDetails(id)
			.then((response) => {
				if (response.data.httpStatusCode === 200) {
					let details = {
						name: response.data.data.certification?.name,
						content: response.data.data.certification?.content,
						path: response.data.data.certification?.path,
						certificate_number: response.data.data.certification?.certificate_number,
						is_trust_health: response.data.data.certification?.is_trust_health,
						is_active: response.data.data.certification?.is_active,
						sort_order: response.data.data.certification?.sort_order,
						read_more_url: response.data.data.certification?.read_more_url,
					};
					this.setState({
						certificationDetails: details,
					});
					this.setState({
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
									<span>CMS / Certification / </span>View Certification
								</div>
								<div className="page-name">
									View Certification Details - {this.state.certificationDetails?.name}
								</div>
							</div>
							<div className="col-md-7 btn-save">
								{/* <div
									className="custom-btn "
									onClick={() => {
										this.OnSave();
									}}
								>
									<span>Save </span>
								</div> */}
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
								/>
								{/* {console.log(this.state.certification,"certification")} */}
							</div>
						</div>
					</DashboardLayoutComponent>
				</main>
			</div>
		);
	}
}
