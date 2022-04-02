import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";

export default class FlavorCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      mode: props?.mode,
      flavor: props?.flavor,
      input: {
        name: props?.flavor?.name ? props.flavor?.name : "",
        sort_order: props?.flavor?.sort_order ? props.flavor?.sort_order : "",
        is_active: props?.flavor?.is_active ? props?.flavor?.is_active : false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.flavor !== nextProps.flavor ||
      prevState.mode !== nextProps.mode
    ) {
      return {
        flavor: nextProps?.flavor,
        mode: nextProps?.mode,
        input: {
         is_active: nextProps?.flavor?.is_active
            ? nextProps?.flavor?.is_active
            : false,
          name: nextProps?.flavor?.name ? nextProps.flavor?.name : "",
          sort_order: nextProps?.flavor?.sort_order? nextProps.flavor?.sort_order : "",
        },
      };
    }
    return null;
  }
  handleChange = (event) => {
    let input = this.state.input;
    if(event.target.name === "sort_order"){
      input[event.target.name] = event.target.value.replace(/[^\d]/, "");
    }else{
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
                Flavor Info
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
                          readOnly={true}
                          value={this.state.input?.name}
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
                      <div className="signup-check">
                        <Checkbox
                          size="small"
                          disabled
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
