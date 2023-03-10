import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
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

export default function DealsViewDetails({ id }) {
  const mode = "view";

  const [deals, setDeals] = useState([]);
  const [open, setOpen] = useState(false);

  const convertDateStringToDateGetAPI = (dateStr) => {
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
      // date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear();
      (date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear()) + "-" + (date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()) + "-" + (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());
    // new Date(dateStr).toISOString().split('T')[0];
    // date.toLocaleDateString('en-CA');
    return str;
  };

  const dealsDetails = (id) => {
    DealsApi.dealsViewDetails(id)
      .then((response) => {
        let details = {
          label: response.data.data.list.label ? response.data.data.list.label : "",
          deal_start_date: response.data.data.list.deal_start_date ? convertDateStringToDateGetAPI(response.data.data.list.deal_start_date) : "",
          deal_end_date: response.data.data.list.deal_end_date ? convertDateStringToDateGetAPI(response.data.data.list.deal_end_date) : "",
          color_code: response.data.data.list.color_code ? response.data.data.list.color_code : "",
          url: response.data.data.list.url ? response.data.data.list.url : "",
          icon_url: response.data.data.list.icon_url ? response.data.data.list.icon_url : "",
          discount_image_url: response.data.data.list?.discount_image_url ? response.data.data.list?.discount_image_url : "",
          brand_logo: response.data.data.list?.brand_logo ? response.data.data.list?.brand_logo : "",
          is_active: response.data.data.list.is_active ? response.data.data.list.is_active : false,
          sort_order: response.data.data.list.sort_order ? response.data.data.list.sort_order : null,
        };
        setDeals(details);
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
    setOpen(false);
    let data = {};
    DealsApi.dealsDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          setDeals(response.data.data.deal);
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

  
  useEffect(() => {
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    dealsDetails(id);
  }, [id]);
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
                <span>CMS / Deals/ </span>View Deals
              </div>
              <div className="page-name">Deals Details - {deals?.name}</div>
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
                  Router.push(`/deals`);
                }}
              >
                <span>Cancel </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-m-12">
              <DealsCreateComponent deals={deals} mode={mode} />
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
              Are you sure you want to delete this deal?
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
