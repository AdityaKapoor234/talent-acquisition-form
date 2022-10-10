import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo-non-merge";
import { PRODUCT_SERVICE } from "../../../utils/constant";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default class SellerCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			mode: props?.mode,
			seller: props?.seller,
			img_sm: "file-input-sm",
			img_lg: "file-input-lg",
			img_icon: "file-input-icon",
			createMode: props?.createMode ? props.createMode : "",
			input: {
				name: props?.seller?.name ? props.seller?.name : "",
				status: props?.seller?.status ? props.seller?.status : "",
				email: props?.seller?.email ? props.seller?.email : "",
				phone_number: props?.seller?.phone_number ? props.seller?.phone_number : "",
				website_url: props?.seller?.website_url ? props.seller?.website_url : "",
				logo: props?.seller?.logo ? props.seller?.logo : "",
				gst: props?.seller?.gst ? props.seller?.gst : "",
				pan_number: props?.seller?.pan_number ? props.seller?.pan_number : "",
				sort_order: props?.seller?.sort_order ? props.seller?.sort_order : "",
			},
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.seller !== nextProps.seller ||
			prevState.mode !== nextProps.mode
		) {
			return {
				seller: nextProps?.seller,
				mode: nextProps?.mode,
				createMode: nextProps?.createMode ? nextProps.createMode : "",
				input: {
					name: nextProps?.seller?.name ? nextProps.seller?.name : "",
					status: nextProps?.seller?.status ? nextProps.seller?.status : "",
					email: nextProps?.seller?.email ? nextProps.seller?.email : "",
					phone_number: nextProps?.seller?.phone_number ? nextProps.seller?.phone_number : "",
					website_url: nextProps?.seller?.website_url ? nextProps.seller?.website_url : "",
					logo: nextProps?.seller?.logo ? nextProps.seller?.logo : "",
					gst: nextProps?.seller?.gst ? nextProps.seller?.gst : "",
					pan_number: nextProps?.seller?.pan_number ? nextProps.seller?.pan_number : "",
					sort_order: nextProps?.seller?.sort_order ? nextProps.seller?.sort_order : "",
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
								Seller Info
							</div>
							{
								this.state.createMode !== "create" &&
								<div
									className={
										this.state.tab === 2 ? `sub-tab active-tab` : "sub-tab"
									}
									onClick={() => {
										this.setState({ tab: 2 });
									}}
								>
									Warehouse Info
								</div>
							}
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
													maxLength="200"
													value={this.state.input?.name}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													Email<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													name="email"
													maxLength="200"
													value={this.state.input?.email}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													Phone Number<span className="mandatory-star">*</span>
												</label>
												<input
													type="number"
													min="0"
													name="phone_number"
													value={this.state.input?.phone_number}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													PAN Number<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													name="pan_number"
													maxLength="200"
													value={this.state.input?.pan_number}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													GST<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													name="gst"
													maxLength="200"
													value={this.state.input?.gst}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form mt-3 sort">
												<label>
													Status<span className="mandatory-star">*</span>
												</label>
												<div className="sort-by-select-wrapper">
													<Select
														disableUnderline
														variant="standard"
														disabled={this.state.mode === "view" ? true : false}
														autoWidth={true}
														IconComponent={ExpandMoreIcon}
														name="status"
														onChange={this.handleChange.bind(this)}
														className="sort-by-select"
														value={this.state.input?.status ? this.state.input?.status : "select"}
													>
														<MenuItem
															value="select"
															disabled
															className="field_toggle_checked"
														>
															Select Status{" "}
														</MenuItem>
														<MenuItem value="active">Active</MenuItem>
														<MenuItem value="disable">Disable</MenuItem>
														<MenuItem value="audit">Audit</MenuItem>
													</Select>
												</div>
											</div>
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Logo"}
													accept=".jpg,.jpeg,.png"
													name="logo"
													size="900x300"
													img={this.state.input?.logo}
													setUrl={this.handlePhotoUrl.bind(this)}
													value={this.state.img_icon}
													urlLink={`${PRODUCT_SERVICE}/manage/category/photo/banner`}
												/>
											</div>
											<div className="login-form mt-4">
												<label>
													Website URL<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													name="website_url"
													maxLength="200"
													value={this.state.input?.website_url}
													onChange={this.handleChange.bind(this)}
												/>
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
													Email<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input?.email}
												/>
											</div>
											<div className="login-form ">
												<label>
													Phone Number<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input?.phone_number}
												/>
											</div>
											<div className="login-form ">
												<label>
													PAN Number<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input?.pan_number}
												/>
											</div>
											<div className="login-form ">
												<label>
													GST<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input?.gst}
												/>
											</div>
											<div className="login-form mt-3 sort">
												<label>
													Status<span className="mandatory-star">*</span>
												</label>
												<div className="sort-by-select-wrapper">
													<Select
														disableUnderline
														variant="standard"
														disabled={this.state.mode === "view" ? true : false}
														autoWidth={true}
														IconComponent={ExpandMoreIcon}
														name="status"
														// onChange={this.handleChange.bind(this)}
														className="sort-by-select"
														value={this.state.input?.status ? this.state.input?.status : "select"}
													>
														<MenuItem
															value="select"
															disabled
															className="field_toggle_checked"
														>
															Select Status{" "}
														</MenuItem>
														<MenuItem value="active">Active</MenuItem>
														<MenuItem value="disable">Disable</MenuItem>
														<MenuItem value="audit">Audit</MenuItem>
													</Select>
												</div>
											</div>
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Logo"}
													accept=".jpg,.jpeg,.png"
													img={this.state.input?.logo}
												/>
											</div>
											{
												this.state.input?.website_url &&
												<div>
													<a href={this.state.input?.website_url}><button className="custom-btn w-50 mb-4">URL PREVIEW<ArrowForwardIosIcon className='arrow-icon' /></button></a>
												</div>
											}
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
										</div>
									</div>
								</div>
							</div>
						)}
					</>
				)}

				{this.state.tab === 2 && (
					<>
					</>
				)}

			</div>
		);
	}
}
