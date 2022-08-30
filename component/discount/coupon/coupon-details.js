import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomerApi from "../../../services/customer";

export default class CouponDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      coupon: props?.coupon,
      userType: [],
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
  handleChangeDiet = (event) => {
    let list = this.state.userType;
    let objIndex = list?.findIndex((obj => obj.key === event?.target?.value));
    if(list[objIndex]){
      list[objIndex]["select"] = event?.target?.checked;
    }
    this.setState({
        userType:list
    })
    let input = this.state.input;
    input["customer_type"] = list?.filter(val=>val?.select === true)?.map(val=>val?.key)
    this.props?.handle(input);
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
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    let str =
      // date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
      // new Date(dateStr).toISOString().split('T')[0];
      date.toLocaleDateString("en-CA");
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
                            <label>
                              Name<span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Code<span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Description
                              <span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Start Date
                              <span className="mandatory-star">*</span>
                            </label>
                            <input
                              type="date"
                              value={this.convertDateStringToDate(
                                this.state.input?.start_date
                              )}
                              name="start_date"
                              onChange={this.handleChange.bind(this)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="login-form ">
                            <label>
                              End Date<span className="mandatory-star">*</span>
                            </label>
                            <input
                              type="date"
                              value={this.convertDateStringToDate(
                                this.state.input?.end_date
                              )}
                              name="end_date"
                              onChange={this.handleChange.bind(this)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="login-form sort">
                        <label>
                          Discount Type<span className="mandatory-star">*</span>
                        </label>
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
                            value={
                              this.state.input?.discount_type
                                ? this.state.input?.discount_type
                                : "select"
                            }
                          >
                            <MenuItem
                              value="select"
                              disabled
                              className="field_toggle_checked"
                            >
                              Select Discount Type{" "}
                            </MenuItem>
                            <MenuItem value="apply on cart">
                              Apply to Cart
                            </MenuItem>
                            <MenuItem value="apply on product">
                              Apply to Product
                            </MenuItem>
                            <MenuItem value="apply on category">
                              Apply to Category
                            </MenuItem>
                          </Select>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="login-form ">
                            <label>
                              Minimum Cart Amount
                              <span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Maximum Cart Amount
                              <span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Uses per Coupon
                              <span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Uses per Customer
                              <span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Coupon Value
                              <span className="mandatory-star">*</span>
                            </label>
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
                                disabled={
                                  this.state.mode === "view" ? true : false
                                }
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="by_amount_or_percent"
                                value={this.state.input?.by_amount_or_percent}
                                onChange={this.handleRadio}
                              >
                                <div className="d-flex">
                                  <FormControlLabel
                                    value="percentage"
                                    control={
                                      <Radio
                                        disabled={
                                          this.state.mode === "view"
                                            ? true
                                            : false
                                        }
                                        size={"small"}
                                        style={{ color: "#012169" }}
                                      />
                                    }
                                    label="By Percentage"
                                  />
                                  <FormControlLabel
                                    value="amount"
                                    control={
                                      <Radio
                                        disabled={
                                          this.state.mode === "view"
                                            ? true
                                            : false
                                        }
                                        size={"small"}
                                        style={{ color: "#012169" }}
                                      />
                                    }
                                    label="By Fixed Amount (₹)"
                                  />
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 ">
                        <label className="expertise">
                          Customer Type<span className="mandatory-star">*</span>
                        </label>
                        <div className="signup-check multiselect">
                          {this.state.userType?.map((val) => {
                            return (
                              <div className="d-flex ">
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        style={{ color: "#012169" }}
                                        size="small"
                                        disabled={
                                          this.state.mode === "view" ? true : false
                                        }
                                        checked={val?.select}
                                        value={val?.key}
                                        onChange={this.handleChangeDiet}
                                      />
                                    }
                                    label={val?.user_type}
                                  />
                                </FormGroup>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {this.state.createMode === "create" ? (
                        ""
                      ) : (
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
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {this.state.mode === "view" && (
              <div className="row sticky-scroll scroll">
                <div className="col">
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-md-4">
                          <div className="login-form ">
                            <label>
                              Name<span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Code<span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Description
                              <span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Start Date
                              <span className="mandatory-star">*</span>
                            </label>
                            <input
                              type="date"
                              value={this.convertDateStringToDate(
                                this.state.input?.start_date
                              )}
                              readOnly={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="login-form ">
                            <label>
                              End Date<span className="mandatory-star">*</span>
                            </label>
                            <input
                              type="date"
                              value={this.convertDateStringToDate(
                                this.state.input?.end_date
                              )}
                              readOnly={true}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4">
                          <div className="login-form ">
                            <label>
                              Discount Type
                              <span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Minimum Cart Amount
                              <span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Maximum Cart Amount
                              <span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Uses per Coupon
                              <span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Uses per Customer
                              <span className="mandatory-star">*</span>
                            </label>
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
                            <label>
                              Coupon Value
                              <span className="mandatory-star">*</span>
                            </label>
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
                                disabled={
                                  this.state.mode === "view" ? true : false
                                }
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="by_amount_or_percent"
                                value={this.state.input?.by_amount_or_percent}
                                // onChange={this.handleRadio}
                              >
                                <div className="d-flex">
                                  <FormControlLabel
                                    value="percentage"
                                    control={
                                      <Radio
                                        disabled={
                                          this.state.mode === "view"
                                            ? true
                                            : false
                                        }
                                        size={"small"}
                                        style={{ color: "#012169" }}
                                      />
                                    }
                                    label="By Percentage"
                                  />
                                  <FormControlLabel
                                    value="amount"
                                    control={
                                      <Radio
                                        disabled={
                                          this.state.mode === "view"
                                            ? true
                                            : false
                                        }
                                        size={"small"}
                                        style={{ color: "#012169" }}
                                      />
                                    }
                                    label="By Fixed Amount (₹)"
                                  />
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 ">
                        <label className="expertise">
                          Customer Type<span className="mandatory-star">*</span>
                        </label>
                        <div className="signup-check multiselect">
                          {this.state.userType?.map((val) => {
                            return (
                              <div className="d-flex ">
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        style={{ color: "#012169" }}
                                        size="small"
                                        disabled={
                                          this.state.mode === "view" ? true : false
                                        }
                                        checked={val?.selected}
                                        value={val?.user_type}
                                        // onChange={this.handleChangeDiet}
                                      />
                                    }
                                    label={val?.user_type}
                                  />
                                </FormGroup>
                              </div>
                            );
                          })}
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
