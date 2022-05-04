import React, { Component } from "react";
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
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default class SubscriptionDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			subscription: props?.subscription,
			open: false,
			mode: props?.mode,
		};
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.subscription !== nextProps.subscription ||
			prevState.mode !== nextProps.mode
		) {
			return {
				subscription: nextProps?.subscription,
				mode: nextProps?.mode,
			};
		}
		return null;
	}
	// handleChange = (event) => {
	// 	let input = this.state.input;
	// 	input[event.target.name] = event.target.value;
	// 	this.setState({ input });
	// 	this.props?.handle(input);
	// };
	// handleCheck = (event) => {
	// 	let input = this.state.input;
	// 	input[event.target.name] = event.target.checked;
	// 	this.setState({ input });
	// 	this.props?.handle(input);
	// };
	// handlePhotoUrl = (name, url) => {
	// 	let input = this.state.input;
	// 	input[name] = url;
	// 	this.setState({ input });
	// 	this.props?.handle(input);
	// };
	// selectTypes = (list, expertise) => {
	// 	let model = list?.map(p => p?.id)
	// 	let tempcategoryList = expertise;
	// 	for (let i in tempcategoryList) {
	// 		if (model !== undefined) {
	// 			if (model?.length > 1) {
	// 				if (model.indexOf(tempcategoryList[i].id) >= 0)
	// 					tempcategoryList[i].selected = true;
	// 				else {
	// 					tempcategoryList[i].selected = false;
	// 				}
	// 			} else {
	// 				if (model?.indexOf(tempcategoryList[i].id) >= 0)
	// 					tempcategoryList[i].selected = true;
	// 				else {
	// 					tempcategoryList[i].selected = false;
	// 				}
	// 			}
	// 		}
	// 		else {
	// 			tempcategoryList[i].selected = false;
	// 		}
	// 	}
	// 	return tempcategoryList;
	// };

	// handleChangeExpert = (event) => {
	// 	let List = this.state.expertise;
	// 	for (let i in List) {
	// 		if (List[i].id === parseInt(event.target.value)) {
	// 			List[i].selected = event.target.checked;
	// 			break;
	// 		}
	// 	}
	// 	this.setState({ expertise: List });
	// 	const expertList = List?.filter(p => p?.selected === true)?.map(val => val?.id)
	// 	let input = this.state.input;
	// 	input["expertises"] = expertList;
	// 	this.setState({ input });
	// 	this.props?.handle(input);
	// };


	// componentDidUpdate(prevProps) {
	// 	if (this.props.expert !== prevProps?.expert) {
	// 		this.setState({
	// 			expertise: this.selectTypes(this.props.expert, this.props?.expertise)
	// 		})
	// 	}
	// }
	// componentDidMount() {

	// }

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
		let str =
			date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
		return str;
	};

	render() {
		return (
			<div data-component="edit-customer">
				<div className="row">
					<div className="col-md-12">
						<div className="tab">
							<div
								className={
									this.state.tab === 1 ? `sub-tab active-tab` : "sub-tab"
								}
								onClick={() => {
									this.setState({ tab: 1 });
								}}
							>
								Subscription info
							</div>
						</div>
					</div>
				</div>
				{this.state.tab === 1 && (
					<>
						{this.state.mode === "edit" && (
							<div className="row sticky-scroll scroll">
								<div className="col">
									<div className="row mt-4">
										<div className="col-md-4">
											<div className="login-form ">
												<label>Email<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.subscription?.email}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Registration Date<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.convertDateStringToDate(this.state.subscription?.reg_date)}
													readOnly={true}
												/>
											</div>
											{/* <div className="login-form ">
												<label>Subcription<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.subscription?.topic}
													readOnly={true}
												/>
											</div> */}
											<div className="signup-check">
												<Checkbox
													size="small"
													style={{ color: "#012169" }}
													checked={this.state.subscription?.is_unsubscribe}
													onChange={() => {
														this.setState({ open: true });
													}}
												/>
												<label>Subscription</label>
											</div>
										</div>
										{/* <div className="col-md-12 ">
											<label className="expertise">Categories<span className="mandatory-star">*</span></label>
											<div className="signup-check">
												<div className="d-flex flex-wrap login-form"> */}
										{/* {this.state.subscription?.expert?.expertises?.map((value) => {
														return (
															<FormGroup>
																<FormControlLabel
																	control={
																		<Checkbox
																			style={{ color: "#012169" }}
																			size="small"
																			className="check"
																			value={value?.name}
																			onChange={this.handleChange.bind(this)}
																			checked={value?.selected ? value?.selected : true}
																			name={value?.name}
																		/>
																	}
																	label={
																		<span style={{ fontSize: "0.875rem" }}>
																			{(value?.name)?.join(" , ")}
																		</span>
																	}
																/>
															</FormGroup>
														);
													})} */}
										{/* <textarea
														cols="100"
														rows="5"
														value={this.state.subscription?.expert?.expertises?.map((value) => value?.name)?.join(" , ")}
														readOnly={true}
													/>
												</div>
											</div>
										</div> */}
									</div>
								</div>
							</div>
						)}
					</>
				)}
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
							{this.state.is_unsubscribe
								? " deactivate this subscription"
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
