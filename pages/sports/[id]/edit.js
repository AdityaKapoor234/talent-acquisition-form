import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import SportsCreateComponent from "../../../component/catalog/sports/sports-create";
import Router from "next/router";
import Cookie from "js-cookie";
import SportsApi from "../../../services/sports";
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

export default class SportsEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      sports: {},
      open: false,
      is_all: false,
      sportsDetails: {
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


    if (this.state.sportsDetails.name === "" || this.state.sportsDetails.name === null || this.state.sportsDetails.name.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter name");
      this.state.is_all = true;
    }
    // if (this.state.sportsDetails.description === "" || this.state.sportsDetails.description === null || this.state.sportsDetails.description.replace(/\s/g, "").length <= 0) {
    //   toast.error("Please enter description");
    //   this.state.is_all = true;
    // }
    if (this.state.sportsDetails.sort_order === "" || this.state.sportsDetails.sort_order === null) {
      toast.error("Please enter display order ");
      this.state.is_all = true;
    }
    if (this.state.sportsDetails.icon_url === "" || this.state.sportsDetails.icon_url === null || this.state.sportsDetails.icon_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter icon ");
      this.state.is_all = true;
    }
    if (this.state.sportsDetails.banner_url === "" || this.state.sportsDetails.banner_url === null || this.state.sportsDetails.banner_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter full banner image ");
      this.state.is_all = true;
    }
    if (this.state.sportsDetails.banner_url_sm === "" || this.state.sportsDetails.banner_url_sm === null || this.state.sportsDetails.banner_url_sm.replace(/\s/g, "").length <= 0) {
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
        name: this.state.sportsDetails.name,
        description: this.state.sportsDetails.description,
        sort_order: parseInt(this.state.sportsDetails.sort_order),
        icon_url: this.state.sportsDetails.icon_url,
        banner_url: this.state.sportsDetails.banner_url,
        banner_url_sm: this.state.sportsDetails.banner_url_sm,
        is_active: this.state.sportsDetails.is_active,
        show_in_main_menu: this.state.sportsDetails.show_in_main_menu,
      };
      SportsApi.sportsListEDIT(this.state.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ sports: response.data.data.sport });
            toast.success(response.data.message);
            Router.push(`/sports`);
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
    this.setState({ sportsDetails: value });
  };
  getSportsDetails = (id) => {
    SportsApi.getSportsViewDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            name: response.data.data.sport.name ? response.data.data.sport.name : "",
            description: response.data.data.sport.description ? response.data.data.sport.description : "",
            sort_order: response.data.data.sport.sort_order ? response.data.data.sport.sort_order : null,
            icon_url: response.data.data.sport.icon_url ? response.data.data.sport.icon_url : "",
            banner_url: response.data.data.sport.banner_url ? response.data.data.sport.banner_url : "",
            banner_url_sm: response.data.data.sport.banner_url_sm ? response.data.data.sport.banner_url_sm : "",
            is_active: response.data.data.sport.is_active ? response.data.data.sport.is_active : false,
            show_in_main_menu: response.data.data.sport.show_in_main_menu ? response.data.data.sport.show_in_main_menu : false,
          };
          this.setState({
            sportsDetails: details,
            sports: response.data.data.sport,
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
    SportsApi.sportsDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ sports: response.data.data.sport });
          Router.push("/sports");
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
    this.getSportsDetails(this.props.id);
    this.setState({ id: this.props?.id });
  }

  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Sports</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Catalog / Sports / </span>Edit Sports
                </div>
                <div className="page-name">
                  Edit Sports Details - {this.state.sports?.name}
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
                    Router.push(`/sports`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <SportsCreateComponent
                  sports={this.state.sports}
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
                Are you sure you want to delete this sport?
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
