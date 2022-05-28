import React, { Component } from "react";
import Checkbox from "@mui/material/Checkbox";
import Photo from "../../common-component/photo";

export default class AuthorCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 1,
      mode: props?.mode,
      author: props?.author,
      input: {
        name: props?.author?.name ? props.author?.name : "",
        bio: props?.author?.bio ? props.author?.bio : "",
        avatar: props?.author?.avatar ? props.author?.avatar : "",
        is_active: props?.author?.is_active ? props?.author?.is_active : false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.author !== nextProps.author ||
      prevState.mode !== nextProps.mode
    ) {
      return {
        author: nextProps?.author,
        mode: nextProps?.mode,
        input: {
         is_active: nextProps?.author?.is_active
            ? nextProps?.author?.is_active
            : false,
          name: nextProps?.author?.name ? nextProps.author?.name : "",
          bio: nextProps?.author?.bio ? nextProps.author?.bio : "",
          avatar: nextProps?.author?.avatar ? nextProps.author?.avatar : "",
        },
      };
    }
    return null;
  }

  handlePhotoUrl = (name, url) => {
    let input = this.state.input;
    input[name] = url;
    this.setState({ input });
    this.props?.handle(input);
  };
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
                Author Info
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
                          Bio
                        </label>
                        <br />
                        <textarea
                          name="bio"
                          cols="100"
                          rows="5"
                          value={this.state.input.bio}
                          onChange={this.handleChange.bind(this)}
                        >
                        </textarea>
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Avatar"}
                          accept=".jpg,.jpeg,.png"
                          name="avatar"
                          img={this.state.input.avatar}
                          setUrl={this.handlePhotoUrl.bind(this)}
                          value="file-type"
                          urlLink="http://65.1.17.188:5001/manage/category/photo/banner"
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
                          Bio<span className="mandatory-star">*</span>
                        </label>
                        <br />
                        <textarea
                          name="bio"
                          cols="100"
                          rows="5"
                          readOnly={true}
                          value={this.state.input.bio}
                        >
                        </textarea>                  
                      </div>
                      <div className="mt-4">
                        <Photo
                          mode={this.state.mode}
                          label={"Avatar"}
                          accept=".jpg,.jpeg,.png"
                          img={this.state.input.avatar}
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
