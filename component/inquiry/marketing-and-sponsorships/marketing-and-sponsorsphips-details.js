import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

export default class MarketingAndSponsorshipsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            marketingAndSponsorships: props?.marketingAndSponsorships,
            mode: props?.mode,
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.marketingAndSponsorships !== nextProps.marketingAndSponsorships ||
            prevState.mode !== nextProps.mode
        ) {
            return {
                marketingAndSponsorships: nextProps?.marketingAndSponsorships,
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
                                Sales info
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
                                        <div className="col-md-5">
                                            <div className="login-form ">
                                                <label>Name<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.marketingAndSponsorships?.name}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Email<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.marketingAndSponsorships?.email}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Mobile No.<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.marketingAndSponsorships?.phone_no}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Date of Birth<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.convertDateStringToDate(this.state.marketingAndSponsorships?.dob)}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Address<span className="mandatory-star">*</span></label>
                                                <textarea
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state.marketingAndSponsorships?.address}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>State<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.marketingAndSponsorships?.state}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>City<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.marketingAndSponsorships?.city}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>PIN Code<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.marketingAndSponsorships?.pin_code}
                                                    readOnly={true}
                                                />
                                            </div>


                                            {/* <div className="login-form ">
                                                <label>Sponsorship Request<span className="mandatory-star">*</span></label>
                                                <input
                                                    type="text"
                                                    value={this.state.marketingAndSponsorships?.sponsorship_request}
                                                    readOnly={true}
                                                />
                                            </div> */}
                                            <div>
                                                <label className="expertise">Sponsorship Request<span className="mandatory-star">*</span></label>
                                                <div className="signup-check">
                                                    <div className="d-flex flex-wrap">
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        style={{ color: "#012169" }}
                                                                        size="small"
                                                                        className="check"
                                                                        value="Team"
                                                                        disabled={this.state.mode === "view" ? true : false}
                                                                        // onChange={handleChangeExpert.bind(this)}
                                                                        checked={this.state.marketingAndSponsorships?.sponsorship_request === "team" ? true : false}
                                                                        name="Team"
                                                                    />
                                                                }
                                                                label={
                                                                    <span style={{ fontSize: "0.875rem" }}>
                                                                        Team
                                                                    </span>
                                                                }
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        style={{ color: "#012169" }}
                                                                        size="small"
                                                                        className="check"
                                                                        value="Coach"
                                                                        disabled={this.state.mode === "view" ? true : false}
                                                                        // onChange={handleChangeExpert.bind(this)}
                                                                        checked={this.state.marketingAndSponsorships?.sponsorship_request === "coach" ? true : false}
                                                                        name="Coach"
                                                                    />
                                                                }
                                                                label={
                                                                    <span style={{ fontSize: "0.875rem" }}>
                                                                        Coach
                                                                    </span>
                                                                }
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        style={{ color: "#012169" }}
                                                                        size="small"
                                                                        className="check"
                                                                        value="Athlete"
                                                                        disabled={this.state.mode === "view" ? true : false}
                                                                        // onChange={handleChangeExpert.bind(this)}
                                                                        checked={this.state.marketingAndSponsorships?.sponsorship_request === "athlete" ? true : false}
                                                                        name="Athlete"
                                                                    />
                                                                }
                                                                label={
                                                                    <span style={{ fontSize: "0.875rem" }}>
                                                                        Athlete
                                                                    </span>
                                                                }
                                                            />
                                                        </FormGroup>
                                                        <FormGroup>
                                                            <FormControlLabel
                                                                control={
                                                                    <Checkbox
                                                                        style={{ color: "#012169" }}
                                                                        size="small"
                                                                        className="check"
                                                                        value="Academy"
                                                                        disabled={this.state.mode === "view" ? true : false}
                                                                        // onChange={handleChangeExpert.bind(this)}
                                                                        checked={this.state.marketingAndSponsorships?.sponsorship_request === "academy" ? true : false}
                                                                        name="Academy"
                                                                    />
                                                                }
                                                                label={
                                                                    <span style={{ fontSize: "0.875rem" }}>
                                                                        Academy
                                                                    </span>
                                                                }
                                                            />
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="login-form ">
                                                <label>Sporting Achievements / Attainments<span className="mandatory-star">*</span></label>
                                                <textarea
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state.marketingAndSponsorships?.achievements}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Short Term Goals<span className="mandatory-star">*</span></label>
                                                <textarea
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state.marketingAndSponsorships?.short_term_goals}
                                                    readOnly={true}
                                                />
                                            </div>
                                            <div className="login-form ">
                                                <label>Long Term Goals<span className="mandatory-star">*</span></label>
                                                <textarea
                                                    cols="100"
                                                    rows="5"
                                                    value={this.state.marketingAndSponsorships?.long_term_goals}
                                                    readOnly={true}
                                                />
                                            </div>
                                        </div>
                                        {/* <div className="col-md-12 ">
											<label className="expertise">Categories<span className="mandatory-star">*</span></label>
											<div className="signup-check">
												<div className="d-flex flex-wrap login-form"> */}
                                        {/* {this.state.marketingAndSponsorships?.expert?.expertises?.map((value) => {
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
														value={this.state.marketingAndSponsorships?.expert?.expertises?.map((value) => value?.name)?.join(" , ")}
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
