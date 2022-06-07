import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {PRODUCT_SERVICE} from "../../../utils/constant";

export default class DealsCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			mode: props?.mode,
			deals: props?.deals,
			img_sm: "file-input-sm",
			img_lg: "file-input-lg",
			img_icon: "file-input-icon",
			input: {
				label: props?.deals?.label ? props.deals?.label : "",
				deal_start_date: props?.deals?.deal_start_date ? props?.deals?.deal_start_date : "",
				deal_end_date: props?.deals?.deal_end_date ? props.deals?.deal_end_date : "",
				color_code: props?.deals?.color_code ? props?.deals?.color_code : "",
				url: props?.deals?.url ? props?.deals?.url : "",
				icon_url: props?.deals?.icon_url ? props?.deals?.icon_url : "",
				discount_image_url : props?.deals?.discount_image_url ? props?.deals?.discount_image_url :"",
				is_active: props?.deals?.is_active ? props?.deals?.is_active : false,
			},
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.deals !== nextProps.deals ||
			prevState.mode !== nextProps.mode
		) {
			return {
				deals: nextProps?.deals,
				mode: nextProps?.mode,
				input: {
					label: nextProps?.deals?.label ? nextProps.deals?.label : "",
					deal_start_date: nextProps?.deals?.deal_start_date ? nextProps?.deals?.deal_start_date : "",
					deal_end_date: nextProps?.deals?.deal_end_date ? nextProps.deals?.deal_end_date : "",
					color_code: nextProps?.deals?.color_code ? nextProps?.deals?.color_code : "",
					url: nextProps?.deals?.url ? nextProps?.deals?.url : "",
					icon_url: nextProps?.deals?.icon_url ? nextProps?.deals?.icon_url : "",
					discount_image_url:nextProps?.deals?.discount_image_url ? nextProps?.deals?.discount_image_url:"",
					is_active: nextProps?.deals?.is_active ? nextProps?.deals?.is_active : false,
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

	convertDateStringToDate = (dateStr) => {
        let months = [
            "01",
            "02",
            "03",
            "04",
            "05",
            "06",
            "07",
            "08",
            "09",
            "10",
            "11",
            "12",
        ];

        let date = new Date(dateStr);
        let str =
            // date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
			// new Date(dateStr).toISOString().split('T')[0];
			date.toLocaleDateString('en-CA');
        return str;
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
								Deals Info
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
													Label<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													name="label"
													value={this.state.input.label}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													Deal Start Date<span className="mandatory-star">*</span>
												</label>
												<input
													type="date"
													name="deal_start_date"
													value={this.convertDateStringToDate(this.state.input?.deal_start_date)}
													label="none"
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													Deal End Date<span className="mandatory-star">*</span>
												</label>
												<input
													type="date"
													name="deal_end_date"
													value={this.convertDateStringToDate(this.state.input?.deal_end_date)}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													Colour Code<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													name="color_code"
													value={this.state.input.color_code}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="login-form ">
												<label>
													URL<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													name="url"
													value={this.state.input.url}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Icon"}
													accept=".jpg,.jpeg,.png"
													name="icon_url"
													img={this.state.input?.icon_url}
													setUrl={this.handlePhotoUrl.bind(this)}
													value={this.state.img_icon}
													urlLink={`${PRODUCT_SERVICE}/manage/category/photo/icon`}
												/>
											</div>
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Discount Image"}
													accept=".jpg,.jpeg,.png"
													name="discount_image_url"
													img={this.state.input?.discount_image_url}
													setUrl={this.handlePhotoUrl.bind(this)}
													value={this.state.img_lg}
													urlLink={`${PRODUCT_SERVICE}/manage/category/photo/icon`}
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
													Label<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input?.label}
												/>
											</div>
											<div className="login-form ">
												<label>
												Deal Start Date<span className="mandatory-star">*</span>
												</label>
												<input
													type="date"
													readOnly={true}
													value={this.convertDateStringToDate(this.state.input?.deal_start_date)}
												/>
											</div>

											<div className="login-form ">
												<label>
												Deal End Date<span className="mandatory-star">*</span>
												</label>
												<input
													type="date"
													readOnly={true}
													value={this.convertDateStringToDate(this.state.input?.deal_end_date)}
												/>
											</div>
											<div className="login-form ">
												<label>
													Colour Code<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input?.color_code}
												/>
											</div>
											{/* <div className="login-form ">
												<label>
													URL<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													readOnly={true}
													value={this.state.input?.url}
												/>
											</div> */}
											<div>
												<Photo
													mode={this.state.mode}
													label={"Icon"}
													accept=".jpg,.jpeg,.png"
													img={this.state.input?.icon_url}
												/>
											</div>
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Discount Image"}
													accept=".jpg,.jpeg,.png"
													img={this.state.input?.discount_image_url}
												/>
											</div>
											<div>
                                                <a href={this.state.input?.url}><button className="custom-btn w-50 mb-4">URL PREVIEW<ArrowForwardIosIcon className='arrow-icon'/></button></a>
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
