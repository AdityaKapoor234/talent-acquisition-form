import React, { Component } from "react";
import { toast } from "react-toastify";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo-non-merge";
import { PRODUCT_SERVICE } from "../../../utils/constant";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomerApi from "../../../services/customer";
import WarehouseForm from "./tabbed-components/warehouse-form";
import WarehouseView from "./tabbed-components/warehouse-view";

export default class SellerCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			mode: props?.mode,
			seller: props?.seller,
			sellerAddress: props?.sellerAddress,
			img_sm: "file-input-sm",
			img_lg: "file-input-lg",
			img_icon: "file-input-icon",
			createMode: props?.createMode ? props.createMode : "",
			stateList: [],
			add_warehouse: false,
			input: {
				name: props?.seller?.name ? props.seller?.name : "",
				status: props?.seller?.status ? props.seller?.status : "",
				email: props?.seller?.email ? props.seller?.email : "",
				phone_number: props?.seller?.phone_number ? props.seller?.phone_number : "",
				website_url: props?.seller?.website_url ? props.seller?.website_url : "",
				logo: props?.seller?.logo ? props.seller?.logo : "",
				gst: props?.seller?.gst ? props.seller?.gst : "",
				pan_number: props?.seller?.pan_number ? props.seller?.pan_number : "",
				// sort_order: props?.seller?.sort_order ? props.seller?.sort_order : "",
				pin_code: props?.seller?.pin_code ? props.seller?.pin_code : "",
				city: props?.seller?.city ? props.seller?.city : "",
				state: props?.seller?.state ? props.seller?.state : "",
				address: props?.seller?.address ? props.seller?.address : "",
			},
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.seller !== nextProps.seller ||
			prevState.sellerAddress !== nextProps?.sellerAddress ||
			prevState.mode !== nextProps.mode
		) {
			return {
				seller: nextProps?.seller,
				sellerAddress: nextProps?.sellerAddress,
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
					// sort_order: nextProps?.seller?.sort_order ? nextProps.seller?.sort_order : "",
					pin_code: nextProps?.seller?.pin_code ? nextProps.seller?.pin_code : "",
					city: nextProps?.seller?.city ? nextProps.seller?.city : "",
					state: nextProps?.seller?.state ? nextProps.seller?.state : "",
					address: nextProps?.seller?.address ? nextProps.seller?.address : "",
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

	getState = () => {
		CustomerApi.getState()
			.then((response) => {
				if (response?.data?.httpStatusCode === 200) {
					this.setState({ stateList: response?.data.data?.list });
				}
			})
			.catch((error) => {
				toast.error(
					error?.response &&
						error?.response?.data &&
						error?.response?.data?.message
						? error.response.data.message
						: "Unable to process your request, please try after sometime.",
					{
						autoClose: 5000,
					}
				);
			});
	};

	closeAddress = () => {
		this.setState({ add_warehouse: false });
		window.scrollTo(0, 0);
	};

	componentDidMount() {
		this.getState();
	}

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
													PIN Code
												</label>
												<input
													type="number"
													name="pin_code"
													maxLength="200"
													value={this.state.input?.pin_code}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													City
												</label>
												<input
													type="text"
													name="city"
													maxLength="200"
													value={this.state.input?.city}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form sort">
												<label>
													State
												</label>
												<div className="sort-by-select-wrapper">
													<Select
														disableUnderline
														variant="standard"
														disabled={this.state.mode === "view" ? true : false}
														autoWidth={true}
														IconComponent={ExpandMoreIcon}
														name="state"
														onChange={this.handleChange.bind(this)}
														className="sort-by-select"
														value={this.state.input?.state ? this.state.input?.state : "select"}
													>
														<MenuItem
															value="select"
															disabled
															className="field_toggle_checked"
														>
															Select State{" "}
														</MenuItem>
														{this.state.stateList?.map(val => {
															return (
																<MenuItem value={val?.name}>{val?.name}</MenuItem>
															)
														})}
													</Select>
												</div>
											</div>
											<div className="login-form ">
												<label>
													Address
												</label>
												<textarea
													name="address"
													cols="100"
													rows="5"
													value={this.state.input?.address}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													PAN Number
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
													GST
												</label>
												<input
													type="text"
													name="gst"
													maxLength="200"
													value={this.state.input?.gst}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form sort">
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
											<div className="mt-0">
												<Photo
													mode={this.state.mode}
													label={"Logo"}
													accept=".jpg,.jpeg,.png"
													name="logo"
													size="900x300"
													img={this.state.input?.logo}
													notMandatory={true}
													setUrl={this.handlePhotoUrl.bind(this)}
													value={this.state.img_icon}
													urlLink={`${PRODUCT_SERVICE}/manage/category/photo/banner`}
												/>
											</div>
											<div className="login-form mt-4">
												<label>
													Website URL
												</label>
												<input
													type="text"
													name="website_url"
													maxLength="200"
													value={this.state.input?.website_url}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											{/* <div className="login-form ">
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
											</div> */}
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
													PIN Code
												</label>
												<input
													type="number"
													readOnly={true}
													value={this.state.input?.pin_code}
												/>
											</div>
											<div className="login-form ">
												<label>
													City
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input?.city}
												/>
											</div>
											<div className="login-form sort">
												<label>
													State
												</label>
												<div className="sort-by-select-wrapper">
													<Select
														disableUnderline
														variant="standard"
														disabled={this.state.mode === "view" ? true : false}
														autoWidth={true}
														IconComponent={ExpandMoreIcon}
														name="state"
														// onChange={this.handleChange.bind(this)}
														className="sort-by-select"
														value={this.state.input?.state ? this.state.input?.state : "select"}
													>
														<MenuItem
															value="select"
															disabled
															className="field_toggle_checked"
														>
															Select State{" "}
														</MenuItem>
														{this.state.stateList?.map(val => {
															return (
																<MenuItem value={val?.name}>{val?.name}</MenuItem>
															)
														})}
													</Select>
												</div>
											</div>
											<div className="login-form ">
												<label>
													Address
												</label>
												<textarea
													cols="100"
													rows="5"
													readOnly={true}
													value={this.state.input?.address}
												/>
											</div>
											<div className="login-form ">
												<label>
													PAN Number
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input?.pan_number}
												/>
											</div>
											<div className="login-form ">
												<label>
													GST
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input?.gst}
												/>
											</div>
											<div className="login-form sort">
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
											<div className="mt-0">
												<Photo
													mode={this.state.mode}
													label={"Logo"}
													accept=".jpg,.jpeg,.png"
													img={this.state.input?.logo}
													notMandatory={true}
												/>
											</div>
											{
												this.state.input?.website_url &&
												<div>
													<a href={this.state.input?.website_url}><button className="custom-btn w-50 mb-4">URL PREVIEW<ArrowForwardIosIcon className='arrow-icon' /></button></a>
												</div>
											}
											{/* <div className="login-form ">
												<label>
													Display Order<span className="mandatory-star">*</span>
												</label>
												<input
													type="number"
													min="0"
													readOnly={true}
													value={this.state.input?.sort_order}
												/>
											</div> */}
										</div>
									</div>
								</div>
							</div>
						)}
					</>
				)}

				{this.state.tab === 2 && (
					<>
						<div data-component="address-view">
							<div className="row mt-4">

								{(this.state.mode === "edit") && (
									<div data-component="account-setting" className="mb-4">

										{this.state.add_warehouse === true ? (
											<div id="account">
												<span className="add-new-address">Add new warehouse</span>
												<div className="bg-white">
													<WarehouseForm
														onClose={() => this.closeAddress()}
														mode="create"
														id={this.state.seller?.id}
													/>
												</div>

											</div>
										) : (
											<a href="#account">
												<div
													className="custom-btn add-address my-0"
													onClick={() => {
														this.setState({ add_warehouse: true });
													}}
												>
													<span>Add new address </span>
												</div>
											</a>
										)}



									</div>
								)}

								{this.state.sellerAddress?.map((p) => {
									return (
										<>
											<div className="col-xl-4 col-lg-6 col-sm-6 mb-3">
												<WarehouseView
													warehouseDetails={p}
													mode={this.state.mode}
													id={p?.id}
												/>
											</div>
										</>
									);
								})}
							</div>
						</div>
					</>
				)}

			</div>
		);
	}
}
