import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo-non-merge";
import {PRODUCT_SERVICE} from "../../../utils/constant";

export default class BrandCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      mode: props?.mode,
      brand: props?.brand,
      img_sm: "file-input-sm",
      img_lg: "file-input-lg",
      img_icon: "file-input-icon",
      input: {
        name: props?.brand?.name ? props.brand?.name : "",
        description: props?.brand?.description ? props?.brand?.description : "",
        sort_order: props?.brand?.sort_order ? props.brand?.sort_order : "",
        icon_url: props?.brand?.icon_url ? props?.brand?.icon_url : "",
        banner_url: props?.brand?.banner_url ? props?.brand?.banner_url : "",
        banner_url_sm: props?.brand?.banner_url_sm ? props?.brand?.banner_url_sm : "",
        is_active: props?.brand?.is_active ? props?.brand?.is_active : false,
        show_in_main_menu: props?.brand?.show_in_main_menu ? props?.brand?.show_in_main_menu : false,

      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.brand !== nextProps.brand ||
      prevState.mode !== nextProps.mode
    ) {
      return {
        brand: nextProps?.brand,
        mode: nextProps?.mode,
        input: {
          //  is_active: nextProps?.brand?.is_active
          //     ? nextProps?.brand?.is_active
          //     : false,
          name: nextProps?.brand?.name ? nextProps.brand?.name : "",
          description: nextProps?.brand?.description ? nextProps?.brand?.description : "",
          sort_order: nextProps?.brand?.sort_order ? nextProps.brand?.sort_order : "",
          icon_url: nextProps?.brand?.icon_url ? nextProps?.brand?.icon_url : "",
          banner_url: nextProps?.brand?.banner_url ? nextProps?.brand?.banner_url : "",
          banner_url_sm: nextProps?.brand?.banner_url_sm ? nextProps?.brand?.banner_url_sm : "",
          is_active: nextProps?.brand?.is_active ? nextProps?.brand?.is_active : false,
          show_in_main_menu: nextProps?.brand?.show_in_main_menu ? nextProps?.brand?.show_in_main_menu : false,

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
  handleCheck = (event) => {
    let input = this.state.input;
    input[event.target.name] = event.target.checked;
    this.setState({ input });
    this.props?.handle(input);
  };
  handlePhotoUrl = (name, url) => {
    let input = this.state.input;
    input[name] = url;
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
                Brand Info
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
													Description
												</label>
												<textarea
													name="description"
													cols="100"
													rows="5"
													value={this.state.input?.description}
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
                      <div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Icon"}
													accept=".jpg,.jpeg,.png"
													name="icon_url"
													img={this.state.input?.icon_url}
													setUrl={this.handlePhotoUrl.bind(this)}
													value={this.state.img_icon}
													urlLink={`${PRODUCT_SERVICE}/manage/category/photo/icon`}
												/>
											</div>
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Full Banner Image"}
													accept=".jpg,.jpeg,.png"
													name="banner_url"
													img={this.state.input?.banner_url}
													setUrl={this.handlePhotoUrl.bind(this)}
													value={this.state.img_lg}
													urlLink={`${PRODUCT_SERVICE}/manage/category/photo/full_banner`}
												/>
											</div>
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Short Banner Image"}
													accept=".jpg,.jpeg,.png"
													name="banner_url_sm"
													img={this.state.input?.banner_url_sm}
													setUrl={this.handlePhotoUrl.bind(this)}
													value={this.state.img_sm}
													urlLink={`${PRODUCT_SERVICE}/manage/category/photo/full_banner_sm`}
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
                      <div className="signup-check">
												<Checkbox
													size="small"
													style={{ color: "#012169" }}
													checked={this.state.input?.show_in_main_menu}
													name="show_in_main_menu"
													onChange={this.handleCheck.bind(this)}
												/>
												<label>Show in Main Menu</label>
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
													Description
												</label>
												<textarea
													name="description"
													cols="100"
													rows="5"
													readOnly={true}
													value={this.state.input?.description}
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
											<div className="mt-4">
												<Photo
													mode={this.state.mode}
													label={"Icon"}
													accept=".jpg,.jpeg,.png"
													img={this.state.input?.icon_url}
												/>
											</div>
											<div>
												<Photo
													mode={this.state.mode}
													label={"Full Banner Image"}
													accept=".jpg,.jpeg,.png"
													img={this.state.input?.banner_url}
												/>
											</div>
											<div>
												<Photo
													mode={this.state.mode}
													label={"Short Banner Image"}
													accept=".jpg,.jpeg,.png"
													img={this.state.input?.banner_url_sm}
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
											<div className="signup-check">
												<Checkbox
													size="small"
													disabled
													style={{ color: "#012169" }}
													checked={this.state.input.show_in_main_menu}
												/>
												<label>Show in Main Menu</label>
											</div>
                    </div>
                  </div>
                </div>
              </div>
              
        )}
      </>
    )
  }
      </div>
    );
  }
}
