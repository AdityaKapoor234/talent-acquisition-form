import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo";

export default class ContentCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      mode: props?.mode,
      content: props?.content,
      input: {
        "title":props?.content?.title? props?.content?.title:"",
        "slug": props?.content?.slug? props?.content?.slug:"",
        "content":props?.content?.content? props?.content?.content:"",
        "status": props?.content?.status? props?.content?.status:"",
        "feature_image": props?.content?.feature_image? props?.content?.feature_image:"",
        "author_id":props?.content?.author_id? props?.content?.author_id:null,
        "meta_tags": props?.content?.meta_tags ? props?.content?.meta_tags:"",
        "meta_title": props?.content?.meta_title? props?.content?.meta_title:"",
        "meta_description": props?.content?.meta_description? props?.content?.meta_description:"",
        "category_id":props?.content?.category_id?props?.content?.category_id:null ,
        "type_id": props?.content?.type_id ? props?.content?.type_id :null,
        "is_show_on_home": props?.content?.is_show_on_home ? props?.content?.is_show_on_home:"" ,
        "sort_order":props?.content?.sort_order ? props?.content?.props?.sort_order :""
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
          "title":nextProps?.content?.title? nextProps?.content?.title:"",
          "slug": nextProps?.content?.slug? nextProps?.content?.slug:"",
          "content":nextProps?.content?.content? nextProps?.content?.content:"",
          "status": nextProps?.content?.status? nextProps?.content?.status:"",
          "feature_image": nextProps?.content?.feature_image? nextProps?.content?.feature_image:"",
          "author_id":nextProps?.content?.author_id? nextProps?.content?.author_id:null,
          "meta_tags": nextProps?.content?.meta_tags ? nextProps?.content?.meta_tags:"",
          "meta_title": nextProps?.content?.meta_title? nextProps?.content?.meta_title:"",
          "meta_description": nextProps?.content?.meta_description? nextProps?.content?.meta_description:"",
          "category_id":nextProps?.content?.category_id?nextProps?.content?.category_id:null ,
          "type_id": nextProps?.content?.type_id ? nextProps?.content?.type_id :null,
          "is_show_on_home": nextProps?.content?.is_show_on_home ? nextProps?.content?.is_show_on_home:"" ,
          "sort_order":nextProps?.content?.sort_order ? nextProps?.content?.nextProps?.sort_order :""
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
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Banner images"}
                          accept=".jpg,.jpeg,.png"
                          name="full_banner_img_sm"
                          img={this.state.input.full_banner_img_sm}
                          setUrl={this.handlePhotoUrl.bind(this)}
                          value={this.state.img_sm}
                          urlLink="http://65.1.17.188:5001/manage/category/photo/banner"
                        />
                      </div>
                      <div className="login-form ">
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
                          value={this.state.meta_title}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                      <div className="login-form ">
                        <label>
                          Meta Description<span className="mandatory-star">*</span>
                        </label>
                        <input
                          type="text"
                          name="meta_description"
                          value={this.state.meta_description}
                          onChange={this.handleChange.bind(this)}
                        />
                      </div>
                      <div className="signup-check mt-4">
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
