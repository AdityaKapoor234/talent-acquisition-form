import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Photo from "../common-component/photo"
import { PRODUCT_SERVICE } from "../../utils/constant";

export default class TestimonialCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			mode: props?.mode,
			createMode: props?.createMode,
			testimonial: props?.testimonial,
			testimonialCategoryDropdown: props?.testimonialCategoryDropdown,
			img_sm: "file-input-sm",
			img_lg: "file-input-lg",
			img_icon: "file-input-icon",
			input: {
				name: props?.testimonial?.name ? props.testimonial?.name : "",
				designation: props?.testimonial?.designation ? props?.testimonial?.designation : "",
				content: props?.testimonial?.content ? props.testimonial?.content : "",
				image_url: props?.testimonial?.image_url ? props.testimonial?.image_url : "",
				video_url: props?.testimonial?.video_url ? props.testimonial?.video_url : "",
				category_id: props?.testimonial?.category_id ? props.testimonial?.category_id : "select",
				sort_order: props?.testimonial?.sort_order ? props.testimonial?.sort_order : "",
				is_active: props?.testimonial?.is_active ? props?.testimonial?.is_active : false,
			},
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.testimonial !== nextProps.testimonial ||
			prevState.testimonialCategoryDropdown !== nextProps.testimonialCategoryDropdown ||
			prevState.mode !== nextProps.mode
		) {
			return {
				testimonial: nextProps?.testimonial,
				testimonialCategoryDropdown: nextProps?.testimonialCategoryDropdown,
				mode: nextProps?.mode,
				createMode: nextProps?.createMode,
				input: {
					name: nextProps?.testimonial?.name ? nextProps.testimonial?.name : "",
					designation: nextProps?.testimonial?.designation ? nextProps.testimonial?.designation : "",
					content: nextProps?.testimonial?.content ? nextProps.testimonial?.content : "",
					image_url: nextProps?.testimonial?.image_url ? nextProps.testimonial?.image_url : "",
					video_url: nextProps?.testimonial?.video_url ? nextProps.testimonial?.video_url : "",
					category_id: nextProps?.testimonial?.category_id ? nextProps.testimonial?.category_id : "select",
					sort_order: nextProps?.testimonial?.sort_order ? nextProps.testimonial?.sort_order : null,
					is_active: nextProps?.testimonial?.is_active ? nextProps?.testimonial?.is_active : false,
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
								Testimonial Info
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
													maxLength="100"
													name="name"
													value={this.state.input.name}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													Designation<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													name="designation"
													value={this.state.input.designation}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													Content<span className="mandatory-star">*</span>
												</label>
												<textarea
													name="content"
													cols="100"
													rows="5"
													value={this.state.input?.content}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<Photo
													mode={this.state.mode}
													label={"Icon"}
													accept=".jpg,.jpeg,.png"
													name="image_url"
													img={this.state.input?.image_url}
													setUrl={this.handlePhotoUrl.bind(this)}
													value={this.state.img_icon}
													urlLink={`${PRODUCT_SERVICE}/manage/category/photo/icon`}
												/>
											</div>

											<div className="login-form mt-4">
												<label>
													Video Embedded URL
												</label>
												<input
													type="text"
													name="video_url"
													value={this.state.input.video_url}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form sort">
												<label>
													Category<span className="mandatory-star">*</span>
												</label>
												<div className="sort-by-select-wrapper">
													<Select
														disableUnderline
														variant="standard"
														disabled={this.state.mode === "view" ? true : false}
														autoWidth={true}
														IconComponent={ExpandMoreIcon}
														name="category_id"
														onChange={this.handleChange.bind(this)}
														className="sort-by-select"
														value={this.state.input.category_id}
													>
														<MenuItem
															value="select"
															disabled
															className="field_toggle_checked"
														>
															Select Category{" "}
														</MenuItem>
														{
															this.state.testimonialCategoryDropdown.map(elem => {
																return (
																	<MenuItem value={elem?.id}>{elem?.name}</MenuItem>
																)
															})
														}
													</Select>
												</div>
											</div>
											<div className="login-form ">
												<label>
													Display Order<span className="mandatory-star">*</span>
												</label>
												<input
													type="number"
													min="0"
													name="sort_order"
													value={this.state.input?.sort_order}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											{
												this.state.createMode === "create" ?
													""
													:
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
											}

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
											<div className="login-form ">
												<label>
													Designation<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input.designation}
												/>
											</div>
											<div className="login-form ">
												<label>
													Content<span className="mandatory-star">*</span>
												</label>
												<textarea
													readOnly={true}
													cols="100"
													rows="5"
													value={this.state.input?.content}
												/>
											</div>
											<div className="login-form">
												<Photo
													mode={this.state.mode}
													label={"Image"}
													accept=".jpg,.jpeg,.png"
													img={this.state.input?.image_url}
												/>
											</div>

											<div className="login-form ">
												<label>
													Video Embedded URL
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input.video_url}
												/>
											</div>
											<div className="login-form sort">
												<label>
													Category<span className="mandatory-star">*</span>
												</label>
												<div className="sort-by-select-wrapper">
													<Select
														disableUnderline
														variant="standard"
														disabled={this.state.mode === "view" ? true : false}
														autoWidth={true}
														IconComponent={ExpandMoreIcon}
														name="category_id"
														onChange={this.handleChange.bind(this)}
														className="sort-by-select"
														value={this.state.input.category_id}
													>
														<MenuItem
															value="select"
															disabled
															className="field_toggle_checked"
														>
															Select Category{" "}
														</MenuItem>
														{
															this.state.testimonialCategoryDropdown.map(elem => {
																return (
																	<MenuItem value={elem?.id}>{elem?.name}</MenuItem>
																)
															})
														}

														<MenuItem value="1 Month">1 Month</MenuItem>
														<MenuItem value="2 Months">2 Months</MenuItem>
														<MenuItem value="3 Months">3 Months</MenuItem>
														<MenuItem value="4 Months">4 Months</MenuItem>
														<MenuItem value="5 Months">5 Months</MenuItem>
														<MenuItem value="6 Months">6 Months</MenuItem>
														<MenuItem value="7 Months">7 Months</MenuItem>
													</Select>
												</div>
											</div>
											<div className="login-form ">
												<label>
													Display Order<span className="mandatory-star">*</span>
												</label>
												<input
													type="number"
													min="0"
													readOnly={true}
													value={this.state.input?.sort_order}
												/>
											</div>
											<div className="signup-check mt-4">
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
