import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo";


export default class SportsCreate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tab: 1,
			mode: props?.mode,
			sports: props?.sports,
			img_sm: "file-input-sm",
			img_lg: "file-input-lg",
			img_icon: "file-input-icon",
			input: {
				name: props?.sports?.name ? props.sports?.name : "",
				description: props?.sports?.description ? props?.sports?.description : "",
				sort_order: props?.sports?.sort_order ? props.sports?.sort_order : "",
				icon_url: props?.sports?.icon_url ? props?.sports?.icon_url : "",
				banner_url: props?.sports?.banner_url ? props?.sports?.banner_url : "",
				banner_url_sm: props?.sports?.banner_url_sm ? props?.sports?.banner_url_sm : "",
				is_active: props?.sports?.is_active ? props?.sports?.is_active : false,
				show_in_main_menu: props?.sports?.show_in_main_menu ? props?.sports?.show_in_main_menu : false,
			},
		};
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		if (
			prevState.sports !== nextProps.sports ||
			prevState.mode !== nextProps.mode
		) {
			return {
				sports: nextProps?.sports,
				mode: nextProps?.mode,
				input: {
					name: nextProps?.sports?.name ? nextProps.sports?.name : "",
					description: nextProps?.sports?.description ? nextProps?.sports?.description : "",
					sort_order: nextProps?.sports?.sort_order ? nextProps.sports?.sort_order : "",
					icon_url: nextProps?.sports?.icon_url ? nextProps?.sports?.icon_url : "",
					banner_url: nextProps?.sports?.banner_url ? nextProps?.sports?.banner_url : "",
					banner_url_sm: nextProps?.sports?.banner_url_sm ? nextProps?.sports?.banner_url_sm : "",
					is_active: nextProps?.sports?.is_active ? nextProps?.sports?.is_active : false,
					show_in_main_menu: nextProps?.sports?.show_in_main_menu ? nextProps?.sports?.show_in_main_menu : false,
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
								Sports Info
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
											<div className="login-form ">
												<label>
													Description<span className="mandatory-star">*</span>
												</label>
												<textarea
													name="description"
													cols="100"
													rows="5"
													value={this.state.input?.description}
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
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Icon"}
													accept=".jpg,.jpeg,.png"
													name="icon_url"
													img={this.state.input?.icon_url}
													setUrl={this.handlePhotoUrl.bind(this)}
													value={this.state.img_icon}
													urlName="icon"
												/>
											</div>
											{console.log(this.state.sports,"sports")}
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Full Banner Image"}
													accept=".jpg,.jpeg,.png"
													name="banner_url"
													img={this.state.input?.banner_url}
													setUrl={this.handlePhotoUrl.bind(this)}
													value={this.state.img_lg}
													urlName="icon"
												/>
											</div>
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Short Banner Image"}
													accept=".jpg,.jpeg,.png"
													name="banner_url_sm"
													img={this.state.input?.banner_url_sm}
													setUrl={this.handlePhotoUrl.bind(this)}
													value={this.state.img_sm}
													urlName="icon"
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
											<div className="signup-check">
												<Checkbox
													size="small"
													style={{ color: "#012169" }}
													checked={this.state.input?.show_in_main_menu}
													name="show_in_main_menu"
													onChange={this.handleCheck.bind(this)}
												/>
												<label>Visible</label>
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
													Description<span className="mandatory-star">*</span>
												</label>
												<textarea
													name="description"
													cols="100"
													rows="5"
													readOnly={true}
													value={this.state.input?.description}
												/>
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
											<div className="mt-4">
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
													label={"Full Banner Image"}
													accept=".jpg,.jpeg,.png"
													img={this.state.input?.banner_url}
												/>
											</div>
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Short Banner Image"}
													accept=".jpg,.jpeg,.png"
													img={this.state.input?.banner_url_sm}
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
											<div className="signup-check">
												<Checkbox
													size="small"
													disabled
													style={{ color: "#012169" }}
													checked={this.state.input.show_in_main_menu}
												/>
												<label>Visible</label>
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
