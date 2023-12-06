import React, { Component } from "react";
import { toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccessTimeIcon from '@mui/icons-material/AccessTime';


export default class FormSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: props?.step,
      input: {
        name: props?.input?.name ? props.input?.name : "",
        email: props?.input?.email ? props.input?.email : "",
        dateOfBirth: props?.input?.dateOfBirth ? props.input?.dateOfBirth : "",
        contactNo: props?.input?.contactNo ? props.input?.contactNo : "",
        tenthMarkSheet: props?.input?.tenthMarkSheet ? props.input?.tenthMarkSheet : "",
        twelthMarkSheet: props?.input?.twelthMarkSheet ? props.input?.twelthMarkSheet : "",
        graduationMarkSheet: props?.input?.graduationMarkSheet ? props.input?.graduationMarkSheet : "",
        postGraduationMarkSheet: props?.input?.postGraduationMarkSheet ? props.input?.postGraduationMarkSheet : "",
        offerLetter: props?.input?.offerLetter ? props.input?.offerLetter : "",
        salarySlips: props?.input?.salarySlips ? props.input?.salarySlips : "",
        bankStatements: props?.input?.bankStatements ? props.input?.bankStatements : "",
        incrementLetter: props?.input?.incrementLetter ? props.input?.incrementLetter : "",
        others: props?.input?.others ? props.input?.others : "",
        longQuestOne: props?.input?.longQuestOne ? props.input?.longQuestOne : "",
        longQuestTwo: props?.input?.longQuestTwo ? props.input?.longQuestTwo : "",
        longQuestThree: props?.input?.longQuestThree ? props.input?.longQuestThree : "",
        emailTwo: props?.input?.emailTwo ? props.input?.emailTwo : "",
        location: props?.input?.location ? props.input?.location : "",
        interviewDate: props?.input?.interviewDate ? props.input?.interviewDate : "",
        interviewTime: props?.input?.interviewTime ? props.input?.interviewTime : "",
        timeZone: props?.input?.timeZone ? props.input?.timeZone : "",
        interviewMedium: props?.input?.interviewMedium ? props.input?.interviewMedium : "",
      },
      validationErrors: props?.validationErrors,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.step !== nextProps?.step ||
      prevState.validationErrors !== nextProps?.validationErrors ||
      prevState.input !== nextProps?.input
    ) {
      return {
        tab: nextProps?.step,
        validationErrors: nextProps?.validationErrors,
        input: {
          name: nextProps?.input?.name ? nextProps.input?.name : "",
          email: nextProps?.input?.email ? nextProps.input?.email : "",
          dateOfBirth: nextProps?.input?.dateOfBirth ? nextProps.input?.dateOfBirth : "",
          contactNo: nextProps?.input?.contactNo ? nextProps.input?.contactNo : "",
          tenthMarkSheet: nextProps?.input?.tenthMarkSheet ? nextProps.input?.tenthMarkSheet : "",
          twelthMarkSheet: nextProps?.input?.twelthMarkSheet ? nextProps.input?.twelthMarkSheet : "",
          graduationMarkSheet: nextProps?.input?.graduationMarkSheet ? nextProps.input?.graduationMarkSheet : "",
          postGraduationMarkSheet: nextProps?.input?.postGraduationMarkSheet ? nextProps.input?.postGraduationMarkSheet : "",
          offerLetter: nextProps?.input?.offerLetter ? nextProps.input?.offerLetter : "",
          salarySlips: nextProps?.input?.salarySlips ? nextProps.input?.salarySlips : "",
          bankStatements: nextProps?.input?.bankStatements ? nextProps.input?.bankStatements : "",
          incrementLetter: nextProps?.input?.incrementLetter ? nextProps.input?.incrementLetter : "",
          others: nextProps?.input?.others ? nextProps.input?.others : "",
          longQuestOne: nextProps?.input?.longQuestOne ? nextProps.input?.longQuestOne : "",
          longQuestTwo: nextProps?.input?.longQuestTwo ? nextProps.input?.longQuestTwo : "",
          longQuestThree: nextProps?.input?.longQuestThree ? nextProps.input?.longQuestThree : "",
          emailTwo: nextProps?.input?.emailTwo ? nextProps.input?.emailTwo : "",
          location: nextProps?.input?.location ? nextProps.input?.location : "",
          interviewDate: nextProps?.input?.interviewDate ? nextProps.input?.interviewDate : "",
          interviewTime: nextProps?.input?.interviewTime ? nextProps.input?.interviewTime : "",
          timeZone: nextProps?.input?.timeZone ? nextProps.input?.timeZone : "",
          interviewMedium: nextProps?.input?.interviewMedium ? nextProps.input?.interviewMedium : "",
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

  componentDidMount() {
  }

  render() {
    return (
      <div data-component="form">
        <div className="formBody w-100 h-100">
          <div className="previewHead">
            Preview
          </div>
          <div className="previewContent mb-4">
            You will be able to customize the fields in the later stage
          </div>

          <div className="formBox">
            <div className="formBoxHeadDiv d-flex align-items-center">
              <div>
                <div className="formBoxHeadDivHead mb-1">
                  Name of the Enquiry Form
                </div>
                <div className="formBoxHeadDivDescription mb-4">
                  One line description of the form
                </div>
                <div className="formBoxHeadDivContent">
                  Provide the following information to process your application
                </div>
              </div>
            </div>
            <div className="formBoxFieldDiv py-5">
              <div className="formBoxFieldDivPadding">
                {
                  this.state.tab === 0 ?
                    <>
                      <div className="fieldName mb-4">
                        1. Name*
                        <div style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "40px" }}>
                          <TextField
                            type="text"
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            fullWidth
                            placeholder="Enter a Valid Salary in numbers e.g 50,000/-"
                            InputProps={{
                              style: {
                                paddingRight: 2,
                              },
                              sx: {
                                width: "100%",
                                height: "40px",
                                border: "none",
                                outline: "none",
                                paddingLeft: "0.2rem",
                                paddingRight: "0.2rem",
                                background: "transparent",
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontWeight: "400",
                                lineHeight: "19px",
                                letterSpacing: "0em",
                                textAlign: "left",
                                // color: "rgba(195, 195, 195, 1)",
                              },
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& > fieldset": {
                                  border: "none"
                                }
                              }
                            }}
                            name="name"
                            value={this.state.input.name}
                            onChange={this.handleChange.bind(this)}
                          />
                        </div>
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {this.state.validationErrors?.name ? this.state.validationErrors?.name : null}
                        </div>
                      </div>
                      <div className="fieldName mb-4">
                        2. Email*
                        <div style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "40px" }}>
                          <TextField
                            type="text"
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            fullWidth
                            placeholder="Example - userid@gmail.com"
                            InputProps={{
                              style: {
                                paddingRight: 2,
                              },
                              sx: {
                                width: "100%",
                                height: "40px",
                                border: "none",
                                outline: "none",
                                paddingLeft: "0.2rem",
                                paddingRight: "0.2rem",
                                background: "transparent",
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontWeight: "400",
                                lineHeight: "19px",
                                letterSpacing: "0em",
                                textAlign: "left",
                                // color: "rgba(195, 195, 195, 1)",
                              },
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& > fieldset": {
                                  border: "none"
                                }
                              }
                            }}
                            name="email"
                            value={this.state.input.email}
                            onChange={this.handleChange.bind(this)}
                          />
                        </div>
                        <div style={{ color: "red", fontSize: "12px" }}>
                          {this.state.validationErrors?.email ? this.state.validationErrors?.email : null}
                        </div>
                      </div>
                      <div className="fieldName mb-4">
                        3. Date of Birth
                        <div className="d-flex align-items-center" style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "40px", width: "fit-content" }}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                              <DatePicker
                                onChange={(newValue) => {
                                  let input = this.state.input;
                                  input["dateOfBirth"] = newValue;
                                  this.setState({ input });
                                  this.props?.handle(input);
                                }}
                                value={this.state.input.dateOfBirth}

                                disableFuture
                                format="DD/MM/YYYY"
                                openTo="year"
                                views={["year", "month", "day"]}
                                slotProps={{ textField: { size: "small" } }}
                                sm-size="small"
                                sx={{
                                  // width: "100%",
                                  height: "40px",
                                  outline: "none",
                                  paddingLeft: "0.2rem",
                                  paddingRight: "0.2rem",
                                  background: "transparent",
                                  fontFamily: "Roboto",
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  lineHeight: "19px",
                                  letterSpacing: "0em",
                                  textAlign: "left",
                                  // color: "rgba(195, 195, 195, 1)",
                                  "& .MuiOutlinedInput-root": {
                                    "& > fieldset": {
                                      border: "none"
                                    }
                                  }
                                }}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </div>
                      </div>
                      <div className="fieldName mb-4">
                        4. Contact No
                        <div style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "40px" }}>
                          <TextField
                            type="text"
                            size="small"
                            id="outlined-basic"
                            variant="outlined"
                            fullWidth
                            placeholder="Enter your 10 digit contact no"
                            InputProps={{
                              style: {
                                paddingRight: 2,
                              },
                              sx: {
                                width: "100%",
                                height: "40px",
                                border: "none",
                                outline: "none",
                                paddingLeft: "0.2rem",
                                paddingRight: "0.2rem",
                                background: "transparent",
                                fontFamily: "Roboto",
                                fontSize: "16px",
                                fontWeight: "400",
                                lineHeight: "19px",
                                letterSpacing: "0em",
                                textAlign: "left",
                                // color: "rgba(195, 195, 195, 1)",
                              },
                            }}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                "& > fieldset": {
                                  border: "none"
                                }
                              }
                            }}
                            name="contactNo"
                            value={this.state.input.contactNo}
                            onChange={this.handleChange.bind(this)}
                          />
                        </div>
                      </div>
                    </>
                    :
                    this.state.tab === 1 ?
                      <>
                        <div className="fieldName mb-4">
                          1. 10th Marksheet*
                          <label for="img" className="fileUploadBox d-flex justify-content-center align-items-center">
                            <img src="/images/talent/attachment-24px 2.svg" alt="" />
                            &nbsp;{this.state.input.tenthMarkSheet ? "File Uploaded" : "Attach file upto 5mb"}
                          </label>
                          <input
                            id="img"
                            type="file"
                            accept={".pdf"}
                            onChange={(event) => {
                              if (event.target.files[0]?.size < 5242880) {
                                let input = this.state.input;
                                input["tenthMarkSheet"] = "FileUploaded";
                                this.setState({ input });
                                this.props?.handle(input);
                                toast.success("File Uploaded Successfully");
                              } else {
                                toast.error("File size is more than 5 mb");
                              }
                            }}
                            style={{ display: "none" }}
                            name="tenthMarkSheet"
                          // value={this.state.input.tenthMarkSheet}
                          />
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {this.state.validationErrors?.tenthMarkSheet ? this.state.validationErrors?.tenthMarkSheet : null}
                          </div>
                        </div>
                        <div className="fieldName mb-4">
                          2. 12th Marksheet*
                          <label for="img2" className="fileUploadBox d-flex justify-content-center align-items-center">
                            <img src="/images/talent/attachment-24px 2.svg" alt="" />
                            &nbsp;{this.state.input.twelthMarkSheet ? "File Uploaded" : "Attach file upto 5mb"}
                          </label>
                          <input
                            id="img2"
                            type="file"
                            accept={".pdf"}
                            onChange={(event) => {
                              if (event.target.files[0]?.size < 5242880) {
                                let input = this.state.input;
                                input["twelthMarkSheet"] = "FileUploaded";
                                this.setState({ input });
                                this.props?.handle(input);
                                toast.success("File Uploaded Successfully");
                              } else {
                                toast.error("File size is more than 5 mb");
                              }
                            }}
                            style={{ display: "none" }}
                            name="twelthMarkSheet"
                          // value={this.state.input.twelthMarkSheet}
                          />
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {this.state.validationErrors?.twelthMarkSheet ? this.state.validationErrors?.twelthMarkSheet : null}
                          </div>
                        </div>
                        <div className="fieldName mb-4">
                          3. Graduation Marksheet*
                          <label for="img3" className="fileUploadBox d-flex justify-content-center align-items-center">
                            <img src="/images/talent/attachment-24px 2.svg" alt="" />
                            &nbsp;{this.state.input.graduationMarkSheet ? "File Uploaded" : "Attach file upto 5mb"}
                          </label>
                          <input
                            id="img3"
                            type="file"
                            accept={".pdf"}
                            onChange={(event) => {
                              if (event.target.files[0]?.size < 5242880) {
                                let input = this.state.input;
                                input["graduationMarkSheet"] = "FileUploaded";
                                this.setState({ input });
                                this.props?.handle(input);
                                toast.success("File Uploaded Successfully");
                              } else {
                                toast.error("File size is more than 5 mb");
                              }
                            }}
                            style={{ display: "none" }}
                            name="graduationMarkSheet"
                          // value={this.state.input.graduationMarkSheet}
                          />
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {this.state.validationErrors?.graduationMarkSheet ? this.state.validationErrors?.graduationMarkSheet : null}
                          </div>
                        </div>
                        <div className="fieldName mb-4">
                          4. Post Graduation Marksheet
                          <label for="img4" className="fileUploadBox d-flex justify-content-center align-items-center">
                            <img src="/images/talent/attachment-24px 2.svg" alt="" />
                            &nbsp;{this.state.input.postGraduationMarkSheet ? "File Uploaded" : "Attach file upto 5mb"}
                          </label>
                          <input
                            id="img4"
                            type="file"
                            accept={".pdf"}
                            onChange={(event) => {
                              if (event.target.files[0]?.size < 5242880) {
                                let input = this.state.input;
                                input["postGraduationMarkSheet"] = "FileUploaded";
                                this.setState({ input });
                                this.props?.handle(input);
                                toast.success("File Uploaded Successfully");
                              } else {
                                toast.error("File size is more than 5 mb");
                              }
                            }}
                            style={{ display: "none" }}
                            name="postGraduationMarkSheet"
                          // value={this.state.input.postGraduationMarkSheet}
                          />
                        </div>
                        <div className="fieldName mb-4">
                          5. Offer Letter*
                          <label for="img5" className="fileUploadBox d-flex justify-content-center align-items-center">
                            <img src="/images/talent/attachment-24px 2.svg" alt="" />
                            &nbsp;{this.state.input.offerLetter ? "File Uploaded" : "Attach file upto 5mb"}
                          </label>
                          <input
                            id="img5"
                            type="file"
                            accept={".pdf"}
                            onChange={(event) => {
                              if (event.target.files[0]?.size < 5242880) {
                                let input = this.state.input;
                                input["offerLetter"] = "FileUploaded";
                                this.setState({ input });
                                this.props?.handle(input);
                                toast.success("File Uploaded Successfully");
                              } else {
                                toast.error("File size is more than 5 mb");
                              }
                            }}
                            style={{ display: "none" }}
                            name="offerLetter"
                          // value={this.state.input.offerLetter}
                          />
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {this.state.validationErrors?.offerLetter ? this.state.validationErrors?.offerLetter : null}
                          </div>
                        </div>
                        <div className="fieldName mb-4">
                          6. Salary Slips*
                          <label for="img6" className="fileUploadBox d-flex justify-content-center align-items-center">
                            <img src="/images/talent/attachment-24px 2.svg" alt="" />
                            &nbsp;{this.state.input.salarySlips ? "File Uploaded" : "Attach file upto 5mb"}
                          </label>
                          <input
                            id="img6"
                            type="file"
                            accept={".pdf"}
                            onChange={(event) => {
                              if (event.target.files[0]?.size < 5242880) {
                                let input = this.state.input;
                                input["salarySlips"] = "FileUploaded";
                                this.setState({ input });
                                this.props?.handle(input);
                                toast.success("File Uploaded Successfully");
                              } else {
                                toast.error("File size is more than 5 mb");
                              }
                            }}
                            style={{ display: "none" }}
                            name="salarySlips"
                          // value={this.state.input.salarySlips}
                          />
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {this.state.validationErrors?.salarySlips ? this.state.validationErrors?.salarySlips : null}
                          </div>
                        </div>
                        <div className="fieldName mb-4">
                          7. Bank Statement*
                          <label for="img7" className="fileUploadBox d-flex justify-content-center align-items-center">
                            <img src="/images/talent/attachment-24px 2.svg" alt="" />
                            &nbsp;{this.state.input.bankStatements ? "File Uploaded" : "Attach file upto 5mb"}
                          </label>
                          <input
                            id="img7"
                            type="file"
                            accept={".pdf"}
                            onChange={(event) => {
                              if (event.target.files[0]?.size < 5242880) {
                                let input = this.state.input;
                                input["bankStatements"] = "FileUploaded";
                                this.setState({ input });
                                this.props?.handle(input);
                                toast.success("File Uploaded Successfully");
                              } else {
                                toast.error("File size is more than 5 mb");
                              }
                            }}
                            style={{ display: "none" }}
                            name="bankStatements"
                          // value={this.state.input.bankStatements}
                          />
                          <div style={{ color: "red", fontSize: "12px" }}>
                            {this.state.validationErrors?.bankStatements ? this.state.validationErrors?.bankStatements : null}
                          </div>
                        </div>
                        <div className="fieldName mb-4">
                          8. Increment Letter (if any)
                          <label for="img8" className="fileUploadBox d-flex justify-content-center align-items-center">
                            <img src="/images/talent/attachment-24px 2.svg" alt="" />
                            &nbsp;{this.state.input.incrementLetter ? "File Uploaded" : "Attach file upto 5mb"}
                          </label>
                          <input
                            id="img8"
                            type="file"
                            accept={".pdf"}
                            onChange={(event) => {
                              if (event.target.files[0]?.size < 5242880) {
                                let input = this.state.input;
                                input["incrementLetter"] = "FileUploaded";
                                this.setState({ input });
                                this.props?.handle(input);
                                toast.success("File Uploaded Successfully");
                              } else {
                                toast.error("File size is more than 5 mb");
                              }
                            }}
                            style={{ display: "none" }}
                            name="incrementLetter"
                          // value={this.state.input.incrementLetter}
                          />
                        </div>
                        <div className="fieldName mb-4">
                          9. Others (if any)
                          <label for="img9" className="fileUploadBox d-flex justify-content-center align-items-center">
                            <img src="/images/talent/attachment-24px 2.svg" alt="" />
                            &nbsp;{this.state.input.others ? "File Uploaded" : "Attach file upto 5mb"}
                          </label>
                          <input
                            id="img9"
                            type="file"
                            accept={".pdf"}
                            onChange={(event) => {
                              if (event.target.files[0]?.size < 5242880) {
                                let input = this.state.input;
                                input["others"] = "FileUploaded";
                                this.setState({ input });
                                this.props?.handle(input);
                                toast.success("File Uploaded Successfully");
                              } else {
                                toast.error("File size is more than 5 mb");
                              }
                            }}
                            style={{ display: "none" }}
                            name="others"
                          // value={this.state.input.others}
                          />
                        </div>
                      </>
                      :
                      this.state.tab === 2 ?
                        <>
                          <div className="fieldName mb-4">
                            1. Tell me about a time you were asked to do something you had never done before. How did you react? What did you learn?
                            <div style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "90px" }}>
                              <TextField
                                type="text"
                                size="small"
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter a description for the long answer"
                                InputProps={{
                                  style: {
                                    paddingRight: 2,
                                  },
                                  sx: {
                                    width: "100%",
                                    height: "90px",
                                    border: "none",
                                    outline: "none",
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    background: "transparent",
                                    fontFamily: "Roboto",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "19px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    // color: "rgba(195, 195, 195, 1)",
                                  },
                                }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    "& > fieldset": {
                                      border: "none"
                                    }
                                  }
                                }}
                                multiline
                                rows={3}
                                inputProps={{ maxLength: 300 }}
                                name="longQuestOne"
                                value={this.state.input.longQuestOne}
                                onChange={this.handleChange.bind(this)}
                              />
                            </div>
                            <div className="wordLimit">
                              300 word limit
                            </div>
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {this.state.validationErrors?.longQuestOne ? this.state.validationErrors?.longQuestOne : null}
                            </div>
                          </div>
                          <div className="fieldName mb-4">
                            2. Tell me about the last time something significant didn’t go according to plan at work. What was your role? What was the outcome?
                            <div style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "90px" }}>
                              <TextField
                                type="text"
                                size="small"
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter a description for the long answer"
                                InputProps={{
                                  style: {
                                    paddingRight: 2,
                                  },
                                  sx: {
                                    width: "100%",
                                    height: "90px",
                                    border: "none",
                                    outline: "none",
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    background: "transparent",
                                    fontFamily: "Roboto",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "19px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    // color: "rgba(195, 195, 195, 1)",
                                  },
                                }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    "& > fieldset": {
                                      border: "none"
                                    }
                                  }
                                }}
                                multiline
                                rows={3}
                                inputProps={{ maxLength: 300 }}
                                name="longQuestTwo"
                                value={this.state.input.longQuestTwo}
                                onChange={this.handleChange.bind(this)}
                              />
                            </div>
                            <div className="wordLimit">
                              300 word limit
                            </div>
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {this.state.validationErrors?.longQuestTwo ? this.state.validationErrors?.longQuestTwo : null}
                            </div>
                          </div>
                          <div className="fieldName mb-4">
                            3.  What are the three things that are most important to you in a job?
                            <div style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "90px" }}>
                              <TextField
                                type="text"
                                size="small"
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                placeholder="Enter a description for the long answer"
                                InputProps={{
                                  style: {
                                    paddingRight: 2,
                                  },
                                  sx: {
                                    width: "100%",
                                    height: "90px",
                                    border: "none",
                                    outline: "none",
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    background: "transparent",
                                    fontFamily: "Roboto",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "19px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    // color: "rgba(195, 195, 195, 1)",
                                  },
                                }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    "& > fieldset": {
                                      border: "none"
                                    }
                                  }
                                }}
                                multiline
                                rows={3}
                                inputProps={{ maxLength: 300 }}
                                name="longQuestThree"
                                value={this.state.input.longQuestThree}
                                onChange={this.handleChange.bind(this)}
                              />
                            </div>
                            <div className="wordLimit">
                              300 word limit
                            </div>
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {this.state.validationErrors?.longQuestThree ? this.state.validationErrors?.longQuestThree : null}
                            </div>
                          </div>
                        </>
                        :
                        <>
                          <div className="fieldName mb-4">
                            1. Email*
                            <div style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "40px" }}>
                              <TextField
                                type="text"
                                size="small"
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                placeholder="Example - userid@gmail.com"
                                InputProps={{
                                  style: {
                                    paddingRight: 2,
                                  },
                                  sx: {
                                    width: "100%",
                                    height: "40px",
                                    border: "none",
                                    outline: "none",
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    background: "transparent",
                                    fontFamily: "Roboto",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "19px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    // color: "rgba(195, 195, 195, 1)",
                                  },
                                }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    "& > fieldset": {
                                      border: "none"
                                    }
                                  }
                                }}
                                name="emailTwo"
                                value={this.state.input.emailTwo}
                                onChange={this.handleChange.bind(this)}
                              />
                            </div>
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {this.state.validationErrors?.emailTwo ? this.state.validationErrors?.emailTwo : null}
                            </div>
                          </div>
                          <div className="fieldName mb-4">
                            2. Location
                            <div className="d-flex align-items-center" style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "40px" }}>
                              &nbsp;&nbsp;<SearchIcon />
                              <TextField
                                type="text"
                                size="small"
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                placeholder="Search or enter your location"
                                InputProps={{
                                  style: {
                                    paddingRight: 2,
                                  },
                                  sx: {
                                    width: "100%",
                                    height: "40px",
                                    border: "none",
                                    outline: "none",
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    background: "transparent",
                                    fontFamily: "Roboto",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "19px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    // color: "rgba(195, 195, 195, 1)",
                                  },
                                }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    "& > fieldset": {
                                      border: "none"
                                    }
                                  }
                                }}
                                name="location"
                                value={this.state.input.location}
                                onChange={this.handleChange.bind(this)}
                              />
                            </div>
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {this.state.validationErrors?.location ? this.state.validationErrors?.location : null}
                            </div>
                          </div>
                          <div className="fieldName mb-4">
                            3. Interview Date
                            <div className="d-flex align-items-center" style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "40px", width: "fit-content" }}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                  <DatePicker
                                    onChange={(newValue) => {
                                      let input = this.state.input;
                                      input["interviewDate"] = newValue;
                                      this.setState({ input });
                                      this.props?.handle(input);
                                    }}
                                    value={this.state.input.interviewDate}
                                    disablePast
                                    format="DD/MM/YYYY"
                                    openTo="year"
                                    views={["year", "month", "day"]}
                                    slotProps={{ textField: { size: "small" } }}
                                    sm-size="small"
                                    sx={{
                                      // width: "100%",
                                      height: "40px",
                                      outline: "none",
                                      paddingLeft: "0.2rem",
                                      paddingRight: "0.2rem",
                                      background: "transparent",
                                      fontFamily: "Roboto",
                                      fontSize: "16px",
                                      fontWeight: "400",
                                      lineHeight: "19px",
                                      letterSpacing: "0em",
                                      textAlign: "left",
                                      // color: "rgba(195, 195, 195, 1)",
                                      "& .MuiOutlinedInput-root": {
                                        "& > fieldset": {
                                          border: "none"
                                        }
                                      }
                                    }}
                                  />
                                </Stack>
                              </LocalizationProvider>
                            </div>
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {this.state.validationErrors?.interviewDate ? this.state.validationErrors?.interviewDate : null}
                            </div>
                          </div>
                          <div className="fieldName mb-4">
                            4. Interview Time
                            <div className="d-flex align-items-center" style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "40px", width: "220px" }}>
                              <TextField
                                type="text"
                                size="small"
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                placeholder="Time: 12:00"
                                InputProps={{
                                  style: {
                                    paddingRight: 2,
                                  },
                                  sx: {
                                    width: "100%",
                                    height: "40px",
                                    border: "none",
                                    outline: "none",
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    background: "transparent",
                                    fontFamily: "Roboto",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "19px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    // color: "rgba(195, 195, 195, 1)",
                                  },
                                }}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    "& > fieldset": {
                                      border: "none"
                                    }
                                  }
                                }}
                                name="interviewTime"
                                value={this.state.input.interviewTime}
                                onChange={this.handleChange.bind(this)}
                              />
                              <AccessTimeIcon />&nbsp;&nbsp;
                            </div>
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {this.state.validationErrors?.interviewTime ? this.state.validationErrors?.interviewTime : null}
                            </div>
                            {/* <div className="d-flex align-items-center" style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", width: "fit-content" }}>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  onChange={(newValue) => {
                                    let input = this.state.input;
                                    input["interviewTime"] = newValue;
                                    this.setState({ input });
                                    this.props?.handle(input);
                                  }}
                                  value={this.state.input.interviewTime}
                                  sx={{
                                    // width: "100%",
                                    height: "40px",
                                    outline: "none",
                                    paddingLeft: "0.2rem",
                                    paddingRight: "0.2rem",
                                    background: "transparent",
                                    fontFamily: "Roboto",
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    lineHeight: "19px",
                                    letterSpacing: "0em",
                                    textAlign: "left",
                                    // color: "rgba(195, 195, 195, 1)",
                                    "& .MuiOutlinedInput-root": {
                                      "& > fieldset": {
                                        border: "none"
                                      }
                                    }
                                  }}
                                />
                              </LocalizationProvider>
                            </div>
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {this.state.validationErrors?.interviewTime ? this.state.validationErrors?.interviewTime : null}
                            </div> */}
                          </div>
                          <div className="fieldName mb-4">
                            5. Time Zone
                            <div className="d-flex align-items-center" style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "40px" }}>
                              <Select
                                disableUnderline
                                variant="standard"
                                // autoWidth={true}
                                IconComponent={ExpandMoreIcon}
                                className="w-100 d-flex align-items-center"
                                style={{
                                  width: "100%",
                                  height: "fit-content",
                                  border: "none",
                                  outline: "none",
                                  paddingLeft: "0.2rem",
                                  paddingRight: "0.2rem",
                                  background: "transparent",
                                  fontFamily: "Roboto",
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  lineHeight: "19px",
                                  letterSpacing: "0em",
                                  textAlign: "left",
                                  color: "rgba(197, 197, 197, 1)"
                                }}
                                name="timeZone"
                                value={this.state.input.timeZone}
                                onChange={this.handleChange.bind(this)}
                              // value="select"
                              >
                                <MenuItem
                                  value={"select"}
                                  disabled
                                  className="field_toggle_checked"
                                >
                                  Search or Select a time zone from below {" "}
                                </MenuItem>
                                <MenuItem value={"draft"}>Draft</MenuItem>
                                <MenuItem value={"published"}>
                                  Published
                                </MenuItem>
                              </Select>
                            </div>
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {this.state.validationErrors?.timeZone ? this.state.validationErrors?.timeZone : null}
                            </div>
                          </div>
                          <div className="fieldName mb-4">
                            6. Interview Medium
                            <div className="d-flex align-items-center" style={{ border: "1px solid rgba(136, 136, 136, 1)", borderRadius: "4px", height: "40px" }}>
                              <Select
                                disableUnderline
                                variant="standard"
                                // autoWidth={true}
                                IconComponent={ExpandMoreIcon}
                                className="w-100 d-flex align-items-center"
                                style={{
                                  width: "100%",
                                  height: "fit-content",
                                  border: "none",
                                  outline: "none",
                                  paddingLeft: "0.2rem",
                                  paddingRight: "0.2rem",
                                  background: "transparent",
                                  fontFamily: "Roboto",
                                  fontSize: "16px",
                                  fontWeight: "400",
                                  lineHeight: "19px",
                                  letterSpacing: "0em",
                                  textAlign: "left",
                                  color: "rgba(197, 197, 197, 1)"
                                }}
                                name="interviewMedium"
                                value={this.state.input.interviewMedium}
                                onChange={this.handleChange.bind(this)}
                              >
                                <MenuItem
                                  value={"select"}
                                  disabled
                                  className="field_toggle_checked"
                                >
                                  Search or Select medium of Interview from below{" "}
                                </MenuItem>
                                <MenuItem value={"draft"}>Draft</MenuItem>
                                <MenuItem value={"published"}>
                                  Published
                                </MenuItem>
                              </Select>
                            </div>
                            <div style={{ color: "red", fontSize: "12px" }}>
                              {this.state.validationErrors?.interviewMedium ? this.state.validationErrors?.interviewMedium : null}
                            </div>
                          </div>
                        </>
                }
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
