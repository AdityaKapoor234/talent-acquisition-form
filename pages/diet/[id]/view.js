import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import DietCreateComponent from "../../../component/catalog/diet/diet-create";
import Router from "next/router";
import Cookie from "js-cookie";
import DietApi from "../../../services/diet";
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

export default function DietViewDetails({ id }) {
  const mode = "view";

  const [diet, setDiet] = useState([]);
  const [open, setOpen] = useState(false);

  const dietDetail = (id) => {
    DietApi.getDietViewDetails(id)
      .then((response) => {
        setDiet(response.data.data.diet);
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

  const Delete = (id) => {
    let data = {};
    DietApi.dietDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          setDiet(response.data.data.diet);
          Router.push("/diet");
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

  useEffect(() => {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    dietDetail(id);
  }, [id]);
  return (
    <div>
      <Head>
        <title>{APP_NAME} - Diet</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-5">
              <div className="hamburger">
                <span>Catalog / Diet/ </span>View Diet
              </div>
              <div className="page-name">Diet Details - {diet?.name}</div>
            </div>
            <div className="col-md-7 btn-save">
              <div
                className="Cancel-btn custom-btn"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <span>Delete </span>
              </div>
              <div
                className="Cancel-btn custom-btn"
                onClick={() => {
                  Router.push(`/diet`);
                }}
              >
                <span>Cancel </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-m-12">
              <DietCreateComponent diet={diet} mode={mode} />
            </div>
          </div>
        </DashboardLayoutComponent>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          maxWidth="sm"
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{ color: "#012169" }}>
            Confirm the action
          </DialogTitle>
          <Box position="absolute" top={0} right={0}>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent>
            <Typography style={{ color: "#7e8f99" }}>
              Are you sure you want to delete this diet?
            </Typography>
          </DialogContent>
          <DialogActions style={{ marginBottom: "0.5rem" }}>
            <Button
              onClick={() => setOpen(false)}
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
              onClick={() => Delete(id)}
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