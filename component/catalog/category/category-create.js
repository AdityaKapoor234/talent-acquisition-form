import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
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
import CategoryApi from "../../../services/category";

export default class CategoryCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      category: props?.category,
      mode: props?.mode,
      img_sm: "file-input-sm",
      img_lg: "file-input-lg",
      img_icon: "file-input-icon",
      parentCategory:[],
      input: {
        banner_img: null,
        description: "",
        full_banner_img: "",
        full_banner_img_sm: "",
        id: null,
        is_active: false,
        name: "",
        parent_id: "select",
        short_description: null,
        show_in_main_menu: false,
        show_in_top_menu: false,
        sort_order: null,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.category !== nextProps.category ||
      prevState.mode !== nextProps.mode
    ) {
      return {
        category: nextProps?.category,
        mode: nextProps?.mode,
        input: {
          banner_img: nextProps?.category?.banner_img,
          description: nextProps?.category?.description,
          full_banner_img: nextProps?.category?.full_banner_img,
          full_banner_img_sm: nextProps?.category?.full_banner_img_sm,
          id: nextProps?.category?.id,
          is_active: nextProps?.category?.is_active,
          name: nextProps?.category?.name,
          parent_id: nextProps?.category?.parent_id !== null ?nextProps?.category?.parent_id:"select",
          short_description: nextProps?.category?.short_description,
          show_in_main_menu: nextProps?.category?.show_in_main_menu,
          show_in_top_menu: nextProps?.category?.show_in_top_menu,
          sort_order: nextProps?.category?.sort_order,
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
  handlePhotoUrl = (name, url) => {
    let input = this.state.input;
    input[name] = url;
    this.setState({ input });
    this.props?.handle(input);
  };
  getCategory=()=>{
    CategoryApi.getParentCategory()
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ parentCategory: response.data.data.list });
          }
        })
        .catch((error) => {
          toast.error(
            error?.response &&
              error?.response?.data &&
              error?.response?.data?.message
              ? error.response.data.message
              : "Unable to process your request, please try after sometime"
          );
        });
  }
  componentDidMount(){
    this.getCategory()
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
                        <input
                          type="text"
                          name="name"
                          value={this.state.input.name}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <div className="login-form">
                        <label>Short Description<span className="mandatory-star">*</span></label>
                        <br />
                        <textarea
                          name="short_description"
                          cols="100"
                          rows="5"
                          value={this.state.input.short_description}
                          onChange={this.handleChange.bind(this)}
                        ></textarea>
                      </div>
                      <div className="login-form mt-2">
                        <label>Full Description<span className="mandatory-star">*</span></label>
                        <br />
                        <textarea
                          name="description"
                          cols="100"
                          rows="5"
                          value={this.state.input.description}
                          onChange={this.handleChange.bind(this)}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-4">
                      <div className="sort">
                        <label>Parent Category<span className="mandatory-star">*</span></label>
                        <div className="sort-by-select-wrapper">
                          <Select
                            disableUnderline
                            variant="standard"
                            autoWidth={true}
                            IconComponent={ExpandMoreIcon}
                            name="parent_id"
                            onChange={this.handleChange}
                            className="sort-by-select"
                            value={this.state.input?.parent_id}
                          >
                            <MenuItem
                              value={"select"}
                              disabled
                              className="field_toggle_checked"
                            >
                              Select Category{" "}
                            </MenuItem>
                            {this.state.parentCategory?.map(value =>{return (
                              <MenuItem value={value?.id}>{value?.name}</MenuItem>
                            )})}
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Icon"}
                          accept=".jpg,.jpeg,.png"
                          name="banner_img"
                          img={this.state.input.banner_img}
                          setUrl={this.handlePhotoUrl.bind(this)}
                          value={this.state.img_icon}
                          urlName="icon"
                        />
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Full Banner image"}
                          accept=".jpg,.jpeg,.png"
                          name="full_banner_img"
                          img={this.state.input.full_banner_img}
                          setUrl={this.handlePhotoUrl.bind(this)}
                          value={this.state.img_lg}
                          urlName="full_banner"
                        />
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Short Banner image "}
                          accept=".jpg,.jpeg,.png"
                          name="full_banner_img_sm"
                          img={this.state.input.full_banner_img_sm}
                          setUrl={this.handlePhotoUrl.bind(this)}
                          value={this.state.img_sm}
                          urlName="banner"
                        />
                      </div>
                      <div className="signup-check mt-4">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.input.show_in_main_menu}
                          name="show_in_main_menu"
                          onChange={this.handleCheck.bind(this)}
                        />
                        <label>Show on Main Menu</label>
                      </div>
                      <div className="signup-check">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.input.show_in_top_menu}
                          name="show_in_top_menu"
                          onChange={this.handleCheck.bind(this)}
                        />
                        <label>Include in Top Menu </label>
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
                      <div className="login-form ">
                        <label>
                          Display Order<span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="number"
                          name="sort_order"
                          value={this.state.input.sort_order}
                          onChange={this.handleChange.bind(this)}
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
                        <input
                          type="text"
                          readonly="readonly"
                          value={this.state.input.name}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-12">
                      <div className="login-form">
                        <label>Short Description<span className="mandatory-star">*</span></label>
                        <br />
                        <textarea
                          name="short_description"
                          cols="100"
                          rows="5"
                          value={this.state.input.short_description}
                        ></textarea>
                      </div>
                      <div className="login-form mt-2">
                        <label>Full Description<span className="mandatory-star">*</span></label>
                        <br />
                        <textarea
                          name="description"
                          cols="100"
                          rows="5"
                          value={this.state.input.description}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-4">
                      <div className="sort">
                        <label>Parent Category<span className="mandatory-star">*</span></label>
                        <div className="sort-by-select-wrapper">
                          <Select
                            disableUnderline
                            variant="standard"
                            autoWidth={true}
                            IconComponent={ExpandMoreIcon}
                            name="parent_id"
                            onChange={this.handleChange}
                            className="sort-by-select"
                            value={this.state.input?.parent_id}
                          >
                            <MenuItem
                              value={"select"}
                              disabled
                              className="field_toggle_checked"
                            >
                              Select Category{" "}
                            </MenuItem>
                            {this.state.parentCategory?.map(value =>{return (
                              <MenuItem value={value?.id}>{value?.name}</MenuItem>
                            )})}
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Icon"}
                          accept=".jpg,.jpeg,.png"
                          img={this.state.input.banner_img}
                        />
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Full Banner image "}
                          accept=".jpg,.jpeg,.png"
                          img={this.state.input.full_banner_img}
                        />
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Short Banner image "}
                          accept=".jpg,.jpeg,.png"
                          img={this.state.input.full_banner_img_sm}
                        />
                      </div>
                      <div className="signup-check mt-4">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.input.show_in_main_menu}
                        />
                        <label>Show on Main Menu</label>
                      </div>
                      <div className="signup-check">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.input.show_in_top_menu}
                        />
                        <label>Include in Top Menu </label>
                      </div>
                      <div className="signup-check">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.input.is_active}
                        />
                        <label>Active</label>
                      </div>
                      <div className="login-form ">
                        <label>
                          Display Order<span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="number"
                          readonly="readonly"
                          value={this.state.input.sort_order}
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
