import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import GoalsCreateComponent from "../../../component/catalog/goals/goals-create";
import Router from "next/router";
import Cookie from "js-cookie";
import GoalsApi from "../../../services/goals";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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

export default class GoalsEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      goals: {},
      open: false,
      is_all: false,
      goalsDetails: {
        name: "",
        description: "",
        sort_order: null,
        icon_url: "",
        banner_url: "",
        banner_url_sm: "",
        is_active: false,
        show_in_main_menu: false,
      },
    };
  }
  validateData = () => {
    this.setState({ is_all: false });


    if (this.state.goalsDetails.name === "" || this.state.goalsDetails.name === null || this.state.goalsDetails.name.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter name");
      this.state.is_all = true;
    }
    if (this.state.goalsDetails.description === "" || this.state.goalsDetails.description === null || this.state.goalsDetails.description.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter description");
      this.state.is_all = true;
    }
    if (this.state.goalsDetails.sort_order === "" || this.state.goalsDetails.sort_order === null) {
      toast.error("Please enter display order ");
      this.state.is_all = true;
    }
    if (this.state.goalsDetails.icon_url === "" || this.state.goalsDetails.icon_url === null || this.state.goalsDetails.icon_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter icon ");
      this.state.is_all = true;
    }
    if (this.state.goalsDetails.banner_url === "" || this.state.goalsDetails.banner_url === null || this.state.goalsDetails.banner_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter full banner image ");
      this.state.is_all = true;
    }
    if (this.state.goalsDetails.banner_url_sm === "" || this.state.goalsDetails.banner_url_sm === null || this.state.goalsDetails.banner_url_sm.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter short banner image ");
      this.state.is_all = true;
    }


    if (this.state.is_all === true) {
      return false;
    }
    else {
      return true;
    }
  };

  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.goalsDetails.name,
        description: this.state.goalsDetails.description,
        sort_order: parseInt(this.state.goalsDetails.sort_order),
        icon_url: this.state.goalsDetails.icon_url,
        banner_url: this.state.goalsDetails.banner_url,
        banner_url_sm: this.state.goalsDetails.banner_url_sm,
        is_active: this.state.goalsDetails.is_active,
        show_in_main_menu: this.state.goalsDetails.show_in_main_menu,
      };
      GoalsApi.goalsListEDIT(this.state.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ goals: response.data.data.goal });
            toast.success(response.data.message);
            Router.push(`/goals`);
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
    this.setState({ goalsDetails: value });
  };
  getGoalsDetails = (id) => {
    GoalsApi.getGoalsViewDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            name: response.data.data.goal.name ? response.data.data.goal.name : "",
            description: response.data.data.goal.description ? response.data.data.goal.description : "",
            sort_order: response.data.data.goal.sort_order ? response.data.data.goal.sort_order : null,
            icon_url: response.data.data.goal.icon_url ? response.data.data.goal.icon_url : "",
            banner_url: response.data.data.goal.banner_url ? response.data.data.goal.banner_url : "",
            banner_url_sm: response.data.data.goal.banner_url_sm ? response.data.data.goal.banner_url_sm : "",
            is_active: response.data.data.goal.is_active ? response.data.data.goal.is_active : false,
            show_in_main_menu: response.data.data.goal.show_in_main_menu ? response.data.data.goal.show_in_main_menu : false,
          };
          this.setState({
            goalsDetails: details,
            goals: response.data.data.goal,
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
    GoalsApi.goalsDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ goals: response.data.data.goal });
          Router.push("/goals");
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
  componentDidMount() {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    this.getGoalsDetails(this.props.id);
    this.setState({ id: this.props?.id });
  }

  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Goals</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Catalog / Goals / </span>Edit Goals
                </div>
                <div className="page-name">
                  Edit Goals Details - {this.state.goals?.name}
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
                    Router.push(`/goals`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <GoalsCreateComponent
                  goals={this.state.goals}
                  mode={this.state.mode}
                  handle={this.stateHandle.bind(this)}
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
                Are you sure you want to delete this goal?
              </Typography>
            </DialogContent>
            <DialogActions style={{ marginBottom: "0.5rem" }}>
              <Button
                onClick={() => {
                  this.setState({ open: false });
                }}
                style={{
                  color: "#012169",
                  borderRadius: "0px",
                  background: "white",
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
