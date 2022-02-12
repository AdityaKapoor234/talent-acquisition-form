import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Pagination from "@mui/material/Pagination";
import Router from "next/router";
import ArticleEditor from "../../common-component/text-editer";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Photo from "../../common-component/photo";

export default class CategoryCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      tab: 1,
      customer: props?.customer,
      mode: props?.mode,
      short_description: "",
      full_description: "",
      sort: "cat",
    };
  }
  handleChange = (event) => {
    this.setState({ sort: event.target.value });
  };
  handleContent(value) {
    console.log("value.js", value);
  }
  handleFullContent(value) {
    console.log("value.js", value);
  }

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
                Category info
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
                        <input type="text" value={this.state.customer?.name} />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <div className="editor">
                        <label>Short Description</label>
                        <ArticleEditor
                          handleContent={this.handleContent.bind()}
                        />
                      </div>
                      <div className="editor mt-2">
                        <label>Full Description</label>
                        <ArticleEditor
                          handleContent={this.handleFullContent.bind()}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-4">
                      <div className="sort">
                        <label>Parent Category</label>
                        <div className="sort-by-select-wrapper">
                          <Select
                            disableUnderline
                            variant="standard"
                            autoWidth={true}
                            IconComponent={ExpandMoreIcon}
                            name="sort"
                            onChange={this.handleChange}
                            className="sort-by-select"
                            value={this.state.sort}
                          >
                            <MenuItem
                              value={"cat"}
                              disabled
                              className="field_toggle_checked"
                            >
                              Select Category{" "}
                            </MenuItem>
                            <MenuItem value={"vitamin"}>Vitamin</MenuItem>
                            <MenuItem value={"food"}>Food & Drinks</MenuItem>
                            <MenuItem value={"protein"}>Protiens</MenuItem>
                            <MenuItem value={"wellness"}>wellness</MenuItem>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Icon"}
                          accept=".gif,.jpg,.jpeg,.png"
                        />
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Full Banner image "}
                          accept=".gif,.jpg,.jpeg,.png"
                        />
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Short Banner image "}
                          accept=".gif,.jpg,.jpeg,.png"
                        />
                      </div>
                      <div className="signup-check mt-4">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.active}
                          onChange={(e) => {
                            this.setState({ active: e.target.checked });
                          }}
                        />
                        <label>Show on Main Menu</label>
                      </div>
                      <div className="signup-check">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.active}
                          onChange={(e) => {
                            this.setState({ active: e.target.checked });
                          }}
                        />
                        <label>Include in Top Menu </label>
                      </div>
                      <div className="login-form ">
                        <label>
                          Display Order<span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="number"
                          value={this.state.customer?.phone_number}
                        />
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
                        <input type="text" value={this.state.customer?.name} />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <div className="editor">
                        <label>Short Description</label>
                        <ArticleEditor
                          handleContent={this.handleContent.bind()}
                        />
                      </div>
                      <div className="editor mt-2">
                        <label>Full Description</label>
                        <ArticleEditor
                          handleContent={this.handleFullContent.bind()}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-4">
                      <div className="sort">
                        <label>Parent Category</label>
                        <div className="sort-by-select-wrapper">
                          <Select
                            disableUnderline
                            variant="standard"
                            autoWidth={true}
                            IconComponent={ExpandMoreIcon}
                            name="sort"
                            onChange={this.handleChange}
                            className="sort-by-select"
                            value={this.state.sort}
                          >
                            <MenuItem
                              value={"cat"}
                              disabled
                              className="field_toggle_checked"
                            >
                              Select Category{" "}
                            </MenuItem>
                            <MenuItem value={"vitamin"}>Vitamin</MenuItem>
                            <MenuItem value={"food"}>Food & Drinks</MenuItem>
                            <MenuItem value={"protein"}>Protiens</MenuItem>
                            <MenuItem value={"wellness"}>wellness</MenuItem>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Icon"}
                          accept=".gif,.jpg,.jpeg,.png"
                        />
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Full Banner image "}
                          accept=".gif,.jpg,.jpeg,.png"
                        />
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Short Banner image "}
                          accept=".gif,.jpg,.jpeg,.png"
                        />
                      </div>
                      <div className="signup-check mt-4">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.active}
                          onChange={(e) => {
                            this.setState({ active: e.target.checked });
                          }}
                        />
                        <label>Show on Main Menu</label>
                      </div>
                      <div className="signup-check">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.active}
                          onChange={(e) => {
                            this.setState({ active: e.target.checked });
                          }}
                        />
                        <label>Include in Top Menu </label>
                      </div>
                      <div className="login-form ">
                        <label>
                          Display Order<span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="number"
                          value={this.state.customer?.phone_number}
                        />
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
