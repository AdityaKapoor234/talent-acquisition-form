import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import CheckMySupplementComponent from "../../component/cms/check-my-supplement/check-my-supplement";
import Router from "next/router";
import Cookie from "js-cookie";
import CheckMySupplementAPI from "../../services/check-my-supplement";
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

export default class CheckMySupplement extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 1,
			mode: "view",
			checkMySupplement: [],
			open: false,
			is_all: false,
			
			checkMySupplementDetails: {
				banner: "",
				created_at: null,
                deleted_at: null,
				description: "",
                id: 1,
                short_description: "",
                sm_banner: "",
                sort_order: null,
                title: null,
                updated_at: "",
			},
		};
	}
	validateData = () => {
		this.setState({ is_all: false });

		if (!this.state.checkMySupplementDetails.description || this.state.checkMySupplementDetails.description ==="<p></p>\n" || 
		this.state.checkMySupplementDetails.description.replace(/&nbsp;/g, "").length <=8)
		{
			this.state.is_all = true;
			toast.error("Please enter the full description");
			return false;
		}
		
		if (!this.state.checkMySupplementDetails.short_description || this.state.checkMySupplementDetails.short_description ==="<p></p>\n" || 
		this.state.checkMySupplementDetails.short_description.replace(/&nbsp;/g, "").length <=8)
		 {
			this.state.is_all = true;
			toast.error("Please enter the short description");
			return false;
		}

		if (this.state.checkMySupplementDetails.banner === "" || this.state.checkMySupplementDetails.banner === null || 
		this.state.checkMySupplementDetails.banner.replace(/\s/g, "").length <= 0) {
			this.state.is_all = true;
			toast.error("Please enter the banner");
			return false;
		}
		
        if (this.state.checkMySupplementDetails.sm_banner === "" || this.state.checkMySupplementDetails.sm_banner === null || 
		this.state.checkMySupplementDetails.sm_banner.replace(/\s/g, "").length <= 0) {
			this.state.is_all = true;
			toast.error("Please enter the small banner");
			return false;
		}

		return true;

	};
	OnSave = () => {
		if (this.validateData()) {
			let data = {
                "description": this.state.checkMySupplementDetails?.description,
                "short_description": this.state.checkMySupplementDetails.short_description,
                "banner": this.state.checkMySupplementDetails.banner,
                "sm_banner" : this.state.checkMySupplementDetails.sm_banner,
            };
			CheckMySupplementAPI.checkMySupplementEDIT(this.state.id, data).then((response) => { 
				if (response.data.httpStatusCode === 200) {
					toast.success(response.data.message);
					//Router.push(`/check-my-supplement`);
					this.checkMySupplementDetail();
					this.setState({mode: 'view'});
				}
			}).catch((error) => {
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

	checkMySupplementDetail = () => {
		CheckMySupplementAPI.checkMySupplementViewDetails().then((response) => {
			this.setState({checkMySupplement: response.data.data.list[0]?.check_my_supp});
			this.setState({checkMySupplementDetails: response.data.data.list[0]?.check_my_supp});
			//console.log(this.state.checkMySupplement);
			//console.log(this.state.checkMySupplementDetails);
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

	stateHandle = (value) => {
		this.setState({ checkMySupplementDetails: value });
	};

	componentDidMount() {
		const token = Cookie.get("access_token_admin");
		if (token === undefined) {
			Router.push("/");
		}
		this.checkMySupplementDetail();
		this.setState({ id: 1 });
	}
	render() {
		return (
			<div>
				<Head>
					<title>{APP_NAME} - Check My Supplement</title>
					<meta name="description" content="Trusted Brands. Better Health." />
					<link rel="icon" href="/fitcart.ico" />
				</Head>

				<main>
					<DashboardLayoutComponent>
						<div className="row border-box">
							<div className="col-md-7">
								<div className="hamburger">
									<span>CMS / Check My Supplement / </span>
								</div>
								<div className="page-name">
									{
										this.state.mode === "edit" ? 
										<>
										Edit Details - Check My Supplement
										</>
										:
										<>
										View Details - Check My Supplement
										</>
									}
									
								</div>
							</div>
							<div className="col-md-5 btn-save">
                                {
                                    this.state.mode === 'edit' ? 
                                    <div
									className="custom-btn "
									onClick={() => {
										this.OnSave();    
									}}
									>
									<span>Save </span>
								    </div>
									:
									<div
										className="custom-btn "
										onClick={() => {
											this.setState({mode: 'edit'});
										}}
									>
									<span>Edit</span>
								    </div>
                                }
								
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
								{/* <div
									className="Cancel-btn custom-btn"
									onClick={() => {
										Router.push(`/certification`);
									}}
								>
									<span>Cancel </span>
								</div> */}
							</div>
						</div>
						<div className="row">
							<div className="col-m-12">
								<CheckMySupplementComponent
									checkMySupplement={this.state.checkMySupplement}
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
