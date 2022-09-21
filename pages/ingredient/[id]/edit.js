import Head from "next/head";
import Image from "next/image";
import React, { Component, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import IngredientCreateComponent from "../../../component/catalog/ingredient/ingredient-create";
import Router from "next/router";
import Cookie from "js-cookie";
import IngredientApi from "../../../services/ingredient";
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

export default class IngredientEditDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props?.id,
      mode: "edit",
      ingredient: {},
      open: false,
      ingredientDetails: {
        sort_order: null,
        name: "",
        is_active: null,
      },
    };
  }

  ValidateName = (name) => {
    // return /[A-Za-z]+$/.test(
    return /^[a-zA-Z ]*$/.test(
        name
    )
}

validateData = () => {
    if (
      this.state.ingredientDetails.name === "" &&
      (this.state.ingredientDetails.sort_order === "" ||
        this.state.ingredientDetails.sort_order === null)
    ) {
      toast.error("Please enter Display Order ");
      toast.error("Please enter name");
      return false;
    }
    if (this.state.ingredientDetails.name === "" || !this.ValidateName(this.state.ingredientDetails.name) || this.state.ingredientDetails?.name.replace(/\s/g, "").length <=0) {
      toast.error("Please enter name");
      return false;
    }
    if (
      this.state.ingredientDetails.sort_order === "" ||
      this.state.ingredientDetails.sort_order === null
    ) {
      toast.error("Please enter Display Order ");
      return false;
    }

    return true;
  };

  OnSave = () => {
    if (this.validateData()) {
      let data = {
        name: this.state.ingredientDetails.name,
        sort_order: parseInt(this.state.ingredientDetails.sort_order),
        is_active: this.state.ingredientDetails.is_active,
      };
      IngredientApi.IngredientEdit(this.props.id, data)
        .then((response) => {
          if (response.data.httpStatusCode === 200) {
            this.setState({ ingredient: response.data.data.Ingredient });
            toast.success(response.data.message);
            Router.push(`/ingredient`);
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
    this.setState({ ingredientDetails: value });
  };
  getIngredientDetails = (id) => {
    IngredientApi.getIngredientDetails(id)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          let details = {
            sort_order: response.data.data.ingredient.sort_order
              ? response.data.data.ingredient.sort_order
              : null,
            name: response.data.data.ingredient.name
              ? response.data.data.ingredient.name
              : "",
            is_active: response.data.data.ingredient.is_active
              ? response.data.data.ingredient.is_active
              : null,
          };
          this.setState({
            ingredientDetails: details,
            ingredient: response.data.data.ingredient,
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
    IngredientApi.IngredientDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          this.setState({ ingredient: response.data.data.ingredient });
          Router.push("/ingredient");
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
    this.getIngredientDetails(this.props.id);
    this.setState({ id: this.props?.id });
  }

  render() {
    return (
      <div>
        <Head>
          <title>{APP_NAME} - Incredient</title>
          <meta name="description" content="Trusted Brands. Better Health." />
          <link rel="icon" href="/fitcart.ico" />
        </Head>

        <main>
          <DashboardLayoutComponent>
            <div className="row border-box">
              <div className="col-md-5">
                <div className="hamburger">
                  <span>Catalog / Ingredient / </span>Edit Ingredient
                </div>
                <div className="page-name">
                  Edit Ingredient Details - {this.state.ingredient?.name}
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
                    Router.push(`/ingredient`);
                  }}
                >
                  <span>Cancel </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-m-12">
                <IngredientCreateComponent
                  ingredient={this.state.ingredient}
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
                Are you sure you want to delete this ingredient?
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
