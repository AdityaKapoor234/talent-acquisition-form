import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Photo from "../common-component/photo";
import {PRODUCT_SERVICE} from "../../utils/constant";

export default class TestimonialGalleryCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			testimonialGallery: props?.testimonialGallery,
			mode: props?.mode,
			img_sm: "file-input-sm",
			img_lg: "file-input-lg",
			img_icon: "file-input-icon",
			input: {
				name: props?.testimonialGallery?.name,
				img_url: props?.testimonialGallery?.img_url,
			},
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.testimonialGallery !== nextProps.testimonialGallery ||
			prevState.mode !== nextProps.mode
		) {
			return {
				testimonialGallery: nextProps?.testimonialGallery,
				mode: nextProps?.mode,
				input: {
					name: nextProps?.testimonialGallery?.name,
					img_url: nextProps?.testimonialGallery?.img_url,
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
								Gallery info
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
													value={this.state.input?.name}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<Photo
											mode={this.state.mode}
											label={"Image"}
											accept=".jpg,.jpeg,.png"
											name="img_url"
											img={this.state.input?.img_url}
											setUrl={this.handlePhotoUrl.bind(this)}
											value={this.state.img_icon}
											urlLink={`${PRODUCT_SERVICE}/manage/category/photo/icon`}
										/>
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
													readonly="readonly"
													value={this.state?.input?.name}
												/>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<Photo
											mode={this.state.mode}
											label={"Image "}
											accept=".jpg,.jpeg,.png"
											img={this.state?.input?.img_url}
										/>
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
