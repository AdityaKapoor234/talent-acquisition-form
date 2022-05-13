import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { CheckCircleOutline } from "@mui/icons-material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";


export default class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        name: props?.customer?.name ? props.customer?.name : "",
        maximum_order_qty: props?.customer?.maximum_order_qty ? props?.customer?.maximum_order_qty : "",
        is_active: props?.customer?.is_active ? props?.customer?.is_active : false,
        by_default: props?.customer?.by_default ? props?.customer?.by_default : false,
      },
    };
  }

  handleChange = (event) => {
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

  render() {
    return (
      <div data-component="edit-customer">
        <div className="row">
          <div className="col-md-12">
            <div className="tab">
              <div
              // className={
              //     this.state.tab === 1 ? `sub-tab active-tab` : "sub-tab"
              // }
              // onClick={() => {
              //     this.setState({ tab: 1 });
              // }}
              >
                Customer info
              </div>
            </div>
          </div>
        </div>
        <>
          <div className="row sticky-scroll scroll">
            <div className="col">
              <div className="row mt-4">
                <div className="col-md-4">
                  <div className="login-form ">
                    <label> Name<span className="mandatory-star">*</span></label>
                    <input
                      type="text"
                      name="name"
                      value={this.state.input?.name}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                  <div className="login-form ">
                    <label>Maximum Order Qty<span className="mandatory-star">*</span></label>
                    <input
                      type="text"
                      name="maximum_order_qty"
                      value={this.state.input?.maximum_order_qty}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                  <div className="login-form ">
                    <div className="signup-check">
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
                  <div className="signup-check">
                    <Checkbox
                      size="small"
                      style={{ color: "#012169" }}
                      checked={this.state.input?.by_default}
                      name="by_default"
                      onChange={this.handleCheck.bind(this)}
                    />
                    <label>Is Default</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
