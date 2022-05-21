import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import TypeCreateComponent from "../../../component/articles/type/type-create";
import Router from "next/router";
import Cookie from "js-cookie";
import ArticleApi from "../../../services/articles";
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

export default function TypeViewDetails({ id }) {
  const mode = "view";

  const [type, setType] = useState([]);
  const [open, setOpen] = useState(false);

  const TypeDetail = (id) => {
    ArticleApi.getTypeDetails(id)
      .then((response) => {
        setType(response.data.data.view);
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
    TypeDetail(id);
  }, [id]);
  return (
    <div>
      <Head>
        <title>{APP_NAME} - Type</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-5">
              <div className="hamburger">
                <span>Article / Type/ </span>View Type
              </div>
              <div className="page-name">Type Details</div>
            </div>
            <div className="col-md-7 btn-save">
              <div
                className="Cancel-btn custom-btn"
                onClick={() => {
                  Router.push(`/article-type`);
                }}
              >
                <span>Cancel </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-m-12">
              <TypeCreateComponent type={type} mode={mode} />
            </div>
          </div>
        </DashboardLayoutComponent>
      </main>
    </div>
  );
}
