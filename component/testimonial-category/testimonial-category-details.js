import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";

export default class TestimonialCategoryCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			mode: props?.mode,
			testimonialCategory: props?.testimonialCategory,
			img_sm: "file-input-sm",
			img_lg: "file-input-lg",
			img_icon: "file-input-icon",
			input: {
				name: props?.testimonialCategory?.name ? props.testimonialCategory?.name : "",
				is_active: props?.testimonialCategory?.is_active ? props?.testimonialCategory?.is_active : false,
			},
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.testimonialCategory !== nextProps.testimonialCategory ||
			prevState.mode !== nextProps.mode
		) {
			return {
				testimonialCategory: nextProps?.testimonialCategory,
				mode: nextProps?.mode,
				input: {
					name: nextProps?.testimonialCategory?.name ? nextProps.testimonialCategory?.name : "",
					is_active: nextProps?.testimonialCategory?.is_active ? nextProps?.testimonialCategory?.is_active : false,
				},
			};
		}
		return null;
	}
	handleChange = (event) => {
		let input = this.state.input;
		if (event.target.name === "sort_order") {
			input[event.target.name] = event.target.value.replace(/[^\d]/, "");
		} else {
			input[event.target.name] = event.target.value;
		}
		this.setState({ input });
		this.props?.handle(input);
	};
	handleCheck = (event) => {
		let input = this.state.input;
		input[event.target.name] = event.target.checked;
		this.setState({ input });
		this.props?.handle(input);
	};
	handlePhotoUrl = (name, url) => {
		let input = this.state.input;
		input[name] = url;
		this.setState({ input });
		this.props?.handle(input);
	};

	render() {
		return (
			<div data-component="edit-category">
				<div className="row ">
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
								Category Info
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
												<label>
													Name<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													name="name"
													value={this.state.input.name}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="signup-check mt-4">
												<Checkbox
													size="small"
													style={{ color: "#012169" }}
													checked={this.state.input?.is_active}
													name="is_active"
													onChange={this.handleCheck.bind(this)}
												/>
												<label>Active</label>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}
						{this.state.mode === "view" && (
							<div className="row sticky-scroll scroll">
								<div className="col">
									<div className="row mt-4">
										<div className="col-md-4">
											<div className="login-form ">
												<label>
													Name<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input?.name}
												/>
											</div>
											<div className="signup-check">
												<Checkbox
													size="small"
													disabled
													style={{ color: "#012169" }}
													checked={this.state.input.is_active}
												/>
												<label>Active</label>
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
