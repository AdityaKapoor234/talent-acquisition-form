import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default class FeedbackDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			feedback: props?.feedback,
			mode: props?.mode,
		};
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.feedback !== nextProps.feedback ||
			prevState.mode !== nextProps.mode
		) {
			return {
				feedback: nextProps?.feedback,
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
								Feedback info
							</div>
						</div>
					</div>
				</div>
				{this.state.tab === 1 && (
					<>
						{this.state.mode === "view" && (
							<div className="row sticky-scroll scroll">
								<div className="col">
									<div className="row mt-4">
										<div className="col-md-4">
											<div className="login-form ">
												<label>Name<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.feedback?.name}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Email Address<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.feedback?.email}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Mobile No.<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.feedback?.phone_no}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Feedback Topic<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.feedback?.topic}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Feedback Experience<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.feedback?.finding_exp_fitcart}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Purpose of Visit<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.feedback?.visit_purpose}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Able to Find Everything You were looking for<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.feedback?.find_everything}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Recommendation for Fitcart<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.feedback?.recommend}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Category<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.feedback?.category}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Feedback<span className="mandatory-star">*</span></label>
                                                <textarea
                                                    cols="100"
                                                    rows="5"
													value={this.state.feedback?.feedback}
													readOnly={true}
												/>
											</div>
										</div>
										{/* <div className="col-md-12 ">
											<label className="expertise">Categories<span className="mandatory-star">*</span></label>
											<div className="signup-check">
												<div className="d-flex flex-wrap login-form"> */}
													{/* {this.state.feedback?.expert?.expertises?.map((value) => {
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
														value={this.state.feedback?.expert?.expertises?.map((value) => value?.name)?.join(" , ")}
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
			</div>
		);
	}
}
