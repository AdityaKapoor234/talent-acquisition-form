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

  render() {
    return (
      <div data-component="footer">
        <div className='w-100 footer-box'>
          <div className='py-4 w-100'>
            {
              this.state.tab !== 0 &&
              <div className='prevBtn d-flex align-items-center justify-content-center' onClick={() => { this.props?.handleChangeTabPrev() }}>
                Previous
              </div>
            }
            <div className='nextBtn d-flex align-items-center justify-content-center' onClick={() => { this.props?.handleChangeTab() }}>
              Next
            </div>
          </div>
        </div>
      </div>
    );
  }
}