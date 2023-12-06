import React, { Component } from "react";
import Header from '../component/layouts/header';
import Footer from '../component/layouts/footer';
import FormSideBar from '../component/forms/form-sidebar';
import Form from '../component/forms/form';
import { toast } from "react-toastify";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      input: {
        name: "",
        email: "",
        dateOfBirth: "",
        contactNo: "",
        tenthMarkSheet: "",
        twelthMarkSheet: "",
        graduationMarkSheet: "",
        postGraduationMarkSheet: "",
        offerLetter: "",
        salarySlips: "",
        bankStatements: "",
        incrementLetter: "",
        others: "",
        longQuestOne: "",
        longQuestTwo: "",
        longQuestThree: "",
        emailTwo: "",
        location: "",
        interviewDate: "",
        interviewTime: "select",
        timeZone: "select",
        interviewMedium: "",
      },
      validationErrors: {}
    };
  }

  stateHandle = (value) => {
    this.setState({ input: value });
  };

  ValidateEmail = (mail) => {
    // return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    return /^[a-zA-Z]{1}\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
      mail
    )
  }

  validateData = () => {
    let isValid = true;
    let errors = {};

    // this.setState({ validationErrors: {} });

    if (this.state.step === 0) {
      if (!this.state.input.name) {
        isValid = false;
        errors.name = "Please enter name"
      }

      if (!this.state.input.email ||
        this.state.input.email.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.email = "Please enter email"
      } else {
        if (!this.ValidateEmail(this.state.input.email)) {
          isValid = false;
          errors.email = "Please enter valid email"
        } 
      }
    }

    if (this.state.step === 1) {
      if (!this.state.input.tenthMarkSheet ||
        this.state.input.tenthMarkSheet.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.tenthMarkSheet = "Please enter 10th marsheet"
      }

      if (!this.state.input.twelthMarkSheet ||
        this.state.input.twelthMarkSheet.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.twelthMarkSheet = "Please enter 12th marksheet"
      }

      if (!this.state.input.graduationMarkSheet ||
        this.state.input.graduationMarkSheet.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.graduationMarkSheet = "Please enter graduation marksheet"
      }

      if (!this.state.input.offerLetter ||
        this.state.input.offerLetter.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.offerLetter = "Please enter offer marksheet"
      }

      if (!this.state.input.salarySlips ||
        this.state.input.salarySlips.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.salarySlips = "Please enter salary slips"
      }

      if (!this.state.input.bankStatements ||
        this.state.input.bankStatements.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.bankStatements = "Please enter bank statements"
      }
    }

    if (this.state.step === 2) {
      if (!this.state.input.longQuestOne ||
        this.state.input.longQuestOne.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.longQuestOne = "Please enter your answer"
      }

      if (!this.state.input.longQuestTwo ||
        this.state.input.longQuestTwo.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.longQuestTwo = "Please enter your answer"
      }

      if (!this.state.input.longQuestThree ||
        this.state.input.longQuestThree.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.longQuestThree = "Please enter your answer"
      }
    }

    if (this.state.step === 3) {
      if (!this.state.input.emailTwo ||
        this.state.input.emailTwo.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.emailTwo = "Please enter email"
      } else {
        if (!this.ValidateEmail(this.state.input.emailTwo)) {
          isValid = false;
          errors.emailTwo = "Please enter valid email"
        } 
      }

      if (!this.state.input.location ||
        this.state.input.location.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.location = "Please enter location"
      }

      if (!this.state.input.interviewDate) {
        isValid = false;
        errors.interviewDate = "Please enter interview date"
      }

      if (!this.state.input.interviewTime) {
        isValid = false;
        errors.interviewTime = "Please enter interview time"
      }

      if (!this.state.input.timeZone ||
        this.state.input.timeZone === "select" ||
        this.state.input.timeZone.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.timeZone = "Please enter time zone"
      }

      if (!this.state.input.interviewMedium ||
        this.state.input.interviewMedium === "select" ||
        this.state.input.interviewMedium.replace(/\s/g, "").length <= 0) {
        isValid = false;
        errors.interviewMedium = "Please enter interview medium"
      }
    }

    console.log(errors, "errors")

    this.setState({ validationErrors: errors });
    return isValid;
  };

  handleChangeTab = () => {
    if (this.validateData()) {
      if (this.state.step === 0) {
        this.setState({ step: 1 });
      }
      if (this.state.step === 1) {
        this.setState({ step: 2 });
      }
      if (this.state.step === 2) {
        this.setState({ step: 3 });
      }
      if (this.state.step === 3) {
        toast.success("Form Completed");
        // this.setState({ step: 4 });
      }
    }
  };

  handleChangeTabPrev = () => {
    // if (this.validateData()) {
      if (this.state.step === 0) {
        // this.setState({ step: 1 });
      }
      if (this.state.step === 1) {
        this.setState({ step: 0 });
      }
      if (this.state.step === 2) {
        this.setState({ step: 1 });
      }
      if (this.state.step === 3) {
        this.setState({ step: 2 });
      }
    // }
  };


  render() {
    return (
      <div data-component="main" >
        <div className='website'>
          <div className="header w-100">
            <Header activeStep={this.state.step} />
          </div>
          <div className="row website-body">
            <div className="col-4">
              <FormSideBar step={this.state.step} />
            </div>
            <div className="col" style={{ background: "rgba(245, 245, 245, 1)" }}>
              <Form
                step={this.state.step}
                input={this.state.input}
                validationErrors={this.state.validationErrors}
                handle={this.stateHandle.bind(this)}
              />
            </div>
          </div>
          <div>&nbsp;</div>
          <div className="footer w-100">
            <Footer step={this.state.step} handleChangeTab={this.handleChangeTab.bind(this)} handleChangeTabPrev={this.handleChangeTabPrev.bind(this)} />
          </div>
        </div>
      </div >
    );
  }
}