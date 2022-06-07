import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo";
import FormGroup from "@mui/material/FormGroup";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import {PRODUCT_SERVICE} from "../../../utils/constant";

export default class TypeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      mode: props?.mode,
      type: props?.type,
      img_sm: "file-input-sm",
      img_lg: "file-input-lg",
      img_icon: "file-input-icon",
      input: {
        name: props?.type?.name ? props.type?.name : "",
        sort_order: props?.type?.sort_order ? props.type?.sort_order : "",
        is_active: props?.type?.is_active ? props?.type?.is_active : false,
        label: props?.type?.label ? props?.type?.label : "",
        description: props?.type?.description ? props?.type?.description : "",
        banner_sm_url: props?.type?.banner_sm_url
          ? props?.type?.banner_sm_url
          : "",
        banner_url: props?.type?.banner_url ? props?.type?.banner_url : "",
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.type !== nextProps.type ||
      prevState.mode !== nextProps.mode
    ) {
      return {
        type: nextProps?.type,
        mode: nextProps?.mode,
        input: {
          is_active: nextProps?.type?.is_active
            ? nextProps?.type?.is_active
            : false,
          name: nextProps?.type?.name ? nextProps.type?.name : "",
          sort_order: nextProps?.type?.sort_order
            ? nextProps.type?.sort_order
            : "",
          label: nextProps?.type?.label ? nextProps?.type?.label : "",
          description: nextProps?.type?.description
            ? nextProps?.type?.description
            : "",
          banner_sm_url: nextProps?.type?.banner_sm_url
            ? nextProps?.type?.banner_sm_url
            : "",
          banner_url: nextProps?.type?.banner_url
            ? nextProps?.type?.banner_url
            : "",
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
  handlePhotoUrl = (name, url) => {
    let input = this.state.input;
    input[name] = url;
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
                Type Info
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
                        <label>Description</label>
                        <textarea
                          name="description"
                          cols="100"
                          rows="5"
                          value={this.state.input?.description}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                      <div className="login-form ">
                        <label>Content Type<span className="mandatory-star">*</span></label>
                        <div className="login-form">
                          <div className="d-flex">
                            <RadioGroup
                              row
                              disabled={
                                this.state.mode === "view" ? true : false
                              }
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="label"
                              value={this.state.input?.label}
                              onChange={this.handleChange}
                            >
                              <div className="d-flex">
                                <FormControlLabel
                                  value="video"
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
                                  label="Video"
                                />
                                <FormControlLabel
                                  value="content"
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
                                  label="Content"
                                />
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
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
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Short Banner Image"}
                          accept=".jpg,.jpeg,.png"
                          name="banner_sm_url"
                          img={this.state.input.banner_sm_url}
                          setUrl={this.handlePhotoUrl.bind(this)}
                          value={this.state.img_sm}
                          urlLink={`${PRODUCT_SERVICE}/manage/category/photo/full_banner_sm`}
                        />
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Full Banner image"}
                          accept=".jpg,.jpeg,.png"
                          name="banner_url"
                          img={this.state.input.banner_url}
                          setUrl={this.handlePhotoUrl.bind(this)}
                          value={this.state.img_lg}
                          urlLink={`${PRODUCT_SERVICE}/manage/category/photo/full_banner`}
                        />
                      </div>
                      <div className="signup-check mt-4">
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
                          Description<span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="text"
                          readOnly={true}
                          value={this.state.input?.name}
                        />
                      </div>
                      <div className="login-form ">
                        <label>Content Type<span className="mandatory-star">*</span></label>
                        <div className="login-form">
                          <div className="d-flex">
                            <RadioGroup
                              row
                              disabled={
                                this.state.mode === "view" ? true : false
                              }
                              aria-labelledby="demo-controlled-radio-buttons-group"
                              name="label"
                              value={this.state.input?.label}
                              onChange={this.handleChange}
                            >
                              <div className="d-flex">
                                <FormControlLabel
                                  value="video"
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
                                  label="Video"
                                />
                                <FormControlLabel
                                  value="content"
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
                                  label="Content"
                                />
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
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
                      <div className="">
                        <Photo
                          mode={this.state.mode}
                          label={"Short Banner Image"}
                          accept=".jpg,.jpeg,.png"
                          img={this.state.input.banner_sm_url}
                        />
                      </div>
                      <div className="">
                        <Photo
                          mode={this.state.mode}
                          label={"Full Banner image"}
                          accept=".jpg,.jpeg,.png"
                          img={this.state.input.banner_url}
                        />
                      </div>
                      <div className="signup-check ">
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
