import Head from "next/head";
import Image from "next/image";
import React, { Component } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import DealsCreateComponent from "../../../component/cms/deals/deals-create";
import Router from "next/router";
import Cookie from "js-cookie";
import DealsApi from "../../../services/deals";
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

export default class DealsEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      deals: {},
      open: false,
      is_all: false,
      dealsDetails: {
        label: "",
        deal_start_date: "",
        deal_end_date: "",
        deal_end_date: "",
        color_code: "",
        url: "",
        icon_url: "",
        discount_image_url:"",
        brand_logo:"",
        is_active: false,
        sort_order: null,
      },
    };
  }

  convertDateStringToDate = (dateStr) => {
    let months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
    ];

    let date = new Date(dateStr);
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    let str =
        date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
  // new Date(dateStr).toISOString().split('T')[0];
  // date.toLocaleDateString('en-CA');
    return str;
};

  urlPatternValidation = (URL) => {
    const regex = new RegExp('(https?://)');    
    return regex.test(URL);
  };


  validateData = () => {
    this.setState({ is_all: false });


    if (this.state.dealsDetails.label === "" || this.state.dealsDetails.label === null || this.state.dealsDetails.label.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter label");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.deal_start_date === "" || this.state.dealsDetails.deal_start_date === null || this.state.dealsDetails.deal_start_date.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter deal start date");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.deal_end_date === "" || this.state.dealsDetails.deal_end_date === null || this.state.dealsDetails.deal_end_date.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter deal end date");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.color_code === "" || this.state.dealsDetails.color_code === null || this.state.dealsDetails.color_code.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter color code");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.url === "" || this.state.dealsDetails.url === null || this.state.dealsDetails.url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter url");
      this.state.is_all = true;
    }

    if (!this.urlPatternValidation(this.state.dealsDetails.url)) {
      toast.error("Please Valid url");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.icon_url === "" || this.state.dealsDetails.icon_url === null || this.state.dealsDetails.icon_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter icon");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.discount_image_url === "" || this.state.dealsDetails.discount_image_url === null || this.state.dealsDetails.discount_image_url.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter discount image");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails.brand_logo === "" || this.state.dealsDetails.brand_logo === null || this.state.dealsDetails.brand_logo.replace(/\s/g, "").length <= 0) {
      toast.error("Please enter brand logo");
      this.state.is_all = true;
    }
    if (this.state.dealsDetails?.sort_order === "" || this.state.dealsDetails?.sort_order === null) {
      toast.error("Please enter display order ");
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
        label: this.state.dealsDetails.label,
        deal_start_date: this.convertDateStringToDate(this.state.dealsDetails.deal_start_date),
        deal_end_date: this.convertDateStringToDate(this.state.dealsDetails.deal_end_date),
        color_code: this.state.dealsDetails.color_code,
        url: this.state.dealsDetails.url,
        icon_url: this.state.dealsDetails.icon_url,
        discount_image_url: this.state.dealsDetails.discount_image_url,
        brand_logo: this.state.dealsDetails.brand_logo,
        is_active: this.state.dealsDetails.is_active,
        sort_order: this.state.dealsDetails.sort_order,
      };
      DealsApi.dealsListEDIT(this.state.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ deals: response.data.data.deal });
            toast.success(response.data.message);
            Router.push(`/deals`);
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
    this.setState({ dealsDetails: value });
  };
  getdealsDetails = (id) => {
    DealsApi.dealsViewDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            label: response.data.data.list.label ? response.data.data.list.label : "",
            deal_start_date: response.data.data.list.deal_start_date ? response.data.data.list.deal_start_date : "",
            deal_end_date: response.data.data.list.deal_end_date ? response.data.data.list.deal_end_date : "",
            color_code: response.data.data.list.color_code ? response.data.data.list.color_code : "",
            url: response.data.data.list.url ? response.data.data.list.url : "",
            icon_url: response.data.data.list.icon_url ? response.data.data.list.icon_url : "",
            discount_image_url:response.data.data.list?.discount_image_url ?response.data.data.list?.discount_image_url:"",
            brand_logo:response.data.data.list?.brand_logo ?response.data.data.list?.brand_logo:"",
            is_active: response.data.data.list.is_active ? response.data.data.list.is_active : false,
            sort_order: response.data.data.list.sort_order ? response.data.data.list.sort_order : null,
          };
          this.setState({
            dealsDetails: details,
            deals: response.data.data.list,
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
    this.setState({ open: false });
    let data = {};
    DealsApi.dealsDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ deals: response.data.data.deal });
          Router.push("/deals");
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
    this.getdealsDetails(this.props.id);
    this.setState({ id: this.props?.id });
  }

  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Deals</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>CMS / Deals / </span>Edit Deals
                </div>
                <div className="page-name">
                  Edit Deals Details - {this.state.deals?.name}
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
                    Router.push(`/deals`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <DealsCreateComponent
                  deals={this.state.deals}
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
                Are you sure you want to delete this deal?
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
