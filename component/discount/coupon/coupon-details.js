import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default class CouponDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 1,
            coupon: props?.coupon,
            userType: props?.userType,
            mode: props?.mode,
            createMode: props?.createMode,
            img_icon: "file-input",
            input: {
                name: props?.coupon?.name,
                code: props?.coupon?.code,
                description: props?.coupon?.description,
                start_date: props?.coupon?.start_date,
                end_date: props?.coupon?.end_date,
                discount_type: props?.coupon?.discount_type,
                min_cart_amount: props?.coupon?.min_cart_amount,
                max_cart_amount: props?.coupon?.max_cart_amount,
                uses_per_coupon: props?.coupon?.uses_per_coupon,
                uses_per_customer: props?.coupon?.uses_per_customer,
                coupon_value: props?.coupon?.coupon_value,
                by_amount_or_percent: props?.coupon?.by_amount_or_percent,
                customer_type: props?.coupon?.customer_type,
                is_active: props?.coupon?.is_active,
            },
        };
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
            prevState.coupon !== nextProps.coupon ||
            prevState.mode !== nextProps.mode ||
            prevState.userType !== nextProps.userType ||
            prevState.createMode !== nextProps.createMode
        ) {
            return {
                coupon: nextProps?.coupon,
                userType: nextProps?.userType,
                mode: nextProps?.mode,
                createMode: nextProps?.createMode,
                input: {
                    name: nextProps?.coupon?.name,
                    code: nextProps?.coupon?.code,
                    description: nextProps?.coupon?.description,
                    start_date: nextProps?.coupon?.start_date,
                    end_date: nextProps?.coupon?.end_date,
                    discount_type: nextProps?.coupon?.discount_type,
                    min_cart_amount: nextProps?.coupon?.min_cart_amount,
                    max_cart_amount: nextProps?.coupon?.max_cart_amount,
                    uses_per_coupon: nextProps?.coupon?.uses_per_coupon,
                    uses_per_customer: nextProps?.coupon?.uses_per_customer,
                    coupon_value: nextProps?.coupon?.coupon_value,
                    by_amount_or_percent: nextProps?.coupon?.by_amount_or_percent,
                    customer_type: nextProps?.coupon?.customer_type,
                    is_active: nextProps?.coupon?.is_active,
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
                                Coupon info
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
                                                        <label>Name<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.name}
                                                            name="name"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Code<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.code}
                                                            name="code"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Description<span className="mandatory-star">*</span></label>
                                                        <textarea
                                                            cols="100"
                                                            rows="5"
                                                            value={this.state.input?.description}
                                                            name="description"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Start Date<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="date"
                                                            value={this.convertDateStringToDate(this.state.input?.start_date)}
                                                            name="start_date"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>End Date<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="date"
                                                            value={this.convertDateStringToDate(this.state.input?.end_date)}
                                                            name="end_date"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="login-form sort">
                                                <label>Discount Type<span className="mandatory-star">*</span></label>
                                                <div className="sort-by-select-wrapper">
                                                    <Select
                                                        disableUnderline
                                                        variant="standard"
                                                        disabled={this.state.mode === "view" ? true : false}
                                                        autoWidth={true}
                                                        IconComponent={ExpandMoreIcon}
                                                        name="discount_type"
                                                        onChange={this.handleChange.bind(this)}
                                                        className="sort-by-select"
                                                        value={this.state.input?.discount_type ? this.state.input?.discount_type : "select"}
                                                    >
                                                        <MenuItem
                                                            value="select"
                                                            disabled
                                                            className="field_toggle_checked"
                                                        >
                                                            Select Discount Type{" "}
                                                        </MenuItem>
                                                        <MenuItem value="apply on cart">Apply to Cart</MenuItem>
                                                        <MenuItem value="apply on product">Apply to Product</MenuItem>
                                                        <MenuItem value="apply on category">Apply to Category</MenuItem>
                                                    </Select>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Minimum Cart Amount<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.min_cart_amount}
                                                            name="min_cart_amount"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Maximum Cart Amount<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.max_cart_amount}
                                                            name="max_cart_amount"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Uses per Coupon<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.uses_per_coupon}
                                                            name="uses_per_coupon"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Uses per Customer<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.uses_per_customer}
                                                            name="uses_per_customer"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row  align-items-end">
                                                <div className="col-md-4">
                                                    <div className="login-form">
                                                        <label>Coupon Value<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.coupon_value}
                                                            name="coupon_value"
                                                            onChange={this.handleChange.bind(this)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="login-form">
                                                        <div className="d-flex">
                                                            <RadioGroup
                                                                row
                                                                disabled={this.state.mode === "view" ? true : false}
                                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                                name="by_amount_or_percent"
                                                                value={this.state.input?.by_amount_or_percent}
                                                                onChange={this.handleRadio}
                                                            >
                                                                <div className="d-flex">
                                                                    <FormControlLabel value="percentage" control={<Radio disabled={this.state.mode === "view" ? true : false} size={"small"} style={{ color: "#012169" }} />} label="By Percentage" />
                                                                    <FormControlLabel value="amount" control={<Radio disabled={this.state.mode === "view" ? true : false} size={"small"} style={{ color: "#012169" }} />} label="By Fixed Ammount (₹)" />
                                                                </div>
                                                            </RadioGroup>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>


                                            <div className="col-md-12 ">
                                                <label className="expertise">Customer Type<span className="mandatory-star">*</span></label>
                                                <div className="signup-check">
                                                    <div className="d-flex flex-wrap login-form">
                                                        {/* {this.state.userType?.map((value) => {
                                                            return (
                                                                <FormGroup>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                style={{ color: "#012169" }}
                                                                                size="small"
                                                                                className="check"
                                                                                value={value?.user_type}
                                                                                // disabled
                                                                                // onChange={this.handleChange.bind(this)}
                                                                                checked={this.state.input?.customer_type?.toLowerCase() === value?.user_type?.toLowerCase() ? true : false}
                                                                                name={value?.user_type}
                                                                            />
                                                                        }
                                                                        label={
                                                                            <span style={{ fontSize: "0.875rem" }}>
                                                                                {(value?.user_type)}
                                                                            </span>
                                                                        }
                                                                    />
                                                                </FormGroup>
                                                            );
                                                        })} */}
                                                        <RadioGroup
                                                            row
                                                            disabled={this.state.mode === "view" ? true : false}
                                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                                            name="customer_type"
                                                            value={this.state.input?.customer_type?.toLowerCase()}
                                                            onChange={this.handleRadio}
                                                        >
                                                            <div className="d-flex w-100 radioRow">
                                                                {this.state.userType?.map((value) => {
                                                                    return (
                                                                        <span className="d-flex">
                                                                            <FormControlLabel value={value?.user_type?.toLowerCase()} control={<Radio disabled={this.state.mode === "view" ? true : false} size={"small"} style={{ color: "#012169" }} />} label={value?.user_type} />
                                                                        </span>
                                                                    )
                                                                })}
                                                            </div>
                                                        </RadioGroup>

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
                        {this.state.mode === "view" && (
                            <div className="row sticky-scroll scroll">
                                <div className="col">
                                    <div className="row mt-4">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Name<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.name}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Code<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.code}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Description<span className="mandatory-star">*</span></label>
                                                        <textarea
                                                            name="description"
                                                            cols="100"
                                                            rows="5"
                                                            value={this.state.input?.description}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Start Date<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="date"
                                                            value={this.convertDateStringToDate(this.state.input?.start_date)}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>End Date<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="date"
                                                            value={this.convertDateStringToDate(this.state.input?.end_date)}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Discount Type<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.discount_type}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Minimum Cart Amount<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.min_cart_amount}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Maximum Cart Amount<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.max_cart_amount}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Uses per Coupon<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.uses_per_coupon}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="login-form ">
                                                        <label>Uses per Customer<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.uses_per_customer}
                                                            readOnly={true}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="row  align-items-end">
                                                <div className="col-md-4">
                                                    <div className="login-form">
                                                        <label>Coupon Value<span className="mandatory-star">*</span></label>
                                                        <input
                                                            type="text"
                                                            value={this.state.input?.coupon_value}
                                                            readOnly={true}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="login-form">
                                                        <div className="d-flex">
                                                            <RadioGroup
                                                                row
                                                                disabled={this.state.mode === "view" ? true : false}
                                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                                name="by_amount_or_percent"
                                                                value={this.state.input?.by_amount_or_percent}
                                                            // onChange={this.handleRadio}
                                                            >
                                                                <div className="d-flex">
                                                                    <FormControlLabel value="percentage" control={<Radio disabled={this.state.mode === "view" ? true : false} size={"small"} style={{ color: "#012169" }} />} label="By Percentage" />
                                                                    <FormControlLabel value="amount" control={<Radio disabled={this.state.mode === "view" ? true : false} size={"small"} style={{ color: "#012169" }} />} label="By Fixed Ammount (₹)" />
                                                                </div>
                                                            </RadioGroup>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="col-md-12 ">
                                                <label className="expertise">Customer Type<span className="mandatory-star">*</span></label>
                                                <div className="signup-check">
                                                    <div className="d-flex flex-wrap login-form">
                                                        {this.state.userType?.map((value) => {
                                                            return (
                                                                <FormGroup>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                style={{ color: "#012169" }}
                                                                                size="small"
                                                                                className="check"
                                                                                value={value?.user_type}
                                                                                disabled
                                                                                // onChange={this.handleChange.bind(this)}
                                                                                checked={this.state.input?.customer_type?.toLowerCase() === value?.user_type?.toLowerCase() ? true : false}
                                                                                name={value?.user_type}
                                                                            />
                                                                        }
                                                                        label={
                                                                            <span style={{ fontSize: "0.875rem" }}>
                                                                                {(value?.user_type)}
                                                                            </span>
                                                                        }
                                                                    />
                                                                </FormGroup>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row">
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
                                        {/* <div className="col-md-12 ">
                                            <label className="expertise">Categories<span className="mandatory-star">*</span></label>
                                            <div className="signup-check">
                                                <div className="d-flex flex-wrap login-form">
                                                    {this.state.queries?.expert?.expertises?.map((value) => {
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
                                                    })}
                                                    <textarea
                                                        cols="100"
                                                        rows="5"
                                                        value={this.state.queries?.expert?.expertises?.map((value) => value?.name)?.join(" , ")}
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
