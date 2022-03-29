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
      errors:props?.errors,
      input: {
        name: props?.product?.name ? props.product?.name : "",
        sku: props?.product?.sku ? props.product?.sku : "",
        status: props?.product?.status ? props.product?.status : "",
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.product !== nextProps.product ||
      prevState.mode !== nextProps.mode ||
      prevState.errors !== nextProps.errors
    ) {
      return {
        product: nextProps?.product,
        mode: nextProps?.mode,
        errors:nextProps?.errors,
        input: {
          name: nextProps?.product?.name ? nextProps.product?.name : "",
          sku: nextProps?.product?.sku ? nextProps.product?.sku : "",
          status: nextProps?.product?.status ? nextProps.product?.status : "",
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

  render() {
    return (
      <div data-component="edit-category">
        <div className="row ">
        {console.log("test",this.props)}
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
                          name="sku"
                          value={this.state.input.sku}
                          onChange={this.handleChange.bind(this)}
                        />
                        <small className="form-text text-danger" >{this.state.errors["sku"]}</small>
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
                        <small className="form-text text-danger" >{this.state.errors["name"]}</small>
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
                            name="status"
                            onChange={this.handleChange}
                            className="sort-by-select w-100"
                            value={this.state.input.status}
                          >
                            <MenuItem
                              value={""}
                              disabled
                              className="field_toggle_checked"
                            >
                              Select Status{" "}
                            </MenuItem>
                            <MenuItem value="draft">Draft</MenuItem>
                            <MenuItem value="published">Publised</MenuItem>
                            <MenuItem value="archived">Archived</MenuItem>
                          </Select>
                          <small className="form-text text-danger" >{this.state.errors["status"]}</small>
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
