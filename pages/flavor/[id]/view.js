import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import FlavorCreateComponent from "../../../component/catalog/flavor/flavor-create";
import Router from "next/router";
import Cookie from "js-cookie";
import FlavorApi from "../../../services/flavor";

export async function getServerSideProps(context) {
  const { id } = context.query;
  return {
    props: {
      id: id || null,
    },
  };
}

export default function FlavorViewDetails({ id }) {
  const mode = "view";

  const [flavor, setFlavor] = useState([]);

  const flavorsDetail = (id) => {
    FlavorApi.getFlavorDetails(id)
      .then((response) => {
        setFlavor(response.data.data.flavor);
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
    FlavorApi.FlavorDelete(id, data)
      .then((response) => {
        if (response.data.httpStatusCode === 200) {
          setFlavor(response.data.data.flavor);
          toast.success(response.data.message);
          Router.push("/flavor");
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
    flavorsDetail(id);
  }, [id]);
  return (
    <div>
      <Head>
        <title>{APP_NAME} - Flavor</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
      </Head>

      <main>
        <DashboardLayoutComponent>
          <div className="row border-box">
            <div className="col-md-5">
              <div className="hamburger">
                <span>Catalog / Flavor/ </span>View Flavor
              </div>
              <div className="page-name">Flavor Details - {flavor?.name}</div>
            </div>
            <div className="col-md-7 btn-save">
              <div
                className="Cancel-btn custom-btn"
                onClick={() => {
                  Delete(id);
                }}
              >
                <span>Delete </span>
              </div>
              <div
                className="Cancel-btn custom-btn"
                onClick={() => {
                  Router.push(`/flavor`);
                }}
              >
                <span>Cancel </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-m-12">
              <FlavorCreateComponent flavor={flavor} mode={mode} />
            </div>
          </div>
        </DashboardLayoutComponent>
      </main>
    </div>
  );
}
