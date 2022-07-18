import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import AskTheProsCreateComponent from "../../../component/ask-the-pros/ask-the-pros";
import AskTheProsApi from "../../../services/ask-the-pros";
import Router from "next/router";
import Cookie from "js-cookie";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default class AskTheProsEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      expertise: [],
      open: false,
      askTheProsDetails: {
        name: "",
        email: "",
        description: "",
        avatar_url: null,
        is_active: false,
        experience: "",
        expertises: [],

        user_id: null,
        education: "",
        recomended_article_category: "",
        article_type_id: null
      },
      isLoader: true,
      codeDropdownList: [],
      codeSubmit: null,
      trustTheProsTotalPoints: {},
      trustTheProsRefferalCode: [],
      totalAskTheProsRefferalCode: [],
      totalPageRefferalCode: null,
      currentPage: 1,

      askTheProsQueryList: [],
      currentPageQueryList: 1,
      totalAskTheProsQueryList: [],
      totalPageQueryList: null,

      askTheProsQueryArticleDropdown: [],
      askTheProsQueryTypeDropdown: [],
    

      // trustTheProsRefferalCodeDropdown: [],
      // proffesionalReferralCodeId: "",
      // proffesionalReferralCode: "",

    };
  }

  RefferalCodePagination = (value) => {
    this.setState({ currentPage: value })
    // this.trustTheProsRefferCodeList(this.state.id,this.state.currentPage);
  }

  ValidateEmail = (mail) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    );
  };

  validateData = () => {
    if (
      this.state.askTheProsDetails?.name === "" ||
      this.state.askTheProsDetails?.name === null ||
      this.state.askTheProsDetails?.name.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the name");
      return false;
    }
    if (
      this.state.askTheProsDetails?.description === "" ||
      this.state.askTheProsDetails?.description === null ||
      this.state.askTheProsDetails?.description.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the description");
      return false;
    }
    if (this.state.askTheProsDetails?.email === "" ||
      this.state.askTheProsDetails?.email === null ||
      this.state.askTheProsDetails?.email.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter email address");
      return false;
    }
    if (!this.ValidateEmail(this.state.askTheProsDetails?.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (
      this.state.askTheProsDetails?.avatar_url === "" ||
      this.state.askTheProsDetails?.avatar_url === null
    ) {
      toast.error("Please upload avatar");
      return false;
    }
    if (
      this.state.askTheProsDetails?.experience === "" ||
      this.state.askTheProsDetails?.experience === null ||
      this.state.askTheProsDetails?.experience.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter experience");
      return false;
    }

    if (
      this.state.askTheProsDetails?.education === "" ||
      this.state.askTheProsDetails?.education === null ||
      this.state.askTheProsDetails?.education.replace(/\s/g, "").length <= 0
    ) {
      toast.error("Please enter the educational qualification");
      return false;
    }
    if (
      this.state.askTheProsDetails?.user_id === "" ||
      this.state.askTheProsDetails?.user_id === null
    ) {
      toast.error("Please enter the user id");
      return false;
    }
    if (
      this.state.askTheProsDetails?.recomended_article_category === "select" ||
      this.state.askTheProsDetails?.recomended_article_category === null ||
      this.state.askTheProsDetails?.recomended_article_category === undefined
    ) {
      toast.error("Please enter the recommended article category");
      return false;
    }
    // if (this.state.askTheProsDetails?.recomended_article_category !== undefined) {
    //   if (this.state.askTheProsDetails?.recomended_article_category.replace(/\s/g, "").length <= 0) {
    //     toast.error("Please enter the recommended article category");
    //     return false;  
    //   }
    // }
    if (
      this.state.askTheProsDetails?.article_type_id === "select" ||
      this.state.askTheProsDetails?.article_type_id === null ||
      this.state.askTheProsDetails?.article_type_id === undefined
    ) {
      toast.error("Please enter the article type id");
      return false;
    }
    // if (this.state.askTheProsDetails?.article_type_id !== undefined) {
    //   if (this.state.askTheProsDetails?.article_type_id.length <= 0) {
    //     toast.error("Please enter the article type id");
    //     return false;  
    //   }
    // }

    return true;
  };
  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.askTheProsDetails?.name,
        email: this.state.askTheProsDetails?.email,
        description: this.state.askTheProsDetails?.description,
        avatar_url: this.state.askTheProsDetails?.avatar_url,
        is_active: this.state.askTheProsDetails?.is_active,
        experience: this.state.askTheProsDetails?.experience,
        expertises: this.state.askTheProsDetails?.expertises,

        user_id:  this.state.askTheProsDetails?.user_id,
        education: this.state.askTheProsDetails?.education,
        recomended_article_category: this.state.askTheProsDetails?.recomended_article_category,
        article_type_id: this.state.askTheProsDetails?.article_type_id,

      };
      if (this.state.codeSubmit !== null) {
        AskTheProsApi.AskTheProsRefferalCodeEdit(this.props?.id, this.state.codeSubmit)
      }
      AskTheProsApi.AskTheProsEdit(this.props.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ asktheProps: response.data.data });
            toast.success(response.data.message);
            Router.push(`/ask-the-pros`);
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
  };
  stateHandle = (value) => {
    this.setState({ askTheProsDetails: value });
  };
  getAskTheProsDetails = (id) => {
    AskTheProsApi.getAskTheProsDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            name: response.data.data.expert?.name,
            email: response.data.data.expert?.email,
            description: response.data.data.expert?.description,
            coupon_code: response.data.data.expert?.coupon_code,
            coupon_code_id: response.data.data.expert?.coupon_code_id,
            avatar_url: response.data.data.expert?.avatar_url,
            is_active: response.data.data.expert?.is_active,
            experience: response.data.data.expert?.experience,
            expertises: response.data.data?.expertise?.expertise === "deleted" ? [] : response.data.data?.expertise?.map(val => val?.id),

            user_id: response.data.data.expert?.user_id,
            education: response.data.data.expert?.education,
            recomended_article_category: response.data.data.expert?.recomended_article_category,
            article_type_id: response.data.data.expert?.article_type_id,
          };
          this.setState({
            askTheProsDetails: details,
          });
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
  Delete = (id) => {
    let data = {};
    AskTheProsApi.AskTheProsDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ asktheProps: response.data.data.expert });
          Router.push("/ask-the-pros");
          toast.success(response.data.message);
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

  trustTheProsRefferCodeList = (id, page) => {
    AskTheProsApi.AskTheProsRefferalCodeList(id, page)
      .then((response) => {
        this.setState({ trustTheProsRefferalCode: response.data.data.list });
        this.setState({ totalAskTheProsRefferalCode: response.data.data });
        this.setState({ totalPageRefferalCode: Math.ceil(response.data.data.total / response.data.data.page_size) });

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

  codeList = () => {
    AskTheProsApi.AskTheProsRefferalCodeDropdownList()
      .then((response) => {
        this.setState({ codeDropdownList: response.data.data.list });
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

  trustTheProsTotalPoints = (id) => {
    AskTheProsApi.AskTheProsRefferalCodeTotalPoints(id)
      .then((response) => {
        this.setState({ trustTheProsTotalPoints: response.data.data.total });
      })
      .catch((error) => {
      });
  }

  // setProfessionalReferralCode = (value) => {
  //   this.setState({ proffesionalReferralCodeId: value.id });
  //   this.setState({ proffesionalReferralCode: value.code });
  // }

  // trustTheProsRefferalCodeEdit = () => {
  //   AskTheProsApi.AskTheProsRefferalCodeEdit(this.props?.id,this.state.codeSubmit)
  //     .then((response) => {      
  //     })
  // }





  AskTheProsQueryDetails = (id, page) => {
    this.setState({ isLoader: true });
    AskTheProsApi.AskTheProsQueryList(id, page)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({
            isLoader: false,
            askTheProsQueryList: response.data.data?.list,
            totalAskTheProsQueryList: response.data.data,
            totalPageQueryList: Math.ceil(response.data.data.total / response.data.data.page_size)
          });
        }
      })
      .catch((error) => {
        this.setState({ isLoader: false });
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  };

  QueryListPagination = (value) => {
    this.setState({ currentPageQueryList: value });
  }


  AskTheProsQueryCategoryDropdown = () => {
    this.setState({ isLoader: true });
    AskTheProsApi.AskTheProsQueryCategoryDropdown()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({
            isLoader: false,
            askTheProsQueryArticleDropdown: response.data.data?.list,
          });
        }
      })
      .catch((error) => {
        this.setState({ isLoader: false });
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  };

  AskTheProsQueryTypeDropdown = () => {
    this.setState({ isLoader: true });
    AskTheProsApi.AskTheProsQueryTypeDropdown()
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({
            isLoader: false,
            askTheProsQueryTypeDropdown: response.data.data?.list,
          });
        }
      })
      .catch((error) => {
        this.setState({ isLoader: false });
        toast.error(
          error?.response &&
            error?.response?.data &&
            error?.response?.data?.message
            ? error.response.data.message
            : "Unable to process your request, please try after sometime"
        );
      });
  };





  componentDidMount() {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    this.getAskTheProsDetails(this.props.id);
    this.setState({ id: this.props?.id });
    this.trustTheProsRefferCodeList(this.props.id, this.state.currentPage);
    this.codeList();
    this.trustTheProsTotalPoints(this.props.id);
    this.AskTheProsQueryDetails(this.state.id, this.state.currentPageQueryList);
    this.AskTheProsQueryCategoryDropdown();
    this.AskTheProsQueryTypeDropdown();
  }
  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Trust The Pros</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Trust The Pros / Trust The Pros /  </span>Edit Trust The Pros
                </div>
                <div className="page-name">
                  Edit Trust The Pros  - {this.state.askTheProsDetails?.name}
                </div>
              </div>
              <div className="col-md-7 btn-save">
                <div
                  className="custom-btn "
                  onClick={() => {
                    this.OnSave();
                  }}
                >
                  <span>Save </span>
                </div>
                <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    this.setState({ open: true });
                  }}
                >
                  <span>Delete </span>
                </div>
                <div
                  className="Cancel-btn custom-btn"
                  onClick={() => {
                    Router.push(`/ask-the-pros`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <AskTheProsCreateComponent
                  askThePros={this.state.askTheProsDetails}
                  mode={this.state.mode}
                  id={this.state.id}
                  handle={this.stateHandle.bind(this)}
                  codeDropdownList={this.state.codeDropdownList}
                  codeHandle={(value) => this.setState({ codeSubmit: value })}
                  trustTheProsTotalPoints={this.state.trustTheProsTotalPoints}
                  trustTheProsRefferalCode={this.state.trustTheProsRefferalCode}
                  totalAskTheProsRefferalCode={this.state.totalAskTheProsRefferalCode}
                  totalPageRefferalCode={this.state.totalPageRefferalCode}
                  currentPage={this.state.currentPage}
                  // trustTheProsRefferalCodeDropdown= {this.state.trustTheProsRefferalCodeDropdown}
                  // trustTheProsTotalPoints= {this.state.trustTheProsTotalPoints}
                  // setProfessionalReferralCode={this.setProfessionalReferralCode.bind(this)}
                  // trustTheProsRefferalCodeEdit={this.trustTheProsRefferalCodeEdit.bind(this)}
                  RefferalCodePagination={this.RefferalCodePagination.bind(this)}
                  trustTheProsRefferCodeList={this.trustTheProsRefferCodeList.bind(this)}

                  askTheProsQueryList={this.state.askTheProsQueryList}
                  currentPageQueryList={this.state.currentPageQueryList}
                  QueryListPagination={this.QueryListPagination.bind(this)}
                  AskTheProsQueryDetails={this.AskTheProsQueryDetails.bind(this)}
                  totalAskTheProsQueryList={this.state.totalAskTheProsQueryList}
                  totalPageQueryList={this.state.totalPageQueryList}

                  askTheProsQueryArticleDropdown={this.state.askTheProsQueryArticleDropdown}
                  askTheProsQueryTypeDropdown={this.state.askTheProsQueryTypeDropdown}  

                />
              </div>
            </div>
          </DashboardLayoutComponent>
          <Dialog
            open={this.state.open}
            onClose={() => this.setState({ open: false })}
            maxWidth="sm"
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle style={{ color: "#012169" }}>
              Confirm the action
            </DialogTitle>
            <Box position="absolute" top={0} right={0}>
              <IconButton onClick={() => this.setState({ open: false })}>
                <CloseIcon />
              </IconButton>
            </Box>
            <DialogContent>
              <Typography style={{ color: "#7e8f99" }}>
                Are you sure you want to delete this pro?
              </Typography>
            </DialogContent>
            <DialogActions style={{ marginBottom: "0.5rem" }}>
              <Button
                onClick={() => {
                  this.setState({ open: false });
                }}
                style={{
                  color: "#012169",
                  background: "white",
                  borderRadius: "0px",
                }}
                color="primary"
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={() => this.Delete(this.state.id)}
                style={{ background: "#f54a00", borderRadius: "0px" }}
                color="secondary"
                variant="contained"
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    );
  }
}
