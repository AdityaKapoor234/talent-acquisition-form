import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import AddCustomer from "../../../component/customer/addcustomer.component";
import Router from "next/router";
import Cookie from "js-cookie";
import Link from 'next/link'
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CustomerApi from "../../../services/customer";


export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default function EditCustomer({id}) {
  const [customerDetails,setCustomerDetails] = useState({"name":"","sort_order":""});
  const [customer,setCustomer]= useState([]);
  const [open,setOpen]=useState(false)
  const [mode,setMode] = useState("edit");


  const validateData = () => {
    if ((customerDetails?.name === "" || customerDetails?.name === null || customerDetails?.name?.replace(/\s/g, "")?.length <= 0)) {
      toast.error("Please enter name");
      return false
    }
    if ((customerDetails?.sort_order === "" || customerDetails?.sort_order === null)) {
      toast.error("Please enter display order ");
      return false
    }
      return true;
  };


  const OnSave = ()=>{
    if(validateData(id)){
    let data = {
      user_type: customerDetails?.name,
      is_active: customerDetails?.is_active,
      sort_order: customerDetails?.maximum_order_qty
    };
    CustomerApi.EditCustomerType(id,data)
    .then((response) => {
      if (response.data.httpStatusCode === 200) {
        toast.success(response.data.message);
        Router.push(`/customer-type`);
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
  }

  const stateHandle = (value) => {
    setCustomerDetails(value);
  };
  
 
  const CustomerType= (id) => {
    CustomerApi.getCustomerType(id)
        .then((response) => {
            console.log(response);
             setCustomer(response.data.data.view);
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
  CustomerApi.CustomerDelete(id,data)
    .then((response) => {
      if (response.data.httpStatusCode === 200) {
        Router.push("/customer-type");
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

useEffect(()=>{
    const token = Cookie.get("access_token_admin");
    if (token === undefined) {
      Router.push("/");
    }
    CustomerType(id);
  },[id]);





 
  return (
    <div>
      <Head>
        <title>{APP_NAME} - Customer</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-5">
              <div className="hamburger">
                <span>customer / customer Type / </span> Edit Customer Type
              </div>
              <div className="page-name"> </div>
            </div>
            <div className="col-md-7 btn-save">
              <div
                className="custom-btn "
                onClick={() => {
                  OnSave();
                }}
              >
                <span>Save </span>
              </div>
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
                  Router.push(`/customer-type`);
                }}
              >
                <span>Cancel </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-m-12">
              <AddCustomer mode={mode} customer={customer} handle={stateHandle.bind(this)}/>
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
                Are you sure you want to delete this customer Type?
              </Typography>
            </DialogContent>
            <DialogActions style={{ marginBottom: "0.5rem" }}>
              <Button
                onClick={() => {
                  setOpen(false)
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