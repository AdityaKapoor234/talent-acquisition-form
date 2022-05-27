import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default class GstDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            gst: props?.gst,
            gstHsnCode: props?.gstHsnCode,
            mode: props?.mode,
            createMode: props?.createMode,
            img_icon: "file-input",
            input: {
                hsn_code: props?.gst?.hsn_code,
                category_name: props?.gst?.category_name,
                cgst: props?.gst?.cgst,
                sgst: props?.gst?.sgst,
                igst: props?.gst?.igst,
                is_active: props?.gst?.is_active,
            },
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.gst !== nextProps.gst ||
            prevState.mode !== nextProps.mode ||
            prevState.gstHsnCode !== nextProps.gstHsnCode ||
            prevState.createMode !== nextProps.createMode
        ) {
            return {
                gst: nextProps?.gst,
                gstHsnCode: nextProps?.gstHsnCode,
                mode: nextProps?.mode,
                createMode: nextProps?.createMode,
                input: {
                    hsn_code: nextProps?.gst?.hsn_code,
                    category_name: nextProps?.gst?.category_name,
                    cgst: nextProps?.gst?.cgst,
                    sgst: nextProps?.gst?.sgst,
                    igst: nextProps?.gst?.igst,
                    is_active: nextProps?.gst?.is_active,
                },
            };
        }
        return null;
    }
    handleChange = (event) => {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({ input });
        this.props?.handle(input);
    };
    handleRadio = (event) => {
        let input = this.state.input;
        input[event.target.name] = event.target.value;
        this.setState({ input });
        this.props?.handle(input);
    };
    handleCheck = (event) => {
        let input = this.state.input;
        input[event.target.name] = event.target.checked;
        this.setState({ input });
        this.props?.handle(input);
    };


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
                                GST info
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
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>HSN/SAC Code<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.hsn_code}
                                                            name="hsn_code"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Category Name<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.category_name}
                                                            name="category_name"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>CGST Rate<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="number"
                                                            value={this.state.input?.cgst}
                                                            name="cgst"
                                                            onChange={this.handleChange.bind(this)}
                                                            min={0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>SGST Rate<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="number"
                                                            value={this.state.input?.sgst}
                                                            name="sgst"
                                                            onChange={this.handleChange.bind(this)}
                                                            min={0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>IGST Rate<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="number"
                                                            value={this.state.input?.igst}
                                                            name="igst"
                                                            onChange={this.handleChange.bind(this)}
                                                            min={0}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            {
                                                this.state.createMode === "create" ?
                                                    ""
                                                    :
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <div className="signup-check">
                                                                <Checkbox
                                                                    name="is_active"
                                                                    size="small"
                                                                    style={{ color: "#012169" }}
                                                                    checked={this.state.input.is_active}
                                                                    onChange={this.handleCheck.bind(this)}
                                                                />
                                                                <label>Active</label>
                                                            </div>
                                                        </div>
                                                    </div>

                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>

                            // <div className="row sticky-scroll scroll">
                            // 	<div className="col">
                            // 		<div className="row mt-4">
                            // 			<div className="col-md-4">
                            // 				<div className="login-form ">
                            // 					<label>Title<span className="mandatory-star">*</span></label>
                            // 					<input
                            // 						type="text"
                            // 						name="name"
                            // 						value={this.state.input.name}
                            // 						onChange={this.handleChange.bind(this)}
                            // 					/>
                            // 				</div>
                            // 				<div className="login-form ">
                            // 					<label>Category<span className="mandatory-star">*</span></label>
                            // 					<input
                            // 						type="text"
                            // 						name="email"
                            // 						value={this.state.input.email}
                            // 						onChange={this.handleChange.bind(this)}
                            // 					/>
                            // 				</div>
                            // 				<div className="login-form ">
                            // 					<label>Date<span className="mandatory-star">*</span></label>
                            // 					<input
                            // 						type="text"
                            // 						name="email"
                            // 						value={this.state.input.email}
                            // 						onChange={this.handleChange.bind(this)}
                            // 					/>
                            // 				</div>
                            // 				<div className="login-form ">
                            // 					<label>Sent To<span className="mandatory-star">*</span></label>
                            // 					<input
                            // 						type="text"
                            // 						name="email"
                            // 						value={this.state.input.email}
                            // 						onChange={this.handleChange.bind(this)}
                            // 					/>
                            // 				</div>
                            // 				<div className="mt-4">
                            // 					<Photo
                            // 						mode={this.state.mode}
                            // 						label={"Avatar"}
                            // 						accept=".jpg,.jpeg,.png"
                            // 						name="avatar_url"
                            // 						img={this.state.input.avatar_url}
                            // 						setUrl={this.handlePhotoUrl.bind(this)}
                            // 						value={this.state.img_icon}
                            // 						urlName="avatar"
                            // 					/>
                            // 				</div>
                            // 				<div className="login-form mt-3">
                            // 					<label>Description<span className="mandatory-star">*</span></label>
                            // 					<input
                            // 						type="text"
                            // 						name="experience"
                            // 						value={this.state.input.experience}
                            // 						onChange={this.handleChange.bind(this)}
                            // 					/>
                            // 				</div>
                            // 				<div className="signup-check">
                            // 					<Checkbox
                            // 						size="small"
                            // 						style={{ color: "#012169" }}
                            // 						checked={this.state.input.is_active ? this.state.input.is_active : false}
                            // 						name="is_active"
                            // 						onChange={this.handleCheck.bind(this)}
                            // 					/>
                            // 					<label>Active</label>
                            // 				</div>
                            // 			</div>
                            // 			<div className="col-md-12">
                            // 				<label className="expertise">Expertises<span className="mandatory-star">*</span></label>
                            // 				<div className="signup-check">
                            // 					<div className="d-flex flex-wrap">
                            // 						{this.state.expertise?.map((value) => {
                            // 							return (
                            // 								<FormGroup>
                            // 									<FormControlLabel
                            // 										control={
                            // 											<Checkbox
                            // 												style={{ color: "#012169" }}
                            // 												size="small"
                            // 												className="check"
                            // 												value={value.id}
                            // 												onChange={this.handleChangeExpert.bind(this)}
                            // 												checked={value?.selected ? value?.selected : false}
                            // 												name={value?.name}
                            // 											/>
                            // 										}
                            // 										label={
                            // 											<span style={{ fontSize: "0.875rem" }}>
                            // 												{value?.name}
                            // 											</span>
                            // 										}
                            // 									/>
                            // 								</FormGroup>
                            // 							);
                            // 						})}
                            // 					</div>
                            // 				</div>
                            // 			</div>
                            // 		</div>
                            // 	</div>
                            // </div>
                        )}
                    </>
                )}
            </div>
        );
    }
}
