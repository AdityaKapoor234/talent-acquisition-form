import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo";
import ArticleEditor from "../../common-component/text-editer";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArticleApi from "../../../services/articles";
import { toast } from "react-toastify";

export default class ContentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      mode: props?.mode,
      errors: {},
      category: [],
      content: props?.content,
      author: [],
      type: [],
      input: {
        title: props?.content?.title ? props?.content?.title : "",
        slug: props?.content?.slug ? props?.content?.slug : "",
        content: props?.content?.content ? props?.content?.content : "",
        status: props?.content?.status ? props?.content?.status : "select",
        feature_image: props?.content?.feature_image
          ? props?.content?.feature_image
          : "",
        author_id: props?.content?.author_id
          ? props?.content?.author_id
          : "select",
        meta_tags: props?.content?.meta_tags ? props?.content?.meta_tags : "",
        meta_title: props?.content?.meta_title
          ? props?.content?.meta_title
          : "",
        meta_description: props?.content?.meta_description
          ? props?.content?.meta_description
          : "",
        category_id: props?.content?.category_id
          ? props?.content?.category_id
          : "select",
        type_id: props?.content?.type_id ? props?.content?.type_id : "select",
        is_show_on_home: props?.content?.is_show_on_home
          ? props?.content?.is_show_on_home
          : "",
        sort_order: props?.content?.sort_order
          ? props?.content?.props?.sort_order
          : "",
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.content !== nextProps.content ||
      prevState.mode !== nextProps.mode
    ) {
      return {
        content: nextProps?.content,
        mode: nextProps?.mode,
        input: {
          title: nextProps?.content?.title ? nextProps?.content?.title : "",
          slug: nextProps?.content?.slug ? nextProps?.content?.slug : "",
          content: nextProps?.content?.content
            ? nextProps?.content?.content
            : "",
          status: nextProps?.content?.status ? nextProps?.content?.status : "select",
          feature_image: nextProps?.content?.feature_image
            ? nextProps?.content?.feature_image
            : "",
          author_id: nextProps?.content?.author_id
            ? nextProps?.content?.author_id
            : null,
          meta_tags: nextProps?.content?.meta_tags
            ? nextProps?.content?.meta_tags
            : "",
          meta_title: nextProps?.content?.meta_title
            ? nextProps?.content?.meta_title
            : "",
          meta_description: nextProps?.content?.meta_description
            ? nextProps?.content?.meta_description
            : "",
          category_id: nextProps?.content?.category_id
            ? nextProps?.content?.category_id
            : null,
          type_id: nextProps?.content?.type_id
            ? nextProps?.content?.type_id
            : null,
          is_show_on_home: nextProps?.content?.is_show_on_home
            ? nextProps?.content?.is_show_on_home
            : "",
          sort_order: nextProps?.content?.sort_order
            ? nextProps?.content?.nextProps?.sort_order
            : "",
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
  handleLabel = (value) => {
    let input = this.state.input;
    input["content"] = value;
    this.setState({ input });
    this.props?.handle(input);
  };

  getCategory = () => {
    ArticleApi.AllCategory()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ category: response.data.data.list });
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
  };
  getType = () => {
    ArticleApi.AllType()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ type: response.data.data.list });
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
  };
  getType = () => {
    ArticleApi.AllAuthor()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ author: response.data.data.list });
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
  };

  componentDidMount = () => {
    this.getCategory();
    this.getType();
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
                content Info
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
                          Title<span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={this.state.input.title}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                      <div className="login-form ">
                        <label>
                          Slug<span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="slug"
                          value={this.state.input.slug}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                      <div className="sort">
                        <label>
                          Status<span className="mandatory-star">*</span>
                        </label>
                        <div className="sort-by-select-wrapper">
                          <Select
                            disableUnderline
                            variant="standard"
                            autoWidth={true}
                            IconComponent={ExpandMoreIcon}
                            name="status"
                            onChange={this.handleChange}
                            className="sort-by-select"
                            value={this.state.input?.status}
                          >
                            <MenuItem
                              value={"select"}
                              disabled
                              className="field_toggle_checked"
                            >
                              Select Status{" "}
                            </MenuItem>
                            <MenuItem value={"draft"}>Draft</MenuItem>
                            <MenuItem value={"published"}>
                              Published
                            </MenuItem>
                          </Select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Feature image"}
                          accept=".jpg,.jpeg,.png"
                          name="full_banner_img_sm"
                          img={this.state.input.full_banner_img_sm}
                          setUrl={this.handlePhotoUrl.bind(this)}
                          value={this.state.img_sm}
                          urlLink="http://65.1.17.188:5000/user/feature_image"
                        />
                      </div>
                      <div className="login-form mt-4">
                        <label>
                          Meta Tags<span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="meta_tags"
                          value={this.state.meta_tags}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                      <div className="login-form ">
                        <label>
                          Meta Title<span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="meta_title"
                          value={this.state.input?.meta_title}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                      <div className="login-form ">
                        <label>
                          Meta Description
                          <span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="meta_description"
                          value={this.state.input?.meta_description}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                      <div className="sort">
                        <label>
                          Category<span className="mandatory-star">*</span>
                        </label>
                        <div className="sort-by-select-wrapper">
                          <Select
                            disableUnderline
                            variant="standard"
                            autoWidth={true}
                            IconComponent={ExpandMoreIcon}
                            name="category_id"
                            onChange={this.handleChange}
                            className="sort-by-select"
                            value={this.state.input?.category_id}
                          >
                            <MenuItem
                              value="select"
                              disabled
                              className="field_toggle_checked"
                            >
                              Select Category{" "}
                            </MenuItem>
                            {this.state.category?.map((value) => {
                              return (
                                <MenuItem value={value?.id}>
                                  {value?.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </div>
                      </div>
                      <div className="sort mt-4">
                        <label>
                          Type<span className="mandatory-star">*</span>
                        </label>
                        <div className="sort-by-select-wrapper">
                          <Select
                            disableUnderline
                            variant="standard"
                            autoWidth={true}
                            IconComponent={ExpandMoreIcon}
                            name="type_id"
                            onChange={this.handleChange}
                            className="sort-by-select"
                            value={this.state.input?.type_id}
                          >
                            <MenuItem
                              value="select"
                              disabled
                              className="field_toggle_checked"
                            >
                              Select Type{" "}
                            </MenuItem>
                            {this.state.type?.map((value) => {
                              return (
                                <MenuItem value={value?.id}>
                                  {value?.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </div>
                      </div>
                      <div className="sort mt-4">
                        <label>
                          Author<span className="mandatory-star">*</span>
                        </label>
                        <div className="sort-by-select-wrapper">
                          <Select
                            disableUnderline
                            variant="standard"
                            autoWidth={true}
                            IconComponent={ExpandMoreIcon}
                            name="author_id"
                            onChange={this.handleChange}
                            className="sort-by-select"
                            value={this.state.input?.author_id}
                          >
                            <MenuItem
                              value="select"
                              disabled
                              className="field_toggle_checked"
                            >
                              Select author{" "}
                            </MenuItem>
                            {this.state.author?.map((value) => {
                              return (
                                <MenuItem value={value?.id}>
                                  {value?.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="fc-form-group editor">
                        <label>
                          Product Label
                          <span className="mandatory-star">*</span>
                        </label>
                        <br />
                        <ArticleEditor
                          value={this.state.input?.content}
                          mode={this.state.mode}
                          handleContent={this.handleLabel.bind(this)}
                          name="content"
                        />
                        <small className="form-text text-danger">
                          {this.state.errors["content"]}
                        </small>
                      </div>
                    </div>
                    <div className="col-md-4">
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
                      <div className="signup-check ">
                        <Checkbox
                          size="small"
                          style={{ color: "#012169" }}
                          checked={this.state.input.is_show_on_home}
                          name="is_show_on_home"
                          onChange={this.handleCheck.bind(this)}
                        />
                        <label>Show on Home</label>
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
                      <div className="signup-check ">
                        <Checkbox
                          size="small"
                          disabled
                          style={{ color: "#012169" }}
                          checked={this.state.input.is_show_on_home}
                        />
                        <label>Show on Home</label>
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
