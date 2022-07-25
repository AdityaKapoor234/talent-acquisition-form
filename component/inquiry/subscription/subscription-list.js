import React, { Component } from "react";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InquiryApi from "../../../services/inquiry";
import { toast } from "react-toastify";
import Router from "next/router";

export default class SubscriptionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subscription: props?.subscription,
			is_unsubscribe: false,
			currentPage: props?.currentPage,
			id: "",
			open: false,
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.subscription !== nextProps.subscription ||
			prevState.currentPage !== nextProps.currentPage
		) {
			return {
				subscription: nextProps?.subscription,
				currentPage: nextProps.currentPage
			};
		}
		return null;
	}

	handleOpen = (i, unsubscribe) => {
		unsubscribe === "true" ? this.state.is_unsubscribe = true : this.state.is_unsubscribe = false;
		this.state.id = i;
		this.setState({ open: true });
	}

	handleClose = () => {
		this.setState({ open: false });
	}

	handleCheckbox = () => {
		this.setState({ open: false });

		this.state.timeout = setTimeout(() => {
			if (this.state.is_unsubscribe === true) {
				this.state.is_unsubscribe = false;
				let data = {
					"is_unsubscribe": this.state.is_unsubscribe,
				}
				InquiryApi.subscriptionListEDIT(this.state.id, data)
					.then((response) => {
						if (response.data.httpStatusCode === 200) {
							toast.success("Subscripton is Updated")
							this.props?.subscriptionList(this.state.currentPage, "");
							// Router.push(`/subscription`);
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
				this.state.is_unsubscribe = true;
				let data = {
					"is_unsubscribe": this.state.is_unsubscribe,
				}
				InquiryApi.subscriptionListEDIT(this.state.id, data)
					.then((response) => {
						if (response.data.httpStatusCode === 200) {
							toast.success("Subscripton is Updated")
							this.props?.subscriptionList(this.state.currentPage, "");
							// Router.push(`/subscription`);
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
		}, 200)

	};

	saveDetails = () => {
	}


	convertDateStringToDate = (dateStr) => {
		let months = [
			"Jan",
			"Feb",
			"Mar",
			"Apr",
			"May",
			"Jun",
			"Jul",
			"Aug",
			"Sep",
			"Oct",
			"Nov",
			"Dec",
		];

		let date = new Date(dateStr);
		date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
		let str =
			date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
		return str;
	};

	render() {
		return (
			<div data-component="CustomerComponent">
				<div className="row">
					<div className="col-md-12">
						<div className="tableRow">
							<div className="col pe-1">Email</div>
							<div className="col px-2 text-center">Registration Date</div>
							<div className="col px-2 text-center">Subscription</div>
							<div className="col-1 text-end">Action</div>
						</div>
					</div>
				</div>

				{
					this.state.subscription && this.state.subscription.length === 0 ? <div className="not-found">No Data Found</div> :
						this.state.subscription?.map((p, index) => {
							return (
								<div className="row" key={index}>
									<div className="col-md-12">
										<div className="tableCell">
											<div className="tableBody pe-1 col elip-text" title={p?.email}>{p?.email}</div>
											<div className="tableBody px-2 col justify-content-center elip-text" title={p?.created_at}>
												{p?.created_at}
											</div>
											<div className="col px-2 text-center elip-text">
												{p?.is_unsubscribe === true ? (
													<CheckCircleOutlineOutlinedIcon className="check-icon" />
												) : (
													<CancelOutlinedIcon className="cancel-icon" />
												)}
											</div>
											<div className="col-1 text-end">
												{/* <RemoveRedEyeIcon
                          className="view-icon"
                          onClick={() => {
                            Router.push(`/subscription/${p?.id}/view`);
                          }}
                        /> */}
												<EditOutlinedIcon
													className="edit-icon"
													// onClick={() => {
													//   Router.push(`/subscription/${p?.id}/edit`);
													// }}
													onClick={() => {
														this.handleOpen(`${p?.id}`, `${p?.is_unsubscribe}`)
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							);
						})}
				<Dialog
					open={this.state.open}
					onClose={this.handleClose}
					maxWidth="sm"
					fullWidth
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle style={{ color: "#012169" }}>
						Confirm the action
					</DialogTitle>
					<Box position="absolute" top={0} right={0}>
						<IconButton onClick={this.handleClose}>
							<CloseIcon />
						</IconButton>
					</Box>
					<DialogContent>
						<Typography style={{ color: "#7e8f99" }}>
							Are you sure you want to{" "}
							{this.state.is_unsubscribe === true
								? "deactivate this subscription"
								: "activate this subscription"}
							?
						</Typography>
					</DialogContent>
					<DialogActions style={{ marginBottom: "0.5rem" }}>
						<Button
							onClick={this.handleClose}
							style={{
								color: "#012169",
								background: "white",
								borderRadius: "0px",
							}}
							color="primary"
							variant="contained"
						>
							Cancel
						</Button>
						<Button
							onClick={this.handleCheckbox}
							style={{ background: "#f54a00", borderRadius: "0px" }}
							color="secondary"
							variant="contained"
						>
							Confirm
						</Button>
					</DialogActions>
				</Dialog>

			</div>
		);
	}
}
