import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../utils/constant";
import DashboardLayoutComponent from "../../component/layouts/dashboard-layout/dashboard-layout";
import ClassificationCreateComponent from "../../component/catalog/classification/classification-create";
import Router from "next/router";
import Cookie from "js-cookie";

  
  

export default function ClassificationCreate() {

	const mode = "edit";

	useEffect(() => {
		const token = Cookie.get("access_token");
		if (token === undefined) {
			Router.push("/");
		}
	}, []);
	return (
		<div>
			<Head>
				<title>{APP_NAME} - Classification</title>
				<meta name="description" content="Trusted Brands. Better Health." />
				<link rel="icon" href="/fitcart.ico" />
			</Head>

			<main>
				<DashboardLayoutComponent>
					<div className="row border-box">
						<div className="col-md-4">
							<div className="hamburger">
								<span>Catalog / Classification / </span>Add New Classification
							</div>
							<div className="page-name">Add New Classification</div>
						</div>
						<div className="col-md-8 btn-save">
							<div
								className="custom-btn "
								onClick={() => {
									Router.push(`/classification`);
								}}
							>
								<span>Save </span>
							</div>
							<div
								className="Cancel-btn custom-btn"
								onClick={() => {
									Router.push(`/classification`);
								}}
							>
								<span>Cancel </span>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-m-12">
							<ClassificationCreateComponent mode={mode}/>
						</div>
					</div>
				</DashboardLayoutComponent>
			</main>
		</div>
	);
}
