import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../common-component/photo";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default class CustomerSupportInformationDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			customerSupportInformation: props?.customerSupportInformation,
			mode: props?.mode,
		};
	}
	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.customerSupportInformation !== nextProps.customerSupportInformation ||
			prevState.mode !== nextProps.mode
		) {
			return {
				customerSupportInformation: nextProps?.customerSupportInformation,
				mode: nextProps?.mode,
				expertise: nextProps?.expertise,
				expert: nextProps?.expert,
				input: {
					name: nextProps?.customerSupportInformation?.name,
					email: nextProps?.customerSupportInformation?.email,
					avatar_url: nextProps?.customerSupportInformation?.avatar_url,
					is_active: nextProps?.customerSupportInformation?.is_active,
					experience: nextProps?.customerSupportInformation?.experience,
				},
			};
		}
		return null;
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
								customer Support Information info
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
													value={this.state.customerSupportInformation?.name}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Phone No<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.customerSupportInformation?.phone_no}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Email<span className="mandatory-star">*</span></label>
												<input
													type="text"
													value={this.state.customerSupportInformation?.email}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Purpose<span className="mandatory-star">*</span></label>
												<textarea
													cols="100"
													rows="5"
													value={this.state.customerSupportInformation?.email}
													readOnly={true}
												/>
											</div>
											<div className="login-form ">
												<label>Message<span className="mandatory-star">*</span></label>
												<textarea
													cols="100"
													rows="5"
													value={this.state.customerSupportInformation?.message}
													readOnly={true}
												/>
											</div>
										</div>
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
