import React, { Component } from "react";

export default class FormSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: props?.step,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.step !== nextProps?.step
    ) {
      return {
        tab: nextProps?.step,
      };
    }
    return null;
  }

  componentDidMount() {
  }

  render() {
    return (
      <div data-component="form-sidebar">
        <div className="w-100 form-sidebar-padding">
          <div
            className="newFormBox d-flex justify-content-center align-items-center mb-5"
            onClick={() => this.props.newForm()}
          >
            <div className="row">
              <div className="col-3">
                <img src="/images/talent/rectangle529.png" alt="" />
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <div>
                  <div className="newFormBoxHeading pb-2">
                    New Form
                  </div>
                  <div className="newFormBoxContent">
                    Start creating a new form with the wide options of fields available
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="description mb-3">
            Explore the following Templates:
          </div>

          <div
            className={this.state.tab === 0 ? "newFormBox-active d-flex justify-content-center align-items-center mb-3" : "newFormBox d-flex justify-content-center align-items-center mb-3"}
            onClick={() => this.props.sideBarMovement(0)}
          >
            <div className="row">
              <div className="col-3">
                <img src={this.state.tab === 0 ? "/images/talent/rectangle530.png" : "/images/talent/rectangle529.png"} alt="" />
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <div>
                  <div className="newFormBoxHeading pb-2">
                    Details Collection
                  </div>
                  <div className="newFormBoxContent">
                    Collect information from Candidates on their education, work experience, contact no,etc
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={this.state.tab === 1 ? "newFormBox-active d-flex justify-content-center align-items-center mb-3" : "newFormBox d-flex justify-content-center align-items-center mb-3"}
            onClick={() => this.props.sideBarMovement(1)}
          >
            <div className="row">
              <div className="col-3">
                <img src={this.state.tab === 1 ? "/images/talent/rectangle530.png" : "/images/talent/rectangle529.png"} alt="" />
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <div>
                  <div className="newFormBoxHeading pb-2">
                    Document Collection
                  </div>
                  <div className="newFormBoxContent">
                    Save time and efforts: Explore this template to find a set of questions required for document collection
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={this.state.tab === 2 ? "newFormBox-active d-flex justify-content-center align-items-center mb-3" : "newFormBox d-flex justify-content-center align-items-center mb-3"}
            onClick={() => this.props.sideBarMovement(2)}
          >
            <div className="row">
              <div className="col-3">
                <img src={this.state.tab === 2 ? "/images/talent/rectangle530.png" : "/images/talent/rectangle529.png"} alt="" />
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <div>
                  <div className="newFormBoxHeading pb-2">
                    Statement of Purpose
                  </div>
                  <div className="newFormBoxContent">
                    Start creating a new form with the wide options of fields available
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={this.state.tab === 3 ? "newFormBox-active d-flex justify-content-center align-items-center mb-3" : "newFormBox d-flex justify-content-center align-items-center mb-3"}
            onClick={() => this.props.sideBarMovement(3)}
          >
            <div className="row">
              <div className="col-3">
                <img src={this.state.tab === 3 ? "/images/talent/rectangle530.png" : "/images/talent/rectangle529.png"} alt="" />
              </div>
              <div className="col d-flex justify-content-center align-items-center">
                <div>
                  <div className="newFormBoxHeading pb-2">
                    Interview Availability
                  </div>
                  <div className="newFormBoxContent">
                    Start creating a new form with the wide options of fields available
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
