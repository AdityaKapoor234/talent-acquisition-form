import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default class BrandCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      mode: props?.mode,
      product: props?.product,
      input: {
        name: props?.product?.name ? props.product?.name : "",
        is_active: props?.product?.is_active
          ? props?.product?.is_active
          : false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.product !== nextProps.product ||
      prevState.mode !== nextProps.mode
    ) {
      return {
        product: nextProps?.product,
        mode: nextProps?.mode,
        input: {
          is_active: nextProps?.product?.is_active
            ? nextProps?.product?.is_active
            : false,
          name: nextProps?.product?.name ? nextProps.product?.name : "",
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
  handleChange1 = (event) => {
    this.setState({ type: event.target.value });
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
                product Info
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
                          SKU<span className="mandatory-star">*</span>
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
                          Name<span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={this.state.input.name}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>

                      <div className="sort fc-select-form-group">
                        <label>
                          Status<span className="mandatory-star">*</span>
                        </label>
                        <div className="sort-by-select-wrapper">
                          <Select
                            disableUnderline
                            variant="standard"
                            autoWidth={true}
                            name="parent_id"
                            onChange={this.handleChange1}
                            className="sort-by-select w-100"
                            value="published"
                          >
                            <MenuItem
                              value={"select"}
                              disabled
                              className="field_toggle_checked"
                            >
                              Select Status{" "}
                            </MenuItem>
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="published">Publised</MenuItem>
                            <MenuItem value="archived">Archived</MenuItem>
                          </Select>
                        </div>
                      </div>
                      {/* <div className="signup-check">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.input.is_active}
                          name="is_active"
                          onChange={this.handleCheck.bind(this)}
                        />
                        <label>Active</label>
                      </div> */}
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
