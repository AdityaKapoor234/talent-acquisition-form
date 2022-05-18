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
      mode:props?.mode,
      input: {
        user_type: props?.customer?.user_type ? props.customer?.user_type : "",
        sort_order: props?.customer?.sort_order ? props?.customer?.sort_order : null,
        is_active: props?.customer?.is_active ? props?.customer?.is_active : false,
        by_default: props?.customer?.by_default ? props?.customer?.by_default : false,
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.customer !== nextProps.customer
    ) {
      return {
        mode: nextProps?.mode,
        input: {
          is_active: nextProps?.customer?.is_active?nextProps?.customer?.is_active:false,
          user_type: nextProps?.customer?.user_type,
          by_default: nextProps?.customer?.by_default ? nextProps?.customer?.by_default : false,
          sort_order: nextProps?.customer?.sort_order?nextProps?.customer?.sort_order:null,
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
              <div>
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
                      name="user_type"
                      value={this.state.input?.user_type}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                  <div className="login-form ">
                    <label>Sort Order<span className="mandatory-star">*</span></label>
                    <input
                      type="text"
                      name="sort_order"
                      value={this.state.input?.sort_order}
                      onChange={this.handleChange.bind(this)}
                    />
                  </div>
                  <div className="login-form ">
                    <div className="signup-check">
                      <Checkbox
                        size="small"
                        style={{ color: "#012169" }}
                        checked={this.state.input?.is_active?this.state.input?.is_active:false}
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
                      checked={this.state.input?.by_default?this.state.input?.by_default:false}
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
