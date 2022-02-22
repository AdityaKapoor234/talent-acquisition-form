import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { APP_NAME } from "../../../utils/constant";
import DashboardLayoutComponent from "../../../component/layouts/dashboard-layout/dashboard-layout";
import CategoryCreateComponent from "../../../component/catalog/category/category-create";
import Router from "next/router";
import Cookie from "js-cookie";

const customer = {
	id: 1,
	name: "Accessories",
	top: false,
	display: "9",
	active: true,
};


export default function CategoryViewDetails() {

	const mode = "view";

	useEffect(() => {
		const token = Cookie.get("access_token_admin");
		if (token === undefined) {
			Router.push("/");
		}
	}, []);
	return (
		<div>
			<Head>
				<title>{APP_NAME} - Category</title>
				<meta name="description" content="Trusted Brands. Better Health." />
				<link rel="icon" href="/fitcart.ico" />
			</Head>

			<main>
				<DashboardLayoutComponent>
					<div className="row border-box">
						<div className="col-md-5">
							<div className="hamburger">
								<span>Category / Category / </span>View Category
							</div>
							<div className="page-name">Category Details - Bottles/Shakers</div>
						</div>
						<div className="col-md-7 btn-save">
							<div
								className="Cancel-btn custom-btn"
								onClick={() => {
									Router.push(`/category`);
								}}
							>
								<span>Delete </span>
							</div>
							<div
								className="Cancel-btn custom-btn"
								onClick={() => {
									Router.push(`/category`);
								}}
							>
								<span>Cancel </span>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-m-12">
							<CategoryCreateComponent mode={mode} customer={customer} />
						</div>
					</div>
				</DashboardLayoutComponent>
			</main>
		</div>
	);
}
