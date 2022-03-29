import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import ProductEditComponent from "../../../component/catalog/product/product-edit.component";
import Router from "next/router";
import Cookie from "js-cookie";

export async function getServerSideProps(context) {
    const { id } = context.query;
    return {
      props: {
        id: id || null,
      },
    };
  }

export default function ProductEditCompo(id) {

    const mode = "edit";
    const [productId, setProductId] = useState(id?.id)

    useEffect(() => {
        const token = Cookie.get("access_token_admin");
        if (token === undefined) {
            Router.push("/");
        }
        setProductId(id?.id)
    }, [id]);
    return (
        <div>
            <Head>
                <title>{APP_NAME} - Product</title>
                <meta name="description" content="Trusted Brands. Better Health." />
                <link rel="icon" href="/fitcart.ico" />
            </Head>

            <main>
                <DashboardLayoutComponent>
                    <div className="row border-box">
                        <div className="col-md-4">
                            <div className="hamburger">
                                <span>Catalog / Product / </span>Edit Product
                            </div>
                            <div className="page-name">Edit Product Details</div>
                        </div>
                        <div className="col-md-8 btn-save">
                            <div
                                className="Cancel-btn custom-btn"
                                onClick={() => {
                                    Router.push(`/product`);
                                }}
                            >
                                <span>Cancel </span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-m-12">
                            <ProductEditComponent mode={mode} id={productId} />
                        </div>
                    </div>
                </DashboardLayoutComponent>
            </main>
        </div>
    );
}
