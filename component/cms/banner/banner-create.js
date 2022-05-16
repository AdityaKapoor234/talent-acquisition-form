import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import ArticleEditor from "../../common-component/text-editer";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Photo from "../../common-component/photo";
import BannerApi from "../../../services/banner";

export default class BannerCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			banner: props?.banner,
			mode: props?.mode,
			img_sm: "file-input-sm",
			img_lg: "file-input-lg",
			img_icon: "file-input-icon",
			parentBanner: [],
			input: {
				name: "",
				sort_order: null,
				url: "",
				banner: "",
				banner_sm: '',
				is_active: null,
			},
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.banner !== nextProps.banner ||
			prevState.mode !== nextProps.mode
		) {
			return {
				banner: nextProps?.banner,
				mode: nextProps?.mode,
				input: {
					name: nextProps?.banner?.name,
					sort_order: nextProps?.banner?.sort_order,
					url: nextProps?.banner?.url,
					banner: nextProps?.banner?.banner,
					banner_sm: nextProps?.banner?.banner_sm,
					is_active: nextProps?.banner?.is_active,
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
	getBanner = () => {
		BannerApi.bannerViewDetails()
			.then((response) => {
				if (response.data.httpStatusCode === 200) {
					this.setState({ parentBanner: response.data.data.list });
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
	componentDidMount() {
		// this.getBanner()
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
								Banner info
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
										</div>
									</div>
									<div className="row mt-4">
										<div className="col-md-4">
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
										</div>
									</div>
									<div className="mt-4">
										<Photo
											mode={this.state.mode}
											label={"Full Banner image"}
											accept=".jpg,.jpeg,.png"
											name="banner"
											img={this.state.input.banner}
											setUrl={this.handlePhotoUrl.bind(this)}
											value={this.state.img_lg}
											urlName="full_banner"
										/>
									</div>
									<div className="mt-4">
										<Photo
											mode={this.state.mode}
											label={"Short Banner image "}
											accept=".jpg,.jpeg,.png"
											name="banner_sm"
											img={this.state.input.banner_sm}
											setUrl={this.handlePhotoUrl.bind(this)}
											value={this.state.img_sm}
											urlName="banner"
										/>
									</div>
									<div className="row mt-4">
										<div className="col-md-4">

											<div className="login-form ">
												<label>
													Display Order<span className="mandatory-star">*</span>
												</label>
												<input
													type="number"
													min="0"
													name="sort_order"
													value={this.state.input.sort_order}
													onChange={this.handleChange.bind(this)}
												/>
											</div>
										</div>
									</div>
									<div className="row mt-4">
										<div className="col-md-4">
											<div className="signup-check">
												<Checkbox
													size="small"
													style={{ color: "#012169" }}
													checked={this.state.input.is_active}
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
													readonly="readonly"
													value={this.state.input.name}
												/>
											</div>
										</div>
									</div>
									<div className="row mt-4">
										<div className="col-md-4">
											<div className="login-form ">
												<label>
													URL<span className="mandatory-star">*</span>
												</label>
												<input
													type="text"
													readonly="readonly"
													value={this.state.input.url}
												/>
											</div>
										</div>
									</div>
									<div className="mt-4">
										<Photo
											mode={this.state.mode}
											label={"Full Banner image "}
											accept=".jpg,.jpeg,.png"
											img={this.state.input.banner}
										/>
									</div>
									<div className="mt-4">
										<Photo
											mode={this.state.mode}
											label={"Short Banner image "}
											accept=".jpg,.jpeg,.png"
											img={this.state.input.banner_sm}
										/>
									</div>
									<div className="row mt-4">
										<div className="col-md-4">

											<div className="login-form ">
												<label>
													Display Order<span className="mandatory-star">*</span>
												</label>
												<input
													type="number"
													min="0"
													readonly="readonly"
													value={this.state.input.sort_order}
												/>
											</div>
										</div>
									</div>
									<div className="row mt-4">
										<div className="col-md-4">
											<div className="signup-check">
												<Checkbox
													size="small"
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
